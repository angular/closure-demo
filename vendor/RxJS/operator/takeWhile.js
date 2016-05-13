goog.module('rxjs$operator$takeWhile');
var Subscriber_1 = goog.require('rxjs$Subscriber');
/**
 * @method takeWhile
 * @owner Observable
 * @param {?} predicate
 * @return {?}
 */
function takeWhile(predicate) {
    return this.lift(new TakeWhileOperator(predicate));
}
exports.takeWhile = takeWhile;
class TakeWhileOperator {
    /**
     * @param {?} predicate
     */
    constructor(predicate) {
        this.predicate = predicate;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new TakeWhileSubscriber(subscriber, this.predicate));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TakeWhileOperator.prototype.predicate;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class TakeWhileSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} predicate
     */
    constructor(destination, predicate) {
        super(destination);
        this.predicate = predicate;
        this.index = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ destination = this.destination;
        let /** @type {?} */ result;
        try {
            result = this.predicate(value, this.index++);
        }
        catch (err) {
            destination.error(err);
            return;
        }
        this.nextOrComplete(value, result);
    }
    /**
     * @param {?} value
     * @param {?} predicateResult
     * @return {?}
     */
    nextOrComplete(value, predicateResult) {
        const /** @type {?} */ destination = this.destination;
        if (Boolean(predicateResult)) {
            destination.next(value);
        }
        else {
            destination.complete();
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TakeWhileSubscriber.prototype.index;
        /** @type {?} */
        TakeWhileSubscriber.prototype.predicate;
    }
}
