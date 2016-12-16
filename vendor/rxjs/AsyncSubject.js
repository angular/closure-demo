import { Subject } from './Subject';
import { Subscription } from './Subscription';
export class AsyncSubject extends Subject {
    constructor() {
        super(...arguments);
        this.value = null;
        this.hasNext = false;
        this.hasCompleted = false;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        if (this.hasCompleted && this.hasNext) {
            subscriber.next(this.value);
            subscriber.complete();
            return Subscription.EMPTY;
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription.EMPTY;
        }
        return super._subscribe(subscriber);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    next(value) {
        if (!this.hasCompleted) {
            this.value = value;
            this.hasNext = true;
        }
    }
    /**
     * @return {?}
     */
    complete() {
        this.hasCompleted = true;
        if (this.hasNext) {
            super.next(this.value);
        }
        super.complete();
    }
}
function AsyncSubject_tsickle_Closure_declarations() {
    /** @type {?} */
    AsyncSubject.prototype.value;
    /** @type {?} */
    AsyncSubject.prototype.hasNext;
    /** @type {?} */
    AsyncSubject.prototype.hasCompleted;
}
