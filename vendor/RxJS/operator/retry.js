goog.module('rxjs$operator$retry');
var Subscriber_1 = goog.require('rxjs$Subscriber');
/**
 *  Returns an Observable that mirrors the source Observable, resubscribing to it if it calls `error` and the predicate returns true for that specific exception and retry count. If the source Observable calls `error`, this method will resubscribe to the source Observable for a maximum of count resubscriptions (given as a number parameter) rather than propagating the `error` call. * <img src="./img/retry.png" width="100%"> * Any and all items emitted by the source Observable will be emitted by the resulting Observable, even those emitted during failed subscriptions. For example, if an Observable fails at first but emits [1, 2] then succeeds the second time and emits: [1, 2, 3, 4, 5] then the complete stream of emissions and notifications would be: [1, 2, 1, 2, 3, 4, 5, `complete`].
 * @method retry
 * @owner Observable
 * @param {?=} count
 * @return {?}
 */
function retry(count = -1) {
    return this.lift(new RetryOperator(count, this));
}
exports.retry = retry;
class RetryOperator {
    /**
     * @param {?} count
     * @param {?} source
     */
    constructor(count, source) {
        this.count = count;
        this.source = source;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new RetrySubscriber(subscriber, this.count, this.source));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        RetryOperator.prototype.count;
        /** @type {?} */
        RetryOperator.prototype.source;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class RetrySubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} count
     * @param {?} source
     */
    constructor(destination, count, source) {
        super(destination);
        this.count = count;
        this.source = source;
    }
    /**
     * @param {?} err
     * @return {?}
     */
    error(err) {
        if (!this.isStopped) {
            const { source, count } = this;
            if (count === 0) {
                return super.error(err);
            }
            else if (count > -1) {
                this.count = count - 1;
            }
            this.unsubscribe();
            this.isStopped = false;
            this.isUnsubscribed = false;
            source.subscribe(this);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        RetrySubscriber.prototype.count;
        /** @type {?} */
        RetrySubscriber.prototype.source;
    }
}
