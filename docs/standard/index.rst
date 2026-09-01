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

-  Type: string

The version of the specification this file adheres to. Use ``1``.

``name`` *(required)*
~~~~~~~~~~~~~~~~~~~~~

-  Type: string
-  Example: ``"Firefax"``

The short public name of the software, the one users know it by.

``applicationSuite``
~~~~~~~~~~~~~~~~~~~~

-  Type: string
-  Example: ``"MegaProductivitySuite"``

When the software ships as one piece of a larger family of
products, the way a word processor ships inside an office suite,
the name of that family. Catalogs can group related software
by it.

``url`` *(required)*
~~~~~~~~~~~~~~~~~~~~

-  Type: string (URL)
-  Example: ``"https://example.com/firefax.git"``

A unique identifier for this software. This string must be a URL to the
source code repository (git, svn, …) in which the software is published.
If the repository is available under multiple protocols, prefer
HTTP/HTTPS URLs which don’t require user authentication.

Forks created for the purpose of contributing upstream should not
modify this file; this helps software parsing ``publiccode.yml`` to
immediately skip technical forks. On the contrary, a
complete fork that is meant to be maintained separately from the
original software should modify this line, to give itself the status
of a different project.

See :ref:`forks-and-variants` for a complete description of what
is a software variant and how to handle forked software as a parser or
an author.

``landingURL``
~~~~~~~~~~~~~~

-  Type: string (URL)
-  Example: ``"https://example.com/firefax"``

The page users should reach when clicking a button like “Go to
the application source code”, for when ``url`` serves source code
to a source control client rather than a browsable page. If the
product provides a graphical installer, this URL can point to a
page that links the source code and offers the installer for
download.

``isBasedOn``
~~~~~~~~~~~~~

-  Type: list of strings, or a single string (*deprecated*)
-  Example: ``"https://github.com/example-org/firefax.git"``

In case this software is a variant or a fork of another software, which
might or might not contain a ``publiccode.yml`` file, this key will
contain the ``url`` of the original project(s).

The existence of this key identifies the fork as a software
variant, descending from the specified repositories.

The single string form is deprecated, use a one element list
instead.

``softwareVersion``
~~~~~~~~~~~~~~~~~~~

-  Type: string
-  Example: ``"1.0"``, ``"dev"``

The latest stable version number of the software. The
version number is a string that is not meant to be interpreted and
parsed but just displayed; parsers should not assume semantic versioning
or any other specific version format.

``releaseDate``
~~~~~~~~~~~~~~~

-  Type: string (date)
-  Example: ``"2017-04-15"``

The date the latest version was released, as “YYYY-MM-DD”. This is
the only allowed ISO8601 format.

``logo``
~~~~~~~~

-  Type: string (relative path to file or absolute URL)
-  Acceptable formats: SVG, SVGZ, PNG, JPEG, WebP, AVIF
-  Example: ``"img/logo.svg"``

The logo of the software. Logos SHOULD be in vector format.
The key value can be the relative path to the file starting from the root of
the repository, or it can be an absolute URL pointing to the logo in raw
version. In both cases, the file must reside inside the same repository where
the ``publiccode.yml`` file is stored.

``platforms`` *(required)*
~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Type: enumerated string or list of strings
-  Values: ``web``, ``windows``, ``mac``, ``linux``, ``ios``,
   ``android``. Human readable values outside this list are allowed.
-  Example: ``web``

The platforms the software runs on: the ones users use to access and
operate it, rather than the platform the software itself runs on.

Use the predefined values if possible. If the software runs on a
platform for which a predefined value is not available, a different
value can be used.

``categories``
~~~~~~~~~~~~~~

-  Type: array of strings
-  Acceptable values: see :ref:`categories`

A list of categories that can be used to describe the software and can help
building catalogs of open software.

The controlled vocabulary :ref:`categories` contains the list of allowed
values.

``usedBy`` (*deprecated*)
~~~~~~~~~~~~~~~~~~~~~~~~~

-  Type: list of strings

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

-  Type: List of :ref:`Organisations <organisation-type>`

A list of organisations that are currently known to be funding the
development of this software.

``roadmap``
~~~~~~~~~~~

-  Type: string

A link to a public roadmap of the software.

``developmentStatus`` *(required)*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Type: enumerated string
-  Allowed values: ``concept``, ``development``, ``beta``, ``stable``,
   ``obsolete``

The allowed values are:

-  ``concept`` - The software is just a “concept”. No
   actual code may have been produced, and the repository could simply be a
   placeholder. 
-  ``development`` - Some effort has gone into the
   development of the software, but the code is not ready for the end user,
   even in a preliminary version (beta or alpha) to be tested by end users.
-  ``beta`` - The software is in the testing phase (alpha or beta). At
   this stage, the software might or might not have had a preliminary
   public release. 
-  ``stable`` - The software has seen a first public
   release and is ready to be used in a production environment.
-  ``obsolete`` - The software is no longer maintained or kept up to date.
   All of the source code is archived and kept for historical reasons.

``softwareType`` *(required)*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Type: enumerated string
-  Allowed values: ``"standalone/mobile"``, ``"standalone/iot"``,
   ``"standalone/desktop"``, ``"standalone/web"``, ``"standalone/backend"``,
   ``"standalone/other"``, ``"addon"``, ``"library"``, ``"configurationFiles"``

The allowed values are:

-  ``standalone/mobile`` - The software is a standalone application, typically
   installed and run on a mobile operating system.
-  ``standalone/iot`` - The software is suitable for an IoT context.
-  ``standalone/desktop`` - The software is typically installed and run in
   a desktop operating system environment.
-  ``standalone/web`` - The software is a web application that runs on a server
   and is accessible through a web browser.
-  ``standalone/backend`` - The software is a backend application that provides
   interfaces (e.g., APIs) for other services. Typically it does not provide
   direct user interfaces.
-  ``standalone/other`` - The software has a different nature from the ones
   listed above.
-  ``addon`` - The software is an addon, such as a plugin or a
   theme, for a more complex software (e.g. a CMS or an office suite).
-  ``library`` - The software is a library or SDK intended to be used
   by developers in other software projects.
-  ``configurationFiles`` - The software does not contain executable
   script but a set of configuration files. They may document how to
   obtain a certain deployment. They could be in the form of plain
   configuration files, bash scripts, ansible playbooks, Dockerfiles, or
   other instruction sets.

``supports``
~~~~~~~~~~~~

-  Type: list of mappings

A list of standards, regulations, frameworks or systems that the
software supports or complies with.

Each item is a mapping with a single property:

-  ``id`` - **mandatory** - an identifier for the supported standard,
   regulation, framework or system. It is either an alias in
   the form ``alias:<name>`` (e.g. ``alias:gdpr``), resolved through the
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

``organisation``
~~~~~~~~~~~~~~~~

This optional section provides the organisation publishing the software.

``organisation/uri`` *(required)*
'''''''''''''''''''''''''''''''''

-  Type: string
-  Example: ``"https://example.org/my-organisation"``, ``"urn:x-foobar:my-organisation"``

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

-  Type: string
-  Example: ``"My organisation"``

The canonical name of the organisation publishing the software.

It MUST correspond to the same entity identified by ``organisation/uri`` and is
intended to provide a human-readable label for that URI.
It SHOULD be the canonical, widely recognized form of the name (such as the
registered legal or institutional name).

``intendedAudience``
~~~~~~~~~~~~~~~~~~~~

``intendedAudience/countries``
''''''''''''''''''''''''''''''

-  Type: list of strings

Countries explicitly included in the intended audience,
i.e. the software explicitly claims compliance with specific processes,
technologies or laws. All countries are specified using uppercase
ISO 3166-1 alpha-2 two-letter country codes.

``intendedAudience/unsupportedCountries`` (*deprecated*)
''''''''''''''''''''''''''''''''''''''''''''''''''''''''

-  Type: list of strings

Countries explicitly marked as NOT supported, for instance when
there is a conflict between how the software works and a specific
law, process or technology. All countries are specified using
uppercase ISO 3166-1 alpha-2 two-letter country codes.

This key is deprecated, use ``intendedAudience/countries`` to list the
countries the software explicitly targets instead.

``intendedAudience/scope``
''''''''''''''''''''''''''

-  Type: array of strings
-  Acceptable values: see :ref:`scopes`

Tags related to the field of application of the software.

``description``
~~~~~~~~~~~~~~~

This section contains a general description of the software. Parsers can
use this section for instance to create a web page describing the
software.

**Note:** since all the strings contained in this section are
user-visible and written in a specific language, you **must** specify
the language you are editing the text in (using the IETF 
`BCP 47 <https://www.rfc-editor.org/info/bcp47/>`__ specifications) by
creating a sub-section with that name. The primary language subtag cannot be
omitted, as mandated by the BCP 47.  

An example for English:

.. code:: yaml 

   description:
     en:
       shortDescription: ...
       longDescription: ...

In the following part of the document, all keys are assumed to be in a
sub-section with the name of the language (we will note this with
``[lang]``).

**Note:** it is mandatory to have *at least* one language in this
section. All other languages are optional.

``description/[lang]/localisedName``
''''''''''''''''''''''''''''''''''''

-  Type: string
-  Example: ``"Firefax"``

The short public name of the software in this language, for when
it differs from ``name``.

``description/[lang]/shortDescription`` *(required)*
''''''''''''''''''''''''''''''''''''''''''''''''''''

-  Type: string (max 150 chars)
-  Example: ``"Advanced booking system for hospitals"``

A short description of the software: a single line containing a
single sentence, maximum 150 characters.

``description/[lang]/longDescription``
''''''''''''''''''''''''''''''''''''''

**Required** for at least one language.

-  Type: string (min 150 chars, max 10000 chars)

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

-  Type: URL

A reference to the user-level (not developer-level) documentation
of the software: a URL to a hosted version of the documentation.

It is suggested that the URL points to a hosted version of the
documentation that is immediately readable through a common web browser
in both desktop and mobile format. The documentation should be rendered
in HTML and browsable like a website (with a navigation index, a search
bar, etc.).

If the documentation is instead available only as a document, put a
direct view/download link as URL in this key. You should commit the
document as part of the source code repository, and then link to it
using the code hosting source browser URL (e.g.: GitHub URL to the file).
Prefer using open formats like PDF or ODT for maximum interoperability.

Whichever the format for the documentation, remember to make its source
files available under an open license, possibly by committing them as
part of the repository itself.

``description/[lang]/apiDocumentation``
'''''''''''''''''''''''''''''''''''''''

-  Type: URL

A reference to the API documentation of the software: a URL to a
hosted version of the documentation.

It is suggested that the URL points to a hosted version of the
documentation that is immediately readable through a common web browser.
The documentation should be rendered in HTML and browsable like a
website (with a navigation index, a search bar, etc.), and if there is a
reference or test deployment, possibly offer an interactive interface
(e.g. Swagger).

If the documentation is instead available only as a document, put a
direct view/download link as URL in this key. You should commit the
document as part of the source code repository, and then link to it
using the code hosting source browser URL (e.g.: GitHub URL to the file).
Prefer using open formats like PDF or ODT for maximum interoperability.

Whichever the format for the documentation, remember to make its source
files available under an open license, possibly by committing them as
part of the repository itself.

``description/[lang]/features``
'''''''''''''''''''''''''''''''

-  Type: list of strings

A list of software features, describing what
capabilities the software allows to do. The audience for this text
should be that of public decision makers who will be commissioning the
software. The features should thus not target developers; instead of
listing technical features referring to implementation details, prefer
listing user-visible functionalities of the software.

The suggested number of features to list is between 5 and 20, depending
on the software size and complexity. There is no need for
exhaustiveness, as users can always read the documentation for
additional information.

``description/[lang]/screenshots``
''''''''''''''''''''''''''''''''''

-  Type: list of strings (paths)
-  Formats: PNG, JPEG, WebP, AVIF
-  Example: ``"data/screenshots/configuration.png"``

One or more paths to files showing screenshots of
the software, meant to give a quick idea on how the software
looks like and how it works.
The key value can be the relative path to the file starting from the root of
the repository, or it can be an absolute URL pointing to the screenshot in raw
version. In both cases, the file must reside inside the same repository where
the ``publiccode.yml`` file is stored.

Screenshots can be of any shape and size; the suggested formats are:

-  Desktop: 1280x800 @1x
-  Tablet: 1024x768 @2x
-  Mobile: 375x667 @2x

``description/[lang]/videos`` (*deprecated*)
''''''''''''''''''''''''''''''''''''''''''''

-  Type: list of strings (URLs)
-  Example: ``"https://youtube.com/xxxxxxxx"``

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

-  Type: list of strings

A list of awards won by the software.

``legal``
~~~~~~~~~

``legal/license`` *(required)*
''''''''''''''''''''''''''''''

-  Type: string
-  Example: ``"AGPL-3.0-or-later"``, ``"EUPL-1.2 OR AGPL-3.0-or-later"``

This string describes the license under which the software is
distributed. The string must contain a valid SPDX expression, referring
to one or multiple open-source licenses. Please refer to the `SPDX
documentation <https://spdx.org/licenses/>`__ for further information.

``legal/mainCopyrightOwner``
''''''''''''''''''''''''''''

-  Type: string
-  Example: ``"City of Amsterdam"``

This string describes the entity that owns the copyright on “most” of
the code in the repository. Normally, this is the line that is reported
with the copyright symbol at the top of most files in the repo.

It is possible to list multiple owners if required so, using an English
sentence. It is also possible to informally refer to a community or
group of people like “Linus Torvalds and all Linux contributors”.

In case it is not possible to name a main copyright owner, it is
possible to omit this key.

``maintenance``
~~~~~~~~~~~~~~~

This section provides information on the maintenance status of the
software, useful to evaluate whether the software is actively developed
or not.

``maintenance/type`` *(required)*
'''''''''''''''''''''''''''''''''

-  Type: enumerate
-  Values: ``"internal"``, ``"contract"``, ``"community"``, ``"none"``

How the software is currently maintained.

-  ``internal`` - means that the software is internally maintained by the
   repository owner;
-  ``contract`` - means that there is a commercial
   contract that binds an entity to the maintenance of the software;
-  ``community`` - means that the software is currently maintained by one
   or more people that donate their time to the project;
-  ``none`` - means that the software is not actively maintained.

``maintenance/contractors``
'''''''''''''''''''''''''''

**Required** if ``maintenance/type`` is ``contract``. Must not be present otherwise.

-  Type: array of :ref:`Contractor <contractor-type>`

The entity or entities, if any, currently
contracted for maintaining the software. They can be companies,
organisations, or other collective names.

``maintenance/contacts``
''''''''''''''''''''''''

**Required** if ``maintenance/type`` is ``internal`` or ``community``. Optional otherwise.

-  Type: List of :ref:`Contacts <contact-type>`

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

-  Type: boolean

If ``true``, the software has infrastructure in place or is otherwise
designed to be multilingual. It does not need to be available in more
than one language.

``localisation/availableLanguages`` *(required)*
''''''''''''''''''''''''''''''''''''''''''''''''

-  Type: list of IETF BCP 47 language tags
-  Example: ``"en"``, ``"fr"``, ``"de-AT"``

This is the list of languages in which the software is
available. Of course, this list will contain at least one language.
The primary language subtag cannot be omitted, as mandated by the 
`BCP 47 <https://www.rfc-editor.org/info/bcp47/>`__.

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

-  Type: array of :ref:`dependency <dependency-type>`

Runtime dependencies distributed under an open-source license.

This key is deprecated. Open source runtime dependencies are already
declared in the SBOM or in the package manager manifests, and what
needs to be installed belongs in the documentation and in the
deployment scripts.

``dependsOn/proprietary``
'''''''''''''''''''''''''

-  Type: array of :ref:`dependency <dependency-type>`

Runtime dependencies distributed under a proprietary license.

``dependsOn/hardware``
''''''''''''''''''''''

-  Type: array of :ref:`dependency <dependency-type>`

Hardware dependencies that must be owned to use the software.

Encoding
--------

``publiccode.yml`` **MUST** be UTF-8 encoded and **MUST** be a
YAML 1.2 document.
