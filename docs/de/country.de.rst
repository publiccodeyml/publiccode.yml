.. _`country-extension`:

Länderspezifische Extensions
===========================

Zwar ist der Standard so strukturiert, dass er international genutzt werden kann, dennoch können Informationen eingefügt werden, die in bestimmten Ländern nützlich sind, z. B. die Angabe, dass bestimmte nationale Gesetze oder Regelungen eingehalten werden.

Alle länderspezifischen Extensions sind in einer Sektion enthalten, die mit dem aus zwei Kleinbuchstaben (*veraltet*) oder Großbuchstaben bestehenden Ländercode gemäß `ISO 3166-1 alpha-2 country code <https://it.wikipedia.org/wiki/ISO_3166-1_alpha-2>`__ bezeichnet ist. Z. B. handelt es sich bei ``spid`` um eine Eigenschaft für italienische Software, die angibt, ob die Software in das italienische öffentliche Identifikationssystem integriert ist.

Ist dies der Fall, wird dies folgendermaßen angegeben:

.. code:: yaml

   it:
     countryExtensionVersion: "0.2"
     piattaforme:
      - spid: yes

Es ist zu beachten, dass länderspezifische Extensions in internationalen Sektionen des Kerns nicht erlaubt sind. Dafür sollten länderspezifische Sektionen hinzugefügt werden.

.. include:: schema.it.rst
