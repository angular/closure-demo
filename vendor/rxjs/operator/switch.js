import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Converts a higher-order Observable into a first-order Observable by
 * subscribing to only the most recently emitted of those inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables by dropping the
 * previous inner Observable once a new one appears.</span>
 *
 * <img src="./img/switch.png" width="100%">
 *
 * `switch` subscribes to an Observable that emits Observables, also known as a
 * higher-order Observable. Each time it observes one of these emitted inner
 * Observables, the output Observable subscribes to the inner Observable and
 * begins emitting the items emitted by that. So far, it behaves
 * like {\@link mergeAll}. However, when a new inner Observable is emitted,
 * `switch` unsubscribes from the earlier-emitted inner Observable and
 * subscribes to the new inner Observable and begins emitting items from it. It
 * continues to behave like this for subsequent inner Observables.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * // Each click event is mapped to an Observable that ticks every second
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var switched = higherOrder.switch();
 * // The outcome is that `switched` is essentially a timer that restarts
 * // on every click. The interval Observables from older clicks do not merge
 * // with the current interval Observable.
 * switched.subscribe(x => console.log(x));
 *
 * @see {\@link combineAll}
 * @see {\@link concatAll}
 * @see {\@link exhaust}
 * @see {\@link mergeAll}
 * @see {\@link switchMap}
 * @see {\@link switchMapTo}
 * @see {\@link zipAll}
 *
 * Observable most recently emitted by the source Observable.
 * @owner Observable
 * @this {?}
 * @return {?}
 */
export function _switch() {
    return (this.lift(new SwitchOperator()));
}
class SwitchOperator {
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new SwitchSubscriber(subscriber));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class SwitchSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     */
    constructor(destination) {
        super(destination);
        this.active = 0;
        this.hasCompleted = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.unsubscribeInner();
        this.active++;
        this.add(this.innerSubscription = subscribeToResult(this, value));
    }
    /**
     * @return {?}
     */
    _complete() {
        this.hasCompleted = true;
        if (this.active === 0) {
            this.destination.complete();
        }
    }
    /**
     * @return {?}
     */
    unsubscribeInner() {
        this.active = this.active > 0 ? this.active - 1 : 0;
        const /** @type {?} */ innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
            this.remove(innerSubscription);
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
        this.destination.next(innerValue);
    }
    /**
     * @param {?} err
     * @return {?}
     */
    notifyError(err) {
        this.destination.error(err);
    }
    /**
     * @return {?}
     */
    notifyComplete() {
        this.unsubscribeInner();
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    }
}
function SwitchSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SwitchSubscriber.prototype.active;
    /** @type {?} */
    SwitchSubscriber.prototype.hasCompleted;
    /** @type {?} */
    SwitchSubscriber.prototype.innerSubscription;
}
