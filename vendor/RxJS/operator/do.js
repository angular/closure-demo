goog.module('rxjs$operator$do');
var Subscriber_1 = goog.require('rxjs$Subscriber');
/**
 *  Perform a side effect for every emission on the source Observable, but return an Observable that is identical to the source. * <span class="informal">Intercepts each emission on the source and runs a function, but returns an output which is identical to the source.</span> * <img src="./img/do.png" width="100%"> * Returns a mirrored Observable of the source Observable, but modified so that the provided Observer is called to perform a side effect for every value, error, and completion emitted by the source. Any errors that are thrown in the aforementioned Observer or handlers are safely sent down the error path of the output Observable. * This operator is useful for debugging your Observables for the correct values or performing other side effects. * Note: this is different to a `subscribe` on the Observable. If the Observable returned by `do` is not subscribed, the side effects specified by the Observer will never happen. `do` therefore simply spies on existing execution, it does not trigger an execution to happen like `subscribe` does. *
 * @example <caption>Map every every click to the clientX position of that click, while also logging the click event</caption> var clicks = Rx.Observable.fromEvent(document, 'click'); var positions = clicks .do(ev => console.log(ev)) .map(ev => ev.clientX); positions.subscribe(x => console.log(x)); *
 * @see {@link map}
 * @see {@link subscribe} * callback for `next`. specified Observer or callback(s) for each item.
 * @method do
 * @name do
 * @owner Observable
 * @param {?=} nextOrObserver
 * @param {?=} error
 * @param {?=} complete
 * @return {?}
 */
function _do(nextOrObserver, error, complete) {
    return this.lift(new DoOperator(nextOrObserver, error, complete));
}
exports._do = _do;
class DoOperator {
    /**
     * @param {?=} nextOrObserver
     * @param {?=} error
     * @param {?=} complete
     */
    constructor(nextOrObserver, error, complete) {
        this.nextOrObserver = nextOrObserver;
        this.error = error;
        this.complete = complete;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DoOperator.prototype.nextOrObserver;
        /** @type {?} */
        DoOperator.prototype.error;
        /** @type {?} */
        DoOperator.prototype.complete;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class DoSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?=} nextOrObserver
     * @param {?=} error
     * @param {?=} complete
     */
    constructor(destination, nextOrObserver, error, complete) {
        super(destination);
        const safeSubscriber = new Subscriber_1.Subscriber(nextOrObserver, error, complete);
        safeSubscriber.syncErrorThrowable = true;
        this.add(safeSubscriber);
        this.safeSubscriber = safeSubscriber;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const { safeSubscriber } = this;
        safeSubscriber.next(value);
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.next(value);
        }
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        const { safeSubscriber } = this;
        safeSubscriber.error(err);
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.error(err);
        }
    }
    /**
     * @return {?}
     */
    _complete() {
        const { safeSubscriber } = this;
        safeSubscriber.complete();
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.complete();
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DoSubscriber.prototype.safeSubscriber;
    }
}
