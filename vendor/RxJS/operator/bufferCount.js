goog.module('rxjs$operator$bufferCount');
var Subscriber_1 = goog.require('rxjs$Subscriber');
/**
 *  Buffers the source Observable values until the size hits the maximum `bufferSize` given. * <span class="informal">Collects values from the past as an array, and emits that array only when its size reaches `bufferSize`.</span> * <img src="./img/bufferCount.png" width="100%"> * Buffers a number of values from the source Observable by `bufferSize` then emits the buffer and clears it, and starts a new buffer each `startBufferEvery` values. If `startBufferEvery` is not provided or is `null`, then new buffers are started immediately at the start of the source and when each buffer closes and is emitted. *
 * @example <caption>Emit the last two click events as an array</caption> var clicks = Rx.Observable.fromEvent(document, 'click'); var buffered = clicks.bufferCount(2); buffered.subscribe(x => console.log(x)); *
 * @example <caption>On every click, emit the last two click events as an array</caption> var clicks = Rx.Observable.fromEvent(document, 'click'); var buffered = clicks.bufferCount(2, 1); buffered.subscribe(x => console.log(x)); *
 * @see {@link buffer}
 * @see {@link bufferTime}
 * @see {@link bufferToggle}
 * @see {@link bufferWhen}
 * @see {@link windowCount} * For example if `startBufferEvery` is `2`, then a new buffer will be started on every other value from the source. A new buffer is started at the beginning of the source by default.
 * @method bufferCount
 * @owner Observable
 * @param {?} bufferSize
 * @param {?=} startBufferEvery
 * @return {?}
 */
function bufferCount(bufferSize, startBufferEvery = null) {
    return this.lift(new BufferCountOperator(bufferSize, startBufferEvery));
}
exports.bufferCount = bufferCount;
class BufferCountOperator {
    /**
     * @param {?} bufferSize
     * @param {?} startBufferEvery
     */
    constructor(bufferSize, startBufferEvery) {
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new BufferCountSubscriber(subscriber, this.bufferSize, this.startBufferEvery));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BufferCountOperator.prototype.bufferSize;
        /** @type {?} */
        BufferCountOperator.prototype.startBufferEvery;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class BufferCountSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} bufferSize
     * @param {?} startBufferEvery
     */
    constructor(destination, bufferSize, startBufferEvery) {
        super(destination);
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
        this.buffers = [[]];
        this.count = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ count = (this.count += 1);
        const /** @type {?} */ destination = this.destination;
        const /** @type {?} */ bufferSize = this.bufferSize;
        const /** @type {?} */ startBufferEvery = (this.startBufferEvery == null) ? bufferSize : this.startBufferEvery;
        const /** @type {?} */ buffers = this.buffers;
        const /** @type {?} */ len = buffers.length;
        let /** @type {?} */ remove = -1;
        if (count % startBufferEvery === 0) {
            buffers.push([]);
        }
        for (let /** @type {?} */ i = 0; i < len; i++) {
            const /** @type {?} */ buffer = buffers[i];
            buffer.push(value);
            if (buffer.length === bufferSize) {
                remove = i;
                destination.next(buffer);
            }
        }
        if (remove !== -1) {
            buffers.splice(remove, 1);
        }
    }
    /**
     * @return {?}
     */
    _complete() {
        const /** @type {?} */ destination = this.destination;
        const /** @type {?} */ buffers = this.buffers;
        while (buffers.length > 0) {
            let /** @type {?} */ buffer = buffers.shift();
            if (buffer.length > 0) {
                destination.next(buffer);
            }
        }
        super._complete();
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BufferCountSubscriber.prototype.buffers;
        /** @type {?} */
        BufferCountSubscriber.prototype.count;
        /** @type {?} */
        BufferCountSubscriber.prototype.bufferSize;
        /** @type {?} */
        BufferCountSubscriber.prototype.startBufferEvery;
    }
}
