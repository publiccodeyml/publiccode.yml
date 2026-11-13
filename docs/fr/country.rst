.. _`country-extension`:

Extensions spécifiques à un pays (*dépréciées*)
===============================================

Les sections spécifiques à un pays sont dépréciées et seront supprimées dans
publiccode.yml 1.0. Les cas d'usage qu'elles couvraient s'expriment désormais
avec des clés génériques : déclarez la conformité aux réglementations
nationales ou l'intégration avec des plateformes nationales avec la clé
``supports``, et indiquez l'administration qui publie le logiciel avec la clé
``organisation``.

Bien que la norme soit structurée pour avoir un sens sur le plan international, 
on peut ajouter des informations supplémentaires qui ont une utilité dans 
certains pays, comme la déclaration de conformité aux lois ou règlements. 
Le mécanisme d'extension fourni est l'utilisation de sections spécifiques 
à chaque pays.

Toutes les extensions spécifiques à un pays sont contenues dans une section
nommée avec deux lettres minuscules (*obsolète*) ou majuscules `ISO 3166-1 alpha-2 country
code <https://it.wikipedia.org/wiki/ISO_3166-1_alpha-2>`__. Pour le moment 
``spid`` est une propriété pour un logiciel Italien  indiquant  si le logiciel
est intégré au système italien d'identification publique.

Si un logiciel est conforme, je trouverai :

.. code:: yaml

   IT:
     countryExtensionVersion: "1.0"
     piattaforme:
      - spid: yes


Notez que les extensions spécifiques à un pays avec des sections 
internationales ne sont pas autorisées. Les pays qui souhaitent 
étendre le format devrait ajouter une section spécifique au pays 
à la place.

.. include:: schema.it.rst
