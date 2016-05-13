goog.module('rxjs$operator$publishReplay');
var ReplaySubject_1 = goog.require('rxjs$ReplaySubject');
var multicast_1 = goog.require('rxjs$operator$multicast');
/**
 * @method publishReplay
 * @owner Observable
 * @param {?=} bufferSize
 * @param {?=} windowTime
 * @param {?=} scheduler
 * @return {?}
 */
function publishReplay(bufferSize = Number.POSITIVE_INFINITY, windowTime = Number.POSITIVE_INFINITY, scheduler) {
    return multicast_1.multicast.call(this, new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler));
}
exports.publishReplay = publishReplay;
