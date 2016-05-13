goog.module('rxjs$operator$scan');
var Subscriber_1 = goog.require('rxjs$Subscriber');
/**
 *  Applies an accumulation function over the source Observable, and returns each intermediate result, with an optional seed value. * <span class="informal">It's like {@link reduce}, but emits the current accumulation whenever the source emits a value.</span> * <img src="./img/scan.png" width="100%"> * Combines together all values emitted on the source, using an accumulator function that knows how to join a new source value into the accumulation from the past. Is similar to {@link reduce}, but emits the intermediate accumulations. * Returns an Observable that applies a specified `accumulator` function to each item emitted by the source Observable. If a `seed` value is specified, then that value will be used as the initial value for the accumulator. If no seed value is specified, the first item of the source is used as the seed. *
 * @example <caption>Count the number of click events</caption> var clicks = Rx.Observable.fromEvent(document, 'click'); var ones = clicks.mapTo(1); var seed = 0; var count = ones.scan((acc, one) => acc + one, seed); count.subscribe(x => console.log(x)); *
 * @see {@link expand}
 * @see {@link mergeScan}
 * @see {@link reduce} * called on each source value.
 * @method scan
 * @owner Observable
 * @param {?} accumulator
 * @param {?=} seed
 * @return {?}
 */
function scan(accumulator, seed) {
    return this.lift(new ScanOperator(accumulator, seed));
}
exports.scan = scan;
class ScanOperator {
    /**
     * @param {?} accumulator
     * @param {?=} seed
     */
    constructor(accumulator, seed) {
        this.accumulator = accumulator;
        this.seed = seed;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ScanOperator.prototype.accumulator;
        /** @type {?} */
        ScanOperator.prototype.seed;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class ScanSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} accumulator
     * @param {?=} seed
     */
    constructor(destination, accumulator, seed) {
        super(destination);
        this.accumulator = accumulator;
        this.accumulatorSet = false;
        this.seed = seed;
        this.accumulator = accumulator;
        this.accumulatorSet = typeof seed !== 'undefined';
    }
    get seed() {
        return this._seed;
    }
    set seed(value) {
        this.accumulatorSet = true;
        this._seed = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        if (!this.accumulatorSet) {
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
        let /** @type {?} */ result;
        try {
            result = this.accumulator(/** @type {?} */ (this.seed), value);
        }
        catch (err) {
            this.destination.error(err);
        }
        this.seed = result;
        this.destination.next(result);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ScanSubscriber.prototype._seed;
        /** @type {?} */
        ScanSubscriber.prototype.accumulatorSet;
        /** @type {?} */
        ScanSubscriber.prototype.accumulator;
    }
}
