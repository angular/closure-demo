goog.module('rxjs$observable$ScalarObservable');
var Observable_1 = goog.require('rxjs$Observable');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
class ScalarObservable extends Observable_1.Observable {
    /**
     * @param {?} value
     * @param {?=} scheduler
     */
    constructor(value, scheduler) {
        super();
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
    }
    /**
     * @param {?} value
     * @param {?=} scheduler
     * @return {?}
     */
    static create(value, scheduler) {
        return new ScalarObservable(value, scheduler);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    static dispatch(state) {
        const { done, value, subscriber } = state;
        if (done) {
            subscriber.complete();
            return;
        }
        subscriber.next(value);
        if (subscriber.isUnsubscribed) {
            return;
        }
        state.done = true;
        ((this)).schedule(state);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ value = this.value;
        const /** @type {?} */ scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ScalarObservable.dispatch, 0, {
                done: false, value, subscriber
            });
        }
        else {
            subscriber.next(value);
            if (!subscriber.isUnsubscribed) {
                subscriber.complete();
            }
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ScalarObservable.prototype._isScalar;
        /** @type {?} */
        ScalarObservable.prototype.value;
        /** @type {?} */
        ScalarObservable.prototype.scheduler;
    }
}
exports.ScalarObservable = ScalarObservable;
