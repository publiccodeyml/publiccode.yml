.. _organisation-type:

Organisation
************

An entity that can fund software development, such as an
association, a company, a public authority or a person.

This type is the item of :ref:`fundedBy <funded-by>`. The organisation
publishing the software goes in the separate
:ref:`organisation <organisation>` section, which has its own
properties.

Properties:

-  ``name`` *(required)*, :ref:`string <string-type>`: The name of the
   organisation or person funding the software.
-  ``uri``, :ref:`URI <uri-type>`: The URI identifying the organisation
   or person named in ``name``.
