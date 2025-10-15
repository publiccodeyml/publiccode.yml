Changelog
=========

All notable changes to this project will be documented in this file.

v0.5.0
------

Added
~~~~~

* doc(standard): make categories optional and add `other` by @bfabio in https://github.com/publiccodeyml/publiccode.yml/pull/241
* Add organisation by @bfabio in https://github.com/publiccodeyml/publiccode.yml/pull/229
* Add the "fundedBy" key by @bfabio in https://github.com/publiccodeyml/publiccode.yml/pull/220

Changed
~~~~~~~

* Clarify presence rules for `contractors` and `contacts` by @bfabio in https://github.com/publiccodeyml/publiccode.yml/pull/213
* Use pure ISO 3166-1 alpha-2 and deprecate lowercase ISO 3166-1 alpha-2 by @bfabio in https://github.com/publiccodeyml/publiccode.yml/pull/227
* Deprecate it.conforme.* keys by @bfabio in https://github.com/publiccodeyml/publiccode.yml/pull/223
* Deprecate legal/repoOwner by @bfabio in https://github.com/publiccodeyml/publiccode.yml/pull/229
* Deprecate it/riuso/codiceIPA by @bfabio in https://github.com/publiccodeyml/publiccode.yml/pull/229

**Full Changelog**: https://github.com/publiccodeyml/publiccode.yml/compare/v0.4.0...v0.5.0

v0.4.0
------

Added
~~~~~

- add regulations-and-directives category by @bfabio in https://github.com/publiccodeyml/publiccode.yml/pull/186
- Add category: integrated-library-system by @nichtich in https://github.com/publiccodeyml/publiccode.yml/pull/160
- Add design and design-system categories by @libremente in https://github.com/publiccodeyml/publiccode.yml/pull/183

Changed
~~~~~~~

- deprecate AUTHORS key by @bfabio in https://github.com/publiccodeyml/publiccode.yml/pull/185
- Make "releaseDate" key an optional key by @tomootes in https://github.com/publiccodeyml/publiccode.yml/pull/180

**Full Changelog**: https://github.com/publiccodeyml/publiccode.yml/compare/v0.3.0...v0.4.0

v0.3.0
------

Added
~~~~~

- Add IO key to it.piattaforme by @mspasiano in https://github.com/publiccodeyml/publiccode.yml/pull/139
- Add Whistleblowing to the software categories list by @evilaliv3 in https://github.com/publiccodeyml/publiccode.yml/pull/97
- add educational-content category by @Animtim in https://github.com/publiccodeyml/publiccode.yml/pull/88

Changed
~~~~~~~

- change the minimum length of longDescription by @bfabio in https://github.com/publiccodeyml/publiccode.yml/pull/149
- remove the characters limit for features by @bfabio in https://github.com/publiccodeyml/publiccode.yml/pull/148
- deprecate inputTypes and outputTypes by @bfabio in https://github.com/publiccodeyml/publiccode.yml/pull/147
- make genericName optional and deprecate it by @bfabio in https://github.com/publiccodeyml/publiccode.yml/pull/146
- deprecate monochromeLogo by @bfabio in https://github.com/publiccodeyml/publiccode.yml/pull/144
- specify YAML 1.2 as the file format by @bfabio in https://github.com/publiccodeyml/publiccode.yml/pull/141

**Full Changelog**: https://github.com/publiccodeyml/publiccode.yml/compare/core-0.2.1...v0.3.0

[core-0.2.2] - 2019-12-13
-------------------------

Changed
~~~~~~~

-  Mandates UTF-8 as the encoding used.

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
