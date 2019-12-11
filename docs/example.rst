Esempi
==========================

Below there are two examples of `publiccode.yml` files, the first one
represents the minimum configuration, which contains the mandatory fields,
whilst the second one represents a more extended version. 

Minimum Version
~~~~~~~~~~~~~~~

.. code-block:: yaml
   :linenos:

   publiccodeYmlVersion: "0.2"

   name: Medusa
   url: "https://example.com/italia/medusa.git"
   softwareVersion: "dev"    # Optional
   releaseDate: "2017-04-15"
   platforms:
     - web

   categories:
     - financial-reporting

   developmentStatus: development

   softwareType: "standalone/desktop"

   description:
     en:
       localisedName: medusa   # Optional
       genericName: Text Editor
       shortDescription: >
             A rather short description which
             is probably useless

       longDescription: >
             Very long description of this software, also split
             on multiple rows. You should note what the software
             is and why one should need it. We can potentially
             have many pages of text here.

       features:
          - Just one feature

   legal:
     license: AGPL-3.0-or-later

   maintenance:
     type: "community"

     contacts:
       - name: Francesco Rossi

   localisation:
     localisationReady: yes
     availableLanguages:
       - en

Extended Version
~~~~~~~~~~~~~~~

.. code-block:: yaml
   :linenos:

   publiccodeYmlVersion: "0.2"

   name: Medusa
   applicationSuite: MegaProductivitySuite
   url: "https://example.com/italia/medusa.git"
   landingURL: "https://example.com/italia/medusa"
   isBasedOn: "https://github.com/italia/otello.git"
   softwareVersion: "1.0"
   releaseDate: "2017-04-15"
   logo: img/logo.svg
   monochromeLogo: img/logo-mono.svg

   inputTypes:
     - text/plain
   outputTypes:
     - text/plain

   platforms:
     - android
     - ios

   categories:
     - content-management
     - office

   usedBy:
     - Comune di Firenze
     - Comune di Roma

   roadmap: "https://example.com/italia/medusa/roadmap"

   developmentStatus: development

   softwareType: "standalone/desktop"

   intendedAudience:
     scope:
       - science-and-technology
     countries:
       - it
       - de
     unsupportedCountries:
       - us

   description:
     en:
       localisedName: Medusa
       genericName: Text Editor
       shortDescription: >
             This description can have a maximum 150
             characters long. We should not fill the
             remaining space with "Lorem Ipsum". End

       longDescription: >
             Very long description of this software, also split
             on multiple rows. You should note what the software
             is and why one should need it.

       documentation: "https://read.the.documentation/medusa/v1.0"
       apiDocumentation: "https://read.the.api.doc/medusa/v1.0"

       features:
          - Very important feature
          - Will run without a problem
          - Has zero bugs
          - Solves all the problems of the world
       screenshots:
          - img/sshot1.jpg
          - img/sshot2.jpg
          - img/sshot3.jpg
       videos:
          - https://youtube.com/xxxxxxxx
       awards:
          - 1st Price Software of the year

   legal:
     license: AGPL-3.0-or-later
     mainCopyrightOwner: City of Chicago
     repoOwner: City of Chicago
     authorsFile: AUTHORS

   maintenance:
     type: "contract"

     contractors:
       - name: "Fornitore Privato SPA"
         email: "dario.bianchi@fornitore.it"
         website: "https://privatecompany.com"
         until: "2019-01-01"

     contacts:
       - name: Francesco Rossi
         email: "francesco.rossi@comune.reggioemilia.it"
         affiliation: Comune di Reggio Emilia
         phone: "+3923113215112"

   localisation:
     localisationReady: yes
     availableLanguages:
       - en
       - it
       - fr
       - de

   dependsOn:
     open:
       - name: MySQL
         versionMin: "1.1"
         versionMax: "1.3"
         optional: yes
       - name: PostgreSQL
         version: "3.2"
         optional: yes
     proprietary:
       - name: Oracle
         versionMin: "11.4"
       - name: IBM SoftLayer
     hardware:
       - name: NFC Reader
         optional: yes

   it:
     countryExtensionVersion: "0.2"

     conforme:
       lineeGuidaDesign: yes
       modelloInteroperabilita: yes
       misureMinimeSicurezza: yes
       gdpr: yes

     piattaforme:
       spid: yes
       cie: yes
       anpr: yes
       pagopa: yes

     riuso:
       codiceIPA: c_h501
