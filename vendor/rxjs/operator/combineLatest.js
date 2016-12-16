import { ArrayObservable } from '../observable/ArrayObservable';
import { isArray } from '../util/isArray';
import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
const /** @type {?} */ none = {};
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
 * `combineLatest` combines the values from this Observable with values from
 * Observables passed as arguments. This is done by subscribing to each
 * Observable, in order, and collecting an array of each of the most recent
 * values any time any of the input Observables emits, then either taking that
 * array and passing it as arguments to an optional `project` function and
 * emitting the return value of that, or just emitting the array of recent
 * values directly if there is no `project` function.
 *
 * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
 * var height = Rx.Observable.of(1.76, 1.77, 1.78);
 * var bmi = weight.combineLatest(height, (w, h) => w / (h * h));
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
 * Observable. More than one input Observables may be given as argument.
 * the combined latest values into a new value on the output Observable.
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @owner Observable
 * @this {?}
 * @param {...?} observables
 * @return {?}
 */
export function combineLatest(...observables) {
    let /** @type {?} */ project = null;
    if (typeof observables[observables.length - 1] === 'function') {
        project = (observables.pop());
    }
    // if the first and only other argument besides the resultSelector is an array
    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
    if (observables.length === 1 && isArray(observables[0])) {
        observables = (observables[0]);
    }
    observables.unshift(this);
    return this.lift.call(new ArrayObservable(observables), new CombineLatestOperator(project));
}
export class CombineLatestOperator {
    /**
     * @param {?=} project
     */
    constructor(project) {
        this.project = project;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new CombineLatestSubscriber(subscriber, this.project));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class CombineLatestSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?=} project
     */
    constructor(destination, project) {
        super(destination);
        this.project = project;
        this.active = 0;
        this.values = [];
        this.observables = [];
    }
    /**
     * @param {?} observable
     * @return {?}
     */
    _next(observable) {
        this.values.push(none);
        this.observables.push(observable);
    }
    /**
     * @return {?}
     */
    _complete() {
        const /** @type {?} */ observables = this.observables;
        const /** @type {?} */ len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            this.active = len;
            this.toRespond = len;
            for (let /** @type {?} */ i = 0; i < len; i++) {
                const /** @type {?} */ observable = observables[i];
                this.add(subscribeToResult(this, observable, observable, i));
            }
        }
    }
    /**
     * @param {?} unused
     * @return {?}
     */
    notifyComplete(unused) {
        if ((this.active -= 1) === 0) {
            this.destination.complete();
        }
    }
    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @param {?} innerSub
     * @return {?}
     */
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        const /** @type {?} */ values = this.values;
        const /** @type {?} */ oldVal = values[outerIndex];
        const /** @type {?} */ toRespond = !this.toRespond
            ? 0
            : oldVal === none ? --this.toRespond : this.toRespond;
        values[outerIndex] = innerValue;
        if (toRespond === 0) {
            if (this.project) {
                this._tryProject(values);
            }
            else {
                this.destination.next(values.slice());
            }
        }
    }
    /**
     * @param {?} values
     * @return {?}
     */
    _tryProject(values) {
        let /** @type {?} */ result;
        try {
            result = this.project.apply(this, values);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    }
}
function CombineLatestSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    CombineLatestSubscriber.prototype.active;
    /** @type {?} */
    CombineLatestSubscriber.prototype.values;
    /** @type {?} */
    CombineLatestSubscriber.prototype.observables;
    /** @type {?} */
    CombineLatestSubscriber.prototype.toRespond;
}
