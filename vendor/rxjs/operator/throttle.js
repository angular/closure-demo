import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Emits a value from the source Observable, then ignores subsequent source
 * values for a duration determined by another Observable, then repeats this
 * process.
 *
 * <span class="informal">It's like {\@link throttleTime}, but the silencing
 * duration is determined by a second Observable.</span>
 *
 * <img src="./img/throttle.png" width="100%">
 *
 * `throttle` emits the source Observable values on the output Observable
 * when its internal timer is disabled, and ignores source values when the timer
 * is enabled. Initially, the timer is disabled. As soon as the first source
 * value arrives, it is forwarded to the output Observable, and then the timer
 * is enabled by calling the `durationSelector` function with the source value,
 * which returns the "duration" Observable. When the duration Observable emits a
 * value or completes, the timer is disabled, and this process repeats for the
 * next source value.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.throttle(ev => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link audit}
 * @see {\@link debounce}
 * @see {\@link delayWhen}
 * @see {\@link sample}
 * @see {\@link throttleTime}
 *
 * that receives a value from the source Observable, for computing the silencing
 * duration for each source value, returned as an Observable or a Promise.
 * limit the rate of emissions from the source.
 * @owner Observable
 * @this {?}
 * @param {?} durationSelector
 * @return {?}
 */
export function throttle(durationSelector) {
    return this.lift(new ThrottleOperator(durationSelector));
}
class ThrottleOperator {
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
        return source.subscribe(new ThrottleSubscriber(subscriber, this.durationSelector));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class ThrottleSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} durationSelector
     */
    constructor(destination, durationSelector) {
        super(destination);
        this.destination = destination;
        this.durationSelector = durationSelector;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        if (!this.throttled) {
            this.tryDurationSelector(value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    tryDurationSelector(value) {
        let /** @type {?} */ duration = null;
        try {
            duration = this.durationSelector(value);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.emitAndThrottle(value, duration);
    }
    /**
     * @param {?} value
     * @param {?} duration
     * @return {?}
     */
    emitAndThrottle(value, duration) {
        this.add(this.throttled = subscribeToResult(this, duration));
        this.destination.next(value);
    }
    /**
     * @return {?}
     */
    _unsubscribe() {
        const /** @type {?} */ throttled = this.throttled;
        if (throttled) {
            this.remove(throttled);
            this.throttled = null;
            throttled.unsubscribe();
        }
    }
    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @param {?} innerSub
     * @return {?}
     */
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this._unsubscribe();
    }
    /**
     * @return {?}
     */
    notifyComplete() {
        this._unsubscribe();
    }
}
function ThrottleSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    ThrottleSubscriber.prototype.throttled;
}
