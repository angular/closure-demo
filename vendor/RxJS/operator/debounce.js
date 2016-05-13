goog.module('rxjs$operator$debounce');
var OuterSubscriber_1 = goog.require('rxjs$OuterSubscriber');
var subscribeToResult_1 = goog.require('rxjs$util$subscribeToResult');
/**
 *  Returns the source Observable delayed by the computed debounce duration, with the duration lengthened if a new source item arrives before the delay duration ends. In practice, for each item emitted on the source, this operator holds the latest item, waits for a silence as long as the `durationSelector` specifies, and only then emits the latest source item on the result Observable.
 * @method debounce
 * @owner Observable
 * @param {?} durationSelector
 * @return {?}
 */
function debounce(durationSelector) {
    return this.lift(new DebounceOperator(durationSelector));
}
exports.debounce = debounce;
class DebounceOperator {
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
        return source._subscribe(new DebounceSubscriber(subscriber, this.durationSelector));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DebounceOperator.prototype.durationSelector;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class DebounceSubscriber extends OuterSubscriber_1.OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} durationSelector
     */
    constructor(destination, durationSelector) {
        super(destination);
        this.durationSelector = durationSelector;
        this.hasValue = false;
        this.durationSubscription = null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        try {
            const /** @type {?} */ result = this.durationSelector.call(this, value);
            if (result) {
                this._tryNext(value, result);
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
        this.emitValue();
        this.destination.complete();
    }
    /**
     * @param {?} value
     * @param {?} duration
     * @return {?}
     */
    _tryNext(value, duration) {
        let /** @type {?} */ subscription = this.durationSubscription;
        this.value = value;
        this.hasValue = true;
        if (subscription) {
            subscription.unsubscribe();
            this.remove(subscription);
        }
        subscription = subscribeToResult_1.subscribeToResult(this, duration);
        if (!subscription.isUnsubscribed) {
            this.add(this.durationSubscription = subscription);
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
        this.emitValue();
    }
    /**
     * @return {?}
     */
    notifyComplete() {
        this.emitValue();
    }
    /**
     * @return {?}
     */
    emitValue() {
        if (this.hasValue) {
            const /** @type {?} */ value = this.value;
            const /** @type {?} */ subscription = this.durationSubscription;
            if (subscription) {
                this.durationSubscription = null;
                subscription.unsubscribe();
                this.remove(subscription);
            }
            this.value = null;
            this.hasValue = false;
            super._next(value);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DebounceSubscriber.prototype.value;
        /** @type {?} */
        DebounceSubscriber.prototype.hasValue;
        /** @type {?} */
        DebounceSubscriber.prototype.durationSubscription;
        /** @type {?} */
        DebounceSubscriber.prototype.durationSelector;
    }
}
