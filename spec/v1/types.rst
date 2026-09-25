Types
=====

Each key lists its type below its name. Values MUST follow the
rules for that type.

.. _string-type:

String
------

A sequence of Unicode characters. Date, Enumerated string, Language
tag, Country code, E-mail address, Path, URI and URL values are
strings and MUST follow these rules too.

Parsers MUST ignore leading and trailing whitespace. The remaining
value MUST NOT be empty.

A string MUST NOT contain line breaks, unless its key allows them.

Count characters after trimming leading and trailing whitespace.
Use the extended grapheme clusters defined in `Unicode Standard
Annex #29 <https://www.unicode.org/reports/tr29/>`__. For example,
``é`` counts as one character whether stored as one code point or as
``e`` followed by a combining accent.

The value MUST be a YAML string: a number, a boolean or null is an
error.

.. _boolean-type:

Boolean
-------

``true`` or ``false``, unquoted.

.. _array-type:

Array
-----

A YAML sequence of values of the same type.

A key of this type MUST hold a list even for a single item. For
example, write ``platforms: [web]``.

An array MUST contain at least one item and MUST NOT contain
duplicates. Omit an optional key if you have no items to list.

.. _date-type:

Date
----

A calendar date in the ISO 8601 ``YYYY-MM-DD`` format, the only
ISO 8601 format allowed. Quote it in YAML, as in
``"2017-04-15"``, so that it stays a string.

The date MUST exist in the calendar: ``"2023-02-30"`` is not a date.

.. _enumerated-string-type:

Enumerated string
-----------------

A string taking one of the values listed for its key.

Values are case sensitive: write them exactly as listed.

.. _language-tag-type:

Language tag
------------

An IETF `BCP 47 <https://www.rfc-editor.org/info/bcp47/>`__ language
tag, such as ``en``, ``it`` or ``de-AT``.

As in BCP 47, tags are case insensitive. They SHOULD be written in
their canonical case, as in ``de-AT``.

.. _country-code-type:

Country code
------------

An `ISO 3166-1 alpha-2
<https://www.iso.org/iso-3166-country-codes.html>`__ country code,
such as ``IT`` or ``DE``. The code MUST be uppercase.

.. _email-type:

E-mail address
--------------

An e-mail address, in the ``addr-spec`` form of `RFC 5322
<https://www.rfc-editor.org/rfc/rfc5322#section-3.4.1>`__, such as
``jane.doe@example.com``. Display names like
``Jane Doe <jane.doe@example.com>`` are not allowed.

.. _path-type:

Path
----

The path of a file in the repository, relative to its root, such
as ``img/logo.svg``.

A path MUST NOT start with ``/`` or refer to a file outside the
repository, for example through ``..``.

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

The scheme MUST be ``http`` or ``https``, unless the key allows
others.

.. _contact-type:

Contact
-------

Properties:

-  ``name`` *(required)*, :ref:`string <string-type>`: The full name
   of the technical contact. It MUST be a real person, not generic
   contact information, a company department or an association.
-  ``email``, :ref:`e-mail address <email-type>`: The e-mail address
   of the technical contact. It MUST reach the contact directly, not a
   mailing list or a generic contact point like ``info@acme.inc``.
-  ``phone``, :ref:`string <string-type>`: The phone number, in
   `E.164 <https://www.itu.int/rec/T-REC-E.164/en>`_ format. It MUST
   include the international dialing prefix (e.g.
   ``+3923113215112``).
-  ``affiliation``, :ref:`string <string-type>`: The organisation the
   technical contact works for, such as a company or an association.
   With several maintainers, it tells which maintainer entity each
   contact belongs to.

.. _contractor-type:

Contractor
----------

Properties:

-  ``name`` (**required**), :ref:`string <string-type>`: The name of the
   contractor, whether it’s a company or a physical person.
-  ``until`` (**required**), :ref:`date <date-type>`: The date the
   maintenance is going to end. For community maintenance, it SHOULD
   be no more than two years in the future. Update it regularly while
   the community maintains the software.
-  ``email``, :ref:`e-mail address <email-type>`: The e-mail address
   of the technical contact. It MUST reach that person directly, not a
   mailing list or a generic contact point like ``info@acme.inc``.
-  ``website``, :ref:`URL <url-type>`: The contractor website: its
   main institutional site or a page specific to the project.

.. _dependency-type:

Dependency
----------

Properties:

-  ``name`` *(required)*, :ref:`string <string-type>`: The name of the
   dependency (e.g. MySQL, NFC Reader).
-  ``versionMin``, :ref:`string <string-type>`: The oldest compatible
   version.
-  ``versionMax``, :ref:`string <string-type>`: The newest compatible
   version.
-  ``version``, :ref:`string <string-type>`: The only compatible major
   version, including the patches and bugfixes released for it later.
   It MUST NOT be present together with ``versionMin`` or
   ``versionMax``.
-  ``optional``, :ref:`boolean <boolean-type>`: If ``true``, the
   software also works without the dependency. Defaults to ``false``.

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
association, a company or a public authority. Its properties follow
the same rules as the :ref:`organisation <organisation>` section.

Properties:

-  ``uri`` *(required)*, :ref:`URI <uri-type>`: The URI identifying
   the organisation.
-  ``name``, :ref:`string <string-type>`: The name of the
   organisation, whether it’s an association, a company, a public
   sector organisation or a physical person. It is a human readable
   label for ``uri``.
