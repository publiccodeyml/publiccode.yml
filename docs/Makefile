# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = sphinx-build
SOURCEDIR     = .
BUILDDIR      = _build

LOCALES       = $$(echo $(wildcard locales/??) | sed s@locales/@@g)
POT_DIR       = _build/gettext

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
	@echo
	@echo publiccode.yml
	@echo "  \e[31m\e[1mclean\e[0m" "\t" "Clean the build environment"
	@echo "  \e[31m\e[1mpot_merge_po\e[0m" "\t" "Update the POT file and the language POs"
	@echo "  \e[31m\e[1mdoc\e[0m" "\t\t" "Build the standard in all the languages"

.PHONY: help Makefile

clean:
	rm -fr $(BUILDDIR)/??
	rm -f locales/??/LC_MESSAGES/*.mo

pot_merge_po: gettext
	@LANG_OPTS=$$(echo $(LOCALES) | sed -E 's@([[:alpha:]]*)*@-l \1@g'); \
	sphinx-intl update -p "${POT_DIR}" $${LANG_OPTS}

doc: clean
	@for lang in $(LOCALES); \
		do make -e SPHINXOPTS="-D language=$${lang}" -e BUILDDIR="_build/$${lang}" rst; \
	done

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
