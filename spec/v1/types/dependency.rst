.. _dependency-type:

Dependency
**********

Software or hardware the software needs at runtime, installed and
maintained separately, such as a proprietary database or an NFC
reader.

Properties:

-  ``name`` *(required)*, :ref:`string <string-type>`: The name of the
   dependency (e.g. Oracle Database, NFC Reader).
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

   dependsOn:
     proprietary:
       - name: Oracle Database
         version: "19"
         optional: true

This snippet marks an optional proprietary dependency on Oracle
Database 19, with any of its patch releases.

.. code-block:: yaml
   :caption: Example 2

   dependsOn:
     proprietary:
       - name: Microsoft SQL Server
         versionMin: "2019"
         versionMax: "2022"

This snippet marks a required proprietary dependency on Microsoft SQL
Server, allowing any version between 2019 and 2022.
