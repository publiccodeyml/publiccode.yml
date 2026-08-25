project = "publiccode.yml Standard (v0.8)"

# Under sphinx-polyversion (poly.py) POLYVERSION_DATA carries the version
# being built and the list of all of them; load() copies it into
# html_context for the switcher in _templates/page.html. A plain
# sphinx-build leaves the variable unset and the switcher renders nothing.
from sphinx_polyversion.api import LoadError, load

try:
    load(globals())
except LoadError:
    pass
else:
    # The switcher names the version on every page, and the bare name is
    # what still fits the navbar on a phone.
    project = "publiccode.yml Standard"

html_theme = "press"

templates_path = ["_templates"]

extensions = [
    "sphinx_copybutton",
]
