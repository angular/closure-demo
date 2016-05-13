goog.module('rxjs$Subject');
var Observable_1 = goog.require('rxjs$Observable');
var Subscriber_1 = goog.require('rxjs$Subscriber');
var Subscription_1 = goog.require('rxjs$Subscription');
var SubjectSubscription_1 = goog.require('rxjs$SubjectSubscription');
var rxSubscriber_1 = goog.require('rxjs$symbol$rxSubscriber');
var throwError_1 = goog.require('rxjs$util$throwError');
var ObjectUnsubscribedError_1 = goog.require('rxjs$util$ObjectUnsubscribedError');
/**
 * @class Subject<T>
 */
class Subject extends Observable_1.Observable {
    /**
     * @param {?=} destination
     * @param {?=} source
     */
    constructor(destination, source) {
        super();
        this.destination = destination;
        this.source = source;
        this.observers = [];
        this.isUnsubscribed = false;
        this.isStopped = false;
        this.hasErrored = false;
        this.dispatching = false;
        this.hasCompleted = false;
        this.source = source;
    }
    /**
     * @param {?} operator
     * @return {?}
     */
    lift(operator) {
        const /** @type {?} */ subject = new Subject(this.destination || this, this);
        subject.operator = operator;
        return (subject);
    }
    /**
     * @param {?} subscription
     * @return {?}
     */
    add(subscription) {
        return Subscription_1.Subscription.prototype.add.call(this, subscription);
    }
    /**
     * @param {?} subscription
     * @return {?}
     */
    remove(subscription) {
        Subscription_1.Subscription.prototype.remove.call(this, subscription);
    }
    /**
     * @return {?}
     */
    unsubscribe() {
        Subscription_1.Subscription.prototype.unsubscribe.call(this);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        if (this.source) {
            return this.source.subscribe(subscriber);
        }
        else {
            if (subscriber.isUnsubscribed) {
                return;
            }
            else if (this.hasErrored) {
                return subscriber.error(this.errorValue);
            }
            else if (this.hasCompleted) {
                return subscriber.complete();
            }
            this.throwIfUnsubscribed();
            const /** @type {?} */ subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
            this.observers.push(subscriber);
            return subscription;
        }
    }
    /**
     * @return {?}
     */
    _unsubscribe() {
        this.source = null;
        this.isStopped = true;
        this.observers = null;
        this.destination = null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    next(value) {
        this.throwIfUnsubscribed();
        if (this.isStopped) {
            return;
        }
        this.dispatching = true;
        this._next(value);
        this.dispatching = false;
        if (this.hasErrored) {
            this._error(this.errorValue);
        }
        else if (this.hasCompleted) {
            this._complete();
        }
    }
    /**
     * @param {?=} err
     * @return {?}
     */
    error(err) {
        this.throwIfUnsubscribed();
        if (this.isStopped) {
            return;
        }
        this.isStopped = true;
        this.hasErrored = true;
        this.errorValue = err;
        if (this.dispatching) {
            return;
        }
        this._error(err);
    }
    /**
     * @return {?}
     */
    complete() {
        this.throwIfUnsubscribed();
        if (this.isStopped) {
            return;
        }
        this.isStopped = true;
        this.hasCompleted = true;
        if (this.dispatching) {
            return;
        }
        this._complete();
    }
    /**
     * @return {?}
     */
    asObservable() {
        const /** @type {?} */ observable = new SubjectObservable(this);
        return observable;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        if (this.destination) {
            this.destination.next(value);
        }
        else {
            this._finalNext(value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _finalNext(value) {
        let /** @type {?} */ index = -1;
        const /** @type {?} */ observers = this.observers.slice(0);
        const /** @type {?} */ len = observers.length;
        while (++index < len) {
            observers[index].next(value);
        }
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        if (this.destination) {
            this.destination.error(err);
        }
        else {
            this._finalError(err);
        }
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _finalError(err) {
        let /** @type {?} */ index = -1;
        const /** @type {?} */ observers = this.observers;
        // optimization to block our SubjectSubscriptions from
        // splicing themselves out of the observers list one by one.
        this.observers = null;
        this.isUnsubscribed = true;
        if (observers) {
            const /** @type {?} */ len = observers.length;
            while (++index < len) {
                observers[index].error(err);
            }
        }
        this.isUnsubscribed = false;
        this.unsubscribe();
    }
    /**
     * @return {?}
     */
    _complete() {
        if (this.destination) {
            this.destination.complete();
        }
        else {
            this._finalComplete();
        }
    }
    /**
     * @return {?}
     */
    _finalComplete() {
        let /** @type {?} */ index = -1;
        const /** @type {?} */ observers = this.observers;
        // optimization to block our SubjectSubscriptions from
        // splicing themselves out of the observers list one by one.
        this.observers = null;
        this.isUnsubscribed = true;
        if (observers) {
            const /** @type {?} */ len = observers.length;
            while (++index < len) {
                observers[index].complete();
            }
        }
        this.isUnsubscribed = false;
        this.unsubscribe();
    }
    /**
     * @return {?}
     */
    throwIfUnsubscribed() {
        if (this.isUnsubscribed) {
            throwError_1.throwError(new ObjectUnsubscribedError_1.ObjectUnsubscribedError());
        }
    }
    /**
     * @return {?}
     */
    [rxSubscriber_1.$$rxSubscriber]() {
        return new Subscriber_1.Subscriber(this);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        Subject.create;
        /** @type {?} */
        Subject.prototype.observers;
        /** @type {?} */
        Subject.prototype.isUnsubscribed;
        /** @type {?} */
        Subject.prototype.isStopped;
        /** @type {?} */
        Subject.prototype.hasErrored;
        /** @type {?} */
        Subject.prototype.errorValue;
        /** @type {?} */
        Subject.prototype.dispatching;
        /** @type {?} */
        Subject.prototype.hasCompleted;
        /** @type {?} */
        Subject.prototype.destination;
        /** @type {?} */
        Subject.prototype.source;
    }
}
Subject.create = (destination, source) => {
    return new Subject(destination, source);
};
exports.Subject = Subject;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class SubjectObservable extends Observable_1.Observable {
    /**
     * @param {?} source
     */
    constructor(source) {
        super();
        this.source = source;
    }
}
