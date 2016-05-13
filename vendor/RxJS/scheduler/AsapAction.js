goog.module('rxjs$scheduler$AsapAction');
var Immediate_1 = goog.require('rxjs$util$Immediate');
var FutureAction_1 = goog.require('rxjs$scheduler$FutureAction');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class AsapAction extends FutureAction_1.FutureAction {
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
        const { scheduler } = this;
        scheduler.actions.push(this);
        if (!scheduler.scheduledId) {
            scheduler.scheduledId = Immediate_1.Immediate.setImmediate(() => {
                scheduler.scheduledId = null;
                scheduler.flush();
            });
        }
        return this;
    }
    /**
     * @return {?}
     */
    _unsubscribe() {
        const { scheduler } = this;
        const { scheduledId, actions } = scheduler;
        super._unsubscribe();
        if (actions.length === 0) {
            scheduler.active = false;
            if (scheduledId != null) {
                scheduler.scheduledId = null;
                Immediate_1.Immediate.clearImmediate(scheduledId);
            }
        }
    }
}
exports.AsapAction = AsapAction;
