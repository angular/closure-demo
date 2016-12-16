import { root } from '../util/root';
import { Observable } from '../Observable';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class PromiseObservable extends Observable {
    /**
     * @param {?} promise
     * @param {?=} scheduler
     */
    constructor(promise, scheduler) {
        super();
        this.promise = promise;
        this.scheduler = scheduler;
    }
    /**
     * Converts a Promise to an Observable.
     *
     * <span class="informal">Returns an Observable that just emits the Promise's
     * resolved value, then completes.</span>
     *
     * Converts an ES2015 Promise or a Promises/A+ spec compliant Promise to an
     * Observable. If the Promise resolves with a value, the output Observable
     * emits that resolved value as a `next`, and then completes. If the Promise
     * is rejected, then the output Observable emits the corresponding Error.
     *
     * var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {\@link bindCallback}
     * @see {\@link from}
     *
     * the delivery of the resolved value (or the rejection).
     * @owner Observable
     * @param {?} promise
     * @param {?=} scheduler
     * @return {?}
     */
    static create(promise, scheduler) {
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
                if (!subscriber.closed) {
                    subscriber.next(this.value);
                    subscriber.complete();
                }
            }
            else {
                promise.then((value) => {
                    this.value = value;
                    this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.next(value);
                        subscriber.complete();
                    }
                }, (err) => {
                    if (!subscriber.closed) {
                        subscriber.error(err);
                    }
                })
                    .then(null, err => {
                    // escape the promise trap, throw unhandled errors
                    root.setTimeout(() => { throw err; });
                });
            }
        }
        else {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber });
                }
            }
            else {
                promise.then((value) => {
                    this.value = value;
                    this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchNext, 0, { value, subscriber }));
                    }
                }, (err) => {
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchError, 0, { err, subscriber }));
                    }
                })
                    .then(null, (err) => {
                    // escape the promise trap, throw unhandled errors
                    root.setTimeout(() => { throw err; });
                });
            }
        }
    }
}
function PromiseObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    PromiseObservable.prototype.value;
}
/**
 * @param {?} arg
 * @return {?}
 */
function dispatchNext(arg) {
    const { value, subscriber } = arg;
    if (!subscriber.closed) {
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
    if (!subscriber.closed) {
        subscriber.error(err);
    }
}
