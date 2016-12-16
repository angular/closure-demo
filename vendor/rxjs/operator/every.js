import { Subscriber } from '../Subscriber';
/**
 * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
 * @owner Observable
 * @this {?}
 * @param {?} predicate
 * @param {?=} thisArg
 * @return {?}
 */
export function every(predicate, thisArg) {
    return this.lift(new EveryOperator(predicate, thisArg, this));
}
class EveryOperator {
    /**
     * @param {?} predicate
     * @param {?=} thisArg
     * @param {?=} source
     */
    constructor(predicate, thisArg, source) {
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }
    /**
     * @param {?} observer
     * @param {?} source
     * @return {?}
     */
    call(observer, source) {
        return source.subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class EverySubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} predicate
     * @param {?} thisArg
     * @param {?=} source
     */
    constructor(destination, predicate, thisArg, source) {
        super(destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
        this.index = 0;
        this.thisArg = thisArg || this;
    }
    /**
     * @param {?} everyValueMatch
     * @return {?}
     */
    notifyComplete(everyValueMatch) {
        this.destination.next(everyValueMatch);
        this.destination.complete();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        let /** @type {?} */ result = false;
        try {
            result = this.predicate.call(this.thisArg, value, this.index++, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (!result) {
            this.notifyComplete(false);
        }
    }
    /**
     * @return {?}
     */
    _complete() {
        this.notifyComplete(true);
    }
}
function EverySubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    EverySubscriber.prototype.index;
}
