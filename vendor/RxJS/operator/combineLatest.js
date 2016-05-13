goog.module('rxjs$operator$combineLatest');
var ArrayObservable_1 = goog.require('rxjs$observable$ArrayObservable');
var isArray_1 = goog.require('rxjs$util$isArray');
var isScheduler_1 = goog.require('rxjs$util$isScheduler');
var OuterSubscriber_1 = goog.require('rxjs$OuterSubscriber');
var subscribeToResult_1 = goog.require('rxjs$util$subscribeToResult');
/**
 *  Combines multiple Observables to create an Observable whose values are calculated from the latest values of each of its input Observables. * <span class="informal">Whenever any input Observable emits a value, it computes a formula using the latest values from all the inputs, then emits the output of that formula.</span> * <img src="./img/combineLatest.png" width="100%"> * `combineLatest` combines the values from this Observable with values from Observables passed as arguments. This is done by subscribing to each Observable, in order, and collecting an array of each of the most recent values any time any of the input Observables emits, then either taking that array and passing it as arguments to an optional `project` function and emitting the return value of that, or just emitting the array of recent values directly if there is no `project` function. *
 * @example <caption>Dynamically calculate the Body-Mass Index from an Observable of weight and one for height</caption> var weight = Rx.Observable.of(70, 72, 76, 79, 75); var height = Rx.Observable.of(1.76, 1.77, 1.78); var bmi = weight.combineLatest(height, (w, h) => w / (h * h)); bmi.subscribe(x => console.log('BMI is ' + x)); *
 * @see {@link combineAll}
 * @see {@link merge}
 * @see {@link withLatestFrom} * Observable. More than one input Observables may be given as argument. the combined latest values into a new value on the output Observable. values from each input Observable, or an array of the most recent values from each input Observable.
 * @method combineLatest
 * @owner Observable
 * @param {...?} observables
 * @return {?}
 */
function combineLatest(...observables) {
    let /** @type {?} */ project = null;
    if (typeof observables[observables.length - 1] === 'function') {
        project = (observables.pop());
    }
    // if the first and only other argument besides the resultSelector is an array
    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = (observables[0]);
    }
    observables.unshift(this);
    return new ArrayObservable_1.ArrayObservable(observables).lift(new CombineLatestOperator(project));
}
exports.combineLatest = combineLatest;
/**
 *  Combines the values from observables passed as arguments. This is done by subscribing to each observable, in order, and collecting an array of each of the most recent values any time any of the observables emits, then either taking that array and passing it as arguments to an option `project` function and emitting the return value of that, or just emitting the array of recent values directly if there is no `project` function. the most recent values from each observable.
 * @static true
 * @name combineLatest
 * @owner Observable
 * @param {...?} observables
 * @return {?}
 */
function combineLatestStatic(...observables) {
    let /** @type {?} */ project = null;
    let /** @type {?} */ scheduler = null;
    if (isScheduler_1.isScheduler(observables[observables.length - 1])) {
        scheduler = (observables.pop());
    }
    if (typeof observables[observables.length - 1] === 'function') {
        project = (observables.pop());
    }
    // if the first and only other argument besides the resultSelector is an array
    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = (observables[0]);
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new CombineLatestOperator(project));
}
exports.combineLatestStatic = combineLatestStatic;
class CombineLatestOperator {
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
        return source._subscribe(new CombineLatestSubscriber(subscriber, this.project));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CombineLatestOperator.prototype.project;
    }
}
exports.CombineLatestOperator = CombineLatestOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class CombineLatestSubscriber extends OuterSubscriber_1.OuterSubscriber {
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
        this.toRespond = [];
    }
    /**
     * @param {?} observable
     * @return {?}
     */
    _next(observable) {
        const /** @type {?} */ toRespond = this.toRespond;
        toRespond.push(toRespond.length);
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
            for (let /** @type {?} */ i = 0; i < len; i++) {
                const /** @type {?} */ observable = observables[i];
                this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
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
        values[outerIndex] = innerValue;
        const /** @type {?} */ toRespond = this.toRespond;
        if (toRespond.length > 0) {
            const /** @type {?} */ found = toRespond.indexOf(outerIndex);
            if (found !== -1) {
                toRespond.splice(found, 1);
            }
        }
        if (toRespond.length === 0) {
            if (this.project) {
                this._tryProject(values);
            }
            else {
                this.destination.next(values);
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
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CombineLatestSubscriber.prototype.active;
        /** @type {?} */
        CombineLatestSubscriber.prototype.values;
        /** @type {?} */
        CombineLatestSubscriber.prototype.observables;
        /** @type {?} */
        CombineLatestSubscriber.prototype.toRespond;
        /** @type {?} */
        CombineLatestSubscriber.prototype.project;
    }
}
exports.CombineLatestSubscriber = CombineLatestSubscriber;
