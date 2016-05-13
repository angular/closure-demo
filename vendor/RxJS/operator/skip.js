goog.module('rxjs$operator$skip');
var Subscriber_1 = goog.require('rxjs$Subscriber');
/**
 *  Returns an Observable that skips `n` items emitted by an Observable. * <img src="./img/skip.png" width="100%"> * *
 * @method skip
 * @owner Observable
 * @param {?} total
 * @return {?}
 */
function skip(total) {
    return this.lift(new SkipOperator(total));
}
exports.skip = skip;
class SkipOperator {
    /**
     * @param {?} total
     */
    constructor(total) {
        this.total = total;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new SkipSubscriber(subscriber, this.total));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SkipOperator.prototype.total;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class SkipSubscriber extends Subscriber_1.Subscriber {
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
     * @param {?} x
     * @return {?}
     */
    _next(x) {
        if (++this.count > this.total) {
            this.destination.next(x);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SkipSubscriber.prototype.count;
        /** @type {?} */
        SkipSubscriber.prototype.total;
    }
}
