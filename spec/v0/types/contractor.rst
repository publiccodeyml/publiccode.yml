.. _contractor-type:

Contractor
**********

A Contractor is a mapping with the following keys:

-  ``name`` - **mandatory** - The name of the contractor, whether it’s a
   company or a physical person.
-  ``until`` - **mandatory** - This is a :ref:`date <date-type>`
   (YYYY-MM-DD). This key must contain the date at which the
   maintenance is going to end.
-  ``email`` - This key contains the e-mail address of the contractor.
   It must be an email address where the contractor can be directly
   reached; do NOT populate this key with mailing-lists or generic
   contact points like “info@example.com”.
-  ``website`` - This key points to the maintainer website. It can
   either point to the main institutional website, or to a more
   project-specific page or website.
