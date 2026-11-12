.. _`estensioni-paese`:

Sezioni specifiche per Paese (*deprecate*)
==========================================

Le sezioni specifiche per Paese sono deprecate e saranno rimosse in
publiccode.yml 1.0. I casi d'uso che coprivano si esprimono ora con chiavi
generiche: dichiara la conformità a regolamenti nazionali o l'integrazione
con piattaforme nazionali con la chiave ``supports``, e indica
l'amministrazione che pubblica il software con la chiave ``organisation``.

Le sezioni specifiche per paese permettono di includere informazioni rilevanti
solo per un determinato Paese, come la conformità a regolamenti nazionali o
l'integrazione con piattaforme nazionali.

Ogni sezione è identificata con l'\ `ISO 3166-1 alpha-2 country code
<https://it.wikipedia.org/wiki/ISO_3166-1_alpha-2>`__ del Paese in minuscolo
(*deprecato*) o in maiuscolo.

Attualmente, l'unica sezione specifica per Paese definita è quella italiana (``IT:``).

.. include:: schema.it.rst
