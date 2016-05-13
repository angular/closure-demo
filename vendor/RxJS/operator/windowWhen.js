goog.module('rxjs$operator$windowWhen');
var Subject_1 = goog.require('rxjs$Subject');
var tryCatch_1 = goog.require('rxjs$util$tryCatch');
var errorObject_1 = goog.require('rxjs$util$errorObject');
var OuterSubscriber_1 = goog.require('rxjs$OuterSubscriber');
var subscribeToResult_1 = goog.require('rxjs$util$subscribeToResult');
/**
 *  Branch out the source Observable values as a nested Observable using a factory function of closing Observables to determine when to start a new window. * <span class="informal">It's like {@link bufferWhen}, but emits a nested Observable instead of an array.</span> * <img src="./img/windowWhen.png" width="100%"> * Returns an Observable that emits windows of items it collects from the source Observable. The output Observable emits connected, non-overlapping windows. It emits the current window and opens a new one whenever the Observable produced by the specified `closingSelector` function emits an item. The first window is opened immediately when subscribing to the output Observable. *
 * @example <caption>Emit only the first two clicks events in every window of [1-5] random seconds</caption> var clicks = Rx.Observable.fromEvent(document, 'click'); var result = clicks .windowWhen(() => Rx.Observable.interval(1000 + Math.random() * 4000)) .map(win => win.take(2)) // each window has at most 2 emissions .mergeAll(); // flatten the Observable-of-Observables result.subscribe(x => console.log(x)); *
 * @see {@link window}
 * @see {@link windowCount}
 * @see {@link windowTime}
 * @see {@link windowToggle}
 * @see {@link bufferWhen} * arguments and returns an Observable that signals (on either `next` or `complete`) when to close the previous window and start a new one. are Observables.
 * @method windowWhen
 * @owner Observable
 * @param {?} closingSelector
 * @return {?}
 */
function windowWhen(closingSelector) {
    return this.lift(new WindowOperator(closingSelector));
}
exports.windowWhen = windowWhen;
class WindowOperator {
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
        return source._subscribe(new WindowSubscriber(subscriber, this.closingSelector));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        WindowOperator.prototype.closingSelector;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class WindowSubscriber extends OuterSubscriber_1.OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} closingSelector
     */
    constructor(destination, closingSelector) {
        super(destination);
        this.destination = destination;
        this.closingSelector = closingSelector;
        this.openWindow();
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
        this.openWindow(innerSub);
    }
    /**
     * @param {?} error
     * @param {?} innerSub
     * @return {?}
     */
    notifyError(error, innerSub) {
        this._error(error);
    }
    /**
     * @param {?} innerSub
     * @return {?}
     */
    notifyComplete(innerSub) {
        this.openWindow(innerSub);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.window.next(value);
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        this.window.error(err);
        this.destination.error(err);
        this.unsubscribeClosingNotification();
    }
    /**
     * @return {?}
     */
    _complete() {
        this.window.complete();
        this.destination.complete();
        this.unsubscribeClosingNotification();
    }
    /**
     * @return {?}
     */
    unsubscribeClosingNotification() {
        if (this.closingNotification) {
            this.closingNotification.unsubscribe();
        }
    }
    /**
     * @param {?=} innerSub
     * @return {?}
     */
    openWindow(innerSub = null) {
        if (innerSub) {
            this.remove(innerSub);
            innerSub.unsubscribe();
        }
        const /** @type {?} */ prevWindow = this.window;
        if (prevWindow) {
            prevWindow.complete();
        }
        const /** @type {?} */ window = this.window = new Subject_1.Subject();
        this.destination.next(window);
        const /** @type {?} */ closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
        if (closingNotifier === errorObject_1.errorObject) {
            const /** @type {?} */ err = errorObject_1.errorObject.e;
            this.destination.error(err);
            this.window.error(err);
        }
        else {
            this.add(this.closingNotification = subscribeToResult_1.subscribeToResult(this, closingNotifier));
            this.add(window);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        WindowSubscriber.prototype.window;
        /** @type {?} */
        WindowSubscriber.prototype.closingNotification;
        /** @type {?} */
        WindowSubscriber.prototype.destination;
        /** @type {?} */
        WindowSubscriber.prototype.closingSelector;
    }
}
