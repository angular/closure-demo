import { Subscriber } from '../Subscriber';
/**
 * @owner Observable
 * @this {?}
 * @return {?}
 */
export function toArray() {
    return this.lift(new ToArrayOperator());
}
class ToArrayOperator {
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new ToArraySubscriber(subscriber));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class ToArraySubscriber extends Subscriber {
    /**
     * @param {?} destination
     */
    constructor(destination) {
        super(destination);
        this.array = [];
    }
    /**
     * @param {?} x
     * @return {?}
     */
    _next(x) {
        this.array.push(x);
    }
    /**
     * @return {?}
     */
    _complete() {
        this.destination.next(this.array);
        this.destination.complete();
    }
}
function ToArraySubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    ToArraySubscriber.prototype.array;
}
