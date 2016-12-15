OPTS=(
  "--language_in=ES6_STRICT"
  "--language_out=ES5"
  "--compilation_level=ADVANCED_OPTIMIZATIONS"
  "--js_output_file=dist/bundle.js"
  "--entry_point=./built/bootstrap"
  "--variable_renaming_report=dist/variable_renaming_report"
  "--property_renaming_report=dist/property_renaming_report"
  "--js_module_root=node_modules"
  "built/*.js"
  $(find node_modules/zone.js/dist -name *.js)
  node_modules/@angular/{core,common,compiler,platform-browser}/index.js
  $(find node_modules/@angular/{core,common,compiler,platform-browser}/src -name *.js)
  $(find node_modules/rxjs -name *.js)
)
set -ex
java -jar node_modules/google-closure-compiler/compiler.jar $(echo ${OPTS[*]})
gzip --keep -f dist/bundle.js
# requires brotli
# on Mac: brew install brotli
bro --force --quality 10 --input dist/bundle.js --output dist/bundle.js.brotli
ls -alH dist
