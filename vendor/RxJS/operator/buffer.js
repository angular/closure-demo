goog.module('rxjs$operator$buffer');
var OuterSubscriber_1 = goog.require('rxjs$OuterSubscriber');
var subscribeToResult_1 = goog.require('rxjs$util$subscribeToResult');
/**
 *  Buffers the source Observable values until `closingNotifier` emits. * <span class="informal">Collects values from the past as an array, and emits that array only when another Observable emits.</span> * <img src="./img/buffer.png" width="100%"> * Buffers the incoming Observable values until the given `closingNotifier` Observable emits a value, at which point it emits the buffer on the output Observable and starts a new buffer internally, awaiting the next time `closingNotifier` emits. *
 * @example <caption>On every click, emit array of most recent interval events</caption> var clicks = Rx.Observable.fromEvent(document, 'click'); var interval = Rx.Observable.interval(1000); var buffered = interval.buffer(clicks); buffered.subscribe(x => console.log(x)); *
 * @see {@link bufferCount}
 * @see {@link bufferTime}
 * @see {@link bufferToggle}
 * @see {@link bufferWhen}
 * @see {@link window} * buffer to be emitted on the output Observable. values.
 * @method buffer
 * @owner Observable
 * @param {?} closingNotifier
 * @return {?}
 */
function buffer(closingNotifier) {
    return this.lift(new BufferOperator(closingNotifier));
}
exports.buffer = buffer;
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
        return source._subscribe(new BufferSubscriber(subscriber, this.closingNotifier));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BufferOperator.prototype.closingNotifier;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class BufferSubscriber extends OuterSubscriber_1.OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} closingNotifier
     */
    constructor(destination, closingNotifier) {
        super(destination);
        this.buffer = [];
        this.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
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
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BufferSubscriber.prototype.buffer;
    }
}
