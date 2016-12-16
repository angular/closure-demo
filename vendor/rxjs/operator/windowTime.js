import { Subject } from '../Subject';
import { async } from '../scheduler/async';
import { Subscriber } from '../Subscriber';
/**
 * Branch out the source Observable values as a nested Observable periodically
 * in time.
 *
 * <span class="informal">It's like {\@link bufferTime}, but emits a nested
 * Observable instead of an array.</span>
 *
 * <img src="./img/windowTime.png" width="100%">
 *
 * Returns an Observable that emits windows of items it collects from the source
 * Observable. The output Observable starts a new window periodically, as
 * determined by the `windowCreationInterval` argument. It emits each window
 * after a fixed timespan, specified by the `windowTimeSpan` argument. When the
 * source Observable completes or encounters an error, the output Observable
 * emits the current window and propagates the notification from the source
 * Observable. If `windowCreationInterval` is not provided, the output
 * Observable starts a new window when the previous window of duration
 * `windowTimeSpan` completes.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowTime(1000)
 *   .map(win => win.take(2)) // each window has at most 2 emissions
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.windowTime(1000, 5000)
 *   .map(win => win.take(2)) // each window has at most 2 emissions
 *   .mergeAll(); // flatten the Observable-of-Observables
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link window}
 * @see {\@link windowCount}
 * @see {\@link windowToggle}
 * @see {\@link windowWhen}
 * @see {\@link bufferTime}
 *
 * windows.
 * intervals that determine window boundaries.
 * are Observables.
 * @owner Observable
 * @this {?}
 * @param {?} windowTimeSpan
 * @param {?=} windowCreationInterval
 * @param {?=} scheduler
 * @return {?}
 */
export function windowTime(windowTimeSpan, windowCreationInterval = null, scheduler = async) {
    return this.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler));
}
class WindowTimeOperator {
    /**
     * @param {?} windowTimeSpan
     * @param {?} windowCreationInterval
     * @param {?} scheduler
     */
    constructor(windowTimeSpan, windowCreationInterval, scheduler) {
        this.windowTimeSpan = windowTimeSpan;
        this.windowCreationInterval = windowCreationInterval;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.scheduler));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class WindowTimeSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} windowTimeSpan
     * @param {?} windowCreationInterval
     * @param {?} scheduler
     */
    constructor(destination, windowTimeSpan, windowCreationInterval, scheduler) {
        super(destination);
        this.destination = destination;
        this.windowTimeSpan = windowTimeSpan;
        this.windowCreationInterval = windowCreationInterval;
        this.scheduler = scheduler;
        this.windows = [];
        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
            let window = this.openWindow();
            const closeState = { subscriber: this, window, context: null };
            const creationState = { windowTimeSpan, windowCreationInterval, subscriber: this, scheduler };
            this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
            this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
        }
        else {
            let window = this.openWindow();
            const timeSpanOnlyState = { subscriber: this, window, windowTimeSpan };
            this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ windows = this.windows;
        const /** @type {?} */ len = windows.length;
        for (let /** @type {?} */ i = 0; i < len; i++) {
            const /** @type {?} */ window = windows[i];
            if (!window.closed) {
                window.next(value);
            }
        }
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        const /** @type {?} */ windows = this.windows;
        while (windows.length > 0) {
            windows.shift().error(err);
        }
        this.destination.error(err);
    }
    /**
     * @return {?}
     */
    _complete() {
        const /** @type {?} */ windows = this.windows;
        while (windows.length > 0) {
            const /** @type {?} */ window = windows.shift();
            if (!window.closed) {
                window.complete();
            }
        }
        this.destination.complete();
    }
    /**
     * @return {?}
     */
    openWindow() {
        const /** @type {?} */ window = new Subject();
        this.windows.push(window);
        const /** @type {?} */ destination = this.destination;
        destination.next(window);
        return window;
    }
    /**
     * @param {?} window
     * @return {?}
     */
    closeWindow(window) {
        window.complete();
        const /** @type {?} */ windows = this.windows;
        windows.splice(windows.indexOf(window), 1);
    }
}
function WindowTimeSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    WindowTimeSubscriber.prototype.windows;
}
/**
 * @this {?}
 * @param {?} state
 * @return {?}
 */
function dispatchWindowTimeSpanOnly(state) {
    const { subscriber, windowTimeSpan, window } = state;
    if (window) {
        window.complete();
    }
    state.window = subscriber.openWindow();
    this.schedule(state, windowTimeSpan);
}
/**
 * @this {?}
 * @param {?} state
 * @return {?}
 */
function dispatchWindowCreation(state) {
    let { windowTimeSpan, subscriber, scheduler, windowCreationInterval } = state;
    let /** @type {?} */ window = subscriber.openWindow();
    let /** @type {?} */ action = this;
    let /** @type {?} */ context = { action, subscription: /** @type {?} */ (null) };
    const /** @type {?} */ timeSpanState = { subscriber, window, context };
    context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
    action.add(context.subscription);
    action.schedule(state, windowCreationInterval);
}
/**
 * @param {?} arg
 * @return {?}
 */
function dispatchWindowClose(arg) {
    const { subscriber, window, context } = arg;
    if (context && context.action && context.subscription) {
        context.action.remove(context.subscription);
    }
    subscriber.closeWindow(window);
}
