goog.module('rxjs$scheduler$AsyncScheduler');
var FutureAction_1 = goog.require('rxjs$scheduler$FutureAction');
var QueueScheduler_1 = goog.require('rxjs$scheduler$QueueScheduler');
class AsyncScheduler extends QueueScheduler_1.QueueScheduler {
    /**
     * @param {?} work
     * @param {?=} state
     * @return {?}
     */
    scheduleNow(work, state) {
        return new FutureAction_1.FutureAction(this, work).schedule(state, 0);
    }
}
exports.AsyncScheduler = AsyncScheduler;
