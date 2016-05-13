goog.module('rxjs$SubjectSubscription');
var Subscription_1 = goog.require('rxjs$Subscription');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class SubjectSubscription extends Subscription_1.Subscription {
    /**
     * @param {?} subject
     * @param {?} observer
     */
    constructor(subject, observer) {
        super();
        this.subject = subject;
        this.observer = observer;
        this.isUnsubscribed = false;
    }
    /**
     * @return {?}
     */
    unsubscribe() {
        if (this.isUnsubscribed) {
            return;
        }
        this.isUnsubscribed = true;
        const /** @type {?} */ subject = this.subject;
        const /** @type {?} */ observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isUnsubscribed) {
            return;
        }
        const /** @type {?} */ subscriberIndex = observers.indexOf(this.observer);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SubjectSubscription.prototype.isUnsubscribed;
        /** @type {?} */
        SubjectSubscription.prototype.subject;
        /** @type {?} */
        SubjectSubscription.prototype.observer;
    }
}
exports.SubjectSubscription = SubjectSubscription;
