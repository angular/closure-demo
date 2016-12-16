import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Converts a higher-order Observable into a first-order Observable by dropping
 * inner Observables while the previous inner Observable has not yet completed.
 *
 * <span class="informal">Flattens an Observable-of-Observables by dropping the
 * next inner Observables while the current inner is still executing.</span>
 *
 * <img src="./img/exhaust.png" width="100%">
 *
 * `exhaust` subscribes to an Observable that emits Observables, also known as a
 * higher-order Observable. Each time it observes one of these emitted inner
 * Observables, the output Observable begins emitting the items emitted by that
 * inner Observable. So far, it behaves like {\@link mergeAll}. However,
 * `exhaust` ignores every new inner Observable if the previous Observable has
 * not yet completed. Once that one completes, it will accept and flatten the
 * next inner Observable and repeat this process.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var result = higherOrder.exhaust();
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link combineAll}
 * @see {\@link concatAll}
 * @see {\@link switch}
 * @see {\@link mergeAll}
 * @see {\@link exhaustMap}
 * @see {\@link zipAll}
 *
 * and propagates the first observable exclusively until it completes before
 * subscribing to the next.
 * @owner Observable
 * @this {?}
 * @return {?}
 */
export function exhaust() {
    return this.lift(new SwitchFirstOperator());
}
class SwitchFirstOperator {
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new SwitchFirstSubscriber(subscriber));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class SwitchFirstSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     */
    constructor(destination) {
        super(destination);
        this.hasCompleted = false;
        this.hasSubscription = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        if (!this.hasSubscription) {
            this.hasSubscription = true;
            this.add(subscribeToResult(this, value));
        }
    }
    /**
     * @return {?}
     */
    _complete() {
        this.hasCompleted = true;
        if (!this.hasSubscription) {
            this.destination.complete();
        }
    }
    /**
     * @param {?} innerSub
     * @return {?}
     */
    notifyComplete(innerSub) {
        this.remove(innerSub);
        this.hasSubscription = false;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    }
}
function SwitchFirstSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SwitchFirstSubscriber.prototype.hasCompleted;
    /** @type {?} */
    SwitchFirstSubscriber.prototype.hasSubscription;
}
