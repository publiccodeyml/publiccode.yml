#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from sphinx.util import i18n
from sphinx.transforms import i18n as transforms_i18n

# Monkey-patch Sphinx in order to use a single text domain for the translations.
i18n.docname_to_domain = lambda docname, _: 'publiccode.yml'
transforms_i18n.docname_to_domain = lambda docname, _: 'publiccode.yml'

# The master toctree document.
master_doc = 'index'

# Make gettext translate literal-blocks as well (fe. code:: yaml)
gettext_additional_targets = ['literal-block']

# Use a RST builder to create RST files as output which are the result
# of the source RST plus the translation applied.
extensions = ['sphinx_rst_builder']

# We build translated versions in _build. Ignore RST files there so
# that they don't get used as sources in subsequent builds.
exclude_patterns = ['_build/**/*.rst']
