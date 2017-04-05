set -e

JVM_ARGS=""
# To attach a remote debugger:
#JVM_ARGS="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=5005"

java $JVM_ARGS -jar node_modules/google-closure-compiler/compiler.jar\
  --flagfile closure.conf \
  $(find vendor/built/rxjs -name *.js) \
  built/*.js

# measure the sizes of scripts the user will need to load
for script in dist/bundle.js node_modules/zone.js/dist/zone.min.js; do
  gzip --keep -f $script
  # requires brotli
  # on Mac: brew install brotli
  bro --force --quality 10 --input $script --output $script.brotli
  ls -alH ${script}*
done
