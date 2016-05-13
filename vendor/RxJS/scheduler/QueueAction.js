goog.module('rxjs$scheduler$QueueAction');
var FutureAction_1 = goog.require('rxjs$scheduler$FutureAction');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class QueueAction extends FutureAction_1.FutureAction {
    /**
     * @param {?=} state
     * @param {?=} delay
     * @return {?}
     */
    _schedule(state, delay = 0) {
        if (delay > 0) {
            return super._schedule(state, delay);
        }
        this.delay = delay;
        this.state = state;
        const /** @type {?} */ scheduler = this.scheduler;
        scheduler.actions.push(this);
        scheduler.flush();
        return this;
    }
}
exports.QueueAction = QueueAction;
