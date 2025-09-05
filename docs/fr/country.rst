.. _`country-extension`:

Extensions spcécifiques à un pays
Country-Specific Extensions
===========================

Bien que la norme soit structurée pour avoir un sens sur le plan international, 
on peut ajouter des informations supplémentaires qui ont une utilité dans 
certains pays, comme la déclaration de conformité aux lois ou règlements. 
Le mécanisme d'extension fourni est l'utilisation de sections spécifiques 
à chaque pays.

Toutes les extensions spécifiques à un pays sont contenues dans une section
nommée avec deux lettres minuscules (*deprecated*) ou majuscules `ISO 3166-1 alpha-2 country
code <https://it.wikipedia.org/wiki/ISO_3166-1_alpha-2>`__. Pour le moment 
``spid`` est une propriété pour un logiciel Italien  indiquant  si le logiciel
est intégré au système italien d'identification publique.

Si un logiciel est conforme, je trouverai :

.. code:: yaml

   it:
     countryExtensionVersion: "0.2"
     piattaforme:
      - spid: yes


Notez que les extensions spécifiques à un pays avec des sections 
internationales ne sont pas autorisées. Les pays qui souhaitent 
étendre le format devrait ajouter une section spécifique au pays 
à la place.

.. include:: schema.it.rst
