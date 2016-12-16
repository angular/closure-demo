import { Subject } from '../Subject';
import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Branch out the source Observable values as a nested Observable whenever
 * `windowBoundaries` emits.
 *
 * <span class="informal">It's like {\@link buffer}, but emits a nested Observable
 * instead of an array.</span>
 *
 * <img src="./img/window.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits connected, non-overlapping
 * windows. It emits the current window and opens a new one whenever the
 * Observable `windowBoundaries` emits an item. Because each window is an
 * Observable, the output is a higher-order Observable.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var interval = Rx.Observable.interval(1000);
 * var result = clicks.window(interval)
 *   .map(win => win.take(2)) // each window has at most 2 emissions
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link windowCount}
 * @see {\@link windowTime}
 * @see {\@link windowToggle}
 * @see {\@link windowWhen}
 * @see {\@link buffer}
 *
 * previous window and starts a new window.
 * Observables emitting values of the source Observable.
 * @owner Observable
 * @this {?}
 * @param {?} windowBoundaries
 * @return {?}
 */
export function window(windowBoundaries) {
    return this.lift(new WindowOperator(windowBoundaries));
}
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
        const /** @type {?} */ windowSubscriber = new WindowSubscriber(subscriber);
        const /** @type {?} */ sourceSubscription = source.subscribe(windowSubscriber);
        if (!sourceSubscription.closed) {
            windowSubscriber.add(subscribeToResult(windowSubscriber, this.windowBoundaries));
        }
        return sourceSubscription;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class WindowSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     */
    constructor(destination) {
        super(destination);
        this.window = new Subject();
        destination.next(this.window);
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
    _unsubscribe() {
        this.window = null;
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
        const /** @type {?} */ newWindow = this.window = new Subject();
        destination.next(newWindow);
    }
}
function WindowSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    WindowSubscriber.prototype.window;
}
