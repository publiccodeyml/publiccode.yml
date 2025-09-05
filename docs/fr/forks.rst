.. _forks-and-variants:

Forks et variantes
==================


Comme déjà mentionné précédemment, un fork peut avoir deux formes 
différentes basées sur l'objectif. En tant que tel, afin de bien comprendre
comment gérer les `publiccode.yml` dans les deux cas, nous définissons ci-dessous deux
sémantique: forks techniques et variantes logicielles.

Forks techniques (par exemple pour publier des patchs)
-----------------------------------------

Un fork technique est un fork fait par un développeur dans le but de:
travailler sur la base de code d'origine ou envoyer des améliorations aux
auteurs originaux, sans objectif explicite de création et de publication
une variante alternative du logiciel d'origine.

Dans le contexte des systèmes de contrôle distribués et plates-formes d’hébergement 
du code collaboratif comme GitHub, le forking est presque toujours utilisé par
les développeurs comme une étape pour travailler sur une contribution sur une base de code existante,
en envoyant des "pull-request".

En raison de la façon dont le fork fonctionne sur GitHub et d’autres plateformes,
les développeurs publient leurs forks comme des copies parfaites de l'original
logiciel, incluant donc aussi ``publiccode.yml``. Cependant, les analyseurs ont besoin
d'être capables de distinguer ces forks techniques de la code base originale.

Parsers
~~~~~~~

Parsers **SHOULD** identify a technical fork by noticing that the
top-level ``url`` key does not point to the repository in which the
``publiccode.yml`` is found.

Parsers **MIGHT** identify a technical fork also through metadata that
might be exposed by the code hosting platform (eg: GitHub marks forks
explicitly as forks)

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

Marking a fork as a variant does **not** relate to the willingness of
contributing upstream; the author might still plan to contribute the
modifications upstream, or even being in the process of doing so. Thus,
even if the fork will eventually be merged upstream, it might make sense
to mark it as a variant during the process, so that others might
discover it and benefit from it.

.. _parsers-1:

Parsers
~~~~~~~

Parsers **SHOULD** identify a variant by noticing that the top-level
``url`` key matches to the repository in which the ``publiccode.yml`` is
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

-  add a key ``isBasedOn`` pointing to one or more upstream repositories
   from which this variant is derived.
-  Change the value for ``url`` to point to the repository holding the
   variant.
-  Change the value for ``legal/repoOwner`` to refer to themselves
   (the authors of the variant).
-  Revisit the ``maintenance`` section to refer to the maintenance
   status of the variant.

Moreover, authors **SHOULD** evaluate the following changes:

-  add the features that differentiate the variant to the
   ``description/features`` key. Existing features **SHOULD NOT** be
   edited or removed from this list unless they have been removed from
   the variant, to allow parsers to easily compare feature lists.
