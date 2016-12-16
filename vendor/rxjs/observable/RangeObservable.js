import { Observable } from '../Observable';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class RangeObservable extends Observable {
    /**
     * Creates an Observable that emits a sequence of numbers within a specified
     * range.
     *
     * <span class="informal">Emits a sequence of numbers in a range.</span>
     *
     * <img src="./img/range.png" width="100%">
     *
     * `range` operator emits a range of sequential integers, in order, where you
     * select the `start` of the range and its `length`. By default, uses no
     * Scheduler and just delivers the notifications synchronously, but may use
     * an optional Scheduler to regulate those deliveries.
     *
     * var numbers = Rx.Observable.range(1, 10);
     * numbers.subscribe(x => console.log(x));
     *
     * @see {\@link timer}
     * @see {\@link interval}
     *
     * the emissions of the notifications.
     * sequential integers.
     * @owner Observable
     * @param {?=} start
     * @param {?=} count
     * @param {?=} scheduler
     * @return {?}
     */
    static create(start = 0, count = 0, scheduler) {
        return new RangeObservable(start, count, scheduler);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    static dispatch(state) {
        const { start, index, count, subscriber } = state;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(start);
        if (subscriber.closed) {
            return;
        }
        state.index = index + 1;
        state.start = start + 1;
        ((this)).schedule(state);
    }
    /**
     * @param {?} start
     * @param {?} count
     * @param {?=} scheduler
     */
    constructor(start, count, scheduler) {
        super();
        this.start = start;
        this._count = count;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        let /** @type {?} */ index = 0;
        let /** @type {?} */ start = this.start;
        const /** @type {?} */ count = this._count;
        const /** @type {?} */ scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(RangeObservable.dispatch, 0, {
                index, count, start, subscriber
            });
        }
        else {
            do {
                if (index++ >= count) {
                    subscriber.complete();
                    break;
                }
                subscriber.next(start++);
                if (subscriber.closed) {
                    break;
                }
            } while (true);
        }
    }
}
function RangeObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    RangeObservable.prototype.start;
    /** @type {?} */
    RangeObservable.prototype._count;
    /** @type {?} */
    RangeObservable.prototype.scheduler;
}
