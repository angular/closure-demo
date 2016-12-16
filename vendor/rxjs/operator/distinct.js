import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
import { Set } from '../util/Set';
/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.
 * If a keySelector function is provided, then it will project each value from the source observable into a new value that it will
 * check for equality with previously projected values. If a keySelector function is not provided, it will use each value from the
 * source observable directly with an equality check against previous values.
 * In JavaScript runtimes that support `Set`, this operator will use a `Set` to improve performance of the distinct value checking.
 * In other runtimes, this operator will use a minimal implementation of `Set` that relies on an `Array` and `indexOf` under the
 * hood, so performance will degrade as more values are checked for distinction. Even in newer browsers, a long-running `distinct`
 * use might result in memory leaks. To help alleviate this in some scenarios, an optional `flushes` parameter is also provided so
 * that the internal `Set` can be "flushed", basically clearing it of values.
 * @owner Observable
 * @this {?}
 * @param {?=} keySelector
 * @param {?=} flushes
 * @return {?}
 */
export function distinct(keySelector, flushes) {
    return this.lift(new DistinctOperator(keySelector, flushes));
}
class DistinctOperator {
    /**
     * @param {?} keySelector
     * @param {?} flushes
     */
    constructor(keySelector, flushes) {
        this.keySelector = keySelector;
        this.flushes = flushes;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new DistinctSubscriber(subscriber, this.keySelector, this.flushes));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class DistinctSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} keySelector
     * @param {?} flushes
     */
    constructor(destination, keySelector, flushes) {
        super(destination);
        this.keySelector = keySelector;
        this.values = new Set();
        if (flushes) {
            this.add(subscribeToResult(this, flushes));
        }
    }
    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @param {?} innerSub
     * @return {?}
     */
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values.clear();
    }
    /**
     * @param {?} error
     * @param {?} innerSub
     * @return {?}
     */
    notifyError(error, innerSub) {
        this._error(error);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        if (this.keySelector) {
            this._useKeySelector(value);
        }
        else {
            this._finalizeNext(value, value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _useKeySelector(value) {
        let /** @type {?} */ key;
        const { destination } = this;
        try {
            key = this.keySelector(value);
        }
        catch (err) {
            destination.error(err);
            return;
        }
        this._finalizeNext(key, value);
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    _finalizeNext(key, value) {
        const { values } = this;
        if (!values.has(/** @type {?} */ (key))) {
            values.add(/** @type {?} */ (key));
            this.destination.next(value);
        }
    }
}
function DistinctSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    DistinctSubscriber.prototype.values;
}
