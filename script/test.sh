#!/usr/bin/env bash
set -e # halt script on error

# Build the site
bundle exec jekyll build

# Check for broken links and missing alt tags, ignore edit links to GitHub as they might not exist yet
bundle exec htmlproofer --url-ignore "/github.com/(.*)/edit/" ./_site
