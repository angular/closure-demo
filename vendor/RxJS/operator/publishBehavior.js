goog.module('rxjs$operator$publishBehavior');
var BehaviorSubject_1 = goog.require('rxjs$BehaviorSubject');
var multicast_1 = goog.require('rxjs$operator$multicast');
/**
 * @method publishBehavior
 * @owner Observable
 * @param {?} value
 * @return {?}
 */
function publishBehavior(value) {
    return multicast_1.multicast.call(this, new BehaviorSubject_1.BehaviorSubject(value));
}
exports.publishBehavior = publishBehavior;
