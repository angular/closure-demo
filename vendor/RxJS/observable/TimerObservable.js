goog.module('rxjs$observable$TimerObservable');
var isNumeric_1 = goog.require('rxjs$util$isNumeric');
var Observable_1 = goog.require('rxjs$Observable');
var async_1 = goog.require('rxjs$scheduler$async');
var isScheduler_1 = goog.require('rxjs$util$isScheduler');
var isDate_1 = goog.require('rxjs$util$isDate');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
class TimerObservable extends Observable_1.Observable {
    /**
     * @param {?=} dueTime
     * @param {?=} period
     * @param {?=} scheduler
     */
    constructor(dueTime = 0, period, scheduler) {
        super();
        this.period = -1;
        this.dueTime = 0;
        if (isNumeric_1.isNumeric(period)) {
            this.period = Number(period) < 1 && 1 || Number(period);
        }
        else if (isScheduler_1.isScheduler(period)) {
            scheduler = period;
        }
        if (!isScheduler_1.isScheduler(scheduler)) {
            scheduler = async_1.async;
        }
        this.scheduler = scheduler;
        this.dueTime = isDate_1.isDate(dueTime) ?
            (+dueTime - this.scheduler.now()) :
            dueTime;
    }
    /**
     *  Creates an Observable that starts emitting after an `initialDelay` and emits ever increasing numbers after each `period` of time thereafter. * <span class="informal">Its like {@link interval}, but you can specify when should the emissions start.</span> * <img src="./img/timer.png" width="100%"> * `timer` returns an Observable that emits an infinite sequence of ascending integers, with a constant interval of time, `period` of your choosing between those emissions. The first emission happens after the specified `initialDelay`. The initial delay may be a {@link Date}. By default, this operator uses the `async` Scheduler to provide a notion of time, but you may pass any Scheduler to it. If `period` is not specified, the output Observable emits only one value, `0`. Otherwise, it emits an infinite sequence. *
     * @example <caption>Emits ascending numbers, one every second (1000ms), starting after 3 seconds</caption> var numbers = Rx.Observable.timer(3000, 1000); numbers.subscribe(x => console.log(x)); *
     * @example <caption>Emits one number after five seconds</caption> var numbers = Rx.Observable.timer(5000); numbers.subscribe(x => console.log(x)); *
     * @see {@link interval}
     * @see {@link delay} * emitting the first value of `0`. subsequent numbers. the emission of values, and providing a notion of "time". `initialDelay` and ever increasing numbers after each `period` of time thereafter.
     * @static true
     * @name timer
     * @owner Observable
     * @param {?=} initialDelay
     * @param {?=} period
     * @param {?=} scheduler
     * @return {?}
     */
    static create(initialDelay = 0, period, scheduler) {
        return new TimerObservable(initialDelay, period, scheduler);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    static dispatch(state) {
        const { index, period, subscriber } = state;
        const /** @type {?} */ action = ((this));
        subscriber.next(index);
        if (subscriber.isUnsubscribed) {
            return;
        }
        else if (period === -1) {
            return subscriber.complete();
        }
        state.index = index + 1;
        action.schedule(state, period);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ index = 0;
        const { period, dueTime, scheduler } = this;
        return scheduler.schedule(TimerObservable.dispatch, dueTime, {
            index, period, subscriber
        });
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TimerObservable.prototype.period;
        /** @type {?} */
        TimerObservable.prototype.dueTime;
        /** @type {?} */
        TimerObservable.prototype.scheduler;
    }
}
exports.TimerObservable = TimerObservable;
