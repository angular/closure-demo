[![CircleCI](https://circleci.com/gh/angular/closure-demo.svg?style=svg)](https://circleci.com/gh/angular/closure-demo)

This repo is the demo/seed for bunding an Angular application with Google Closure Compiler.
It contains a minimal Hello World application with a single component.

**The compressed (brotli) JS size for an Angular 7.2.13 Hello World app is 58.28kb.**

```
-rw-r--r-- 46762 Apr 24 11:28 dist/bundle.js.brotli
-rw-r--r-- 53282 Apr 24 11:28 dist/bundle.js.gz
-rw-r--r-- 12917 Apr 24 11:28 node_modules/zone.js/dist/zone.min.js.brotli
-rw-r--r-- 14156 Feb  4 10:42 node_modules/zone.js/dist/zone.min.js.gz
```

See https://github.com/angular/angular/issues/8550 for more context.

# Try it

First, install [brotli], which is a more modern compression algorithm than gzip.
It gives a 13% smaller JS file, no work required!
The commands below use it, but you don't have to.

On Mac, `brew install brotli`.

``` shell
$ yarn install
$ yarn run build
$ yarn run serve
```

[brotli]: https://github.com/google/brotli

## Where does the size come from?

``` shell
$ yarn run explore
```

# Notes

Requires Node >= 6.x since the `ngc` tool (and its deps) are now shipped as ES6 as well.

Requires Java installed to run the Closure Compiler. We recommend installing http://zulu.org/download-dev/.
