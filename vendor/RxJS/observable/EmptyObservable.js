goog.module('rxjs$observable$EmptyObservable');
var Observable_1 = goog.require('rxjs$Observable');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
class EmptyObservable extends Observable_1.Observable {
    /**
     * @param {?=} scheduler
     */
    constructor(scheduler) {
        super();
        this.scheduler = scheduler;
    }
    /**
     *  Creates an Observable that emits no items to the Observer and immediately emits a complete notification. * <span class="informal">Just emits 'complete', and nothing else. </span> * <img src="./img/empty.png" width="100%"> * This static operator is useful for creating a simple Observable that only emits the complete notification. It can be used for composing with other Observables, such as in a {@link mergeMap}. *
     * @example <caption>Emit the number 7, then complete.</caption> var result = Rx.Observable.empty().startWith(7); result.subscribe(x => console.log(x)); *
     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption> var interval = Rx.Observable.interval(1000); var result = interval.mergeMap(x => x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty() ); result.subscribe(x => console.log(x)); *
     * @see {@link create}
     * @see {@link never}
     * @see {@link of}
     * @see {@link throw} * the emission of the complete notification. notification.
     * @static true
     * @name empty
     * @owner Observable
     * @param {?=} scheduler
     * @return {?}
     */
    static create(scheduler) {
        return new EmptyObservable(scheduler);
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    static dispatch(arg) {
        const { subscriber } = arg;
        subscriber.complete();
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber });
        }
        else {
            subscriber.complete();
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        EmptyObservable.prototype.scheduler;
    }
}
exports.EmptyObservable = EmptyObservable;
