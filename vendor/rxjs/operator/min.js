import { ReduceOperator } from './reduce';
/**
 * The Min operator operates on an Observable that emits numbers (or items that can be evaluated as numbers),
 * and when source Observable completes it emits a single item: the item with the smallest number.
 *
 * <img src="./img/min.png" width="100%">
 *
 * @owner Observable
 * @this {?}
 * @param {?=} comparer
 * @return {?}
 */
export function min(comparer) {
    const /** @type {?} */ min = (typeof comparer === 'function')
        ? (x, y) => comparer(x, y) < 0 ? x : y
        : (x, y) => x < y ? x : y;
    return this.lift(new ReduceOperator(min));
}
