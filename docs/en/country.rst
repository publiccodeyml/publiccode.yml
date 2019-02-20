.. _`country-extension`:

Country-Specific Sections
=========================

While the standard is structured to be meaningful on an international
level, there are additional information that can be added that makes
sense in specific countries, such as declaring compliance with local
laws or regulations. The provided extension mechanism is the usage of
country-specific sections.

All country-specific extensions are contained in a section named with
the two-letter lowercase `ISO 3166-1 alpha-2 country
code <https://it.wikipedia.org/wiki/ISO_3166-1_alpha-2>`__. For instance
``spid`` is a property for Italian software declaring whether the
software is integrated with the Italian Public Identification System.

If a software is compliant I will find:

.. code:: .yaml

   it:
     spid: yes

Notice that country-specific extensions within international sections
are not allowed. Countries that want to extend the format should add a
country-specific section instead.

Documentation for the keys contained in a country specific section is
maintained in separate files.

-  Italy: :ref:`italia-extensions`. 
