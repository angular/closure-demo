goog.module('rxjs$util$not');
/**
 * @param {?} pred
 * @param {?} thisArg
 * @return {?}
 */
function not(pred, thisArg) {
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
exports.not = not;
