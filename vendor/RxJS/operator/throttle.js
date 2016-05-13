goog.module('rxjs$operator$throttle');
var OuterSubscriber_1 = goog.require('rxjs$OuterSubscriber');
var subscribeToResult_1 = goog.require('rxjs$util$subscribeToResult');
/**
 * @method throttle
 * @owner Observable
 * @param {?} durationSelector
 * @return {?}
 */
function throttle(durationSelector) {
    return this.lift(new ThrottleOperator(durationSelector));
}
exports.throttle = throttle;
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
        return source._subscribe(new ThrottleSubscriber(subscriber, this.durationSelector));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ThrottleOperator.prototype.durationSelector;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class ThrottleSubscriber extends OuterSubscriber_1.OuterSubscriber {
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
        this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
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
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ThrottleSubscriber.prototype.throttled;
        /** @type {?} */
        ThrottleSubscriber.prototype.destination;
        /** @type {?} */
        ThrottleSubscriber.prototype.durationSelector;
    }
}
