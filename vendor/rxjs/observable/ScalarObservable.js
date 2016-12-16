import { Observable } from '../Observable';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class ScalarObservable extends Observable {
    /**
     * @param {?} value
     * @param {?=} scheduler
     */
    constructor(value, scheduler) {
        super();
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
        if (scheduler) {
            this._isScalar = false;
        }
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
        if (subscriber.closed) {
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
            if (!subscriber.closed) {
                subscriber.complete();
            }
        }
    }
}
function ScalarObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    ScalarObservable.prototype._isScalar;
}
