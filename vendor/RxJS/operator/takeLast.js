goog.module('rxjs$operator$takeLast');
var Subscriber_1 = goog.require('rxjs$Subscriber');
var ArgumentOutOfRangeError_1 = goog.require('rxjs$util$ArgumentOutOfRangeError');
var EmptyObservable_1 = goog.require('rxjs$observable$EmptyObservable');
/**
 * @throws {ArgumentOutOfRangeError} When using `takeLast(i)`, it delivers an ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 * @method takeLast
 * @owner Observable
 * @param {?} total
 * @return {?}
 */
function takeLast(total) {
    if (total === 0) {
        return new EmptyObservable_1.EmptyObservable();
    }
    else {
        return this.lift(new TakeLastOperator(total));
    }
}
exports.takeLast = takeLast;
class TakeLastOperator {
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
        return source._subscribe(new TakeLastSubscriber(subscriber, this.total));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TakeLastOperator.prototype.total;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class TakeLastSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} total
     */
    constructor(destination, total) {
        super(destination);
        this.total = total;
        this.ring = new Array();
        this.count = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ ring = this.ring;
        const /** @type {?} */ total = this.total;
        const /** @type {?} */ count = this.count++;
        if (ring.length < total) {
            ring.push(value);
        }
        else {
            const /** @type {?} */ index = count % total;
            ring[index] = value;
        }
    }
    /**
     * @return {?}
     */
    _complete() {
        const /** @type {?} */ destination = this.destination;
        let /** @type {?} */ count = this.count;
        if (count > 0) {
            const /** @type {?} */ total = this.count >= this.total ? this.total : this.count;
            const /** @type {?} */ ring = this.ring;
            for (let /** @type {?} */ i = 0; i < total; i++) {
                const /** @type {?} */ idx = (count++) % total;
                destination.next(ring[idx]);
            }
        }
        destination.complete();
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TakeLastSubscriber.prototype.ring;
        /** @type {?} */
        TakeLastSubscriber.prototype.count;
        /** @type {?} */
        TakeLastSubscriber.prototype.total;
    }
}
