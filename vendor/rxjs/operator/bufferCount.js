import { Subscriber } from '../Subscriber';
/**
 * Buffers the source Observable values until the size hits the maximum
 * `bufferSize` given.
 *
 * <span class="informal">Collects values from the past as an array, and emits
 * that array only when its size reaches `bufferSize`.</span>
 *
 * <img src="./img/bufferCount.png" width="100%">
 *
 * Buffers a number of values from the source Observable by `bufferSize` then
 * emits the buffer and clears it, and starts a new buffer each
 * `startBufferEvery` values. If `startBufferEvery` is not provided or is
 * `null`, then new buffers are started immediately at the start of the source
 * and when each buffer closes and is emitted.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferCount(2);
 * buffered.subscribe(x => console.log(x));
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var buffered = clicks.bufferCount(2, 1);
 * buffered.subscribe(x => console.log(x));
 *
 * @see {\@link buffer}
 * @see {\@link bufferTime}
 * @see {\@link bufferToggle}
 * @see {\@link bufferWhen}
 * @see {\@link pairwise}
 * @see {\@link windowCount}
 *
 * For example if `startBufferEvery` is `2`, then a new buffer will be started
 * on every other value from the source. A new buffer is started at the
 * beginning of the source by default.
 * @owner Observable
 * @this {?}
 * @param {?} bufferSize
 * @param {?=} startBufferEvery
 * @return {?}
 */
export function bufferCount(bufferSize, startBufferEvery = null) {
    return this.lift(new BufferCountOperator(bufferSize, startBufferEvery));
}
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
        return source.subscribe(new BufferCountSubscriber(subscriber, this.bufferSize, this.startBufferEvery));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class BufferCountSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} bufferSize
     * @param {?} startBufferEvery
     */
    constructor(destination, bufferSize, startBufferEvery) {
        super(destination);
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
        this.buffers = [];
        this.count = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ count = this.count++;
        const { destination, bufferSize, startBufferEvery, buffers } = this;
        const /** @type {?} */ startOn = (startBufferEvery == null) ? bufferSize : startBufferEvery;
        if (count % startOn === 0) {
            buffers.push([]);
        }
        for (let /** @type {?} */ i = buffers.length; i--;) {
            const /** @type {?} */ buffer = buffers[i];
            buffer.push(value);
            if (buffer.length === bufferSize) {
                buffers.splice(i, 1);
                destination.next(buffer);
            }
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
}
function BufferCountSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    BufferCountSubscriber.prototype.buffers;
    /** @type {?} */
    BufferCountSubscriber.prototype.count;
}
