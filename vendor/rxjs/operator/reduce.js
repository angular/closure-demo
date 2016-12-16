import { Subscriber } from '../Subscriber';
/**
 * Applies an accumulator function over the source Observable, and returns the
 * accumulated result when the source completes, given an optional seed value.
 *
 * <span class="informal">Combines together all values emitted on the source,
 * using an accumulator function that knows how to join a new source value into
 * the accumulation from the past.</span>
 *
 * <img src="./img/reduce.png" width="100%">
 *
 * Like
 * [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce),
 * `reduce` applies an `accumulator` function against an accumulation and each
 * value of the source Observable (from the past) to reduce it to a single
 * value, emitted on the output Observable. Note that `reduce` will only emit
 * one value, only when the source Observable completes. It is equivalent to
 * applying operator {\@link scan} followed by operator {\@link last}.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * var clicksInFiveSeconds = Rx.Observable.fromEvent(document, 'click')
 *   .takeUntil(Rx.Observable.interval(5000));
 * var ones = clicksInFiveSeconds.mapTo(1);
 * var seed = 0;
 * var count = ones.reduce((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {\@link count}
 * @see {\@link expand}
 * @see {\@link mergeScan}
 * @see {\@link scan}
 *
 * called on each source value.
 * result of accumulating the values emitted by the source Observable.
 * @owner Observable
 * @this {?}
 * @param {?} accumulator
 * @param {?=} seed
 * @return {?}
 */
export function reduce(accumulator, seed) {
    let /** @type {?} */ hasSeed = false;
    // providing a seed of `undefined` *should* be valid and trigger
    // hasSeed! so don't use `seed !== undefined` checks!
    // For this reason, we have to check it here at the original call site
    // otherwise inside Operator/Subscriber we won't know if `undefined`
    // means they didn't provide anything or if they literally provided `undefined`
    if (arguments.length >= 2) {
        hasSeed = true;
    }
    return this.lift(new ReduceOperator(accumulator, seed, hasSeed));
}
export class ReduceOperator {
    /**
     * @param {?} accumulator
     * @param {?=} seed
     * @param {?=} hasSeed
     */
    constructor(accumulator, seed, hasSeed = false) {
        this.accumulator = accumulator;
        this.seed = seed;
        this.hasSeed = hasSeed;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new ReduceSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class ReduceSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} accumulator
     * @param {?} seed
     * @param {?} hasSeed
     */
    constructor(destination, accumulator, seed, hasSeed) {
        super(destination);
        this.accumulator = accumulator;
        this.hasSeed = hasSeed;
        this.hasValue = false;
        this.acc = seed;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        if (this.hasValue || (this.hasValue = this.hasSeed)) {
            this._tryReduce(value);
        }
        else {
            this.acc = value;
            this.hasValue = true;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _tryReduce(value) {
        let /** @type {?} */ result;
        try {
            result = this.accumulator(/** @type {?} */ (this.acc), value);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.acc = result;
    }
    /**
     * @return {?}
     */
    _complete() {
        if (this.hasValue || this.hasSeed) {
            this.destination.next(this.acc);
        }
        this.destination.complete();
    }
}
function ReduceSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    ReduceSubscriber.prototype.acc;
    /** @type {?} */
    ReduceSubscriber.prototype.hasValue;
}
