This repo is a proof-of-concept for bunding an Angular application with Google Closure Compiler.
It contains a minimal Hello World application with a single component.

**The current compressed JS size for an Angular Hello World app is 28kb.**

```
++ ls -alH dist/bundle.js dist/bundle.js.brotli dist/bundle.js.gz dist/bundle.js.map
-rw-r--r--  1 alexeagle  eng   77541 Jan 17 14:19 dist/bundle.js
-rw-r--r--  1 alexeagle  eng   21379 Jan 17 14:19 dist/bundle.js.brotli
-rw-r--r--  1 alexeagle  eng   24512 Jan 17 14:19 dist/bundle.js.gz
-rw-r--r--  1 alexeagle  eng  214850 Jan 17 14:19 dist/bundle.js.map
++ ls -alH node_modules/zone.js/dist/zone.min.js node_modules/zone.js/dist/zone.min.js.brotli node_modules/zone.js/dist/zone.min.js.gz
-rw-r--r--  1 alexeagle  eng  24490 Jan 12 18:12 node_modules/zone.js/dist/zone.min.js
-rw-------  1 alexeagle  eng   7270 Jan 17 14:19 node_modules/zone.js/dist/zone.min.js.brotli
-rw-r--r--  1 alexeagle  eng   8114 Jan 12 18:12 node_modules/zone.js/dist/zone.min.js.gz
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
$ npm run explore
```

# Notes

This requires an ES6 distro of Angular. These snapshots are published on green Angular
builds, see the locations in `package.json` where these come from.

Requires Node 6.x since the `ngc` tool (and its deps) are now shipped as ES6 as well.

## RxJS distros
Angular depends on RxJS and the size of the bundle depends on how well we can tree-shake Rx operators.

The above measurement uses an ES6 build of RxJS. See `vendor/tsconfig.rxjs-es6.json` in this
repo. However, RxJS has no such public distro.

Another option is to build RxJS as ES5+esm. See `vendor/tsconfig.rxjs-es5+esm.json` in this
repo, and change the `postinstall` line in package.json to switch.

Yet another option is to build with ES6 and `@angular/tsc-wrapped` which does some extra
closure output using the tsickle package.

The application size seems about the same regardless of which option is used.

## TODO
- Need rxjs to produce a closure-compatible ES6 distro, don't use my branch.
  See https://github.com/ReactiveX/rxjs/issues/2335
- Remove the hack of needing node_modules/rxjs for nodejs and vendor/rxjs for browser
- Extend the demo to use a 3rd party component, like @angular/material
