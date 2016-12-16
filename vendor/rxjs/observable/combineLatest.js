import { isScheduler } from '../util/isScheduler';
import { isArray } from '../util/isArray';
import { ArrayObservable } from './ArrayObservable';
import { CombineLatestOperator } from '../operator/combineLatest';
/**
 * Combines multiple Observables to create an Observable whose values are
 * calculated from the latest values of each of its input Observables.
 *
 * <span class="informal">Whenever any input Observable emits a value, it
 * computes a formula using the latest values from all the inputs, then emits
 * the output of that formula.</span>
 *
 * <img src="./img/combineLatest.png" width="100%">
 *
 * `combineLatest` combines the values from all the Observables passed as
 * arguments. This is done by subscribing to each Observable, in order, and
 * collecting an array of each of the most recent values any time any of the
 * input Observables emits, then either taking that array and passing it as
 * arguments to an optional `project` function and emitting the return value of
 * that, or just emitting the array of recent values directly if there is no
 * `project` function.
 *
 * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
 * var height = Rx.Observable.of(1.76, 1.77, 1.78);
 * var bmi = Rx.Observable.combineLatest(weight, height, (w, h) => w / (h * h));
 * bmi.subscribe(x => console.log('BMI is ' + x));
 *
 * // With output to console:
 * // BMI is 24.212293388429753
 * // BMI is 23.93948099205209
 * // BMI is 23.671253629592222
 *
 * @see {\@link combineAll}
 * @see {\@link merge}
 * @see {\@link withLatestFrom}
 *
 * source Observable.
 * source Observable. More than one input Observables may be given as argument.
 * the combined latest values into a new value on the output Observable.
 * each input Observable.
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @owner Observable
 * @param {...?} observables
 * @return {?}
 */
export function combineLatest(...observables) {
    let /** @type {?} */ project = null;
    let /** @type {?} */ scheduler = null;
    if (isScheduler(observables[observables.length - 1])) {
        scheduler = (observables.pop());
    }
    if (typeof observables[observables.length - 1] === 'function') {
        project = (observables.pop());
    }
    // if the first and only other argument besides the resultSelector is an array
    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
    if (observables.length === 1 && isArray(observables[0])) {
        observables = (observables[0]);
    }
    return new ArrayObservable(observables, scheduler).lift(new CombineLatestOperator(project));
}
