goog.module('rxjs$scheduler$QueueScheduler');
var QueueAction_1 = goog.require('rxjs$scheduler$QueueAction');
var FutureAction_1 = goog.require('rxjs$scheduler$FutureAction');
class QueueScheduler {
    constructor() {
        this.active = false;
        this.actions = [];
        this.scheduledId = null;
    }
    /**
     * @return {?}
     */
    now() {
        return Date.now();
    }
    /**
     * @return {?}
     */
    flush() {
        if (this.active || this.scheduledId) {
            return;
        }
        this.active = true;
        const /** @type {?} */ actions = this.actions;
        // XXX: use `any` to remove type param `T` from `VirtualTimeScheduler`.
        for (let /** @type {?} */ action = null; action = actions.shift();) {
            action.execute();
            if (action.error) {
                this.active = false;
                throw action.error;
            }
        }
        this.active = false;
    }
    /**
     * @param {?} work
     * @param {?=} delay
     * @param {?=} state
     * @return {?}
     */
    schedule(work, delay = 0, state) {
        return (delay <= 0) ?
            this.scheduleNow(work, state) :
            this.scheduleLater(work, delay, state);
    }
    /**
     * @param {?} work
     * @param {?=} state
     * @return {?}
     */
    scheduleNow(work, state) {
        return new QueueAction_1.QueueAction(this, work).schedule(state);
    }
    /**
     * @param {?} work
     * @param {?} delay
     * @param {?=} state
     * @return {?}
     */
    scheduleLater(work, delay, state) {
        return new FutureAction_1.FutureAction(this, work).schedule(state, delay);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        QueueScheduler.prototype.active;
        /** @type {?} */
        QueueScheduler.prototype.actions;
        /** @type {?} */
        QueueScheduler.prototype.scheduledId;
    }
}
exports.QueueScheduler = QueueScheduler;
