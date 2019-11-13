
.. _core:

Le standard (coeur)
===================

Ce document détaille le schéma ``publiccode.yml``.

Clés de haut niveau et Sections
---------------------------

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

Cette clé contient le nom du logiciel. Elle contient le nom public (abbrégé)
du produit, qui peut être traduit dans la section ``localisation`` dédiée.
Il s'agit du nom que la plupart des personnes utilise habituellement pour
désigner le logiciel. Dans le cas où le logiciel aurait un nom de code en
interne et un nom commercial, il est préférable d'utiliser la dénomination
commerciale.

Clé ``applicationSuite``
~~~~~~~~~~~~~~~~~~~~~~~~

-  Type: chaîne de caractères
-  Présence: optionelle
-  Exemple: ``"MegaProductivitySuite"``

Cette clé contient le nom de la “suite” à laquelle appartient le logiciel.

Clé ``url``
~~~~~~~~~~~

-  Type: chaîne de cractères (URL)
-  Présence: obligatoire
-  Exemple: ``"https://example.com/italia/medusa.git"``

Un identifiant unique pour ce logiciel. Cette chaîne de caractères doit être
une URL qui pointe vers le dépôt du code source (git, svn, …) dans lequel le
logiciel est publié. Si le dépôt est compatible avec des protocoles multiples,
préférez les URL HTTP/HTTPS qui ne requierent pas d’authentification.

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
-  Présence: optionelle
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

-  Type: chaîne de caractères ou tableau contenant des chaînes de caractères
-  Présence: optionelle
-  Exemple: ``"https://github.com/italia/otello.git"``

Si le logiciel est une variante ou une fourche d’un autre logiciel qui peut
éventuellement contenir un fichier ``publiccode.yml``, cette clé contiendra
l’``url`` d'un ou de plusieurs projets orginaux.

L’existence de cette clé identifie la fourche comme une variante d’un logiciel (voir:
:ref:`fork-varianti`), à partir du dépôt spécifié.

Clé ``softwareVersion``
~~~~~~~~~~~~~~~~~~~~~~~

-  Type: chaîne de caractères
-  Présence: optionelle
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
-  Présence: optionelle
-  Formats acceptés: SVG, SVGZ, PNG
-  Exemple: ``"img/logo.svg"``

Cette clé contient le chemin du logo du logiciel. Les logos doivent être
dans un format de fichier vectoriel ; les format raster sont uniquement
acceptés en dernier recours. Dans ce cas, il s'agit de fichiers PNG
transparents, d’une largeur minimale de 1000px. 
La valeur de la clé peut être le chemin relatif du fichier à partir de la
racine du dépot ou une URL absolue qui pointe vers la version brute du logo.
Dans les deux cas, le fichier doit être situé dans le même dépôt que le
fichier ``publiccode.yml``.

Clé ``monochromeLogo``
~~~~~~~~~~~~~~~~~~~~~~

-  Type: chaîne de caractères (chemin vers le fichier)
-  Présence: optionelle
-  Formats acceptés: SVG, SVGZ, PNG
-  Exemple: ``"img/logo-mono.svg"``

Cette clé indique le logo monochrome (noir) du logiciel. Le logo doit
être dans un format de fichier vectoriel ; les formats raster sont uniquement
autorisés comme solution de secours. Dans ce cas, il s'agit de fichiers PNG
transparents, d’une largeur minimale de 1000px. 
La valeur clé peut être le chemin relatif vers le fichier à partir de la 
racine du dépôt ou une URL absolue poitant vers une version brute du
logo. Dans les deux cas, le fichier doit être situé dans le même dépôt que le
fichier ``publiccode.yml``.

Clé ``inputTypes``
~~~~~~~~~~~~~~~~~~

-  Type: array of enumerated strings
-  Présence: optionelle
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
-  Présence: optionelle
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

-  Type: tableau de chaînes de caractères
-  Présence: obligatoire
-  Valeurs acceptées: voir :ref:`categories-list` 

Une liste des mots qui peuvent être utilisés pour décrire le logiciel
et aider à la constitution d'un catalogue des logiciels ouverts.

Le vocabulaire contrôlé de la :ref:`categories-list` présente la liste
des valeurs acceptées.

Clé ``usedBy``
~~~~~~~~~~~~~~

-  Type: tableau de chaînes de caractères
-  Présence: optionelle

Une liste des noms des administrations publiques de premier plan (qui
auront un rôle de “certification”) qui sont connues, des mainteneurs du
logiciel, comme étant des utilisateurs.

Les programmes d'analyses syntaxiques sont encouragés pour permettre
d'améliorer cette liste avec des informations complémentaires qui peuvent
être obtenu indépendamment ; par exemple, la fourche d’un logiciel 
détenue par une administration, peut être utilisée comme un signal
d’utilisation du logiciel.

Clé ``roadmap``
~~~~~~~~~~~~~~~

-  Type: chaîne de caractères
-  Présence: optionelles

Un lien vers une *roadmap* publique du logiciel.

Clé ``developmentStatus``
~~~~~~~~~~~~~~~~~~~~~~~~~

-  Type: enumerated string
-  Présence: obligatoire
-  Valeurs autorisées: ``concept``, ``development``, ``beta``, ``stable``,
   ``obsolete``

Les clés sont: 

-  ``concept`` - Le logiciel est encore un “concept” : aucun code n’a été
développé, et le dépôt peut exister symboliquement, dans l'attente.
-  ``development`` - Des efforts ont été fournits quant au développement
du logiciel, mais le code n’est pas prêt pour un utilisateurs final, pas même
dans une version préliminaire (bêta ou alpha) à tester par les utilisateurs.
-  ``beta`` -  Le logiciel est en phase de test (alpha ou beta).
À ce stade, le logiciel peut avoir eu ou non une première version de publiée.
-  ``stable`` - Le logiciel a déjà eu une première version de publiée
et est prêt à être utilsé dans un environement de production.
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
-  ``library`` - Le logiciel contient une blibliothèque ou un SDK
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

-  Type: tableau contenant des chaînes de caractères
-  Présence: optionelle

Cette clé inclut explicitement certains pays dans le public cible,
par exemple, le logiciel revendique explicitement sa conformité avec
des processus, des technologies ou des lois spécifiques. 
Tous les pays sont indiqués à l'aide des deux lettres renvoyant au code du pays, 
conformément au standard ISO 3166-1 alpha-2.

Clé ``intendedAudience/unsupportedCountries``
'''''''''''''''''''''''''''''''''''''''''''''

-  Type: tableau de chaînes de caractères
-  Présence: optionelle

Cette clé mentionne explicitement les pays qui ne sont pas supportés.
Cette situation peut survenir en cas de conflit entre le mode de
fonctionnement du logiciel et une loi, un processus ou une technologie
particulière.
Tous les pays sont indiqués à l'aide des deux lettres renvoyant au code du pays, 
conformément au standard ISO 3166-1 alpha-2.

Clé ``intendedAudience/scope``
''''''''''''''''''''''''''''''

-  Type: tableau de chaînes de caractères
-  Présence: optional
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
-  Présence: optionelle
-  Exemple: ``"Medusa"``

Cette clé représente l'occasion de traduire le nom dans une langue spécifique.
Cette clé contient le nom public (abrégé) du produit. Il s'agit du nom
auquel se réfère la majorité des persones. Si le logiciel a un nom de “code”
en interne et une dénommination commerciale, il est préférable d'indiquer
la dénommination commerciale.

Clé ``description/[lang]/genericName``
''''''''''''''''''''''''''''''''''''''

-  Type: chaîne de cractères (35 caractères max)
-  Présence: obligatoire
-  Exemple: ``"Text Editor"``

Cette clé indique le “nom générique”, en référence à la catégorie spécifique
à laquelle le logiciel appartient. Le nom générique du logiciel se trouve 
généralement dans la présentation du logiciel, lorsque vous écrivez :
“Le logiciel xxx est un.e yyy”. Parmi les exemples notables, il est possible
de mentionner “Éditeur de texte”, “Logiciel de traitement de texte”,
“Moteur de recherche”, “Forum”, etc… Le nom générique peut comporter
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
-  Présence: optionelle

Cette clé contient une référence à la documentation du logiciel à destination 
de l'utilisateur (et non du développeur). La valeur doit être une URL pointant
vers une version hébergée de la documentation.

Il est suggéré que cette URL pointe vers une version hébergée de la
documentation qui est directement lisible via un navigateur web commun,
aux formats bureau et mobile. La documentation doit être publiée en HTML
et explorable comme un site web (avec un index de navigation, une barre
de recherche, etc.).

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

Clé ``description/[lang]/apiDocumentation``
'''''''''''''''''''''''''''''''''''''''''''

-  Type: URL
-  Présence: optionelle

Cette clé contient une référence à la documentation de l’API du logiciel.
La valeur doit être une URL poitant une version hébergée de la documentation.

Il est suggéré que cette URL pointe vers une version hébergée de la
documentation qui est immédiatement lisible via un navigateur web commun.
La documentation doit être publiée en HTML et explorable comme un site web
(avec un index de navigation, une barre de recherche, etc.). S’il y a une
référence ou un test de déploiement, cela devrait permettre de proposer
une interface intéractive (ex. Swagger).

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
-  Présence: obligatoire (pour au moins une langue)

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
peuvent se référer à la documantation pour obtenir des informations
complémentaires, la liste des fonctionnalités n’a pas besoin d’être exhaustive.

Clé ``description/[lang]/screenshots``
''''''''''''''''''''''''''''''''''''''

-  Type: array of strings (chemins)
-  Présence: optionelle
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
-  Présence: optionelle
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
-  Preéence: optionelle

Une liste des récompenses obtenues par le logiciel.

Section ``legal``
~~~~~~~~~~~~~~~~~

Clé ``legal/license``
'''''''''''''''''''''

-  Type: chaînes de caractères
-  Présence: obligatoire
-  Exemple: ``"AGPL-3.0-or-later"``

Cette chaîne de caractères décrit la licence sous laquelle le logiciel
est distribué. La chaîne de caractères doit contenir une expression SPDX
valide, renvoyant à une (ou plusieurs) licence open source. 
Pour plus d’informations, veuillez vous référer à la
`documentation du SPDX <https://spdx.org/licenses/>`__.

Clé ``legal/mainCopyrightOwner``
''''''''''''''''''''''''''''''''

-  Type: chaîne de caractères
-  Présence: optionelle
-  Exemple: ``"City of Amsterdam"``

This string describes the entity that owns the copyright on “most” of
the code in the repository. Normally, this is the line that is reported
with the copyright symbol at the top of most files in the repo.

It is possible to list multiple owners if required so, using an English
sentence. It is also possible to informally refer to a community of
group of people like “Linus Torvalds and all Linux contributors”.

In case it is not possible to name a main copyright owner, it is
possible to omit this key; in those cases, if the repo has a authors
file, you can point to it through ``legal/authorsFile``.

Key ``legal/repoOwner``
'''''''''''''''''''''''

-  Type: string
-  Presence: optional
-  Example: ``"City of Amsterdam"``

This string describes the entity that owns this repository; this might
or might not be the same entity who owns the copyright on the code
itself. For instance, in case of a fork of the original software, the
``repoOwner`` is probably different from the ``mainCopyrightOwner``.

Key ``legal/authorsFile``
'''''''''''''''''''''''''

-  Type: string (path to file)
-  Presence: optional
-  Example: ``"doc/AUTHORS.txt"``

Some open-source software adopt a convention of identify the copyright
holders through a file that lists all the entities that own the
copyright. This is common in projects strongly backed by a community
where there are many external contributors and no clear single/main
copyright owner. In such cases, this key can be used to refer to the
authors file, using a path relative to the root of the repository.

Section ``maintenance``
~~~~~~~~~~~~~~~~~~~~~~~

This section provides information on the maintenance status of the
software, useful to evaluate whether the software is actively developed
or not.

Key ``maintenance/type``
''''''''''''''''''''''''

-  Type: enumerate
-  Presence: mandatory
-  Values: ``"internal"``, ``"contract"``, ``"community"``, ``"none"``

This key describes how the software is currently maintained.

-  ``internal`` - means that the software is internally maintained by the
   repository owner;
-  ``contract`` - means that there is a commercial
   contract that binds an entity to the maintenance of the software;
-  ``community`` - means that the software is currently maintained by one
   or more people that donate their time to the project;
-  ``none`` - means that the software is not actively maintained.

Key ``maintenance/contractors``
'''''''''''''''''''''''''''''''

-  Type: array of Contractor (see below)
-  Presence: mandatory (if ``maintenance/type`` **is** ``contract``)

This key describes the entity or entities, if any, that are currently
contracted for maintaining the software. They can be companies,
organizations, or other collective names.

Key ``maintenance/contacts``
''''''''''''''''''''''''''''

-  Type: List of Contacts (see below)
-  Presence: mandatory (if ``maintenance/type`` **is** ``internal`` or ``community``)

One or more contacts maintaining this software.

This key describes the technical people currently responsible for
maintaining the software. All contacts need to be a physical person, not
a company or an organisation. If somebody is acting as a representative
of an institution, it must be listed within the ``affiliation`` of the
contact.

In case of a commercial agreement (or a chain of such agreements),
specify the final entities actually contracted to deliver the
maintenance. Do not specify the software owner unless it is technically
involved with the maintenance of the product as well.

Section ``localisation``
~~~~~~~~~~~~~~~~~~~~~~~~

This section provides an overview of the localization features of the
software.

Key ``localisation/localisationReady``
''''''''''''''''''''''''''''''''''''''

-  Type: boolean
-  Presence: mandatory

If ``yes``, the software has infrastructure in place or is otherwise
designed to be multilingual. It does not need to be available in more
than one language.

Key ``localisation/availableLanguages``
'''''''''''''''''''''''''''''''''''''''

-  Type: list of IETF BCP 47 language tags
-  Presence: mandatory
-  Example: ``"it"``, ``"en"``, ``"sl-IT-nedis"``

If present, this is the list of languages in which the software is
available. Of course, this list will contain at least one language.
The primary language subtag cannot be omitted, as mandated by the 
`BCP 47 <https://tools.ietf.org/html/bcp47>`__.

Section ``dependsOn``
~~~~~~~~~~~~~~~~~~~~~

This section provides an overview on the system-level dependencies
required to install and use this software.

**NOTE:** do not list dependencies at the source code level (e.g.:
software libraries being used), and focus only on runtime and/or
system-level dependencies that must be installed and maintained
separately. For instance, a database is a good example of such
dependencies.

Key ``dependsOn/open``
''''''''''''''''''''''

-  Type: array of ``dependency`` (see below)
-  Presence: optional

This key contains a list of runtime dependencies that are distributed
under an open-source license.

Key ``dependsOn/proprietary``
'''''''''''''''''''''''''''''

-  Type: array of ``dependency`` (see below)
-  Presence: optional

This key contains a list of runtime dependencies that are distributed
under a proprietary license.

Key ``dependsOn/hardware``
''''''''''''''''''''''''''

-  Type: array of ``dependency`` (see below)
-  Presence: optional

This key contains a list of hardware dependencies that must be owned to
use the software.

Special data formats
--------------------

Dependency
~~~~~~~~~~

A ``dependency`` is a complex object. The properties are the following:

-  ``name`` - **mandatory** - The name of the dependency (e.g. MySQL,
   NFC Reader)
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

   - name: PostgreSQL
     version: "3.2"
     optional: yes

This snippet marks an optional dependency on PostgreSQL exactly version
3.2.

*Ex. 2*

.. code:: yaml

   - name: MySQL
     versionMin: "1.1"
     versionMax: "1.3"

This snippet marks a mandatory dependency on MySQL, allowing any version
between 1.1 and 1.3.

Contact
~~~~~~~

A Contact is an object with the following properties:

-  ``name`` - **mandatory** - This key contains the full name of one of
   the technical contacts. It must be a real person; do NOT populate
   this key with generic contact information, company departments,
   associations, etc.
-  ``email`` - This key contains the e-mail address of the technical
   contact. It must be an email address of where the technical contact
   can be directly reached; do NOT populate this key with mailing-lists
   or generic contact points like “info@acme.inc”. The e-mail address
   must not be obfuscated. To improve resistance against e-mail
   collection, use ``\x64`` to replace ``@``, as allowed by the YAML
   specification.
-  ``phone`` - phone number (with international prefix). This has to be
   a string. 
-  ``affiliation`` - This key contains an explicit affiliation
   information for the technical contact. In case of multiple
   maintainers, this can be used to create a relation between each
   technical contact and each maintainer entity. It can contain for
   instance a company name, an association name, etc.

Contractor
~~~~~~~~~~

A Contractor is an object with the following properties:

-  ``name`` - **mandatory** - The name of the contractor, whether it’s a
   company or a physical person.
-  ``until`` - **mandatory** - This is a date (YYYY-MM-DD). This key
   must contain the date at which the maintenance is going to end. In
   case of community maintenance, the value should not be more than 2
   years in the future, and thus will need to be regularly updated as
   the community continues working on the project.
-  ``email`` - This key contains the e-mail address of the technical
   contact. It must be an email address of where the technical contact
   can be directly reached; do NOT populate this key with mailing-lists
   or generic contact points like “info@acme.inc”. The e-mail address
   must not be obfuscated. To improve resistance against e-mail
   collection, use ``\x64`` to replace ``@``, as allowed by the YAML
   specification.
-  ``website`` - This key points to the maintainer website. It can
   either point to the main institutional website, or to a more
   project-specific page or website.

Dates
~~~~~

All dates in ``publiccode.yml`` must follow the format “YYYY-MM-DD”,
which is one of the ISO8601 allowed encoding. This is the only allowed
encoding though, so not the full ISO8601 is allowed for the date keys.
