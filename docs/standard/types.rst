Types
=====

Each key lists its type below its name. Values MUST follow the
rules for that type.

.. _date-type:

Date
----

A calendar date in the ISO 8601 ``YYYY-MM-DD`` format, the only
ISO 8601 format allowed. Quote it in YAML, as in
``"2017-04-15"``, so that it stays a string.

.. _enumerated-string-type:

Enumerated string
-----------------

A string taking one of the values listed for its key.

.. _language-tag-type:

Language tag
------------

An IETF `BCP 47 <https://www.rfc-editor.org/info/bcp47/>`__ language
tag, such as ``en``, ``it`` or ``de-AT``.

.. _country-code-type:

Country code
------------

An `ISO 3166-1 alpha-2
<https://www.iso.org/iso-3166-country-codes.html>`__ country code,
such as ``IT`` or ``DE``. The code MUST be uppercase.

.. _path-type:

Path
----

The path of a file in the repository, relative to its root, such
as ``img/logo.svg``.

.. _uri-type:

URI
---

A URI as defined by `RFC 3986
<https://www.rfc-editor.org/rfc/rfc3986>`__, such as a URL or a URN.

.. _url-type:

URL
---

An absolute URL, scheme included, such as
``https://example.com/firefax``.

.. _contact-type:

Contact
-------

Properties:

-  ``name`` (**required**): The full name of the technical contact.
   It MUST be a real person, not generic contact information, a
   company department or an association.
-  ``email``: The e-mail address of the technical contact. It MUST
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
-  ``until`` (**required**): The :ref:`date <date-type>` the
   maintenance is going to end. For community maintenance, it SHOULD
   be no more than two years in the future. Update it regularly while
   the community maintains the software.
-  ``email``: The e-mail address of the technical contact. It MUST
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
