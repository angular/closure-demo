import { ArrayObservable } from '../observable/ArrayObservable';
import { ScalarObservable } from '../observable/ScalarObservable';
import { EmptyObservable } from '../observable/EmptyObservable';
import { concatStatic } from './concat';
import { isScheduler } from '../util/isScheduler';
/**
 * Returns an Observable that emits the items in a specified Iterable before it begins to emit items emitted by the
 * source Observable.
 *
 * <img src="./img/startWith.png" width="100%">
 *
 * emitted by the source Observable.
 * @owner Observable
 * @this {?}
 * @param {...?} array
 * @return {?}
 */
export function startWith(...array) {
    let /** @type {?} */ scheduler = (array[array.length - 1]);
    if (isScheduler(scheduler)) {
        array.pop();
    }
    else {
        scheduler = null;
    }
    const /** @type {?} */ len = array.length;
    if (len === 1) {
        return concatStatic(new ScalarObservable(/** @type {?} */ (array[0]), scheduler), /** @type {?} */ (this));
    }
    else if (len > 1) {
        return concatStatic(new ArrayObservable(/** @type {?} */ (array), scheduler), /** @type {?} */ (this));
    }
    else {
        return concatStatic(new EmptyObservable(scheduler), /** @type {?} */ (this));
    }
}
