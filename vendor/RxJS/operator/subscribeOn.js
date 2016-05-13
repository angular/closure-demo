goog.module('rxjs$operator$subscribeOn');
var SubscribeOnObservable_1 = goog.require('rxjs$observable$SubscribeOnObservable');
/**
 *  Asynchronously subscribes Observers to this Observable on the specified Scheduler. * <img src="./img/subscribeOn.png" width="100%"> * .
 * @method subscribeOn
 * @owner Observable
 * @param {?} scheduler
 * @param {?=} delay
 * @return {?}
 */
function subscribeOn(scheduler, delay = 0) {
    return new SubscribeOnObservable_1.SubscribeOnObservable(this, delay, scheduler);
}
exports.subscribeOn = subscribeOn;
