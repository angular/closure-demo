import { Subscriber } from '../Subscriber';
import { ArgumentOutOfRangeError } from '../util/ArgumentOutOfRangeError';
import { EmptyObservable } from '../observable/EmptyObservable';
/**
 * Emits only the last `count` values emitted by the source Observable.
 *
 * <span class="informal">Remembers the latest `count` values, then emits those
 * only when the source completes.</span>
 *
 * <img src="./img/takeLast.png" width="100%">
 *
 * `takeLast` returns an Observable that emits at most the last `count` values
 * emitted by the source Observable. If the source emits fewer than `count`
 * values then all of its values are emitted. This operator must wait until the
 * `complete` notification emission from the source in order to emit the `next`
 * values on the output Observable, because otherwise it is impossible to know
 * whether or not more values will be emitted on the source. For this reason,
 * all values are emitted synchronously, followed by the complete notification.
 *
 * var many = Rx.Observable.range(1, 100);
 * var lastThree = many.takeLast(3);
 * lastThree.subscribe(x => console.log(x));
 *
 * @see {\@link take}
 * @see {\@link takeUntil}
 * @see {\@link takeWhile}
 * @see {\@link skip}
 *
 * @throws {ArgumentOutOfRangeError} When using `takeLast(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 *
 * the sequence of values emitted by the source Observable.
 * values emitted by the source Observable.
 * @owner Observable
 * @this {?}
 * @param {?} count
 * @return {?}
 */
export function takeLast(count) {
    if (count === 0) {
        return new EmptyObservable();
    }
    else {
        return this.lift(new TakeLastOperator(count));
    }
}
class TakeLastOperator {
    /**
     * @param {?} total
     */
    constructor(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError;
        }
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new TakeLastSubscriber(subscriber, this.total));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class TakeLastSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} total
     */
    constructor(destination, total) {
        super(destination);
        this.total = total;
        this.ring = new Array();
        this.count = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ ring = this.ring;
        const /** @type {?} */ total = this.total;
        const /** @type {?} */ count = this.count++;
        if (ring.length < total) {
            ring.push(value);
        }
        else {
            const /** @type {?} */ index = count % total;
            ring[index] = value;
        }
    }
    /**
     * @return {?}
     */
    _complete() {
        const /** @type {?} */ destination = this.destination;
        let /** @type {?} */ count = this.count;
        if (count > 0) {
            const /** @type {?} */ total = this.count >= this.total ? this.total : this.count;
            const /** @type {?} */ ring = this.ring;
            for (let /** @type {?} */ i = 0; i < total; i++) {
                const /** @type {?} */ idx = (count++) % total;
                destination.next(ring[idx]);
            }
        }
        destination.complete();
    }
}
function TakeLastSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    TakeLastSubscriber.prototype.ring;
    /** @type {?} */
    TakeLastSubscriber.prototype.count;
}
