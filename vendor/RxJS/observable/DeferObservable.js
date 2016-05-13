goog.module('rxjs$observable$DeferObservable');
var Observable_1 = goog.require('rxjs$Observable');
var subscribeToResult_1 = goog.require('rxjs$util$subscribeToResult');
var OuterSubscriber_1 = goog.require('rxjs$OuterSubscriber');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
class DeferObservable extends Observable_1.Observable {
    /**
     * @param {?} observableFactory
     */
    constructor(observableFactory) {
        super();
        this.observableFactory = observableFactory;
    }
    /**
     *  Creates an Observable that, on subscribe, calls an Observable factory to make an Observable for each new Observer. * <span class="informal">Creates the Observable lazily, that is, only when it is subscribed. </span> * <img src="./img/defer.png" width="100%"> * `defer` allows you to create the Observable only when the Observer subscribes, and create a fresh Observable for each Observer. It waits until an Observer subscribes to it, and then it generates an Observable, typically with an Observable factory function. It does this afresh for each subscriber, so although each subscriber may think it is subscribing to the same Observable, in fact each subscriber gets its own individual Observable. *
     * @example <caption>Subscribe to either an Observable of clicks or an Observable of interval, at random</caption> var clicksOrInterval = Rx.Observable.defer(function () { if (Math.random() > 0.5) { return Rx.Observable.fromEvent(document, 'click'); } else { return Rx.Observable.interval(1000); } }); clicksOrInterval.subscribe(x => console.log(x)); *
     * @see {@link create} * factory function to invoke for each Observer that subscribes to the output Observable. May also return a Promise, which will be converted on the fly to an Observable. an invocation of the given Observable factory function.
     * @static true
     * @name defer
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
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DeferObservable.prototype.observableFactory;
    }
}
exports.DeferObservable = DeferObservable;
class DeferSubscriber extends OuterSubscriber_1.OuterSubscriber {
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
            this.add(subscribeToResult_1.subscribeToResult(this, result));
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DeferSubscriber.prototype.factory;
    }
}
