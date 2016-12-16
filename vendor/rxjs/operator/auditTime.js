import { async } from '../scheduler/async';
import { Subscriber } from '../Subscriber';
/**
 * Ignores source values for `duration` milliseconds, then emits the most recent
 * value from the source Observable, then repeats this process.
 *
 * <span class="informal">When it sees a source values, it ignores that plus
 * the next ones for `duration` milliseconds, and then it emits the most recent
 * value from the source.</span>
 *
 * <img src="./img/auditTime.png" width="100%">
 *
 * `auditTime` is similar to `throttleTime`, but emits the last value from the
 * silenced time window, instead of the first value. `auditTime` emits the most
 * recent value from the source Observable on the output Observable as soon as
 * its internal timer becomes disabled, and ignores source values while the
 * timer is enabled. Initially, the timer is disabled. As soon as the first
 * source value arrives, the timer is enabled. After `duration` milliseconds (or
 * the time unit determined internally by the optional `scheduler`) has passed,
 * the timer is disabled, then the most recent source value is emitted on the
 * output Observable, and this process repeats for the next source value.
 * Optionally takes a {\@link Scheduler} for managing timers.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.auditTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link audit}
 * @see {\@link debounceTime}
 * @see {\@link delay}
 * @see {\@link sampleTime}
 * @see {\@link throttleTime}
 *
 * value, measured in milliseconds or the time unit determined internally
 * by the optional `scheduler`.
 * managing the timers that handle the rate-limiting behavior.
 * emissions from the source Observable.
 * @owner Observable
 * @this {?}
 * @param {?} duration
 * @param {?=} scheduler
 * @return {?}
 */
export function auditTime(duration, scheduler = async) {
    return this.lift(new AuditTimeOperator(duration, scheduler));
}
class AuditTimeOperator {
    /**
     * @param {?} duration
     * @param {?} scheduler
     */
    constructor(duration, scheduler) {
        this.duration = duration;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new AuditTimeSubscriber(subscriber, this.duration, this.scheduler));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class AuditTimeSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} duration
     * @param {?} scheduler
     */
    constructor(destination, duration, scheduler) {
        super(destination);
        this.duration = duration;
        this.scheduler = scheduler;
        this.hasValue = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.value = value;
        this.hasValue = true;
        if (!this.throttled) {
            this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, this));
        }
    }
    /**
     * @return {?}
     */
    clearThrottle() {
        const { value, hasValue, throttled } = this;
        if (throttled) {
            this.remove(throttled);
            this.throttled = null;
            throttled.unsubscribe();
        }
        if (hasValue) {
            this.value = null;
            this.hasValue = false;
            this.destination.next(value);
        }
    }
}
function AuditTimeSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    AuditTimeSubscriber.prototype.value;
    /** @type {?} */
    AuditTimeSubscriber.prototype.hasValue;
    /** @type {?} */
    AuditTimeSubscriber.prototype.throttled;
}
/**
 * @param {?} subscriber
 * @return {?}
 */
function dispatchNext(subscriber) {
    subscriber.clearThrottle();
}
