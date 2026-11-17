.. role:: meta-type

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

.. toctree::
   :maxdepth: 2
   :hidden:

   forks.rst
   types.rst
   vocabularies.rst

Specification
-------------

``publiccodeYmlVersion`` *(required)*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

string

The version of the specification the file follows: ``"1"``.

.. _name:

``name`` *(required)*
~~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

string

Example:

.. code:: yaml

   name: Firefax

The short public name of the software, the one users know it by.

.. _url:

``url`` *(required)*
~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

URL

Example:

.. code:: yaml

   url: https://example.com/firefax.git

The URL of the source code repository (git, svn and so on) where the
software is published. It is also the unique identifier of the
software. If the repository is reachable over several protocols,
prefer HTTPS.

.. tip::

   Forking just to contribute upstream? Do not change ``url``: it
   keeps pointing at the original repository, and parsers use the
   mismatch to skip technical forks. Only a fork meant to become its
   own project should change it. See :ref:`forks-and-variants`.

``softwareType`` *(required)*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

enumerated string

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
-  ``addon``: A plugin, theme or other addon for a host
   software (e.g. a CMS or an office suite).
-  ``library``: A library or an SDK for developers to use in other
   software.
-  ``configurationFiles``: Configuration files or scripts for a
   deployment, such as Bash scripts, Ansible playbooks or Dockerfiles.

``platforms`` *(required)*
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta key-meta-union

:meta-type:`enumerated string` or :meta-type:`array of strings`

-  Values: ``web``, ``windows``, ``mac``, ``linux``, ``ios``,
   ``android``. When none of them fits, another human readable value
   is allowed.

Example:

.. code:: yaml

   platforms:
     - web

The platforms people use to access and operate the software, not the
ones it runs on: a web application lists ``web``, whatever system its
server runs.

``developmentStatus`` *(required)*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

enumerated string

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

``description``
~~~~~~~~~~~~~~~

Descriptions of the software, grouped by language.

The strings in this section are user-visible and grouped by
language: each language is a sub-section named with its IETF
`BCP 47 <https://tools.ietf.org/html/bcp47>`__ tag, and at least
one language must be present.

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

string

Example:

.. code:: yaml

   description:
     en:
       localisedName: Firefax

The short public name of the software in this language, for when
it differs from :ref:`name <name>`.

``description/[lang]/shortDescription`` *(required)*
''''''''''''''''''''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

string (max 150 chars)

Example:

.. code:: yaml

   description:
     en:
       shortDescription: Advanced booking system for hospitals

A short description of the software: a single line containing a
single sentence, maximum 150 characters.

``description/[lang]/longDescription``
''''''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

string (min 150 chars, max 10000 chars)

**Required** for at least one language.

A longer description of the software, between 150 and 10000
characters, giving potential users an overview of what it can do.
Write it for users, not developers: it is the text that would
present the software on its website.

The value of this key is Markdown, as defined by
`CommonMark <https://commonmark.org/>`__. Keep the formatting basic:
``*italic*``, ``**bold**``, bullet points and ``[links](#)``, since
consumers MAY render only this subset.

.. _documentation:

``description/[lang]/documentation``
''''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

URL

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

URL

A URL to the hosted API documentation of the software.

.. tip::

   The advice for :ref:`documentation <documentation>` applies here
   too. If there is a reference or test deployment, also consider an
   interactive interface (e.g. Swagger).

``description/[lang]/features``
'''''''''''''''''''''''''''''''

.. rst-class:: key-meta

array of strings

What users can do with the software. Write the list for public
decision makers who would commission it.

.. tip::

   Aim for 5 to 20 features, depending on the size and complexity of
   the software. Leave the details to the documentation.

.. _screenshots:

``description/[lang]/screenshots``
''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta key-meta-union

:meta-type:`array` of :meta-type:`paths` or :meta-type:`URLs`

-  Formats: PNG, JPEG, WebP, AVIF

Example:

.. code:: yaml

   description:
     en:
       screenshots:
         - data/screenshots/configuration.png

Screenshots of the software, giving a quick idea of what it looks
like and how it works.

Each item is either a path relative to the root of the repository or
an absolute URL to the raw file. Either way, the file must be in the
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

array of URLs

Example:

.. code:: yaml

   description:
     en:
       videos:
         - https://youtube.com/xxxxxxxx

Videos showing how the software looks and works.

Videos must be hosted on a video sharing website that supports the
`oEmbed <https://oembed.com>`__ standard, such as YouTube or Vimeo.

This key is deprecated. Link to videos from the documentation or
the software's website.

``description/[lang]/awards``
'''''''''''''''''''''''''''''

.. rst-class:: key-meta

array of strings

A list of awards won by the software.

``legal``
~~~~~~~~~

``legal/license`` *(required)*
''''''''''''''''''''''''''''''

.. rst-class:: key-meta

string

Example:

.. code:: yaml

   legal:
     license: EUPL-1.2 OR AGPL-3.0-or-later

The license the software is distributed under. The value must be a
valid SPDX expression referring to one or more open source licenses:
see the `SPDX License List <https://spdx.org/licenses/>`__.

``legal/mainCopyrightOwner``
''''''''''''''''''''''''''''

.. rst-class:: key-meta

string

Example:

.. code:: yaml

   legal:
     mainCopyrightOwner: City of Amsterdam

The entity that owns the copyright on most of the code in the
repository: usually the one named next to the copyright symbol at the
top of most files.

You can name several owners in one English sentence or name a
community, such as "Linus Torvalds and all Linux contributors". Omit
the key if you cannot identify a main copyright owner.

``organisation``
~~~~~~~~~~~~~~~~

The organisation publishing the software. This section is optional.

.. _organisation-uri:

``organisation/uri`` *(required)*
'''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

string

Example:

.. code:: yaml

   organisation:
     uri: https://example.org/my-organisation

The URI identifying the organisation publishing the software. The value
SHOULD be a stable, resolvable URI or a persistent identifier.

When the URI follows a recognized format, parsers MAY read more
information from its structure, for example an institutional domain
or an official code.

It is RECOMMENDED that crawlers and consumers of ``publiccode.yml``
verify out of band that the declared URI belongs to the organisation
in control of the repository. How to verify it is up to the
implementation and policies of each consumer.

.. _organisation-name:

``organisation/name``
'''''''''''''''''''''

.. rst-class:: key-meta

string

Example:

.. code:: yaml

   organisation:
     name: My organisation

The canonical name of the organisation publishing the software.

It MUST name the entity identified by
:ref:`organisation/uri <organisation-uri>`, as a human readable label
for that URI. It SHOULD be the widely recognized form of the name,
such as the registered legal or institutional name.

.. _maintenance:

``maintenance``
~~~~~~~~~~~~~~~

How the software is maintained and who maintains it.

.. _maintenance-type:

``maintenance/type`` *(required)*
'''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

enumerated string

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

array of :ref:`Contractors <contractor-type>`

**Required** if :ref:`maintenance/type <maintenance-type>` is
``contract``. Must not be present otherwise.

The entities currently contracted to maintain the software:
companies, organisations or other collective names.

``maintenance/contacts``
''''''''''''''''''''''''

.. rst-class:: key-meta

array of :ref:`Contacts <contact-type>`

**Required** if :ref:`maintenance/type <maintenance-type>` is
``internal`` or ``community``. Optional otherwise.

The people responsible for technical maintenance. Each contact MUST
be a person. Use ``affiliation`` for the institution they represent.

For contracted or subcontracted maintenance, list the people who do
the work. Include the software owner only if they also maintain it.

``localisation``
~~~~~~~~~~~~~~~~

Whether the software supports localisation and which languages it
is available in.

``localisation/localisationReady`` *(required)*
'''''''''''''''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

boolean

If ``true``, the software supports translation into other languages.
It may still be available in one language.

``localisation/availableLanguages`` *(required)*
''''''''''''''''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

array of `IETF BCP 47 <https://tools.ietf.org/html/bcp47>`__ language tags

Example:

.. code:: yaml

   localisation:
     availableLanguages:
       - en
       - fr
       - de-AT

The languages the software is available in. List at least one.

``logo``
~~~~~~~~

.. rst-class:: key-meta key-meta-union

:meta-type:`path` or :meta-type:`URL`

-  Formats: SVG, SVGZ, PNG, JPEG, WebP, AVIF

Example:

.. code:: yaml

   logo: img/logo.svg

The logo of the software. Logos SHOULD be in vector format.

The value is either a path relative to the root of the repository or
an absolute URL to the raw file. Either way, the file must be in the
same repository as ``publiccode.yml``.

``softwareVersion``
~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

string

Example:

.. code:: yaml

   softwareVersion: "1.0"

The latest stable version of the software. Parsers should display
this string without interpreting or parsing it. They should not assume
semantic versioning or any other version format.

``releaseDate``
~~~~~~~~~~~~~~~

.. rst-class:: key-meta

date

Example:

.. code:: yaml

   releaseDate: "2017-04-15"

The date the latest version was released, as “YYYY-MM-DD”. This is
the only allowed ISO8601 format.

``landingURL``
~~~~~~~~~~~~~~

.. rst-class:: key-meta

URL

Example:

.. code:: yaml

   landingURL: https://example.com/firefax

A browsable page for humans, used in place of :ref:`url <url>` when ``url``
serves raw source code to a version control client only. Catalogs
link people here instead of ``url``. If the product provides a
graphical installer, this page can also offer it for download.

``applicationSuite``
~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

string

Example:

.. code:: yaml

   applicationSuite: MegaProductivitySuite

The name of the suite the software belongs to, such as an office
suite that includes a word processor. Catalogs can use it to group
related software.

``categories``
~~~~~~~~~~~~~~

.. rst-class:: key-meta

array of enumerated strings

-  Allowed values: see :ref:`categories`

The categories the software belongs to. Catalogs use them to group
software.

``supports``
~~~~~~~~~~~~

.. rst-class:: key-meta

array

A list of standards, regulations, frameworks or systems that the
software supports or complies with.

Properties of each item:

-  ``id`` (**required**): An identifier for the supported standard,
   regulation, framework or system. It is either an alias in
   the form ``alias:<name>``, resolved through the
   :ref:`list of aliases <aliases>`, or any other valid URI (URL or
   URN) referencing the resource directly.

   An ``alias:`` value MUST exist in the
   :ref:`list of aliases <aliases>`. An unknown alias is an error.
   Any other value MUST be a syntactically valid URI. A value that is
   well formed but not otherwise known is accepted as is.

Example:

.. code:: yaml

   supports:
     - id: alias:gdpr
     - id: https://eur-lex.europa.eu/eli/reg/2016/679/oj

.. tip::

   Prefer an alias when the list has one: every file then names the
   standard the same way, while free URIs for the same resource can
   differ.

``intendedAudience``
~~~~~~~~~~~~~~~~~~~~

Who the software is for.

``intendedAudience/countries``
''''''''''''''''''''''''''''''

.. rst-class:: key-meta

array of strings

Countries explicitly included in the intended audience,
i.e. the software explicitly claims compliance with specific processes,
technologies or laws. All countries are specified using uppercase
ISO 3166-1 alpha-2 two-letter country codes.

``intendedAudience/unsupportedCountries`` (*deprecated*)
''''''''''''''''''''''''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

array of strings

Countries explicitly marked as NOT supported, for instance when
there is a conflict between how the software works and a specific
law, process or technology. All countries are specified using
uppercase ISO 3166-1 alpha-2 two-letter country codes.

This key is deprecated, use ``intendedAudience/countries`` to list the
countries the software explicitly targets instead.

``intendedAudience/scope``
''''''''''''''''''''''''''

.. rst-class:: key-meta

array of enumerated strings

-  Allowed values: see :ref:`scopes`

The sectors the software serves, such as healthcare or education.

``usedBy`` (*deprecated*)
~~~~~~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

array of strings

Names of prominent public administrations using the software, shown
as testimonials.

Parsers can supplement the list using other evidence of use, such
as a fork owned by an administration.

This key is deprecated.

``fundedBy``
~~~~~~~~~~~~

.. rst-class:: key-meta

array of :ref:`Organisations <organisation-type>`

The organisations known to be funding the development of the software.

``roadmap``
~~~~~~~~~~~

.. rst-class:: key-meta

URL

A link to a public roadmap of the software.

.. _is-based-on:

``isBasedOn``
~~~~~~~~~~~~~

.. rst-class:: key-meta

array of strings

Example:

.. code:: yaml

   isBasedOn:
     - https://github.com/example-org/firefax.git

When the software is a variant or a fork, the :ref:`url <url>` of
the original projects, whether or not they have a ``publiccode.yml``.

The key marks the software as a variant descending from those
repositories: see :ref:`forks-and-variants`.

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

array of :ref:`Dependencies <dependency-type>`

Runtime dependencies distributed under an open-source license.

This key is deprecated. Declare these dependencies in an SBOM or
package manager manifests. Put installation requirements in the
documentation and deployment scripts.

``dependsOn/proprietary``
'''''''''''''''''''''''''

.. rst-class:: key-meta

array of :ref:`Dependencies <dependency-type>`

Runtime dependencies distributed under a proprietary license.

``dependsOn/hardware``
''''''''''''''''''''''

.. rst-class:: key-meta

array of :ref:`Dependencies <dependency-type>`

Hardware dependencies that must be owned to use the software.

Encoding
--------

``publiccode.yml`` **MUST** be UTF-8 encoded and **MUST** be a
YAML 1.2 document.
