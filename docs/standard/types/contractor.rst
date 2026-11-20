.. _contractor-type:

Contractor
**********

Properties:

-  ``name`` (**required**), :ref:`string <string-type>`: The name of the
   company or person providing maintenance.
-  ``until`` (**required**), :ref:`date <date-type>`: The date the
   maintenance is going to end.
-  ``email``, :ref:`e-mail address <email-type>`: The e-mail address
   of the technical contact. It MUST reach that person directly, not a
   mailing list or a generic contact point like ``info@acme.inc``.
-  ``website``, :ref:`URL <url-type>`: The contractor website: its
   main institutional site or a page specific to the project.

.. code-block:: yaml
   :caption: Example

   - name: Example Software Ltd
     until: "2027-12-31"
     email: firefax-maintenance@supplier.example.com
     website: https://supplier.example.com
