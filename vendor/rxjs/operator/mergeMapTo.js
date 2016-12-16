import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Projects each source value to the same Observable which is merged multiple
 * times in the output Observable.
 *
 * <span class="informal">It's like {\@link mergeMap}, but maps each value always
 * to the same inner Observable.</span>
 *
 * <img src="./img/mergeMapTo.png" width="100%">
 *
 * Maps each source value to the given Observable `innerObservable` regardless
 * of the source value, and then merges those resulting Observables into one
 * single Observable, which is the output Observable.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.mergeMapTo(Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link concatMapTo}
 * @see {\@link merge}
 * @see {\@link mergeAll}
 * @see {\@link mergeMap}
 * @see {\@link mergeScan}
 * @see {\@link switchMapTo}
 *
 * the source Observable.
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * Observables being subscribed to concurrently.
 * `innerObservable` (and optionally transformed through `resultSelector`) every
 * time a value is emitted on the source Observable.
 * @owner Observable
 * @this {?}
 * @param {?} innerObservable
 * @param {?=} resultSelector
 * @param {?=} concurrent
 * @return {?}
 */
export function mergeMapTo(innerObservable, resultSelector, concurrent = Number.POSITIVE_INFINITY) {
    if (typeof resultSelector === 'number') {
        concurrent = (resultSelector);
        resultSelector = null;
    }
    return this.lift(new MergeMapToOperator(innerObservable, /** @type {?} */ (resultSelector), concurrent));
}
export class MergeMapToOperator {
    /**
     * @param {?} ish
     * @param {?=} resultSelector
     * @param {?=} concurrent
     */
    constructor(ish, resultSelector, concurrent = Number.POSITIVE_INFINITY) {
        this.ish = ish;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    /**
     * @param {?} observer
     * @param {?} source
     * @return {?}
     */
    call(observer, source) {
        return source.subscribe(new MergeMapToSubscriber(observer, this.ish, this.resultSelector, this.concurrent));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class MergeMapToSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} ish
     * @param {?=} resultSelector
     * @param {?=} concurrent
     */
    constructor(destination, ish, resultSelector, concurrent = Number.POSITIVE_INFINITY) {
        super(destination);
        this.ish = ish;
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
            const /** @type {?} */ resultSelector = this.resultSelector;
            const /** @type {?} */ index = this.index++;
            const /** @type {?} */ ish = this.ish;
            const /** @type {?} */ destination = this.destination;
            this.active++;
            this._innerSub(ish, destination, resultSelector, value, index);
        }
        else {
            this.buffer.push(value);
        }
    }
    /**
     * @param {?} ish
     * @param {?} destination
     * @param {?} resultSelector
     * @param {?} value
     * @param {?} index
     * @return {?}
     */
    _innerSub(ish, destination, resultSelector, value, index) {
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
        const { resultSelector, destination } = this;
        if (resultSelector) {
            this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            destination.next(innerValue);
        }
    }
    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @return {?}
     */
    trySelectResult(outerValue, innerValue, outerIndex, innerIndex) {
        const { resultSelector, destination } = this;
        let /** @type {?} */ result;
        try {
            result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            destination.error(err);
            return;
        }
        destination.next(result);
    }
    /**
     * @param {?} err
     * @return {?}
     */
    notifyError(err) {
        this.destination.error(err);
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
function MergeMapToSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    MergeMapToSubscriber.prototype.hasCompleted;
    /** @type {?} */
    MergeMapToSubscriber.prototype.buffer;
    /** @type {?} */
    MergeMapToSubscriber.prototype.active;
    /** @type {?} */
    MergeMapToSubscriber.prototype.index;
}
