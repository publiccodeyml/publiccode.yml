.. _`country-section`:

Country-specific sections (*deprecated*)
========================================

Country-specific sections are deprecated and will be removed in
publiccode.yml 1.0. The use cases they covered are now expressed with
generic keys: declare compliance with national regulations or
integration with national platforms through the ``supports`` key, and
reference the publishing administration through the ``organisation`` key.

Country-specific sections allow including information relevant only within a
given country, such as compliance with national regulations or integration with
national platforms.

Each section is identified by a two-letter ISO 3166-1 alpha-2 country code
lowercase (*deprecated*) or uppercase `ISO 3166-1 alpha-2 country
codes <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`__.

Currently, the only defined country-specific section is the Italian one (``IT:``).

.. include:: schema.it.rst
