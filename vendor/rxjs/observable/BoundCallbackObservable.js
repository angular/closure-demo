import { Observable } from '../Observable';
import { tryCatch } from '../util/tryCatch';
import { errorObject } from '../util/errorObject';
import { AsyncSubject } from '../AsyncSubject';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class BoundCallbackObservable extends Observable {
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
     * Converts a callback API to a function that returns an Observable.
     *
     * <span class="informal">Give it a function `f` of type `f(x, callback)` and
     * it will return a function `g` that when called as `g(x)` will output an
     * Observable.</span>
     *
     * `bindCallback` is not an operator because its input and output are not
     * Observables. The input is a function `func` with some parameters, but the
     * last parameter must be a callback function that `func` calls when it is
     * done. The output of `bindCallback` is a function that takes the same
     * parameters as `func`, except the last one (the callback). When the output
     * function is called with arguments, it will return an Observable where the
     * results will be delivered to.
     *
     * // Suppose we have jQuery.getJSON('/my/url', callback)
     * var getJSONAsObservable = Rx.Observable.bindCallback(jQuery.getJSON);
     * var result = getJSONAsObservable('/my/url');
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {\@link bindNodeCallback}
     * @see {\@link from}
     * @see {\@link fromPromise}
     *
     * callback and maps those a value to emit on the output Observable.
     * callbacks.
     * Observable that delivers the same values the callback would deliver.
     * @owner Observable
     * @param {?} func
     * @param {?=} selector
     * @param {?=} scheduler
     * @return {?}
     */
    static create(func, selector = undefined, scheduler) {
        return (...args) => {
            return new BoundCallbackObservable(func, /** @type {?} */ (selector), args, scheduler);
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
                subject = this.subject = new AsyncSubject();
                const /** @type {?} */ handler = function handlerFn(...innerArgs) {
                    const /** @type {?} */ source = ((handlerFn)).source;
                    const { selector, subject } = source;
                    if (selector) {
                        const /** @type {?} */ result = tryCatch(selector).apply(this, innerArgs);
                        if (result === errorObject) {
                            subject.error(errorObject.e);
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
                const /** @type {?} */ result = tryCatch(callbackFunc).apply(this, args.concat(handler));
                if (result === errorObject) {
                    subject.error(errorObject.e);
                }
            }
            return subject.subscribe(subscriber);
        }
        else {
            return scheduler.schedule(BoundCallbackObservable.dispatch, 0, { source: this, subscriber });
        }
    }
    /**
     * @param {?} state
     * @return {?}
     */
    static dispatch(state) {
        const /** @type {?} */ self = (((this)));
        const { source, subscriber } = state;
        const { callbackFunc, args, scheduler } = source;
        let /** @type {?} */ subject = source.subject;
        if (!subject) {
            subject = source.subject = new AsyncSubject();
            const /** @type {?} */ handler = function handlerFn(...innerArgs) {
                const /** @type {?} */ source = ((handlerFn)).source;
                const { selector, subject } = source;
                if (selector) {
                    const /** @type {?} */ result = tryCatch(selector).apply(this, innerArgs);
                    if (result === errorObject) {
                        self.add(scheduler.schedule(dispatchError, 0, { err: errorObject.e, subject }));
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
            const /** @type {?} */ result = tryCatch(callbackFunc).apply(this, args.concat(handler));
            if (result === errorObject) {
                subject.error(errorObject.e);
            }
        }
        self.add(subject.subscribe(subscriber));
    }
}
function BoundCallbackObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    BoundCallbackObservable.prototype.subject;
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
