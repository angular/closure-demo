import { Observable } from '../Observable';
import { tryCatch } from '../util/tryCatch';
import { isFunction } from '../util/isFunction';
import { errorObject } from '../util/errorObject';
import { Subscription } from '../Subscription';
const /** @type {?} */ toString = Object.prototype.toString;
/**
 * @param {?} sourceObj
 * @return {?}
 */
function isNodeStyleEventEmmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}
/**
 * @param {?} sourceObj
 * @return {?}
 */
function isJQueryStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}
/**
 * @param {?} sourceObj
 * @return {?}
 */
function isNodeList(sourceObj) {
    return !!sourceObj && toString.call(sourceObj) === '[object NodeList]';
}
/**
 * @param {?} sourceObj
 * @return {?}
 */
function isHTMLCollection(sourceObj) {
    return !!sourceObj && toString.call(sourceObj) === '[object HTMLCollection]';
}
/**
 * @param {?} sourceObj
 * @return {?}
 */
function isEventTarget(sourceObj) {
    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class FromEventObservable extends Observable {
    /**
     * @param {?} sourceObj
     * @param {?} eventName
     * @param {?=} selector
     * @param {?=} options
     */
    constructor(sourceObj, eventName, selector, options) {
        super();
        this.sourceObj = sourceObj;
        this.eventName = eventName;
        this.selector = selector;
        this.options = options;
    }
    /**
     * Creates an Observable that emits events of a specific type coming from the
     * given event target.
     *
     * <span class="informal">Creates an Observable from DOM events, or Node
     * EventEmitter events or others.</span>
     *
     * <img src="./img/fromEvent.png" width="100%">
     *
     * Creates an Observable by attaching an event listener to an "event target",
     * which may be an object with `addEventListener` and `removeEventListener`,
     * a Node.js EventEmitter, a jQuery style EventEmitter, a NodeList from the
     * DOM, or an HTMLCollection from the DOM. The event handler is attached when
     * the output Observable is subscribed, and removed when the Subscription is
     * unsubscribed.
     *
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * clicks.subscribe(x => console.log(x));
     *
     * // Results in:
     * // MouseEvent object logged to console everytime a click
     * // occurs on the document.
     *
     * @see {\@link from}
     * @see {\@link fromEventPattern}
     *
     * EventEmitter, NodeList or HTMLCollection to attach the event handler to.
     * `target`.
     * post-process results. It takes the arguments from the event handler and
     * should return a single value.
     * @owner Observable
     * @param {?} target
     * @param {?} eventName
     * @param {?=} options
     * @param {?=} selector
     * @return {?}
     */
    static create(target, eventName, options, selector) {
        if (isFunction(options)) {
            selector = (options);
            options = undefined;
        }
        return new FromEventObservable(target, eventName, selector, options);
    }
    /**
     * @param {?} sourceObj
     * @param {?} eventName
     * @param {?} handler
     * @param {?} subscriber
     * @param {?=} options
     * @return {?}
     */
    static setupSubscription(sourceObj, eventName, handler, subscriber, options) {
        let /** @type {?} */ unsubscribe;
        if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
            for (let /** @type {?} */ i = 0, /** @type {?} */ len = sourceObj.length; i < len; i++) {
                FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
            }
        }
        else if (isEventTarget(sourceObj)) {
            const /** @type {?} */ source = sourceObj;
            sourceObj.addEventListener(eventName, /** @type {?} */ (handler), /** @type {?} */ (options));
            unsubscribe = () => source.removeEventListener(eventName, /** @type {?} */ (handler));
        }
        else if (isJQueryStyleEventEmitter(sourceObj)) {
            const /** @type {?} */ source = sourceObj;
            sourceObj.on(eventName, handler);
            unsubscribe = () => source.off(eventName, handler);
        }
        else if (isNodeStyleEventEmmitter(sourceObj)) {
            const /** @type {?} */ source = sourceObj;
            sourceObj.addListener(eventName, handler);
            unsubscribe = () => source.removeListener(eventName, handler);
        }
        else {
            throw new TypeError('Invalid event target');
        }
        subscriber.add(new Subscription(unsubscribe));
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ sourceObj = this.sourceObj;
        const /** @type {?} */ eventName = this.eventName;
        const /** @type {?} */ options = this.options;
        const /** @type {?} */ selector = this.selector;
        let /** @type {?} */ handler = selector ? (...args) => {
            let /** @type {?} */ result = tryCatch(selector)(...args);
            if (result === errorObject) {
                subscriber.error(errorObject.e);
            }
            else {
                subscriber.next(result);
            }
        } : (e) => subscriber.next(e);
        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);
    }
}
