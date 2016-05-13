goog.module('rxjs$operator$catch');
var Subscriber_1 = goog.require('rxjs$Subscriber');
/**
 *  Catches errors on the observable to be handled by returning a new observable or throwing an error. is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable is returned by the `selector` will be used to continue the observable chain. catch `selector` function.
 * @method catch
 * @owner Observable
 * @param {?} selector
 * @return {?}
 */
function _catch(selector) {
    const /** @type {?} */ operator = new CatchOperator(selector);
    const /** @type {?} */ caught = this.lift(operator);
    return (operator.caught = caught);
}
exports._catch = _catch;
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
        return source._subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CatchOperator.prototype.caught;
        /** @type {?} */
        CatchOperator.prototype.selector;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class CatchSubscriber extends Subscriber_1.Subscriber {
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
            this._innerSub(result);
        }
    }
    /**
     * @param {?} result
     * @return {?}
     */
    _innerSub(result) {
        this.unsubscribe();
        ((this.destination)).remove(this);
        result.subscribe(this.destination);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CatchSubscriber.prototype.selector;
        /** @type {?} */
        CatchSubscriber.prototype.caught;
    }
}
