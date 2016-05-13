goog.module('rxjs$OuterSubscriber');
var Subscriber_1 = goog.require('rxjs$Subscriber');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class OuterSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @param {?} innerSub
     * @return {?}
     */
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    }
    /**
     * @param {?} error
     * @param {?} innerSub
     * @return {?}
     */
    notifyError(error, innerSub) {
        this.destination.error(error);
    }
    /**
     * @param {?} innerSub
     * @return {?}
     */
    notifyComplete(innerSub) {
        this.destination.complete();
    }
}
exports.OuterSubscriber = OuterSubscriber;
