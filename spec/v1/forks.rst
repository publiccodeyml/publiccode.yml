.. _forks:

Forks
=====

When you fork a repository, you also copy its ``publiccode.yml``.
Update the file according to how you plan to use the fork.

Forking to contribute
---------------------

If you fork to contribute changes to the original project, you
SHOULD leave ``publiccode.yml`` unchanged. You MUST leave
:ref:`url <url>` pointing to the original repository. Catalogs use
this URL to recognize the copy and avoid a duplicate listing.

Forking to publish your own version
-----------------------------------

If you publish a working version of your fork for others to use,
you MUST update ``publiccode.yml`` to describe it:

-  Point :ref:`url <url>` to the repository of the fork.
-  Add :ref:`isBasedOn <is-based-on>` with the ``url`` of the
   software it was forked from.
-  Replace :ref:`organisation <organisation>`, both ``uri`` and
   ``name``, with the organisation publishing the fork, or remove the
   section.
-  Use :ref:`maintenance <maintenance>` to describe who maintains
   the fork and how.

You SHOULD add the fork's features to
:ref:`description/[lang]/features <features>`. Existing features SHOULD
NOT be edited or removed unless they have been removed from the fork.
Parsers SHOULD expect and analyze metadata differences between forks,
including comparing feature lists to show their user visible differences.

.. tip::

   You can publish a usable fork while contributing its changes
   back to the original project.

How parsers tell forks apart
----------------------------

Parsers SHOULD compare :ref:`url <url>` with the repository where
they found the file and check for :ref:`isBasedOn <is-based-on>`:

.. list-table::
   :header-rows: 1

   * - ``url`` points to
     - ``isBasedOn``
     - The repository holds
   * - this repository
     - absent
     - the original software
   * - this repository
     - present
     - a fork published as software of its own
   * - another repository
     - present or absent
     - a copy of that repository, such as a fork made to contribute:
       parsers SHOULD NOT list it as separate software

Parsers MAY also use the fork information exposed by the code hosting
platform (e.g. GitHub marks forks explicitly as forks).
