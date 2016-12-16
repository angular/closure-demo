import { Subscriber } from '../Subscriber';
import { async } from '../scheduler/async';
/**
 * Emits the most recently emitted value from the source Observable within
 * periodic time intervals.
 *
 * <span class="informal">Samples the source Observable at periodic time
 * intervals, emitting what it samples.</span>
 *
 * <img src="./img/sampleTime.png" width="100%">
 *
 * `sampleTime` periodically looks at the source Observable and emits whichever
 * value it has most recently emitted since the previous sampling, unless the
 * source has not emitted anything since the previous sampling. The sampling
 * happens periodically in time every `period` milliseconds (or the time unit
 * defined by the optional `scheduler` argument). The sampling starts as soon as
 * the output Observable is subscribed.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.sampleTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link auditTime}
 * @see {\@link debounceTime}
 * @see {\@link delay}
 * @see {\@link sample}
 * @see {\@link throttleTime}
 *
 * time unit determined internally by the optional `scheduler`.
 * managing the timers that handle the sampling.
 * values emitted by the source Observable at the specified time interval.
 * @owner Observable
 * @this {?}
 * @param {?} period
 * @param {?=} scheduler
 * @return {?}
 */
export function sampleTime(period, scheduler = async) {
    return this.lift(new SampleTimeOperator(period, scheduler));
}
class SampleTimeOperator {
    /**
     * @param {?} period
     * @param {?} scheduler
     */
    constructor(period, scheduler) {
        this.period = period;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new SampleTimeSubscriber(subscriber, this.period, this.scheduler));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class SampleTimeSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} period
     * @param {?} scheduler
     */
    constructor(destination, period, scheduler) {
        super(destination);
        this.period = period;
        this.scheduler = scheduler;
        this.hasValue = false;
        this.add(scheduler.schedule(dispatchNotification, period, { subscriber: this, period }));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.lastValue = value;
        this.hasValue = true;
    }
    /**
     * @return {?}
     */
    notifyNext() {
        if (this.hasValue) {
            this.hasValue = false;
            this.destination.next(this.lastValue);
        }
    }
}
function SampleTimeSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SampleTimeSubscriber.prototype.lastValue;
    /** @type {?} */
    SampleTimeSubscriber.prototype.hasValue;
}
/**
 * @this {?}
 * @param {?} state
 * @return {?}
 */
function dispatchNotification(state) {
    let { subscriber, period } = state;
    subscriber.notifyNext();
    this.schedule(state, period);
}
