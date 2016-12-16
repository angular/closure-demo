import { Subscriber } from '../Subscriber';
import { ArgumentOutOfRangeError } from '../util/ArgumentOutOfRangeError';
/**
 * Emits the single value at the specified `index` in a sequence of emissions
 * from the source Observable.
 *
 * <span class="informal">Emits only the i-th value, then completes.</span>
 *
 * <img src="./img/elementAt.png" width="100%">
 *
 * `elementAt` returns an Observable that emits the item at the specified
 * `index` in the source Observable, or a default value if that `index` is out
 * of range and the `default` argument is provided. If the `default` argument is
 * not given and the `index` is out of range, the output Observable will emit an
 * `ArgumentOutOfRangeError` error.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.elementAt(2);
 * result.subscribe(x => console.log(x));
 *
 * // Results in:
 * // click 1 = nothing
 * // click 2 = nothing
 * // click 3 = MouseEvent object logged to console
 *
 * @see {\@link first}
 * @see {\@link last}
 * @see {\@link skip}
 * @see {\@link single}
 * @see {\@link take}
 *
 * @throws {ArgumentOutOfRangeError} When using `elementAt(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0` or the
 * Observable has completed before emitting the i-th `next` notification.
 *
 * happened since the subscription, starting from the number `0`.
 * Otherwise, will emit the default value if given. If not, then emits an error.
 * @owner Observable
 * @this {?}
 * @param {?} index
 * @param {?=} defaultValue
 * @return {?}
 */
export function elementAt(index, defaultValue) {
    return this.lift(new ElementAtOperator(index, defaultValue));
}
class ElementAtOperator {
    /**
     * @param {?} index
     * @param {?=} defaultValue
     */
    constructor(index, defaultValue) {
        this.index = index;
        this.defaultValue = defaultValue;
        if (index < 0) {
            throw new ArgumentOutOfRangeError;
        }
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new ElementAtSubscriber(subscriber, this.index, this.defaultValue));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class ElementAtSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} index
     * @param {?=} defaultValue
     */
    constructor(destination, index, defaultValue) {
        super(destination);
        this.index = index;
        this.defaultValue = defaultValue;
    }
    /**
     * @param {?} x
     * @return {?}
     */
    _next(x) {
        if (this.index-- === 0) {
            this.destination.next(x);
            this.destination.complete();
        }
    }
    /**
     * @return {?}
     */
    _complete() {
        const /** @type {?} */ destination = this.destination;
        if (this.index >= 0) {
            if (typeof this.defaultValue !== 'undefined') {
                destination.next(this.defaultValue);
            }
            else {
                destination.error(new ArgumentOutOfRangeError);
            }
        }
        destination.complete();
    }
}
