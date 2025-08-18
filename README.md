<!-- markdownlint-disable no-inline-html -->

<h1 align="center">The publiccode.yml Standard</h1>

<div align="center">
  <i>
    A metadata standard to describe software made by or for Public administrations, making it discoverable
    and understandable for both developers and non-technical users.
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
    <a href="https://yml.publiccode.tools">Website</a>
    <span> | </span>
    <a href="governance/charter.md">Charter</a>
    <span> | </span>
    <a href="governance/procedure-proposing-changes-and-voting.md">
      Voting procedure</a>
    <span> | </span>
    <a href="CONTRIBUTING.md">Contributing</a>
  </h3>
</div>

## What is `publiccode.yml`

Public Administrations often create valuable software, but reuse is often limited due to
poor discoverability or difficulty understanding if a project fits another administration's context.

`publiccode.yml` solves this by providing a **human-readable and machine-readable metadata file**.

It answers the questions:
- What does this project do? (name, description, languages)
- What is its status? (`concept`, `development`, `beta`, `stable`, `obsolete`)
- Who maintains it and until when?
- Who to contact for technical/support inquiries?
- What legal frameworks is it designed for?
- What are its dependencies?

It is designed to be **easy to add to any new project** and to **grow as the project evolves**.

## Example

A minimal `publiccode.yml` file:

```yaml
publiccodeYmlVersion: "0"
name: My text editor
url: "https://example.com/mysoftware/text-editor.git"
platforms:
  - windows
categories:
  - office
developmentStatus: development
softwareType: "standalone/desktop"
description:
  en:
    shortDescription: A lightweight text editor
    longDescription: >
          A lightweight yet powerful text editor designed for everyday use by developers,
          writers, and public administrations. It also supports syntax highlighting.
    features:
       - Syntax highlighting
       - Collaborative editing features
       - Scripting interface
legal:
  license: AGPL-3.0-or-later
maintenance:
  type: "community"
  contacts:
    - name: Margaret Hamilton
localisation:
  localisationReady: true
  availableLanguages:
    - en
    - de
    - fr
```

[**See all available fields...**](https://yml.publiccode.tools/)

## Finding projects

Finding projects depends on how the search API is structured for every hosting
platform. For example, you can find all `publiccode.yml` on GitHub files by
searching using the frontend or the API.

* [GitHub Search `path:publiccode.yml`](https://github.com/search?q=path%3Apubliccode.yml&type=code)

## Versioning

**Latest release:** [![GitHub release](https://img.shields.io/github/release/publiccodeyml/publiccode.yml.svg?style=plastic)](https://github.com/publiccodeyml/publiccode.yml/releases) [See all versions](https://github.com/publiccodeyml/publiccode.yml/releases)

This project follows the Semantic Versioning.  For more information see
[SemVer.org](https://semver.org/).

## Contributing

Feel free to submit [Pull Requests and to file Issues](CONTRIBUTING.md).

The Standard's website (https://yml.publiccode.tools) is built using the Python Sphinx package.

### Prerequisites
- Python 3.9

### Install dependencies

```console
pip install -r requirements.txt
```

### Local development process
`spinx-build` can be used to compile all source file to static html files. Run this command to generate the website:

```console
sphinx-build docs/standard build -c .
```

## Licence

Licenced under the [CC0-1.0](LICENSE).
