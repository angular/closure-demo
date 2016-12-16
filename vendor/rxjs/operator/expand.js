import { tryCatch } from '../util/tryCatch';
import { errorObject } from '../util/errorObject';
import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Recursively projects each source value to an Observable which is merged in
 * the output Observable.
 *
 * <span class="informal">It's similar to {\@link mergeMap}, but applies the
 * projection function to every source value as well as every output value.
 * It's recursive.</span>
 *
 * <img src="./img/expand.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger. *Expand* will re-emit on the output
 * Observable every source value. Then, each output value is given to the
 * `project` function which returns an inner Observable to be merged on the
 * output Observable. Those output values resulting from the projection are also
 * given to the `project` function to produce new output values. This is how
 * *expand* behaves recursively.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var powersOfTwo = clicks
 *   .mapTo(1)
 *   .expand(x => Rx.Observable.of(2 * x).delay(1000))
 *   .take(10);
 * powersOfTwo.subscribe(x => console.log(x));
 *
 * @see {\@link mergeMap}
 * @see {\@link mergeScan}
 *
 * that, when applied to an item emitted by the source or the output Observable,
 * returns an Observable.
 * Observables being subscribed to concurrently.
 * each projected inner Observable.
 * result of applying the projection function to each value emitted on the
 * output Observable and and merging the results of the Observables obtained
 * from this transformation.
 * @owner Observable
 * @this {?}
 * @param {?} project
 * @param {?=} concurrent
 * @param {?=} scheduler
 * @return {?}
 */
export function expand(project, concurrent = Number.POSITIVE_INFINITY, scheduler = undefined) {
    concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
    return this.lift(new ExpandOperator(project, concurrent, scheduler));
}
export class ExpandOperator {
    /**
     * @param {?} project
     * @param {?} concurrent
     * @param {?} scheduler
     */
    constructor(project, concurrent, scheduler) {
        this.project = project;
        this.concurrent = concurrent;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class ExpandSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} project
     * @param {?} concurrent
     * @param {?} scheduler
     */
    constructor(destination, project, concurrent, scheduler) {
        super(destination);
        this.project = project;
        this.concurrent = concurrent;
        this.scheduler = scheduler;
        this.index = 0;
        this.active = 0;
        this.hasCompleted = false;
        if (concurrent < Number.POSITIVE_INFINITY) {
            this.buffer = [];
        }
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    static dispatch(arg) {
        const { subscriber, result, value, index } = arg;
        subscriber.subscribeToProjection(result, value, index);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ destination = this.destination;
        if (destination.closed) {
            this._complete();
            return;
        }
        const /** @type {?} */ index = this.index++;
        if (this.active < this.concurrent) {
            destination.next(value);
            let /** @type {?} */ result = tryCatch(this.project)(value, index);
            if (result === errorObject) {
                destination.error(errorObject.e);
            }
            else if (!this.scheduler) {
                this.subscribeToProjection(result, value, index);
            }
            else {
                const /** @type {?} */ state = { subscriber: this, result, value, index };
                this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
            }
        }
        else {
            this.buffer.push(value);
        }
    }
    /**
     * @param {?} result
     * @param {?} value
     * @param {?} index
     * @return {?}
     */
    subscribeToProjection(result, value, index) {
        this.active++;
        this.add(subscribeToResult(this, result, value, index));
    }
    /**
     * @return {?}
     */
    _complete() {
        this.hasCompleted = true;
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
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
        this._next(innerValue);
    }
    /**
     * @param {?} innerSub
     * @return {?}
     */
    notifyComplete(innerSub) {
        const /** @type {?} */ buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer && buffer.length > 0) {
            this._next(buffer.shift());
        }
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    }
}
function ExpandSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    ExpandSubscriber.prototype.index;
    /** @type {?} */
    ExpandSubscriber.prototype.active;
    /** @type {?} */
    ExpandSubscriber.prototype.hasCompleted;
    /** @type {?} */
    ExpandSubscriber.prototype.buffer;
}
