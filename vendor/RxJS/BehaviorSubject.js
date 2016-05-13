goog.module('rxjs$BehaviorSubject');
var Subject_1 = goog.require('rxjs$Subject');
var throwError_1 = goog.require('rxjs$util$throwError');
var ObjectUnsubscribedError_1 = goog.require('rxjs$util$ObjectUnsubscribedError');
/**
 * @class BehaviorSubject<T>
 */
class BehaviorSubject extends Subject_1.Subject {
    /**
     * @param {?} _value
     */
    constructor(_value) {
        super();
        this._value = _value;
    }
    /**
     * @return {?}
     */
    getValue() {
        if (this.hasErrored) {
            throwError_1.throwError(this.errorValue);
        }
        else if (this.isUnsubscribed) {
            throwError_1.throwError(new ObjectUnsubscribedError_1.ObjectUnsubscribedError());
        }
        else {
            return this._value;
        }
    }
    get value() {
        return this.getValue();
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ subscription = super._subscribe(subscriber);
        if (subscription && !((subscription)).isUnsubscribed) {
            subscriber.next(this._value);
        }
        return subscription;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        super._next(this._value = value);
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        this.hasErrored = true;
        super._error(this.errorValue = err);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BehaviorSubject.prototype._value;
    }
}
exports.BehaviorSubject = BehaviorSubject;
