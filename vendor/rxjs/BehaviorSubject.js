import { Subject } from './Subject';
import { ObjectUnsubscribedError } from './util/ObjectUnsubscribedError';
export class BehaviorSubject extends Subject {
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
    get value() {
        return this.getValue();
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ subscription = super._subscribe(subscriber);
        if (subscription && !((subscription)).closed) {
            subscriber.next(this._value);
        }
        return subscription;
    }
    /**
     * @return {?}
     */
    getValue() {
        if (this.hasError) {
            throw this.thrownError;
        }
        else if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else {
            return this._value;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    next(value) {
        super.next(this._value = value);
    }
}
