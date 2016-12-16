import { Observable } from './Observable';
import { Subscriber } from './Subscriber';
import { Subscription } from './Subscription';
import { ObjectUnsubscribedError } from './util/ObjectUnsubscribedError';
import { SubjectSubscription } from './SubjectSubscription';
import { $$rxSubscriber } from './symbol/rxSubscriber';
export class SubjectSubscriber extends Subscriber {
    /**
     * @param {?} destination
     */
    constructor(destination) {
        super(destination);
        this.destination = destination;
    }
}
export class Subject extends Observable {
    constructor() {
        super();
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    /**
     * @return {?}
     */
    [$$rxSubscriber]() {
        return new SubjectSubscriber(this);
    }
    /**
     * @param {?} operator
     * @return {?}
     */
    lift(operator) {
        const /** @type {?} */ subject = new AnonymousSubject(this, this);
        subject.operator = (operator);
        return (subject);
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    next(value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            const { observers } = this;
            const /** @type {?} */ len = observers.length;
            const /** @type {?} */ copy = observers.slice();
            for (let /** @type {?} */ i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    }
    /**
     * @param {?} err
     * @return {?}
     */
    error(err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        const { observers } = this;
        const /** @type {?} */ len = observers.length;
        const /** @type {?} */ copy = observers.slice();
        for (let /** @type {?} */ i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    }
    /**
     * @return {?}
     */
    complete() {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        this.isStopped = true;
        const { observers } = this;
        const /** @type {?} */ len = observers.length;
        const /** @type {?} */ copy = observers.slice();
        for (let /** @type {?} */ i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    }
    /**
     * @return {?}
     */
    unsubscribe() {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription(this, subscriber);
        }
    }
    /**
     * @return {?}
     */
    asObservable() {
        const /** @type {?} */ observable = new Observable();
        ((observable)).source = this;
        return observable;
    }
}
Subject.create = (destination, source) => {
    return new AnonymousSubject(destination, source);
};
function Subject_tsickle_Closure_declarations() {
    /** @type {?} */
    Subject.prototype.observers;
    /** @type {?} */
    Subject.prototype.closed;
    /** @type {?} */
    Subject.prototype.isStopped;
    /** @type {?} */
    Subject.prototype.hasError;
    /** @type {?} */
    Subject.prototype.thrownError;
    /** @type {?} */
    Subject.prototype.create;
}
export class AnonymousSubject extends Subject {
    /**
     * @param {?=} destination
     * @param {?=} source
     */
    constructor(destination, source) {
        super();
        this.destination = destination;
        this.source = source;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    next(value) {
        const { destination } = this;
        if (destination && destination.next) {
            destination.next(value);
        }
    }
    /**
     * @param {?} err
     * @return {?}
     */
    error(err) {
        const { destination } = this;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    }
    /**
     * @return {?}
     */
    complete() {
        const { destination } = this;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const { source } = this;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription.EMPTY;
        }
    }
}
