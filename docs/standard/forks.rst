.. _forks-and-variants:

Forks and variants
==================

A fork serves one of two purposes, and ``publiccode.yml`` handles
each differently: technical forks and software variants.

Technical forks (i.e. to publish patches)
-----------------------------------------

A technical fork is made to work on the original code base or to send
improvements to its authors, with no goal of publishing an alternative
version of the software. On code hosting platforms like GitHub,
forking is almost always the first step of a contribution sent as a
pull request.

These platforms publish a fork as an exact copy of the original
repository, ``publiccode.yml`` included, so parsers need a way to tell
a technical fork from the original codebase.

Parsers
~~~~~~~

Parsers **SHOULD** identify a technical fork by noticing that the
top-level :ref:`url <url>` key does not point to the repository in which the
``publiccode.yml`` is found.

Parsers **MAY** also identify a technical fork through metadata
exposed by the code hosting platform (e.g. GitHub marks forks
explicitly as forks).

Authors
~~~~~~~

Authors of technical forks **SHOULD NOT** modify ``publiccode.yml`` in
any way. Specifically, they **MUST NOT** modify the top-level :ref:`url <url>`
key that **MUST** continue pointing to the original repository.

No key marks a fork as technical, by design: authors of technical
forks do not need to know ``publiccode.yml`` or how to edit it, and
nothing is asked of them.

Software variants
-----------------

A software variant is a fork that is offered as an alternative to the
original upstream software.

It contains modifications not yet part of the upstream version, like
more features, different dependencies or optimizations.

By marking a fork as a variant, the author states that it holds a
complete and working set of modifications that other people might
find useful.

Marking a fork as a variant says nothing about contributing upstream:
the author might still plan to, or be doing it already. Even a fork
that will eventually be merged upstream can be marked as a variant
meanwhile, so that others can find it and use it.

.. _parsers-1:

Parsers
~~~~~~~

Parsers **SHOULD** identify a variant by noticing that the top-level
:ref:`url <url>` key matches the repository in which the ``publiccode.yml`` is
found, **AND** a top-level :ref:`isBasedOn <is-based-on>` exists and points to a
different repository.

Parsers should expect and analyze other differences in
``publiccode.yml`` between variants of the software. In particular,
``description/[lang]/features`` is designed to be compared across
variants to show their user-visible differences.

.. _authors-1:

Authors
~~~~~~~

Authors who publish a fork as a variant **MUST** at least:

-  Add a key :ref:`isBasedOn <is-based-on>` pointing to one or more
   upstream repositories from which this variant is derived.
-  Change the value for :ref:`url <url>` to point to the repository
   holding the variant.
-  Change the value for :ref:`organisation/name <organisation-name>`
   to refer to themselves (the authors of the variant).
-  Revisit the :ref:`maintenance <maintenance>` section to refer to
   the maintenance status of the variant.

Moreover, authors **SHOULD** evaluate the following changes:

-  Add the features that differentiate the variant to the
   ``description/[lang]/features`` key. Existing features **SHOULD NOT** be
   edited or removed from this list unless they have been removed from
   the variant, to allow parsers to easily compare feature lists.
