# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [0.2] - 2019-03-11
### Added
- Country Extension
- The `standalone` value for the `softwareType` key was deprecated in favor of more specific values: `standalone/desktop`, `standalone/web`, `standalone/backend`, `standalone/other`
- `scope-list` file with new categories 
- `intendedAudience/scope` key
- country.rst dedicated

### Changed
- `tags` key -> `categories`
- BCP47 is now used for languages instead of ISO 639-2, thus keys under `description` will now look like `en` instead of `eng`
- `publiccode-yaml-version` -> `publiccodeYmlVersion`
- All files ported to RST from previous MD
- Updated README file
- Updated rules on `contact`

### Removed
- `pa-types` file 
- `intendedAudience/onlyFor` key

## [0.1] - 2019-01-25
### Added
- Files for first release
