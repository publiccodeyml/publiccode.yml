# The `publiccode.yml` standard

[![GitHub release](https://img.shields.io/github/release/italia/publiccode.yml.svg?style=plastic)](https://github.com/italia/publiccode.yml/releases)
[![Join the #publiccode channel](https://img.shields.io/badge/Slack%20channel-%23publiccode-blue.svg)](https://developersitalia.slack.com/messages/CAM3F785T)
[![Get invited](https://slack.developers.italia.it/badge.svg)](https://slack.developers.italia.it/)

> A metadata description standard for public software

---

## Table of Contents

- [Description](#description)
- [What is this file for](#what-this-file-is-for)
- [Finding Projects](#finding-projects)
- [Versioning](#versioning)
- [Contributing](#contributing)
- [Authors](#authors)
- [License](#license)

## Description

A metadata description standard for public software and policy repositories
that is easy to use both for developers and people with less technical
background, in order to make the software developed by Public Administrations
and Public Organisations easily discoverable.

## What this file is for

Many great software projects are developed by public administrations, however
reuse of these projects is very limited. Some of the reasons for low uptake of
such projects is a lack of discoverability and that it is hard to find out what
project can actually work in the context of a different public administration.

The `publiccode.yml` file is meant to solve all those problems. As such, it is
an easily readable file for civil servants that are trying to figure out
whether a project will work for them, and easily readable for computers as
well. It contains information such as:
* the title and description of the project or product in English and/or other
  languages;
* the development status, e.g. `concept`, `development`, `beta`, `stable`,
  `obsolete`;
* which organisation developed the project;
* who is caring for the maintenance and when this expires; 
* who to contact for technical or support inquiries;
* what national and local legal frameworks this project or product is designed
  for;
* what software dependencies this project or product has. 

The `publiccode.yml` file format should both be able to easily be added to any
new project, as well as grow with the project as it expands beyond the original
context it was developed in.

## Finding projects

Finding projects depends on how the search API is structured for every hosting
platform. For example, you can find all `publiccode.yml` on GitHub files by
searching using the frontend or the API.

* [GitHub Search `filename:publiccode.yml
  path:/`](https://github.com/search?q=filename%3Apubliccode.yml+path%3A%2F)

The Italian Digital Transformation Team is also working on providing a scanner
which looks for all publiccode files on all publicly accessible websites, and
exposing them as open data.

## Versioning 

**Latest release:** [![GitHub release](https://img.shields.io/github/release/italia/publiccode.yml.svg?style=plastic)](https://github.com/italia/publiccode.yml/releases) [See all versions](https://github.com/italia/publiccode.yml/releases)

This project follows the Semantic Versioning.  For more information see
[SemVer.org](https://semver.org/).

Furthermore, the project uses branches and tags in the following way:
* The `master` branch contains the latest stable version of the standard.
* The `development` branch contains the improvements proposed for the next
  version. 
* GitHub's [release page](https://github.com/italia/publiccode.yml/releases)
  contains all the released versions of the standard. Releases are done
  following the tag version for consistency.

However, since the repository contains both the core schema and the
country-specific ones, it is necessary to further refine the versioning. 
As such, each update at the core and/or to a country-specific extension will be
tagged as follows:

> core:x.y.z/<cc>:a.b.c

where <cc> is the country code defined using one of the ISO 3166-1 alpha-2
codes. 

This versioning schema is fundamental in this project since the
`publiccode.yml` file contains references to the core release in the
`publiccodeYmlVersion` key and each country-specific schema contains
a `version` key. 

Examples of this versioning schema may be:

> * core:0.2/it:0.4
> * core:0.2/fr:1.1

## Contributing

Feel free to submit [Pull Requests and to file Issues](CONTRIBUTING.md).

This repository is structured in order to be compatible with the `Docs Italia`
platform. As such, the markdown content in the relevant folders will be
compiled and rendered on top of that platform. The `Docs Italia` platform is
able to handle different releases and localised versions of the same file
drawing from the document's GitHub repository. As such, the platform is to be
considered the default landing page for the project.

## Authors
The `publiccode.yml` specification is developed by the [Italian Digital
Transformation Team](https://teamdigitale.governo.it) and the
[Authors](AUTHORS.md).

## Licence

Licenced under the [CC-0](LICENSE).
