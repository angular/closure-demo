goog.module('rxjs$operator$skipWhile');
var Subscriber_1 = goog.require('rxjs$Subscriber');
/**
 *  Returns an Observable that skips all items emitted by the source Observable as long as a specified condition holds true, but emits all further source items as soon as the condition becomes false. * <img src="./img/skipWhile.png" width="100%"> * specified predicate becomes false.
 * @method skipWhile
 * @owner Observable
 * @param {?} predicate
 * @return {?}
 */
function skipWhile(predicate) {
    return this.lift(new SkipWhileOperator(predicate));
}
exports.skipWhile = skipWhile;
class SkipWhileOperator {
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
        return source._subscribe(new SkipWhileSubscriber(subscriber, this.predicate));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SkipWhileOperator.prototype.predicate;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class SkipWhileSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} predicate
     */
    constructor(destination, predicate) {
        super(destination);
        this.predicate = predicate;
        this.skipping = true;
        this.index = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ destination = this.destination;
        if (this.skipping) {
            this.tryCallPredicate(value);
        }
        if (!this.skipping) {
            destination.next(value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    tryCallPredicate(value) {
        try {
            const /** @type {?} */ result = this.predicate(value, this.index++);
            this.skipping = Boolean(result);
        }
        catch (err) {
            this.destination.error(err);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SkipWhileSubscriber.prototype.skipping;
        /** @type {?} */
        SkipWhileSubscriber.prototype.index;
        /** @type {?} */
        SkipWhileSubscriber.prototype.predicate;
    }
}
