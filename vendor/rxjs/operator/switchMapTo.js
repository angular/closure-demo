import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Projects each source value to the same Observable which is flattened multiple
 * times with {\@link switch} in the output Observable.
 *
 * <span class="informal">It's like {\@link switchMap}, but maps each value
 * always to the same inner Observable.</span>
 *
 * <img src="./img/switchMapTo.png" width="100%">
 *
 * Maps each source value to the given Observable `innerObservable` regardless
 * of the source value, and then flattens those resulting Observables into one
 * single Observable, which is the output Observable. The output Observables
 * emits values only from the most recently emitted instance of
 * `innerObservable`.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.switchMapTo(Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link concatMapTo}
 * @see {\@link switch}
 * @see {\@link switchMap}
 * @see {\@link mergeMapTo}
 *
 * the source Observable.
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * `innerObservable` every time a value is emitted on the source Observable.
 * `innerObservable` (and optionally transformed through `resultSelector`) every
 * time a value is emitted on the source Observable, and taking only the values
 * from the most recently projected inner Observable.
 * @owner Observable
 * @this {?}
 * @param {?} innerObservable
 * @param {?=} resultSelector
 * @return {?}
 */
export function switchMapTo(innerObservable, resultSelector) {
    return this.lift(new SwitchMapToOperator(innerObservable, resultSelector));
}
class SwitchMapToOperator {
    /**
     * @param {?} observable
     * @param {?=} resultSelector
     */
    constructor(observable, resultSelector) {
        this.observable = observable;
        this.resultSelector = resultSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new SwitchMapToSubscriber(subscriber, this.observable, this.resultSelector));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class SwitchMapToSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} inner
     * @param {?=} resultSelector
     */
    constructor(destination, inner, resultSelector) {
        super(destination);
        this.inner = inner;
        this.resultSelector = resultSelector;
        this.index = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        this.add(this.innerSubscription = subscribeToResult(this, this.inner, value, this.index++));
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
        const { resultSelector, destination } = this;
        if (resultSelector) {
            this.tryResultSelector(outerValue, innerValue, outerIndex, innerIndex);
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
    tryResultSelector(outerValue, innerValue, outerIndex, innerIndex) {
        const { resultSelector, destination } = this;
        let /** @type {?} */ result;
        try {
            result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            destination.error(err);
            return;
        }
        destination.next(result);
    }
}
function SwitchMapToSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SwitchMapToSubscriber.prototype.index;
    /** @type {?} */
    SwitchMapToSubscriber.prototype.innerSubscription;
}
