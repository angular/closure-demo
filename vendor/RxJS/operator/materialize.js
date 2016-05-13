goog.module('rxjs$operator$materialize');
var Subscriber_1 = goog.require('rxjs$Subscriber');
var Notification_1 = goog.require('rxjs$Notification');
/**
 *  Returns an Observable that represents all of the emissions and notifications from the source Observable into emissions marked with their original types within a `Notification` objects. * <img src="./img/materialize.png" width="100%"> *
 * @see {@link Notification} *
 * @scheduler materialize does not operate by default on a particular Scheduler. materializing the items and notifications of the source Observable.
 * @method materialize
 * @owner Observable
 * @return {?}
 */
function materialize() {
    return this.lift(new MaterializeOperator());
}
exports.materialize = materialize;
class MaterializeOperator {
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new MaterializeSubscriber(subscriber));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class MaterializeSubscriber extends Subscriber_1.Subscriber {
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
        this.destination.next(Notification_1.Notification.createNext(value));
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        const /** @type {?} */ destination = this.destination;
        destination.next(Notification_1.Notification.createError(err));
        destination.complete();
    }
    /**
     * @return {?}
     */
    _complete() {
        const /** @type {?} */ destination = this.destination;
        destination.next(Notification_1.Notification.createComplete());
        destination.complete();
    }
}
