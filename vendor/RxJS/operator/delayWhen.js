goog.module('rxjs$operator$delayWhen');
var Subscriber_1 = goog.require('rxjs$Subscriber');
var Observable_1 = goog.require('rxjs$Observable');
var OuterSubscriber_1 = goog.require('rxjs$OuterSubscriber');
var subscribeToResult_1 = goog.require('rxjs$util$subscribeToResult');
/**
 *  Returns an Observable that delays the emission of items from the source Observable by a subscription delay and a delay selector function for each element.
 * @method delayWhen
 * @owner Observable
 * @param {?} delayDurationSelector
 * @param {?=} subscriptionDelay
 * @return {?}
 */
function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
        return new SubscriptionDelayObservable(this, subscriptionDelay)
            .lift(new DelayWhenOperator(delayDurationSelector));
    }
    return this.lift(new DelayWhenOperator(delayDurationSelector));
}
exports.delayWhen = delayWhen;
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
        return source._subscribe(new DelayWhenSubscriber(subscriber, this.delayDurationSelector));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DelayWhenOperator.prototype.delayDurationSelector;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class DelayWhenSubscriber extends OuterSubscriber_1.OuterSubscriber {
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
        const /** @type {?} */ notifierSubscription = subscribeToResult_1.subscribeToResult(this, delayNotifier, value);
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
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DelayWhenSubscriber.prototype.completed;
        /** @type {?} */
        DelayWhenSubscriber.prototype.delayNotifierSubscriptions;
        /** @type {?} */
        DelayWhenSubscriber.prototype.values;
        /** @type {?} */
        DelayWhenSubscriber.prototype.delayDurationSelector;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class SubscriptionDelayObservable extends Observable_1.Observable {
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
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SubscriptionDelayObservable.prototype.source;
        /** @type {?} */
        SubscriptionDelayObservable.prototype.subscriptionDelay;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class SubscriptionDelaySubscriber extends Subscriber_1.Subscriber {
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
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SubscriptionDelaySubscriber.prototype.sourceSubscribed;
        /** @type {?} */
        SubscriptionDelaySubscriber.prototype.parent;
        /** @type {?} */
        SubscriptionDelaySubscriber.prototype.source;
    }
}
