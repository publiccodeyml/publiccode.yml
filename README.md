<!-- markdownlint-disable no-inline-html -->

<h1 align="center">The publiccode.yml Standard</h1>

<div align="center">
  <i>
    A metadata description standard for public software that is easy to use both for
    developers and people with less technical background in order to make the
    software developed by Public Administrations and Public Organisations easily discoverable.
  </i>
</div>

<br />

 <!-- Badges -->
<div align="center">
  <a href="https://github.com/publiccodeyml/publiccode.yml/releases">
    <img alt="Latest release" src="https://img.shields.io/github/release/publiccodeyml/publiccode.yml.svg?style=plastic">
  </a>
  <a href="https://developersitalia.slack.com/messages/CAM3F785T">
    <img alt="Join the #publiccode channel" src="https://img.shields.io/badge/Slack%20channel-%23publiccode-blue.svg">
  </a>
  <a href="https://slack.developers.italia.it/">
    <img alt="Get invited" src="https://slack.developers.italia.it/badge.svg">
  </a>
</div>

<div align="center">
  <h3>
    <a href="governance/charter.md">Charter</a>
    <span> | </span>
    <a href="governance/procedure-proposing-changes-and-voting.md">
      Voting procedure</a>
    <span> | </span>
    <a href="CONTRIBUTING.md">Contributing</a>
    <br>
    <br>
    📣 publiccode.yml is one of the 6 candidates for the OSOR Achievement Award 2023
    👉 <a href="https://joinup.ec.europa.eu/collection/open-source-observatory-osor/osor-awards-2023">Cast your vote</a> 👈 
  </h3>
</div>

## What `publiccode.yml` is for

Many great software projects are developed by public administrations, however
reuse of these projects is very limited. Some of the reasons for low uptake of
such projects is a lack of discoverability and that it is hard to find out what
project can actually work in the context of a different public administration.

The `publiccode.yml` file is meant to solve all those problems. It is
an easily readable file for civil servants that are trying to figure out
whether a project will work for them, and easily readable by computers as
well. It contains information such as:
* the title and description of the project in English and/or other
  languages;
* the development status, e.g. `concept`, `development`, `beta`, `stable`,
  `obsolete`;
* which organisation developed the project;
* who is caring for the maintenance and when this expires;
* who to contact for technical or support inquiries;
* what national and local legal frameworks the project is designed
  for;
* what software dependencies the project has.

The `publiccode.yml` file format should both be able to easily be added to any
new project, as well as grow with the project as it expands beyond the original
context it was developed in.

## Finding projects

Finding projects depends on how the search API is structured for every hosting
platform. For example, you can find all `publiccode.yml` on GitHub files by
searching using the frontend or the API.

* [GitHub Search `path:publiccode.yml`](https://github.com/search?q=path%3Apubliccode.yml&type=code)

## Versioning

**Latest release:** [![GitHub release](https://img.shields.io/github/release/publiccodeyml/publiccode.yml.svg?style=plastic)](https://github.com/publiccodeyml/publiccode.yml/releases) [See all versions](https://github.com/publiccodeyml/publiccode.yml/releases)

This project follows the Semantic Versioning.  For more information see
[SemVer.org](https://semver.org/).

Furthermore, the project uses branches and tags in the following way:
* The `main` branch contains the improvements coming up in the next version.
* [Release page](https://github.com/publiccodeyml/publiccode.yml/releases)
  contains all the released versions of the standard. Releases are tagged
  with the Standard's version.

## Contributing

Feel free to submit [Pull Requests and to file Issues](CONTRIBUTING.md).

## Licence

Licenced under the [CC0-1.0](LICENSE).
