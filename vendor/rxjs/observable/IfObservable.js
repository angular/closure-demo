import { Observable } from '../Observable';
import { subscribeToResult } from '../util/subscribeToResult';
import { OuterSubscriber } from '../OuterSubscriber';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class IfObservable extends Observable {
    /**
     * @param {?} condition
     * @param {?=} thenSource
     * @param {?=} elseSource
     */
    constructor(condition, thenSource, elseSource) {
        super();
        this.condition = condition;
        this.thenSource = thenSource;
        this.elseSource = elseSource;
    }
    /**
     * @param {?} condition
     * @param {?=} thenSource
     * @param {?=} elseSource
     * @return {?}
     */
    static create(condition, thenSource, elseSource) {
        return new IfObservable(condition, thenSource, elseSource);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const { condition, thenSource, elseSource } = this;
        return new IfSubscriber(subscriber, condition, thenSource, elseSource);
    }
}
class IfSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} condition
     * @param {?=} thenSource
     * @param {?=} elseSource
     */
    constructor(destination, condition, thenSource, elseSource) {
        super(destination);
        this.condition = condition;
        this.thenSource = thenSource;
        this.elseSource = elseSource;
        this.tryIf();
    }
    /**
     * @return {?}
     */
    tryIf() {
        const { condition, thenSource, elseSource } = this;
        let /** @type {?} */ result;
        try {
            result = (condition());
            const /** @type {?} */ source = result ? thenSource : elseSource;
            if (source) {
                this.add(subscribeToResult(this, source));
            }
            else {
                this._complete();
            }
        }
        catch (err) {
            this._error(err);
        }
    }
}
