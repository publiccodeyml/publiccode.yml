.. _organisation-type:

Organisation
************

An organisation is a structure (association, company, public
authority, etc.) or a physical person that can fund software
development. An organisation is a mapping with the following keys:

-  ``name`` - **mandatory** - The name of the organisation, whether
   it’s an association, a company, a public sector organisation, or
   a physical person.
-  ``uri`` - The URI identifying the organisation.

This type is the item of ``fundedBy``. The organisation publishing the
software goes in the separate ``organisation`` section, which has its
own keys.
