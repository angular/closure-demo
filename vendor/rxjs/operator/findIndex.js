import { FindValueOperator } from './find';
/**
 * Emits only the index of the first value emitted by the source Observable that
 * meets some condition.
 *
 * <span class="informal">It's like {\@link find}, but emits the index of the
 * found value, not the value itself.</span>
 *
 * <img src="./img/findIndex.png" width="100%">
 *
 * `findIndex` searches for the first item in the source Observable that matches
 * the specified condition embodied by the `predicate`, and returns the
 * (zero-based) index of the first occurrence in the source. Unlike
 * {\@link first}, the `predicate` is required in `findIndex`, and does not emit
 * an error if a valid value is not found.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.findIndex(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link filter}
 * @see {\@link find}
 * @see {\@link first}
 * @see {\@link take}
 *
 * A function called with each item to test for condition matching.
 * in the `predicate` function.
 * matches the condition.
 * @owner Observable
 * @this {?}
 * @param {?} predicate
 * @param {?=} thisArg
 * @return {?}
 */
export function findIndex(predicate, thisArg) {
    return (this.lift(new FindValueOperator(predicate, this, true, thisArg)));
}
