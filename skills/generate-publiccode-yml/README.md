# `generate-publiccode-yml` skill

An [Agent Skills](https://agentskills.io) skill that teaches an AI agent to
create, update and validate a
[`publiccode.yml`](https://publiccodeyml.github.io) file for any
repository, following the latest released version of the Standard.

## Layout

- `SKILL.md`: the skill itself: workflow, mandatory keys, enum rules,
  deprecation table and file conventions.
- `reference/`: the Standard's schema and controlled vocabularies,
  **copied from `docs/standard/`** with `scripts/sync-reference.sh`.
  The source of truth is `docs/standard/`; run the sync script whenever the
  Standard changes so the skill never drifts from the release it ships in.
- `reference/validation.md`: how to validate a `publiccode.yml` with the
  official tooling (libpubliccode, GitHub Action, GitLab CI, editor
  integration, web editor).

## Using the skill

Point any agent that supports Agent Skills at this directory, use for example `npx skills`:

```bash
npx skills add https://github.com/publiccodeyml/publiccode.yml/tree/main/skills/generate-publiccode-yml
```

Or copy/symlink the directory into your agent's skills folder.

## Versioning

The skill tracks the released Standard living in this repository: it is
pinned to the version shipped in its own checkout. Update
`publiccodeYmlVersion` guidance in `SKILL.md` when a new major version line
of the Standard is released.

## License

CC0-1.0, same as the Standard itself.
