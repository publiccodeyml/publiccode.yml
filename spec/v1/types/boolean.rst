.. _boolean-type:

Boolean
*******

``true`` or ``false``, unquoted.

.. tip::

   YAML 1.2 reads ``yes``, ``no``, ``on`` and ``off`` as strings, like
   any quoted value such as ``"true"``, so they are an error where a
   boolean is expected. Files written for early versions of the
   Standard often use them: write ``localisationReady: true``, not
   ``localisationReady: yes``.
