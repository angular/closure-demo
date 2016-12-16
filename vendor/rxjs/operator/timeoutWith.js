import { async } from '../scheduler/async';
import { isDate } from '../util/isDate';
import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * @owner Observable
 * @this {?}
 * @param {?} due
 * @param {?} withObservable
 * @param {?=} scheduler
 * @return {?}
 */
export function timeoutWith(due, withObservable, scheduler = async) {
    let /** @type {?} */ absoluteTimeout = isDate(due);
    let /** @type {?} */ waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(/** @type {?} */ (due));
    return this.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
}
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
        return source.subscribe(new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class TimeoutWithSubscriber extends OuterSubscriber {
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
    /**
     * @return {?}
     */
    get previousIndex() {
        return this._previousIndex;
    }
    /**
     * @return {?}
     */
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
        if (!this.closed) {
            const /** @type {?} */ withObservable = this.withObservable;
            this.unsubscribe();
            this.destination.add(this.timeoutSubscription = subscribeToResult(this, withObservable));
        }
    }
}
function TimeoutWithSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    TimeoutWithSubscriber.prototype.timeoutSubscription;
    /** @type {?} */
    TimeoutWithSubscriber.prototype.index;
    /** @type {?} */
    TimeoutWithSubscriber.prototype._previousIndex;
    /** @type {?} */
    TimeoutWithSubscriber.prototype._hasCompleted;
}
