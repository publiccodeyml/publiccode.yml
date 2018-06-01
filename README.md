# The `publiccode.yml` standard

:warning: :warning: This standard is under heavy development :warning: :warning:

![Repo Status: Alpha](https://img.shields.io/badge/status-alpha-lightgrey.svg?longCache=true&style=plastic)

A metadata description standard for public software and policy repositories.

The goal of this standard is to make public software, such as the software developed by public administrations and public organisations, easily discoverable.

The first draft of the implementation has been created by the [Italian Digital Transformation Team](https://teamdigitale.governo.it).

## Goals

We want to make the following discoverable:

* The codebase is public and open source
* The title and description of the project or product in English
* The title and description of the project or product in other languages
* The status of development, e.g. 'concept', 'alpha', 'beta', 'released', 'deprecated'
* Other project or product assets available (in multiple languages if applicable)
* By what organisation this project is developed
* Who is caring for the maintenance and when this runs out
* Who to contact for technical or support inquiries
* Who the software is used by
* What national and local legal frameworks this project or product works in
* What classification the software has in local contexts (one or multiple)
* What proprietary software dependencies this project or product has

The format should both be able to easily be added to any new project, as well as grow with the project as it grows beyond the original context it was developed in.

The standard needs strong versioning in development and should develop freely with the needs of the community.

The file should be lintable with a simple tool for compliance.

## Finding projects with a `publiccode.yml`

You can find all `publiccode.yml` files on [GitHub Search `filename:publiccode.yml`](https://github.com/search?utf8=%E2%9C%93&q=filename%3Apubliccode.yml&type=)

## Contributing

Feel free to submit [Pull Requests and to file Issues](CONTRIBUTING.md).

## Website

The website at <https://yml.publiccode.net/> is automatically generated from the `master` branch of the [`publiccode.yml` repository](https://github.com/publiccodenet/publiccode.yml) using [GitHub pages](https://pages.github.com) and its static site generator [Jekyll](https://jekyllrb.com) and the [Foundation For Public Code jekyll theme](https://github.com/publiccodenet/jekyll-theme).

## Licence

Licenced under the [CC-0](LICENSE)
