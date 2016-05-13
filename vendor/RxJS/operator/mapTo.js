goog.module('rxjs$operator$mapTo');
var Subscriber_1 = goog.require('rxjs$Subscriber');
/**
 *  Emits the given constant value on the output Observable every time the source Observable emits a value. * <span class="informal">Like {@link map}, but it maps every source value to the same output value every time.</span> * <img src="./img/mapTo.png" width="100%"> * Takes a constant `value` as argument, and emits that whenever the source Observable emits a value. In other words, ignores the actual source value, and simply uses the emission moment to know when to emit the given `value`. *
 * @example <caption>Map every every click to the string 'Hi'</caption> var clicks = Rx.Observable.fromEvent(document, 'click'); var greetings = clicks.mapTo('Hi'); greetings.subscribe(x => console.log(x)); *
 * @see {@link map} * the source Observable emits something.
 * @method mapTo
 * @owner Observable
 * @param {?} value
 * @return {?}
 */
function mapTo(value) {
    return this.lift(new MapToOperator(value));
}
exports.mapTo = mapTo;
class MapToOperator {
    /**
     * @param {?} value
     */
    constructor(value) {
        this.value = value;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new MapToSubscriber(subscriber, this.value));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        MapToOperator.prototype.value;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class MapToSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} value
     */
    constructor(destination, value) {
        super(destination);
        this.value = value;
    }
    /**
     * @param {?} x
     * @return {?}
     */
    _next(x) {
        this.destination.next(this.value);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        MapToSubscriber.prototype.value;
    }
}
