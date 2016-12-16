import { Subscriber } from '../Subscriber';
/**
 * Returns an Observable that skips all items emitted by the source Observable as long as a specified condition holds
 * true, but emits all further source items as soon as the condition becomes false.
 *
 * <img src="./img/skipWhile.png" width="100%">
 *
 * specified predicate becomes false.
 * @owner Observable
 * @this {?}
 * @param {?} predicate
 * @return {?}
 */
export function skipWhile(predicate) {
    return this.lift(new SkipWhileOperator(predicate));
}
class SkipWhileOperator {
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
        return source.subscribe(new SkipWhileSubscriber(subscriber, this.predicate));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class SkipWhileSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} predicate
     */
    constructor(destination, predicate) {
        super(destination);
        this.predicate = predicate;
        this.skipping = true;
        this.index = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ destination = this.destination;
        if (this.skipping) {
            this.tryCallPredicate(value);
        }
        if (!this.skipping) {
            destination.next(value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    tryCallPredicate(value) {
        try {
            const /** @type {?} */ result = this.predicate(value, this.index++);
            this.skipping = Boolean(result);
        }
        catch (err) {
            this.destination.error(err);
        }
    }
}
function SkipWhileSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SkipWhileSubscriber.prototype.skipping;
    /** @type {?} */
    SkipWhileSubscriber.prototype.index;
}
