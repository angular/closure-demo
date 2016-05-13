goog.module('rxjs$operator$windowCount');
var Subscriber_1 = goog.require('rxjs$Subscriber');
var Subject_1 = goog.require('rxjs$Subject');
/**
 *  Branch out the source Observable values as a nested Observable with each nested Observable emitting at most `windowSize` values. * <span class="informal">It's like {@link bufferCount}, but emits a nested Observable instead of an array.</span> * <img src="./img/windowCount.png" width="100%"> * Returns an Observable that emits windows of items it collects from the source Observable. The output Observable emits windows every `startWindowEvery` items, each containing no more than `windowSize` items. When the source Observable completes or encounters an error, the output Observable emits the current window and propagates the notification from the source Observable. If `startWindowEvery` is not provided, then new windows are started immediately at the start of the source and when each window completes with size `windowSize`. *
 * @example <caption>Ignore every 3rd click event, starting from the first one</caption> var clicks = Rx.Observable.fromEvent(document, 'click'); var result = clicks.windowCount(3) .map(win => win.skip(1)) // skip first of every 3 clicks .mergeAll(); // flatten the Observable-of-Observables result.subscribe(x => console.log(x)); *
 * @example <caption>Ignore every 3rd click event, starting from the third one</caption> var clicks = Rx.Observable.fromEvent(document, 'click'); var result = clicks.windowCount(2, 3) .mergeAll(); // flatten the Observable-of-Observables result.subscribe(x => console.log(x)); *
 * @see {@link window}
 * @see {@link windowTime}
 * @see {@link windowToggle}
 * @see {@link windowWhen}
 * @see {@link bufferCount} * window. For example if `startWindowEvery` is `2`, then a new window will be started on every other value from the source. A new window is started at the beginning of the source by default. are Observable of values.
 * @method windowCount
 * @owner Observable
 * @param {?} windowSize
 * @param {?=} startWindowEvery
 * @return {?}
 */
function windowCount(windowSize, startWindowEvery = 0) {
    return this.lift(new WindowCountOperator(windowSize, startWindowEvery));
}
exports.windowCount = windowCount;
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
        return source._subscribe(new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        WindowCountOperator.prototype.windowSize;
        /** @type {?} */
        WindowCountOperator.prototype.startWindowEvery;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class WindowCountSubscriber extends Subscriber_1.Subscriber {
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
        this.windows = [new Subject_1.Subject()];
        this.count = 0;
        const firstWindow = this.windows[0];
        destination.add(firstWindow);
        destination.next(firstWindow);
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
        for (let /** @type {?} */ i = 0; i < len; i++) {
            windows[i].next(value);
        }
        const /** @type {?} */ c = this.count - windowSize + 1;
        if (c >= 0 && c % startWindowEvery === 0) {
            windows.shift().complete();
        }
        if (++this.count % startWindowEvery === 0) {
            const /** @type {?} */ window = new Subject_1.Subject();
            windows.push(window);
            destination.add(window);
            destination.next(window);
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
            windows.shift().complete();
        }
        this.destination.complete();
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        WindowCountSubscriber.prototype.windows;
        /** @type {?} */
        WindowCountSubscriber.prototype.count;
        /** @type {?} */
        WindowCountSubscriber.prototype.destination;
        /** @type {?} */
        WindowCountSubscriber.prototype.windowSize;
        /** @type {?} */
        WindowCountSubscriber.prototype.startWindowEvery;
    }
}
