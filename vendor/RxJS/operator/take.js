goog.module('rxjs$operator$take');
var Subscriber_1 = goog.require('rxjs$Subscriber');
var ArgumentOutOfRangeError_1 = goog.require('rxjs$util$ArgumentOutOfRangeError');
var EmptyObservable_1 = goog.require('rxjs$observable$EmptyObservable');
/**
 * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 * @method take
 * @owner Observable
 * @param {?} total
 * @return {?}
 */
function take(total) {
    if (total === 0) {
        return new EmptyObservable_1.EmptyObservable();
    }
    else {
        return this.lift(new TakeOperator(total));
    }
}
exports.take = take;
class TakeOperator {
    /**
     * @param {?} total
     */
    constructor(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new TakeSubscriber(subscriber, this.total));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TakeOperator.prototype.total;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class TakeSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} total
     */
    constructor(destination, total) {
        super(destination);
        this.total = total;
        this.count = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ total = this.total;
        if (++this.count <= total) {
            this.destination.next(value);
            if (this.count === total) {
                this.destination.complete();
                this.unsubscribe();
            }
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TakeSubscriber.prototype.count;
        /** @type {?} */
        TakeSubscriber.prototype.total;
    }
}
