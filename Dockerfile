FROM ruby:2.4.0-alpine
# Add files
WORKDIR /usr/src/yml.publiccode.net
ADD . .
# Install jekyll plugins
RUN apk add --no-cache --virtual .build-deps build-base ruby-dev
RUN bundle install
ENTRYPOINT ["bundle", "exec", "jekyll", "serve", "--incremental", "--force_polling", "-H", "0.0.0.0", "-P", "4000" ]
