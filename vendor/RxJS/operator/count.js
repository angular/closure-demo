goog.module('rxjs$operator$count');
var Subscriber_1 = goog.require('rxjs$Subscriber');
/**
 *  Counts the number of emissions on the source and emits that number when the source completes. * <span class="informal">Tells how many values were emitted, when the source completes.</span> * <img src="./img/count.png" width="100%"> * `count` transforms an Observable that emits values into an Observable that emits a single value that represents the number of values emitted by the source Observable. If the source Observable terminates with an error, `count` will pass this error notification along without emitting an value first. If the source Observable does not terminate at all, `count` will neither emit a value nor terminate. This operator takes an optional `predicate` function as argument, in which case the output emission will represent the number of source values that matched `true` with the `predicate`. *
 * @example <caption>Counts how many seconds have passed before the first click happened</caption> var seconds = Rx.Observable.interval(1000); var clicks = Rx.Observable.fromEvent(document, 'click'); var secondsBeforeClick = seconds.takeUntil(clicks); var result = secondsBeforeClick.count(); result.subscribe(x => console.log(x)); *
 * @example <caption>Counts how many odd numbers are there between 1 and 7</caption> var numbers = Rx.Observable.range(1, 7); var result = numbers.count(i => i % 2 === 1); result.subscribe(x => console.log(x)); *
 * @see {@link max}
 * @see {@link min}
 * @see {@link reduce} * boolean function to select what values are to be counted. It is provided with arguments of: - `value`: the value from the source Observable. - `index`: the (zero-based) "index" of the value from the source Observable. - `source`: the source Observable instance itself. described above.
 * @method count
 * @owner Observable
 * @param {?=} predicate
 * @return {?}
 */
function count(predicate) {
    return this.lift(new CountOperator(predicate, this));
}
exports.count = count;
class CountOperator {
    /**
     * @param {?=} predicate
     * @param {?=} source
     */
    constructor(predicate, source) {
        this.predicate = predicate;
        this.source = source;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new CountSubscriber(subscriber, this.predicate, this.source));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CountOperator.prototype.predicate;
        /** @type {?} */
        CountOperator.prototype.source;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class CountSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?=} predicate
     * @param {?=} source
     */
    constructor(destination, predicate, source) {
        super(destination);
        this.predicate = predicate;
        this.source = source;
        this.count = 0;
        this.index = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        if (this.predicate) {
            this._tryPredicate(value);
        }
        else {
            this.count++;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _tryPredicate(value) {
        let /** @type {?} */ result;
        try {
            result = this.predicate(value, this.index++, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.count++;
        }
    }
    /**
     * @return {?}
     */
    _complete() {
        this.destination.next(this.count);
        this.destination.complete();
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CountSubscriber.prototype.count;
        /** @type {?} */
        CountSubscriber.prototype.index;
        /** @type {?} */
        CountSubscriber.prototype.predicate;
        /** @type {?} */
        CountSubscriber.prototype.source;
    }
}
