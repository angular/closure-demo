import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Emits the most recently emitted value from the source Observable whenever
 * another Observable, the `notifier`, emits.
 *
 * <span class="informal">It's like {\@link sampleTime}, but samples whenever
 * the `notifier` Observable emits something.</span>
 *
 * <img src="./img/sample.png" width="100%">
 *
 * Whenever the `notifier` Observable emits a value or completes, `sample`
 * looks at the source Observable and emits whichever value it has most recently
 * emitted since the previous sampling, unless the source has not emitted
 * anything since the previous sampling. The `notifier` is subscribed to as soon
 * as the output Observable is subscribed.
 *
 * var seconds = Rx.Observable.interval(1000);
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = seconds.sample(clicks);
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link audit}
 * @see {\@link debounce}
 * @see {\@link sampleTime}
 * @see {\@link throttle}
 *
 * source Observable.
 * values emitted by the source Observable whenever the notifier Observable
 * emits value or completes.
 * @owner Observable
 * @this {?}
 * @param {?} notifier
 * @return {?}
 */
export function sample(notifier) {
    return this.lift(new SampleOperator(notifier));
}
class SampleOperator {
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
        const /** @type {?} */ sampleSubscriber = new SampleSubscriber(subscriber);
        const /** @type {?} */ subscription = source.subscribe(sampleSubscriber);
        subscription.add(subscribeToResult(sampleSubscriber, this.notifier));
        return subscription;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class SampleSubscriber extends OuterSubscriber {
    constructor() {
        super(...arguments);
        this.hasValue = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.value = value;
        this.hasValue = true;
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
        this.emitValue();
    }
    /**
     * @return {?}
     */
    notifyComplete() {
        this.emitValue();
    }
    /**
     * @return {?}
     */
    emitValue() {
        if (this.hasValue) {
            this.hasValue = false;
            this.destination.next(this.value);
        }
    }
}
function SampleSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SampleSubscriber.prototype.value;
    /** @type {?} */
    SampleSubscriber.prototype.hasValue;
}
