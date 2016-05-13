goog.module('rxjs$scheduler$AsapScheduler');
var AsapAction_1 = goog.require('rxjs$scheduler$AsapAction');
var QueueScheduler_1 = goog.require('rxjs$scheduler$QueueScheduler');
class AsapScheduler extends QueueScheduler_1.QueueScheduler {
    /**
     * @param {?} work
     * @param {?=} state
     * @return {?}
     */
    scheduleNow(work, state) {
        return new AsapAction_1.AsapAction(this, work).schedule(state);
    }
}
exports.AsapScheduler = AsapScheduler;
