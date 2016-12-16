import { Subscriber } from '../Subscriber';
/**
 * Emits the given constant value on the output Observable every time the source
 * Observable emits a value.
 *
 * <span class="informal">Like {\@link map}, but it maps every source value to
 * the same output value every time.</span>
 *
 * <img src="./img/mapTo.png" width="100%">
 *
 * Takes a constant `value` as argument, and emits that whenever the source
 * Observable emits a value. In other words, ignores the actual source value,
 * and simply uses the emission moment to know when to emit the given `value`.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var greetings = clicks.mapTo('Hi');
 * greetings.subscribe(x => console.log(x));
 *
 * @see {\@link map}
 *
 * the source Observable emits something.
 * @owner Observable
 * @this {?}
 * @param {?} value
 * @return {?}
 */
export function mapTo(value) {
    return this.lift(new MapToOperator(value));
}
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
        return source.subscribe(new MapToSubscriber(subscriber, this.value));
    }
}
function MapToOperator_tsickle_Closure_declarations() {
    /** @type {?} */
    MapToOperator.prototype.value;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class MapToSubscriber extends Subscriber {
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
}
function MapToSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    MapToSubscriber.prototype.value;
}
