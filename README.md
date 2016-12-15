This repo is a proof-of-concept for bunding an Angular 2 application with Google Closure Compiler.

See https://github.com/angular/angular/issues/8550#issuecomment-218908407

# Notes

This requires an ES6 distro of Angular, but none is currently published.
I have published my own personal snapshot, which is built from this branch:
https://github.com/alexeagle/angular/tree/closure

See package.json for how this is used in the demo.

Requires Node 6.x since the `ngc` tool (and its deps) are now shipped as ES6 as well.

Requires building rxjs from https://github.com/alexeagle/rxjs/tree/closure2
using `npm run compile_dist_es6_for_closure`

## TODO
- Make a closure-compatible ES6 distro of rxjs
- Get the build to succeed
- Make sure the optimized application works
- Extend the demo to use a 3rd party component, like @angular/material

# Try it
`npm install`
`npm run build`
`python -m SimpleHTTPServer`
