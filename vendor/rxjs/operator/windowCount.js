import { Subscriber } from '../Subscriber';
import { Subject } from '../Subject';
/**
 * Branch out the source Observable values as a nested Observable with each
 * nested Observable emitting at most `windowSize` values.
 *
 * <span class="informal">It's like {\@link bufferCount}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowCount.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable emits windows every `startWindowEvery`
 * items, each containing no more than `windowSize` items. When the source
 * Observable completes or encounters an error, the output Observable emits
 * the current window and propagates the notification from the source
 * Observable. If `startWindowEvery` is not provided, then new windows are
 * started immediately at the start of the source and when each window completes
 * with size `windowSize`.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowCount(3)
 *   .map(win => win.skip(1)) // skip first of every 3 clicks
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowCount(2, 3)
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link window}
 * @see {\@link windowTime}
 * @see {\@link windowToggle}
 * @see {\@link windowWhen}
 * @see {\@link bufferCount}
 *
 * window.
 * For example if `startWindowEvery` is `2`, then a new window will be started
 * on every other value from the source. A new window is started at the
 * beginning of the source by default.
 * are Observable of values.
 * @owner Observable
 * @this {?}
 * @param {?} windowSize
 * @param {?=} startWindowEvery
 * @return {?}
 */
export function windowCount(windowSize, startWindowEvery = 0) {
    return this.lift(new WindowCountOperator(windowSize, startWindowEvery));
}
class WindowCountOperator {
    /**
     * @param {?} windowSize
     * @param {?} startWindowEvery
     */
    constructor(windowSize, startWindowEvery) {
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class WindowCountSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} windowSize
     * @param {?} startWindowEvery
     */
    constructor(destination, windowSize, startWindowEvery) {
        super(destination);
        this.destination = destination;
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
        this.windows = [new Subject()];
        this.count = 0;
        destination.next(this.windows[0]);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ startWindowEvery = (this.startWindowEvery > 0) ? this.startWindowEvery : this.windowSize;
        const /** @type {?} */ destination = this.destination;
        const /** @type {?} */ windowSize = this.windowSize;
        const /** @type {?} */ windows = this.windows;
        const /** @type {?} */ len = windows.length;
        for (let /** @type {?} */ i = 0; i < len && !this.closed; i++) {
            windows[i].next(value);
        }
        const /** @type {?} */ c = this.count - windowSize + 1;
        if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
            windows.shift().complete();
        }
        if (++this.count % startWindowEvery === 0 && !this.closed) {
            const /** @type {?} */ window = new Subject();
            windows.push(window);
            destination.next(window);
        }
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        const /** @type {?} */ windows = this.windows;
        if (windows) {
            while (windows.length > 0 && !this.closed) {
                windows.shift().error(err);
            }
        }
        this.destination.error(err);
    }
    /**
     * @return {?}
     */
    _complete() {
        const /** @type {?} */ windows = this.windows;
        if (windows) {
            while (windows.length > 0 && !this.closed) {
                windows.shift().complete();
            }
        }
        this.destination.complete();
    }
    /**
     * @return {?}
     */
    _unsubscribe() {
        this.count = 0;
        this.windows = null;
    }
}
function WindowCountSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    WindowCountSubscriber.prototype.windows;
    /** @type {?} */
    WindowCountSubscriber.prototype.count;
}
