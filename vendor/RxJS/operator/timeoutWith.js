goog.module('rxjs$operator$timeoutWith');
var async_1 = goog.require('rxjs$scheduler$async');
var isDate_1 = goog.require('rxjs$util$isDate');
var OuterSubscriber_1 = goog.require('rxjs$OuterSubscriber');
var subscribeToResult_1 = goog.require('rxjs$util$subscribeToResult');
/**
 * @method timeoutWith
 * @owner Observable
 * @param {?} due
 * @param {?} withObservable
 * @param {?=} scheduler
 * @return {?}
 */
function timeoutWith(due, withObservable, scheduler = async_1.async) {
    let /** @type {?} */ absoluteTimeout = isDate_1.isDate(due);
    let /** @type {?} */ waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(/** @type {?} */ (due));
    return this.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
}
exports.timeoutWith = timeoutWith;
class TimeoutWithOperator {
    /**
     * @param {?} waitFor
     * @param {?} absoluteTimeout
     * @param {?} withObservable
     * @param {?} scheduler
     */
    constructor(waitFor, absoluteTimeout, withObservable, scheduler) {
        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TimeoutWithOperator.prototype.waitFor;
        /** @type {?} */
        TimeoutWithOperator.prototype.absoluteTimeout;
        /** @type {?} */
        TimeoutWithOperator.prototype.withObservable;
        /** @type {?} */
        TimeoutWithOperator.prototype.scheduler;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class TimeoutWithSubscriber extends OuterSubscriber_1.OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} absoluteTimeout
     * @param {?} waitFor
     * @param {?} withObservable
     * @param {?} scheduler
     */
    constructor(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
        super();
        this.destination = destination;
        this.absoluteTimeout = absoluteTimeout;
        this.waitFor = waitFor;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
        this.timeoutSubscription = undefined;
        this.index = 0;
        this._previousIndex = 0;
        this._hasCompleted = false;
        destination.add(this);
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
            source.handleTimeout();
        }
    }
    /**
     * @return {?}
     */
    scheduleTimeout() {
        let /** @type {?} */ currentIndex = this.index;
        const /** @type {?} */ timeoutState = { subscriber: this, index: currentIndex };
        this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, timeoutState);
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
    handleTimeout() {
        if (!this.isUnsubscribed) {
            const /** @type {?} */ withObservable = this.withObservable;
            this.unsubscribe();
            this.destination.add(this.timeoutSubscription = subscribeToResult_1.subscribeToResult(this, withObservable));
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TimeoutWithSubscriber.prototype.timeoutSubscription;
        /** @type {?} */
        TimeoutWithSubscriber.prototype.index;
        /** @type {?} */
        TimeoutWithSubscriber.prototype._previousIndex;
        /** @type {?} */
        TimeoutWithSubscriber.prototype._hasCompleted;
        /** @type {?} */
        TimeoutWithSubscriber.prototype.destination;
        /** @type {?} */
        TimeoutWithSubscriber.prototype.absoluteTimeout;
        /** @type {?} */
        TimeoutWithSubscriber.prototype.waitFor;
        /** @type {?} */
        TimeoutWithSubscriber.prototype.withObservable;
        /** @type {?} */
        TimeoutWithSubscriber.prototype.scheduler;
    }
}
