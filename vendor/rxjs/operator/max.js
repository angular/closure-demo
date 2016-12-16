import { ReduceOperator } from './reduce';
/**
 * The Max operator operates on an Observable that emits numbers (or items that can be evaluated as numbers),
 * and when source Observable completes it emits a single item: the item with the largest number.
 *
 * <img src="./img/max.png" width="100%">
 *
 * items.
 * @owner Observable
 * @this {?}
 * @param {?=} comparer
 * @return {?}
 */
export function max(comparer) {
    const /** @type {?} */ max = (typeof comparer === 'function')
        ? (x, y) => comparer(x, y) > 0 ? x : y
        : (x, y) => x > y ? x : y;
    return this.lift(new ReduceOperator(max));
}
