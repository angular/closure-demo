import { Subscriber } from '../Subscriber';
import { Notification } from '../Notification';
/**
 * @see {\@link Notification}
 *
 * @owner Observable
 * @this {?}
 * @param {?} scheduler
 * @param {?=} delay
 * @return {?}
 */
export function observeOn(scheduler, delay = 0) {
    return this.lift(new ObserveOnOperator(scheduler, delay));
}
export class ObserveOnOperator {
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
        return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class ObserveOnSubscriber extends Subscriber {
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
        this.scheduleMessage(Notification.createNext(value));
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        this.scheduleMessage(Notification.createError(err));
    }
    /**
     * @return {?}
     */
    _complete() {
        this.scheduleMessage(Notification.createComplete());
    }
}
export class ObserveOnMessage {
    /**
     * @param {?} notification
     * @param {?} destination
     */
    constructor(notification, destination) {
        this.notification = notification;
        this.destination = destination;
    }
}
