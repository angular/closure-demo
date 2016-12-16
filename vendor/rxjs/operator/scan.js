import { Subscriber } from '../Subscriber';
/**
 * Applies an accumulator function over the source Observable, and returns each
 * intermediate result, with an optional seed value.
 *
 * <span class="informal">It's like {\@link reduce}, but emits the current
 * accumulation whenever the source emits a value.</span>
 *
 * <img src="./img/scan.png" width="100%">
 *
 * Combines together all values emitted on the source, using an accumulator
 * function that knows how to join a new source value into the accumulation from
 * the past. Is similar to {\@link reduce}, but emits the intermediate
 * accumulations.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var ones = clicks.mapTo(1);
 * var seed = 0;
 * var count = ones.scan((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {\@link expand}
 * @see {\@link mergeScan}
 * @see {\@link reduce}
 *
 * The accumulator function called on each source value.
 * @owner Observable
 * @this {?}
 * @param {?} accumulator
 * @param {?=} seed
 * @return {?}
 */
export function scan(accumulator, seed) {
    let /** @type {?} */ hasSeed = false;
    // providing a seed of `undefined` *should* be valid and trigger
    // hasSeed! so don't use `seed !== undefined` checks!
    // For this reason, we have to check it here at the original call site
    // otherwise inside Operator/Subscriber we won't know if `undefined`
    // means they didn't provide anything or if they literally provided `undefined`
    if (arguments.length >= 2) {
        hasSeed = true;
    }
    return this.lift(new ScanOperator(accumulator, seed, hasSeed));
}
class ScanOperator {
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
        return source.subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class ScanSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} accumulator
     * @param {?} _seed
     * @param {?} hasSeed
     */
    constructor(destination, accumulator, _seed, hasSeed) {
        super(destination);
        this.accumulator = accumulator;
        this._seed = _seed;
        this.hasSeed = hasSeed;
        this.index = 0;
    }
    /**
     * @return {?}
     */
    get seed() {
        return this._seed;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set seed(value) {
        this.hasSeed = true;
        this._seed = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        if (!this.hasSeed) {
            this.seed = value;
            this.destination.next(value);
        }
        else {
            return this._tryNext(value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _tryNext(value) {
        const /** @type {?} */ index = this.index++;
        let /** @type {?} */ result;
        try {
            result = this.accumulator(/** @type {?} */ (this.seed), value, index);
        }
        catch (err) {
            this.destination.error(err);
        }
        this.seed = result;
        this.destination.next(result);
    }
}
function ScanSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    ScanSubscriber.prototype.index;
}
