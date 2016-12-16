import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Emits the values emitted by the source Observable until a `notifier`
 * Observable emits a value.
 *
 * <span class="informal">Lets values pass until a second Observable,
 * `notifier`, emits something. Then, it completes.</span>
 *
 * <img src="./img/takeUntil.png" width="100%">
 *
 * `takeUntil` subscribes and begins mirroring the source Observable. It also
 * monitors a second Observable, `notifier` that you provide. If the `notifier`
 * emits a value or a complete notification, the output Observable stops
 * mirroring the source Observable and completes.
 *
 * var interval = Rx.Observable.interval(1000);
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = interval.takeUntil(clicks);
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link take}
 * @see {\@link takeLast}
 * @see {\@link takeWhile}
 * @see {\@link skip}
 *
 * cause the output Observable of `takeUntil` to stop emitting values from the
 * source Observable.
 * Observable until such time as `notifier` emits its first value.
 * @owner Observable
 * @this {?}
 * @param {?} notifier
 * @return {?}
 */
export function takeUntil(notifier) {
    return this.lift(new TakeUntilOperator(notifier));
}
class TakeUntilOperator {
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
        return source.subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class TakeUntilSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} notifier
     */
    constructor(destination, notifier) {
        super(destination);
        this.notifier = notifier;
        this.add(subscribeToResult(this, notifier));
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
        this.complete();
    }
    /**
     * @return {?}
     */
    notifyComplete() {
        // noop
    }
}
