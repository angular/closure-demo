import { Subscriber } from '../Subscriber';
/**
 * Emits a given value if the source Observable completes without emitting any
 * `next` value, otherwise mirrors the source Observable.
 *
 * <span class="informal">If the source Observable turns out to be empty, then
 * this operator will emit a default value.</span>
 *
 * <img src="./img/defaultIfEmpty.png" width="100%">
 *
 * `defaultIfEmpty` emits the values emitted by the source Observable or a
 * specified default value if the source Observable is empty (completes without
 * having emitted any `next` value).
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksBeforeFive = clicks.takeUntil(Rx.Observable.interval(5000));
 * var result = clicksBeforeFive.defaultIfEmpty('no clicks');
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link empty}
 * @see {\@link last}
 *
 * Observable is empty.
 * `defaultValue` if the source Observable emits no items, or the values emitted
 * by the source Observable.
 * @owner Observable
 * @this {?}
 * @param {?=} defaultValue
 * @return {?}
 */
export function defaultIfEmpty(defaultValue = null) {
    return this.lift(new DefaultIfEmptyOperator(defaultValue));
}
class DefaultIfEmptyOperator {
    /**
     * @param {?} defaultValue
     */
    constructor(defaultValue) {
        this.defaultValue = defaultValue;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class DefaultIfEmptySubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} defaultValue
     */
    constructor(destination, defaultValue) {
        super(destination);
        this.defaultValue = defaultValue;
        this.isEmpty = true;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.isEmpty = false;
        this.destination.next(value);
    }
    /**
     * @return {?}
     */
    _complete() {
        if (this.isEmpty) {
            this.destination.next(this.defaultValue);
        }
        this.destination.complete();
    }
}
function DefaultIfEmptySubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    DefaultIfEmptySubscriber.prototype.isEmpty;
}
