import { Observable } from '../Observable';
import { ScalarObservable } from './ScalarObservable';
import { EmptyObservable } from './EmptyObservable';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class ArrayLikeObservable extends Observable {
    /**
     * @param {?} arrayLike
     * @param {?=} scheduler
     */
    constructor(arrayLike, scheduler) {
        super();
        this.arrayLike = arrayLike;
        this.scheduler = scheduler;
        if (!scheduler && arrayLike.length === 1) {
            this._isScalar = true;
            this.value = arrayLike[0];
        }
    }
    /**
     * @param {?} arrayLike
     * @param {?=} scheduler
     * @return {?}
     */
    static create(arrayLike, scheduler) {
        const /** @type {?} */ length = arrayLike.length;
        if (length === 0) {
            return new EmptyObservable();
        }
        else if (length === 1) {
            return new ScalarObservable(/** @type {?} */ (arrayLike[0]), scheduler);
        }
        else {
            return new ArrayLikeObservable(arrayLike, scheduler);
        }
    }
    /**
     * @param {?} state
     * @return {?}
     */
    static dispatch(state) {
        const { arrayLike, index, length, subscriber } = state;
        if (subscriber.closed) {
            return;
        }
        if (index >= length) {
            subscriber.complete();
            return;
        }
        subscriber.next(arrayLike[index]);
        state.index = index + 1;
        ((this)).schedule(state);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        let /** @type {?} */ index = 0;
        const { arrayLike, scheduler } = this;
        const /** @type {?} */ length = arrayLike.length;
        if (scheduler) {
            return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
                arrayLike, index, length, subscriber
            });
        }
        else {
            for (let /** @type {?} */ i = 0; i < length && !subscriber.closed; i++) {
                subscriber.next(arrayLike[i]);
            }
            subscriber.complete();
        }
    }
}
function ArrayLikeObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    ArrayLikeObservable.prototype.value;
}
