import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Buffers the source Observable values until `closingNotifier` emits.
 *
 * <span class="informal">Collects values from the past as an array, and emits
 * that array only when another Observable emits.</span>
 *
 * <img src="./img/buffer.png" width="100%">
 *
 * Buffers the incoming Observable values until the given `closingNotifier`
 * Observable emits a value, at which point it emits the buffer on the output
 * Observable and starts a new buffer internally, awaiting the next time
 * `closingNotifier` emits.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var interval = Rx.Observable.interval(1000);
 * var buffered = interval.buffer(clicks);
 * buffered.subscribe(x => console.log(x));
 *
 * @see {\@link bufferCount}
 * @see {\@link bufferTime}
 * @see {\@link bufferToggle}
 * @see {\@link bufferWhen}
 * @see {\@link window}
 *
 * buffer to be emitted on the output Observable.
 * values.
 * @owner Observable
 * @this {?}
 * @param {?} closingNotifier
 * @return {?}
 */
export function buffer(closingNotifier) {
    return this.lift(new BufferOperator(closingNotifier));
}
class BufferOperator {
    /**
     * @param {?} closingNotifier
     */
    constructor(closingNotifier) {
        this.closingNotifier = closingNotifier;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new BufferSubscriber(subscriber, this.closingNotifier));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class BufferSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} closingNotifier
     */
    constructor(destination, closingNotifier) {
        super(destination);
        this.buffer = [];
        this.add(subscribeToResult(this, closingNotifier));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.buffer.push(value);
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
        const /** @type {?} */ buffer = this.buffer;
        this.buffer = [];
        this.destination.next(buffer);
    }
}
function BufferSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    BufferSubscriber.prototype.buffer;
}
