import { Subscriber } from '../Subscriber';
/**
 * Emits values emitted by the source Observable so long as each value satisfies
 * the given `predicate`, and then completes as soon as this `predicate` is not
 * satisfied.
 *
 * <span class="informal">Takes values from the source only while they pass the
 * condition given. When the first value does not satisfy, it completes.</span>
 *
 * <img src="./img/takeWhile.png" width="100%">
 *
 * `takeWhile` subscribes and begins mirroring the source Observable. Each value
 * emitted on the source is given to the `predicate` function which returns a
 * boolean, representing a condition to be satisfied by the source values. The
 * output Observable emits the source values until such time as the `predicate`
 * returns false, at which point `takeWhile` stops mirroring the source
 * Observable and completes the output Observable.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.takeWhile(ev => ev.clientX > 200);
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link take}
 * @see {\@link takeLast}
 * @see {\@link takeUntil}
 * @see {\@link skip}
 *
 * evaluates a value emitted by the source Observable and returns a boolean.
 * Also takes the (zero-based) index as the second argument.
 * Observable so long as each value satisfies the condition defined by the
 * `predicate`, then completes.
 * @owner Observable
 * @this {?}
 * @param {?} predicate
 * @return {?}
 */
export function takeWhile(predicate) {
    return this.lift(new TakeWhileOperator(predicate));
}
class TakeWhileOperator {
    /**
     * @param {?} predicate
     */
    constructor(predicate) {
        this.predicate = predicate;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new TakeWhileSubscriber(subscriber, this.predicate));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class TakeWhileSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} predicate
     */
    constructor(destination, predicate) {
        super(destination);
        this.predicate = predicate;
        this.index = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ destination = this.destination;
        let /** @type {?} */ result;
        try {
            result = this.predicate(value, this.index++);
        }
        catch (err) {
            destination.error(err);
            return;
        }
        this.nextOrComplete(value, result);
    }
    /**
     * @param {?} value
     * @param {?} predicateResult
     * @return {?}
     */
    nextOrComplete(value, predicateResult) {
        const /** @type {?} */ destination = this.destination;
        if (Boolean(predicateResult)) {
            destination.next(value);
        }
        else {
            destination.complete();
        }
    }
}
function TakeWhileSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    TakeWhileSubscriber.prototype.index;
}
