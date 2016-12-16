import { Subject } from './Subject';
import { queue } from './scheduler/queue';
import { Subscription } from './Subscription';
import { ObserveOnSubscriber } from './operator/observeOn';
import { ObjectUnsubscribedError } from './util/ObjectUnsubscribedError';
import { SubjectSubscription } from './SubjectSubscription';
export class ReplaySubject extends Subject {
    /**
     * @param {?=} bufferSize
     * @param {?=} windowTime
     * @param {?=} scheduler
     */
    constructor(bufferSize = Number.POSITIVE_INFINITY, windowTime = Number.POSITIVE_INFINITY, scheduler) {
        super();
        this.scheduler = scheduler;
        this._events = [];
        this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        this._windowTime = windowTime < 1 ? 1 : windowTime;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    next(value) {
        const /** @type {?} */ now = this._getNow();
        this._events.push(new ReplayEvent(now, value));
        this._trimBufferThenGetEvents();
        super.next(value);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ _events = this._trimBufferThenGetEvents();
        const /** @type {?} */ scheduler = this.scheduler;
        let /** @type {?} */ subscription;
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscription = Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscription = Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            subscription = new SubjectSubscription(this, subscriber);
        }
        if (scheduler) {
            subscriber.add(subscriber = new ObserveOnSubscriber(subscriber, scheduler));
        }
        const /** @type {?} */ len = _events.length;
        for (let /** @type {?} */ i = 0; i < len && !subscriber.closed; i++) {
            subscriber.next(_events[i].value);
        }
        if (this.hasError) {
            subscriber.error(this.thrownError);
        }
        else if (this.isStopped) {
            subscriber.complete();
        }
        return subscription;
    }
    /**
     * @return {?}
     */
    _getNow() {
        return (this.scheduler || queue).now();
    }
    /**
     * @return {?}
     */
    _trimBufferThenGetEvents() {
        const /** @type {?} */ now = this._getNow();
        const /** @type {?} */ _bufferSize = this._bufferSize;
        const /** @type {?} */ _windowTime = this._windowTime;
        const /** @type {?} */ _events = this._events;
        let /** @type {?} */ eventsCount = _events.length;
        let /** @type {?} */ spliceCount = 0;
        // Trim events that fall out of the time window.
        // Start at the front of the list. Break early once
        // we encounter an event that falls within the window.
        while (spliceCount < eventsCount) {
            if ((now - _events[spliceCount].time) < _windowTime) {
                break;
            }
            spliceCount++;
        }
        if (eventsCount > _bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }
        if (spliceCount > 0) {
            _events.splice(0, spliceCount);
        }
        return _events;
    }
}
function ReplaySubject_tsickle_Closure_declarations() {
    /** @type {?} */
    ReplaySubject.prototype._events;
    /** @type {?} */
    ReplaySubject.prototype._bufferSize;
    /** @type {?} */
    ReplaySubject.prototype._windowTime;
}
class ReplayEvent {
    /**
     * @param {?} time
     * @param {?} value
     */
    constructor(time, value) {
        this.time = time;
        this.value = value;
    }
}
