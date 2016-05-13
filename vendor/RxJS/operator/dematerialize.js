goog.module('rxjs$operator$dematerialize');
var Subscriber_1 = goog.require('rxjs$Subscriber');
/**
 *  Returns an Observable that transforms Notification objects into the items or notifications they represent. *
 * @see {@link Notification} *
 * @method dematerialize
 * @owner Observable
 * @return {?}
 */
function dematerialize() {
    return this.lift(new DeMaterializeOperator());
}
exports.dematerialize = dematerialize;
class DeMaterializeOperator {
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new DeMaterializeSubscriber(subscriber));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class DeMaterializeSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     */
    constructor(destination) {
        super(destination);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        value.observe(this.destination);
    }
}
