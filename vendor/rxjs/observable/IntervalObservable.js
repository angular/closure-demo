import { isNumeric } from '../util/isNumeric';
import { Observable } from '../Observable';
import { async } from '../scheduler/async';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class IntervalObservable extends Observable {
    /**
     * @param {?=} period
     * @param {?=} scheduler
     */
    constructor(period = 0, scheduler = async) {
        super();
        this.period = period;
        this.scheduler = scheduler;
        if (!isNumeric(period) || period < 0) {
            this.period = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            this.scheduler = async;
        }
    }
    /**
     * Creates an Observable that emits sequential numbers every specified
     * interval of time, on a specified Scheduler.
     *
     * <span class="informal">Emits incremental numbers periodically in time.
     * </span>
     *
     * <img src="./img/interval.png" width="100%">
     *
     * `interval` returns an Observable that emits an infinite sequence of
     * ascending integers, with a constant interval of time of your choosing
     * between those emissions. The first emission is not sent immediately, but
     * only after the first period has passed. By default, this operator uses the
     * `async` Scheduler to provide a notion of time, but you may pass any
     * Scheduler to it.
     *
     * var numbers = Rx.Observable.interval(1000);
     * numbers.subscribe(x => console.log(x));
     *
     * @see {\@link timer}
     * @see {\@link delay}
     *
     * or the time unit determined by the scheduler's clock.
     * the emission of values, and providing a notion of "time".
     * interval.
     * @owner Observable
     * @param {?=} period
     * @param {?=} scheduler
     * @return {?}
     */
    static create(period = 0, scheduler = async) {
        return new IntervalObservable(period, scheduler);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    static dispatch(state) {
        const { index, subscriber, period } = state;
        subscriber.next(index);
        if (subscriber.closed) {
            return;
        }
        state.index += 1;
        ((this)).schedule(state, period);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ index = 0;
        const /** @type {?} */ period = this.period;
        const /** @type {?} */ scheduler = this.scheduler;
        subscriber.add(scheduler.schedule(IntervalObservable.dispatch, period, {
            index, subscriber, period
        }));
    }
}
