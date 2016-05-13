goog.module('rxjs$util$isDate');
/**
 * @param {?} value
 * @return {?}
 */
function isDate(value) {
    return value instanceof Date && !isNaN(+value);
}
exports.isDate = isDate;
