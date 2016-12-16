import { Subscriber } from '../Subscriber';
import { tryCatch } from '../util/tryCatch';
import { errorObject } from '../util/errorObject';
/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
 * If a comparator function is not provided, an equality check is used by default.
 * @owner Observable
 * @this {?}
 * @param {?=} compare
 * @param {?=} keySelector
 * @return {?}
 */
export function distinctUntilChanged(compare, keySelector) {
    return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
}
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
        return source.subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class DistinctUntilChangedSubscriber extends Subscriber {
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
            key = tryCatch(this.keySelector)(value);
            if (key === errorObject) {
                return this.destination.error(errorObject.e);
            }
        }
        let /** @type {?} */ result = false;
        if (this.hasKey) {
            result = tryCatch(this.compare)(this.key, key);
            if (result === errorObject) {
                return this.destination.error(errorObject.e);
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
}
function DistinctUntilChangedSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    DistinctUntilChangedSubscriber.prototype.key;
    /** @type {?} */
    DistinctUntilChangedSubscriber.prototype.hasKey;
}
