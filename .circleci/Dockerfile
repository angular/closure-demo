FROM node:6.10.2-slim

RUN \
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
  apt-get update && \
  apt-get install -y google-chrome-stable xvfb openjdk-7-jdk ssh git gcc && \
  rm -rf /var/lib/apt/lists/*

RUN \
  echo "deb http://debian.fastweb.it/debian stretch main contrib" > /etc/apt/sources.list.d/stretch.list && \
  apt-get update && apt-get install brotli/stretch

# Fix for the issue with Selenium, as described here:
# https://github.com/SeleniumHQ/docker-selenium/issues/87
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null

ENTRYPOINT ["/bin/bash"]
