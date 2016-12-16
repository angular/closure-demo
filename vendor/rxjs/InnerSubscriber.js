import { Subscriber } from './Subscriber';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class InnerSubscriber extends Subscriber {
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
}
function InnerSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    InnerSubscriber.prototype.index;
}
