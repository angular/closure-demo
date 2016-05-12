OPTS=(
  "--language_in=ES6_STRICT"
  "--language_out=ES5"
  "--compilation_level=SIMPLE_OPTIMIZATIONS"
  "built/{src,gen}/*.js"
  $(find node_modules/@angular/{core,common,platform-browser}/esm -name *.js)
  $(find node_modules/rxjs-es -name *.js)
)
set -ex
java -jar node_modules/google-closure-compiler/compiler.jar $(echo ${OPTS[*]})
