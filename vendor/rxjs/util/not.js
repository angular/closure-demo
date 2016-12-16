/**
 * @param {?} pred
 * @param {?} thisArg
 * @return {?}
 */
export function not(pred, thisArg) {
    /**
     * @return {?}
     */
    function notPred() {
        return !(((notPred)).pred.apply(((notPred)).thisArg, arguments));
    }
    ((notPred)).pred = pred;
    ((notPred)).thisArg = thisArg;
    return notPred;
}
