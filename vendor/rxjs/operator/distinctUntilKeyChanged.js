import { distinctUntilChanged } from './distinctUntilChanged';
/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item,
 * using a property accessed by using the key provided to check if the two items are distinct.
 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
 * If a comparator function is not provided, an equality check is used by default.
 * @owner Observable
 * @this {?}
 * @param {?} key
 * @param {?=} compare
 * @return {?}
 */
export function distinctUntilKeyChanged(key, compare) {
    return distinctUntilChanged.call(this, function (x, y) {
        if (compare) {
            return compare(x[key], y[key]);
        }
        return x[key] === y[key];
    });
}
