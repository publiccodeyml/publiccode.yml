.. _forks-and-variants:

Forks et variantes
==================


Comme déjà mentionné précédemment, un fork peut avoir deux formes 
différentes basées sur l'objectif. En tant que tel, afin de bien comprendre
comment gérer les `publiccode.yml` dans les deux cas, nous définissons ci-dessous deux
sémantique: forks techniques et variantes logicielles.

Forks techniques (par exemple pour publier des patchs)
------------------------------------------------------

Un fork technique est un fork fait par un développeur dans le but de:
travailler sur la base de code d'origine ou envoyer des améliorations aux
auteurs originaux, sans objectif explicite de création et de publication
une variante alternative du logiciel d'origine.

Dans le contexte des systèmes de contrôle distribués et plates-formes d’hébergement 
du code collaboratif comme GitHub, le forking est presque toujours utilisé par
les développeurs comme une étape pour travailler sur une contribution sur une base de code existante,
en envoyant des "pull-request".

En raison de la façon dont le fork fonctionne sur GitHub et d’autres plateformes,
les développeurs publient leurs forks comme des copies parfaites de l'original
logiciel, incluant donc aussi ``publiccode.yml``. Cependant, les analyseurs ont besoin
d'être capables de distinguer ces forks techniques de la code base originale.

Analyseurs
~~~~~~~~~~

Les analyseurs **DEVRAIENT** identifier un fork technique en constatant
que la clé ``url`` de premier niveau ne pointe pas vers le dépôt dans
lequel se trouve le fichier ``publiccode.yml``.

Les analyseurs **PEUVENT** également identifier un fork technique grâce aux
métadonnées que la plateforme d'hébergement du code peut exposer
(par exemple, GitHub marque explicitement les forks comme tels).

Auteurs
~~~~~~~

Les auteurs de forks techniques **NE DEVRAIENT PAS** modifier
``publiccode.yml`` de quelque manière que ce soit. En particulier, ils
**NE DOIVENT PAS** modifier la clé ``url`` de premier niveau, qui
**DOIT** continuer à pointer vers le dépôt d'origine.

Il n'existe pas de clé explicite pour marquer un fork comme technique.
Ce choix de conception est délibéré : nous ne voulons pas que les auteurs
de forks techniques aient besoin de connaître ``publiccode.yml`` ni la
manière de le modifier. La conception actuelle ne demande aucune action
aux auteurs.

Variantes logicielles
---------------------

Une variante logicielle est un fork proposé comme alternative au logiciel
d'origine en amont.

Elle contient des modifications qui ne font pas encore partie de la
version en amont, comme des fonctionnalités supplémentaires, des
dépendances différentes, des optimisations, etc.

En marquant un fork comme variante, l'auteur indique qu'il estime que
celle-ci comprend un ensemble complet et fonctionnel de modifications
susceptibles d'être utiles à d'autres personnes.

Marquer un fork comme variante n'est **pas** lié à la volonté de contribuer
au projet en amont : l'auteur peut toujours prévoir d'y contribuer ses
modifications, voire être déjà en train de le faire. Ainsi, même si le
fork sera finalement intégré en amont, il peut être utile de le marquer
comme variante pendant ce processus, afin que d'autres puissent le
découvrir et en bénéficier.

.. _parsers-1:

Analyseurs
~~~~~~~~~~

Les analyseurs **DEVRAIENT** identifier une variante en constatant que
la clé ``url`` de premier niveau correspond au dépôt dans lequel se
trouve le fichier ``publiccode.yml``, **ET** qu'une clé ``isBasedOn`` de
premier niveau existe et pointe vers un autre dépôt.

Les analyseurs devraient s'attendre à trouver et analyser d'autres
différences dans ``publiccode.yml`` entre les variantes du logiciel.
En particulier, ``description/[lang]/features`` est conçu pour être
comparé entre variantes afin d'identifier et de présenter les différences
visibles par les utilisateurs.

.. _authors-1:

Auteurs
~~~~~~~

Les auteurs qui souhaitent publier un fork comme variante **DOIVENT**
au minimum :

-  Ajouter une clé ``isBasedOn`` pointant vers un ou plusieurs dépôts en
   amont dont cette variante est dérivée.
-  Modifier la valeur de ``url`` pour pointer vers le dépôt contenant la
   variante.
-  Modifier la valeur de ``legal/repoOwner`` pour se désigner eux-mêmes
   (les auteurs de la variante).
-  Réexaminer la section ``maintenance`` pour indiquer l'état de
   maintenance de la variante.

De plus, les auteurs **DEVRAIENT** envisager les modifications suivantes :

-  Ajouter les fonctionnalités qui distinguent la variante dans la clé
   ``description/[lang]/features``. Les fonctionnalités existantes
   **NE DEVRAIENT PAS** être modifiées ou supprimées de cette liste, sauf
   si elles ont été supprimées de la variante, afin de permettre aux
   analyseurs de comparer facilement les listes de fonctionnalités.
