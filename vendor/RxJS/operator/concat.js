goog.module('rxjs$operator$concat');
var isScheduler_1 = goog.require('rxjs$util$isScheduler');
var ArrayObservable_1 = goog.require('rxjs$observable$ArrayObservable');
var mergeAll_1 = goog.require('rxjs$operator$mergeAll');
/**
 *  Creates an output Observable which sequentially emits all values from every given input Observable after the current Observable. * <span class="informal">Concatenates multiple Observables together by sequentially emitting their values, one Observable after the other.</span> * <img src="./img/concat.png" width="100%"> * Joins this Observable with multiple other Observables by subscribing to them one at a time, starting with the source, and merging their results into the output Observable. Will wait for each Observable to complete before moving on to the next. *
 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption> var timer = Rx.Observable.interval(1000).take(4); var sequence = Rx.Observable.range(1, 10); var result = timer.concat(sequence); result.subscribe(x => console.log(x)); *
 * @example <caption>Concatenate 3 Observables</caption> var timer1 = Rx.Observable.interval(1000).take(10); var timer2 = Rx.Observable.interval(2000).take(6); var timer3 = Rx.Observable.interval(500).take(10); var result = timer1.concat(timer2, timer3); result.subscribe(x => console.log(x)); *
 * @see {@link concatAll}
 * @see {@link concatMap}
 * @see {@link concatMapTo} * Observable. More than one input Observables may be given as argument. Observable subscription on. single Observable, in order, in serial fashion.
 * @method concat
 * @owner Observable
 * @param {...?} observables
 * @return {?}
 */
function concat(...observables) {
    return concatStatic(this, ...observables);
}
exports.concat = concat;
/**
 *  Creates an output Observable which sequentially emits all values from every given input Observable after the current Observable. * <span class="informal">Concatenates multiple Observables together by sequentially emitting their values, one Observable after the other.</span> * <img src="./img/concat.png" width="100%"> * Joins multiple Observables together by subscribing to them one at a time and merging their results into the output Observable. Will wait for each Observable to complete before moving on to the next. *
 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption> var timer = Rx.Observable.interval(1000).take(4); var sequence = Rx.Observable.range(1, 10); var result = Rx.Observable.concat(timer, sequence); result.subscribe(x => console.log(x)); *
 * @example <caption>Concatenate 3 Observables</caption> var timer1 = Rx.Observable.interval(1000).take(10); var timer2 = Rx.Observable.interval(2000).take(6); var timer3 = Rx.Observable.interval(500).take(10); var result = Rx.Observable.concat(timer1, timer2, timer3); result.subscribe(x => console.log(x)); *
 * @see {@link concatAll}
 * @see {@link concatMap}
 * @see {@link concatMapTo} * More than one input Observables may be given as argument. Observable subscription on. single Observable, in order, in serial fashion.
 * @static true
 * @name concat
 * @owner Observable
 * @param {...?} observables
 * @return {?}
 */
function concatStatic(...observables) {
    let /** @type {?} */ scheduler = null;
    let /** @type {?} */ args = (observables);
    if (isScheduler_1.isScheduler(args[observables.length - 1])) {
        scheduler = args.pop();
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(1));
}
exports.concatStatic = concatStatic;
