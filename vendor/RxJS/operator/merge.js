goog.module('rxjs$operator$merge');
var ArrayObservable_1 = goog.require('rxjs$observable$ArrayObservable');
var mergeAll_1 = goog.require('rxjs$operator$mergeAll');
var isScheduler_1 = goog.require('rxjs$util$isScheduler');
/**
 *  Creates an output Observable which concurrently emits all values from every given input Observable. * <span class="informal">Flattens multiple Observables together by blending their values into one Observable.</span> * <img src="./img/merge.png" width="100%"> * `merge` subscribes to each given input Observable (either the source or an Observable given as argument), and simply forwards (without doing any transformation) all the values from all the input Observables to the output Observable. The output Observable only completes once all input Observables have completed. Any error delivered by an input Observable will be immediately emitted on the output Observable. *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption> var clicks = Rx.Observable.fromEvent(document, 'click'); var timer = Rx.Observable.interval(1000); var clicksOrTimer = clicks.merge(timer); clicksOrTimer.subscribe(x => console.log(x)); *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption> var timer1 = Rx.Observable.interval(1000).take(10); var timer2 = Rx.Observable.interval(2000).take(6); var timer3 = Rx.Observable.interval(500).take(10); var concurrent = 2; // the argument var merged = timer1.merge(timer2, timer3, concurrent); merged.subscribe(x => console.log(x)); *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan} * Observable. More than one input Observables may be given as argument. Observables being subscribed to concurrently. concurrency of input Observables. every input Observable.
 * @method merge
 * @owner Observable
 * @param {...?} observables
 * @return {?}
 */
function merge(...observables) {
    observables.unshift(this);
    return mergeStatic.apply(this, observables);
}
exports.merge = merge;
/**
 *  Creates an output Observable which concurrently emits all values from every given input Observable. * <span class="informal">Flattens multiple Observables together by blending their values into one Observable.</span> * <img src="./img/merge.png" width="100%"> * `merge` subscribes to each given input Observable (as arguments), and simply forwards (without doing any transformation) all the values from all the input Observables to the output Observable. The output Observable only completes once all input Observables have completed. Any error delivered by an input Observable will be immediately emitted on the output Observable. *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption> var clicks = Rx.Observable.fromEvent(document, 'click'); var timer = Rx.Observable.interval(1000); var clicksOrTimer = Rx.Observable.merge(clicks, timer); clicksOrTimer.subscribe(x => console.log(x)); *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption> var timer1 = Rx.Observable.interval(1000).take(10); var timer2 = Rx.Observable.interval(2000).take(6); var timer3 = Rx.Observable.interval(500).take(10); var concurrent = 2; // the argument var merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent); merged.subscribe(x => console.log(x)); *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan} * Observables being subscribed to concurrently. concurrency of input Observables. every input Observable.
 * @static true
 * @name merge
 * @owner Observable
 * @param {...?} observables
 * @return {?}
 */
function mergeStatic(...observables) {
    let /** @type {?} */ concurrent = Number.POSITIVE_INFINITY;
    let /** @type {?} */ scheduler = null;
    let /** @type {?} */ last = observables[observables.length - 1];
    if (isScheduler_1.isScheduler(last)) {
        scheduler = (observables.pop());
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
            concurrent = (observables.pop());
        }
    }
    else if (typeof last === 'number') {
        concurrent = (observables.pop());
    }
    if (observables.length === 1) {
        return (observables[0]);
    }
    return new ArrayObservable_1.ArrayObservable(/** @type {?} */ (observables), scheduler).lift(new mergeAll_1.MergeAllOperator(concurrent));
}
exports.mergeStatic = mergeStatic;
