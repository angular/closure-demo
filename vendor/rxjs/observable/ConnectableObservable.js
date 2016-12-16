import { SubjectSubscriber } from '../Subject';
import { Observable } from '../Observable';
import { Subscriber } from '../Subscriber';
import { Subscription } from '../Subscription';
export class ConnectableObservable extends Observable {
    /**
     * @param {?} source
     * @param {?} subjectFactory
     */
    constructor(source, subjectFactory) {
        super();
        this.source = source;
        this.subjectFactory = subjectFactory;
        this._refCount = 0;
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
        const /** @type {?} */ subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    }
    /**
     * @return {?}
     */
    connect() {
        let /** @type {?} */ connection = this._connection;
        if (!connection) {
            connection = this._connection = new Subscription();
            connection.add(this.source
                .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
            if (connection.closed) {
                this._connection = null;
                connection = Subscription.EMPTY;
            }
            else {
                this._connection = connection;
            }
        }
        return connection;
    }
    /**
     * @return {?}
     */
    refCount() {
        return this.lift(new RefCountOperator(this));
    }
}
function ConnectableObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    ConnectableObservable.prototype._subject;
    /** @type {?} */
    ConnectableObservable.prototype._refCount;
    /** @type {?} */
    ConnectableObservable.prototype._connection;
}
export const /** @type {?} */ connectableObservableDescriptor = {
    operator: { value: null },
    _refCount: { value: 0, writable: true },
    _subscribe: { value: ((ConnectableObservable.prototype))._subscribe },
    getSubject: { value: ((ConnectableObservable.prototype)).getSubject },
    connect: { value: ((ConnectableObservable.prototype)).connect },
    refCount: { value: ((ConnectableObservable.prototype)).refCount }
};
class ConnectableSubscriber extends SubjectSubscriber {
    /**
     * @param {?} destination
     * @param {?} connectable
     */
    constructor(destination, connectable) {
        super(destination);
        this.connectable = connectable;
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        this._unsubscribe();
        super._error(err);
    }
    /**
     * @return {?}
     */
    _complete() {
        this._unsubscribe();
        super._complete();
    }
    /**
     * @return {?}
     */
    _unsubscribe() {
        const { connectable } = this;
        if (connectable) {
            this.connectable = null;
            const /** @type {?} */ connection = ((connectable))._connection;
            ((connectable))._refCount = 0;
            ((connectable))._subject = null;
            ((connectable))._connection = null;
            if (connection) {
                connection.unsubscribe();
            }
        }
    }
}
class RefCountOperator {
    /**
     * @param {?} connectable
     */
    constructor(connectable) {
        this.connectable = connectable;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        const { connectable } = this;
        ((connectable))._refCount++;
        const /** @type {?} */ refCounter = new RefCountSubscriber(subscriber, connectable);
        const /** @type {?} */ subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            ((refCounter)).connection = connectable.connect();
        }
        return subscription;
    }
}
class RefCountSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} connectable
     */
    constructor(destination, connectable) {
        super(destination);
        this.connectable = connectable;
    }
    /**
     * @return {?}
     */
    _unsubscribe() {
        const { connectable } = this;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        const /** @type {?} */ refCount = ((connectable))._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        ((connectable))._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        ///
        // Compare the local RefCountSubscriber's connection Subscription to the
        // connection Subscription on the shared ConnectableObservable. In cases
        // where the ConnectableObservable source synchronously emits values, and
        // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
        // execution continues to here before the RefCountOperator has a chance to
        // supply the RefCountSubscriber with the shared connection Subscription.
        // For example:
        // ```
        // Observable.range(0, 10)
        //   .publish()
        //   .refCount()
        //   .take(5)
        //   .subscribe();
        // ```
        // In order to account for this case, RefCountSubscriber should only dispose
        // the ConnectableObservable's shared connection Subscription if the
        // connection Subscription exists, *and* either:
        //   a. RefCountSubscriber doesn't have a reference to the shared connection
        //      Subscription yet, or,
        //   b. RefCountSubscriber's connection Subscription reference is identical
        //      to the shared connection Subscription
        ///
        const { connection } = this;
        const /** @type {?} */ sharedConnection = ((connectable))._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    }
}
function RefCountSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    RefCountSubscriber.prototype.connection;
}
