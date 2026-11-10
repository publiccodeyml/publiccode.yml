# Validating a publiccode.yml

The reference implementation is
[libpubliccode](https://github.com/publiccodeyml/libpubliccode). Any
validation path below uses it (or its schema) under the hood. Prefer the
path that matches the user's environment.

## GitHub Action (CI)

Add a workflow to the user's repository:

```yaml
name: Validate publiccode.yml
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: publiccodeyml/publiccode-parser-action@main
```

## GitLab CI

Use the component documented at
[publiccodeyml/publiccode-parser-gitlab-ci](https://github.com/publiccodeyml/publiccode-parser-gitlab-ci).

## Locally, with don-checker (recommended)

No toolchain needed — just Node for npx:

```bash
npx @developer-overheid-nl/don-checker@1.4.0 validate --standard publiccode --input ./publiccode.yml
```

don-checker detects the `publiccode.yml` format by **filename**, so validate
a file actually named `publiccode.yml`. It picks the newest ruleset it
ships (pin with `--version`).

## Cross-check, with the publiccode-parser CLI


```bash
go install github.com/publiccodeyml/libpubliccode/v5/publiccode-parser@latest

publiccode-parser --no-network path/to/publiccode.yml
```

Flags come **before** the file argument. The validator also checks whether
URLs exist and locally referenced files (logo, screenshots) are present;
use `--no-network` when offline or when the repository is not yet public,
and `--no-external-checks` to skip local file checks as well. Precompiled
binaries are on the [releases page](https://github.com/publiccodeyml/libpubliccode/releases/latest)
— no Go toolchain needed.

---

## Known quirks

- libpubliccode v5.5.1 reports `features must contain more than 0 items`
  even when `description.[lang].features` is **absent**, although the
  Standard marks the key optional. Work around it by listing a few real
  features (5 or fewer meaningful ones is plenty) — this also improves how
  the software shows up in catalogs.

Errors must be fixed before considering the task done. Report warnings to
the user instead of silently ignoring them; most warnings hint at drifted
or deprecated keys.
