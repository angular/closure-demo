FROM node:6.10.2-slim

RUN \
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  wget -q -O - https://bazel.build/bazel-release.pub.gpg | apt-key add -

RUN \
  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
  echo "deb http://debian.fastweb.it/debian stretch main contrib" > /etc/apt/sources.list.d/stretch.list && \
  echo "deb [arch=amd64] http://storage.googleapis.com/bazel-apt stable jdk1.8" > /etc/apt/sources.list.d/bazel.list

RUN apt-get update
RUN apt-get install -y \
    google-chrome-stable \
    xvfb \
    openjdk-8-jdk \
    ssh \
    git \
    gcc \
    bazel \
    brotli/stretch

RUN rm -rf /var/lib/apt/lists/*

# Fix for the issue with Selenium, as described here:
# https://github.com/SeleniumHQ/docker-selenium/issues/87
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null

ENTRYPOINT ["/bin/bash"]
