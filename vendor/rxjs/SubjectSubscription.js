import { Subscription } from './Subscription';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class SubjectSubscription extends Subscription {
    /**
     * @param {?} subject
     * @param {?} subscriber
     */
    constructor(subject, subscriber) {
        super();
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
    }
    /**
     * @return {?}
     */
    unsubscribe() {
        if (this.closed) {
            return;
        }
        this.closed = true;
        const /** @type {?} */ subject = this.subject;
        const /** @type {?} */ observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        const /** @type {?} */ subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    }
}
function SubjectSubscription_tsickle_Closure_declarations() {
    /** @type {?} */
    SubjectSubscription.prototype.closed;
}
