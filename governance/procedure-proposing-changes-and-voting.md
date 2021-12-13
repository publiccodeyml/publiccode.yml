# Proposing changes

Everyone can propose changes to the Standard ([`/docs/en/`](/docs/en/)) or organization of the
Working Group ([`/governance/`](/governance/)).  Every other part of the repo, including
translations of the Standard, are not normative and don't undergo this procedure.

Proposals and high level ideas can be discussed in [GitHub
Discussions](https://github.com/publiccodeyml/publiccode.yml/discussions) (or [GitHub
Issues](https://github.com/publiccodeyml/publiccode.yml/issues) if you think the proposal is
straightforward) but are only officially considered once a Pull Request is submitted as [a Pull
Request directly on the GitHub repository](https://github.com/publiccodeyml/publiccode.yml/pulls).

The participation in the discussion is encouraged and is free and open to everyone, as is the
submission of Standard-changing Pull Requests.

The [Maintainers](https://github.com/orgs/publiccodeyml/teams/steering-committee) are responsible
for labelling any change depending on their nature according to the [Semantic
Versioning](https://semver.org/), or in other words:

* [**`standard-fix`**](https://github.com/publiccodeyml/publiccode.yml/labels/standard-fix): for all
  changes that don't break any compatibility, warrants a new patch version
* [**`standard-backward-compatible`**](https://github.com/publiccodeyml/publiccode.yml/labels/standard-backward-compatible),
[**`standard-deprecation`**](https://github.com/publiccodeyml/publiccode.yml/labels/standard-deprecation):
  for all changes that are retrocompatibile, warrants a new minor version
* [**`standard-breaking-change`**](https://github.com/publiccodeyml/publiccode.yml/labels/standard-breaking-change):
  for all changes that break retro-compatibility, warrants a new major version.
  Breaking changes can be released at most once every two years, provided the current
  version of the Standard has been deprecating the relevant feature for at least 6 months.
  
## Voting

To ensure the Standard always keeps aligned to the needs of public administrations, we encourage
participation from everyone but restrict the voting to public servants, for this reason voting is
only open to members of the [Steering Committee](charter.md#steering-commitee-publiccodeymlsteering-committee),
typically one per country.

[The Chair](charter.md#roles-and-duties)  of the Steering committee is responsible for holding a
regular vote, which happens as deemed necessary. Once the voting starts, it stays open for a week.

Voting happens on formal proposals opened as Pull Requests through expressing a clear intention to
*approve*, *reject*, or *abstain*.  This can be done by either using GitHub's code review feature,
or as a simple comment to the Pull Request.  Only *approve* or *reject* votes are used to determine
the results.

Proposals require unanimity to pass, but when that doesn't happen, proposals with at least 50%
*approve* votes get discussed for an additional period of minimum of 90 days, after which they are
put again to vote. In this second round, the change only needs 75% *approve* votes in order to be
considered accepted.

### Country-specific sections

Changes to country-specific sections (top level keys named after [ISO 3166-1 alpha-2
codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) and their children) always require the
*approval* of the Steering Committee member representing the corresponding country and 50% *approve*
votes.

Besides that, they must follow the format used in the rest of the Standard, in particular:
* key names must be lowerCamelCase
* key names must use only uppercase or lowercase ASCII letters
* use English for keys and values, when possible
* must not mimic or duplicate other existing top level keys

In practice, we expect members of other countries to abstain unless there's a good reason not to do
so.

### Results of the vote and implementation of the changes

After a week from the vote has passed, the Chair formally announces the results.

The Maintainers act accordingly to reflect the changes on GitHub and proceed to queue the changes in
the next release cycle.

# Releasing

Changes are batched and released at most monthly if there are approved proposal in the queue.

# Calls and meetings

No calls and meetings are scheduled. If the need arises for a community call, a technical call, or a
meeting of the Steering Committee, an [announcement will be made in this
category](https://github.com/publiccodeyml/publiccode.yml/discussions/categories/announcements).
Make sure you watch it, so you don't miss any notifications!
