import { Subject } from '../Subject';
import { tryCatch } from '../util/tryCatch';
import { errorObject } from '../util/errorObject';
import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Returns an Observable that emits the same values as the source observable with the exception of a `complete`.
 * A `complete` will cause the emission of the Throwable that cause the complete to the Observable returned from
 * notificationHandler. If that Observable calls onComplete or `complete` then retry will call `complete` or `error`
 * on the child subscription. Otherwise, this Observable will resubscribe to the source observable, on a particular
 * Scheduler.
 *
 * <img src="./img/repeatWhen.png" width="100%">
 *
 * aborting the retry.
 * @owner Observable
 * @this {?}
 * @param {?} notifier
 * @return {?}
 */
export function repeatWhen(notifier) {
    return this.lift(new RepeatWhenOperator(notifier, this));
}
class RepeatWhenOperator {
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
        return source.subscribe(new RepeatWhenSubscriber(subscriber, this.notifier, this.source));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class RepeatWhenSubscriber extends OuterSubscriber {
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
     * @return {?}
     */
    complete() {
        if (!this.isStopped) {
            let /** @type {?} */ notifications = this.notifications;
            let /** @type {?} */ retries = this.retries;
            let /** @type {?} */ retriesSubscription = this.retriesSubscription;
            if (!retries) {
                notifications = new Subject();
                retries = tryCatch(this.notifier)(notifications);
                if (retries === errorObject) {
                    return super.complete();
                }
                retriesSubscription = subscribeToResult(this, retries);
            }
            else {
                this.notifications = null;
                this.retriesSubscription = null;
            }
            this.unsubscribe();
            this.closed = false;
            this.notifications = notifications;
            this.retries = retries;
            this.retriesSubscription = retriesSubscription;
            notifications.next();
        }
    }
    /**
     * @return {?}
     */
    _unsubscribe() {
        const { notifications, retriesSubscription } = this;
        if (notifications) {
            notifications.unsubscribe();
            this.notifications = null;
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
        const { notifications, retries, retriesSubscription } = this;
        this.notifications = null;
        this.retries = null;
        this.retriesSubscription = null;
        this.unsubscribe();
        this.isStopped = false;
        this.closed = false;
        this.notifications = notifications;
        this.retries = retries;
        this.retriesSubscription = retriesSubscription;
        this.source.subscribe(this);
    }
}
function RepeatWhenSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    RepeatWhenSubscriber.prototype.notifications;
    /** @type {?} */
    RepeatWhenSubscriber.prototype.retries;
    /** @type {?} */
    RepeatWhenSubscriber.prototype.retriesSubscription;
}
