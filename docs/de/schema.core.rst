Der Standard (Kern)
===================

Dieses Dokument beschreibt das publiccode.yml-Schema.

Top-Level Keys and Sections
---------------------------

Key ``publiccodeYmlVersion``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Typ: Zeichenkette
-  Vorhandensein: obligatorisch
-  Beispiel: ``"0"``

This key specifies the version to which the current ``publiccode.yml``
adheres, for forward compatibility.

Key ``name``
~~~~~~~~~~~~

-  Typ: Zeichenkette
-  Vorhandensein: obligatorisch
-  Beispiel: ``"Office Suite"``

This key contains the name of the software. It contains the (short)
public name of the product, which can be localised using the
``description/[lang]/localisedName`` key. It should be the name most
people usually refer to the software. In case the software has both an
internal “code” name and a commercial name, use the commercial name.

Key ``applicationSuite``
~~~~~~~~~~~~~~~~~~~~~~~~

-  Typ: Zeichenkette
-  Vorhandensein: optional
-  Beispiel: ``"MegaProductivitySuite"``

This key contains the name of the “suite” to which the software belongs.

Key ``url``
~~~~~~~~~~~

-  Typ: Zeichenkette (URL)
-  Vorhandensein: obligatorisch
-  Beispiel: ``"https://example.com/office-suite.git"``

A unique identifier for this software. This string must be a URL to the
source code repository (git, svn, …) in which the software is published.
If the repository is available under multiple protocols, prefer
HTTP/HTTPS URLs which don’t require user authentication.

Forks created for the purpose of contributing upstream should not
modify this file; this helps software parsing ``publiccode.yml`` to
immediately skip technical forks. On the contrary, a
complete fork that is meant to be maintained separately from the
original software should modify this line, to give themselves the status
of a different project.

See :ref:`forks-and-variants` for a complete description of what
is a software variant and how to handle forked software as a parser or
an author.

Key ``landingURL``
~~~~~~~~~~~~~~~~~~

-  Typ: Zeichenkette (URL)
-  Vorhandensein: optional
-  Beispiel: ``"https://example.com/office-suite"``

If the ``url`` parameter does not serve a human readable or browsable
page, but only serves source code to a source control client, with this
key you have an option to specify a landing page. This page, ideally, is
where your users will land when they will click a button labeled
something like “Go to the application source code”. In case the product
provides an automated graphical installer, this URL can point to a page
which contains a reference to the source code but also offers the
download of such an installer.

Key ``isBasedOn``
~~~~~~~~~~~~~~~~~

-  Typ: Liste von Zeichenketten oder eine einzelne Zeichenkette (*veraltet*)
-  Vorhandensein: optional
-  Beispiel: ``["https://example.com/document-editor.git"]``

In case this software is a variant or a fork of another software, which
might or might not contain a ``publiccode.yml`` file, this key will
contain the ``url`` of the original project(s).

The existence of this key identifies the fork as a software
variant, descending from the specified repositories.

Die Form mit einer einzelnen Zeichenkette ist veraltet. Verwenden Sie
stattdessen eine Liste mit einem einzigen Element.

Key ``softwareVersion``
~~~~~~~~~~~~~~~~~~~~~~~

-  Typ: Zeichenkette
-  Vorhandensein: optional
-  Beispiel: ``"1.0"``, ``"dev"``

This key contains the latest stable version number of the software. The
version number is a string that is not meant to be interpreted and
parsed but just displayed; parsers should not assume semantic versioning
or any other specific version format.

Key ``releaseDate``
~~~~~~~~~~~~~~~~~~~

-  Typ: Zeichenkette (Datum)
-  Vorhandensein: optional
-  Beispiel: ``"2017-04-15"``

This key contains the date at which the latest version was released.

Key ``logo``
~~~~~~~~~~~~

-  Typ: Zeichenkette (relativer Pfad zur Datei oder absolute URL)
-  Vorhandensein: optional
-  Zulässige Formate: SVG, SVGZ, PNG, JPEG, WebP, AVIF
-  Beispiel: ``"img/logo.svg"``

This key contains the path to the logo of the software. Logos should be
in vector format.
The key value can be the relative path to the file starting from the root of
the repository, or it can be an absolute URL pointing to the logo in raw
version. In both cases, the file must reside inside the same repository where
the ``publiccode.yml`` file is stored.

Key ``platforms``
~~~~~~~~~~~~~~~~~

-  Typ: enumerierte Zeichenkette oder Liste von Zeichenketten
-  Vorhandensein: obligatorisch
-  Werte: ``web``, ``windows``, ``mac``, ``linux``, ``ios``,
   ``android``. Human readable values outside this list are allowed.
-  Beispiel: ``web``

This key specifies which platform the software runs on. It is meant to
describe the platforms that users will use to access and operate the
software, rather than the platform the software itself runs on.

Use the predefined values if possible. If the software runs on a
platform for which a predefined value is not available, a different
value can be used.

Key ``categories``
~~~~~~~~~~~~~~~~~~

-  Typ: Liste von Zeichenketten
-  Vorhandensein: optional
-  Zulässige Werte: see :ref:`categories-list`

A list of categories that can be used to describe the software and can help
building catalogs of open software.

The controlled vocabulary :ref:`categories-list` contains the list of allowed
values.

Key ``usedBy`` (*veraltet*)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Typ: Liste von Zeichenketten
-  Vorhandensein: optional

A list of the names of prominent public administrations (that will serve
as “testimonials”) that are currently known to the software maintainer
to be using this software.

Parsers are encouraged to enhance this list also with other information
that they can obtain independently; for instance, a fork of a software, owned
by an administration, could be used as a signal of usage of the
software.

Key ``fundedBy``
~~~~~~~~~~~~~~~~

-  Typ: Liste von Organisationen (siehe unten)
-  Vorhandensein: optional

A list of organisations that are currently known to be funding the
development of this software.

Key ``roadmap``
~~~~~~~~~~~~~~~

-  Typ: Zeichenkette
-  Vorhandensein: optional

A link to a public roadmap of the software.

Key ``developmentStatus``
~~~~~~~~~~~~~~~~~~~~~~~~~

-  Typ: enumerierte Zeichenkette
-  Vorhandensein: obligatorisch
-  Zulässige Werte: ``concept``, ``development``, ``beta``, ``stable``,
   ``obsolete``

Die zulässigen Werte sind:

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

Key ``softwareType``
~~~~~~~~~~~~~~~~~~~~

-  Typ: enumerierte Zeichenkette
-  Vorhandensein: obligatorisch
-  Zulässige Werte: ``"standalone/mobile"``, ``"standalone/iot"``,
   ``"standalone/desktop"``, ``"standalone/web"``, ``"standalone/backend"``,
   ``"standalone/other"``, ``"addon"``, ``"library"``, ``"configurationFiles"``

Die zulässigen Werte sind:

-  ``standalone/mobile`` - Die Software ist eine eigenständige Anwendung, die
   typischerweise auf einem mobilen Betriebssystem installiert und ausgeführt
   wird.
-  ``standalone/iot`` - Die Software eignet sich für den Einsatz im IoT-Bereich.
-  ``standalone/desktop`` - Die Software wird typischerweise in einer
   Desktop-Betriebssystemumgebung installiert und ausgeführt.
-  ``standalone/web`` - Die Software ist eine Webanwendung, die auf einem Server
   ausgeführt wird und über einen Webbrowser zugänglich ist.
-  ``standalone/backend`` - Die Software ist eine Backend-Anwendung, die
   Schnittstellen (z. B. APIs) für andere Dienste bereitstellt. Typischerweise
   stellt sie keine direkten Benutzeroberflächen bereit.
-  ``standalone/other`` - Die Software ist von anderer Art als die oben
   aufgeführten Anwendungen.
-  ``addon`` - Die Software ist eine Erweiterung, etwa ein Plugin oder ein
   Theme, für eine komplexere Software (z. B. ein CMS oder ein Office-Paket).
-  ``library`` - Die Software ist eine Bibliothek oder ein SDK zur Verwendung
   durch Entwickler in anderen Softwareprojekten.
-  ``configurationFiles`` - Die Software enthält keine ausführbaren Skripte,
   sondern eine Sammlung von Konfigurationsdateien. Diese können dokumentieren,
   wie eine bestimmte Bereitstellung erreicht wird. Sie können als einfache
   Konfigurationsdateien, Bash-Skripte, Ansible-Playbooks, Dockerfiles oder
   andere Anweisungssätze vorliegen.

Schlüssel ``supports``
~~~~~~~~~~~~~~~~~~~~~~

-  Typ: Liste von Mappings
-  Vorhandensein: optional

Eine Liste von Standards, Vorschriften, Frameworks oder Systemen, die die
Software unterstützt oder deren Anforderungen sie erfüllt.

Jeder Eintrag ist ein Mapping mit einer einzigen Eigenschaft:

-  ``id`` - **obligatorisch** - ein Bezeichner für den unterstützten Standard,
   die Vorschrift, das Framework oder das System. Dies ist entweder ein Alias
   der Form ``alias:<name>`` (z. B. ``alias:gdpr``), der über die
   :ref:`Liste der Aliase <aliases-list>` aufgelöst wird, oder eine andere
   gültige URI (URL oder URN), die direkt auf die Ressource verweist.

   Ein ``alias:``-Wert MUSS in der :ref:`Liste der Aliase <aliases-list>`
   vorhanden sein. Ein unbekannter Alias ist ein Fehler.
   Jeder andere Wert MUSS eine syntaktisch gültige URI sein. Ein korrekt
   formatierter, ansonsten unbekannter Wert wird unverändert akzeptiert.

Beispiel:

.. code:: yaml

   supports:
     - id: alias:gdpr
     - id: https://eur-lex.europa.eu/eli/reg/2016/679/oj

Abschnitt ``organisation``
~~~~~~~~~~~~~~~~~~~~~~~~~~

Dieser optionale Abschnitt gibt die Organisation an, die die Software
veröffentlicht.

Schlüssel ``organisation/uri``
''''''''''''''''''''''''''''''

-  Typ: Zeichenkette
-  Vorhandensein: obligatorisch
-  Beispiel: ``"https://example.org/my-organisation"``, ``"urn:x-foobar:my-organisation"``

Die URI, die die Organisation identifiziert, die die Software veröffentlicht.
Der Wert SOLLTE eine stabile, auflösbare URI oder ein persistenter Bezeichner
sein.

Parser DÜRFEN aus der URI-Struktur zusätzliche Informationen extrahieren,
wenn sie einem anerkannten Format folgt (zum Beispiel eine institutionelle
Domain oder einen offiziellen Code ableiten).

Es wird EMPFOHLEN, dass Crawler und Verbraucher von publiccode.yml diese
Informationen außerhalb der Datei überprüfen, um sicherzustellen, dass die
angegebene URI tatsächlich der Organisation entspricht, die das Repository
kontrolliert. Die konkrete Prüfmethode hängt von der Implementierung und den
Richtlinien der Plattform ab, die die Datei verarbeitet.

Schlüssel ``organisation/name``
'''''''''''''''''''''''''''''''

-  Typ: Zeichenkette
-  Vorhandensein: optional
-  Beispiel: ``"My organisation"``

Der kanonische Name der Organisation, die die Software veröffentlicht.

Er MUSS derselben Entität entsprechen, die durch ``organisation/uri``
identifiziert wird, und dient als lesbare Bezeichnung für diese URI.
Er SOLLTE die kanonische, allgemein anerkannte Form des Namens sein
(wie der eingetragene rechtliche oder institutionelle Name).

Section ``intendedAudience``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Key ``intendedAudience/countries``
''''''''''''''''''''''''''''''''''

-  Typ: Liste von Zeichenketten
-  Vorhandensein: optional

Dieser Schlüssel schließt bestimmte Länder ausdrücklich in die Zielgruppe
ein. Die Software gibt damit ausdrücklich an, bestimmte Prozesse,
Technologien oder Gesetze einzuhalten. Alle Länder werden durch
zweistellige Ländercodes in Großbuchstaben gemäß ISO 3166-1 alpha-2 angegeben.

Key ``intendedAudience/unsupportedCountries`` (*veraltet*)
''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

-  Typ: Liste von Zeichenketten
-  Vorhandensein: optional

Dieser Schlüssel kennzeichnet Länder ausdrücklich als NICHT unterstützt.
Dies kann der Fall sein, wenn die Funktionsweise der Software einem
bestimmten Gesetz, Prozess oder einer Technologie widerspricht. Alle Länder
werden durch zweistellige Ländercodes in Großbuchstaben gemäß ISO 3166-1 alpha-2 angegeben.

Dieser Schlüssel ist veraltet. Verwenden Sie stattdessen
``intendedAudience/countries``, um die Länder aufzulisten, an die sich
die Software ausdrücklich richtet.

Key ``intendedAudience/scope``
''''''''''''''''''''''''''''''

-  Typ: Liste von Zeichenketten
-  Vorhandensein: optional
-  Zulässige Werte: see :ref:`scope-list`

This key contains a list of tags related to the field of application of
the software. 

Section ``description``
~~~~~~~~~~~~~~~~~~~~~~~

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

Key ``description/[lang]/localisedName``
''''''''''''''''''''''''''''''''''''''''

-  Typ: Zeichenkette
-  Vorhandensein: optional
-  Beispiel: ``"Office Suite"``

This key is an opportunity to localise the name in a specific language.
It contains the (short) public name of the product. It should be the
name most people usually refer to the software. In case the software has
both an internal “code” name and a commercial name, use the commercial
name.

Key ``description/[lang]/shortDescription``
'''''''''''''''''''''''''''''''''''''''''''

-  Typ: Zeichenkette (max. 150 Zeichen)
-  Vorhandensein: obligatorisch
-  Beispiel: ``"Advanced booking system for hospitals"``

This key contains a short description of the software. It should be a
single line containing a single sentence. Maximum 150 characters are
allowed.

Key ``description/[lang]/longDescription``
''''''''''''''''''''''''''''''''''''''''''

-  Typ: Markdown-Zeichenkette (min. 150 Zeichen, max. 10000 Zeichen)
-  Vorhandensein: obligatorisch (für mindestens eine Sprache)

This key contains a longer description of the software, between 150 and
10000 chars. It is meant to provide an overview of the capabilities of
the software for a potential user. The audience for this text should be
that of users of the software, not developers. You can think of this
text as the description of the software that would be in its website (if
the software had one).

The value of this key is Markdown, as defined by
`CommonMark <https://commonmark.org/>`__. Keep the formatting basic:
``*italic*``, ``**bold**``, bullet points and ``[links](#)``, since
consumers MAY render only this subset.

Key ``description/[lang]/documentation``
''''''''''''''''''''''''''''''''''''''''

-  Typ: URL
-  Vorhandensein: optional

This key contains a reference to the user-level (not developer-level)
documentation of the software. The value must be a URL to a hosted
version of the documentation.

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

Key ``description/[lang]/apiDocumentation``
'''''''''''''''''''''''''''''''''''''''''''

-  Typ: URL
-  Vorhandensein: optional

This key contains a reference to the API documentation of the software.
The value must be a URL to a hosted version of the documentation.

It is suggested that the URL points to a hosted version of the
documentation that is immediately readable through a common web browser.
The documentation should be rendered in HTML and browsable like a
website (with a navigation index, a search bar, etc.), and if there is a
reference or test deployment, possibly offer an interactive interface
(e.g. Swagger).

If the documentation is instead available only as a document, put a
direct view/download link as URL in this key. You should commit the
document as part of the source code repository, and then link to it
using the code hosting source browser URL (e.g.: GitHub URL to the file).
Prefer using open formats like PDF or ODT for maximum interoperability.

Whichever the format for the documentation, remember to make its source
files available under an open license, possibly by committing them as
part of the repository itself.

Key ``description/[lang]/features``
'''''''''''''''''''''''''''''''''''

-  Typ: Liste von Zeichenketten
-  Vorhandensein: optional

This key contains a list of software features, describing what
capabilities the software allows to do. The audience for this text
should be that of public decision makers who will be commissioning the
software. The features should thus not target developers; instead of
listing technical features referring to implementation details, prefer
listing user-visible functionalities of the software.

The suggested number of features to list is between 5 and 20, depending
on the software size and complexity. There is no need for
exhaustiveness, as users can always read the documentation for
additional information.

Key ``description/[lang]/screenshots``
''''''''''''''''''''''''''''''''''''''

-  Typ: Liste von Zeichenketten (Pfade)
-  Vorhandensein: optional
-  Formate: PNG, JPEG, WebP, AVIF
-  Beispiel: ``"data/screenshots/configuration.png"``

This key contains one or multiple paths to files showing screenshots of
the software. They are meant to give a quick idea on how the software
looks like and how it works.
The key value can be the relative path to the file starting from the root of
the repository, or it can be an absolute URL pointing to the screenshot in raw
version. In both cases, the file must reside inside the same repository where
the ``publiccode.yml`` file is stored.

Screenshots can be of any shape and size; the suggested formats are:

-  Desktop: 1280x800 @1x
-  Tablet: 1024x768 @2x
-  Mobile: 375x667 @2x

Key ``description/[lang]/videos`` (*veraltet*)
''''''''''''''''''''''''''''''''''''''''''''''

-  Typ: Liste von Zeichenketten (URLs)
-  Vorhandensein: optional
-  Beispiel: ``"https://youtube.com/xxxxxxxx"``

This key contains one or multiple URLs of videos showing how the
software works. Like screenshots, videos should be used to give a quick
overview on how the software looks like and how it works. Videos must be
hosted on a video sharing website that supports the
`oEmbed <https://oembed.com>`__ standard; popular options are YouTube
and Vimeo.

Since videos are an integral part of the documentation, it is
recommended to publish them with an open license.

Dieser Schlüssel ist veraltet. Verlinken Sie Videos stattdessen in der
Dokumentation oder auf der Website der Software.

Key ``description/[lang]/awards``
'''''''''''''''''''''''''''''''''

-  Typ: Liste von Zeichenketten
-  Vorhandensein: optional

A list of awards won by the software.

Section ``legal``
~~~~~~~~~~~~~~~~~

Key ``legal/license``
'''''''''''''''''''''

-  Typ: Zeichenkette
-  Vorhandensein: obligatorisch
-  Beispiel: ``"AGPL-3.0-or-later"``

This string describes the license under which the software is
distributed. The string must contain a valid SPDX expression, referring
to one (or multiple) open-source license. Please refer to the `SPDX
documentation <https://spdx.org/licenses/>`__ for further information.

Key ``legal/mainCopyrightOwner``
''''''''''''''''''''''''''''''''

-  Typ: Zeichenkette
-  Vorhandensein: optional
-  Beispiel: ``"City of Amsterdam"``

This string describes the entity that owns the copyright on “most” of
the code in the repository. Normally, this is the line that is reported
with the copyright symbol at the top of most files in the repo.

It is possible to list multiple owners if required so, using an English
sentence. It is also possible to informally refer to a community or
group of people like “Linus Torvalds and all Linux contributors”.

In case it is not possible to name a main copyright owner, it is
possible to omit this key.

Section ``maintenance``
~~~~~~~~~~~~~~~~~~~~~~~

This section provides information on the maintenance status of the
software, useful to evaluate whether the software is actively developed
or not.

Key ``maintenance/type``
''''''''''''''''''''''''

-  Typ: Aufzählung
-  Vorhandensein: obligatorisch
-  Werte: ``"internal"``, ``"contract"``, ``"community"``, ``"none"``

This key describes how the software is currently maintained.

-  ``internal`` - means that the software is internally maintained by the
   repository owner;
-  ``contract`` - means that there is a commercial
   contract that binds an entity to the maintenance of the software;
-  ``community`` - means that the software is currently maintained by one
   or more people that donate their time to the project;
-  ``none`` - means that the software is not actively maintained.

Key ``maintenance/contractors``
'''''''''''''''''''''''''''''''

-  Typ: Liste von Auftragnehmern (siehe unten)
-  Vorhandensein: obligatorisch, wenn ``maintenance/type`` ``contract`` **ist**; darf sonst nicht vorhanden sein

This key describes the entity or entities, if any, that are currently
contracted for maintaining the software. They can be companies,
organisations, or other collective names.

Key ``maintenance/contacts``
''''''''''''''''''''''''''''

-  Typ: Liste von Kontakten (siehe unten)
-  Vorhandensein: obligatorisch, wenn ``maintenance/type`` ``internal`` oder ``community`` **ist**; sonst optional

One or more contacts maintaining this software.

This key describes the technical people currently responsible for
maintaining the software. All contacts need to be a physical person, not
a company or an organisation. If somebody is acting as a representative
of an institution, it must be listed within the ``affiliation`` of the
contact.

In case of a commercial agreement (or a chain of such agreements),
specify the final entities actually contracted to deliver the
maintenance. Do not specify the software owner unless it is technically
involved with the maintenance of the product as well.

Section ``localisation``
~~~~~~~~~~~~~~~~~~~~~~~~

This section provides an overview of the localization features of the
software.

Key ``localisation/localisationReady``
''''''''''''''''''''''''''''''''''''''

-  Typ: boolescher Wert
-  Vorhandensein: obligatorisch

If ``true``, the software has infrastructure in place or is otherwise
designed to be multilingual. It does not need to be available in more
than one language.

Key ``localisation/availableLanguages``
'''''''''''''''''''''''''''''''''''''''

-  Typ: Liste von Sprach-Tags nach IETF BCP 47
-  Vorhandensein: obligatorisch
-  Beispiel: ``"it"``, ``"en"``, ``"sl-IT-nedis"``

This is the list of languages in which the software is
available. Of course, this list will contain at least one language.
The primary language subtag cannot be omitted, as mandated by the 
`BCP 47 <https://www.rfc-editor.org/info/bcp47/>`__.

Section ``dependsOn``
~~~~~~~~~~~~~~~~~~~~~

This section provides an overview on the system-level dependencies
required to install and use this software.

**NOTE:** do not list dependencies at the source code level (e.g.:
software libraries being used), and focus only on runtime and/or
system-level dependencies that must be installed and maintained
separately. For instance, a database is a good example of such
dependencies.

Key ``dependsOn/open`` (*veraltet*)
'''''''''''''''''''''''''''''''''''

-  Typ: Liste von ``dependency`` (siehe unten)
-  Vorhandensein: optional

This key contains a list of runtime dependencies that are distributed
under an open-source license.

Dieser Schlüssel ist veraltet. Open-Source-Laufzeitabhängigkeiten sind
bereits in der SBOM oder in den Manifesten der Paketmanager angegeben.
Was installiert werden muss, gehört in die Dokumentation und in die
Deployment-Skripte.

Key ``dependsOn/proprietary``
'''''''''''''''''''''''''''''

-  Typ: Liste von ``dependency`` (siehe unten)
-  Vorhandensein: optional

This key contains a list of runtime dependencies that are distributed
under a proprietary license.

Key ``dependsOn/hardware``
''''''''''''''''''''''''''

-  Typ: Liste von ``dependency`` (siehe unten)
-  Vorhandensein: optional

This key contains a list of hardware dependencies that must be owned to
use the software.

Special data formats
--------------------

Dependency
~~~~~~~~~~

A ``dependency`` is a mapping with the following properties:

-  ``name`` - **mandatory** - The name of the dependency (e.g. MySQL,
   NFC Reader)
-  ``versionMin`` - the first compatible version
-  ``versionMax`` - the latest compatible version
-  ``version`` - the only major version for which the software is
   compatible. It assumes compatibility with all patches and bugfixes
   later applied to this version.
-  ``optional`` - whether the dependency is optional or mandatory

Complex versioning
~~~~~~~~~~~~~~~~~~

It is of course possible to use the various keys to specify a complex
compatibility matrix.

*Ex. 1*

.. code:: yaml

   - name: PostgreSQL
     version: "3.2"
     optional: true

This snippet marks an optional dependency on PostgreSQL exactly version
3.2.

*Ex. 2*

.. code:: yaml

   - name: MySQL
     versionMin: "1.1"
     versionMax: "1.3"

This snippet marks a mandatory dependency on MySQL, allowing any version
between 1.1 and 1.3.

Contact
~~~~~~~

Ein Kontakt ist ein Mapping mit den folgenden Eigenschaften:

-  ``name`` - **obligatorisch** - Dieser Schlüssel enthält den
   vollständigen Namen eines der technischen Kontakte. Es muss sich um
   eine reale Person handeln. Tragen Sie hier KEINE allgemeinen
   Kontaktinformationen, Unternehmensabteilungen, Vereine usw. ein.
-  ``email`` - Dieser Schlüssel enthält die E-Mail-Adresse des
   technischen Kontakts. Es muss eine E-Mail-Adresse sein, unter der der
   technische Kontakt direkt erreichbar ist. Tragen Sie hier KEINE
   Mailinglisten oder allgemeinen Kontaktadressen wie „info@acme.inc“
   ein.
-  ``phone`` - Telefonnummer. Sie MUSS die internationale Vorwahl
   enthalten und dem Format
   `E.164 <https://www.itu.int/rec/T-REC-E.164/en>`_ folgen (z. B.
   ``+3923113215112``). Der Wert muss eine Zeichenkette sein.
-  ``affiliation`` - Dieser Schlüssel enthält eine ausdrückliche Angabe
   zur Zugehörigkeit des technischen Kontakts. Bei mehreren Maintainern
   kann damit jeder technische Kontakt einem Maintainer zugeordnet
   werden. Er kann zum Beispiel den Namen eines Unternehmens oder eines
   Vereins enthalten.

Organisation
~~~~~~~~~~~~

Eine Organisation ist eine Einrichtung (Verein, Unternehmen, Behörde
usw.), die die Softwareentwicklung finanzieren kann. Eine Organisation
ist ein Mapping mit den folgenden Eigenschaften:

-  ``name`` - **obligatorisch** - Der Name der Organisation, unabhängig
   davon, ob es sich um einen Verein, ein Unternehmen, eine öffentliche
   Einrichtung oder eine natürliche Person handelt.
-  ``uri`` - Die URI, die die Organisation identifiziert.

Contractor
~~~~~~~~~~

A Contractor is a mapping with the following properties:

-  ``name`` - **mandatory** - The name of the contractor, whether it’s a
   company or a physical person.
-  ``until`` - **mandatory** - This is a date (YYYY-MM-DD). This key
   must contain the date at which the maintenance is going to end. In
   case of community maintenance, the value should not be more than 2
   years in the future, and thus will need to be regularly updated as
   the community continues working on the project.
-  ``email`` - This key contains the e-mail address of the technical
   contact. It must be an email address of where the technical contact
   can be directly reached; do NOT populate this key with mailing-lists
   or generic contact points like “info@acme.inc”.
-  ``website`` - This key points to the maintainer website. It can
   either point to the main institutional website, or to a more
   project-specific page or website.

Datum
~~~~~

Jedes Datum in ``publiccode.yml`` muss dem Format "JJJJ-MM-TT" folgen, welches eines der Formate nach ISO8601 ist. Allerdings sind sonst keine anderen Formate aus ISO8601 für Datums-Keys erlaubt.

Encodierung
~~~~~~~~~~~

``publiccode.yml`` **MUSS** ein UTF-8-encodiertes Dokument sein und
**MUSS** ein YAML-1.2-Dokument sein.
