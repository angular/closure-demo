goog.module('rxjs$operator$auditTime');
var async_1 = goog.require('rxjs$scheduler$async');
var Subscriber_1 = goog.require('rxjs$Subscriber');
/**
 * @method auditTime
 * @owner Observable
 * @param {?} delay
 * @param {?=} scheduler
 * @return {?}
 */
function auditTime(delay, scheduler = async_1.async) {
    return this.lift(new AuditTimeOperator(delay, scheduler));
}
exports.auditTime = auditTime;
class AuditTimeOperator {
    /**
     * @param {?} delay
     * @param {?} scheduler
     */
    constructor(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new AuditTimeSubscriber(subscriber, this.delay, this.scheduler));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        AuditTimeOperator.prototype.delay;
        /** @type {?} */
        AuditTimeOperator.prototype.scheduler;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class AuditTimeSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} delay
     * @param {?} scheduler
     */
    constructor(destination, delay, scheduler) {
        super(destination);
        this.delay = delay;
        this.scheduler = scheduler;
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
            this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.delay, this));
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
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        AuditTimeSubscriber.prototype.value;
        /** @type {?} */
        AuditTimeSubscriber.prototype.hasValue;
        /** @type {?} */
        AuditTimeSubscriber.prototype.throttled;
        /** @type {?} */
        AuditTimeSubscriber.prototype.delay;
        /** @type {?} */
        AuditTimeSubscriber.prototype.scheduler;
    }
}
/**
 * @param {?} subscriber
 * @return {?}
 */
function dispatchNext(subscriber) {
    subscriber.clearThrottle();
}
