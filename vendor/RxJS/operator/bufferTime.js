goog.module('rxjs$operator$bufferTime');
var Subscriber_1 = goog.require('rxjs$Subscriber');
var async_1 = goog.require('rxjs$scheduler$async');
/**
 *  Buffers the source Observable values for a specific time period. * <span class="informal">Collects values from the past as an array, and emits those arrays periodically in time.</span> * <img src="./img/bufferTime.png" width="100%"> * Buffers values from the source for a specific time duration `bufferTimeSpan`. Unless the optional argument `bufferCreationInterval` is given, it emits and resets the buffer every `bufferTimeSpan` milliseconds. If `bufferCreationInterval` is given, this operator opens the buffer every `bufferCreationInterval` milliseconds and closes (emits and resets) the buffer every `bufferTimeSpan` milliseconds. *
 * @example <caption>Every second, emit an array of the recent click events</caption> var clicks = Rx.Observable.fromEvent(document, 'click'); var buffered = clicks.bufferTime(1000); buffered.subscribe(x => console.log(x)); *
 * @example <caption>Every 5 seconds, emit the click events from the next 2 seconds</caption> var clicks = Rx.Observable.fromEvent(document, 'click'); var buffered = clicks.bufferTime(2000, 5000); buffered.subscribe(x => console.log(x)); *
 * @see {@link buffer}
 * @see {@link bufferCount}
 * @see {@link bufferToggle}
 * @see {@link bufferWhen}
 * @see {@link windowTime} * buffers. intervals that determine buffer boundaries.
 * @method bufferTime
 * @owner Observable
 * @param {?} bufferTimeSpan
 * @param {?=} bufferCreationInterval
 * @param {?=} scheduler
 * @return {?}
 */
function bufferTime(bufferTimeSpan, bufferCreationInterval = null, scheduler = async_1.async) {
    return this.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, scheduler));
}
exports.bufferTime = bufferTime;
class BufferTimeOperator {
    /**
     * @param {?} bufferTimeSpan
     * @param {?} bufferCreationInterval
     * @param {?} scheduler
     */
    constructor(bufferTimeSpan, bufferCreationInterval, scheduler) {
        this.bufferTimeSpan = bufferTimeSpan;
        this.bufferCreationInterval = bufferCreationInterval;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.scheduler));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BufferTimeOperator.prototype.bufferTimeSpan;
        /** @type {?} */
        BufferTimeOperator.prototype.bufferCreationInterval;
        /** @type {?} */
        BufferTimeOperator.prototype.scheduler;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class BufferTimeSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} bufferTimeSpan
     * @param {?} bufferCreationInterval
     * @param {?} scheduler
     */
    constructor(destination, bufferTimeSpan, bufferCreationInterval, scheduler) {
        super(destination);
        this.bufferTimeSpan = bufferTimeSpan;
        this.bufferCreationInterval = bufferCreationInterval;
        this.scheduler = scheduler;
        this.buffers = [];
        const buffer = this.openBuffer();
        if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
            const closeState = { subscriber: this, buffer };
            const creationState = { bufferTimeSpan, bufferCreationInterval, subscriber: this, scheduler };
            this.add(scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
            this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
        }
        else {
            const timeSpanOnlyState = { subscriber: this, buffer, bufferTimeSpan };
            this.add(scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ buffers = this.buffers;
        const /** @type {?} */ len = buffers.length;
        for (let /** @type {?} */ i = 0; i < len; i++) {
            buffers[i].push(value);
        }
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        this.buffers.length = 0;
        super._error(err);
    }
    /**
     * @return {?}
     */
    _complete() {
        const { buffers, destination } = this;
        while (buffers.length > 0) {
            destination.next(buffers.shift());
        }
        super._complete();
    }
    /**
     * @return {?}
     */
    _unsubscribe() {
        this.buffers = null;
    }
    /**
     * @return {?}
     */
    openBuffer() {
        let /** @type {?} */ buffer = [];
        this.buffers.push(buffer);
        return buffer;
    }
    /**
     * @param {?} buffer
     * @return {?}
     */
    closeBuffer(buffer) {
        this.destination.next(buffer);
        const /** @type {?} */ buffers = this.buffers;
        buffers.splice(buffers.indexOf(buffer), 1);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BufferTimeSubscriber.prototype.buffers;
        /** @type {?} */
        BufferTimeSubscriber.prototype.bufferTimeSpan;
        /** @type {?} */
        BufferTimeSubscriber.prototype.bufferCreationInterval;
        /** @type {?} */
        BufferTimeSubscriber.prototype.scheduler;
    }
}
/**
 * @param {?} state
 * @return {?}
 */
function dispatchBufferTimeSpanOnly(state) {
    const /** @type {?} */ subscriber = state.subscriber;
    const /** @type {?} */ prevBuffer = state.buffer;
    if (prevBuffer) {
        subscriber.closeBuffer(prevBuffer);
    }
    state.buffer = subscriber.openBuffer();
    if (!subscriber.isUnsubscribed) {
        ((this)).schedule(state, state.bufferTimeSpan);
    }
}
/**
 * @param {?} state
 * @return {?}
 */
function dispatchBufferCreation(state) {
    const { bufferCreationInterval, bufferTimeSpan, subscriber, scheduler } = state;
    const /** @type {?} */ buffer = subscriber.openBuffer();
    const /** @type {?} */ action = (this);
    if (!subscriber.isUnsubscribed) {
        action.add(scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber, buffer }));
        action.schedule(state, bufferCreationInterval);
    }
}
/**
 * @param {?} arg
 * @return {?}
 */
function dispatchBufferClose(arg) {
    const { subscriber, buffer } = arg;
    subscriber.closeBuffer(buffer);
}
