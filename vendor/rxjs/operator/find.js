import { Subscriber } from '../Subscriber';
/**
 * Emits only the first value emitted by the source Observable that meets some
 * condition.
 *
 * <span class="informal">Finds the first value that passes some test and emits
 * that.</span>
 *
 * <img src="./img/find.png" width="100%">
 *
 * `find` searches for the first item in the source Observable that matches the
 * specified condition embodied by the `predicate`, and returns the first
 * occurrence in the source. Unlike {\@link first}, the `predicate` is required
 * in `find`, and does not emit an error if a valid value is not found.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.find(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link filter}
 * @see {\@link first}
 * @see {\@link findIndex}
 * @see {\@link take}
 *
 * A function called with each item to test for condition matching.
 * in the `predicate` function.
 * condition.
 * @owner Observable
 * @this {?}
 * @param {?} predicate
 * @param {?=} thisArg
 * @return {?}
 */
export function find(predicate, thisArg) {
    if (typeof predicate !== 'function') {
        throw new TypeError('predicate is not a function');
    }
    return (this.lift(new FindValueOperator(predicate, this, false, thisArg)));
}
export class FindValueOperator {
    /**
     * @param {?} predicate
     * @param {?} source
     * @param {?} yieldIndex
     * @param {?=} thisArg
     */
    constructor(predicate, source, yieldIndex, thisArg) {
        this.predicate = predicate;
        this.source = source;
        this.yieldIndex = yieldIndex;
        this.thisArg = thisArg;
    }
    /**
     * @param {?} observer
     * @param {?} source
     * @return {?}
     */
    call(observer, source) {
        return source.subscribe(new FindValueSubscriber(observer, this.predicate, this.source, this.yieldIndex, this.thisArg));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class FindValueSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} predicate
     * @param {?} source
     * @param {?} yieldIndex
     * @param {?=} thisArg
     */
    constructor(destination, predicate, source, yieldIndex, thisArg) {
        super(destination);
        this.predicate = predicate;
        this.source = source;
        this.yieldIndex = yieldIndex;
        this.thisArg = thisArg;
        this.index = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    notifyComplete(value) {
        const /** @type {?} */ destination = this.destination;
        destination.next(value);
        destination.complete();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const { predicate, thisArg } = this;
        const /** @type {?} */ index = this.index++;
        try {
            const /** @type {?} */ result = predicate.call(thisArg || this, value, index, this.source);
            if (result) {
                this.notifyComplete(this.yieldIndex ? index : value);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    }
    /**
     * @return {?}
     */
    _complete() {
        this.notifyComplete(this.yieldIndex ? -1 : undefined);
    }
}
function FindValueSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    FindValueSubscriber.prototype.index;
}
