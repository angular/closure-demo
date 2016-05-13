goog.module('rxjs$operator$startWith');
var ArrayObservable_1 = goog.require('rxjs$observable$ArrayObservable');
var ScalarObservable_1 = goog.require('rxjs$observable$ScalarObservable');
var EmptyObservable_1 = goog.require('rxjs$observable$EmptyObservable');
var concat_1 = goog.require('rxjs$operator$concat');
var isScheduler_1 = goog.require('rxjs$util$isScheduler');
/**
 *  Returns an Observable that emits the items in a specified Iterable before it begins to emit items emitted by the source Observable. * <img src="./img/startWith.png" width="100%"> * emitted by the source Observable.
 * @method startWith
 * @owner Observable
 * @param {...?} array
 * @return {?}
 */
function startWith(...array) {
    let /** @type {?} */ scheduler = (array[array.length - 1]);
    if (isScheduler_1.isScheduler(scheduler)) {
        array.pop();
    }
    else {
        scheduler = null;
    }
    const /** @type {?} */ len = array.length;
    if (len === 1) {
        return concat_1.concatStatic(new ScalarObservable_1.ScalarObservable(/** @type {?} */ (array[0]), scheduler), /** @type {?} */ (this));
    }
    else if (len > 1) {
        return concat_1.concatStatic(new ArrayObservable_1.ArrayObservable(/** @type {?} */ (array), scheduler), /** @type {?} */ (this));
    }
    else {
        return concat_1.concatStatic(new EmptyObservable_1.EmptyObservable(scheduler), /** @type {?} */ (this));
    }
}
exports.startWith = startWith;
