goog.module('rxjs$observable$ErrorObservable');
var Observable_1 = goog.require('rxjs$Observable');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
class ErrorObservable extends Observable_1.Observable {
    /**
     * @param {?} error
     * @param {?=} scheduler
     */
    constructor(error, scheduler) {
        super();
        this.error = error;
        this.scheduler = scheduler;
    }
    /**
     *  Creates an Observable that emits no items to the Observer and immediately emits an error notification. * <span class="informal">Just emits 'error', and nothing else. </span> * <img src="./img/throw.png" width="100%"> * This static operator is useful for creating a simple Observable that only emits the error notification. It can be used for composing with other Observables, such as in a {@link mergeMap}. *
     * @example <caption>Emit the number 7, then emit an error.</caption> var result = Rx.Observable.throw(new Error('oops!')).startWith(7); result.subscribe(x => console.log(x), e => console.error(e)); *
     * @example <caption>Map and flattens numbers to the sequence 'a', 'b', 'c', but throw an error for 13</caption> var interval = Rx.Observable.interval(1000); var result = interval.mergeMap(x => x === 13 ? Rx.Observable.throw('Thirteens are bad') : Rx.Observable.of('a', 'b', 'c') ); result.subscribe(x => console.log(x), e => console.error(e)); *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link of} * the emission of the error notification. using the given error argument.
     * @static true
     * @name throw
     * @owner Observable
     * @param {?} error
     * @param {?=} scheduler
     * @return {?}
     */
    static create(error, scheduler) {
        return new ErrorObservable(error, scheduler);
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    static dispatch(arg) {
        const { error, subscriber } = arg;
        subscriber.error(error);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ error = this.error;
        const /** @type {?} */ scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ErrorObservable.dispatch, 0, {
                error, subscriber
            });
        }
        else {
            subscriber.error(error);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ErrorObservable.prototype.error;
        /** @type {?} */
        ErrorObservable.prototype.scheduler;
    }
}
exports.ErrorObservable = ErrorObservable;
