import warnings

from sphinx.deprecation import RemovedInSphinx90Warning

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
html_css_files = ["theme-vars.css", "sidebar-arrows.css", "light-code.css", "key-meta.css", "heading-scale.css"]

# light-code.css repaints the code blocks light: the tokens need a
# palette for light backgrounds instead of the theme's dark one.
pygments_style = "default"

extensions = [
    "sphinx_copybutton",
]


# The press theme attaches a page's sections to the sidebar only when
# that page is the one being viewed, so the other entries carry no
# hint that they expand. Flag the entries whose page has sections and
# let the sidetoc override in _templates render the arrow.
def _flag_expandable_toc_entries(app, pagename, templatename, context, doctree):
    for toc in context.get("toctree_data", []):
        for entry in toc["entries"]:
            sections = app.env.toc_dict.get(entry["name"], {}).get("sections")
            entry["has_children"] = bool(sections)


def setup(app):
    # priority > 500: after the theme handler that builds toctree_data
    app.connect("html-page-context", _flag_expandable_toc_entries, priority=501)
