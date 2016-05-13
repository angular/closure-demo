goog.module('rxjs$util$isPromise');
/**
 * @param {?} value
 * @return {?}
 */
function isPromise(value) {
    return value && typeof ((value)).subscribe !== 'function' && typeof value.then === 'function';
}
exports.isPromise = isPromise;
