import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
 *  is returned by the `selector` will be used to continue the observable chain.
 *  catch `selector` function.
 * @owner Observable
 * @this {?}
 * @param {?} selector
 * @return {?}
 */
export function _catch(selector) {
    const /** @type {?} */ operator = new CatchOperator(selector);
    const /** @type {?} */ caught = this.lift(operator);
    return (operator.caught = caught);
}
class CatchOperator {
    /**
     * @param {?} selector
     */
    constructor(selector) {
        this.selector = selector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
    }
}
function CatchOperator_tsickle_Closure_declarations() {
    /** @type {?} */
    CatchOperator.prototype.caught;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class CatchSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} selector
     * @param {?} caught
     */
    constructor(destination, selector, caught) {
        super(destination);
        this.selector = selector;
        this.caught = caught;
    }
    /**
     * @param {?} err
     * @return {?}
     */
    error(err) {
        if (!this.isStopped) {
            let /** @type {?} */ result;
            try {
                result = this.selector(err, this.caught);
            }
            catch (err) {
                this.destination.error(err);
                return;
            }
            this.unsubscribe();
            ((this.destination)).remove(this);
            subscribeToResult(this, result);
        }
    }
}
