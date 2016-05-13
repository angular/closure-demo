goog.module('rxjs$operator$distinctUntilChanged');
var Subscriber_1 = goog.require('rxjs$Subscriber');
var tryCatch_1 = goog.require('rxjs$util$tryCatch');
var errorObject_1 = goog.require('rxjs$util$errorObject');
/**
 *  Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item. If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted. If a comparator function is not provided, an equality check is used by default.
 * @method distinctUntilChanged
 * @owner Observable
 * @param {?=} compare
 * @param {?=} keySelector
 * @return {?}
 */
function distinctUntilChanged(compare, keySelector) {
    return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
}
exports.distinctUntilChanged = distinctUntilChanged;
class DistinctUntilChangedOperator {
    /**
     * @param {?} compare
     * @param {?} keySelector
     */
    constructor(compare, keySelector) {
        this.compare = compare;
        this.keySelector = keySelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DistinctUntilChangedOperator.prototype.compare;
        /** @type {?} */
        DistinctUntilChangedOperator.prototype.keySelector;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class DistinctUntilChangedSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} compare
     * @param {?} keySelector
     */
    constructor(destination, compare, keySelector) {
        super(destination);
        this.keySelector = keySelector;
        this.hasKey = false;
        if (typeof compare === 'function') {
            this.compare = compare;
        }
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    compare(x, y) {
        return x === y;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ keySelector = this.keySelector;
        let /** @type {?} */ key = value;
        if (keySelector) {
            key = tryCatch_1.tryCatch(this.keySelector)(value);
            if (key === errorObject_1.errorObject) {
                return this.destination.error(errorObject_1.errorObject.e);
            }
        }
        let /** @type {?} */ result = false;
        if (this.hasKey) {
            result = tryCatch_1.tryCatch(this.compare)(this.key, key);
            if (result === errorObject_1.errorObject) {
                return this.destination.error(errorObject_1.errorObject.e);
            }
        }
        else {
            this.hasKey = true;
        }
        if (Boolean(result) === false) {
            this.key = key;
            this.destination.next(value);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DistinctUntilChangedSubscriber.prototype.key;
        /** @type {?} */
        DistinctUntilChangedSubscriber.prototype.hasKey;
        /** @type {?} */
        DistinctUntilChangedSubscriber.prototype.keySelector;
    }
}
