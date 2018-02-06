# `publiccode.yml` standard

Status: **Concept**

A metadata description standard for public software and policy repositories.

The goal of this standard is to make public software, such as the software developed by public administrations and public organisations easily discoverable.

A [draft](https://gist.github.com/rasky/fbd2da521b827c4a22b352bdb0811471) of the implementation has been made by [Giovanni Bajo](https://github.com/rasky).

## Goals

We want to make the following discoverable:

* The codebase is public and open source
* The title and description of the project or product in English
* The title and description of the project or product in other languages
* The status of development, e.g. 'concept', 'alpha', 'beta', 'released', 'depricated'
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

Feel free to submit Pull Requests and to file Issues.

## Licence

Licenced under the [CC-0](LICENSE)
