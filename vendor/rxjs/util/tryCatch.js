import { errorObject } from './errorObject';
let /** @type {?} */ tryCatchTarget;
/**
 * @this {?}
 * @return {?}
 */
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject.e = e;
        return errorObject;
    }
}
/**
 * @param {?} fn
 * @return {?}
 */
export function tryCatch(fn) {
    tryCatchTarget = fn;
    return (tryCatcher);
}
;
