``publiccode.yml``
==================

``publiccode.yml`` est un standard de métadonnées pour les référentiels contenant des logiciels
développés ou acquis par l’administration publique dans le but de faciliter leur
recherche et donc réutilisable par d'autres entités.

En incluant un fichier ``publiccode.yml`` à la racine d'un repository, et
en le populant avec des informations à propos du logiciel, les techniciens
et les fonctionnaires peuvent l'évaluer. Les outils d'indexation automatique peuvent
aussi être créés, puisque ce format est facilement lisible par à la fois des humains 
et des robots.

``publiccode.yml`` est obligatoire pour tous les logiciels publiques développés en Italie,
d'après les `guidelines
<https://docs.italia.it/AgID/linee-guida-riuso-software/lg-acquisizione-e-riuso-software-per-pa-docs/>`__:
this enables the Developers Italia crawler to build the national `software
catalog <https://developers.italia.it/>`__ nationales. Le standard est fait pour 
être interopérable internationalement, par conséquence les clés spécfiques aux pays 
sont séparées par la partie centrale et définis dans des sections spécifiques que 
chaque gouvernement peut diriger.

Les détails apportés par un fichier ``publiccode.yml`` inclus : 

- titre et description du projet ou produit (dans un ou plusieurs languages);
- l'état du développement, par exemple : ``concept``, ``development``, ``beta``, ``stable``, ``obsolete``;
- les conctacts de l'entité qui publie la codebase;
- les contacts des mainteneurs, si il y en a, incluant la date d'expiration du contrat de maintenance;
- des informations à propos du context légal pour lequel le projet ou le produit a été créé;
- les dépendances
  
et bien plus encore.

Voir aussi
----------

- `Plus d'informations à propos de la réutilisation d'un logiciel <https://developers.italia.it/en/reuse>`__
- `publiccode.yml éditeur web
  <https://publiccode-editor.developers.italia.it/>`__

Table du contenu
-----------------

.. toctree:: 
   :maxdepth: 2
   :numbered:

   schema.core.rst
   country.rst
   forks.rst
   categories-list.rst
   scope-list.rst
   example.rst
