import { Subscriber } from '../Subscriber';
import { noop } from '../util/noop';
/**
 * Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.
 *
 * <img src="./img/ignoreElements.png" width="100%">
 *
 * or `error`, based on which one is called by the source Observable.
 * @owner Observable
 * @this {?}
 * @return {?}
 */
export function ignoreElements() {
    return this.lift(new IgnoreElementsOperator());
}
;
class IgnoreElementsOperator {
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new IgnoreElementsSubscriber(subscriber));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class IgnoreElementsSubscriber extends Subscriber {
    /**
     * @param {?} unused
     * @return {?}
     */
    _next(unused) {
        noop();
    }
}
