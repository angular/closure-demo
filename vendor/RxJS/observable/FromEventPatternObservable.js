goog.module('rxjs$observable$FromEventPatternObservable');
var Observable_1 = goog.require('rxjs$Observable');
var Subscription_1 = goog.require('rxjs$Subscription');
var tryCatch_1 = goog.require('rxjs$util$tryCatch');
var errorObject_1 = goog.require('rxjs$util$errorObject');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
class FromEventPatternObservable extends Observable_1.Observable {
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
     * @static true
     * @name fromEventPattern
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
        const /** @type {?} */ addHandler = this.addHandler;
        const /** @type {?} */ removeHandler = this.removeHandler;
        const /** @type {?} */ selector = this.selector;
        const /** @type {?} */ handler = selector ? function (e) {
            let /** @type {?} */ result = tryCatch_1.tryCatch(selector).apply(null, arguments);
            if (result === errorObject_1.errorObject) {
                subscriber.error(result.e);
            }
            else {
                subscriber.next(result);
            }
        } : function (e) { subscriber.next(e); };
        let /** @type {?} */ result = tryCatch_1.tryCatch(addHandler)(handler);
        if (result === errorObject_1.errorObject) {
            subscriber.error(result.e);
        }
        subscriber.add(new Subscription_1.Subscription(() => {
            //TODO: determine whether or not to forward to error handler
            removeHandler(handler);
        }));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        FromEventPatternObservable.prototype.addHandler;
        /** @type {?} */
        FromEventPatternObservable.prototype.removeHandler;
        /** @type {?} */
        FromEventPatternObservable.prototype.selector;
    }
}
exports.FromEventPatternObservable = FromEventPatternObservable;
