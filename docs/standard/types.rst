Types
=====

.. _contact-type:

Contact
-------

Properties:

-  ``name`` (**required**): The full name of one of the
   technical contacts. It must be a real person; do NOT populate
   this key with generic contact information, company departments,
   associations, etc.
-  ``email``: The e-mail address of the technical contact. It must
   be an address where the contact can be directly reached; do NOT
   populate this key with mailing-lists or generic contact points
   like “info@acme.inc”.
-  ``phone``: Phone number. It MUST include the international dialing
   prefix, following the `E.164 <https://www.itu.int/rec/T-REC-E.164/en>`_
   format (e.g., ``+3923113215112``). This has to be a string.
-  ``affiliation``: The affiliation of the technical contact. In
   case of multiple maintainers, this can be used to create a relation between each
   technical contact and each maintainer entity. It can contain for
   instance a company name, an association name, etc.

.. _contractor-type:

Contractor
----------

Properties:

-  ``name`` (**required**): The name of the contractor, whether it’s a
   company or a physical person.
-  ``until`` (**required**): The date the maintenance is going
   to end, as “YYYY-MM-DD”, the only allowed ISO8601 format.
-  ``email``: The e-mail address of the contractor. It must be an
   address where the contractor can be directly reached; do NOT
   populate this key with mailing-lists or generic contact points
   like “info@acme.inc”.
-  ``website``: The maintainer website: either the main
   institutional website, or a more project-specific page.

.. _dependency-type:

Dependency
----------

Properties:

-  ``name`` (**required**): The name of the dependency (e.g. MySQL,
   NFC Reader).
-  ``versionMin``: The first compatible version.
-  ``versionMax``: The latest compatible version.
-  ``version``: The only major version for which the software is
   compatible. It assumes compatibility with all patches and bugfixes
   later applied to this version.
-  ``optional``: Whether the dependency is optional or required.

Complex versioning
~~~~~~~~~~~~~~~~~~

It is of course possible to use the various keys to specify a complex
compatibility matrix.

*Ex. 1*

.. code:: yaml

   - name: PostgreSQL
     version: "16"
     optional: true

This snippet marks an optional dependency on PostgreSQL 16, with any
of its patch releases.

*Ex. 2*

.. code:: yaml

   - name: MySQL
     versionMin: "8.0"
     versionMax: "8.4"

This snippet marks a required dependency on MySQL, allowing any version
between 8.0 and 8.4.

.. _organisation-type:

Organisation
------------

A structure (association, company, public authority, etc.) that
can fund software development.

Properties:

-  ``name`` (**required**): The name of the organisation, whether
   it’s an association, a company, a public sector organisation, or
   a physical person.
-  ``uri``: The URI identifying the organisation.
