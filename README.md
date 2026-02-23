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
developmentStatus: development
softwareType: standalone/desktop
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
  type: community
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
platform. For example, you can find all `publiccode.yml` files in the root
directory of projects on GitHub, either by using the search frontend or the API.

* [GitHub Search `path:/^publiccode.yml$/`](https://github.com/search?q=path%3A%2F%5Epubliccode.yml%24%2F&type=code)

## Versioning

**Latest release:** [![GitHub release](https://img.shields.io/github/release/publiccodeyml/publiccode.yml.svg?style=plastic)](https://github.com/publiccodeyml/publiccode.yml/releases) [See all versions](https://github.com/publiccodeyml/publiccode.yml/releases)

This project follows the [Semantic Versioning](https://semver.org/).

## Contributing

Feel free to submit [Pull Requests, file Issues](CONTRIBUTING.md) or open
a [Discussion](https://github.com/publiccodeyml/publiccode.yml/discussions).

The [Standard's website](https://yml.publiccode.tools) is built using the Python
Sphinx package and
[deployed](https://github.com/publiccodeyml/publiccode.yml/blob/main/.github/workflows/publish.yml)
on GitHub Pages.

### Prerequisites

- [`uv`](https://docs.astral.sh/uv/getting-started/installation/)

### Local development process

`sphinx-build` can be used to compile all source file to static html files. Run
this command to generate the website:

```console
uv run sphinx-build docs/standard build -c .
```

then open the relevant file in the build directory with a browser (e.g.,
`build/index.html`) to explore the contents.

## Tooling

Tools and libraries that implement and support the publiccode.yml Standard.

### Core tools

Core tools are developed alongside the publiccode.yml specification and provide
its reference implementations and supporting components.

- **[publiccode-parser-go](https://github.com/italia/publiccode-parser-go)**

  Go parser and validator. Reference implementation of the specification.

- **[publiccode-parser-php](https://github.com/bfabio/publiccode-parser-php)**

  PHP library for parsing and validation using the reference implementation via FFI.

- **[publiccode-crawler](https://github.com/italia/publiccode-crawler)**

  Crawler to discover and collect descriptor files for catalogs.

- **[software-catalog-api](https://github.com/italia/developers-italia-api)**

  RESTful API powering software catalogs for public administrations, used to
  store, query and expose all catalog data about FLOSS solutions.

- **[publiccode-api-client](https://github.com/bfabio/publiccode-api-client)**

  Convenience command-line client to query the catalog API. (*alpha*)

- **[publiccode-parser-action](https://github.com/italia/publiccode-parser-action)**

  GitHub Action for validation in GitHub pipelines.

- **[publiccode-parser-gitlab-ci](https://github.com/italia/publiccode-parser-gitlab-ci)**

  GitLab CI integration for validation

- **[publiccode-validator-api](https://github.com/italia/publiccode-validator-api)**

  Simple RESTful API for validating publiccode.yml files, returning errors and warnings.

- **[publiccode-issueopener](https://github.com/italia/publiccode-issueopener)**

  Opens GitHub issues to repos in a software catalog with invalid publiccode.yml
  files.

- **[JSON Schema on SchemaStore](https://github.com/SchemaStore/schemastore/blob/master/src/schemas/json/publiccode.json)**

  JSON Schema definition mainly used by editors and IDEs for coarse validation
  and autocompletion.

### Third-party tooling

Maintained separately from the core tooling, but widely used in practice.

- **[publiccode-editor](https://github.com/italia/publiccode-editor)**

  User friendly editor and basic validator for publiccode.yml files (maintained
  by Developers Italia, Italian Government).

- **[publiccode-parser-orb](https://github.com/italia/publiccode-parser-orb)**

  CircleCI Orb for validation in pipelines.

## License

Licensed under the [CC0-1.0](LICENSE).
