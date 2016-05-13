goog.module('rxjs$AsyncSubject');
var Subject_1 = goog.require('rxjs$Subject');
/**
 * @class AsyncSubject<T>
 */
class AsyncSubject extends Subject_1.Subject {
    constructor(...args) {
        super(...args);
        this.value = null;
        this.hasNext = false;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        if (this.hasCompleted && this.hasNext) {
            subscriber.next(this.value);
        }
        return super._subscribe(subscriber);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.value = value;
        this.hasNext = true;
    }
    /**
     * @return {?}
     */
    _complete() {
        let /** @type {?} */ index = -1;
        const /** @type {?} */ observers = this.observers;
        const /** @type {?} */ len = observers.length;
        // optimization to block our SubjectSubscriptions from
        // splicing themselves out of the observers list one by one.
        this.isUnsubscribed = true;
        if (this.hasNext) {
            while (++index < len) {
                let /** @type {?} */ o = observers[index];
                o.next(this.value);
                o.complete();
            }
        }
        else {
            while (++index < len) {
                observers[index].complete();
            }
        }
        this.isUnsubscribed = false;
        this.unsubscribe();
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        AsyncSubject.prototype.value;
        /** @type {?} */
        AsyncSubject.prototype.hasNext;
    }
}
exports.AsyncSubject = AsyncSubject;
