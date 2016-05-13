goog.module('rxjs$operator$observeOn');
var Subscriber_1 = goog.require('rxjs$Subscriber');
var Notification_1 = goog.require('rxjs$Notification');
/**
 * @see {@link Notification} *
 * @method observeOn
 * @owner Observable
 * @param {?} scheduler
 * @param {?=} delay
 * @return {?}
 */
function observeOn(scheduler, delay = 0) {
    return this.lift(new ObserveOnOperator(scheduler, delay));
}
exports.observeOn = observeOn;
class ObserveOnOperator {
    /**
     * @param {?} scheduler
     * @param {?=} delay
     */
    constructor(scheduler, delay = 0) {
        this.scheduler = scheduler;
        this.delay = delay;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ObserveOnOperator.prototype.scheduler;
        /** @type {?} */
        ObserveOnOperator.prototype.delay;
    }
}
exports.ObserveOnOperator = ObserveOnOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class ObserveOnSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} scheduler
     * @param {?=} delay
     */
    constructor(destination, scheduler, delay = 0) {
        super(destination);
        this.scheduler = scheduler;
        this.delay = delay;
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    static dispatch(arg) {
        const { notification, destination } = arg;
        notification.observe(destination);
    }
    /**
     * @param {?} notification
     * @return {?}
     */
    scheduleMessage(notification) {
        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.scheduleMessage(Notification_1.Notification.createNext(value));
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        this.scheduleMessage(Notification_1.Notification.createError(err));
    }
    /**
     * @return {?}
     */
    _complete() {
        this.scheduleMessage(Notification_1.Notification.createComplete());
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ObserveOnSubscriber.prototype.scheduler;
        /** @type {?} */
        ObserveOnSubscriber.prototype.delay;
    }
}
exports.ObserveOnSubscriber = ObserveOnSubscriber;
class ObserveOnMessage {
    /**
     * @param {?} notification
     * @param {?} destination
     */
    constructor(notification, destination) {
        this.notification = notification;
        this.destination = destination;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ObserveOnMessage.prototype.notification;
        /** @type {?} */
        ObserveOnMessage.prototype.destination;
    }
}
exports.ObserveOnMessage = ObserveOnMessage;
