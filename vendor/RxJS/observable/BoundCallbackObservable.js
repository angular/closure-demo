goog.module('rxjs$observable$BoundCallbackObservable');
var Observable_1 = goog.require('rxjs$Observable');
var tryCatch_1 = goog.require('rxjs$util$tryCatch');
var errorObject_1 = goog.require('rxjs$util$errorObject');
var AsyncSubject_1 = goog.require('rxjs$AsyncSubject');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
class BoundCallbackObservable extends Observable_1.Observable {
    /**
     * @param {?} callbackFunc
     * @param {?} selector
     * @param {?} args
     * @param {?} scheduler
     */
    constructor(callbackFunc, selector, args, scheduler) {
        super();
        this.callbackFunc = callbackFunc;
        this.selector = selector;
        this.args = args;
        this.scheduler = scheduler;
    }
    /**
     *  Converts a callback function to an observable sequence. parameter. callback to produce a single item to yield on next. the callbacks. Observable that corresponds to the callback.
     * @static true
     * @name bindCallback
     * @owner Observable
     * @param {?} callbackFunc
     * @param {?=} selector
     * @param {?=} scheduler
     * @return {?}
     */
    static create(callbackFunc, selector = undefined, scheduler) {
        return (...args) => {
            return new BoundCallbackObservable(callbackFunc, /** @type {?} */ (selector), args, scheduler);
        };
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ callbackFunc = this.callbackFunc;
        const /** @type {?} */ args = this.args;
        const /** @type {?} */ scheduler = this.scheduler;
        let /** @type {?} */ subject = this.subject;
        if (!scheduler) {
            if (!subject) {
                subject = this.subject = new AsyncSubject_1.AsyncSubject();
                const /** @type {?} */ handler = function handlerFn(...innerArgs) {
                    const /** @type {?} */ source = ((handlerFn)).source;
                    const { selector, subject } = source;
                    if (selector) {
                        const /** @type {?} */ result = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                        if (result === errorObject_1.errorObject) {
                            subject.error(errorObject_1.errorObject.e);
                        }
                        else {
                            subject.next(result);
                            subject.complete();
                        }
                    }
                    else {
                        subject.next(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
                        subject.complete();
                    }
                };
                // use named function instance to avoid closure.
                ((handler)).source = this;
                const /** @type {?} */ result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
                if (result === errorObject_1.errorObject) {
                    subject.error(errorObject_1.errorObject.e);
                }
            }
            return subject.subscribe(subscriber);
        }
        else {
            return scheduler.schedule(dispatch, 0, { source: this, subscriber });
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BoundCallbackObservable.prototype.subject;
        /** @type {?} */
        BoundCallbackObservable.prototype.callbackFunc;
        /** @type {?} */
        BoundCallbackObservable.prototype.selector;
        /** @type {?} */
        BoundCallbackObservable.prototype.args;
        /** @type {?} */
        BoundCallbackObservable.prototype.scheduler;
    }
}
exports.BoundCallbackObservable = BoundCallbackObservable;
/**
 * @param {?} state
 * @return {?}
 */
function dispatch(state) {
    const /** @type {?} */ self = ((this));
    const { source, subscriber } = state;
    const { callbackFunc, args, scheduler } = source;
    let /** @type {?} */ subject = source.subject;
    if (!subject) {
        subject = source.subject = new AsyncSubject_1.AsyncSubject();
        const /** @type {?} */ handler = function handlerFn(...innerArgs) {
            const /** @type {?} */ source = ((handlerFn)).source;
            const { selector, subject } = source;
            if (selector) {
                const /** @type {?} */ result = tryCatch_1.tryCatch(selector).apply(this, innerArgs);
                if (result === errorObject_1.errorObject) {
                    self.add(scheduler.schedule(dispatchError, 0, { err: errorObject_1.errorObject.e, subject }));
                }
                else {
                    self.add(scheduler.schedule(dispatchNext, 0, { value: result, subject }));
                }
            }
            else {
                const /** @type {?} */ value = innerArgs.length === 1 ? innerArgs[0] : innerArgs;
                self.add(scheduler.schedule(dispatchNext, 0, { value, subject }));
            }
        };
        // use named function to pass values in without closure
        ((handler)).source = source;
        const /** @type {?} */ result = tryCatch_1.tryCatch(callbackFunc).apply(this, args.concat(handler));
        if (result === errorObject_1.errorObject) {
            subject.error(errorObject_1.errorObject.e);
        }
    }
    self.add(subject.subscribe(subscriber));
}
/**
 * @param {?} arg
 * @return {?}
 */
function dispatchNext(arg) {
    const { value, subject } = arg;
    subject.next(value);
    subject.complete();
}
/**
 * @param {?} arg
 * @return {?}
 */
function dispatchError(arg) {
    const { err, subject } = arg;
    subject.error(err);
}
