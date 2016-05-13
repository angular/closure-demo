goog.module('rxjs$InnerSubscriber');
var Subscriber_1 = goog.require('rxjs$Subscriber');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class InnerSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} parent
     * @param {?} outerValue
     * @param {?} outerIndex
     */
    constructor(parent, outerValue, outerIndex) {
        super();
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    _error(error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    }
    /**
     * @return {?}
     */
    _complete() {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        InnerSubscriber.prototype.index;
        /** @type {?} */
        InnerSubscriber.prototype.parent;
        /** @type {?} */
        InnerSubscriber.prototype.outerValue;
        /** @type {?} */
        InnerSubscriber.prototype.outerIndex;
    }
}
exports.InnerSubscriber = InnerSubscriber;
