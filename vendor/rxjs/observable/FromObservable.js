import { isArray } from '../util/isArray';
import { isPromise } from '../util/isPromise';
import { PromiseObservable } from './PromiseObservable';
import { IteratorObservable } from './IteratorObservable';
import { ArrayObservable } from './ArrayObservable';
import { ArrayLikeObservable } from './ArrayLikeObservable';
import { $$iterator } from '../symbol/iterator';
import { Observable } from '../Observable';
import { ObserveOnSubscriber } from '../operator/observeOn';
import { $$observable } from '../symbol/observable';
const /** @type {?} */ isArrayLike = ((x) => x && typeof x.length === 'number');
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class FromObservable extends Observable {
    /**
     * @param {?} ish
     * @param {?=} scheduler
     */
    constructor(ish, scheduler) {
        super(null);
        this.ish = ish;
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable from an Array, an array-like object, a Promise, an
     * iterable object, or an Observable-like object.
     *
     * <span class="informal">Converts almost anything to an Observable.</span>
     *
     * <img src="./img/from.png" width="100%">
     *
     * Convert various other objects and data types into Observables. `from`
     * converts a Promise or an array-like or an
     * [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
     * object into an Observable that emits the items in that promise or array or
     * iterable. A String, in this context, is treated as an array of characters.
     * Observable-like objects (contains a function named with the ES2015 Symbol
     * for Observable) can also be converted through this operator.
     *
     * var array = [10, 20, 30];
     * var result = Rx.Observable.from(array);
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // 10 20 30
     *
     * function* generateDoubles(seed) {
     *   var i = seed;
     *   while (true) {
     *     yield i;
     *     i = 2 * i; // double it
     *   }
     * }
     *
     * var iterator = generateDoubles(3);
     * var result = Rx.Observable.from(iterator).take(10);
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // 3 6 12 24 48 96 192 384 768 1536
     *
     * @see {\@link create}
     * @see {\@link fromEvent}
     * @see {\@link fromEventPattern}
     * @see {\@link fromPromise}
     *
     * Observable-like, an Array, an iterable or an array-like object to be
     * converted.
     * emissions of values.
     * input object that was converted.
     * @owner Observable
     * @param {?} ish
     * @param {?=} scheduler
     * @return {?}
     */
    static create(ish, scheduler) {
        if (ish != null) {
            if (typeof ish[$$observable] === 'function') {
                if (ish instanceof Observable && !scheduler) {
                    return ish;
                }
                return new FromObservable(ish, scheduler);
            }
            else if (isArray(ish)) {
                return new ArrayObservable(ish, scheduler);
            }
            else if (isPromise(ish)) {
                return new PromiseObservable(ish, scheduler);
            }
            else if (typeof ish[$$iterator] === 'function' || typeof ish === 'string') {
                return new IteratorObservable(ish, scheduler);
            }
            else if (isArrayLike(ish)) {
                return new ArrayLikeObservable(ish, scheduler);
            }
        }
        throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ ish = this.ish;
        const /** @type {?} */ scheduler = this.scheduler;
        if (scheduler == null) {
            return ish[$$observable]().subscribe(subscriber);
        }
        else {
            return ish[$$observable]().subscribe(new ObserveOnSubscriber(subscriber, scheduler, 0));
        }
    }
}
