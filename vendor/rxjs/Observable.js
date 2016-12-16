import { root } from './util/root';
import { toSubscriber } from './util/toSubscriber';
import { $$observable } from './symbol/observable';
/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 */
export class Observable {
    /**
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     * @param {?=} subscribe
     */
    constructor(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
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
     * @param {?=} observerOrNext
     * @param {?=} error
     * @param {?=} complete
     * @return {?}
     */
    subscribe(observerOrNext, error, complete) {
        const { operator } = this;
        const /** @type {?} */ sink = toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this._subscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    }
    /**
     *  rejects with the handled error
     * @param {?} next
     * @param {?=} PromiseCtor
     * @return {?}
     */
    forEach(next, PromiseCtor) {
        if (!PromiseCtor) {
            if (root.Rx && root.Rx.config && root.Rx.config.Promise) {
                PromiseCtor = root.Rx.config.Promise;
            }
            else if (root.Promise) {
                PromiseCtor = root.Promise;
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
                    // If it errors, Observable's `subscribe` will ensure the
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
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @return {?}
     */
    [$$observable]() {
        return this;
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
function Observable_tsickle_Closure_declarations() {
    /** @type {?} */
    Observable.prototype._isScalar;
    /** @type {?} */
    Observable.prototype.source;
    /** @type {?} */
    Observable.prototype.operator;
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @owner Observable
     * @type {?}
     */
    Observable.prototype.create;
    /** @type {?} */
    Observable.prototype.if;
    /** @type {?} */
    Observable.prototype.throw;
}
