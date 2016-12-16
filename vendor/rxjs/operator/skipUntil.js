import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.
 *
 * <img src="./img/skipUntil.png" width="100%">
 *
 * be mirrored by the resulting Observable.
 * an item, then emits the remaining items.
 * @owner Observable
 * @this {?}
 * @param {?} notifier
 * @return {?}
 */
export function skipUntil(notifier) {
    return this.lift(new SkipUntilOperator(notifier));
}
class SkipUntilOperator {
    /**
     * @param {?} notifier
     */
    constructor(notifier) {
        this.notifier = notifier;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new SkipUntilSubscriber(subscriber, this.notifier));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class SkipUntilSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} notifier
     */
    constructor(destination, notifier) {
        super(destination);
        this.hasValue = false;
        this.isInnerStopped = false;
        this.add(subscribeToResult(this, notifier));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        if (this.hasValue) {
            super._next(value);
        }
    }
    /**
     * @return {?}
     */
    _complete() {
        if (this.isInnerStopped) {
            super._complete();
        }
        else {
            this.unsubscribe();
        }
    }
    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @param {?} innerSub
     * @return {?}
     */
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.hasValue = true;
    }
    /**
     * @return {?}
     */
    notifyComplete() {
        this.isInnerStopped = true;
        if (this.isStopped) {
            super._complete();
        }
    }
}
function SkipUntilSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SkipUntilSubscriber.prototype.hasValue;
    /** @type {?} */
    SkipUntilSubscriber.prototype.isInnerStopped;
}
