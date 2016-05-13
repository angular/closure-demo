goog.module('rxjs$operator$finally');
var Subscriber_1 = goog.require('rxjs$Subscriber');
var Subscription_1 = goog.require('rxjs$Subscription');
/**
 *  Returns an Observable that mirrors the source Observable, but will call a specified function when the source terminates on complete or error.
 * @method finally
 * @owner Observable
 * @param {?} finallySelector
 * @return {?}
 */
function _finally(finallySelector) {
    return this.lift(new FinallyOperator(finallySelector));
}
exports._finally = _finally;
class FinallyOperator {
    /**
     * @param {?} finallySelector
     */
    constructor(finallySelector) {
        this.finallySelector = finallySelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new FinallySubscriber(subscriber, this.finallySelector));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        FinallyOperator.prototype.finallySelector;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class FinallySubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} finallySelector
     */
    constructor(destination, finallySelector) {
        super(destination);
        this.add(new Subscription_1.Subscription(finallySelector));
    }
}
