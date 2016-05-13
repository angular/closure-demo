goog.module('rxjs$Subscription');
var isArray_1 = goog.require('rxjs$util$isArray');
var isObject_1 = goog.require('rxjs$util$isObject');
var isFunction_1 = goog.require('rxjs$util$isFunction');
var tryCatch_1 = goog.require('rxjs$util$tryCatch');
var errorObject_1 = goog.require('rxjs$util$errorObject');
var UnsubscriptionError_1 = goog.require('rxjs$util$UnsubscriptionError');
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
class Subscription {
    /**
     *  perform the disposal of resources when the `unsubscribe` method is called.
     * @param {?=} unsubscribe
     */
    constructor(unsubscribe) {
        this.isUnsubscribed = false;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     *  Disposes the resources held by the subscription. May, for instance, cancel an ongoing Observable execution or cancel any other type of work that started when the Subscription was created.
     * @return {?}
     */
    unsubscribe() {
        let /** @type {?} */ hasErrors = false;
        let /** @type {?} */ errors;
        if (this.isUnsubscribed) {
            return;
        }
        this.isUnsubscribed = true;
        const { _unsubscribe, _subscriptions } = ((this));
        ((this))._subscriptions = null;
        if (isFunction_1.isFunction(_unsubscribe)) {
            let /** @type {?} */ trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                (errors = errors || []).push(errorObject_1.errorObject.e);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            let /** @type {?} */ index = -1;
            const /** @type {?} */ len = _subscriptions.length;
            while (++index < len) {
                const /** @type {?} */ sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    let /** @type {?} */ trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        let /** @type {?} */ err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(err.errors);
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    }
    /**
     *  Adds a tear down to be called during the unsubscribe() of this Subscription. * If the tear down being added is a subscription that is already unsubscribed, is the same reference `add` is being called on, or is `Subscription.EMPTY`, it will not be added. * If this subscription is already in an `isUnsubscribed` state, the passed tear down logic will be executed immediately. * teardown. added to the inner subscriptions list. This Subscription can be used with `remove()` to remove the passed teardown logic from the inner subscriptions list.
     * @param {?} teardown
     * @return {?}
     */
    add(teardown) {
        if (!teardown || (teardown === this) || (teardown === Subscription.EMPTY)) {
            return;
        }
        let /** @type {?} */ sub = ((teardown));
        switch (typeof teardown) {
            case 'function':
                sub = new Subscription(/** @type {?} */ (teardown));
            case 'object':
                if (sub.isUnsubscribed || typeof sub.unsubscribe !== 'function') {
                    break;
                }
                else if (this.isUnsubscribed) {
                    sub.unsubscribe();
                }
                else {
                    (((this))._subscriptions || (((this))._subscriptions = [])).push(sub);
                }
                break;
            default:
                throw new Error('Unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        return sub;
    }
    /**
     *  Removes a Subscription from the internal list of subscriptions that will unsubscribe during the unsubscribe process of this Subscription.
     * @param {?} subscription
     * @return {?}
     */
    remove(subscription) {
        // HACK: This might be redundant because of the logic in `add()`
        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
            return;
        }
        const /** @type {?} */ subscriptions = ((this))._subscriptions;
        if (subscriptions) {
            const /** @type {?} */ subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        Subscription.EMPTY;
        /** A flag to indicate whether this Subscription has already been unsubscribed.
        @type {?} */
        Subscription.prototype.isUnsubscribed;
    }
}
Subscription.EMPTY = (function (empty) {
    empty.isUnsubscribed = true;
    return empty;
}(new Subscription()));
exports.Subscription = Subscription;
