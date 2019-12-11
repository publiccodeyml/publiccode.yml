#!/usr/bin/env bash

set -o errexit -o nounset -o pipefail

show_help() {
cat << EOF
Usage:
    Extract new strings to translate and update POTs and PO files, if needed.
    $0 generate_pot_merge_po

    Generate RST files for all available translations.
    $0 generate_doc

    Print this help
    $0 --help or -v
EOF
}

# Autodetect the available locales in the locale/ directory.
LOCALES=(locales/??)
LOCALES=("${LOCALES[@]/locales\//}")

POT_DIR="_build/gettext/"

COMMAND=${1:-}

case "${COMMAND}" in
    generate_pot_merge_po)
        make gettext

        LANG_OPTS=$(printf -- "-l %s " "${LOCALES[@]}")
        sphinx-intl update -p "${POT_DIR}" ${LANG_OPTS}
        ;;
    generate_doc)
        # FIXME: Look into Sphinx not detecting when the .mo changes.
        make clean

        LANG_OPTS=$(printf -- "-D language=%s " "${LOCALES[@]}")

        for lang in "${LOCALES[@]}"; do
            make -e SPHINXOPTS="-D language=${lang}" -e BUILDDIR="_build/${lang}" rst
        done
        ;;
    ""|-h|--help|*)
        show_help
        ;;
esac
