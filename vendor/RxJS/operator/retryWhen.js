goog.module('rxjs$operator$retryWhen');
var Subject_1 = goog.require('rxjs$Subject');
var tryCatch_1 = goog.require('rxjs$util$tryCatch');
var errorObject_1 = goog.require('rxjs$util$errorObject');
var OuterSubscriber_1 = goog.require('rxjs$OuterSubscriber');
var subscribeToResult_1 = goog.require('rxjs$util$subscribeToResult');
/**
 *  Returns an Observable that emits the same values as the source observable with the exception of an `error`. An `error` will cause the emission of the Throwable that cause the error to the Observable returned from notificationHandler. If that Observable calls onComplete or `error` then retry will call `complete` or `error` on the child subscription. Otherwise, this Observable will resubscribe to the source observable, on a particular Scheduler. * <img src="./img/retryWhen.png" width="100%"> * aborting the retry.
 * @method retryWhen
 * @owner Observable
 * @param {?} notifier
 * @return {?}
 */
function retryWhen(notifier) {
    return this.lift(new RetryWhenOperator(notifier, this));
}
exports.retryWhen = retryWhen;
class RetryWhenOperator {
    /**
     * @param {?} notifier
     * @param {?} source
     */
    constructor(notifier, source) {
        this.notifier = notifier;
        this.source = source;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new RetryWhenSubscriber(subscriber, this.notifier, this.source));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        RetryWhenOperator.prototype.notifier;
        /** @type {?} */
        RetryWhenOperator.prototype.source;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class RetryWhenSubscriber extends OuterSubscriber_1.OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} notifier
     * @param {?} source
     */
    constructor(destination, notifier, source) {
        super(destination);
        this.notifier = notifier;
        this.source = source;
    }
    /**
     * @param {?} err
     * @return {?}
     */
    error(err) {
        if (!this.isStopped) {
            let /** @type {?} */ errors = this.errors;
            let /** @type {?} */ retries = this.retries;
            let /** @type {?} */ retriesSubscription = this.retriesSubscription;
            if (!retries) {
                errors = new Subject_1.Subject();
                retries = tryCatch_1.tryCatch(this.notifier)(errors);
                if (retries === errorObject_1.errorObject) {
                    return super.error(errorObject_1.errorObject.e);
                }
                retriesSubscription = subscribeToResult_1.subscribeToResult(this, retries);
            }
            else {
                this.errors = null;
                this.retriesSubscription = null;
            }
            this.unsubscribe();
            this.isUnsubscribed = false;
            this.errors = errors;
            this.retries = retries;
            this.retriesSubscription = retriesSubscription;
            errors.next(err);
        }
    }
    /**
     * @return {?}
     */
    _unsubscribe() {
        const { errors, retriesSubscription } = this;
        if (errors) {
            errors.unsubscribe();
            this.errors = null;
        }
        if (retriesSubscription) {
            retriesSubscription.unsubscribe();
            this.retriesSubscription = null;
        }
        this.retries = null;
    }
    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @param {?} innerSub
     * @return {?}
     */
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        const { errors, retries, retriesSubscription } = this;
        this.errors = null;
        this.retries = null;
        this.retriesSubscription = null;
        this.unsubscribe();
        this.isStopped = false;
        this.isUnsubscribed = false;
        this.errors = errors;
        this.retries = retries;
        this.retriesSubscription = retriesSubscription;
        this.source.subscribe(this);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        RetryWhenSubscriber.prototype.errors;
        /** @type {?} */
        RetryWhenSubscriber.prototype.retries;
        /** @type {?} */
        RetryWhenSubscriber.prototype.retriesSubscription;
        /** @type {?} */
        RetryWhenSubscriber.prototype.notifier;
        /** @type {?} */
        RetryWhenSubscriber.prototype.source;
    }
}
