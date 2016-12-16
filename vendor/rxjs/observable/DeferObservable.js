import { Observable } from '../Observable';
import { subscribeToResult } from '../util/subscribeToResult';
import { OuterSubscriber } from '../OuterSubscriber';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class DeferObservable extends Observable {
    /**
     * @param {?} observableFactory
     */
    constructor(observableFactory) {
        super();
        this.observableFactory = observableFactory;
    }
    /**
     * Creates an Observable that, on subscribe, calls an Observable factory to
     * make an Observable for each new Observer.
     *
     * <span class="informal">Creates the Observable lazily, that is, only when it
     * is subscribed.
     * </span>
     *
     * <img src="./img/defer.png" width="100%">
     *
     * `defer` allows you to create the Observable only when the Observer
     * subscribes, and create a fresh Observable for each Observer. It waits until
     * an Observer subscribes to it, and then it generates an Observable,
     * typically with an Observable factory function. It does this afresh for each
     * subscriber, so although each subscriber may think it is subscribing to the
     * same Observable, in fact each subscriber gets its own individual
     * Observable.
     *
     * var clicksOrInterval = Rx.Observable.defer(function () {
     *   if (Math.random() > 0.5) {
     *     return Rx.Observable.fromEvent(document, 'click');
     *   } else {
     *     return Rx.Observable.interval(1000);
     *   }
     * });
     * clicksOrInterval.subscribe(x => console.log(x));
     *
     * // Results in the following behavior:
     * // If the result of Math.random() is greater than 0.5 it will listen
     * // for clicks anywhere on the "document"; when document is clicked it
     * // will log a MouseEvent object to the console. If the result is less
     * // than 0.5 it will emit ascending numbers, one every second(1000ms).
     *
     * @see {\@link create}
     *
     * factory function to invoke for each Observer that subscribes to the output
     * Observable. May also return a Promise, which will be converted on the fly
     * to an Observable.
     * an invocation of the given Observable factory function.
     * @owner Observable
     * @param {?} observableFactory
     * @return {?}
     */
    static create(observableFactory) {
        return new DeferObservable(observableFactory);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        return new DeferSubscriber(subscriber, this.observableFactory);
    }
}
class DeferSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} factory
     */
    constructor(destination, factory) {
        super(destination);
        this.factory = factory;
        this.tryDefer();
    }
    /**
     * @return {?}
     */
    tryDefer() {
        try {
            this._callFactory();
        }
        catch (err) {
            this._error(err);
        }
    }
    /**
     * @return {?}
     */
    _callFactory() {
        const /** @type {?} */ result = this.factory();
        if (result) {
            this.add(subscribeToResult(this, result));
        }
    }
}
