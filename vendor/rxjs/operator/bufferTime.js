import { async } from '../scheduler/async';
import { Subscriber } from '../Subscriber';
import { isScheduler } from '../util/isScheduler';
/**
 * Buffers the source Observable values for a specific time period.
 *
 * <span class="informal">Collects values from the past as an array, and emits
 * those arrays periodically in time.</span>
 *
 * <img src="./img/bufferTime.png" width="100%">
 *
 * Buffers values from the source for a specific time duration `bufferTimeSpan`.
 * Unless the optional argument `bufferCreationInterval` is given, it emits and
 * resets the buffer every `bufferTimeSpan` milliseconds. If
 * `bufferCreationInterval` is given, this operator opens the buffer every
 * `bufferCreationInterval` milliseconds and closes (emits and resets) the
 * buffer every `bufferTimeSpan` milliseconds. When the optional argument
 * `maxBufferSize` is specified, the buffer will be closed either after
 * `bufferTimeSpan` milliseconds or when it contains `maxBufferSize` elements.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferTime(1000);
 * buffered.subscribe(x => console.log(x));
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferTime(2000, 5000);
 * buffered.subscribe(x => console.log(x));
 *
 * @see {\@link buffer}
 * @see {\@link bufferCount}
 * @see {\@link bufferToggle}
 * @see {\@link bufferWhen}
 * @see {\@link windowTime}
 *
 * buffers.
 * intervals that determine buffer boundaries.
 * @owner Observable
 * @this {?}
 * @param {?} bufferTimeSpan
 * @return {?}
 */
export function bufferTime(bufferTimeSpan) {
    let /** @type {?} */ length = arguments.length;
    let /** @type {?} */ scheduler = async;
    if (isScheduler(arguments[arguments.length - 1])) {
        scheduler = arguments[arguments.length - 1];
        length--;
    }
    let /** @type {?} */ bufferCreationInterval = null;
    if (length >= 2) {
        bufferCreationInterval = arguments[1];
    }
    let /** @type {?} */ maxBufferSize = Number.POSITIVE_INFINITY;
    if (length >= 3) {
        maxBufferSize = arguments[2];
    }
    return this.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler));
}
class BufferTimeOperator {
    /**
     * @param {?} bufferTimeSpan
     * @param {?} bufferCreationInterval
     * @param {?} maxBufferSize
     * @param {?} scheduler
     */
    constructor(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
        this.bufferTimeSpan = bufferTimeSpan;
        this.bufferCreationInterval = bufferCreationInterval;
        this.maxBufferSize = maxBufferSize;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler));
    }
}
class Context {
    constructor() {
        this.buffer = [];
    }
}
function Context_tsickle_Closure_declarations() {
    /** @type {?} */
    Context.prototype.buffer;
    /** @type {?} */
    Context.prototype.closeAction;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class BufferTimeSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} bufferTimeSpan
     * @param {?} bufferCreationInterval
     * @param {?} maxBufferSize
     * @param {?} scheduler
     */
    constructor(destination, bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
        super(destination);
        this.bufferTimeSpan = bufferTimeSpan;
        this.bufferCreationInterval = bufferCreationInterval;
        this.maxBufferSize = maxBufferSize;
        this.scheduler = scheduler;
        this.contexts = [];
        const context = this.openContext();
        this.timespanOnly = bufferCreationInterval == null || bufferCreationInterval < 0;
        if (this.timespanOnly) {
            const timeSpanOnlyState = { subscriber: this, context, bufferTimeSpan };
            this.add(context.closeAction = scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        }
        else {
            const closeState = { subscriber: this, context };
            const creationState = { bufferTimeSpan, bufferCreationInterval, subscriber: this, scheduler };
            this.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
            this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ contexts = this.contexts;
        const /** @type {?} */ len = contexts.length;
        let /** @type {?} */ filledBufferContext;
        for (let /** @type {?} */ i = 0; i < len; i++) {
            const /** @type {?} */ context = contexts[i];
            const /** @type {?} */ buffer = context.buffer;
            buffer.push(value);
            if (buffer.length == this.maxBufferSize) {
                filledBufferContext = context;
            }
        }
        if (filledBufferContext) {
            this.onBufferFull(filledBufferContext);
        }
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        this.contexts.length = 0;
        super._error(err);
    }
    /**
     * @return {?}
     */
    _complete() {
        const { contexts, destination } = this;
        while (contexts.length > 0) {
            const /** @type {?} */ context = contexts.shift();
            destination.next(context.buffer);
        }
        super._complete();
    }
    /**
     * @return {?}
     */
    _unsubscribe() {
        this.contexts = null;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    onBufferFull(context) {
        this.closeContext(context);
        const /** @type {?} */ closeAction = context.closeAction;
        closeAction.unsubscribe();
        this.remove(closeAction);
        if (!this.closed && this.timespanOnly) {
            context = this.openContext();
            const /** @type {?} */ bufferTimeSpan = this.bufferTimeSpan;
            const /** @type {?} */ timeSpanOnlyState = { subscriber: this, context, bufferTimeSpan };
            this.add(context.closeAction = this.scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        }
    }
    /**
     * @return {?}
     */
    openContext() {
        const /** @type {?} */ context = new Context();
        this.contexts.push(context);
        return context;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    closeContext(context) {
        this.destination.next(context.buffer);
        const /** @type {?} */ contexts = this.contexts;
        const /** @type {?} */ spliceIndex = contexts ? contexts.indexOf(context) : -1;
        if (spliceIndex >= 0) {
            contexts.splice(contexts.indexOf(context), 1);
        }
    }
}
function BufferTimeSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    BufferTimeSubscriber.prototype.contexts;
    /** @type {?} */
    BufferTimeSubscriber.prototype.timespanOnly;
}
/**
 * @this {?}
 * @param {?} state
 * @return {?}
 */
function dispatchBufferTimeSpanOnly(state) {
    const /** @type {?} */ subscriber = state.subscriber;
    const /** @type {?} */ prevContext = state.context;
    if (prevContext) {
        subscriber.closeContext(prevContext);
    }
    if (!subscriber.closed) {
        state.context = subscriber.openContext();
        state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
    }
}
/**
 * @this {?}
 * @param {?} state
 * @return {?}
 */
function dispatchBufferCreation(state) {
    const { bufferCreationInterval, bufferTimeSpan, subscriber, scheduler } = state;
    const /** @type {?} */ context = subscriber.openContext();
    const /** @type {?} */ action = (this);
    if (!subscriber.closed) {
        subscriber.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber, context }));
        action.schedule(state, bufferCreationInterval);
    }
}
/**
 * @param {?} arg
 * @return {?}
 */
function dispatchBufferClose(arg) {
    const { subscriber, context } = arg;
    subscriber.closeContext(context);
}
