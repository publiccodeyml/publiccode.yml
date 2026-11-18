.. _dependency-type:

Dependency
**********

Properties:

-  ``name`` *(required)*, :ref:`string <string-type>`: The name of the
   dependency (e.g. MySQL, NFC Reader).
-  ``versionMin``, :ref:`string <string-type>`: The oldest compatible
   version.
-  ``versionMax``, :ref:`string <string-type>`: The newest compatible
   version.
-  ``version``, :ref:`string <string-type>`: The only compatible major
   version, including the patches and bugfixes released for it later.
   It MUST NOT be present together with ``versionMin`` or
   ``versionMax``.
-  ``optional``, :ref:`boolean <boolean-type>`: If ``true``, the
   software also works without the dependency. Defaults to ``false``.

Complex versioning
~~~~~~~~~~~~~~~~~~

The version keys combine to describe a compatibility range.

.. code-block:: yaml
   :caption: Example 1

   - name: PostgreSQL
     version: "16"
     optional: true

This snippet marks an optional dependency on PostgreSQL 16, with any
of its patch releases.

.. code-block:: yaml
   :caption: Example 2

   - name: MySQL
     versionMin: "8.0"
     versionMax: "8.4"

This snippet marks a required dependency on MySQL, allowing any version
between 8.0 and 8.4.
