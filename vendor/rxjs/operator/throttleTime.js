import { Subscriber } from '../Subscriber';
import { async } from '../scheduler/async';
/**
 * Emits a value from the source Observable, then ignores subsequent source
 * values for `duration` milliseconds, then repeats this process.
 *
 * <span class="informal">Lets a value pass, then ignores source values for the
 * next `duration` milliseconds.</span>
 *
 * <img src="./img/throttleTime.png" width="100%">
 *
 * `throttleTime` emits the source Observable values on the output Observable
 * when its internal timer is disabled, and ignores source values when the timer
 * is enabled. Initially, the timer is disabled. As soon as the first source
 * value arrives, it is forwarded to the output Observable, and then the timer
 * is enabled. After `duration` milliseconds (or the time unit determined
 * internally by the optional `scheduler`) has passed, the timer is disabled,
 * and this process repeats for the next source value. Optionally takes a
 * {\@link Scheduler} for managing timers.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.throttleTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link auditTime}
 * @see {\@link debounceTime}
 * @see {\@link delay}
 * @see {\@link sampleTime}
 * @see {\@link throttle}
 *
 * emitting the last value, measured in milliseconds or the time unit determined
 * internally by the optional `scheduler`.
 * managing the timers that handle the sampling.
 * limit the rate of emissions from the source.
 * @owner Observable
 * @this {?}
 * @param {?} duration
 * @param {?=} scheduler
 * @return {?}
 */
export function throttleTime(duration, scheduler = async) {
    return this.lift(new ThrottleTimeOperator(duration, scheduler));
}
class ThrottleTimeOperator {
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
        return source.subscribe(new ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class ThrottleTimeSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} duration
     * @param {?} scheduler
     */
    constructor(destination, duration, scheduler) {
        super(destination);
        this.duration = duration;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        if (!this.throttled) {
            this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, { subscriber: this }));
            this.destination.next(value);
        }
    }
    /**
     * @return {?}
     */
    clearThrottle() {
        const /** @type {?} */ throttled = this.throttled;
        if (throttled) {
            throttled.unsubscribe();
            this.remove(throttled);
            this.throttled = null;
        }
    }
}
function ThrottleTimeSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    ThrottleTimeSubscriber.prototype.throttled;
}
/**
 * @param {?} arg
 * @return {?}
 */
function dispatchNext(arg) {
    const { subscriber } = arg;
    subscriber.clearThrottle();
}
