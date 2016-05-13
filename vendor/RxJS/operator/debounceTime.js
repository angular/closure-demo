goog.module('rxjs$operator$debounceTime');
var Subscriber_1 = goog.require('rxjs$Subscriber');
var async_1 = goog.require('rxjs$scheduler$async');
/**
 *  Returns the source Observable delayed by the computed debounce duration, with the duration lengthened if a new source item arrives before the delay duration ends. In practice, for each item emitted on the source, this operator holds the latest item, waits for a silence for the `dueTime` length, and only then emits the latest source item on the result Observable. Optionally takes a scheduler for manging timers.
 * @method debounceTime
 * @owner Observable
 * @param {?} dueTime
 * @param {?=} scheduler
 * @return {?}
 */
function debounceTime(dueTime, scheduler = async_1.async) {
    return this.lift(new DebounceTimeOperator(dueTime, scheduler));
}
exports.debounceTime = debounceTime;
class DebounceTimeOperator {
    /**
     * @param {?} dueTime
     * @param {?} scheduler
     */
    constructor(dueTime, scheduler) {
        this.dueTime = dueTime;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DebounceTimeOperator.prototype.dueTime;
        /** @type {?} */
        DebounceTimeOperator.prototype.scheduler;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class DebounceTimeSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} dueTime
     * @param {?} scheduler
     */
    constructor(destination, dueTime, scheduler) {
        super(destination);
        this.dueTime = dueTime;
        this.scheduler = scheduler;
        this.debouncedSubscription = null;
        this.lastValue = null;
        this.hasValue = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.clearDebounce();
        this.lastValue = value;
        this.hasValue = true;
        this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
    }
    /**
     * @return {?}
     */
    _complete() {
        this.debouncedNext();
        this.destination.complete();
    }
    /**
     * @return {?}
     */
    debouncedNext() {
        this.clearDebounce();
        if (this.hasValue) {
            this.destination.next(this.lastValue);
            this.lastValue = null;
            this.hasValue = false;
        }
    }
    /**
     * @return {?}
     */
    clearDebounce() {
        const /** @type {?} */ debouncedSubscription = this.debouncedSubscription;
        if (debouncedSubscription !== null) {
            this.remove(debouncedSubscription);
            debouncedSubscription.unsubscribe();
            this.debouncedSubscription = null;
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DebounceTimeSubscriber.prototype.debouncedSubscription;
        /** @type {?} */
        DebounceTimeSubscriber.prototype.lastValue;
        /** @type {?} */
        DebounceTimeSubscriber.prototype.hasValue;
        /** @type {?} */
        DebounceTimeSubscriber.prototype.dueTime;
        /** @type {?} */
        DebounceTimeSubscriber.prototype.scheduler;
    }
}
/**
 * @param {?} subscriber
 * @return {?}
 */
function dispatchNext(subscriber) {
    subscriber.debouncedNext();
}
