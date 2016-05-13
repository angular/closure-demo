goog.module('rxjs$observable$PromiseObservable');
var root_1 = goog.require('rxjs$util$root');
var Observable_1 = goog.require('rxjs$Observable');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
class PromiseObservable extends Observable_1.Observable {
    /**
     * @param {?} promise
     * @param {?=} scheduler
     */
    constructor(promise, scheduler = null) {
        super();
        this.promise = promise;
        this.scheduler = scheduler;
    }
    /**
     * @static true
     * @name fromPromise
     * @owner Observable
     * @param {?} promise
     * @param {?=} scheduler
     * @return {?}
     */
    static create(promise, scheduler = null) {
        return new PromiseObservable(promise, scheduler);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ promise = this.promise;
        const /** @type {?} */ scheduler = this.scheduler;
        if (scheduler == null) {
            if (this._isScalar) {
                if (!subscriber.isUnsubscribed) {
                    subscriber.next(this.value);
                    subscriber.complete();
                }
            }
            else {
                promise.then((value) => {
                    this.value = value;
                    this._isScalar = true;
                    if (!subscriber.isUnsubscribed) {
                        subscriber.next(value);
                        subscriber.complete();
                    }
                }, (err) => {
                    if (!subscriber.isUnsubscribed) {
                        subscriber.error(err);
                    }
                })
                    .then(null, err => {
                    // escape the promise trap, throw unhandled errors
                    root_1.root.setTimeout(() => { throw err; });
                });
            }
        }
        else {
            if (this._isScalar) {
                if (!subscriber.isUnsubscribed) {
                    return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber });
                }
            }
            else {
                promise.then((value) => {
                    this.value = value;
                    this._isScalar = true;
                    if (!subscriber.isUnsubscribed) {
                        subscriber.add(scheduler.schedule(dispatchNext, 0, { value, subscriber }));
                    }
                }, (err) => {
                    if (!subscriber.isUnsubscribed) {
                        subscriber.add(scheduler.schedule(dispatchError, 0, { err, subscriber }));
                    }
                })
                    .then(null, (err) => {
                    // escape the promise trap, throw unhandled errors
                    root_1.root.setTimeout(() => { throw err; });
                });
            }
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        PromiseObservable.prototype.value;
        /** @type {?} */
        PromiseObservable.prototype.promise;
        /** @type {?} */
        PromiseObservable.prototype.scheduler;
    }
}
exports.PromiseObservable = PromiseObservable;
/**
 * @param {?} arg
 * @return {?}
 */
function dispatchNext(arg) {
    const { value, subscriber } = arg;
    if (!subscriber.isUnsubscribed) {
        subscriber.next(value);
        subscriber.complete();
    }
}
/**
 * @param {?} arg
 * @return {?}
 */
function dispatchError(arg) {
    const { err, subscriber } = arg;
    if (!subscriber.isUnsubscribed) {
        subscriber.error(err);
    }
}
