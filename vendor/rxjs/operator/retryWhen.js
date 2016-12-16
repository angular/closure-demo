import { Subject } from '../Subject';
import { tryCatch } from '../util/tryCatch';
import { errorObject } from '../util/errorObject';
import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Returns an Observable that emits the same values as the source observable with the exception of an `error`.
 * An `error` will cause the emission of the Throwable that cause the error to the Observable returned from
 * notificationHandler. If that Observable calls onComplete or `error` then retry will call `complete` or `error`
 * on the child subscription. Otherwise, this Observable will resubscribe to the source observable, on a particular
 * Scheduler.
 *
 * <img src="./img/retryWhen.png" width="100%">
 *
 * aborting the retry.
 * @owner Observable
 * @this {?}
 * @param {?} notifier
 * @return {?}
 */
export function retryWhen(notifier) {
    return this.lift(new RetryWhenOperator(notifier, this));
}
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
        return source.subscribe(new RetryWhenSubscriber(subscriber, this.notifier, this.source));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class RetryWhenSubscriber extends OuterSubscriber {
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
                errors = new Subject();
                retries = tryCatch(this.notifier)(errors);
                if (retries === errorObject) {
                    return super.error(errorObject.e);
                }
                retriesSubscription = subscribeToResult(this, retries);
            }
            else {
                this.errors = null;
                this.retriesSubscription = null;
            }
            this.unsubscribe();
            this.closed = false;
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
        this.closed = false;
        this.errors = errors;
        this.retries = retries;
        this.retriesSubscription = retriesSubscription;
        this.source.subscribe(this);
    }
}
function RetryWhenSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    RetryWhenSubscriber.prototype.errors;
    /** @type {?} */
    RetryWhenSubscriber.prototype.retries;
    /** @type {?} */
    RetryWhenSubscriber.prototype.retriesSubscription;
}
