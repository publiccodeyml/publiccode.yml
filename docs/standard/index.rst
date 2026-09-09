.. role:: meta-type

``publiccode.yml``
==================

``publiccode.yml`` is a metadata standard for repositories containing software
developed or acquired by the Public Administration, aimed at making them easily
discoverable and thus reusable by other entities.

By including a ``publiccode.yml`` file in the root of a repository, and
populating it with information about the software, technicians and civil
servants can evaluate it.

The format is easily readable by both humans and machines, and
automatic indexing tools are built on top of it: national software
catalogs crawl the published files and build searchable sites.
Catalogs federate across countries, since they all read the same
format. The `core tools
<https://github.com/publiccodeyml/publiccode.yml#core-tools>`__
provide the reference implementations to build on.

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

The version of the specification this file adheres to. Use ``1``.

``name`` *(required)*
~~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

string

Example:

.. code:: yaml

   name: Firefax

The short public name of the software, the one users know it by.

``url`` *(required)*
~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

URL

Example:

.. code:: yaml

   url: https://example.com/firefax.git

The URL of the source code repository (git, svn, …) where the
software is published, and thus its unique identifier. If the
repository is available under multiple protocols, prefer HTTP/HTTPS
URLs which don’t require user authentication.

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
-  ``configurationFiles``: A set of configuration files (plain
   files, bash scripts, ansible playbooks, Dockerfiles or other
   instruction sets), possibly documenting how to obtain a certain
   deployment.

``platforms`` *(required)*
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta key-meta-union

:meta-type:`enumerated string` or :meta-type:`array of strings`

-  Values: ``web``, ``windows``, ``mac``, ``linux``, ``ios``,
   ``android``. Human readable values outside this list are allowed.

Example:

.. code:: yaml

   platforms:
     - web

The platforms the software runs on: the ones users use to access and
operate it, rather than the platform the software itself runs on.

.. tip::

   Use the predefined values if possible. If the software runs on a
   platform for which a predefined value is not available, a
   different value can be used.

``developmentStatus`` *(required)*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

enumerated string

Allowed values:

-  ``concept``: A “concept”: no actual code may have been produced
   yet, and the repository could simply be a placeholder.
-  ``development``: Some effort has gone into the development, but
   the code is not ready for the end user, even in a preliminary
   version to be tested by end users.
-  ``beta``: In the testing phase, alpha stage included. The
   software might or might not have had a preliminary public
   release.
-  ``stable``: Has seen a first public release and is ready to be
   used in a production environment.
-  ``obsolete``: No longer maintained or kept up to date. All of the
   source code is archived and kept for historical reasons.

``description``
~~~~~~~~~~~~~~~

This section contains a general description of the software. Parsers can
use this section for instance to create a web page describing the
software.

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
it differs from ``name``.

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

A longer description of the software, between 150 and
10000 chars, meant to provide an overview of the capabilities of
the software for a potential user. The audience for this text should be
that of users of the software, not developers. You can think of this
text as the description of the software that would be in its website (if
the software had one).

The value of this key is Markdown, as defined by
`CommonMark <https://commonmark.org/>`__. Keep the formatting basic:
``*italic*``, ``**bold**``, bullet points and ``[links](#)``, since
consumers MAY render only this subset.

``description/[lang]/documentation``
''''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

URL

A reference to the user-level (not developer-level) documentation
of the software: a URL to a hosted version of the documentation.

.. tip::

   Point the URL at documentation readable in a common web browser,
   desktop and mobile: rendered in HTML and browsable like a website,
   with a navigation index, a search bar, etc.

   If the documentation is only available as a document, put a direct
   view/download link here: commit the document to the source code
   repository and link it through the code hosting source browser
   (e.g. the GitHub URL of the file). Prefer open formats like PDF or
   ODT for maximum interoperability.

   Whichever the format, make the documentation sources available
   under an open license, possibly by committing them to the
   repository itself.

``description/[lang]/apiDocumentation``
'''''''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

URL

A reference to the API documentation of the software: a URL to a
hosted version of the documentation.

.. tip::

   Point the URL at documentation readable in a common web browser:
   rendered in HTML and browsable like a website, with a navigation
   index, a search bar, etc. If there is a reference or test
   deployment, possibly offer an interactive interface (e.g. Swagger).

   If the documentation is only available as a document, put a direct
   view/download link here: commit the document to the source code
   repository and link it through the code hosting source browser
   (e.g. the GitHub URL of the file). Prefer open formats like PDF or
   ODT for maximum interoperability.

   Whichever the format, make the documentation sources available
   under an open license, possibly by committing them to the
   repository itself.

``description/[lang]/features``
'''''''''''''''''''''''''''''''

.. rst-class:: key-meta

array of strings

A list of software features, describing what
capabilities the software allows to do. The audience for this text
should be that of public decision makers who will be commissioning the
software. The features should thus not target developers; instead of
listing technical features referring to implementation details, prefer
listing user-visible functionalities of the software.

.. tip::

   The suggested number of features to list is between 5 and 20, depending
   on the software size and complexity. There is no need for
   exhaustiveness, as users can always read the documentation for
   additional information.

``description/[lang]/screenshots``
''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

array of paths

-  Formats: PNG, JPEG, WebP, AVIF

Example:

.. code:: yaml

   description:
     en:
       screenshots:
         - data/screenshots/configuration.png

One or more paths to files showing screenshots of
the software, meant to give a quick idea on how the software
looks like and how it works.
The key value can be the relative path to the file starting from the root of
the repository, or it can be an absolute URL pointing to the screenshot in raw
version. In both cases, the file must reside inside the same repository where
the ``publiccode.yml`` file is stored.

.. tip::

   Screenshots can be of any shape and size. The suggested formats
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

One or more URLs of videos showing how the
software works. Like screenshots, videos should be used to give a quick
overview on how the software looks like and how it works. Videos must be
hosted on a video sharing website that supports the
`oEmbed <https://oembed.com>`__ standard; popular options are YouTube
and Vimeo.

This key is deprecated, link videos from the documentation or the
website of the software instead.

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

This string describes the license under which the software is
distributed. The string must contain a valid SPDX expression, referring
to one or multiple open-source licenses. Please refer to the `SPDX
documentation <https://spdx.org/licenses/>`__ for further information.

``legal/mainCopyrightOwner``
''''''''''''''''''''''''''''

.. rst-class:: key-meta

string

Example:

.. code:: yaml

   legal:
     mainCopyrightOwner: City of Amsterdam

This string describes the entity that owns the copyright on “most” of
the code in the repository. Normally, this is the line that is reported
with the copyright symbol at the top of most files in the repo.

It is possible to list multiple owners if required so, using an English
sentence. It is also possible to informally refer to a community or
group of people like “Linus Torvalds and all Linux contributors”.

In case it is not possible to name a main copyright owner, it is
possible to omit this key.

``organisation``
~~~~~~~~~~~~~~~~

This optional section provides the organisation publishing the software.

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

Parsers MAY use the URI structure to extract additional information if it follows a
recognized format (for example, inferring an institutional domain or an
official code).

It is RECOMMENDED that crawlers and consumers of publiccode.yml verify this
information out-of-band, to ensure that the declared ``organisation/uri`` actually
corresponds to the organisation in control of the repository.
The specific verification method depends on the implementation and policies of the
platform consuming the file.

``organisation/name``
'''''''''''''''''''''

.. rst-class:: key-meta

string

Example:

.. code:: yaml

   organisation:
     name: My organisation

The canonical name of the organisation publishing the software.

It MUST correspond to the same entity identified by ``organisation/uri`` and is
intended to provide a human-readable label for that URI.
It SHOULD be the canonical, widely recognized form of the name (such as the
registered legal or institutional name).

``maintenance``
~~~~~~~~~~~~~~~

This section provides information on the maintenance status of the
software, useful to evaluate whether the software is actively developed
or not.

``maintenance/type`` *(required)*
'''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

enumerated string

How the software is currently maintained.

Allowed values:

-  ``internal``: Maintained internally by the repository owner.
-  ``contract``: A commercial contract binds an entity to the
   maintenance.
-  ``community``: Maintained by one or more people who donate their
   time to the project.
-  ``none``: Not actively maintained.

``maintenance/contractors``
'''''''''''''''''''''''''''

.. rst-class:: key-meta

array of :ref:`Contractors <contractor-type>`

**Required** if ``maintenance/type`` is ``contract``. Must not be present otherwise.

The entity or entities, if any, currently
contracted for maintaining the software. They can be companies,
organisations, or other collective names.

``maintenance/contacts``
''''''''''''''''''''''''

.. rst-class:: key-meta

array of :ref:`Contacts <contact-type>`

**Required** if ``maintenance/type`` is ``internal`` or ``community``. Optional otherwise.

The technical people currently responsible for
maintaining the software. All contacts need to be a physical person, not
a company or an organisation. If somebody is acting as a representative
of an institution, it must be listed within the ``affiliation`` of the
contact.

In case of a commercial agreement (or a chain of such agreements),
specify the final entities actually contracted to deliver the
maintenance. Do not specify the software owner unless it is technically
involved with the maintenance of the product as well.

``localisation``
~~~~~~~~~~~~~~~~

This section provides an overview of the localization features of the
software.

``localisation/localisationReady`` *(required)*
'''''''''''''''''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

boolean

If ``true``, the software has infrastructure in place or is otherwise
designed to be multilingual. It does not need to be available in more
than one language.

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

This is the list of languages in which the software is
available. Of course, this list will contain at least one language.
The primary language subtag cannot be omitted, as mandated by the 
`BCP 47 <https://www.rfc-editor.org/info/bcp47/>`__.

``logo``
~~~~~~~~

.. rst-class:: key-meta key-meta-union

:meta-type:`path` or :meta-type:`URL`

-  Acceptable formats: SVG, SVGZ, PNG, JPEG, WebP, AVIF

Example:

.. code:: yaml

   logo: img/logo.svg

The logo of the software. Logos SHOULD be in vector format.
The key value can be the relative path to the file starting from the root of
the repository, or it can be an absolute URL pointing to the logo in raw
version. In both cases, the file must reside inside the same repository where
the ``publiccode.yml`` file is stored.

``softwareVersion``
~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

string

Example:

.. code:: yaml

   softwareVersion: "1.0"

The latest stable version number of the software. The
version number is a string that is not meant to be interpreted and
parsed but just displayed; parsers should not assume semantic versioning
or any other specific version format.

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

The page users should reach when clicking a button like “Go to
the application source code”, for when ``url`` serves source code
to a source control client rather than a browsable page. If the
product provides a graphical installer, this URL can point to a
page that links the source code and offers the installer for
download.

``applicationSuite``
~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

string

Example:

.. code:: yaml

   applicationSuite: MegaProductivitySuite

When the software ships as one piece of a larger family of
products, the way a word processor ships inside an office suite,
the name of that family. Catalogs can group related software
by it.

``categories``
~~~~~~~~~~~~~~

.. rst-class:: key-meta

array of enumerated strings

-  Allowed values: see :ref:`categories`

A list of categories that can be used to describe the software and can help
building catalogs of open software.

The controlled vocabulary :ref:`categories` contains the list of allowed
values.

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

Tags related to the field of application of the software.

``usedBy`` (*deprecated*)
~~~~~~~~~~~~~~~~~~~~~~~~~

.. rst-class:: key-meta

array of strings

A list of the names of prominent public administrations (that will serve
as “testimonials”) that are currently known to the software maintainer
to be using this software.

Parsers are encouraged to enhance this list also with other information
that they can obtain independently; for instance, a fork of a software, owned
by an administration, could be used as a signal of usage of the
software.

This key is deprecated.

``fundedBy``
~~~~~~~~~~~~

.. rst-class:: key-meta

array of :ref:`Organisations <organisation-type>`

A list of organisations that are currently known to be funding the
development of this software.

``roadmap``
~~~~~~~~~~~

.. rst-class:: key-meta

URL

A link to a public roadmap of the software.

``isBasedOn``
~~~~~~~~~~~~~

.. rst-class:: key-meta

array of strings

Example:

.. code:: yaml

   isBasedOn:
     - https://github.com/example-org/firefax.git

In case this software is a variant or a fork of another software, which
might or might not contain a ``publiccode.yml`` file, this key will
contain the ``url`` of the original project(s).

The existence of this key identifies the fork as a software
variant, descending from the specified repositories.

``dependsOn``
~~~~~~~~~~~~~

This section provides an overview on the system-level dependencies
required to install and use this software.

**NOTE:** do not list dependencies at the source code level (e.g.:
software libraries being used), and focus only on runtime and/or
system-level dependencies that must be installed and maintained
separately. For instance, a database is a good example of such
dependencies.

``dependsOn/open`` (*deprecated*)
'''''''''''''''''''''''''''''''''

.. rst-class:: key-meta

array of :ref:`Dependencies <dependency-type>`

Runtime dependencies distributed under an open-source license.

This key is deprecated. Open source runtime dependencies are already
declared in the SBOM or in the package manager manifests, and what
needs to be installed belongs in the documentation and in the
deployment scripts.

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
