goog.module('rxjs$operator$window');
var Subject_1 = goog.require('rxjs$Subject');
var OuterSubscriber_1 = goog.require('rxjs$OuterSubscriber');
var subscribeToResult_1 = goog.require('rxjs$util$subscribeToResult');
/**
 *  Branch out the source Observable values as a nested Observable whenever `windowBoundaries` emits. * <span class="informal">It's like {@link buffer}, but emits a nested Observable instead of an array.</span> * <img src="./img/window.png" width="100%"> * Returns an Observable that emits windows of items it collects from the source Observable. The output Observable emits connected, non-overlapping windows. It emits the current window and opens a new one whenever the Observable `windowBoundaries` emits an item. Because each window is an Observable, the output is a higher-order Observable. *
 * @example <caption>In every window of 1 second each, emit at most 2 click events</caption> var clicks = Rx.Observable.fromEvent(document, 'click'); var interval = Rx.Observable.interval(1000); var result = clicks.window(interval) .map(win => win.take(2)) // each window has at most 2 emissions .mergeAll(); // flatten the Observable-of-Observables result.subscribe(x => console.log(x)); *
 * @see {@link windowCount}
 * @see {@link windowTime}
 * @see {@link windowToggle}
 * @see {@link windowWhen}
 * @see {@link buffer} * previous window and starts a new window. Observables emitting values of the source Observable.
 * @method window
 * @owner Observable
 * @param {?} windowBoundaries
 * @return {?}
 */
function window(windowBoundaries) {
    return this.lift(new WindowOperator(windowBoundaries));
}
exports.window = window;
class WindowOperator {
    /**
     * @param {?} windowBoundaries
     */
    constructor(windowBoundaries) {
        this.windowBoundaries = windowBoundaries;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new WindowSubscriber(subscriber, this.windowBoundaries));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        WindowOperator.prototype.windowBoundaries;
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
     * @param {?} windowBoundaries
     */
    constructor(destination, windowBoundaries) {
        super(destination);
        this.destination = destination;
        this.windowBoundaries = windowBoundaries;
        this.add(subscribeToResult_1.subscribeToResult(this, windowBoundaries));
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
        this.openWindow();
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
        this._complete();
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
    }
    /**
     * @return {?}
     */
    _complete() {
        this.window.complete();
        this.destination.complete();
    }
    /**
     * @return {?}
     */
    openWindow() {
        const /** @type {?} */ prevWindow = this.window;
        if (prevWindow) {
            prevWindow.complete();
        }
        const /** @type {?} */ destination = this.destination;
        const /** @type {?} */ newWindow = this.window = new Subject_1.Subject();
        destination.add(newWindow);
        destination.next(newWindow);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        WindowSubscriber.prototype.window;
        /** @type {?} */
        WindowSubscriber.prototype.destination;
        /** @type {?} */
        WindowSubscriber.prototype.windowBoundaries;
    }
}
