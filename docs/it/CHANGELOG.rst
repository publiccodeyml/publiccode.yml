Changelog
=========

Tutti i cambiamenti di questo progetto saranno documentati in questo
file.

[core-0.2/it-0.2] - 2019-03-13
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Aggiunte
''''''''

-  Una nuova sezione denominata ``piattaforme`` è stata creata.

Cambiamenti
'''''''''''

-  La chiave ``conforme/accessibile`` diventa ``conforme/lineeGuidaDesign``
   siccome è più autoesplicativa.
-  La chiave ``conforme/interoperabile`` diventa
   ``conforme/modelloInteroperabilita`` siccome è più autoesplicativa.
-  La chiave ``conforme/sicuro`` diventa
   ``conforme/misureMinimeSicurezza`` siccome prima era vaga e incompleta. 
-  La chiave ``conforme/privacy`` diventa ``conforme/gdpr`` siccome il termine
   ``privacy`` è vago e incompleto.

Rimozioni
'''''''''

-  La chiave ``ecosistemi`` è stata rimossa siccome i suoi valori sono già
   presenti all'interno della chiave ``intendedAudience/scope``. 
-  La sezione ``designKit`` è stata rimossa siccome tracceremo l'utilizzo dei
   design kit attraverso il crawler.

[core-0.2] - 2019-03-11
~~~~~~~~~~~~~~~~~~~~~~~

.. _added-1:

Aggiunte
''''''''

-  Una nuova chiave denominata ``countryExtensionVersion`` è stata aggiunta per
   separarne il versionamento dal core.
-  Il valore ``standalone`` per il ``softwareType`` è stato deprecato in favore
   di valori più specifici quali: ``standalone/mobile``,
   ``standalone/iot``, ``standalone/desktop``, ``standalone/web``,
   ``standalone/backend``, ``standalone/other``

.. _changed-1:

Cambiamenti
'''''''''''

-  La chiave ``intendedAudience/onlyFor`` è stata rinominata in
   ``intendedAudience/scope`` (con un diverso dizionario di valori).
-  La chiave ``tags`` è stata sostituita da ``categories`` (con un diverso dizionario di
   valori).
-  BCP47 è ora utilizzato al posto dell'ISO 639-2, quindi le chiavi presenti
   sotto a ``description`` appariranno ora come ``en`` invece che ``eng``
-  La chiave ``publiccode-yaml-version`` è stata rinominata come ``publiccodeYmlVersion``
   usando lo stile camelCase
-  La chiave ``maintenance/contacts`` è ora obbligatoria se e solo se 
   ``maintenance/type`` è ``internal`` oppure ``community``.
-  Tutti i file sono stati portati al formato RST da MD. 

.. _removed-1:

Rimozioni
'''''''''

-  La chiave ``freeTags`` è stata rimossa. 

[core-0.1] - 2019-01-25
~~~~~~~~~~~~~~~~~~~~~~~

.. _added-2:

Aggiunte
''''''''

-  File per la prima release 

Il formato del file è basato su `Keep a
Changelog <https://keepachangelog.com/en/1.0.0/>`__, e questo progetto aderisce
al 
`Semantic
Versioning <https://semver.org/spec/v2.0.0.html>`__.
