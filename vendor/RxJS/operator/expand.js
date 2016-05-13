goog.module('rxjs$operator$expand');
var tryCatch_1 = goog.require('rxjs$util$tryCatch');
var errorObject_1 = goog.require('rxjs$util$errorObject');
var OuterSubscriber_1 = goog.require('rxjs$OuterSubscriber');
var subscribeToResult_1 = goog.require('rxjs$util$subscribeToResult');
/**
 *  Returns an Observable where for each item in the source Observable, the supplied function is applied to each item, resulting in a new value to then be applied again with the function.
 * @method expand
 * @owner Observable
 * @param {?} project
 * @param {?=} concurrent
 * @param {?=} scheduler
 * @return {?}
 */
function expand(project, concurrent = Number.POSITIVE_INFINITY, scheduler = undefined) {
    concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
    return this.lift(new ExpandOperator(project, concurrent, scheduler));
}
exports.expand = expand;
class ExpandOperator {
    /**
     * @param {?} project
     * @param {?} concurrent
     * @param {?} scheduler
     */
    constructor(project, concurrent, scheduler) {
        this.project = project;
        this.concurrent = concurrent;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ExpandOperator.prototype.project;
        /** @type {?} */
        ExpandOperator.prototype.concurrent;
        /** @type {?} */
        ExpandOperator.prototype.scheduler;
    }
}
exports.ExpandOperator = ExpandOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class ExpandSubscriber extends OuterSubscriber_1.OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} project
     * @param {?} concurrent
     * @param {?} scheduler
     */
    constructor(destination, project, concurrent, scheduler) {
        super(destination);
        this.project = project;
        this.concurrent = concurrent;
        this.scheduler = scheduler;
        this.index = 0;
        this.active = 0;
        this.hasCompleted = false;
        if (concurrent < Number.POSITIVE_INFINITY) {
            this.buffer = [];
        }
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    static dispatch(arg) {
        const { subscriber, result, value, index } = arg;
        subscriber.subscribeToProjection(result, value, index);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ destination = this.destination;
        if (destination.isUnsubscribed) {
            this._complete();
            return;
        }
        const /** @type {?} */ index = this.index++;
        if (this.active < this.concurrent) {
            destination.next(value);
            let /** @type {?} */ result = tryCatch_1.tryCatch(this.project)(value, index);
            if (result === errorObject_1.errorObject) {
                destination.error(errorObject_1.errorObject.e);
            }
            else if (!this.scheduler) {
                this.subscribeToProjection(result, value, index);
            }
            else {
                const /** @type {?} */ state = { subscriber: this, result, value, index };
                this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
            }
        }
        else {
            this.buffer.push(value);
        }
    }
    /**
     * @param {?} result
     * @param {?} value
     * @param {?} index
     * @return {?}
     */
    subscribeToProjection(result, value, index) {
        this.active++;
        this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
    }
    /**
     * @return {?}
     */
    _complete() {
        this.hasCompleted = true;
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
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
        this._next(innerValue);
    }
    /**
     * @param {?} innerSub
     * @return {?}
     */
    notifyComplete(innerSub) {
        const /** @type {?} */ buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer && buffer.length > 0) {
            this._next(buffer.shift());
        }
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ExpandSubscriber.prototype.index;
        /** @type {?} */
        ExpandSubscriber.prototype.active;
        /** @type {?} */
        ExpandSubscriber.prototype.hasCompleted;
        /** @type {?} */
        ExpandSubscriber.prototype.buffer;
        /** @type {?} */
        ExpandSubscriber.prototype.project;
        /** @type {?} */
        ExpandSubscriber.prototype.concurrent;
        /** @type {?} */
        ExpandSubscriber.prototype.scheduler;
    }
}
exports.ExpandSubscriber = ExpandSubscriber;
