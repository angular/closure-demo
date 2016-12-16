import { Observable } from '../Observable';
import { tryCatch } from '../util/tryCatch';
import { errorObject } from '../util/errorObject';
import { AsyncSubject } from '../AsyncSubject';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class BoundNodeCallbackObservable extends Observable {
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
     * Converts a Node.js-style callback API to a function that returns an
     * Observable.
     *
     * <span class="informal">It's just like {\@link bindCallback}, but the
     * callback is expected to be of type `callback(error, result)`.</span>
     *
     * `bindNodeCallback` is not an operator because its input and output are not
     * Observables. The input is a function `func` with some parameters, but the
     * last parameter must be a callback function that `func` calls when it is
     * done. The callback function is expected to follow Node.js conventions,
     * where the first argument to the callback is an error, while remaining
     * arguments are the callback result. The output of `bindNodeCallback` is a
     * function that takes the same parameters as `func`, except the last one (the
     * callback). When the output function is called with arguments, it will
     * return an Observable where the results will be delivered to.
     *
     * import * as fs from 'fs';
     * var readFileAsObservable = Rx.Observable.bindNodeCallback(fs.readFile);
     * var result = readFileAsObservable('./roadNames.txt', 'utf8');
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {\@link bindCallback}
     * @see {\@link from}
     * @see {\@link fromPromise}
     *
     * callback and maps those a value to emit on the output Observable.
     * callbacks.
     * Observable that delivers the same values the Node.js callback would
     * deliver.
     * @owner Observable
     * @param {?} func
     * @param {?=} selector
     * @param {?=} scheduler
     * @return {?}
     */
    static create(func, selector = undefined, scheduler) {
        return (...args) => {
            return new BoundNodeCallbackObservable(func, /** @type {?} */ (selector), args, scheduler);
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
                    const /** @type {?} */ err = innerArgs.shift();
                    if (err) {
                        subject.error(err);
                    }
                    else if (selector) {
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
            return scheduler.schedule(dispatch, 0, { source: this, subscriber });
        }
    }
}
function BoundNodeCallbackObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    BoundNodeCallbackObservable.prototype.subject;
}
/**
 * @this {?}
 * @param {?} state
 * @return {?}
 */
function dispatch(state) {
    const /** @type {?} */ self = ((this));
    const { source, subscriber } = state;
    // XXX: cast to `any` to access to the private field in `source`.
    const { callbackFunc, args, scheduler } = (source);
    let /** @type {?} */ subject = source.subject;
    if (!subject) {
        subject = source.subject = new AsyncSubject();
        const /** @type {?} */ handler = function handlerFn(...innerArgs) {
            const /** @type {?} */ source = ((handlerFn)).source;
            const { selector, subject } = source;
            const /** @type {?} */ err = innerArgs.shift();
            if (err) {
                subject.error(err);
            }
            else if (selector) {
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
