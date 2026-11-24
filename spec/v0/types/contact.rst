.. _contact-type:

Contact
*******

A Contact is a mapping with the following keys:

-  ``name`` - **mandatory** - This key contains the full name of one of
   the technical contacts. It must be a real person; do NOT populate
   this key with generic contact information, company departments,
   associations, etc.
-  ``email`` - This key contains the e-mail address of the technical
   contact. It must be an email address where the technical contact
   can be directly reached; do NOT populate this key with mailing-lists
   or generic contact points like “info@example.com”.
-  ``phone`` - phone number. It SHOULD include the international
   prefix, following the `E.164 <https://www.itu.int/rec/T-REC-E.164/en>`_
   format (e.g. ``+3923113215112``). This has to be a string.
-  ``affiliation`` - This key contains an explicit affiliation
   information for the technical contact. In case of multiple
   maintainers, this can be used to create a relation between each
   technical contact and each maintainer entity. It can contain for
   instance a company name, an association name, etc.
