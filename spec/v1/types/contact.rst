.. _contact-type:

Contact
*******

Properties:

-  ``name`` *(required)*, :ref:`string <string-type>`: The full name
   of the technical contact. It MUST be a real person, not generic
   contact information, a company department or an association.
-  ``email``, :ref:`e-mail address <email-type>`: The e-mail address
   of the technical contact. It MUST reach the contact directly, not a
   mailing list or a generic contact point like ``info@acme.inc``.
-  ``phone``, :ref:`string <string-type>`: The phone number, in
   `E.164 <https://www.itu.int/rec/T-REC-E.164/en>`_ format. It MUST
   include the international dialing prefix (e.g.
   ``+3923113215112``).
-  ``affiliation``, :ref:`string <string-type>`: The organisation the
   technical contact works for, such as a company or an association.
   With several maintainers, it tells which maintainer entity each
   contact belongs to.
