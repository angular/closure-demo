import { isArray } from '../util/isArray';
import { ArrayObservable } from '../observable/ArrayObservable';
import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Returns an Observable that mirrors the first source Observable to emit an item
 * from the combination of this Observable and supplied Observables
 * @owner Observable
 * @this {?}
 * @param {...?} observables
 * @return {?}
 */
export function race(...observables) {
    // if the only argument is an array, it was most likely called with
    // `pair([obs1, obs2, ...])`
    if (observables.length === 1 && isArray(observables[0])) {
        observables = (observables[0]);
    }
    return this.lift.call(raceStatic(this, ...observables));
}
/**
 * @param {...?} observables
 * @return {?}
 */
export function raceStatic(...observables) {
    // if the only argument is an array, it was most likely called with
    // `pair([obs1, obs2, ...])`
    if (observables.length === 1) {
        if (isArray(observables[0])) {
            observables = (observables[0]);
        }
        else {
            return (observables[0]);
        }
    }
    return new ArrayObservable(/** @type {?} */ (observables)).lift(new RaceOperator());
}
export class RaceOperator {
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new RaceSubscriber(subscriber));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class RaceSubscriber extends OuterSubscriber {
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
            for (let /** @type {?} */ i = 0; i < len && !this.hasFirst; i++) {
                let /** @type {?} */ observable = observables[i];
                let /** @type {?} */ subscription = subscribeToResult(this, observable, observable, i);
                if (this.subscriptions) {
                    this.subscriptions.push(subscription);
                }
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
}
function RaceSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    RaceSubscriber.prototype.hasFirst;
    /** @type {?} */
    RaceSubscriber.prototype.observables;
    /** @type {?} */
    RaceSubscriber.prototype.subscriptions;
}
