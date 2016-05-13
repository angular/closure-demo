goog.module('rxjs$util$isObject');
/**
 * @param {?} x
 * @return {?}
 */
function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
