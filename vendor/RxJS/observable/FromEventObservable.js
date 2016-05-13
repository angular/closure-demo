goog.module('rxjs$observable$FromEventObservable');
var Observable_1 = goog.require('rxjs$Observable');
var tryCatch_1 = goog.require('rxjs$util$tryCatch');
var errorObject_1 = goog.require('rxjs$util$errorObject');
var Subscription_1 = goog.require('rxjs$Subscription');
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
    return !!sourceObj && sourceObj.toString() === '[object NodeList]';
}
/**
 * @param {?} sourceObj
 * @return {?}
 */
function isHTMLCollection(sourceObj) {
    return !!sourceObj && sourceObj.toString() === '[object HTMLCollection]';
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
 * @extends {Ignored}
 * @hide true
 */
class FromEventObservable extends Observable_1.Observable {
    /**
     * @param {?} sourceObj
     * @param {?} eventName
     * @param {?=} selector
     */
    constructor(sourceObj, eventName, selector) {
        super();
        this.sourceObj = sourceObj;
        this.eventName = eventName;
        this.selector = selector;
    }
    /**
     * @static true
     * @name fromEvent
     * @owner Observable
     * @param {?} sourceObj
     * @param {?} eventName
     * @param {?=} selector
     * @return {?}
     */
    static create(sourceObj, eventName, selector) {
        return new FromEventObservable(sourceObj, eventName, selector);
    }
    /**
     * @param {?} sourceObj
     * @param {?} eventName
     * @param {?} handler
     * @param {?} subscriber
     * @return {?}
     */
    static setupSubscription(sourceObj, eventName, handler, subscriber) {
        let /** @type {?} */ unsubscribe;
        if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
            for (let /** @type {?} */ i = 0, /** @type {?} */ len = sourceObj.length; i < len; i++) {
                FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber);
            }
        }
        else if (isEventTarget(sourceObj)) {
            const /** @type {?} */ source = sourceObj;
            sourceObj.addEventListener(eventName, /** @type {?} */ (handler));
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
        subscriber.add(new Subscription_1.Subscription(unsubscribe));
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ sourceObj = this.sourceObj;
        const /** @type {?} */ eventName = this.eventName;
        const /** @type {?} */ selector = this.selector;
        let /** @type {?} */ handler = selector ? (...args) => {
            let /** @type {?} */ result = tryCatch_1.tryCatch(selector)(...args);
            if (result === errorObject_1.errorObject) {
                subscriber.error(errorObject_1.errorObject.e);
            }
            else {
                subscriber.next(result);
            }
        } : (e) => subscriber.next(e);
        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        FromEventObservable.prototype.sourceObj;
        /** @type {?} */
        FromEventObservable.prototype.eventName;
        /** @type {?} */
        FromEventObservable.prototype.selector;
    }
}
exports.FromEventObservable = FromEventObservable;
