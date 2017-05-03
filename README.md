[![CircleCI](https://circleci.com/gh/alexeagle/closure-compiler-angular-bundling/tree/master.svg?style=shield)](https://circleci.com/gh/alexeagle/closure-compiler-angular-bundling/tree/master)


This repo is the demo/seed for bunding an Angular application with Google Closure Compiler.
It contains a minimal Hello World application with a single component.

**The compressed JS size for an Angular 4.0.1 Hello World app is 36kb.**

```
-rw-r--r--  1 alexeagle  eng  28932 Apr  7 13:19 dist/bundle.js.brotli
-rw-r--r--  1 alexeagle  eng  33110 Apr  7 13:19 dist/bundle.js.gz
-rw-------  1 alexeagle  eng  7717 Apr  7 13:19 node_modules/zone.js/dist/zone.min.js.brotli
-rw-r--r--  1 alexeagle  eng  8621 Feb 17 10:21 node_modules/zone.js/dist/zone.min.js.gz
```

See https://github.com/angular/angular/issues/8550 for more context.

# Try it

``` shell
$ yarn install
$ yarn run build
$ yarn run serve
```

## Where does the size come from?

``` shell
$ yarn run explore
```

# Notes

Requires Node >= 6.x since the `ngc` tool (and its deps) are now shipped as ES6 as well.

Requires Java installed to run the Closure Compiler. We recommend installing http://zulu.org/download-dev/.

## TODO
- Remove the dependency on locally-installed Java: https://github.com/google/closure-compiler/issues/2412
- Allow comments in the closure.conf file https://github.com/google/closure-compiler/issues/2413
- Solve closure bug with rxjs files w/o exports https://github.com/google/closure-compiler/issues/2247
- Extend the demo to use a 3rd party component, like @angular/material
