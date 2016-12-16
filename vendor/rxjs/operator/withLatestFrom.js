import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * Combines the source Observable with other Observables to create an Observable
 * whose values are calculated from the latest values of each, only when the
 * source emits.
 *
 * <span class="informal">Whenever the source Observable emits a value, it
 * computes a formula using that value plus the latest values from other input
 * Observables, then emits the output of that formula.</span>
 *
 * <img src="./img/withLatestFrom.png" width="100%">
 *
 * `withLatestFrom` combines each value from the source Observable (the
 * instance) with the latest values from the other input Observables only when
 * the source emits a value, optionally using a `project` function to determine
 * the value to be emitted on the output Observable. All input Observables must
 * emit at least one value before the output Observable will emit a value.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var result = clicks.withLatestFrom(timer);
 * result.subscribe(x => console.log(x));
 *
 * @see {\@link combineLatest}
 *
 * Observable. More than one input Observables may be given as argument.
 * together. Receives all values in order of the Observables passed, where the
 * first parameter is a value from the source Observable. (e.g.
 * `a.withLatestFrom(b, c, (a1, b1, c1) => a1 + b1 + c1)`). If this is not
 * passed, arrays will be emitted on the output Observable.
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @owner Observable
 * @this {?}
 * @param {...?} args
 * @return {?}
 */
export function withLatestFrom(...args) {
    let /** @type {?} */ project;
    if (typeof args[args.length - 1] === 'function') {
        project = args.pop();
    }
    const /** @type {?} */ observables = (args);
    return this.lift(new WithLatestFromOperator(observables, project));
}
class WithLatestFromOperator {
    /**
     * @param {?} observables
     * @param {?=} project
     */
    constructor(observables, project) {
        this.observables = observables;
        this.project = project;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new WithLatestFromSubscriber(subscriber, this.observables, this.project));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class WithLatestFromSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} observables
     * @param {?=} project
     */
    constructor(destination, observables, project) {
        super(destination);
        this.observables = observables;
        this.project = project;
        this.toRespond = [];
        const len = observables.length;
        this.values = new Array(len);
        for (let i = 0; i < len; i++) {
            this.toRespond.push(i);
        }
        for (let i = 0; i < len; i++) {
            let observable = observables[i];
            this.add(subscribeToResult(this, observable, observable, i));
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
        this.values[outerIndex] = innerValue;
        const /** @type {?} */ toRespond = this.toRespond;
        if (toRespond.length > 0) {
            const /** @type {?} */ found = toRespond.indexOf(outerIndex);
            if (found !== -1) {
                toRespond.splice(found, 1);
            }
        }
    }
    /**
     * @return {?}
     */
    notifyComplete() {
        // noop
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        if (this.toRespond.length === 0) {
            const /** @type {?} */ args = [value, ...this.values];
            if (this.project) {
                this._tryProject(args);
            }
            else {
                this.destination.next(args);
            }
        }
    }
    /**
     * @param {?} args
     * @return {?}
     */
    _tryProject(args) {
        let /** @type {?} */ result;
        try {
            result = this.project.apply(this, args);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    }
}
function WithLatestFromSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    WithLatestFromSubscriber.prototype.values;
    /** @type {?} */
    WithLatestFromSubscriber.prototype.toRespond;
}
