.. _supported-resource-type:

Supported resource
******************

A standard, regulation, framework or system that the software
supports or complies with, as an item of the ``supports`` key. It is
a mapping with a single key:

-  ``id`` - **mandatory** - an identifier for the supported standard,
   regulation, framework or system. It is either an alias in
   the form ``alias:<name>`` (e.g. ``alias:gdpr``), resolved through the
   :ref:`list of aliases <aliases>`, or any other valid URI (URL or
   URN) referencing the resource directly.

   An ``alias:`` value MUST exist in the
   :ref:`list of aliases <aliases>`. An unknown alias is an error.
   Any other value MUST be a syntactically valid URI. A value that is
   well formed but not otherwise known is accepted as is.
