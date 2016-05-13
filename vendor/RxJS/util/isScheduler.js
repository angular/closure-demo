goog.module('rxjs$util$isScheduler');
/**
 * @param {?} value
 * @return {?}
 */
function isScheduler(value) {
    return value && typeof ((value)).schedule === 'function';
}
exports.isScheduler = isScheduler;
