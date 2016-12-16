import { Subscriber } from '../Subscriber';
/**
 * Returns an Observable that skips `n` items emitted by an Observable.
 *
 * <img src="./img/skip.png" width="100%">
 *
 *
 * @owner Observable
 * @this {?}
 * @param {?} total
 * @return {?}
 */
export function skip(total) {
    return this.lift(new SkipOperator(total));
}
class SkipOperator {
    /**
     * @param {?} total
     */
    constructor(total) {
        this.total = total;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new SkipSubscriber(subscriber, this.total));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class SkipSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} total
     */
    constructor(destination, total) {
        super(destination);
        this.total = total;
        this.count = 0;
    }
    /**
     * @param {?} x
     * @return {?}
     */
    _next(x) {
        if (++this.count > this.total) {
            this.destination.next(x);
        }
    }
}
function SkipSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SkipSubscriber.prototype.count;
}
