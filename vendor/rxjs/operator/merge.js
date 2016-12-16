import { ArrayObservable } from '../observable/ArrayObservable';
import { MergeAllOperator } from './mergeAll';
import { isScheduler } from '../util/isScheduler';
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (either the source or an
 * Observable given as argument), and simply forwards (without doing any
 * transformation) all the values from all the input Observables to the output
 * Observable. The output Observable only completes once all input Observables
 * have completed. Any error delivered by an input Observable will be immediately
 * emitted on the output Observable.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = clicks.merge(timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = timer1.merge(timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * @see {\@link mergeAll}
 * @see {\@link mergeMap}
 * @see {\@link mergeMapTo}
 * @see {\@link mergeScan}
 *
 * Observable. More than one input Observables may be given as argument.
 * Observables being subscribed to concurrently.
 * concurrency of input Observables.
 * every input Observable.
 * @owner Observable
 * @this {?}
 * @param {...?} observables
 * @return {?}
 */
export function merge(...observables) {
    return this.lift.call(mergeStatic(this, ...observables));
}
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (as arguments), and simply
 * forwards (without doing any transformation) all the values from all the input
 * Observables to the output Observable. The output Observable only completes
 * once all input Observables have completed. Any error delivered by an input
 * Observable will be immediately emitted on the output Observable.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = Rx.Observable.merge(clicks, timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // timer will emit ascending values, one every second(1000ms) to console
 * // clicks logs MouseEvents to console everytime the "document" is clicked
 * // Since the two streams are merged you see these happening
 * // as they occur.
 *
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // - First timer1 and timer2 will run concurrently
 * // - timer1 will emit a value every 1000ms for 10 iterations
 * // - timer2 will emit a value every 2000ms for 6 iterations
 * // - after timer1 hits it's max iteration, timer2 will
 * //   continue, and timer3 will start to run concurrently with timer2
 * // - when timer2 hits it's max iteration it terminates, and
 * //   timer3 will continue to emit a value every 500ms until it is complete
 *
 * @see {\@link mergeAll}
 * @see {\@link mergeMap}
 * @see {\@link mergeMapTo}
 * @see {\@link mergeScan}
 *
 * Observables being subscribed to concurrently.
 * concurrency of input Observables.
 * every input Observable.
 * @owner Observable
 * @param {...?} observables
 * @return {?}
 */
export function mergeStatic(...observables) {
    let /** @type {?} */ concurrent = Number.POSITIVE_INFINITY;
    let /** @type {?} */ scheduler = null;
    let /** @type {?} */ last = observables[observables.length - 1];
    if (isScheduler(last)) {
        scheduler = (observables.pop());
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
            concurrent = (observables.pop());
        }
    }
    else if (typeof last === 'number') {
        concurrent = (observables.pop());
    }
    if (scheduler === null && observables.length === 1) {
        return (observables[0]);
    }
    return new ArrayObservable(/** @type {?} */ (observables), scheduler).lift(new MergeAllOperator(concurrent));
}
