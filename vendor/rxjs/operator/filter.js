import { Subscriber } from '../Subscriber';
/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {\@link distinct}
 * @see {\@link distinctUntilChanged}
 * @see {\@link distinctUntilKeyChanged}
 * @see {\@link ignoreElements}
 * @see {\@link partition}
 * @see {\@link skip}
 *
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * in the `predicate` function.
 * allowed by the `predicate` function.
 * @owner Observable
 * @this {?}
 * @param {?} predicate
 * @param {?=} thisArg
 * @return {?}
 */
export function filter(predicate, thisArg) {
    return this.lift(new FilterOperator(predicate, thisArg));
}
class FilterOperator {
    /**
     * @param {?} predicate
     * @param {?=} thisArg
     */
    constructor(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class FilterSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} predicate
     * @param {?} thisArg
     */
    constructor(destination, predicate, thisArg) {
        super(destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.count = 0;
        this.predicate = predicate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        let /** @type {?} */ result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    }
}
function FilterSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    FilterSubscriber.prototype.count;
}
