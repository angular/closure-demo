import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, emitting values only from the most recently projected Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {\@link switch}.</span>
 *
 * <img src="./img/switchMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each time it observes one of these
 * inner Observables, the output Observable begins emitting the items emitted by
 * that inner Observable. When a new inner Observable is emitted, `switchMap`
 * stops emitting items from the earlier-emitted inner Observable and begins
 * emitting items from the new one. It continues to behave like this for
 * subsequent inner Observables.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link concatMap}
 * @see {\@link exhaustMap}
 * @see {\@link mergeMap}
 * @see {\@link switch}
 * @see {\@link switchMapTo}
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
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking only the values from the most recently
 * projected inner Observable.
 * @owner Observable
 * @this {?}
 * @param {?} project
 * @param {?=} resultSelector
 * @return {?}
 */
export function switchMap(project, resultSelector) {
    return this.lift(new SwitchMapOperator(project, resultSelector));
}
class SwitchMapOperator {
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
        return source.subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class SwitchMapSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} project
     * @param {?=} resultSelector
     */
    constructor(destination, project, resultSelector) {
        super(destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.index = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        let /** @type {?} */ result;
        const /** @type {?} */ index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (error) {
            this.destination.error(error);
            return;
        }
        this._innerSub(result, value, index);
    }
    /**
     * @param {?} result
     * @param {?} value
     * @param {?} index
     * @return {?}
     */
    _innerSub(result, value, index) {
        const /** @type {?} */ innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        this.add(this.innerSubscription = subscribeToResult(this, result, value, index));
    }
    /**
     * @return {?}
     */
    _complete() {
        const { innerSubscription } = this;
        if (!innerSubscription || innerSubscription.closed) {
            super._complete();
        }
    }
    /**
     * @return {?}
     */
    _unsubscribe() {
        this.innerSubscription = null;
    }
    /**
     * @param {?} innerSub
     * @return {?}
     */
    notifyComplete(innerSub) {
        this.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
            super._complete();
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
        if (this.resultSelector) {
            this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    }
    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @return {?}
     */
    _tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex) {
        let /** @type {?} */ result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    }
}
function SwitchMapSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SwitchMapSubscriber.prototype.index;
    /** @type {?} */
    SwitchMapSubscriber.prototype.innerSubscription;
}
