import { Subscriber } from '../Subscriber';
import { Subscription } from '../Subscription';
/**
 * Returns an Observable that mirrors the source Observable, but will call a specified function when
 * the source terminates on complete or error.
 * @owner Observable
 * @this {?}
 * @param {?} callback
 * @return {?}
 */
export function _finally(callback) {
    return this.lift(new FinallyOperator(callback));
}
class FinallyOperator {
    /**
     * @param {?} callback
     */
    constructor(callback) {
        this.callback = callback;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new FinallySubscriber(subscriber, this.callback));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class FinallySubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} callback
     */
    constructor(destination, callback) {
        super(destination);
        this.add(new Subscription(callback));
    }
}
