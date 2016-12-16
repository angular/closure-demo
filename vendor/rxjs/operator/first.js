import { Subscriber } from '../Subscriber';
import { EmptyError } from '../util/EmptyError';
/**
 * Emits only the first value (or the first value that meets some condition)
 * emitted by the source Observable.
 *
 * <span class="informal">Emits only the first value. Or emits only the first
 * value that passes some test.</span>
 *
 * <img src="./img/first.png" width="100%">
 *
 * If called with no arguments, `first` emits the first value of the source
 * Observable, then completes. If called with a `predicate` function, `first`
 * emits the first value of the source that matches the specified condition. It
 * may also take a `resultSelector` function to produce the output value from
 * the input value, and a `defaultValue` to emit in case the source completes
 * before it is able to emit a valid value. Throws an error if `defaultValue`
 * was not provided and a matching element is not found.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first();
 * result.subscribe(x => console.log(x));
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link filter}
 * @see {\@link find}
 * @see {\@link take}
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 *
 * An optional function called with each item to test for condition matching.
 * produce the value on the output Observable based on the values
 * and the indices of the source Observable. The arguments passed to this
 * function are:
 * - `value`: the value that was emitted on the source.
 * - `index`: the "index" of the value from the source.
 * was found on the source.
 * condition.
 * @owner Observable
 * @this {?}
 * @param {?=} predicate
 * @param {?=} resultSelector
 * @param {?=} defaultValue
 * @return {?}
 */
export function first(predicate, resultSelector, defaultValue) {
    return this.lift(new FirstOperator(predicate, resultSelector, defaultValue, this));
}
class FirstOperator {
    /**
     * @param {?=} predicate
     * @param {?=} resultSelector
     * @param {?=} defaultValue
     * @param {?=} source
     */
    constructor(predicate, resultSelector, defaultValue, source) {
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
    }
    /**
     * @param {?} observer
     * @param {?} source
     * @return {?}
     */
    call(observer, source) {
        return source.subscribe(new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class FirstSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?=} predicate
     * @param {?=} resultSelector
     * @param {?=} defaultValue
     * @param {?=} source
     */
    constructor(destination, predicate, resultSelector, defaultValue, source) {
        super(destination);
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
        this.index = 0;
        this.hasCompleted = false;
        this._emitted = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ index = this.index++;
        if (this.predicate) {
            this._tryPredicate(value, index);
        }
        else {
            this._emit(value, index);
        }
    }
    /**
     * @param {?} value
     * @param {?} index
     * @return {?}
     */
    _tryPredicate(value, index) {
        let /** @type {?} */ result;
        try {
            result = this.predicate(value, index, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this._emit(value, index);
        }
    }
    /**
     * @param {?} value
     * @param {?} index
     * @return {?}
     */
    _emit(value, index) {
        if (this.resultSelector) {
            this._tryResultSelector(value, index);
            return;
        }
        this._emitFinal(value);
    }
    /**
     * @param {?} value
     * @param {?} index
     * @return {?}
     */
    _tryResultSelector(value, index) {
        let /** @type {?} */ result;
        try {
            result = ((this)).resultSelector(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this._emitFinal(result);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _emitFinal(value) {
        const /** @type {?} */ destination = this.destination;
        if (!this._emitted) {
            this._emitted = true;
            destination.next(value);
            destination.complete();
            this.hasCompleted = true;
        }
    }
    /**
     * @return {?}
     */
    _complete() {
        const /** @type {?} */ destination = this.destination;
        if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
            destination.next(this.defaultValue);
            destination.complete();
        }
        else if (!this.hasCompleted) {
            destination.error(new EmptyError);
        }
    }
}
function FirstSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    FirstSubscriber.prototype.index;
    /** @type {?} */
    FirstSubscriber.prototype.hasCompleted;
    /** @type {?} */
    FirstSubscriber.prototype._emitted;
}
