import { subscribeToResult } from '../util/subscribeToResult';
import { OuterSubscriber } from '../OuterSubscriber';
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {\@link mergeAll}.</span>
 *
 * <img src="./img/mergeMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger.
 *
 * var letters = Rx.Observable.of('a', 'b', 'c');
 * var result = letters.mergeMap(x =>
 *   Rx.Observable.interval(1000).map(i => x+i)
 * );
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // a0
 * // b0
 * // c0
 * // a1
 * // b1
 * // c1
 * // continues to list a,b,c with respective ascending integers
 *
 * @see {\@link concatMap}
 * @see {\@link exhaustMap}
 * @see {\@link merge}
 * @see {\@link mergeAll}
 * @see {\@link mergeMapTo}
 * @see {\@link mergeScan}
 * @see {\@link switchMap}
 *
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * Observables being subscribed to concurrently.
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and merging the results of the Observables obtained
 * from this transformation.
 * @owner Observable
 * @this {?}
 * @param {?} project
 * @param {?=} resultSelector
 * @param {?=} concurrent
 * @return {?}
 */
export function mergeMap(project, resultSelector, concurrent = Number.POSITIVE_INFINITY) {
    if (typeof resultSelector === 'number') {
        concurrent = (resultSelector);
        resultSelector = null;
    }
    return this.lift(new MergeMapOperator(project, /** @type {?} */ (resultSelector), concurrent));
}
export class MergeMapOperator {
    /**
     * @param {?} project
     * @param {?=} resultSelector
     * @param {?=} concurrent
     */
    constructor(project, resultSelector, concurrent = Number.POSITIVE_INFINITY) {
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    /**
     * @param {?} observer
     * @param {?} source
     * @return {?}
     */
    call(observer, source) {
        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class MergeMapSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} project
     * @param {?=} resultSelector
     * @param {?=} concurrent
     */
    constructor(destination, project, resultSelector, concurrent = Number.POSITIVE_INFINITY) {
        super(destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        if (this.active < this.concurrent) {
            this._tryNext(value);
        }
        else {
            this.buffer.push(value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _tryNext(value) {
        let /** @type {?} */ result;
        const /** @type {?} */ index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.active++;
        this._innerSub(result, value, index);
    }
    /**
     * @param {?} ish
     * @param {?} value
     * @param {?} index
     * @return {?}
     */
    _innerSub(ish, value, index) {
        this.add(subscribeToResult(this, ish, value, index));
    }
    /**
     * @return {?}
     */
    _complete() {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
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
        if (this.resultSelector) {
            this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    }
    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @return {?}
     */
    _notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex) {
        let /** @type {?} */ result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    }
    /**
     * @param {?} innerSub
     * @return {?}
     */
    notifyComplete(innerSub) {
        const /** @type {?} */ buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    }
}
function MergeMapSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    MergeMapSubscriber.prototype.hasCompleted;
    /** @type {?} */
    MergeMapSubscriber.prototype.buffer;
    /** @type {?} */
    MergeMapSubscriber.prototype.active;
    /** @type {?} */
    MergeMapSubscriber.prototype.index;
}
