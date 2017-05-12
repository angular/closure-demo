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
