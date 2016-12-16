import { tryCatch } from '../util/tryCatch';
import { errorObject } from '../util/errorObject';
import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Ignores source values for a duration determined by another Observable, then
 * emits the most recent value from the source Observable, then repeats this
 * process.
 *
 * <span class="informal">It's like {\@link auditTime}, but the silencing
 * duration is determined by a second Observable.</span>
 *
 * <img src="./img/audit.png" width="100%">
 *
 * `audit` is similar to `throttle`, but emits the last value from the silenced
 * time window, instead of the first value. `audit` emits the most recent value
 * from the source Observable on the output Observable as soon as its internal
 * timer becomes disabled, and ignores source values while the timer is enabled.
 * Initially, the timer is disabled. As soon as the first source value arrives,
 * the timer is enabled by calling the `durationSelector` function with the
 * source value, which returns the "duration" Observable. When the duration
 * Observable emits a value or completes, the timer is disabled, then the most
 * recent source value is emitted on the output Observable, and this process
 * repeats for the next source value.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.audit(ev => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link auditTime}
 * @see {\@link debounce}
 * @see {\@link delayWhen}
 * @see {\@link sample}
 * @see {\@link throttle}
 *
 * that receives a value from the source Observable, for computing the silencing
 * duration, returned as an Observable or a Promise.
 * emissions from the source Observable.
 * @owner Observable
 * @this {?}
 * @param {?} durationSelector
 * @return {?}
 */
export function audit(durationSelector) {
    return this.lift(new AuditOperator(durationSelector));
}
class AuditOperator {
    /**
     * @param {?} durationSelector
     */
    constructor(durationSelector) {
        this.durationSelector = durationSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new AuditSubscriber(subscriber, this.durationSelector));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class AuditSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} durationSelector
     */
    constructor(destination, durationSelector) {
        super(destination);
        this.durationSelector = durationSelector;
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
            const /** @type {?} */ duration = tryCatch(this.durationSelector)(value);
            if (duration === errorObject) {
                this.destination.error(errorObject.e);
            }
            else {
                this.add(this.throttled = subscribeToResult(this, duration));
            }
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
    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @return {?}
     */
    notifyNext(outerValue, innerValue, outerIndex, innerIndex) {
        this.clearThrottle();
    }
    /**
     * @return {?}
     */
    notifyComplete() {
        this.clearThrottle();
    }
}
function AuditSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    AuditSubscriber.prototype.value;
    /** @type {?} */
    AuditSubscriber.prototype.hasValue;
    /** @type {?} */
    AuditSubscriber.prototype.throttled;
}
