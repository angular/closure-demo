import { Subscriber } from '../Subscriber';
import { EmptyError } from '../util/EmptyError';
/**
 * Returns an Observable that emits only the last item emitted by the source Observable.
 * It optionally takes a predicate function as a parameter, in which case, rather than emitting
 * the last item from the source Observable, the resulting Observable will emit the last item
 * from the source Observable that satisfies the predicate.
 *
 * <img src="./img/last.png" width="100%">
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 * from the source, or an NoSuchElementException if no such items are emitted.
 * @throws - Throws if no items that match the predicate are emitted by the source Observable.
 * @owner Observable
 * @this {?}
 * @param {?=} predicate
 * @param {?=} resultSelector
 * @param {?=} defaultValue
 * @return {?}
 */
export function last(predicate, resultSelector, defaultValue) {
    return this.lift(new LastOperator(predicate, resultSelector, defaultValue, this));
}
class LastOperator {
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
        return source.subscribe(new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class LastSubscriber extends Subscriber {
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
        this.hasValue = false;
        this.index = 0;
        if (typeof defaultValue !== 'undefined') {
            this.lastValue = defaultValue;
            this.hasValue = true;
        }
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
            if (this.resultSelector) {
                this._tryResultSelector(value, index);
                return;
            }
            this.lastValue = value;
            this.hasValue = true;
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
            if (this.resultSelector) {
                this._tryResultSelector(value, index);
                return;
            }
            this.lastValue = value;
            this.hasValue = true;
        }
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
        this.lastValue = result;
        this.hasValue = true;
    }
    /**
     * @return {?}
     */
    _complete() {
        const /** @type {?} */ destination = this.destination;
        if (this.hasValue) {
            destination.next(this.lastValue);
            destination.complete();
        }
        else {
            destination.error(new EmptyError);
        }
    }
}
function LastSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    LastSubscriber.prototype.lastValue;
    /** @type {?} */
    LastSubscriber.prototype.hasValue;
    /** @type {?} */
    LastSubscriber.prototype.index;
}
