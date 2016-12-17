OPTS=(
  "--language_in=ES6_STRICT"
  "--language_out=ES5"
  "--compilation_level=ADVANCED_OPTIMIZATIONS"
  "--js_output_file=dist/bundle.js"
  "--create_source_map=%outname%.map"
  "--variable_renaming_report=dist/variable_renaming_report"
  "--property_renaming_report=dist/property_renaming_report"

  # Don't include ES6 polyfills
  "--rewrite_polyfills=false"

  # List of path prefixes to be removed from ES6 & CommonJS modules.
  "--js_module_root=node_modules"
  "--js_module_root=vendor"

  # Uncomment for easier debugging
  # "--formatting=PRETTY_PRINT"

  node_modules/zone.js/dist/zone.js
  $(find vendor/rxjs -name *.js)
  node_modules/@angular/{core,common,compiler,platform-browser}/index.js
  $(find node_modules/@angular/{core,common,compiler,platform-browser}/src -name *.js)
  "built/*.js"
  "--entry_point=./built/bootstrap"
)

set -ex
java -jar node_modules/google-closure-compiler/compiler.jar $(echo ${OPTS[*]})
gzip --keep -f dist/bundle.js
# requires brotli
# on Mac: brew install brotli
bro --force --quality 10 --input dist/bundle.js --output dist/bundle.js.brotli
ls -alH dist/bundle*
