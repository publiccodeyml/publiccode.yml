``publiccode.yml``
==================

``publiccode.yml`` is a metadata standard for repositories containing software
developed or acquired by the Public Administration, aimed at making them easily
discoverable and thus reusable by other entities.

By including a ``publiccode.yml`` file in the root of a repository, and
populating it with information about the software, technicians and civil
servants can evaluate it.

The format is easily readable by both humans and machines, and
automatic indexing tools are built on top of it: national software
catalogs crawl the published files and build searchable sites.
Catalogs federate across countries, since they all read the same
format. The `core tools
<https://github.com/publiccodeyml/publiccode.yml#core-tools>`__
provide the reference implementations to build on.

``publiccode.yml`` is mandatory for all public software developed in Italy,
according to the national `guidelines
<https://docs.italia.it/AgID/linee-guida-riuso-software/lg-acquisizione-e-riuso-software-per-pa-docs/>`__:
this enables the Developers Italia crawler to build the `national software
catalog <https://developers.italia.it/>`__. The standard is also used at
`opencode.de <https://opencode.de>`__, the German registry of open source for
public administration. ``publiccode.yml`` is designed to be
interoperable internationally, also through country-specific keys defined in
dedicated sections that each government can regulate.

Details carried by a ``publiccode.yml`` file include: 

- title and description of the project or product (in one or more languages); 
- development state (e.g., ``concept``, ``development``, ``beta``, ``stable``, ``obsolete``; 
- contacts of the entity who published the codebase; 
- contacts of the maintainer, if any, including the expire date of the maintenance contract; 
- information about the legal context for which the project or product was designed; 
- dependencies
  
and much more.

See also
----------

- `More information about software reuse <https://developers.italia.it/en/reuse>`__
- `publiccode.yml web editor
  <https://publiccode-editor.developers.italia.it/>`__

Table of contents
-----------------

.. toctree:: 
   :maxdepth: 2

   schema.core.rst
   country.rst
   forks.rst
   categories-list.rst
   scope-list.rst
   aliases-list.rst
   example.rst
