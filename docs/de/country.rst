.. _`country-extension`:

Länderspezifische Extensions (*veraltet*)
=========================================

Länderspezifische Sektionen sind veraltet und werden in publiccode.yml 1.0
entfernt. Ihre Anwendungsfälle werden jetzt mit allgemeinen Schlüsseln
ausgedrückt: Die Einhaltung nationaler Regelungen oder die Integration in
nationale Plattformen wird mit dem Schlüssel ``supports`` angegeben, die
veröffentlichende Verwaltung mit dem Schlüssel ``organisation``.

Länderspezifische Sektionen ermöglichen die Angabe von Informationen, die nur
in einem bestimmten Land relevant sind, etwa die Einhaltung nationaler
Regelungen oder die Integration in nationale Plattformen.

Jede Sektion wird durch einen Ländercode aus zwei Kleinbuchstaben
(*veraltet*) oder Großbuchstaben gemäß `ISO 3166-1 alpha-2
<https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`__ gekennzeichnet.

Derzeit ist nur die italienische länderspezifische Sektion (``IT:``) definiert.

.. include:: ../standard/schema.it.rst
