# `publiccode.yml` standard

This document contains an informal description of the schema of
`publiccode.yml`.

## Structure

### Country-specific extensions

While the standard is structured to be meaningful on an international
level, there are additional information that can be added that makes
sense in specific countries, such as declaring compliance with local
laws or regulations. The provided extension mechanism is the usage
of country-specific sections.

All country-specific sections are prefixed with the two-letter ISO 639-1
country code, followed by an underscore (`_`), followed by the section name.
For instance `it_pianoTriennale` is a section declaring compliance to
the Italian digital transformation plan.

Notice that country-specific keys within international sections are
not allowed. Countries that want to extend the format should add one
or many country-specific sections instead.

Documentation for country specific sections is maintained in separate
files:

* Italy: [Italian extensions](it-schema.md)


## Top-level section

### Key `version`

* Type: string
* Presence: mandatory
* Example: `"0.1"`

This key specifies the version to which the current `publiccode.yml`
adheres to, for forward compatibility. Current version is `0.1`.

### Key `url`

* Type: string (URL)
* Presence: mandatory
* Example: `"https://example.com/italia/repo.git"`

This string must be a URL to the repository in which the software is
published. If the repository is available under multiple protocols,
prefer HTTP/HTTPS URLs.

Forks created for the purpose of contributing upstreams should not
modify this file; this helps software parsing `publiccode.yml` to
immediately skips irrelevant forks. On the contrary, a fork that is
meant to be maintained separately from the original software should
modify this line, to give themselves the status of a fork.

### Key `upstreamUrl`

* Type: string or array of strings
* Presence: optional
* Example: "https://github.com/italia/otello"

This string must be one or multiple URLs of upstream repositories from
which this fork was created. This key is meant to create a relation
between forked repositories that could not be found out otherwise (for
instance, some code hosting platforms record fork relations in their
metadata).

If you fork a software with the purpose of creating an independent
version, you should consider mentioning the upstream project in this
key.


## Section `legal`

### Key `legal/license`

* Type: string
* Presence: mandatory
* Example: `"AGPL-3.0-or-later"`

This string describes the license under which the software is
distributed. The string must contain a valid SPDX expression, referring
to one (or multiple) open-source license. Please refer to the [SPDX
documentation](https://spdx.org/licenses/) for further information.

### Key `legal/mainCopyrightOwner`

* Type: string
* Presence: optional
* Example: "City of Amsterdam and many contributors"

This string describes the entity that owns the copyright on
"most" of the code in the repository. Normally, this is the line
that is reported with the copyright symbol at the top of most files
in the repo.

It is possible to list multiple owners if required so, using an English
sentence. It is also possible to informally refer to a community of
group of people like "Linus Torvalds and all Linux contributors".

In case it is not possible to name a main copyright owner, it is
possible to omit this key; in those cases, if the repo has a authors
file, you can point to it through `legal/authorsFile`.

### Key `legal/authorsFile`

* Type: string (path to file)
* Presence: optional
* Example: "doc/AUTHORS.txt"

Some open-source softwares adopt a convention of identify the copyright
holders through a file that lists all the entities that own the
copyright. This is common in projects strongly backed by a community
where there are many external contributors and no clear single/main
copyright owner. In such cases, this key can be used to refer to the
authors file, using a path relative to the root of the repository.

### Key `legal/repoOwner`

* Type: string
* Presence: mandatory
* Example: "City of Amsterdam"

This string describes the entity that owns this repository; this might
or might not be the same entity who owns the copyright on the code
itself. For instance, in case of a fork of the original software, the
`repoOwner` is probably different from the `mainCopyrightOwner`.


## Section `maintenance`

This section provides information on the maintenance status of the
software, useful to evaluate whether the software is actively
developed or not.

### Key `maintenance/type`

* Type: enumerate
* Presence: mandatory
* Values: "internal", "contract", "community", "none"

This key describes how the software is currently maintained.
"internal" means that the software is internally maintained by
the repository owner. "contract" means that there is a commercial
contract that binds an entity to the maintenance of the software;
"community" means that the software is currently maintained by one
or more people that donate their time to the project;
"none" means that the software is not actively maintained.

### Key `maintenance/until`

* Type: date (YYYY-MM-DD)
* Presence: mandatory (if the software maintenance type is not "none")
* Example: 2019-07-01

In case of a maintenance, this key must contain the date
at which the maintenance is going to end. In case of community
maintenance, the value should not be more than 2 years in the
future, and thus will need to be regularly updated as the
community continues working on the project.

### Key `maintenance/maintainer`

* Type: string or array of strings
* Presence: mandatory (if there is a maintenance)
* Example: "Linus Torvalds", "Italian Linux Group", "Acme Inc."

This key describes the entity or entities that are currently maintaining
the software. It can contain for instance a company name, an association
name, a private person. etc.

In case of a commercial agreement (or a chain of such agreements),
specify the final entities actually contracted to deliver the
maintenance. Do not specify the software owner unless it is technically
involved with the maintenance of the product as well.

### Key `maintenance/maintainerWebsite`

* Type: URL
* Presence: optional (if there is a maintenance)

This key points to the maintainer website. It can either point to the main
institutional website, or to a more project-specific page or website.

### Key `maintenance/technicalContacts`

* Type: array of objects
* Presence: mandatory (if there is a maintenance)

This key describes the physical point of contacts of the technical
people in charge of the maintenance. The goal is to provide a clear
contact point for contributors that need to discuss how to best
implement modifications to the software.

It MUST contain real names of individuals (eg: first name, family name) and direct
e-mail addresses. Do NOT populate these objects using generic contact
points (like mailing lists, generic "info@" email addresses) and/or
generic department names (eg: "Acme Inc. Support Department").

### Key `maintenance/technicalContacts/name`

* Type: string
* Presence: mandatory
* Example: "Frank Zappa"

This key contains the full name of one of the technical contacts.
It must be a real person; do NOT populate this key with generic
contact information, company departments, associations, etc.

### Key `maintenance/technicalContacts/email`

* Type: string
* Presence: mandatory
* Example: "frank.zappa@example.com"

This key contains the e-mail address of the technical contact. It
must be an email address of where the technical contact can be
directly reached; do NOT populate this key with mailing-lists or
generic contact points like "info@acme.inc".

The e-mail address must not be obfuscated. To improve resistance
against e-mail collection, use `\x64` to replace `@`, as allowed
by the YAML specification.

### Key `maintenance/technicalContacts/affiliation`

* Type: string
* Presence: optional
* Example: "Acme Inc."

This key contains an explicit affiliation information for the technical
contact. In case of multiple maintainers, this can be used to create
a relation between each technical contact and each maintainer entity.


## Section `description`

This section contains general description on the software. Parsers
can use this section for instance to create a web page describing
the software.

### Key `description/name`

* Type: string
* Presence: mandatory
* Example: "Medusa"

This key contains the (short) public name of the product. It should be
the name most people usually refer to the software. In case the software
has both an internal "code" name and a commercial name, use the
commercial name.

### Key `description/version`

* Type: string
* Presence: optional
* Example: "1.0", "dev"

This key contains the latest stable version number of the software.
The version number is a string that is not meant to be interpreted
and parsed but just displayed; parsers should not assume semantic
versioning or any other specific version format.

The key can be omitted if the software is currently in initial
development and has never been released yet.

### Key `description/releaseDate`

* Type: string (date)
* Presence: mandatory if `description/version` is present
* Example: "2017-04-15"

This key contains the date at which the latest version was released.
This date is mandatory if the software has been released at least once
and thus he version number is present.

### Key `description/platforms`

* Type: enumerated string or array of strings
* Presence: mandatory
* Values: "web", "windows", "mac", "linux", "ios", "android". Values
  outside this list are allowed.
* Example: "web"

This key specifies which platform the software runs on. It is meant
to describe the platforms that users will use to access and operate
the software, rather than the platform the software itself runs on.

Use the predefined values if possible. If the software runs on a
platform for which a predefined value is not available, a different
value can be used.

### Key `description/logo`

* Type: string or array of strings (path to file)
* Presence: optional
* Formats: SVG, PNG
* Example: "img/logo.svg"

This key contains the logo of the software. Logos should be in vector
format, but raster formats are allowed as a fallback.

Vector logos should be provided at least in two formats: a color one,
and a monochromatic (black) one.

Raster logos should be provided only if vector logos do not exist.
In this case, they should be transparent PNGs, minimum 1000px of
width.

### Key `description/shortDesc`

* Type: multi-language string (max 100 chars)
* Presence: mandatory
* Example: "Advanced booking system for hospitals"

This key contains a short description of the software. It should be
a single line containing a single sentence. Maximum 100 characters are
allowed.

### Key `description/longDesc`

* Type: multi-language string (min 500 chars, max 10000 chars)
* Presence: mandatory

This key contains a longer description of the software, between 500
and 10000 chars. It is meant to provide an overview of the capabilities
of the software for a potential users. The audience for this text
should be that of users of the software, not developers. You can think
of this text as the description of the software that would be in its
website (if the software had one).

### Key `description/screenshots`

* Type: array of strings (paths)
* Presence: optional
* Formats: PNG, JPG
* Example: "data/screenshots/configuration.png"

This key contains one or multiple paths to files showing screenshots of
the software. They are meant to give a quick idea on how the software
looks like and how it works.

Screenshots can be of any shape and size; the suggested formats are:

 * Desktop: 1280x800 @1x
 * Tablet: 1024x768 @2x
 * Mobile: 375x667 @2x


### Key `description/videos`

* Type: array of strings (URLs)
* Presence: optional
* Example: "https://youtube.com/xxxxxxxx"

This key contains one or multiple URLs of videos showing how the
software works. Like screenshots, videos should be used to give a quick
overview on how the software looks like and how it works. Videos should
be hosted on a video sharing website that supports the
[oEmbed](https://oembed.com) standard; popular options are YouTube and
Vimeo.


## Section `classification`

This section contains information useful to classify the software,
define its scope of usage and its goal at a general level.

### Key `classification/scope`

* Type: string or array of strings
* Presence: optional
* Example: "es"

This key defines the expected geographical scope of the software. If
a software is probably useful only within some specific countries
(because, eg., it helps implementing a specific regulation), specify
the ISO693-1 two-letter country codes of the countries n this key.

### Key `classification/paType`

* Type: enumerated string or array of strings
* Presence: optional
* Values: see [pa-types.md](pa-types.md)
* Example: "city"

This key defines the types of public administration which is expected
to use this software. Public software is often specific in scope, because
there is a large set of tasks that are specific to each type of
administration. For instance, many softwares that are used in schools
are probably not useful in hospitals.

The list of allowed values is defined in [pa-types.md](pa-types.md),
and can evolve at any time, separately from the version of this
specification.

### Key `classification/category`

* Type: enumerated string
* Presence: optional
* Values: see [sw-category.md](sw-category.md)
* Example: "it-anagrafe"

This key defines the "category" of software, which is the market area
for the software. You can select the category that is more similar to
the software; it doesn't have to be an exact match, but it can still
be very useful for building catalogs of software and evaluate
alternatives.

The list of allowed values is defined in [sw-category.md](sw-category.md),
and can evolve at any time, separately from the version of this
specification.

### Key `classification/tags`

* Type: array of strings
* Presence: optional
* Example: "city", "accounting", "hr", "employee", "public"

A list of words that can be used to describe the software and can
help building catalogs of open software.

Each tag must be in Unicode lowercase, and should not contain
any Unicode whitespace character. The suggested character to
separate multiple word is `-` (single dash).


### Key `classification/usedBy`

* Type: array of strings
* Presence: optional
* Example: "City of Amsterdam"

A list of public administrations that are currently using this software.

Parsers are encouraged to enhance this list also with other information
that can obtain independently; for instance, a fork of a software,
owned by an administration, could be used as a signal of usage of the
software.


### Section `dependencies`

This section provides an overview on the system-level dependencies
required to install and use this software.

**NOTE:** do not list dependencies at the source code level (eg: software
libraries being used), and focus only on runtime and/or system-level
dependencies that must be installed and maintained separately. For
instance, a database is a good example of such dependencies.

### Key `dependencies/open`

* Type: array of strings
* Presence: optional
* Example: "MariaDB 10.2"

This key contains a list of runtime dependencies that are distributed
under an open-source license.

Each string is free form, max 50 characters; feel free to add version
numbers and/or short comments.

### Key `dependencies/proprietary`

* Type: array of strings
* Presence: optional
* Example: "IBM SoftLayer 4.5"

This key contains a list of runtime dependencies that are distributed
under a proprietary license.

Each string is free form, max 50 characters; feel free to add version
numbers and/or short comments.

### Key `dependencies/hardware`

* Type: array of strings
* Presence: optional
* Example: "NFC Reader (only for scanning tags)"

This key contains a list of hardware dependencies that must be owned
to use the software.

Each string is free form, max 50 characters; feel free to add version
numbers and/or short comments.


## Special data formats

### Dates

All dates in `publiccode.yml` must follow the format "YYYY-MM-DD",
which is one of the ISO8601 allowed encoding. This is the only
allowed encoding though, so not the full ISO8601 is allowed for the
date keys.

## Multi-language strings

Some strings in `publiccode.yml` can be translated in multiple
languages; they are marked as "multi-language string" in the above
documentation and they are implemented using a YAML object in which
each field's key is the two-letter ISO 639-1 language code, and the
content is the string in the specified language.

Example:

```yaml
description:
    shortdesc:
       - en: Advanced booking system for hospitals
       - it: Sistema avanzato di prenotazione per ospedali
```
