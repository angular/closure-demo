import { Subscriber } from '../Subscriber';
import { async } from '../scheduler/async';
/**
 * Emits a value from the source Observable only after a particular time span
 * has passed without another source emission.
 *
 * <span class="informal">It's like {\@link delay}, but passes only the most
 * recent value from each burst of emissions.</span>
 *
 * <img src="./img/debounceTime.png" width="100%">
 *
 * `debounceTime` delays values emitted by the source Observable, but drops
 * previous pending delayed emissions if a new value arrives on the source
 * Observable. This operator keeps track of the most recent value from the
 * source Observable, and emits that only when `dueTime` enough time has passed
 * without any other value appearing on the source Observable. If a new value
 * appears before `dueTime` silence occurs, the previous value will be dropped
 * and will not be emitted on the output Observable.
 *
 * This is a rate-limiting operator, because it is impossible for more than one
 * value to be emitted in any time window of duration `dueTime`, but it is also
 * a delay-like operator since output emissions do not occur at the same time as
 * they did on the source Observable. Optionally takes a {\@link Scheduler} for
 * managing timers.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.debounceTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link auditTime}
 * @see {\@link debounce}
 * @see {\@link delay}
 * @see {\@link sampleTime}
 * @see {\@link throttleTime}
 *
 * unit determined internally by the optional `scheduler`) for the window of
 * time required to wait for emission silence before emitting the most recent
 * source value.
 * managing the timers that handle the timeout for each value.
 * Observable by the specified `dueTime`, and may drop some values if they occur
 * too frequently.
 * @owner Observable
 * @this {?}
 * @param {?} dueTime
 * @param {?=} scheduler
 * @return {?}
 */
export function debounceTime(dueTime, scheduler = async) {
    return this.lift(new DebounceTimeOperator(dueTime, scheduler));
}
class DebounceTimeOperator {
    /**
     * @param {?} dueTime
     * @param {?} scheduler
     */
    constructor(dueTime, scheduler) {
        this.dueTime = dueTime;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class DebounceTimeSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} dueTime
     * @param {?} scheduler
     */
    constructor(destination, dueTime, scheduler) {
        super(destination);
        this.dueTime = dueTime;
        this.scheduler = scheduler;
        this.debouncedSubscription = null;
        this.lastValue = null;
        this.hasValue = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.clearDebounce();
        this.lastValue = value;
        this.hasValue = true;
        this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
    }
    /**
     * @return {?}
     */
    _complete() {
        this.debouncedNext();
        this.destination.complete();
    }
    /**
     * @return {?}
     */
    debouncedNext() {
        this.clearDebounce();
        if (this.hasValue) {
            this.destination.next(this.lastValue);
            this.lastValue = null;
            this.hasValue = false;
        }
    }
    /**
     * @return {?}
     */
    clearDebounce() {
        const /** @type {?} */ debouncedSubscription = this.debouncedSubscription;
        if (debouncedSubscription !== null) {
            this.remove(debouncedSubscription);
            debouncedSubscription.unsubscribe();
            this.debouncedSubscription = null;
        }
    }
}
function DebounceTimeSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    DebounceTimeSubscriber.prototype.debouncedSubscription;
    /** @type {?} */
    DebounceTimeSubscriber.prototype.lastValue;
    /** @type {?} */
    DebounceTimeSubscriber.prototype.hasValue;
}
/**
 * @param {?} subscriber
 * @return {?}
 */
function dispatchNext(subscriber) {
    subscriber.debouncedNext();
}
