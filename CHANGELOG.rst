Changelog
=========

All notable changes to this project will be documented in this file.

[core-0.2.1] - 2019-10-10
-------------------------

Changed
~~~~~~~

-  Mandates phone numbers to be strings

[core-0.2/it-0.2] - 2019-03-13
------------------------------

Added
~~~~~

-  A new ``piattaforme`` section has been created to group the platforms
   inside of it.

Changed
~~~~~~~

-  The ``conforme/accessibile`` key becomes
   ``conforme/lineeGuidaDesign`` since it is more self-explanatory.
-  The ``conforme/interoperabile`` key becomes
   ``conforme/modelloInteroperabilita`` since it is more
   self-explanatory.
-  The ``conforme/sicuro`` key becomes
   ``conforme/misureMinimeSicurezza`` since before it was rather vague
   and incomplete.
-  The ``conforme/privacy`` key becomes ``conforme/gdpr`` since the
   ``privacy`` term is quite vague and incomplete.

Removed
~~~~~~~

-  The ``ecosistemi`` key has been removed since its values are already
   present in the ``intendedAudience/scope`` key.
-  The ``designKit`` section has been removed since we will track the
   design kits usages by means of the crawler.

[core-0.2] - 2019-03-11
-----------------------

.. _added-1:

Added
~~~~~

-  A new ``countryExtensionVersion`` key was added under each
   country-specific extension, in order to separate their versioning
   from the core.
-  The ``standalone`` value for the ``softwareType`` key was deprecated
   in favor of more specific values: ``standalone/mobile``,
   ``standalone/iot``, ``standalone/desktop``, ``standalone/web``,
   ``standalone/backend``, ``standalone/other``

.. _changed-1:

Changed
~~~~~~~

-  ``intendedAudience/onlyFor`` was renamed to
   ``intendedAudience/scope`` (with a different dictionary of values).
-  ``tags`` was replaced by ``categories`` (with a different dictionary
   of values).
-  BCP47 is now used for languages instead of ISO 639-2, thus keys under
   ``description`` will now look like ``en`` instead of ``eng``
-  ``publiccode-yaml-version`` was moved to ``publiccodeYmlVersion``
   using camelCase
-  ``maintenance/contacts`` is now mandatory only if
   ``maintenance/type`` is ``internal`` or ``community``.
-  All files ported to RST from previous MD

.. _removed-1:

Removed
~~~~~~~

-  The ``freeTags`` key was removed.

[core-0.1] - 2019-01-25
-----------------------

.. _added-2:

Added
~~~~~

-  Files for first release

The format is based on `Keep a
Changelog <https://keepachangelog.com/en/1.0.0/>`__, and this project
adheres to `Semantic
Versioning <https://semver.org/spec/v2.0.0.html>`__.
