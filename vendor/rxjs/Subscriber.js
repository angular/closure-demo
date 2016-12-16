import { isFunction } from './util/isFunction';
import { Subscription } from './Subscription';
import { empty as emptyObserver } from './Observer';
import { $$rxSubscriber } from './symbol/rxSubscriber';
/**
 * Implements the {\@link Observer} interface and extends the
 * {\@link Subscription} class. While the {\@link Observer} is the public API for
 * consuming the values of an {\@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 */
export class Subscriber extends Subscription {
    /**
     * defined Observer or a `next` callback function.
     * Observer.
     * Observer.
     * @param {?=} destinationOrNext
     * @param {?=} error
     * @param {?=} complete
     */
    constructor(destinationOrNext, error, complete) {
        super();
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = emptyObserver;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = emptyObserver;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    /**
     * @return {?}
     */
    [$$rxSubscriber]() { return this; }
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * Observer.
     * Observer.
     * Observer represented by the given arguments.
     * @param {?=} next
     * @param {?=} error
     * @param {?=} complete
     * @return {?}
     */
    static create(next, error, complete) {
        const /** @type {?} */ subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    }
    /**
     * The {\@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {?=} value
     * @return {?}
     */
    next(value) {
        if (!this.isStopped) {
            this._next(value);
        }
    }
    /**
     * The {\@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {\@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {?=} err
     * @return {?}
     */
    error(err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    }
    /**
     * The {\@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {?}
     */
    complete() {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    }
    /**
     * @return {?}
     */
    unsubscribe() {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        super.unsubscribe();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.destination.next(value);
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        this.destination.error(err);
        this.unsubscribe();
    }
    /**
     * @return {?}
     */
    _complete() {
        this.destination.complete();
        this.unsubscribe();
    }
}
function Subscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    Subscriber.prototype.syncErrorValue;
    /** @type {?} */
    Subscriber.prototype.syncErrorThrown;
    /** @type {?} */
    Subscriber.prototype.syncErrorThrowable;
    /** @type {?} */
    Subscriber.prototype.isStopped;
    /** @type {?} */
    Subscriber.prototype.destination;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class SafeSubscriber extends Subscriber {
    /**
     * @param {?} _parent
     * @param {?=} observerOrNext
     * @param {?=} error
     * @param {?=} complete
     */
    constructor(_parent, observerOrNext, error, complete) {
        super();
        this._parent = _parent;
        let next;
        let context = this;
        if (isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            context = observerOrNext;
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (isFunction(context.unsubscribe)) {
                this.add(context.unsubscribe.bind(context));
            }
            context.unsubscribe = this.unsubscribe.bind(this);
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    next(value) {
        if (!this.isStopped && this._next) {
            const { _parent } = this;
            if (!_parent.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parent, this._next, value)) {
                this.unsubscribe();
            }
        }
    }
    /**
     * @param {?=} err
     * @return {?}
     */
    error(err) {
        if (!this.isStopped) {
            const { _parent } = this;
            if (this._error) {
                if (!_parent.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parent, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parent.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parent.syncErrorValue = err;
                _parent.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    }
    /**
     * @return {?}
     */
    complete() {
        if (!this.isStopped) {
            const { _parent } = this;
            if (this._complete) {
                if (!_parent.syncErrorThrowable) {
                    this.__tryOrUnsub(this._complete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parent, this._complete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    }
    /**
     * @param {?} fn
     * @param {?=} value
     * @return {?}
     */
    __tryOrUnsub(fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    }
    /**
     * @param {?} parent
     * @param {?} fn
     * @param {?=} value
     * @return {?}
     */
    __tryOrSetError(parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    }
    /**
     * @return {?}
     */
    _unsubscribe() {
        const { _parent } = this;
        this._context = null;
        this._parent = null;
        _parent.unsubscribe();
    }
}
function SafeSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SafeSubscriber.prototype._context;
}
