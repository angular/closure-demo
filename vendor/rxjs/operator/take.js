import { Subscriber } from '../Subscriber';
import { ArgumentOutOfRangeError } from '../util/ArgumentOutOfRangeError';
import { EmptyObservable } from '../observable/EmptyObservable';
/**
 * Emits only the first `count` values emitted by the source Observable.
 *
 * <span class="informal">Takes the first `count` values from the source, then
 * completes.</span>
 *
 * <img src="./img/take.png" width="100%">
 *
 * `take` returns an Observable that emits only the first `count` values emitted
 * by the source Observable. If the source emits fewer than `count` values then
 * all of its values are emitted. After that, it completes, regardless if the
 * source completes.
 *
 * var interval = Rx.Observable.interval(1000);
 * var five = interval.take(5);
 * five.subscribe(x => console.log(x));
 *
 * @see {\@link takeLast}
 * @see {\@link takeUntil}
 * @see {\@link takeWhile}
 * @see {\@link skip}
 *
 * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 *
 * values emitted by the source Observable, or all of the values from the source
 * if the source emits fewer than `count` values.
 * @owner Observable
 * @this {?}
 * @param {?} count
 * @return {?}
 */
export function take(count) {
    if (count === 0) {
        return new EmptyObservable();
    }
    else {
        return this.lift(new TakeOperator(count));
    }
}
class TakeOperator {
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
        return source.subscribe(new TakeSubscriber(subscriber, this.total));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class TakeSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} total
     */
    constructor(destination, total) {
        super(destination);
        this.total = total;
        this.count = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ total = this.total;
        const /** @type {?} */ count = ++this.count;
        if (count <= total) {
            this.destination.next(value);
            if (count === total) {
                this.destination.complete();
                this.unsubscribe();
            }
        }
    }
}
function TakeSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    TakeSubscriber.prototype.count;
}
