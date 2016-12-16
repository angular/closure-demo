import { Subscriber } from '../Subscriber';
/**
 * If the source Observable is empty it returns an Observable that emits true, otherwise it emits false.
 *
 * <img src="./img/isEmpty.png" width="100%">
 *
 * @owner Observable
 * @this {?}
 * @return {?}
 */
export function isEmpty() {
    return this.lift(new IsEmptyOperator());
}
class IsEmptyOperator {
    /**
     * @param {?} observer
     * @param {?} source
     * @return {?}
     */
    call(observer, source) {
        return source.subscribe(new IsEmptySubscriber(observer));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class IsEmptySubscriber extends Subscriber {
    /**
     * @param {?} destination
     */
    constructor(destination) {
        super(destination);
    }
    /**
     * @param {?} isEmpty
     * @return {?}
     */
    notifyComplete(isEmpty) {
        const /** @type {?} */ destination = this.destination;
        destination.next(isEmpty);
        destination.complete();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.notifyComplete(false);
    }
    /**
     * @return {?}
     */
    _complete() {
        this.notifyComplete(true);
    }
}
