import { Observable } from '../Observable';
import { ScalarObservable } from './ScalarObservable';
import { EmptyObservable } from './EmptyObservable';
import { isScheduler } from '../util/isScheduler';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class ArrayObservable extends Observable {
    /**
     * @param {?} array
     * @param {?=} scheduler
     */
    constructor(array, scheduler) {
        super();
        this.array = array;
        this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            this._isScalar = true;
            this.value = array[0];
        }
    }
    /**
     * @param {?} array
     * @param {?=} scheduler
     * @return {?}
     */
    static create(array, scheduler) {
        return new ArrayObservable(array, scheduler);
    }
    /**
     * Creates an Observable that emits some values you specify as arguments,
     * immediately one after the other, and then emits a complete notification.
     *
     * <span class="informal">Emits the arguments you provide, then completes.
     * </span>
     *
     * <img src="./img/of.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the arguments given, and the complete notification thereafter. It can
     * be used for composing with other Observables, such as with {\@link concat}.
     * By default, it uses a `null` Scheduler, which means the `next`
     * notifications are sent synchronously, although with a different Scheduler
     * it is possible to determine when those notifications will be delivered.
     *
     * var numbers = Rx.Observable.of(10, 20, 30);
     * var letters = Rx.Observable.of('a', 'b', 'c');
     * var interval = Rx.Observable.interval(1000);
     * var result = numbers.concat(letters).concat(interval);
     * result.subscribe(x => console.log(x));
     *
     * @see {\@link create}
     * @see {\@link empty}
     * @see {\@link never}
     * @see {\@link throw}
     *
     * the emissions of the `next` notifications.
     * @owner Observable
     * @param {...?} array
     * @return {?}
     */
    static of(...array) {
        let /** @type {?} */ scheduler = (array[array.length - 1]);
        if (isScheduler(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        const /** @type {?} */ len = array.length;
        if (len > 1) {
            return new ArrayObservable(/** @type {?} */ (array), scheduler);
        }
        else if (len === 1) {
            return new ScalarObservable(/** @type {?} */ (array[0]), scheduler);
        }
        else {
            return new EmptyObservable(scheduler);
        }
    }
    /**
     * @param {?} state
     * @return {?}
     */
    static dispatch(state) {
        const { array, index, count, subscriber } = state;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(array[index]);
        if (subscriber.closed) {
            return;
        }
        state.index = index + 1;
        ((this)).schedule(state);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        let /** @type {?} */ index = 0;
        const /** @type {?} */ array = this.array;
        const /** @type {?} */ count = array.length;
        const /** @type {?} */ scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ArrayObservable.dispatch, 0, {
                array, index, count, subscriber
            });
        }
        else {
            for (let /** @type {?} */ i = 0; i < count && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        }
    }
}
function ArrayObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    ArrayObservable.prototype.value;
}
