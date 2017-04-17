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
$ python -m SimpleHTTPServer
```

## Where does the size come from?

``` shell
$ yarn run explore
```

# Notes

Requires Node >= 6.x since the `ngc` tool (and its deps) are now shipped as ES6 as well.

Requires Java installed to run the Closure Compiler. We recommend installing http://zulu.org/download-dev/.

## RxJS distros
Angular depends on RxJS and the size of the bundle depends on how well we can tree-shake Rx operators.

The above measurement uses an ES6 build of RxJS. See `vendor/tsconfig.rxjs-es6.json` in this
repo. However, RxJS has no such public distro.

Another option is to build RxJS as ES5+esm. See `vendor/tsconfig.rxjs-es5+esm.json` in this
repo, and change the `postinstall` line in package.json to switch.

Yet another option is to build with ES6 and `@angular/tsc-wrapped` which does some extra
closure output using the tsickle package. This is unneeded because RxJS is already closure-compatible.

The application size seems about the same regardless of which option is used; ES6 is about 1% smaller.

## TODO
- Remove the dependency on locally-installed Java: https://github.com/google/closure-compiler/issues/2412
- Determine whether rxjs needs to be distributed in ES2015 to make the bundle smaller.
- Need rxjs to produce a closure-compatible distro. See https://github.com/ReactiveX/rxjs/issues/2335
- Distribute zone_externs.js with zone https://github.com/angular/zone.js/issues/727
- Distribute testability_externs.js with Angular https://github.com/angular/angular/issues/11119
- Allow comments in the closure.conf file https://github.com/google/closure-compiler/issues/2413
- Solve closure bug with rxjs files w/o exports https://github.com/google/closure-compiler/issues/2247
- Remove the hack of needing node_modules/rxjs for nodejs and vendor/rxjs for browser
- Extend the demo to use a 3rd party component, like @angular/material
