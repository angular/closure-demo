goog.module('rxjs$operator$takeUntil');
var OuterSubscriber_1 = goog.require('rxjs$OuterSubscriber');
var subscribeToResult_1 = goog.require('rxjs$util$subscribeToResult');
/**
 * @method takeUntil
 * @owner Observable
 * @param {?} notifier
 * @return {?}
 */
function takeUntil(notifier) {
    return this.lift(new TakeUntilOperator(notifier));
}
exports.takeUntil = takeUntil;
class TakeUntilOperator {
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
        return source._subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TakeUntilOperator.prototype.notifier;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class TakeUntilSubscriber extends OuterSubscriber_1.OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} notifier
     */
    constructor(destination, notifier) {
        super(destination);
        this.notifier = notifier;
        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
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
        this.complete();
    }
    /**
     * @return {?}
     */
    notifyComplete() {
        // noop
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TakeUntilSubscriber.prototype.notifier;
    }
}
