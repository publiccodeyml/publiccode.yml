---
name: generate-publiccode-yml
description:
  Create, update or validate a publiccode.yml metadata file for a repository.
  Use this skill whenever the user works on software developed by or for
  public administrations and wants to make it discoverable in public software
  catalogs, mentions publiccode.yml or publiccode.yml keys, or asks to add
  metadata to a government/public-sector repository — even if they only say
  things like "make this repo ready for the catalog" or "describe this
  project for reuse".
license: CC0-1.0
metadata:
  author: Tom Ootes (developer.overheid.nl)
---

# publiccode.yml author

`publiccode.yml` is the metadata file that national and international
software catalogs (developers.italia.it, opencode.de, …) crawl to index
public-sector software. This skill writes a valid file and keeps existing
ones up to date.

The Standard is versioned; target the latest released major line (currently
v0, latest release v0.8.0). The full specification is in
`reference/schema.core.rst` — consult it for any key you are unsure about
instead of guessing.

## Workflow

1. **Look for an existing `publiccode.yml`** in the repository root. If one
   exists, update it: preserve values that are still true, fix what has
   drifted, and remove deprecated keys (see below).
2. **Gather information** about the project before writing anything:
   - `README.md` for name, purpose, features and links;
   - API specifications (`openapi.json`, `swagger.json`, …): reuse their
     `info.description` for the longDescription, and link them under
     `description/[lang]/apiDocumentation` when hosted;
   - package manifests (`package.json`, `pyproject.toml`, `pom.xml`,
     `Cargo.toml`, `go.mod`, …) for name, description and license;
   - the git remote URL for `url` (use the HTTP(S) clone URL without
     login credentials);
   - a `LICENSE`/`LICENCE` file: map it to its SPDX identifier;
   - CI/CD configs or docs for a live deployment URL (`landingURL`) and
     documentation links.
   For GitHub/GitLab repositories, the organization page shows the display
   name of the publishing organization — use that display name (not the URL
   slug) for `organisation/name` and `legal/mainCopyrightOwner`.
3. **Write the file** following the conventions below.
4. **Validate** with don-checker:
   `npx @developer-overheid-nl/don-checker@latest validate --standard publiccode --input ./publiccode.yml`
   — and cross-check with the reference parser when available. More
   options in `reference/validation.md`. Fix all errors; report warnings
   honestly to the user.

Never invent facts. Values like contact persons, `legal/mainCopyrightOwner`
or `fundedBy` are factual claims: if the repository does not reveal them,
leave the key out or ask the user.

## Mandatory keys

Every file needs: `publiccodeYmlVersion: "0"`, `name`, `url`, `platforms`,
`developmentStatus`, `softwareType`, `description` (at least one BCP 47
language with `shortDescription` and a `longDescription` of 150–10000
chars), `legal/license` (SPDX expression), `maintenance/type`,
`localisation/localisationReady` + `availableLanguages`.

Conditional rules: `maintenance/contractors` only when
`maintenance/type` is `contract`; `maintenance/contacts` mandatory when the
type is `internal` or `community`. Contacts must be natural persons — put
organizations in `affiliation`.

## Choosing enum values

`softwareType` — decide in this order:
- plugin manifest or explicit extension of another application → `addon`
- only configuration files, no executable code → `configurationFiles`
- reusable library/SDK without UI → `library`
- web interface → `standalone/web`
- background service or API without its own UI → `standalone/backend`
- desktop → `standalone/desktop`, mobile → `standalone/mobile`,
  IoT → `standalone/iot`; anything else → `standalone/other`

`categories` and `intendedAudience/scope` only accept values from
`reference/categories-list.rst` and `reference/scope-list.rst`. Pick the
closest category that exists (or `other`) — never invent a new one. For
`supports/id`, only aliases listed in `reference/aliases-list.rst` are valid.

`name` is the product's public name in normal capitalization — not the
repository slug in kebab-case, camelCase or snake_case.

## Deprecated keys — never add, remove when found

`usedBy`, `videos`, `intendedAudience/unsupportedCountries`,
`dependsOn/open`, `description/[lang]/genericName`, `monochromeLogo`,
`inputTypes`, `outputTypes`, `legal/repoOwner` (→ `organisation/name`),
`legal/authorsFile`, scope `government`, the single-string form of
`isBasedOn` (use a one-element array), and all `it.*` country-specific
sections (→ `supports`).

## File conventions

- UTF-8, YAML 1.2. Quote `"0"` in `publiccodeYmlVersion`.
- Since v0.8.0, `description/[lang]/longDescription` is Markdown. Use a
  YAML **literal** block (`|`) when the Markdown contains line-sensitive
  structures (lists, links on separate lines); the **folded** form (`>`),
  as in the official examples, is fine for plain prose. Short lines (~80
  chars) keep diffs readable.
- `shortDescription` ≤ 150 chars, single sentence. Write it as a folded
  scalar with strip chomping (`>-`) when wrapping over multiple lines:
  the lines merge back into one contiguous sentence.
- Do not add `releaseDate` or `softwareVersion` while generating — they
  drift out of date immediately. Remove them from existing files on
  request.
- Dates are `YYYY-MM-DD` only. Phone numbers are strings, preferably E.164
  (`+39…`).
- Insert a blank line between top-level sections for readability.
- Put user documentation under `description/[lang]/documentation`,
  API docs under `apiDocumentation`.

## Examples

`reference/examples/publiccode.minimal.yml` shows the smallest valid file;
`reference/examples/publiccode.yml` shows an extended one. When updating an
existing file, aim for minimal changes — catalogs re-crawl the file, so
keep the diff reviewable.
