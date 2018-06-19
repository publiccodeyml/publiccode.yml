# The `publiccode.yml` standard


![Repo Status: Alpha](https://img.shields.io/badge/status-alpha-lightgrey.svg?longCache=true&style=plastic)
[![Build status](https://travis-ci.com/publiccodenet/publiccode.yml.svg?branch=master)](https://travis-ci.com/publiccodenet/publiccode.yml)

A metadata description standard for public software and policy repositories that is easy to use both for developers and less technical people in order to make the software developed by public administrations and public organisations easily discoverable.

**Latest release:  [Version 0.1](version/0.1)**

This project follows the Semantic Versioning.

For more information see [SemVer.org](https://semver.org/).

## Official Releases
### 0.x
* [Version 0.1](version/0.1)

### Development
* [Development](version/development)

The PublicCode specification is developed by the [Italian Digital Transformation Team](https://teamdigitale.governo.it) and the [Authors](AUTHORS.md).

## What this file is for

Many great software projects are developed by public administrations, however reuse of these projects is very limited. Some of the reasons for low uptake of these projects is a lack of discoverability and that it is hard to find out what project can actually work in the context of a different public administration.

The `publiccode.yml` file is meant to solve these problems. It is an easily readable file for civil servants that are trying to figure out whether a project will work for them, and easily readable for computers. It contains information such as:

* The title and description of the project or product in English and/or other languages
* The status of development, e.g. `concept`, `development`, `beta`, `stable`, `obsolete`
* By what organisation this project is developed
* Who is caring for the maintenance and when this runs out
* Who to contact for technical or support inquiries
* What national and local legal frameworks this project or product works in
* What software dependencies this project or product has

The format should both be able to easily be added to any new project, as well as grow with the project as it grows beyond the original context it was developed in.

## Finding projects

You can find all `publiccode.yml` on GitHub files by searching using the frontend or the API.

* [GitHub Search `filename:publiccode.yml`](https://github.com/search?utf8=%E2%9C%93&q=filename%3Apubliccode.yml&type=)

The Italian Digital Transformation Team is also working on providing a scanner which looks for all PublicCode files on all publicly accessible websites, and exposing them as open data.

## Contributing

Feel free to submit [Pull Requests and to file Issues](CONTRIBUTING.md).

## Website

The website at <https://w3id.org/publiccode/> is automatically generated from the `master` branch of the [`publiccode.yml` repository](https://github.com/publiccodenet/publiccode.yml) using [GitHub pages](https://pages.github.com) and its static site generator [Jekyll](https://jekyllrb.com) and the [Foundation For Public Code jekyll theme](https://github.com/publiccodenet/jekyll-theme).

## Licence

Licenced under the [CC-0](LICENSE)
