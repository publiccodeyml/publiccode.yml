.. _contractor-type:

Contractor
**********

Properties:

-  ``name`` (**required**), :ref:`string <string-type>`: The name of the
   company or person providing maintenance.
-  ``until`` (**required**), :ref:`date <date-type>`: The date the
   maintenance is going to end. For community maintenance, it SHOULD
   be no more than two years in the future. Update it regularly while
   the community maintains the software.
-  ``email``, :ref:`e-mail address <email-type>`: The e-mail address
   of the technical contact. It MUST reach that person directly, not a
   mailing list or a generic contact point like ``info@acme.inc``.
-  ``website``, :ref:`URL <url-type>`: The contractor website: its
   main institutional site or a page specific to the project.
