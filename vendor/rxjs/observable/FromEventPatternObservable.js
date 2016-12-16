import { Observable } from '../Observable';
import { Subscription } from '../Subscription';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class FromEventPatternObservable extends Observable {
    /**
     * @param {?} addHandler
     * @param {?} removeHandler
     * @param {?=} selector
     */
    constructor(addHandler, removeHandler, selector) {
        super();
        this.addHandler = addHandler;
        this.removeHandler = removeHandler;
        this.selector = selector;
    }
    /**
     * Creates an Observable from an API based on addHandler/removeHandler
     * functions.
     *
     * <span class="informal">Converts any addHandler/removeHandler API to an
     * Observable.</span>
     *
     * <img src="./img/fromEventPattern.png" width="100%">
     *
     * Creates an Observable by using the `addHandler` and `removeHandler`
     * functions to add and remove the handlers, with an optional selector
     * function to project the event arguments to a result. The `addHandler` is
     * called when the output Observable is subscribed, and `removeHandler` is
     * called when the Subscription is unsubscribed.
     *
     * function addClickHandler(handler) {
     *   document.addEventListener('click', handler);
     * }
     *
     * function removeClickHandler(handler) {
     *   document.removeEventListener('click', handler);
     * }
     *
     * var clicks = Rx.Observable.fromEventPattern(
     *   addClickHandler,
     *   removeClickHandler
     * );
     * clicks.subscribe(x => console.log(x));
     *
     * @see {\@link from}
     * @see {\@link fromEvent}
     *
     * a `handler` function as argument and attaches it somehow to the actual
     * source of events.
     * takes a `handler` function as argument and removes it in case it was
     * previously attached using `addHandler`.
     * post-process results. It takes the arguments from the event handler and
     * should return a single value.
     * @owner Observable
     * @param {?} addHandler
     * @param {?} removeHandler
     * @param {?=} selector
     * @return {?}
     */
    static create(addHandler, removeHandler, selector) {
        return new FromEventPatternObservable(addHandler, removeHandler, selector);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ removeHandler = this.removeHandler;
        const /** @type {?} */ handler = !!this.selector ? (...args) => {
            this._callSelector(subscriber, args);
        } : function (e) { subscriber.next(e); };
        this._callAddHandler(handler, subscriber);
        subscriber.add(new Subscription(() => {
            //TODO: determine whether or not to forward to error handler
            removeHandler(handler);
        }));
    }
    /**
     * @param {?} subscriber
     * @param {?} args
     * @return {?}
     */
    _callSelector(subscriber, args) {
        try {
            const /** @type {?} */ result = this.selector(...args);
            subscriber.next(result);
        }
        catch (e) {
            subscriber.error(e);
        }
    }
    /**
     * @param {?} handler
     * @param {?} errorSubscriber
     * @return {?}
     */
    _callAddHandler(handler, errorSubscriber) {
        try {
            this.addHandler(handler);
        }
        catch (e) {
            errorSubscriber.error(e);
        }
    }
}
