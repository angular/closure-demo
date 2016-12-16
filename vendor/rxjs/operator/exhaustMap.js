import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable only if the previous projected Observable has completed.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {\@link exhaust}.</span>
 *
 * <img src="./img/exhaustMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. When it projects a source value to
 * an Observable, the output Observable begins emitting the items emitted by
 * that projected Observable. However, `exhaustMap` ignores every new projected
 * Observable if the previous projected Observable has not yet completed. Once
 * that one completes, it will accept and flatten the next projected Observable
 * and repeat this process.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.exhaustMap((ev) => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link concatMap}
 * @see {\@link exhaust}
 * @see {\@link mergeMap}
 * @see {\@link switchMap}
 *
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * of each item of the source, ignoring projected Observables that start before
 * their preceding Observable has completed.
 * @owner Observable
 * @this {?}
 * @param {?} project
 * @param {?=} resultSelector
 * @return {?}
 */
export function exhaustMap(project, resultSelector) {
    return this.lift(new SwitchFirstMapOperator(project, resultSelector));
}
class SwitchFirstMapOperator {
    /**
     * @param {?} project
     * @param {?=} resultSelector
     */
    constructor(project, resultSelector) {
        this.project = project;
        this.resultSelector = resultSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new SwitchFirstMapSubscriber(subscriber, this.project, this.resultSelector));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class SwitchFirstMapSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} project
     * @param {?=} resultSelector
     */
    constructor(destination, project, resultSelector) {
        super(destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.hasSubscription = false;
        this.hasCompleted = false;
        this.index = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        if (!this.hasSubscription) {
            this.tryNext(value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    tryNext(value) {
        const /** @type {?} */ index = this.index++;
        const /** @type {?} */ destination = this.destination;
        try {
            const /** @type {?} */ result = this.project(value, index);
            this.hasSubscription = true;
            this.add(subscribeToResult(this, result, value, index));
        }
        catch (err) {
            destination.error(err);
        }
    }
    /**
     * @return {?}
     */
    _complete() {
        this.hasCompleted = true;
        if (!this.hasSubscription) {
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
        const { resultSelector, destination } = this;
        if (resultSelector) {
            this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            destination.next(innerValue);
        }
    }
    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @return {?}
     */
    trySelectResult(outerValue, innerValue, outerIndex, innerIndex) {
        const { resultSelector, destination } = this;
        try {
            const /** @type {?} */ result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
            destination.next(result);
        }
        catch (err) {
            destination.error(err);
        }
    }
    /**
     * @param {?} err
     * @return {?}
     */
    notifyError(err) {
        this.destination.error(err);
    }
    /**
     * @param {?} innerSub
     * @return {?}
     */
    notifyComplete(innerSub) {
        this.remove(innerSub);
        this.hasSubscription = false;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    }
}
function SwitchFirstMapSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SwitchFirstMapSubscriber.prototype.hasSubscription;
    /** @type {?} */
    SwitchFirstMapSubscriber.prototype.hasCompleted;
    /** @type {?} */
    SwitchFirstMapSubscriber.prototype.index;
}
