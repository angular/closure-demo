goog.module('rxjs$ReplaySubject');
var Subject_1 = goog.require('rxjs$Subject');
var queue_1 = goog.require('rxjs$scheduler$queue');
var observeOn_1 = goog.require('rxjs$operator$observeOn');
/**
 * @class ReplaySubject<T>
 */
class ReplaySubject extends Subject_1.Subject {
    /**
     * @param {?=} bufferSize
     * @param {?=} windowTime
     * @param {?=} scheduler
     */
    constructor(bufferSize = Number.POSITIVE_INFINITY, windowTime = Number.POSITIVE_INFINITY, scheduler) {
        super();
        this.events = [];
        this.scheduler = scheduler;
        this.bufferSize = bufferSize < 1 ? 1 : bufferSize;
        this._windowTime = windowTime < 1 ? 1 : windowTime;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ now = this._getNow();
        this.events.push(new ReplayEvent(now, value));
        this._trimBufferThenGetEvents(now);
        super._next(value);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ events = this._trimBufferThenGetEvents(this._getNow());
        const /** @type {?} */ scheduler = this.scheduler;
        if (scheduler) {
            subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
        }
        let /** @type {?} */ index = -1;
        const /** @type {?} */ len = events.length;
        while (++index < len && !subscriber.isUnsubscribed) {
            subscriber.next(events[index].value);
        }
        return super._subscribe(subscriber);
    }
    /**
     * @return {?}
     */
    _getNow() {
        return (this.scheduler || queue_1.queue).now();
    }
    /**
     * @param {?} now
     * @return {?}
     */
    _trimBufferThenGetEvents(now) {
        const /** @type {?} */ bufferSize = this.bufferSize;
        const /** @type {?} */ _windowTime = this._windowTime;
        const /** @type {?} */ events = this.events;
        let /** @type {?} */ eventsCount = events.length;
        let /** @type {?} */ spliceCount = 0;
        // Trim events that fall out of the time window.
        // Start at the front of the list. Break early once
        // we encounter an event that falls within the window.
        while (spliceCount < eventsCount) {
            if ((now - events[spliceCount].time) < _windowTime) {
                break;
            }
            spliceCount += 1;
        }
        if (eventsCount > bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - bufferSize);
        }
        if (spliceCount > 0) {
            events.splice(0, spliceCount);
        }
        return events;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ReplaySubject.prototype.events;
        /** @type {?} */
        ReplaySubject.prototype.scheduler;
        /** @type {?} */
        ReplaySubject.prototype.bufferSize;
        /** @type {?} */
        ReplaySubject.prototype._windowTime;
    }
}
exports.ReplaySubject = ReplaySubject;
class ReplayEvent {
    /**
     * @param {?} time
     * @param {?} value
     */
    constructor(time, value) {
        this.time = time;
        this.value = value;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ReplayEvent.prototype.time;
        /** @type {?} */
        ReplayEvent.prototype.value;
    }
}
