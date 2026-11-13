.. _`country-extension`:

Extensions spécifiques à un pays (*dépréciées*)
===============================================

Les sections spécifiques à un pays sont dépréciées et seront supprimées dans
publiccode.yml 1.0. Les cas d'usage qu'elles couvraient s'expriment désormais
avec des clés génériques : déclarez la conformité aux réglementations
nationales ou l'intégration avec des plateformes nationales avec la clé
``supports``, et indiquez l'administration qui publie le logiciel avec la clé
``organisation``.

Les sections spécifiques à un pays permettent d'inclure des informations
pertinentes uniquement dans un pays donné, comme la conformité aux
réglementations nationales ou l'intégration avec des plateformes nationales.

Chaque section est identifiée par un code pays de deux lettres minuscules
(*déprécié*) ou majuscules selon la norme `ISO 3166-1 alpha-2
<https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`__.

Actuellement, la seule section spécifique à un pays définie est la section
italienne (``IT:``).

.. include:: schema.it.rst
