goog.module('rxjs$operator$toArray');
var Subscriber_1 = goog.require('rxjs$Subscriber');
/**
 * @method toArray
 * @owner Observable
 * @return {?}
 */
function toArray() {
    return this.lift(new ToArrayOperator());
}
exports.toArray = toArray;
class ToArrayOperator {
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new ToArraySubscriber(subscriber));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class ToArraySubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     */
    constructor(destination) {
        super(destination);
        this.array = [];
    }
    /**
     * @param {?} x
     * @return {?}
     */
    _next(x) {
        this.array.push(x);
    }
    /**
     * @return {?}
     */
    _complete() {
        this.destination.next(this.array);
        this.destination.complete();
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ToArraySubscriber.prototype.array;
    }
}
