import { async } from '../scheduler/async';
import { isDate } from '../util/isDate';
import { Subscriber } from '../Subscriber';
import { TimeoutError } from '../util/TimeoutError';
/**
 * @owner Observable
 * @this {?}
 * @param {?} due
 * @param {?=} scheduler
 * @return {?}
 */
export function timeout(due, scheduler = async) {
    const /** @type {?} */ absoluteTimeout = isDate(due);
    const /** @type {?} */ waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(/** @type {?} */ (due));
    return this.lift(new TimeoutOperator(waitFor, absoluteTimeout, scheduler, new TimeoutError()));
}
class TimeoutOperator {
    /**
     * @param {?} waitFor
     * @param {?} absoluteTimeout
     * @param {?} scheduler
     * @param {?} errorInstance
     */
    constructor(waitFor, absoluteTimeout, scheduler, errorInstance) {
        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.scheduler = scheduler;
        this.errorInstance = errorInstance;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.scheduler, this.errorInstance));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class TimeoutSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} absoluteTimeout
     * @param {?} waitFor
     * @param {?} scheduler
     * @param {?} errorInstance
     */
    constructor(destination, absoluteTimeout, waitFor, scheduler, errorInstance) {
        super(destination);
        this.absoluteTimeout = absoluteTimeout;
        this.waitFor = waitFor;
        this.scheduler = scheduler;
        this.errorInstance = errorInstance;
        this.index = 0;
        this._previousIndex = 0;
        this._hasCompleted = false;
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
        this.error(this.errorInstance);
    }
}
function TimeoutSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    TimeoutSubscriber.prototype.index;
    /** @type {?} */
    TimeoutSubscriber.prototype._previousIndex;
    /** @type {?} */
    TimeoutSubscriber.prototype._hasCompleted;
}
