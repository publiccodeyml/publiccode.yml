Types
=====

.. _contact-type:

Contact
-------

Properties:

-  ``name`` (**required**): The full name of the technical contact.
   It must be a real person, not generic contact information, a
   company department or an association.
-  ``email``: The e-mail address of the technical contact. It must
   reach the contact directly, not a mailing list or a generic
   contact point like ``info@acme.inc``.
-  ``phone``: The phone number, as a string in
   `E.164 <https://www.itu.int/rec/T-REC-E.164/en>`_ format. It MUST
   include the international dialing prefix (e.g.
   ``+3923113215112``).
-  ``affiliation``: The organisation the technical contact works for,
   such as a company or an association. With several maintainers, it
   tells which maintainer entity each contact belongs to.

.. _contractor-type:

Contractor
----------

Properties:

-  ``name`` (**required**): The name of the contractor, whether it’s a
   company or a physical person.
-  ``until`` (**required**): The date the maintenance is going
   to end, as “YYYY-MM-DD”, the only allowed ISO8601 format. For
   community maintenance, it should be no more than two years in the
   future. Update it regularly while the community maintains the
   software.
-  ``email``: The e-mail address of the technical contact. It must
   reach that person directly, not a mailing list or a generic
   contact point like ``info@acme.inc``.
-  ``website``: The contractor website: its main institutional site
   or a page specific to the project.

.. _dependency-type:

Dependency
----------

Properties:

-  ``name`` (**required**): The name of the dependency (e.g. MySQL,
   NFC Reader).
-  ``versionMin``: The oldest compatible version.
-  ``versionMax``: The newest compatible version.
-  ``version``: The only compatible major version, including the
   patches and bugfixes released for it later.
-  ``optional``: If ``true``, the software also works without the
   dependency. Defaults to ``false``.

Complex versioning
~~~~~~~~~~~~~~~~~~

The version keys combine to describe a compatibility range.

.. code-block:: yaml
   :caption: Example 1

   - name: PostgreSQL
     version: "16"
     optional: true

This snippet marks an optional dependency on PostgreSQL 16, with any
of its patch releases.

.. code-block:: yaml
   :caption: Example 2

   - name: MySQL
     versionMin: "8.0"
     versionMax: "8.4"

This snippet marks a required dependency on MySQL, allowing any version
between 8.0 and 8.4.

.. _organisation-type:

Organisation
------------

An entity that can fund software development, such as an
association, a company or a public authority.

Properties:

-  ``name`` (**required**): The name of the organisation, whether
   it’s an association, a company, a public sector organisation, or
   a physical person.
-  ``uri``: The URI identifying the organisation.
