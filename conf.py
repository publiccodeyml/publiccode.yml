import re
import warnings

from docutils import nodes
from docutils.parsers.rst import roles
from sphinx.deprecation import RemovedInSphinx90Warning
from sphinx.transforms import SphinxTransform

warnings.filterwarnings("ignore", category=RemovedInSphinx90Warning)

# No version in the name: under sphinx-polyversion the switcher shows it,
# and a hardcoded one goes stale on the branches that change version.
project = "publiccode.yml Standard"

# Under sphinx-polyversion (poly.py) POLYVERSION_DATA carries the version
# being built and the list of all of them; load() copies it into
# html_context for the switcher in _templates/page.html. A plain
# sphinx-build leaves the variable unset and the switcher renders nothing.
from sphinx_polyversion.api import LoadError, load

try:
    load(globals())
except LoadError:
    pass

html_theme = "press"

templates_path = ["_templates"]

html_static_path = ["_static"]
html_css_files = ["theme-vars.css", "sidebar-arrows.css", "light-code.css", "key-meta.css", "heading-scale.css", "links.css", "menu-button.css", "site-header.css", "search-form.css", "print.css"]

# light-code.css repaints the code blocks light: the tokens need a
# palette for light backgrounds instead of the theme's dark one.
pygments_style = "default"

extensions = [
    "sphinx_copybutton",
]

# Version 0 only: country.rst includes this fragment, which must not
# also become a page of its own.
exclude_patterns = ["schema.it.rst"]


# The press theme attaches a page's sections to the sidebar only when
# that page is the one being viewed, so the other entries carry no
# hint that they expand. Flag the entries whose page has sections and
# let the sidetoc override in _templates render the arrow.
def _flag_expandable_toc_entries(app, pagename, templatename, context, doctree):
    for toc in context.get("toctree_data", []):
        for entry in toc["entries"]:
            sections = app.env.toc_dict.get(entry["name"], {}).get("sections") or []
            # A page without subsections gets its own title as the only
            # section, which would list the page under itself.
            if len(sections) == 1 and sections[0]["title"] == entry["title"]:
                sections = []
                entry["children"] = []
            entry["has_children"] = bool(sections)


# One type chip on a key's type line, for the keys accepting several
# types. A docutils generic role cannot hold a link, so a chip written
# as ``:meta-type:`URL <url-type>``` delegates to the std ref role and
# links to the definition of the type.
def _meta_type_role(name, rawtext, text, lineno, inliner, options=None, content=()):
    chip = nodes.inline(rawtext, "", classes=["meta-type"])
    if "<" not in text:
        chip += nodes.Text(text)
        return [chip], []
    ref, messages = roles.role("ref", inliner.language, lineno, inliner.reporter)
    children, ref_messages = ref("ref", rawtext, text, lineno, inliner, options or {}, content)
    chip.extend(children)
    return [chip], [*messages, *ref_messages]


# The id docutils derives from "``url`` *(required)*" is url-required
# and the one from "``usedBy`` (*deprecated*)" is usedby-deprecated.
# Anchor such a key at its name alone, so the anchor stays when the key
# becomes optional or deprecated.
_STATUS_MARKER = re.compile(r"\s*\((?:required|deprecated)\)\s*$")


class _AnchorWithoutStatusMarker(SphinxTransform):
    # before SphinxDomains (850), which records the label targets
    default_priority = 800

    def apply(self, **kwargs):
        for section in self.document.findall(nodes.section):
            text = _STATUS_MARKER.sub("", section[0].astext())
            anchor = nodes.make_id(text)
            if not anchor or self.document.ids.get(anchor, section) is not section:
                continue
            if anchor in section["ids"]:
                section["ids"].remove(anchor)
            section["ids"].insert(0, anchor)
            self.document.ids[anchor] = section


# A label before a heading becomes an empty span above the section,
# and :ref: links to that span (#date-type) instead of the section id
# the heading's own permalink uses (#date). Point the labels of
# sections at the section id.
def _link_labels_to_sections(app, doctree):
    std = app.env.domains.standard_domain
    docname = app.env.docname
    for name, (labeldoc, labelid, sectname) in list(std.labels.items()):
        node = doctree.ids.get(labelid)
        if labeldoc != docname or not isinstance(node, nodes.section):
            continue
        std.labels[name] = labeldoc, node["ids"][0], sectname
        std.anonlabels[name] = labeldoc, node["ids"][0]


def setup(app):
    # priority > 500: after the theme handler that builds toctree_data
    app.connect("html-page-context", _flag_expandable_toc_entries, priority=501)
    app.add_transform(_AnchorWithoutStatusMarker)
    app.connect("doctree-read", _link_labels_to_sections)
    app.add_role("meta-type", _meta_type_role)
