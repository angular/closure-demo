import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Converts a higher-order Observable into a first-order Observable which
 * concurrently delivers all values that are emitted on the inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables.</span>
 *
 * <img src="./img/mergeAll.png" width="100%">
 *
 * `mergeAll` subscribes to an Observable that emits Observables, also known as
 * a higher-order Observable. Each time it observes one of these emitted inner
 * Observables, it subscribes to that and delivers all the values from the
 * inner Observable on the output Observable. The output Observable only
 * completes once all inner Observables have completed. Any error delivered by
 * a inner Observable will be immediately emitted on the output Observable.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var firstOrder = higherOrder.mergeAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
 * var firstOrder = higherOrder.mergeAll(2);
 * firstOrder.subscribe(x => console.log(x));
 *
 * @see {\@link combineAll}
 * @see {\@link concatAll}
 * @see {\@link exhaust}
 * @see {\@link merge}
 * @see {\@link mergeMap}
 * @see {\@link mergeMapTo}
 * @see {\@link mergeScan}
 * @see {\@link switch}
 * @see {\@link zipAll}
 *
 * Observables being subscribed to concurrently.
 * inner Observables emitted by the source Observable.
 * @owner Observable
 * @this {?}
 * @param {?=} concurrent
 * @return {?}
 */
export function mergeAll(concurrent = Number.POSITIVE_INFINITY) {
    return (this.lift(new MergeAllOperator(concurrent)));
}
export class MergeAllOperator {
    /**
     * @param {?} concurrent
     */
    constructor(concurrent) {
        this.concurrent = concurrent;
    }
    /**
     * @param {?} observer
     * @param {?} source
     * @return {?}
     */
    call(observer, source) {
        return source.subscribe(new MergeAllSubscriber(observer, this.concurrent));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class MergeAllSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} concurrent
     */
    constructor(destination, concurrent) {
        super(destination);
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
    }
    /**
     * @param {?} observable
     * @return {?}
     */
    _next(observable) {
        if (this.active < this.concurrent) {
            this.active++;
            this.add(subscribeToResult(this, observable));
        }
        else {
            this.buffer.push(observable);
        }
    }
    /**
     * @return {?}
     */
    _complete() {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    }
    /**
     * @param {?} innerSub
     * @return {?}
     */
    notifyComplete(innerSub) {
        const /** @type {?} */ buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    }
}
function MergeAllSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    MergeAllSubscriber.prototype.hasCompleted;
    /** @type {?} */
    MergeAllSubscriber.prototype.buffer;
    /** @type {?} */
    MergeAllSubscriber.prototype.active;
}
