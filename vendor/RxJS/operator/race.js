goog.module('rxjs$operator$race');
var isArray_1 = goog.require('rxjs$util$isArray');
var ArrayObservable_1 = goog.require('rxjs$observable$ArrayObservable');
var OuterSubscriber_1 = goog.require('rxjs$OuterSubscriber');
var subscribeToResult_1 = goog.require('rxjs$util$subscribeToResult');
/**
 *  Returns an Observable that mirrors the first source Observable to emit an item from the combination of this Observable and supplied Observables
 * @method race
 * @owner Observable
 * @param {...?} observables
 * @return {?}
 */
function race(...observables) {
    // if the only argument is an array, it was most likely called with
    // `pair([obs1, obs2, ...])`
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = (observables[0]);
    }
    observables.unshift(this);
    return raceStatic.apply(this, observables);
}
exports.race = race;
/**
 * @param {...?} observables
 * @return {?}
 */
function raceStatic(...observables) {
    // if the only argument is an array, it was most likely called with
    // `pair([obs1, obs2, ...])`
    if (observables.length === 1) {
        if (isArray_1.isArray(observables[0])) {
            observables = (observables[0]);
        }
        else {
            return (observables[0]);
        }
    }
    return new ArrayObservable_1.ArrayObservable(/** @type {?} */ (observables)).lift(new RaceOperator());
}
exports.raceStatic = raceStatic;
class RaceOperator {
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new RaceSubscriber(subscriber));
    }
}
exports.RaceOperator = RaceOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class RaceSubscriber extends OuterSubscriber_1.OuterSubscriber {
    /**
     * @param {?} destination
     */
    constructor(destination) {
        super(destination);
        this.hasFirst = false;
        this.observables = [];
        this.subscriptions = [];
    }
    /**
     * @param {?} observable
     * @return {?}
     */
    _next(observable) {
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
            for (let /** @type {?} */ i = 0; i < len; i++) {
                let /** @type {?} */ observable = observables[i];
                let /** @type {?} */ subscription = subscribeToResult_1.subscribeToResult(this, observable, observable, i);
                this.subscriptions.push(subscription);
                this.add(subscription);
            }
            this.observables = null;
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
        if (!this.hasFirst) {
            this.hasFirst = true;
            for (let /** @type {?} */ i = 0; i < this.subscriptions.length; i++) {
                if (i !== outerIndex) {
                    let /** @type {?} */ subscription = this.subscriptions[i];
                    subscription.unsubscribe();
                    this.remove(subscription);
                }
            }
            this.subscriptions = null;
        }
        this.destination.next(innerValue);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        RaceSubscriber.prototype.hasFirst;
        /** @type {?} */
        RaceSubscriber.prototype.observables;
        /** @type {?} */
        RaceSubscriber.prototype.subscriptions;
    }
}
exports.RaceSubscriber = RaceSubscriber;
