``publiccode.yml``
==================

``publiccode.yml`` est un standard de métadonnées pour les référentiels contenant des logiciels
développés ou acquis par l’administration publique dans le but de faciliter leur
recherche et donc réutilisable par d'autres entités.

En incluant un fichier ``publiccode.yml`` à la racine d'un repository, et
en le populant avec des informations à propos du logiciel, les techniciens
et les fonctionnaires peuvent l'évaluer.

Le format est facilement lisible à la fois par les humains et par les machines,
et des outils d'indexation automatique s'appuient sur lui : les catalogues
nationaux de logiciels collectent les fichiers publiés et construisent des sites
de recherche. Les catalogues se fédèrent entre pays, puisqu'ils lisent tous le
même format. Les `outils de base
<https://github.com/publiccodeyml/publiccode.yml#core-tools>`__ fournissent les
implémentations de référence sur lesquelles s'appuyer.

``publiccode.yml`` est obligatoire pour tous les logiciels publics développés en
Italie, d'après les `lignes directrices nationales
<https://docs.italia.it/AgID/linee-guida-riuso-software/lg-acquisizione-e-riuso-software-per-pa-docs/>`__ :
cela permet au crawler de Developers Italia de construire le `catalogue national
des logiciels <https://developers.italia.it/>`__. Le standard est aussi utilisé
par `opencode.de <https://opencode.de>`__, le registre allemand des logiciels
open source pour l'administration publique. ``publiccode.yml`` est conçu pour
être interopérable à l'international.

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
   aliases-list.rst
   example.rst
