goog.module('rxjs$operator$defaultIfEmpty');
var Subscriber_1 = goog.require('rxjs$Subscriber');
/**
 *  Returns an Observable that emits the elements of the source or a specified default value if empty.
 * @method defaultIfEmpty
 * @owner Observable
 * @param {?=} defaultValue
 * @return {?}
 */
function defaultIfEmpty(defaultValue = null) {
    return this.lift(new DefaultIfEmptyOperator(defaultValue));
}
exports.defaultIfEmpty = defaultIfEmpty;
class DefaultIfEmptyOperator {
    /**
     * @param {?} defaultValue
     */
    constructor(defaultValue) {
        this.defaultValue = defaultValue;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DefaultIfEmptyOperator.prototype.defaultValue;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class DefaultIfEmptySubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} defaultValue
     */
    constructor(destination, defaultValue) {
        super(destination);
        this.defaultValue = defaultValue;
        this.isEmpty = true;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.isEmpty = false;
        this.destination.next(value);
    }
    /**
     * @return {?}
     */
    _complete() {
        if (this.isEmpty) {
            this.destination.next(this.defaultValue);
        }
        this.destination.complete();
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DefaultIfEmptySubscriber.prototype.isEmpty;
        /** @type {?} */
        DefaultIfEmptySubscriber.prototype.defaultValue;
    }
}
