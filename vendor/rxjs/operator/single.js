import { Subscriber } from '../Subscriber';
import { EmptyError } from '../util/EmptyError';
/**
 * Returns an Observable that emits the single item emitted by the source Observable that matches a specified
 * predicate, if that Observable emits one such item. If the source Observable emits more than one such item or no
 * such items, notify of an IllegalArgumentException or NoSuchElementException respectively.
 *
 * <img src="./img/single.png" width="100%">
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 * the predicate.
 * .
 * @owner Observable
 * @this {?}
 * @param {?=} predicate
 * @return {?}
 */
export function single(predicate) {
    return this.lift(new SingleOperator(predicate, this));
}
class SingleOperator {
    /**
     * @param {?=} predicate
     * @param {?=} source
     */
    constructor(predicate, source) {
        this.predicate = predicate;
        this.source = source;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new SingleSubscriber(subscriber, this.predicate, this.source));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class SingleSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?=} predicate
     * @param {?=} source
     */
    constructor(destination, predicate, source) {
        super(destination);
        this.predicate = predicate;
        this.source = source;
        this.seenValue = false;
        this.index = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    applySingleValue(value) {
        if (this.seenValue) {
            this.destination.error('Sequence contains more than one element');
        }
        else {
            this.seenValue = true;
            this.singleValue = value;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ predicate = this.predicate;
        this.index++;
        if (predicate) {
            this.tryNext(value);
        }
        else {
            this.applySingleValue(value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    tryNext(value) {
        try {
            const /** @type {?} */ result = this.predicate(value, this.index, this.source);
            if (result) {
                this.applySingleValue(value);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    }
    /**
     * @return {?}
     */
    _complete() {
        const /** @type {?} */ destination = this.destination;
        if (this.index > 0) {
            destination.next(this.seenValue ? this.singleValue : undefined);
            destination.complete();
        }
        else {
            destination.error(new EmptyError);
        }
    }
}
function SingleSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SingleSubscriber.prototype.seenValue;
    /** @type {?} */
    SingleSubscriber.prototype.singleValue;
    /** @type {?} */
    SingleSubscriber.prototype.index;
}
