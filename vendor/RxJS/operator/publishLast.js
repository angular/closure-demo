goog.module('rxjs$operator$publishLast');
var AsyncSubject_1 = goog.require('rxjs$AsyncSubject');
var multicast_1 = goog.require('rxjs$operator$multicast');
/**
 * @method publishLast
 * @owner Observable
 * @return {?}
 */
function publishLast() {
    return multicast_1.multicast.call(this, new AsyncSubject_1.AsyncSubject());
}
exports.publishLast = publishLast;
