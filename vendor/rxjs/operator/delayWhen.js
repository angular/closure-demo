import { Subscriber } from '../Subscriber';
import { Observable } from '../Observable';
import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Delays the emission of items from the source Observable by a given time span
 * determined by the emissions of another Observable.
 *
 * <span class="informal">It's like {\@link delay}, but the time span of the
 * delay duration is determined by a second Observable.</span>
 *
 * <img src="./img/delayWhen.png" width="100%">
 *
 * `delayWhen` time shifts each emitted value from the source Observable by a
 * time span determined by another Observable. When the source emits a value,
 * the `delayDurationSelector` function is called with the source value as
 * argument, and should return an Observable, called the "duration" Observable.
 * The source value is emitted on the output Observable only when the duration
 * Observable emits a value or completes.
 *
 * Optionally, `delayWhen` takes a second argument, `subscriptionDelay`, which
 * is an Observable. When `subscriptionDelay` emits its first value or
 * completes, the source Observable is subscribed to and starts behaving like
 * described in the previous paragraph. If `subscriptionDelay` is not provided,
 * `delayWhen` will subscribe to the source Observable as soon as the output
 * Observable is subscribed.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var delayedClicks = clicks.delayWhen(event =>
 *   Rx.Observable.interval(Math.random() * 5000)
 * );
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @see {\@link debounce}
 * @see {\@link delay}
 *
 * returns an Observable for each value emitted by the source Observable, which
 * is then used to delay the emission of that item on the output Observable
 * until the Observable returned from this function emits a value.
 * subscription to the source Observable once it emits any value.
 * Observable by an amount of time specified by the Observable returned by
 * `delayDurationSelector`.
 * @owner Observable
 * @this {?}
 * @param {?} delayDurationSelector
 * @param {?=} subscriptionDelay
 * @return {?}
 */
export function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
        return new SubscriptionDelayObservable(this, subscriptionDelay)
            .lift(new DelayWhenOperator(delayDurationSelector));
    }
    return this.lift(new DelayWhenOperator(delayDurationSelector));
}
class DelayWhenOperator {
    /**
     * @param {?} delayDurationSelector
     */
    constructor(delayDurationSelector) {
        this.delayDurationSelector = delayDurationSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new DelayWhenSubscriber(subscriber, this.delayDurationSelector));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class DelayWhenSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} delayDurationSelector
     */
    constructor(destination, delayDurationSelector) {
        super(destination);
        this.delayDurationSelector = delayDurationSelector;
        this.completed = false;
        this.delayNotifierSubscriptions = [];
        this.values = [];
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
        this.destination.next(outerValue);
        this.removeSubscription(innerSub);
        this.tryComplete();
    }
    /**
     * @param {?} error
     * @param {?} innerSub
     * @return {?}
     */
    notifyError(error, innerSub) {
        this._error(error);
    }
    /**
     * @param {?} innerSub
     * @return {?}
     */
    notifyComplete(innerSub) {
        const /** @type {?} */ value = this.removeSubscription(innerSub);
        if (value) {
            this.destination.next(value);
        }
        this.tryComplete();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        try {
            const /** @type {?} */ delayNotifier = this.delayDurationSelector(value);
            if (delayNotifier) {
                this.tryDelay(delayNotifier, value);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    }
    /**
     * @return {?}
     */
    _complete() {
        this.completed = true;
        this.tryComplete();
    }
    /**
     * @param {?} subscription
     * @return {?}
     */
    removeSubscription(subscription) {
        subscription.unsubscribe();
        const /** @type {?} */ subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
        let /** @type {?} */ value = null;
        if (subscriptionIdx !== -1) {
            value = this.values[subscriptionIdx];
            this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
            this.values.splice(subscriptionIdx, 1);
        }
        return value;
    }
    /**
     * @param {?} delayNotifier
     * @param {?} value
     * @return {?}
     */
    tryDelay(delayNotifier, value) {
        const /** @type {?} */ notifierSubscription = subscribeToResult(this, delayNotifier, value);
        this.add(notifierSubscription);
        this.delayNotifierSubscriptions.push(notifierSubscription);
        this.values.push(value);
    }
    /**
     * @return {?}
     */
    tryComplete() {
        if (this.completed && this.delayNotifierSubscriptions.length === 0) {
            this.destination.complete();
        }
    }
}
function DelayWhenSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    DelayWhenSubscriber.prototype.completed;
    /** @type {?} */
    DelayWhenSubscriber.prototype.delayNotifierSubscriptions;
    /** @type {?} */
    DelayWhenSubscriber.prototype.values;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class SubscriptionDelayObservable extends Observable {
    /**
     * @param {?} source
     * @param {?} subscriptionDelay
     */
    constructor(source, subscriptionDelay) {
        super();
        this.source = source;
        this.subscriptionDelay = subscriptionDelay;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class SubscriptionDelaySubscriber extends Subscriber {
    /**
     * @param {?} parent
     * @param {?} source
     */
    constructor(parent, source) {
        super();
        this.parent = parent;
        this.source = source;
        this.sourceSubscribed = false;
    }
    /**
     * @param {?} unused
     * @return {?}
     */
    _next(unused) {
        this.subscribeToSource();
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        this.unsubscribe();
        this.parent.error(err);
    }
    /**
     * @return {?}
     */
    _complete() {
        this.subscribeToSource();
    }
    /**
     * @return {?}
     */
    subscribeToSource() {
        if (!this.sourceSubscribed) {
            this.sourceSubscribed = true;
            this.unsubscribe();
            this.source.subscribe(this.parent);
        }
    }
}
function SubscriptionDelaySubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SubscriptionDelaySubscriber.prototype.sourceSubscribed;
}
