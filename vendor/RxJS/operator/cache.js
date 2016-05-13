goog.module('rxjs$operator$cache');
var publishReplay_1 = goog.require('rxjs$operator$publishReplay');
/**
 * @method cache
 * @owner Observable
 * @param {?=} bufferSize
 * @param {?=} windowTime
 * @param {?=} scheduler
 * @return {?}
 */
function cache(bufferSize = Number.POSITIVE_INFINITY, windowTime = Number.POSITIVE_INFINITY, scheduler) {
    return ((publishReplay_1.publishReplay.call(this, bufferSize, windowTime, scheduler))).refCount();
}
exports.cache = cache;
