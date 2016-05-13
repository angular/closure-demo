goog.module('rxjs$operator$partition');
var not_1 = goog.require('rxjs$util$not');
var filter_1 = goog.require('rxjs$operator$filter');
/**
 * @method partition
 * @owner Observable
 * @param {?} predicate
 * @param {?=} thisArg
 * @return {?}
 */
function partition(predicate, thisArg) {
    return [
        filter_1.filter.call(this, predicate),
        filter_1.filter.call(this, not_1.not(predicate, thisArg))
    ];
}
exports.partition = partition;
