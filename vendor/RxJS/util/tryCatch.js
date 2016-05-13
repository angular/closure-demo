goog.module('rxjs$util$tryCatch');
var errorObject_1 = goog.require('rxjs$util$errorObject');
let /** @type {?} */ tryCatchTarget;
/**
 * @return {?}
 */
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
/**
 * @param {?} fn
 * @return {?}
 */
function tryCatch(fn) {
    tryCatchTarget = fn;
    return (tryCatcher);
}
exports.tryCatch = tryCatch;
;
