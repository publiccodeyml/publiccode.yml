# `publiccode.yml` - Forks and variants

This document describes how to best handle software forks in the
context of updating `publiccode.yml`. We define two different
semantics that require different handling: technical forks and
software variants.

## Technical forks

A technical fork is a fork made by a developer for the purpose
of working on the code base (called *upstream*), without any
explicit goal of creating and publishing an alternative variant
of the original software.

In the context of distributed control systems and collaborative
code hosting platforms like GitHub, forking is almost always used
by developers as a step to work on a contribution on an existing
codebase.

Because of the way forking works on GitHub and other platforms,
developers publish their forks as perfect copies of the original
software, thus including also `publiccode.yml`. However, parsers
need to be able to distinguish such technical forks from the
original codebase.

### Parsers

Parsers **SHOULD** identify a technical fork by noticing that the
top-level `url` key does not point to the repository in which the
`publiccode.yml` is found.

Parsers **MIGHT** identify a technical fork also through metadata
that might be exposed by the code hosting platform (eg: GitHub
marks forks explicitly as forks)

### Authors

Authors of technical forks **SHOULD NOT** modify `publiccode.yml`
in any way. Specifically, they **MUST NOT** modify the top-level
`url` key that **MUST** continue pointing to the upstream repository.

There is no explicit key to mark a fork as a technical fork. This
is a conscious design decision because we do not want authors of
technical forks to be aware of `publiccode.yml` and necessarily be
aware of how to modify it. The current design does not require
authors to do anything.


## Software variants

A software variant is a fork that is offered as an alternative to
the original upstream software.

It contains modifications that are still not part of the upstream version,
like more features, different dependencies, optimizations, etc.

By marking a fork as a variant, the author indicates that they believe
that the variant includes a complete and working set of modifications
that might be useful to other people.

Marking a fork as a variant does **not** relate to the willingness of
contributing upstream; the author might still plan to contribute the
modifications upstream, or even being in the process of doing so.
Thus, even if the fork will eventually be merged upstream, it might
make sense to mark it as a variant during the process, so that others
might discover it and benefit from the .

### Parsers

Parsers **SHOULD** identify a variant by noticing that the top-level
`url` key matches to the repository in which the `publiccode.yml`
is found, **AND** a top-level `upstreamUrl` exists and points to
a different repository.

Parsers should expect and analyze other differences in `publiccode.yml`
between variants of the software. Specifically `description/features`
is designed to be compared across variants to identify and show
user-visible differences.


### Authors

Authors that are willing to publish a fork as a variant **MUST**
at least:

* Add a key `upstreamUrl` pointing to one or more upstream
  repositories from which this variant is derived.
* Change the value for `url` to point to the repository
  holding the variant.
* Change the value for `legal/repoOwner` to refer to the
  themselves (the authors of the variant).
* Revisit the `maintenance` section to refer to the maintenance
  status of the variant.

Moreover, authors **SHOULD** evaluate the following changes:

* Add the features that differentiate the variant to the
  `description/features` key. Existing features **SHOULD NOT**
  be edited or removed from this list unless they have been
  removed from the variant, to allow parsers to easily compare
  feature lists.
