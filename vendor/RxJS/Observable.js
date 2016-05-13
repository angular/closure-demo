goog.module('rxjs$Observable');
var root_1 = goog.require('rxjs$util$root');
var observable_1 = goog.require('rxjs$symbol$observable');
var toSubscriber_1 = goog.require('rxjs$util$toSubscriber');
/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
class Observable {
    /**
     * @constructor undefined initially subscribed to. This function is given a Subscriber, to which new values can be `next`ed, or an `error` method can be called to raise an error, or `complete` can be called to notify of a successful completion.
     * @param {?=} subscribe
     */
    constructor(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     *  Creates a new Observable, with this Observable as the source, and the passed operator defined as the new observable's operator.
     * @method lift
     * @param {?} operator
     * @return {?}
     */
    lift(operator) {
        const /** @type {?} */ observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    }
    /**
     *  Registers handlers for handling emitted values, error and completions from the observable, and executes the observable's subscriber function, which will take action to set up the underlying data stream
     * @method subscribe or the first of three possible handlers, which is the handler for each value emitted from the observable. the error will be thrown as unhandled
     * @param {?=} observerOrNext
     * @param {?=} error
     * @param {?=} complete
     * @return {?}
     */
    subscribe(observerOrNext, error, complete) {
        const { operator } = this;
        const /** @type {?} */ sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        sink.add(operator ? operator.call(sink, this) : this._subscribe(sink));
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    }
    /**
     * @method forEach rejects with the handled error
     * @param {?} next
     * @param {?=} PromiseCtor
     * @return {?}
     */
    forEach(next, PromiseCtor) {
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor((resolve, reject) => {
            const /** @type {?} */ subscription = this.subscribe((value) => {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` imple will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        return this.source.subscribe(subscriber);
    }
    /**
     *  An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {?}
     */
    [observable_1.$$observable]() {
        return this;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** Creates a new cold Observable by calling the Observable constructor
       @static
       @owner
       @method
        @type {?} */
        Observable.create;
        /** @type {?} */
        Observable.if;
        /** @type {?} */
        Observable.throw;
        /** @type {?} */
        Observable.prototype._isScalar;
        /** @type {?} */
        Observable.prototype.source;
        /** @type {?} */
        Observable.prototype.operator;
    }
}
// HACK: Since TypeScript inherits static properties too, we have to
// fight against TypeScript here so Subject can have a different static create signature
/**
 * Creates a new cold Observable by calling the Observable constructor
 * @static true
 * @owner Observable
 * @method create
 * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
 * @return {Observable} a new cold observable
 */
Observable.create = (subscribe) => {
    return new Observable(subscribe);
};
exports.Observable = Observable;
