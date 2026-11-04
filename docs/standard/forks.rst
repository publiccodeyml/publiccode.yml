.. _forks-and-variants:

Forks and variants
==================

A fork may have two different forms based on its final aim. As such, in order to make it clear how to handle the
``publiccode.yml`` in both cases, below we define two different
semantics: technical forks and software variants.

Technical forks (i.e. to publish patches)
-----------------------------------------

A technical fork is a fork made by a developer for the purpose of
working on the original code base or sending improvements to the
original authors, without any explicit goal of creating and publishing
an alternative variant of the original software.

In the context of distributed version control systems and collaborative code
hosting platforms like GitHub, forking is almost always used by
developers as a step to work on a contribution on an existing codebase,
by sending “pull requests”.

Because of the way forking works on GitHub and other platforms,
developers publish their forks as perfect copies of the original
software, thus including also ``publiccode.yml``. However, parsers need
to be able to distinguish such technical forks from the original
codebase.

Parsers
~~~~~~~

Parsers **SHOULD** identify a technical fork by noticing that the
top-level ``url`` key does not point to the repository in which the
``publiccode.yml`` is found, unless the repository is a mirror (see
`Mirrors`_). Parsers **SHOULD** follow redirects
before comparing, since a repository that was renamed or transferred on
its code hosting platform is still the same repository.

Parsers **MIGHT** identify a technical fork also through metadata that
might be exposed by the code hosting platform (e.g. GitHub marks forks
explicitly as forks).

Authors
~~~~~~~

Authors of technical forks **SHOULD NOT** modify ``publiccode.yml`` in
any way. Specifically, they **MUST NOT** modify the top-level ``url``
key that **MUST** continue pointing to the original repository.

There is no explicit key to mark a fork as a technical fork. This is a
conscious design decision because we do not want authors of technical
forks to be aware of ``publiccode.yml`` and necessarily be aware of how
to modify it. The current design does not require authors to do
anything.

Software variants
-----------------

A software variant is a fork that is offered as an alternative to the
original upstream software.

It contains modifications that are still not part of the upstream
version, like more features, different dependencies, optimizations, etc.

By marking a fork as a variant, the author indicates that they believe
that the variant includes a complete and working set of modifications
that might be useful to other people.

Marking a fork as a variant does **not** relate to the willingness to
contribute upstream; the author might still plan to contribute the
modifications upstream, or even be in the process of doing so. Thus,
even if the fork will eventually be merged upstream, it might make sense
to mark it as a variant during the process, so that others might
discover it and benefit from it.

.. _parsers-1:

Parsers
~~~~~~~

Parsers **SHOULD** identify a variant by noticing that the top-level
``url`` key matches the repository in which the ``publiccode.yml`` is
found, **AND** a top-level ``isBasedOn`` exists and points to a
different repository.

Parsers should expect and analyze other differences in
``publiccode.yml`` between variants of the software. Specifically
``description/features`` is designed to be compared across variants to
identify and show user-visible differences.

.. _authors-1:

Authors
~~~~~~~

Authors that are willing to publish a fork as a variant **MUST** at
least:

-  Add a key ``isBasedOn`` pointing to one or more upstream repositories
   from which this variant is derived.
-  Change the value for ``url`` to point to the repository holding the
   variant.
-  Change the value for ``legal/repoOwner`` to refer to themselves
   (the authors of the variant).
-  Revisit the ``maintenance`` section to refer to the maintenance
   status of the variant.

Moreover, authors **SHOULD** evaluate the following changes:

-  Add the features that differentiate the variant to the
   ``description/features`` key. Existing features **SHOULD NOT** be
   edited or removed from this list unless they have been removed from
   the variant, to allow parsers to easily compare feature lists.

Mirrors
-------

A mirror is a copy of the repository that the authors of the software
endorse. It contains the same ``publiccode.yml``, so its top-level
``url`` points to another repository, like a technical fork.

.. _parsers-2:

Parsers
~~~~~~~

Parsers **SHOULD** compare repository URLs after normalising them, for
example ignoring a trailing slash, a ``.git`` suffix, or differences in
case where the code hosting platform ignores them.

When the top-level ``url`` does not point to the repository in which the
``publiccode.yml`` is found, parsers **SHOULD** fetch the
``publiccode.yml`` at ``url``. If that file lists the repository under
``mirrors``, parsers **SHOULD** treat it as the same software rather than
as a technical fork. Parsers **MUST NOT** rely on ``mirrors`` found in
any other copy of the file.

A repository listed under ``mirrors`` is a mirror only if the
``publiccode.yml`` found there has its top-level ``url`` pointing to the
repository that lists it. Otherwise parsers **MUST NOT** treat the two
as the same software.

A mirror marked ``deprecated`` is the same software only if a parser
confirmed it under the rule above at some point while it was reachable,
whether before or after it was marked. Parsers **SHOULD** keep that
confirmation once the mirror disappears, so that references to it still
resolve, and **SHOULD** warn when a reference resolves through it.
Parsers **SHOULD NOT** offer what is found at a deprecated mirror as the
software's code.

A mirror whose ``publiccode.yml`` does not point back yet may still be
being set up, or may lag behind. Parsers **SHOULD** keep existing entries
unchanged meanwhile and check again on later crawls. How long to wait
before reporting a conflict, and when to intervene by hand, is up to each
catalog.

If fetching either ``publiccode.yml`` fails, parsers **SHOULD** keep the
last known result and check again later, rather than treating the
failure as a change. A repository never confirmed as a mirror is treated
as a technical fork, as today.

Checking this key means fetching URLs taken from a ``publiccode.yml``.
Parsers **SHOULD** apply the same restrictions as for any other URL they
fetch, such as HTTPS only, no private network addresses and a limited
number of redirects, and **MAY** check only the first entries.

.. _authors-2:

Authors
~~~~~~~

Authors **MAY** list the mirrors they endorse under ``mirrors``, most
preferred first and deprecated entries last, since parsers may check
only the first entries. They **MUST** remove a mirror whose location is
no longer under their control, or whose operator they no longer trust,
because whoever controls that location could otherwise present it as an
endorsed mirror.

If development happens on an instance that parsers cannot reach, ``url``
points to the public repository, and the internal instance is not listed
under ``mirrors``.
