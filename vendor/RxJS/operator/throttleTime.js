goog.module('rxjs$operator$throttleTime');
var Subscriber_1 = goog.require('rxjs$Subscriber');
var async_1 = goog.require('rxjs$scheduler$async');
/**
 * @method throttleTime
 * @owner Observable
 * @param {?} delay
 * @param {?=} scheduler
 * @return {?}
 */
function throttleTime(delay, scheduler = async_1.async) {
    return this.lift(new ThrottleTimeOperator(delay, scheduler));
}
exports.throttleTime = throttleTime;
class ThrottleTimeOperator {
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
        return source._subscribe(new ThrottleTimeSubscriber(subscriber, this.delay, this.scheduler));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ThrottleTimeOperator.prototype.delay;
        /** @type {?} */
        ThrottleTimeOperator.prototype.scheduler;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class ThrottleTimeSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} delay
     * @param {?} scheduler
     */
    constructor(destination, delay, scheduler) {
        super(destination);
        this.delay = delay;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        if (!this.throttled) {
            this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.delay, { subscriber: this }));
            this.destination.next(value);
        }
    }
    /**
     * @return {?}
     */
    clearThrottle() {
        const /** @type {?} */ throttled = this.throttled;
        if (throttled) {
            throttled.unsubscribe();
            this.remove(throttled);
            this.throttled = null;
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ThrottleTimeSubscriber.prototype.throttled;
        /** @type {?} */
        ThrottleTimeSubscriber.prototype.delay;
        /** @type {?} */
        ThrottleTimeSubscriber.prototype.scheduler;
    }
}
/**
 * @param {?} arg
 * @return {?}
 */
function dispatchNext(arg) {
    const { subscriber } = arg;
    subscriber.clearThrottle();
}
