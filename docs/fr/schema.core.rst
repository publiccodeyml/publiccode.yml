.. _core:

Le standard (coeur)
===================

Ce document détaille le schéma ``publiccode.yml``.

Clés de haut niveau et Sections
-------------------------------

Clé ``publiccodeYmlVersion``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Type: chaîne de caractères
-  Présence: obligatoire
-  Exemple: ``"0.1"``

Cette clé décrit, à des fins de compatibilité, la version à laquelle adhère
le présent fichier ``publiccode.yml``.

Clé ``name``
~~~~~~~~~~~~

-  Type: chaîne de caractères
-  Présence: obligatoire
-  Exemple: ``"Medusa"``

Cette clé contient le nom du logiciel. Elle contient le nom public (abrégé)
du produit, qui peut être traduit dans la section ``localisation`` dédiée.
Il s'agit du nom que la plupart des personnes utilise habituellement pour
désigner le logiciel. Dans le cas où le logiciel aurait un nom de code en
interne et un nom commercial, il est préférable d'utiliser la dénomination
commerciale.

Clé ``applicationSuite``
~~~~~~~~~~~~~~~~~~~~~~~~

-  Type: chaîne de caractères
-  Présence: facultative
-  Exemple: ``"MegaProductivitySuite"``

Cette clé contient le nom de la « suite » à laquelle appartient le logiciel.

Clé ``url``
~~~~~~~~~~~

-  Type: chaîne de cractères (URL)
-  Présence: obligatoire
-  Exemple: ``"https://example.com/italia/medusa.git"``

Un identifiant unique pour ce logiciel. Cette chaîne de caractères doit être
une URL qui pointe vers le dépôt du code source (git, svn, …) dans lequel le
logiciel est publié. Si le dépôt est compatible avec des protocoles multiples,
préférez les URL HTTP/HTTPS qui ne requièrent pas d’authentification.

Les fourches créées pour contribuer en amont ne doivent pas modifier ce fichier ;
cela aide les logiciels qui parse ``publiccode.yml`` à ignorer immédiatement les
fourches techniques. Au contraire, une fourche complète, destinée à être maintenue
séparément du logiciel d’origine, doit modifier cette ligne pour être traitée
comme variante distincte.

Voir: ref:`fourches-et-variantes` pour une description complète de ce qu’est une
variante de logiciel et de comment prendre en charge les logiciels fourchés du côté
des programmes d'analyse syntaxique et des auteurs.

Clé ``landingURL``
~~~~~~~~~~~~~~~~~~

-  Type: chaîne de caractères (URL)
-  Présence: facultative
-  Exemple: ``"https://example.com/italia/medusa"``

Si le paramètre de l’``url`` ne renvoie pas à une page lisible par un humain,
mais sert uniquement à rediriger vers le code source d’un logiciel de gestion
de version, avec cette clé, il est possible d'ajouter une option pour spécifer
la *landing page*. Dans le cas où le produit comprend un programme d'installation
graphique automatique, cette URL peut pointer vers une page qui contient une
référence au code source et qui offre la possibilité de télécharger le programme
d’installation.

Clé ``isBasedOn``
~~~~~~~~~~~~~~~~~

-  Type: chaîne de caractères ou array de chaînes de caractères
-  Présence: facultative
-  Exemple: ``"https://github.com/italia/otello.git"``

Si le logiciel est une variante ou une fourche d’un autre logiciel qui peut
éventuellement contenir un fichier ``publiccode.yml``, cette clé contiendra
l’``url`` d'un ou de plusieurs projets originaux.

L’existence de cette clé identifie la fourche comme une variante d’un logiciel (voir:
:ref:`fork-varianti`), à partir du dépôt spécifié.

Clé ``softwareVersion``
~~~~~~~~~~~~~~~~~~~~~~~

-  Type: chaîne de caractères
-  Présence: facultative
-  Exemple: ``"1.0"``, ``"dev"``

Cette clé contient le numéro de la dernière version stable du logiciel.
Le numéro de la version est une chaîne de caractères qui n’est pas destinée
à être interprétée et parsée mais seulement affichée ; les programmes d'analyse
syntaxique ne doivent pas s'appuyer sur une gestion sémantique des versions ou
tout autre format de gestion spécifique de version.

La clé peut être omise si le logiciel est à un stade précoce de développement
et n'a pas encore été publié.

Clé ``releaseDate``
~~~~~~~~~~~~~~~~~~~

-  Type: chaîne de caractères (date)
-  Présence: obligatoire
-  Exemple: ``"2017-04-15"``

Cette clé contient la date à laquelle la dernière version a été publiée. Cette
date est obligatoire si le logiciel a été publié au moins une fois et qu'il
existe, par conséquent, un numéro de version.

Clé ``logo``
~~~~~~~~~~~~

-  Type: chaîne de caractères (chemin relatif du fichier ou URL absolue)
-  Présence: facultative
-  Formats acceptés: SVG, SVGZ, PNG
-  Exemple: ``"img/logo.svg"``

Cette clé contient le chemin du logo du logiciel. Les logos doivent être
dans un format de fichier vectoriel ; les format raster sont uniquement
acceptés en dernier recours. Dans ce cas, il s'agit de fichiers PNG
transparents, d’une largeur minimale de 1000px. 
La valeur de la clé peut être le chemin relatif du fichier à partir de la
racine du dépôt ou une URL absolue qui pointe vers la version brute du logo.
Dans les deux cas, le fichier doit être situé dans le même dépôt que le
fichier ``publiccode.yml``.

Clé ``monochromeLogo``
~~~~~~~~~~~~~~~~~~~~~~

-  Type: chaîne de caractères (chemin vers le fichier)
-  Présence: facultative
-  Formats acceptés: SVG, SVGZ, PNG
-  Exemple: ``"img/logo-mono.svg"``

Cette clé indique le logo monochrome (noir) du logiciel. Le logo doit
être dans un format de fichier vectoriel ; les formats raster sont uniquement
autorisés comme solution de secours. Dans ce cas, il s'agit de fichiers PNG
transparents, d’une largeur minimale de 1000px. 
La valeur clé peut être le chemin relatif vers le fichier à partir de la 
racine du dépôt ou une URL absolue pointant vers une version brute du
logo. Dans les deux cas, le fichier doit être situé dans le même dépôt que le
fichier ``publiccode.yml``.

Clé ``inputTypes``
~~~~~~~~~~~~~~~~~~

-  Type: array of enumerated strings
-  Présence: facultative
-  Valeurs: conformément à la RFC 6838
-  Exemple: ``"text/plain"``

Une liste des types de supports (*Media Types* ou MIME Types) tels que mentionnés dans la
RFC 6838 <https://tools.ietf.org/html/rfc6838>`__, qui peuvent être gérés
en entrée (*input*) dans l'application.

Si le logiciel ne supporte aucune entrée, il est possible d'ignorer ce champ
ou d’utiliser ``application/x.empty``.

Clé ``outputTypes``
~~~~~~~~~~~~~~~~~~~

-  Type: array of enumerated strings
-  Présence: facultative
-  Valeurs: conformément à la RFC 6838
-  Exemple: ``"text/plain"``

Une liste des types de supports (*Media Types* ou MIME Types) tels que mentionnés dans la
RFC 6838 <https://tools.ietf.org/html/rfc6838>`__, qui peuvent être gérés
en sorties (*output*) dans l'application.

Si le logiciel ne supporte aucune sorties, il est possible d'ignorer ce champ
ou d’utiliser ``application/x.empty``.

Clé ``platforms``
~~~~~~~~~~~~~~~~~

-  Type: enumerated string or array of strings
-  Présence: obligatoire
-  Valeurs: ``web``, ``windows``, ``mac``, ``linux``, ``ios``,
   ``android``. Les valeurs lisibles par des humains qui ne sont pas incluses
   dans cette liste sont autorisées.
-  Exemple: ``web``

Cette clé spécifie sur quelle plateforme le logiciel fonctionne.
Plutôt que de décrire la plateforme sur laquelle le logiciel s'exécute, 
cette clé permet d'indiquer les plateformes que les utilisateurs pourront
utiliser pour accéder et faire fonctionner le logiciel.

Dans la mesure du possible, utilisez les valeurs par défaut.
Si le logiciel s'exécute sur une plateforme pour laquelle une
valeur par défaut n’est pas disponible, une autre valeur peut
être utilisée.

Clé ``categories``
~~~~~~~~~~~~~~~~~~

-  Type: array de chaînes de caractères
-  Présence: obligatoire
-  Valeurs acceptées: voir :ref:`categories-list` 

Une liste des mots qui peuvent être utilisés pour décrire le logiciel
et aider à la constitution d'un catalogue des logiciels ouverts.

Le vocabulaire contrôlé de la :ref:`categories-list` présente la liste
des valeurs acceptées.

Clé ``usedBy``
~~~~~~~~~~~~~~

-  Type: array de chaînes de caractères
-  Présence: facultative

Une liste des noms des administrations publiques de premier plan (qui
auront un rôle de « certification ») qui sont connues, des mainteneurs du
logiciel, comme étant des utilisateurs.

Les programmes d'analyses syntaxiques sont encouragés pour permettre
d'améliorer cette liste avec des informations complémentaires qui peuvent
être obtenu indépendamment ; par exemple, la fourche d’un logiciel 
détenue par une administration, peut être utilisée comme un signal
d’utilisation du logiciel.

Clé ``roadmap``
~~~~~~~~~~~~~~~

-  Type: chaîne de caractères
-  Présence: facultative

Un lien vers une *roadmap* publique du logiciel.

Clé ``developmentStatus``
~~~~~~~~~~~~~~~~~~~~~~~~~

-  Type: enumerated string
-  Présence: obligatoire
-  Valeurs autorisées: ``concept``, ``development``, ``beta``, ``stable``,
   ``obsolete``

Les clés sont: 

-  ``concept`` - Le logiciel est encore un « concept » : aucun code n’a été
développé, et le dépôt peut exister symboliquement, dans l'attente.
-  ``development`` - Des efforts ont été fournits quant au développement
du logiciel, mais le code n’est pas prêt pour un utilisateurs final, pas même
dans une version préliminaire (bêta ou alpha) à tester par les utilisateurs.
-  ``beta`` -  Le logiciel est en phase de test (alpha ou beta).
À ce stade, le logiciel peut avoir eu ou non une première version de publiée.
-  ``stable`` - Le logiciel a déjà eu une première version de publiée
et est prêt à être utilisé dans un environnement de production.
-  ``obsolete`` - Le logiciel n’est plus maintenu ou mis à jour.
L’ensemble du code source est archivé et conservé pour des raisons
d’historicité.

Clé ``softwareType``
~~~~~~~~~~~~~~~~~~~~

-  Type: enumerated string
-  Présence: obligatoire
-  Valeurs autorisées: ``"standalone/mobile"``, ``"standalone/iot"``,
   ``"standalone/desktop"``, ``"standalone/web"``, ``"standalone/backend"``,
   ``"standalone/other"``, ``"addon"``, ``"library"``, ``"configurationFiles"``

Les clés sont:

-  ``standalone/mobile`` - Le logiciel est paquet autonome et portable. 
Le logiciel est une application mobile native.
-  ``standalone/iot`` - Le logiciel est adapté pour une utilisation dans un
contexte IoT.
-  ``standalone/desktop`` - Le logiciel est normalement installé et
utilisé dans un environnement de bureau.
-  ``standalone/web`` - Le logiciel représente une application web
utilisable au moyen d’un navigateur.
-  ``standalone/backend`` - Le logiciel est une application backend.
-  ``standalone/other`` - Le logiciel a une nature différente de ceux
listés ci-dessus.  
-  ``softwareAddon`` - Le software est un addon, tel qu'un plugin
ou un thème, dans le cadre de logiciel plus complexe (ex. un CMS ou
une suite bureautique).
-  ``library`` - Le logiciel contient une bibliothèque ou un SDK
pour faciliter la création de nouveaux produits par des développeurs tiers.
-  ``configurationFiles`` - Le logiciel ne contient pas de script
exécutable, mais une série de fichiers de configuration. Ils peuvent
documenter la manière d'obtenir un certain type déploiement. Les fichiers 
susmentionnés peuvent prendre la forme de simples fichiers de configuration,
des scripts bash, de playbook ansible, de fichiers *dockerfiles*,
ou d’autres jeux d’instructions.


Section ``intendedAudience``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Clé ``intendedAudience/countries``
''''''''''''''''''''''''''''''''''

-  Type: array de chaînes de caractères
-  Présence: facultative

Cette clé inclut explicitement certains pays dans le public cible,
par exemple, le logiciel revendique explicitement sa conformité avec
des processus, des technologies ou des lois spécifiques. 
Tous les pays sont indiqués à l'aide des deux lettres renvoyant au code du pays, 
conformément au standard ISO 3166-1 alpha-2.

Clé ``intendedAudience/unsupportedCountries``
'''''''''''''''''''''''''''''''''''''''''''''

-  Type: array de chaînes de caractères
-  Présence: facultative

Cette clé mentionne explicitement les pays qui ne sont pas supportés.
Cette situation peut survenir en cas de conflit entre le mode de
fonctionnement du logiciel et une loi, un processus ou une technologie
particulière.
Tous les pays sont indiqués à l'aide des deux lettres renvoyant au code du pays, 
conformément au standard ISO 3166-1 alpha-2.

Clé ``intendedAudience/scope``
''''''''''''''''''''''''''''''

-  Type: array de chaînes de caractères
-  Présence: facultative
-  Valeurs acceptées: voir :ref:`scope-list` 

Cette clé contient la liste des catégories relatives au champ d’application
du logiciel.


Section ``description``
~~~~~~~~~~~~~~~~~~~~~~~

Cette section contient une description générale du logiciel.
Les programmes d'analyse syntaxique peuvent utiliser cette section
pour créer, par exemple, une page web décrivant le logiciel.

**N.B. :** dans la mesure où toutes les chaînes de caractères contenues
dans cette section sont visibles par l’utilisateur et écrites dans une
langue donnée, il est **nécessaire** d’indiquer la langue avec laquelle le
le texte est éditée. Pour ce faire, il est nécessaire de créer une section
dédiée à la langue, conformément aux spécifications de la
`BCP 47 <https://tools.ietf.org/html/bcp47>`__ de l’IETF.
Veuillez noter que l'étiquette *primary language subtag* ne doit pas être
omise, comme indiquée dans la BCP 47. 

Un exemple pour le français:


.. code:: yaml 

   description:
     fr:
       shortDescription: ...
       longDescription: ...

Dans les parties suivantes, nous considérons que toutes les clés sont dans
une section comportant le nom de la langue (nous la noterons avec ``[lang]``).

**N.B. :** il est nécessaire d’avoir *au moins* une langue dans cette section.
Toutes les autres langues sont facultatives.

Clé ``description/[lang]/localisedName``
''''''''''''''''''''''''''''''''''''''''

-  Type: chaîne de caractères
-  Présence: facultative
-  Exemple: ``"Medusa"``

Cette clé représente l'occasion de traduire le nom dans une langue spécifique.
Cette clé contient le nom public (abrégé) du produit. Il s'agit du nom
auquel se réfère la majorité des personnes. Si le logiciel a un nom de « code »
en interne et une dénomination commerciale, il est préférable d'indiquer
la dénomination commerciale.

Clé ``description/[lang]/genericName``
''''''''''''''''''''''''''''''''''''''

-  Type: chaîne de caractères (35 caractères max)
-  Présence: obligatoire
-  Exemple: ``"Text Editor"``

Cette clé indique le « nom générique », en référence à la catégorie spécifique
à laquelle le logiciel appartient. Le nom générique du logiciel se trouve 
généralement dans la présentation du logiciel, lorsque vous écrivez :
« Le logiciel xxx est un.e yyy ». Parmi les exemples notables, il est possible
de mentionner « Éditeur de texte », « Logiciel de traitement de texte »,
« Moteur de recherche », « Forum », etc… Le nom générique peut comporter
jusqu’à 35 caractères.

Clé ``description/[lang]/shortDescription``
'''''''''''''''''''''''''''''''''''''''''''

-  Type: chaîne de caractères (150 caractère max)
-  Présence: obligatoire
-  Exemple: ``"Advanced booking system for hospitals"``

Cette clé contient une brève description du logiciel.
Il s'agit d'une seule ligne contenant une unique phrase 
d'un maximum de 150 caractères.

Clé ``description/[lang]/longDescription``
''''''''''''''''''''''''''''''''''''''''''

-  Type: chaîne de caractères (500 caractères min, 10 000 caractères max)
-  Présence: obligatoire (pour au moins une langue)

Cette clé contient une description longue du logiciel, entre 500 et 10 000
caractères. Elle a pour but de donner un aperçu des fonctionnalités du
logiciel à un utilisateur potentiel. Le public de ce texte doit être 
l'utilisateur final du logiciel et non le développeur.
Il est possible de considérer ce texte comme la description du logiciel
qui pourrait figurer sur le site web (dans le cas où le logiciel en aurait un).

Cette description peut contenir du markdown assez basique :
``*italic*``, ``**bold**``, puces et ``[link](#)``.

Clé ``description/[lang]/documentation``
''''''''''''''''''''''''''''''''''''''''

-  Type: URL
-  Présence: facultative

Cette clé contient une référence à la documentation du logiciel à destination 
de l'utilisateur (et non du développeur). La valeur doit être une URL pointant
vers une version hébergée de la documentation.

Il est suggéré que cette URL pointe vers une version hébergée de la
documentation qui est directement lisible via un navigateur web commun,
aux formats bureau et mobile. La documentation doit être publiée en HTML
et explorable comme un site web (avec un index de navigation, une barre
de recherche, etc.).

Si la documentation est uniquement disponible sous la forme d'un document,
il est nécessaire d'insérer un lien dans la clé, sous la forme d'une URL,
pour afficher / télécharger le document. Il est conseillé de traiter la
documentation comme faisant partie du code source et donc de la gérer au 
travers de commits vers le code source du dépôt. De cette manière, il sera
possible d'indiquer une URL pointant directement vers la plateforme
d'hébergement du code source (ex. l'URL Github d'un fichier). Il est
préférable d'utiliser un format ouvert tel que PDF ou ODT pour une 
interopérabilité maximale. 

Quel que soit le format de la documentation, il est nécessaire de publier
les fichiers sources sous une licence ouverte, en les ajoutant éventuellement
dans le dépôt lui-même.

Clé ``description/[lang]/apiDocumentation``
'''''''''''''''''''''''''''''''''''''''''''

-  Type: URL
-  Présence: facultative

Cette clé contient une référence à la documentation de l’API du logiciel.
La valeur doit être une URL pointant une version hébergée de la documentation.

Il est suggéré que cette URL pointe vers une version hébergée de la
documentation qui est immédiatement lisible via un navigateur web commun.
La documentation doit être publiée en HTML et explorable comme un site web
(avec un index de navigation, une barre de recherche, etc.). S’il y a une
référence ou un test de déploiement, cela devrait permettre de proposer
une interface interactive (ex. Swagger).

Si la documentation est uniquement disponible sous la forme d'un document,
il est necessaire d'insérer un lien dans la clé, sous la forme d'une URL,
pour afficher / télécharger le document. Il est conseillé de traiter la
documentation comme faisant partie du code source et donc de la gérer au 
travers de commits vers le code source du dépôt. De cette manière, il sera
possible d'indiquer une URL pointant directement vers la plateforme
d'hébergement du code source (ex. l'URL Github d'un fichier). Il est
préférable d'utiliser un format ouvert tel que PDF ou ODT pour une 
interopérabilité maximale. 

Quel que soit le format de la documentation, il est nécessaire de publier
les fichiers sources sous une licence ouverte, en les ajoutant éventuellement
dans le dépôt lui-même.

Clé ``description/[lang]/features``
'''''''''''''''''''''''''''''''''''

-  Type: tableau de chaînes de caractères
-  Présence: facultative (pour au moins une langue)

Cette clé contient une liste des fonctionnalités du logiciel qui décrit
ce que permet de faire le logiciel. Les destinataires de ce texte sont les décideurs
publics qui utiliserons le logiciel. En conséquence, la liste des
fonctionnalités ne s'adressent pas aux développeurs : plutôt que de lister
les caractéristiques techniques qui renvoient à l'implémentation de détails,
il est préférable de lister les fonctionnalités utiles aux utilisateurs
du logiciel.

Si cette clé est obligatoire, il n’y a pas de limites du nombre de
fonctionnalités minimum et maximum qui peuvent être répertoriées dans
cette clé. Notons, toutefois, que chaque fonctionnalité peut comporter
un maximum de 100 caractères.

Il est suggéré de lister entre 5 et 20 fonctionnalités, en fonction de
la taille et de la complexité du logiciel. Dans la mesure où les utilisateurs
peuvent se référer à la documentation pour obtenir des informations
complémentaires, la liste des fonctionnalités n’a pas besoin d’être exhaustive.

Clé ``description/[lang]/screenshots``
''''''''''''''''''''''''''''''''''''''

-  Type: array of strings (chemins)
-  Présence: facultative
-  Formats: PNG, JPG
-  Exemple: ``"data/screenshots/configuration.png"``

Cette clé contient un ou plusieurs chemins vers les fichiers montrant des
captures d'écran du logiciel. Elles ont pour but de donner une aperçu
de l’apparence du logiciel et de son fonctionnement. La valeur peut être
soit le chemin relatif du fichier à partir de la racine du dépôt, soit une
URL absolu pointant vers la version brute de l'image de capture d'écran.
Dans les deux cas, le fichier doit être situé dans le même dépôt que le
fichier ``publiccode.yml``.

Les captures d'écran peuvent avoir toutes les formes et toutes les tailles.
Les formats suggérés sont :

-  Desktop: 1280x800 @1x
-  Tablet: 1024x768 @2x
-  Mobile: 375x667 @2x

Clé ``description/[lang]/videos``
'''''''''''''''''''''''''''''''''

-  Type: array of strings (URLs)
-  Présence: facultative
-  Exemple: ``"https://youtube.com/xxxxxxxx"``

Cette clé contient une ou plusieurs URLs de vidéos montrant le fonctionnement
du logiciel. Comme les captures d'écran, les vidéos doivent donner un aperçu
rapide de l’apparence du logiciel et de la manière dont il fonctionne. 
Les vidéos doivent être hébergées sur une plateforme de partage de vidéos
qui supporte le standard `oEmbed <https://oembed.com>`__ ; Youtube et Vimeo
sont des alternatives populaires.

**N.B. :** Dans la mesure où les vidéos font parties intégrantes de la
documentation, il est recommandé de les publier sous une licence ouverte.

Clé ``description/[lang]/awards``
'''''''''''''''''''''''''''''''''

-  Type: array of strings
-  Présence: facultative

Une liste des récompenses obtenues par le logiciel.

Section ``legal``
~~~~~~~~~~~~~~~~~

Clé ``legal/license``
'''''''''''''''''''''

-  Type: chaîne de caractères
-  Présence: facultative
-  Exemple: ``"AGPL-3.0-or-later"``

Cette chaîne de caractères décrit la licence sous laquelle le logiciel
est distribué. La chaîne de caractères doit contenir une expression SPDX
valide, renvoyant à une (ou plusieurs) licence open source. 
Pour plus d’informations, veuillez vous référer à la
`documentation du SPDX <https://spdx.org/licenses/>`__.

Clé ``legal/mainCopyrightOwner``
''''''''''''''''''''''''''''''''

-  Type: chaîne de caractères
-  Présence: facultative
-  Exemple: ``"City of Amsterdam"``

Cette chaîne décrit l'entité qui détient les droits d'auteur sur la "majorité" du code du dépôt. Normalement, il s'agit de la ligne affichée avec le symbole du *copyright* et située au début de la plupart des fichiers du dépôt.

Il est possible de lister plusieurs propriétaires si nécessaire, en utilisant une phrase en anglais. Il est également possible de faire référence à une communauté ou à un groupe de personnes tel que "Linus Torvalds et tous les contributeurs Linux".

S'il est impossible d'identifier le principal détenteur du droit d'auteur, il est possible d'omettre cette clé. Dans ce cas, si le dépôt a un fichier contenant le nom des auteurs, il est possible de pointer vers ce fichier via ``legal/authorsFile`` (voir ci-dessous).

Clé ``legal/repoOwner``
'''''''''''''''''''''''

-  Type: chaîne de caractères
-  Présence: facultative
-  Exemple: ``"City of Amsterdam"``

Cette clé décrit l'entité propriétaire du dépôt. Il peut s'agir (ou non) de la même entité qui détient le droit d'auteur sur le code. Par exemple, dans le cas d'un logiciel fourché, le ``repoOwner`` est probablement différent du ``mainCopyrightOwner``.

Clé ``legal/authorsFile``
'''''''''''''''''''''''''

-  Type: chaîne de caractères (chemin du fichier)
-  Présence: facultative
-  Exemple: ``"doc/AUTHORS.txt"``

Certains logiciels au code source ouvert adoptent une convention qui identifie les détenteurs du droit d'auteur via un fichier répertoriant toutes les entités titulaires du droit d'auteur. Il s'agit d'une pratique courante dans le cadre de projets fortement soutenus par une communauté où il y a de nombreux contributeurs externes et pas de titulaires du droit d'auteur unique / principal. Dans ce cas, cette clé peut être utilisée pour faire référence au fichier *authors* susmentionné, en utilisant un chemin relatif vers la racine du dépôt.


Section ``maintenance``
~~~~~~~~~~~~~~~~~~~~~~~

Cette section contient des informations sur l'état de maintenance du logiciel, utile pour évaluer si le logiciel est activement développé.

Clé ``maintenance/type``
''''''''''''''''''''''''

-  Type: enumerate
-  Présence: obligatoire
-  Valeurs: ``"internal"``, ``"contract"``, ``"community"``, ``"none"``

Cette clé décrit la manière dont le logiciel est maintenu.

-  ``internal`` - siginifie que le logiciel est maintenu en interne par le propriétaire du dépôt ;
-  ``contract`` - signifie qu'il existe un contrat commercial liant une entité à la maintenance du logiciel ;
-  ``community`` - signifie que le logiciel est actuellement maintenu par une ou plusieurs personnes qui donnent de leur temps au projet ;
-  ``none`` - signifie que le logiciel n'est pas maintenu de façon active.

Clé ``maintenance/contractors``
'''''''''''''''''''''''''''''''

-  Type: array of Contractor (voir ci-dessous)
-  Présence: obligatoire (si ``maintenance/type`` **est** ``contract``)

Cette clé décrit la ou les entités actuellement sous contrat pour la maintenance du logiciel. Il peut s'agir d'entreprises, d'organisations ou d'autres collectifs.

Clé ``maintenance/contacts``
''''''''''''''''''''''''''''

-  Type: Liste des Contacts (voir ci-dessous)
-  Présence: obligatoire (si ``maintenance/type`` **est** ``internal`` ou ``community``)

Un ou plusieurs contacts assurant la maintenance du logiciel. 

Cette clé décrit les personnes techniques responsable de la maintenance du logiciel. Chaque contact doit être une personne physique et non une entreprise ou une organisation. Si un contact agit comme représentant d'une institution, ce rapport doit être explicité à l'aide de la clé ``affiliation`` du contact (voir ci-dessous).

Dans le cas d'un accord commercial (ou d'une série d'accords semblables), il est nécessaire de spécifier les entités finales sous contrat, en charge de la maintenance du logiciel. Ne mentionné pas le propriétaire du logiciel, sauf s'il est techniquement impliqué dans la maintenance du produit. 

Section ``localisation``
~~~~~~~~~~~~~~~~~~~~~~~~

Cette section fournit un aperçu des fonctionnalités de localisation du logiciel.

Clé ``localisation/localisationReady``
''''''''''''''''''''''''''''''''''''''

-  Type: booléen
-  Présence: obligatoire

Si ``yes``, le logiciel a l'infrastructure mise en place ou a été conçu pour être
multilingue. Le logiciel n'a pas besoin d'être disponible dans plusieurs langues, une seule langue suffit. 

Clé ``localisation/availableLanguages``
'''''''''''''''''''''''''''''''''''''''

-  Type: liste des balises de langue de la BCP 47 de l'IETF
-  Présence: obligatoire
-  Exemple: ``"it"``, ``"en"``, ``"sl-IT-nedis"``

Il s'agit de la liste des langues dans lesquelles le logiciel est disponible. Bien entendu, cette liste contiendra au moins une langue. Tel que spécifié dans la `BCP 47 <https://tools.ietf.org/html/bcp47>`__, la *primary language subtag* ne doit pas être omise.


Section ``dependsOn``
~~~~~~~~~~~~~~~~~~~~~

Cette section fournit un aperçu des dépendances requises à l'échelle du système, pour installer et utiliser le logiciel. 

**NOTE:** elle ne liste pas les dépendances à l'échelle du code source (ex. bibliothèques utlisées par le logiciel) et se concentre uniquement sur les dépendances de relative au fonctionnement et/ou au système qui doivent être installées et maintenues séparément; par exemple, une base de données.

Clé ``dependsOn/open``
''''''''''''''''''''''

-  Type: array de ``dependency`` (voir ci-dessous)
-  Présence: facultative

Cette clé contient la liste des dépendances distribuées sous une licence open source et nécessaires au fonctionnement du logiciel.

Clé ``dependsOn/proprietary``
'''''''''''''''''''''''''''''

-  Type: array de ``dependency`` (voir ci-dessous)
-  Présence: facultative

Cette clé contient la liste des dépendances distribuées sous une licence propriétaire et nécessaires au fonctionnement du logiciel.

Clé ``dependsOn/hardware``
''''''''''''''''''''''''''

-  Type: array de ``dependency`` (voir ci-dessous)
-  Présence: facultative

Cette clé contient une liste des dépendances matérielles qui doivent être détenues pour utiliser le logiciel. 

Formats de données spécifiques
------------------------------

Dépendance
~~~~~~~~~~

Une ``dependency`` est un objet complexe. Les propriétés sont les suivantes :

-  ``name`` - **obligatoire** - Le nom de la dépendance (ex. MySQL,
   NFC Reader) ;
-  ``versionMin`` - la version compatible la plus ancienne ;
-  ``versionMax`` - la version compatible la plus récente ;
-  ``version`` - la version principale avec laquelle le logiciel est compatible. Cela suppose une compatibilité avec l'ensemble des correctifs et des corrections de bogues appliqués ultérieurement à cette version ;
-  ``optional`` - si la dépendance est facultative ou obligatoire.

Gestion de versions complexe
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Il est bien sûr possible d'utiliser les différentes clés pour spécifier une matrice de compatibilité complexe. 


*Ex. 1*

.. code:: yaml

   - name: PostgreSQL
     version: "3.2"
     optional: yes

Cet extrait précise le caractère facultatif et la version exacte (3.2.) de la dépendance PostgreSQL.

*Ex. 2*

.. code:: yaml

   - name: MySQL
     versionMin: "1.1"
     versionMax: "1.3"

Cet extrait précise le caractère obligatoire de la dépendance MySQL ainsi que les versions autorisées (versions comprises entre 1.1 et 1.3).

Contact
~~~~~~~

Un Contact est un objet comportant les propriétés suivantes : 

-  ``name`` - **obligatoire** - Cette clé contient le nom complet d'un des contacts techniques. Ce doit être une personne physique ; NE PAS remplir cette clé avec des informations de contact génériques, relatives à des départements d'une entreprise, à une association, etc.
-  ``email`` -  Cette clé contient l'adresse e-mail du contact technique. Il s'agit de l'adresse e-mail à laquelle le contact technique peut être directement contacté ; NE PAS remplir cette clé avec une liste de diffusion ou des points de contact génériques tels que “info@acme.inc”. L'adresse e-mail ne doit pas être masquée. 
Pour éviter autant que possible la collecte d'adresses e-mail, utilisez ``\x64`` to replace ``@``, tel qu'autorisé par la spécifiation YAML.
-  ``phone`` - le numéro de téléphone (précédé de l'indicatif téléphonique international). Il s'agit d'une chaîne de caractères.
-  ``affiliation`` - Cette clé contient une information explicite quant à l'affiliation du contact technique. Dans le cas où il y aurait plusieurs entités maintenant le logiciel, cette clé peut être utilisée pour créer une relation entre chaque contact technique et chaque entité maintenant le logiciel. Elle peut contenir, par exemple, le nom d'une entreprise, le nom d'une association, etc.

Prestataire
~~~~~~~~~~~

Un Contractor (prestataire) est un objet comportant les propriétés suivantes :

-  ``name`` - **obligatoire** - Le nom du prestataire, qu'il s'agisse d'une entreprise ou d'une personne physique.
-  ``until`` - **obligatoire** - Il s'agit d'une date (YYYY-MM-DD). Cette clé doit contenir la date à laquelle la maintenance prendra fin. Dans le cas où la maintenance serait réalisée par une communauté, la valeur ne doit pas excéder une période de deux ans, et devra donc être régulièrement mise si la communauté continue à travailler sur le projet. 
-  ``email`` -  Cette clé contient l'adresse e-mail du contact technique. Il s'agit de l'adresse e-mail à laquelle le contact technique peut être directement contacté ; NE PAS remplir cette clé avec une liste de diffusion ou des points de contact génériques tels que “info@acme.inc”. L'adresse e-mail ne doit pas être masquée. 
Pour éviter autant que possible la collecte d'adresses e-mail, utilisez ``\x64`` to replace ``@``, tel qu'autorisé par la spécifiation YAML.
-  ``website`` - Cette clé pointe vers l'entité maintenant le site web. Elle peut pointer vers le site web principal d'une institution ou bien vers un site web ou une page plus spécifique au projet. 

Dates
~~~~~

Toutes les dates dans ``publiccode.yml`` doivent respecter le format “YYYY-MM-DD”,
qui est l'un des codages autorisé par l'ISO8601. Il s'agit de l'unique codage autorisé. Par conséquent, l'ISO8601 complet n'est pas autorisé pour les clés relatives aux dates.
