/**
 * @owner Observable
 * @this {?}
 * @param {?} func
 * @return {?}
 */
export function letProto(func) {
    return func(this);
}
