goog.module('rxjs$observable$ConnectableObservable');
var Observable_1 = goog.require('rxjs$Observable');
var Subscriber_1 = goog.require('rxjs$Subscriber');
var Subscription_1 = goog.require('rxjs$Subscription');
/**
 * @class ConnectableObservable<T>
 */
class ConnectableObservable extends Observable_1.Observable {
    /**
     * @param {?} source
     * @param {?} subjectFactory
     */
    constructor(source, subjectFactory) {
        super();
        this.source = source;
        this.subjectFactory = subjectFactory;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        return this.getSubject().subscribe(subscriber);
    }
    /**
     * @return {?}
     */
    getSubject() {
        const /** @type {?} */ subject = this.subject;
        if (subject && !subject.isUnsubscribed) {
            return subject;
        }
        return (this.subject = this.subjectFactory());
    }
    /**
     * @return {?}
     */
    connect() {
        const /** @type {?} */ source = this.source;
        let /** @type {?} */ subscription = this.subscription;
        if (subscription && !subscription.isUnsubscribed) {
            return subscription;
        }
        subscription = source.subscribe(this.getSubject());
        subscription.add(new ConnectableSubscription(this));
        return (this.subscription = subscription);
    }
    /**
     * @return {?}
     */
    refCount() {
        return new RefCountObservable(this);
    }
    /**
     *  This method is opened for `ConnectableSubscription`. Not to call from others.
     * @return {?}
     */
    _closeSubscription() {
        this.subject = null;
        this.subscription = null;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ConnectableObservable.prototype.subject;
        /** @type {?} */
        ConnectableObservable.prototype.subscription;
        /** @type {?} */
        ConnectableObservable.prototype.source;
        /** @type {?} */
        ConnectableObservable.prototype.subjectFactory;
    }
}
exports.ConnectableObservable = ConnectableObservable;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class ConnectableSubscription extends Subscription_1.Subscription {
    /**
     * @param {?} connectable
     */
    constructor(connectable) {
        super();
        this.connectable = connectable;
    }
    /**
     * @return {?}
     */
    _unsubscribe() {
        const /** @type {?} */ connectable = this.connectable;
        connectable._closeSubscription();
        this.connectable = null;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ConnectableSubscription.prototype.connectable;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class RefCountObservable extends Observable_1.Observable {
    /**
     * @param {?} connectable
     * @param {?=} refCount
     */
    constructor(connectable, refCount = 0) {
        super();
        this.connectable = connectable;
        this.refCount = refCount;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ connectable = this.connectable;
        const /** @type {?} */ refCountSubscriber = new RefCountSubscriber(subscriber, this);
        const /** @type {?} */ subscription = connectable.subscribe(refCountSubscriber);
        if (!subscription.isUnsubscribed && ++this.refCount === 1) {
            refCountSubscriber.connection = this.connection = connectable.connect();
        }
        return subscription;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        RefCountObservable.prototype.connection;
        /** @type {?} */
        RefCountObservable.prototype.connectable;
        /** @type {?} */
        RefCountObservable.prototype.refCount;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class RefCountSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} refCountObservable
     */
    constructor(destination, refCountObservable) {
        super(null);
        this.destination = destination;
        this.refCountObservable = refCountObservable;
        this.connection = refCountObservable.connection;
        destination.add(this);
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
        this._resetConnectable();
        this.destination.error(err);
    }
    /**
     * @return {?}
     */
    _complete() {
        this._resetConnectable();
        this.destination.complete();
    }
    /**
     * @return {?}
     */
    _resetConnectable() {
        const /** @type {?} */ observable = this.refCountObservable;
        const /** @type {?} */ obsConnection = observable.connection;
        const /** @type {?} */ subConnection = this.connection;
        if (subConnection && subConnection === obsConnection) {
            observable.refCount = 0;
            obsConnection.unsubscribe();
            observable.connection = null;
            this.unsubscribe();
        }
    }
    /**
     * @return {?}
     */
    _unsubscribe() {
        const /** @type {?} */ observable = this.refCountObservable;
        if (observable.refCount === 0) {
            return;
        }
        if (--observable.refCount === 0) {
            const /** @type {?} */ obsConnection = observable.connection;
            const /** @type {?} */ subConnection = this.connection;
            if (subConnection && subConnection === obsConnection) {
                obsConnection.unsubscribe();
                observable.connection = null;
            }
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        RefCountSubscriber.prototype.connection;
        /** @type {?} */
        RefCountSubscriber.prototype.destination;
        /** @type {?} */
        RefCountSubscriber.prototype.refCountObservable;
    }
}
