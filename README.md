This repo is a proof-of-concept for bunding an Angular application with Google Closure Compiler.
It contains a minimal Hello World application with a single component.

This example app builds a *single* `.js` file for an Angular 2 application.
No other scripts are needed (eg. zone.js)

The current size is:
```
-rw-r--r--  1 alexeagle  eng  120236 Dec 16 16:20 dist/bundle.js
-rw-------  1 alexeagle  eng   31768 Dec 16 16:20 dist/bundle.js.brotli
-rw-r--r--  1 alexeagle  eng   36585 Dec 16 16:20 dist/bundle.js.gz
```

At NgConf'16 we announced a 21.6k bundle, but this did not include zone.js.
The `angular2-polyfills.min.js` file from that era was 28k, so the total JS
payload for an Angular app was about 50k.
So as of December 2016 we have a 32% reduction in total payload.

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
