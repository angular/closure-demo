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
$ npm install
$ npm run build
$ python -m SimpleHTTPServer
```

## Where does the size come from?

``` shell
$ npm run explore
```

# Notes

This requires an ES6 distro of Angular.
I have published my own personal snapshot, which is built from this branch:
https://github.com/alexeagle/angular/tree/closure

See package.json for how this is used in the demo.

Requires Node 6.x since the `ngc` tool (and its deps) are now shipped as ES6 as well.

Requires building rxjs from https://github.com/alexeagle/rxjs/tree/closure2
using `npm run compile_dist_es6_for_closure`. Copy this into the `vendor` directory.

## TODO
- Get an official Angular distro with ES6, don't use my branch.
- Need rxjs to produce a closure-compatible ES6 distro, don't use my branch.
- Remove the hack of needing node_modules/rxjs for nodejs and vendor/rxjs for browser
- Extend the demo to use a 3rd party component, like @angular/material
