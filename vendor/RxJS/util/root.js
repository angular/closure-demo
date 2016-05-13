goog.module('rxjs$util$root');
let /** @type {?} */ objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
};
exports.root = (objectTypes[typeof self] && self) || (objectTypes[typeof window] && window);
/* tslint:disable:no-unused-variable */
let /** @type {?} */ freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
let /** @type {?} */ freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
let /** @type {?} */ freeGlobal = objectTypes[typeof global] && global;
if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    exports.root = freeGlobal;
}
