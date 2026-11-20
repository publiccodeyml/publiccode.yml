.. _supported-resource-type:

Supported resource
******************

A standard, regulation, framework or system that the software
supports or complies with.

Properties:

-  ``id`` *(required)*, :ref:`URI <uri-type>`: An identifier for the
   supported standard, regulation, framework or system. Use
   ``alias:<name>`` with a name from the :ref:`list of aliases
   <aliases>` or another URI for the resource.

An ``alias:`` value MUST exist in the :ref:`list of aliases
<aliases>`. An unknown alias is an error. Other values MUST be valid
URIs. Parsers accept these even if they do not recognize the resource.

.. tip::

   Prefer an alias when the list has one: every file then names the
   standard the same way, while free URIs for the same resource can
   differ.

.. code-block:: yaml
   :caption: Example

   - id: alias:gdpr
   - id: https://eur-lex.europa.eu/eli/reg/2016/679/oj
