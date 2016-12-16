import { Subscription } from '../Subscription';
import { tryCatch } from '../util/tryCatch';
import { errorObject } from '../util/errorObject';
import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Buffers the source Observable values, using a factory function of closing
 * Observables to determine when to close, emit, and reset the buffer.
 *
 * <span class="informal">Collects values from the past as an array. When it
 * starts collecting values, it calls a function that returns an Observable that
 * tells when to close the buffer and restart collecting.</span>
 *
 * <img src="./img/bufferWhen.png" width="100%">
 *
 * Opens a buffer immediately, then closes the buffer when the observable
 * returned by calling `closingSelector` function emits a value. When it closes
 * the buffer, it immediately opens a new buffer and repeats the process.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferWhen(() =>
 *   Rx.Observable.interval(1000 + Math.random() * 4000)
 * );
 * buffered.subscribe(x => console.log(x));
 *
 * @see {\@link buffer}
 * @see {\@link bufferCount}
 * @see {\@link bufferTime}
 * @see {\@link bufferToggle}
 * @see {\@link windowWhen}
 *
 * arguments and returns an Observable that signals buffer closure.
 * @owner Observable
 * @this {?}
 * @param {?} closingSelector
 * @return {?}
 */
export function bufferWhen(closingSelector) {
    return this.lift(new BufferWhenOperator(closingSelector));
}
class BufferWhenOperator {
    /**
     * @param {?} closingSelector
     */
    constructor(closingSelector) {
        this.closingSelector = closingSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new BufferWhenSubscriber(subscriber, this.closingSelector));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class BufferWhenSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} closingSelector
     */
    constructor(destination, closingSelector) {
        super(destination);
        this.closingSelector = closingSelector;
        this.subscribing = false;
        this.openBuffer();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.buffer.push(value);
    }
    /**
     * @return {?}
     */
    _complete() {
        const /** @type {?} */ buffer = this.buffer;
        if (buffer) {
            this.destination.next(buffer);
        }
        super._complete();
    }
    /**
     * @return {?}
     */
    _unsubscribe() {
        this.buffer = null;
        this.subscribing = false;
    }
    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @param {?} innerSub
     * @return {?}
     */
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openBuffer();
    }
    /**
     * @return {?}
     */
    notifyComplete() {
        if (this.subscribing) {
            this.complete();
        }
        else {
            this.openBuffer();
        }
    }
    /**
     * @return {?}
     */
    openBuffer() {
        let { closingSubscription } = this;
        if (closingSubscription) {
            this.remove(closingSubscription);
            closingSubscription.unsubscribe();
        }
        const /** @type {?} */ buffer = this.buffer;
        if (this.buffer) {
            this.destination.next(buffer);
        }
        this.buffer = [];
        const /** @type {?} */ closingNotifier = tryCatch(this.closingSelector)();
        if (closingNotifier === errorObject) {
            this.error(errorObject.e);
        }
        else {
            closingSubscription = new Subscription();
            this.closingSubscription = closingSubscription;
            this.add(closingSubscription);
            this.subscribing = true;
            closingSubscription.add(subscribeToResult(this, closingNotifier));
            this.subscribing = false;
        }
    }
}
function BufferWhenSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    BufferWhenSubscriber.prototype.buffer;
    /** @type {?} */
    BufferWhenSubscriber.prototype.subscribing;
    /** @type {?} */
    BufferWhenSubscriber.prototype.closingSubscription;
}
