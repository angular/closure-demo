goog.module('rxjs$operator$audit');
var tryCatch_1 = goog.require('rxjs$util$tryCatch');
var errorObject_1 = goog.require('rxjs$util$errorObject');
var OuterSubscriber_1 = goog.require('rxjs$OuterSubscriber');
var subscribeToResult_1 = goog.require('rxjs$util$subscribeToResult');
/**
 * @method audit
 * @owner Observable
 * @param {?} durationSelector
 * @return {?}
 */
function audit(durationSelector) {
    return this.lift(new AuditOperator(durationSelector));
}
exports.audit = audit;
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
        return source._subscribe(new AuditSubscriber(subscriber, this.durationSelector));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        AuditOperator.prototype.durationSelector;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class AuditSubscriber extends OuterSubscriber_1.OuterSubscriber {
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
            const /** @type {?} */ duration = tryCatch_1.tryCatch(this.durationSelector)(value);
            if (duration === errorObject_1.errorObject) {
                this.destination.error(errorObject_1.errorObject.e);
            }
            else {
                this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
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
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        AuditSubscriber.prototype.value;
        /** @type {?} */
        AuditSubscriber.prototype.hasValue;
        /** @type {?} */
        AuditSubscriber.prototype.throttled;
        /** @type {?} */
        AuditSubscriber.prototype.durationSelector;
    }
}
