goog.module('rxjs$operator$ignoreElements');
var Subscriber_1 = goog.require('rxjs$Subscriber');
var noop_1 = goog.require('rxjs$util$noop');
/**
 *  Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`. * <img src="./img/ignoreElements.png" width="100%"> * or `error`, based on which one is called by the source Observable.
 * @method ignoreElements
 * @owner Observable
 * @return {?}
 */
function ignoreElements() {
    return this.lift(new IgnoreElementsOperator());
}
exports.ignoreElements = ignoreElements;
;
class IgnoreElementsOperator {
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new IgnoreElementsSubscriber(subscriber));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class IgnoreElementsSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} unused
     * @return {?}
     */
    _next(unused) {
        noop_1.noop();
    }
}
