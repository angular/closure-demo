goog.module('rxjs$operator$timeout');
var async_1 = goog.require('rxjs$scheduler$async');
var isDate_1 = goog.require('rxjs$util$isDate');
var Subscriber_1 = goog.require('rxjs$Subscriber');
/**
 * @method timeout
 * @owner Observable
 * @param {?} due
 * @param {?=} errorToSend
 * @param {?=} scheduler
 * @return {?}
 */
function timeout(due, errorToSend = null, scheduler = async_1.async) {
    let /** @type {?} */ absoluteTimeout = isDate_1.isDate(due);
    let /** @type {?} */ waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(/** @type {?} */ (due));
    return this.lift(new TimeoutOperator(waitFor, absoluteTimeout, errorToSend, scheduler));
}
exports.timeout = timeout;
class TimeoutOperator {
    /**
     * @param {?} waitFor
     * @param {?} absoluteTimeout
     * @param {?} errorToSend
     * @param {?} scheduler
     */
    constructor(waitFor, absoluteTimeout, errorToSend, scheduler) {
        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.errorToSend = errorToSend;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.errorToSend, this.scheduler));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TimeoutOperator.prototype.waitFor;
        /** @type {?} */
        TimeoutOperator.prototype.absoluteTimeout;
        /** @type {?} */
        TimeoutOperator.prototype.errorToSend;
        /** @type {?} */
        TimeoutOperator.prototype.scheduler;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class TimeoutSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} absoluteTimeout
     * @param {?} waitFor
     * @param {?} errorToSend
     * @param {?} scheduler
     */
    constructor(destination, absoluteTimeout, waitFor, errorToSend, scheduler) {
        super(destination);
        this.absoluteTimeout = absoluteTimeout;
        this.waitFor = waitFor;
        this.errorToSend = errorToSend;
        this.scheduler = scheduler;
        this.index = 0;
        this._previousIndex = 0;
        this._hasCompleted = false;
        this.scheduleTimeout();
    }
    get previousIndex() {
        return this._previousIndex;
    }
    get hasCompleted() {
        return this._hasCompleted;
    }
    /**
     * @param {?} state
     * @return {?}
     */
    static dispatchTimeout(state) {
        const /** @type {?} */ source = state.subscriber;
        const /** @type {?} */ currentIndex = state.index;
        if (!source.hasCompleted && source.previousIndex === currentIndex) {
            source.notifyTimeout();
        }
    }
    /**
     * @return {?}
     */
    scheduleTimeout() {
        let /** @type {?} */ currentIndex = this.index;
        this.scheduler.schedule(TimeoutSubscriber.dispatchTimeout, this.waitFor, { subscriber: this, index: currentIndex });
        this.index++;
        this._previousIndex = currentIndex;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.destination.next(value);
        if (!this.absoluteTimeout) {
            this.scheduleTimeout();
        }
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        this.destination.error(err);
        this._hasCompleted = true;
    }
    /**
     * @return {?}
     */
    _complete() {
        this.destination.complete();
        this._hasCompleted = true;
    }
    /**
     * @return {?}
     */
    notifyTimeout() {
        this.error(this.errorToSend || new Error('timeout'));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TimeoutSubscriber.prototype.index;
        /** @type {?} */
        TimeoutSubscriber.prototype._previousIndex;
        /** @type {?} */
        TimeoutSubscriber.prototype._hasCompleted;
        /** @type {?} */
        TimeoutSubscriber.prototype.absoluteTimeout;
        /** @type {?} */
        TimeoutSubscriber.prototype.waitFor;
        /** @type {?} */
        TimeoutSubscriber.prototype.errorToSend;
        /** @type {?} */
        TimeoutSubscriber.prototype.scheduler;
    }
}
