``publiccode.yml``
==================

``publiccode.yml`` describes software developed or acquired by public
administrations. Authors place the file in the root of the source code
repository so that other administrations can find and evaluate the
software for reuse.

National software catalogs collect these files to build searchable
listings. A shared format lets catalogs exchange information across
countries. The `core tools
<https://github.com/publiccodeyml/publiccode.yml#core-tools>`__
include an editor and a parser for the format.

A minimal ``publiccode.yml``:

.. literalinclude:: example/publiccode.minimal.yml
   :language: yaml

The :doc:`full example <example>` uses every key.

.. toctree::
   :maxdepth: 2
   :hidden:

   types.rst
   vocabularies.rst
   forks.rst
   example.rst

Conventions
-----------

The key words MUST, MUST NOT, REQUIRED, SHOULD, SHOULD NOT,
RECOMMENDED, MAY and OPTIONAL in this document are to be interpreted
as described in BCP 14 (`RFC 2119 <https://www.rfc-editor.org/rfc/rfc2119>`__,
`RFC 8174 <https://www.rfc-editor.org/rfc/rfc8174>`__) only when they
appear in all capitals.

A key marked *(required)* MUST be present. Within an optional
section, required keys MUST be present if you include that section.
Other keys are optional unless their descriptions state a condition.

A key MUST NOT have a null value. Omit an optional key if you have
no value for it. A file MUST NOT contain keys this specification
does not define.

Every value follows the rules of its :doc:`type <types>`.

Specification
-------------

``publiccodeYmlVersion`` *(required)*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

:ref:`enumerated string <enumerated-string-type>`

.. code-block:: yaml
   :caption: Example

   publiccodeYmlVersion: "1"

The version of the specification the file follows: ``"1"``.

.. _name:

``name`` *(required)*
~~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

:ref:`string <string-type>`

.. code-block:: yaml
   :caption: Example

   name: Firefax

The short public name of the software, the one users know it by.

.. _url:

``url`` *(required)*
~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

:ref:`URL <url-type>`

.. code-block:: yaml
   :caption: Example

   url: https://example.com/firefax.git

The URL of the source code repository (git, svn and so on) where the
software is published. It is also the unique identifier of the
software. Any scheme is allowed. If the repository is reachable over
several protocols, prefer HTTPS.

.. tip::

   Forking just to contribute? Do not change ``url``: it keeps
   pointing at the original repository, and catalogs use the mismatch
   to skip the fork. Only a fork published as software of its own
   SHOULD change it. See :ref:`forks`.

``softwareType`` *(required)*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

:ref:`enumerated string <enumerated-string-type>`

.. code-block:: yaml
   :caption: Example

   softwareType: standalone/desktop

The kind of software and how it reaches its users.

Allowed values:

-  ``standalone/mobile``: A standalone application for a mobile
   operating system.
-  ``standalone/iot``: A standalone application for an IoT device.
-  ``standalone/desktop``: A standalone application for a desktop
   operating system.
-  ``standalone/web``: A web application, running on a server and
   used through a web browser.
-  ``standalone/backend``: A backend application exposing interfaces
   (e.g. APIs) to other services, with no direct user interface.
-  ``standalone/other``: A standalone application of another kind.
-  ``addon``: A plugin, theme or other extension for an application,
   such as a CMS or an office suite.
-  ``library``: A library or an SDK for developers to use in other
   software.
-  ``configurationFiles``: Configuration files or scripts for a
   deployment, such as Bash scripts, Ansible playbooks or Dockerfiles.

``platforms`` *(required)*
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

:ref:`array <array-type>` of :ref:`strings <string-type>`

Values: ``web``, ``windows``, ``mac``, ``linux``, ``ios``,
``android``. When none of them fits, another human readable value
is allowed.

.. code-block:: yaml
   :caption: Example

   platforms:
     - linux
     - windows
     - mac

The platforms people use to access and operate the software, not the
ones it runs on: a web application lists ``web``, whatever system its
server runs.

``developmentStatus`` *(required)*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

:ref:`enumerated string <enumerated-string-type>`

.. code-block:: yaml
   :caption: Example

   developmentStatus: stable

How far the development of the software has gone.

Allowed values:

-  ``concept``: An idea for software. The repository may contain no
   code yet.
-  ``development``: Development has started. The software is not yet
   ready for end users to test.
-  ``beta``: Available for testing, including alpha versions. A
   public release is optional at this stage.
-  ``stable``: Has seen a first public release and is ready to be
   used in a production environment.
-  ``obsolete``: No longer maintained or kept up to date. All of the
   source code is archived and kept for historical reasons.

``description`` *(required)*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Descriptions of the software, grouped by language.

Use a subsection for each language, named with its
:ref:`language tag <language-tag-type>`. At least one language MUST
be present.

An example for English:

.. code:: yaml

   description:
     en:
       shortDescription: ...
       longDescription: ...

In the key names below, ``[lang]`` stands for that tag.

``description/[lang]/localisedName``
''''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`string <string-type>`

.. code-block:: yaml
   :caption: Example

   description:
     en:
       localisedName: Firefax

The short public name of the software in this language, for when
it differs from :ref:`name <name>`.

``description/[lang]/shortDescription`` *(required)*
''''''''''''''''''''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`string <string-type>` (max 150 chars)

.. code-block:: yaml
   :caption: Example

   description:
     en:
       shortDescription: Send and receive faxes from the desktop

A short description of the software: a single line containing a
single sentence, maximum 150 characters.

``description/[lang]/longDescription``
''''''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`string <string-type>` (min 150 chars, max 10000 chars)

.. rst-class:: key-condition

MUST be present in at least one language.

.. code-block:: yaml
   :caption: Example

   description:
     en:
       longDescription: |
         Firefax lets you send and receive faxes from a desktop computer
         without a fax machine. You can search received faxes in an archive,
         schedule outgoing faxes and track their delivery.

         Offices that exchange documents by fax can keep those documents
         in one archive and replace their fax machines.

A longer description of the software, between 150 and 10000
characters, giving potential users an overview of what it can do.
Write it for users, not developers: it is the text that would
present the software on its website.

The value MAY contain line breaks and uses Markdown as defined by
`CommonMark <https://commonmark.org/>`__. Consumers MAY support only
``*italic*``, ``**bold**``, bullet points and ``[links](#)``. Use these
formats to keep the description readable across catalogs.

.. _documentation:

``description/[lang]/documentation``
''''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`URL <url-type>`

.. code-block:: yaml
   :caption: Example

   description:
     en:
       documentation: https://example.com/firefax/docs

A URL to the user documentation of the software.

.. tip::

   Prefer HTML documentation that users can browse and search on
   desktop and mobile devices. For a downloadable document, link to
   the file and use an open format such as PDF or ODT.

   Publish the documentation sources under an open license, for
   example in the source code repository.

``description/[lang]/apiDocumentation``
'''''''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`URL <url-type>`

.. code-block:: yaml
   :caption: Example

   description:
     en:
       apiDocumentation: https://example.com/firefax/api

A URL to the hosted API documentation of the software.

.. tip::

   The advice for :ref:`documentation <documentation>` applies here
   too. If there is a reference or test deployment, also consider an
   interactive interface (e.g. Swagger).

.. _features:

``description/[lang]/features``
'''''''''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`array <array-type>` of :ref:`strings <string-type>`

.. code-block:: yaml
   :caption: Example

   description:
     en:
       features:
         - Send and receive faxes without a fax machine
         - Search the archive of received faxes
         - Schedule outgoing faxes
         - Track the delivery of every fax
         - Sign outgoing faxes digitally

What users can do with the software. Write the list for public
decision makers who would commission it.

.. tip::

   Aim for 5 to 20 features, depending on the size and complexity of
   the software. Leave the details to the documentation.

.. _screenshots:

``description/[lang]/screenshots``
''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta key-meta-union

:meta-type:`array <array-type>` of :meta-type:`paths <path-type>` or :meta-type:`URLs <url-type>`

Formats: PNG, JPEG, WebP, AVIF

.. code-block:: yaml
   :caption: Example

   description:
     en:
       screenshots:
         - img/screenshots/inbox.png
         - img/screenshots/compose.png

Screenshots of the software, giving a quick idea of what it looks
like and how it works.

Each item is either a path relative to the root of the repository or
an absolute URL to the raw file. Either way, the file MUST be in the
same repository as ``publiccode.yml``.

.. tip::

   Screenshots can be of any shape and size. The suggested sizes
   are:

   -  Desktop: 1280x800 @1x
   -  Tablet: 1024x768 @2x
   -  Mobile: 375x667 @2x

``description/[lang]/videos`` (*deprecated*)
''''''''''''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`array <array-type>` of :ref:`URLs <url-type>`

.. code-block:: yaml
   :caption: Example

   description:
     en:
       videos:
         - https://www.youtube.com/watch?v=xxxxxxxxxxx

Videos showing how the software looks and works.

Videos MUST be hosted on a video sharing website that supports the
`oEmbed <https://oembed.com>`__ standard, such as YouTube or Vimeo.

This key is deprecated. Link to videos from the documentation or
the software's website.

``description/[lang]/awards``
'''''''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`array <array-type>` of :ref:`strings <string-type>`

.. code-block:: yaml
   :caption: Example

   description:
     en:
       awards:
         - Public Sector Software Award 2025

A list of awards won by the software.

``legal`` *(required)*
~~~~~~~~~~~~~~~~~~~~~~

The license of the software and who holds its copyright.

``legal/license`` *(required)*
''''''''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`string <string-type>`

.. code-block:: yaml
   :caption: Example

   legal:
     license: EUPL-1.2 OR AGPL-3.0-or-later

The license the software is distributed under. The value MUST be a
valid SPDX expression referring to one or more open source licenses:
see the `SPDX License List <https://spdx.org/licenses/>`__.

``legal/mainCopyrightOwner``
''''''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`string <string-type>`

.. code-block:: yaml
   :caption: Example

   legal:
     mainCopyrightOwner: Example City Council

The entity that owns the copyright on most of the code in the
repository: usually the one named next to the copyright symbol at the
top of most files.

You can name several owners in one English sentence or name a
community, such as "Linus Torvalds and all Linux contributors". Omit
the key if you cannot identify a main copyright owner.

.. _organisation:

``organisation``
~~~~~~~~~~~~~~~~

The organisation publishing the software. This section is optional.

Organisations funding the software go in :ref:`fundedBy <funded-by>`,
as items of the :ref:`Organisation <organisation-type>` type.

.. _organisation-uri:

``organisation/uri`` *(required)*
'''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`URI <uri-type>`

.. code-block:: yaml
   :caption: Example

   organisation:
     uri: https://example.com/organisations/example-city-council

The URI identifying the organisation publishing the software. The value
SHOULD be a stable, resolvable URI or a persistent identifier.

When the URI follows a recognized format, parsers MAY read more
information from its structure, for example an institutional domain
or an official code.

Consumers of ``publiccode.yml`` SHOULD use a trusted source outside
the file to verify that the URI belongs to the organisation in
control of the repository. Each consumer chooses its verification
method.

.. _organisation-name:

``organisation/name``
'''''''''''''''''''''

.. rst-class:: key-meta

:ref:`string <string-type>`

.. code-block:: yaml
   :caption: Example

   organisation:
     name: Example City Council

The canonical name of the organisation publishing the software.

It MUST name the entity identified by
:ref:`organisation/uri <organisation-uri>`, as a human readable label
for that URI. It SHOULD be the widely recognized form of the name,
such as the registered legal or institutional name.

.. _maintenance:

``maintenance`` *(required)*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

How the software is maintained and who maintains it.

.. _maintenance-type:

``maintenance/type`` *(required)*
'''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`enumerated string <enumerated-string-type>`

.. code-block:: yaml
   :caption: Example

   maintenance:
     type: contract

How the software is currently maintained.

Allowed values:

-  ``internal``: The repository owner maintains the software.
-  ``contract``: A contractor maintains the software under a
   commercial agreement.
-  ``community``: Maintained by one or more people who donate their
   time to the project.
-  ``none``: Not actively maintained.

``maintenance/contractors``
'''''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`array <array-type>` of :ref:`Contractors <contractor-type>`

.. rst-class:: key-condition

MUST be present if :ref:`maintenance/type <maintenance-type>` is
``contract``. MUST NOT be present otherwise.

.. code-block:: yaml
   :caption: Example

   maintenance:
     contractors:
       - name: Example Software Ltd
         until: "2027-12-31"
         email: jane.doe@supplier.example.com
         website: https://supplier.example.com

The entities currently contracted to maintain the software:
companies, organisations or other collective names, or people.

``maintenance/contacts``
''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`array <array-type>` of :ref:`Contacts <contact-type>`

.. rst-class:: key-condition

MUST be present if :ref:`maintenance/type <maintenance-type>` is
``internal`` or ``community``. Optional otherwise.

.. code-block:: yaml
   :caption: Example

   maintenance:
     contacts:
       - name: Jane Doe
         email: jane.doe@supplier.example.com
         affiliation: Example Software Ltd
         phone: "+441234567890"

The people responsible for technical maintenance. Each contact MUST
be a person. Use ``affiliation`` for the institution they represent.

For contracted or subcontracted maintenance, list the people who do
the work. Include the software owner only if they also maintain it.

``localisation`` *(required)*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Whether the software supports localisation and which languages it
is available in.

``localisation/localisationReady`` *(required)*
'''''''''''''''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`boolean <boolean-type>`

.. code-block:: yaml
   :caption: Example

   localisation:
     localisationReady: true

If ``true``, the software supports translation into other languages.
It may still be available in one language.

``localisation/availableLanguages`` *(required)*
''''''''''''''''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`array <array-type>` of :ref:`language tags <language-tag-type>`

.. code-block:: yaml
   :caption: Example

   localisation:
     availableLanguages:
       - en
       - fr
       - de-AT

The languages the software is available in.
It MUST contain at least one language tag.

``logo``
~~~~~~~~

.. rst-class:: key-meta key-meta-union

:meta-type:`path <path-type>` or :meta-type:`URL <url-type>`

Formats: SVG, SVGZ, PNG, JPEG, WebP, AVIF

.. code-block:: yaml
   :caption: Example

   logo: img/logo.svg

The logo of the software. Logos SHOULD be in vector format.

The value is either a path relative to the root of the repository or
an absolute URL to the raw file. Either way, the file MUST be in the
same repository as ``publiccode.yml``.

``softwareVersion``
~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

:ref:`string <string-type>`

.. code-block:: yaml
   :caption: Example

   softwareVersion: "2.3"

The latest stable version of the software. Parsers SHOULD display
this string without interpreting or parsing it. They SHOULD NOT assume
semantic versioning or any other version format.

``releaseDate``
~~~~~~~~~~~~~~~

.. rst-class:: key-meta

:ref:`date <date-type>`

.. code-block:: yaml
   :caption: Example

   releaseDate: "2026-03-15"

The date the latest version was released.

``landingURL``
~~~~~~~~~~~~~~

.. rst-class:: key-meta

:ref:`URL <url-type>`

.. code-block:: yaml
   :caption: Example

   landingURL: https://example.com/firefax

A web page that catalogs link to when :ref:`url <url>` gives access
only to a version control client. The page can also offer a graphical
installer for download.

``applicationSuite``
~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

:ref:`string <string-type>`

.. code-block:: yaml
   :caption: Example

   applicationSuite: MegaProductivitySuite

The name of the suite the software belongs to, such as an office
suite that includes a word processor. Catalogs can use it to group
related software.

.. _categories-key:

``categories``
~~~~~~~~~~~~~~

.. rst-class:: key-meta

:ref:`array <array-type>` of :ref:`enumerated strings <enumerated-string-type>`

Allowed values: see :ref:`categories`

.. code-block:: yaml
   :caption: Example

   categories:
     - communications
     - document-management

The categories the software belongs to. Catalogs use them to group
software.

.. _supports:

``supports``
~~~~~~~~~~~~

.. rst-class:: key-meta

:ref:`array <array-type>` of :ref:`Supported resources <supported-resource-type>`

.. code-block:: yaml
   :caption: Example

   supports:
     - id: alias:gdpr
     - id: https://eur-lex.europa.eu/eli/dir/2016/2102/oj

A list of standards, regulations, frameworks or systems that the
software supports or complies with.

``intendedAudience``
~~~~~~~~~~~~~~~~~~~~

Who the software is for.

.. _intended-audience-countries:

``intendedAudience/countries``
''''''''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`array <array-type>` of :ref:`country codes <country-code-type>`

.. code-block:: yaml
   :caption: Example

   intendedAudience:
     countries:
       - GB

Countries explicitly included in the intended audience: the
software claims compliance with their processes, technologies
or laws.

.. tip::

   Leave this key out when the software is not tied to the processes,
   technologies or laws of any country, as is the case for a general
   purpose content management system. Do not list every country to
   mean a worldwide audience.

``intendedAudience/unsupportedCountries`` (*deprecated*)
''''''''''''''''''''''''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`array <array-type>` of :ref:`country codes <country-code-type>`

Countries explicitly excluded from the intended audience, for
instance when the software conflicts with a law, process or
technology of theirs.

This key is deprecated. Use
:ref:`intendedAudience/countries <intended-audience-countries>` to list
the countries the software targets.

.. _intended-audience-scope:

``intendedAudience/scope``
''''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`array <array-type>` of :ref:`enumerated strings <enumerated-string-type>`

Allowed values: see :ref:`scopes`

.. code-block:: yaml
   :caption: Example

   intendedAudience:
     scope:
       - local-authorities

The sectors the software serves, such as healthcare or education.

``usedBy`` (*deprecated*)
~~~~~~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

:ref:`array <array-type>` of :ref:`strings <string-type>`

Names of prominent public administrations using the software, shown
as testimonials.

Parsers can supplement the list using other evidence of use, such
as a fork owned by an administration.

This key is deprecated.

.. _funded-by:

``fundedBy``
~~~~~~~~~~~~

.. rst-class:: key-meta

:ref:`array <array-type>` of :ref:`Organisations <organisation-type>`

The organisations known to be funding the development of the software.

``roadmap``
~~~~~~~~~~~

.. rst-class:: key-meta

:ref:`URL <url-type>`

.. code-block:: yaml
   :caption: Example

   roadmap: https://example.com/firefax/roadmap

A link to a public roadmap of the software.

.. _is-based-on:

``isBasedOn``
~~~~~~~~~~~~~

.. rst-class:: key-meta

:ref:`array <array-type>` of :ref:`URLs <url-type>`

.. code-block:: yaml
   :caption: Example

   isBasedOn:
     - https://example.com/openfax.git

When the software is a fork, the :ref:`url <url>` of the software it
was forked from, whether or not that has a ``publiccode.yml``. Like
``url``, it allows any scheme.

The key marks the software as a fork published as software of its
own: see :ref:`forks`.

``dependsOn``
~~~~~~~~~~~~~

The system-level dependencies needed to install and use the
software.

.. note::

   List only the runtime and system-level dependencies installed and
   maintained separately, such as a database. Do not list source code
   dependencies, such as the libraries the software uses.

``dependsOn/open`` (*deprecated*)
'''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`array <array-type>` of :ref:`Dependencies <dependency-type>`

Runtime dependencies distributed under an open-source license.

This key is deprecated. Declare these dependencies in an SBOM or
package manager manifests. Put installation requirements in the
documentation and deployment scripts.

``dependsOn/proprietary``
'''''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`array <array-type>` of :ref:`Dependencies <dependency-type>`

.. code-block:: yaml
   :caption: Example

   dependsOn:
     proprietary:
       - name: Oracle Database
         versionMin: "19"
         versionMax: "23"
         optional: true

Runtime dependencies distributed under a proprietary license.

``dependsOn/hardware``
''''''''''''''''''''''

.. rst-class:: key-meta

:ref:`array <array-type>` of :ref:`Dependencies <dependency-type>`

.. code-block:: yaml
   :caption: Example

   dependsOn:
     hardware:
       - name: Fax modem
         versionMin: "1"
         versionMax: "2"
         optional: true

Hardware needed to use the software.

Encoding
--------

``publiccode.yml`` MUST be UTF-8 encoded and MUST be a
YAML 1.2 document.
