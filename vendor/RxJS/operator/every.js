goog.module('rxjs$operator$every');
var Subscriber_1 = goog.require('rxjs$Subscriber');
/**
 *  Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
 * @method every
 * @owner Observable
 * @param {?} predicate
 * @param {?=} thisArg
 * @return {?}
 */
function every(predicate, thisArg) {
    const /** @type {?} */ source = this;
    return source.lift(new EveryOperator(predicate, thisArg, source));
}
exports.every = every;
class EveryOperator {
    /**
     * @param {?} predicate
     * @param {?=} thisArg
     * @param {?=} source
     */
    constructor(predicate, thisArg, source) {
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }
    /**
     * @param {?} observer
     * @param {?} source
     * @return {?}
     */
    call(observer, source) {
        return source._subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        EveryOperator.prototype.predicate;
        /** @type {?} */
        EveryOperator.prototype.thisArg;
        /** @type {?} */
        EveryOperator.prototype.source;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class EverySubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} predicate
     * @param {?} thisArg
     * @param {?=} source
     */
    constructor(destination, predicate, thisArg, source) {
        super(destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
        this.index = 0;
        this.thisArg = thisArg || this;
    }
    /**
     * @param {?} everyValueMatch
     * @return {?}
     */
    notifyComplete(everyValueMatch) {
        this.destination.next(everyValueMatch);
        this.destination.complete();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        let /** @type {?} */ result = false;
        try {
            result = this.predicate.call(this.thisArg, value, this.index++, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (!result) {
            this.notifyComplete(false);
        }
    }
    /**
     * @return {?}
     */
    _complete() {
        this.notifyComplete(true);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        EverySubscriber.prototype.index;
        /** @type {?} */
        EverySubscriber.prototype.predicate;
        /** @type {?} */
        EverySubscriber.prototype.thisArg;
        /** @type {?} */
        EverySubscriber.prototype.source;
    }
}
