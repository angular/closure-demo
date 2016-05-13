goog.module('rxjs$operator$sample');
var OuterSubscriber_1 = goog.require('rxjs$OuterSubscriber');
var subscribeToResult_1 = goog.require('rxjs$util$subscribeToResult');
/**
 *  Returns an Observable that, when the specified sampler Observable emits an item or completes, it then emits the most recently emitted item (if any) emitted by the source Observable since the previous emission from the sampler Observable. * <img src="./img/sample.png" width="100%"> * whenever the sampler Observable emits an item or completes.
 * @method sample
 * @owner Observable
 * @param {?} notifier
 * @return {?}
 */
function sample(notifier) {
    return this.lift(new SampleOperator(notifier));
}
exports.sample = sample;
class SampleOperator {
    /**
     * @param {?} notifier
     */
    constructor(notifier) {
        this.notifier = notifier;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new SampleSubscriber(subscriber, this.notifier));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SampleOperator.prototype.notifier;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class SampleSubscriber extends OuterSubscriber_1.OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} notifier
     */
    constructor(destination, notifier) {
        super(destination);
        this.hasValue = false;
        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.value = value;
        this.hasValue = true;
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
        this.emitValue();
    }
    /**
     * @return {?}
     */
    notifyComplete() {
        this.emitValue();
    }
    /**
     * @return {?}
     */
    emitValue() {
        if (this.hasValue) {
            this.hasValue = false;
            this.destination.next(this.value);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SampleSubscriber.prototype.value;
        /** @type {?} */
        SampleSubscriber.prototype.hasValue;
    }
}
