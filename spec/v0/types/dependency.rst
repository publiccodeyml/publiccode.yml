.. _dependency-type:

Dependency
**********

A Dependency is a mapping with the following keys:

-  ``name`` - **mandatory** - The name of the dependency (e.g. Oracle
   Database, NFC Reader)
-  ``versionMin`` - the first compatible version
-  ``versionMax`` - the latest compatible version
-  ``version`` - the only major version for which the software is
   compatible. It assumes compatibility with all patches and bugfixes
   later applied to this version.
-  ``optional`` - whether the dependency is optional or mandatory

Complex versioning
~~~~~~~~~~~~~~~~~~

It is of course possible to use the various keys to specify a complex
compatibility matrix.

*Ex. 1*

.. code:: yaml

   dependsOn:
     proprietary:
       - name: Oracle Database
         version: "19"
         optional: true

This snippet marks an optional proprietary dependency on Oracle
Database 19, with any of its patch releases.

*Ex. 2*

.. code:: yaml

   dependsOn:
     proprietary:
       - name: Microsoft SQL Server
         versionMin: "2019"
         versionMax: "2022"

This snippet marks a mandatory proprietary dependency on Microsoft SQL
Server, allowing any version between 2019 and 2022.
