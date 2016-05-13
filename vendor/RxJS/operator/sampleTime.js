goog.module('rxjs$operator$sampleTime');
var Subscriber_1 = goog.require('rxjs$Subscriber');
var async_1 = goog.require('rxjs$scheduler$async');
/**
 * @method sampleTime
 * @owner Observable
 * @param {?} delay
 * @param {?=} scheduler
 * @return {?}
 */
function sampleTime(delay, scheduler = async_1.async) {
    return this.lift(new SampleTimeOperator(delay, scheduler));
}
exports.sampleTime = sampleTime;
class SampleTimeOperator {
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
        return source._subscribe(new SampleTimeSubscriber(subscriber, this.delay, this.scheduler));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SampleTimeOperator.prototype.delay;
        /** @type {?} */
        SampleTimeOperator.prototype.scheduler;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class SampleTimeSubscriber extends Subscriber_1.Subscriber {
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
        this.add(scheduler.schedule(dispatchNotification, delay, { subscriber: this, delay }));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.lastValue = value;
        this.hasValue = true;
    }
    /**
     * @return {?}
     */
    notifyNext() {
        if (this.hasValue) {
            this.hasValue = false;
            this.destination.next(this.lastValue);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SampleTimeSubscriber.prototype.lastValue;
        /** @type {?} */
        SampleTimeSubscriber.prototype.hasValue;
        /** @type {?} */
        SampleTimeSubscriber.prototype.delay;
        /** @type {?} */
        SampleTimeSubscriber.prototype.scheduler;
    }
}
/**
 * @param {?} state
 * @return {?}
 */
function dispatchNotification(state) {
    let { subscriber, delay } = state;
    subscriber.notifyNext();
    ((this)).schedule(state, delay);
}
