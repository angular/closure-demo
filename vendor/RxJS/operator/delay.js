goog.module('rxjs$operator$delay');
var async_1 = goog.require('rxjs$scheduler$async');
var isDate_1 = goog.require('rxjs$util$isDate');
var Subscriber_1 = goog.require('rxjs$Subscriber');
var Notification_1 = goog.require('rxjs$Notification');
/**
 *  Delays the emission of items from the source Observable by a given timeout or until a given Date. * <span class="informal">Time shifts each item by some specified amount of milliseconds.</span> * <img src="./img/delay.png" width="100%"> * If the delay argument is a Number, this operator time shifts the source Observable by that amount of time expressed in milliseconds. The relative time intervals between the values are preserved. * If the delay argument is a Date, this operator time shifts the start of the Observable execution until the given date occurs. *
 * @example <caption>Delay each click by one second</caption> var clicks = Rx.Observable.fromEvent(document, 'click'); var delayedClicks = clicks.delay(1000); // each click emitted after 1 second delayedClicks.subscribe(x => console.log(x)); *
 * @example <caption>Delay all clicks until a future date happens</caption> var clicks = Rx.Observable.fromEvent(document, 'click'); var date = new Date('March 15, 2050 12:00:00'); // in the future var delayedClicks = clicks.delay(date); // click emitted only after that date delayedClicks.subscribe(x => console.log(x)); *
 * @see {@link debounceTime}
 * @see {@link delayWhen} * a `Date` until which the emission of the source items is delayed. managing the timers that handle the time-shift for each item. Observable by the specified timeout or Date.
 * @method delay
 * @owner Observable
 * @param {?} delay
 * @param {?=} scheduler
 * @return {?}
 */
function delay(delay, scheduler = async_1.async) {
    const /** @type {?} */ absoluteDelay = isDate_1.isDate(delay);
    const /** @type {?} */ delayFor = absoluteDelay ? (+delay - scheduler.now()) : Math.abs(/** @type {?} */ (delay));
    return this.lift(new DelayOperator(delayFor, scheduler));
}
exports.delay = delay;
class DelayOperator {
    /**
     * @param {?} delay
     * @param {?} scheduler
     */
    constructor(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DelayOperator.prototype.delay;
        /** @type {?} */
        DelayOperator.prototype.scheduler;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class DelaySubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} delay
     * @param {?} scheduler
     */
    constructor(destination, delay, scheduler) {
        super(destination);
        this.delay = delay;
        this.scheduler = scheduler;
        this.queue = [];
        this.active = false;
        this.errored = false;
    }
    /**
     * @param {?} state
     * @return {?}
     */
    static dispatch(state) {
        const /** @type {?} */ source = state.source;
        const /** @type {?} */ queue = source.queue;
        const /** @type {?} */ scheduler = state.scheduler;
        const /** @type {?} */ destination = state.destination;
        while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
            queue.shift().notification.observe(destination);
        }
        if (queue.length > 0) {
            const /** @type {?} */ delay = Math.max(0, queue[0].time - scheduler.now());
            ((this)).schedule(state, delay);
        }
        else {
            source.active = false;
        }
    }
    /**
     * @param {?} scheduler
     * @return {?}
     */
    _schedule(scheduler) {
        this.active = true;
        this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
            source: this, destination: this.destination, scheduler: scheduler
        }));
    }
    /**
     * @param {?} notification
     * @return {?}
     */
    scheduleNotification(notification) {
        if (this.errored === true) {
            return;
        }
        const /** @type {?} */ scheduler = this.scheduler;
        const /** @type {?} */ message = new DelayMessage(scheduler.now() + this.delay, notification);
        this.queue.push(message);
        if (this.active === false) {
            this._schedule(scheduler);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.scheduleNotification(Notification_1.Notification.createNext(value));
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        this.errored = true;
        this.queue = [];
        this.destination.error(err);
    }
    /**
     * @return {?}
     */
    _complete() {
        this.scheduleNotification(Notification_1.Notification.createComplete());
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DelaySubscriber.prototype.queue;
        /** @type {?} */
        DelaySubscriber.prototype.active;
        /** @type {?} */
        DelaySubscriber.prototype.errored;
        /** @type {?} */
        DelaySubscriber.prototype.delay;
        /** @type {?} */
        DelaySubscriber.prototype.scheduler;
    }
}
class DelayMessage {
    /**
     * @param {?} time
     * @param {?} notification
     */
    constructor(time, notification) {
        this.time = time;
        this.notification = notification;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DelayMessage.prototype.time;
        /** @type {?} */
        DelayMessage.prototype.notification;
    }
}
