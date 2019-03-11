# Changelog
All notable changes to this project will be documented in this file.

## [0.2] - 2019-03-11
### Added
- A new `countryExtensionVersion` key was added under each country-specific extension, in order to separate their versioning from the core.
- The `standalone` value for the `softwareType` key was deprecated in favor of more specific values: `standalone/mobile`, `standalone/iot`, `standalone/desktop`, `standalone/web`, `standalone/backend`, `standalone/other`

### Changed
- `intendedAudience/onlyFor` was renamed to `intendedAudience/scope` (with a different dictionary of values).
- `tags` was replaced by `categories` (with a different dictionary of values).
- BCP47 is now used for languages instead of ISO 639-2, thus keys under `description` will now look like `en` instead of `eng`
- `publiccode-yaml-version` was moved to `publiccodeYmlVersion` using camelCase
- `maintainance/contacts` is now mandatory only if `maintainance/type` is `internal` or `community`.
- All files ported to RST from previous MD

### Removed
- The `freeTags` key was removed.

## [0.1] - 2019-01-25
### Added
- Files for first release

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
