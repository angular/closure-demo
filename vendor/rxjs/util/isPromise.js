/**
 * @param {?} value
 * @return {?}
 */
export function isPromise(value) {
    return value && typeof ((value)).subscribe !== 'function' && typeof ((value)).then === 'function';
}
