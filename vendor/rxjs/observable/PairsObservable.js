import { Observable } from '../Observable';
/**
 * @this {?}
 * @param {?} state
 * @return {?}
 */
function dispatch(state) {
    const { obj, keys, length, index, subscriber } = state;
    if (index === length) {
        subscriber.complete();
        return;
    }
    const /** @type {?} */ key = keys[index];
    subscriber.next([key, obj[key]]);
    state.index = index + 1;
    this.schedule(state);
}
/**
 * We need this JSDoc comment for affecting ESDoc.
\@extends {Ignored}
\@hide true
 */
export class PairsObservable extends Observable {
    /**
     * @param {?} obj
     * @param {?=} scheduler
     */
    constructor(obj, scheduler) {
        super();
        this.obj = obj;
        this.scheduler = scheduler;
        this.keys = Object.keys(obj);
    }
    /**
     * Convert an object into an observable sequence of [key, value] pairs
    using an optional Scheduler to enumerate the object.
    
    \@example <caption>Converts a javascript object to an Observable</caption>
    var obj = {
      foo: 42,
      bar: 56,
      baz: 78
    };
    
    var source = Rx.Observable.pairs(obj);
    
    var subscription = source.subscribe(
      function (x) {
        console.log('Next: %s', x);
      },
      function (err) {
        console.log('Error: %s', err);
      },
      function () {
        console.log('Completed');
      });
    
    \@param {Object} obj The object to inspect and turn into an
    Observable sequence.
    \@param {Scheduler} [scheduler] An optional Scheduler to run the
    enumeration of the input sequence on.
    \@returns {(Observable<Array<string | T>>)} An observable sequence of
    [key, value] pairs from the object.
     * @param {?} obj
     * @param {?=} scheduler
     * @return {?}
     */
    static create(obj, scheduler) {
        return new PairsObservable(obj, scheduler);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const { keys, scheduler } = this;
        const /** @type {?} */ length = keys.length;
        if (scheduler) {
            return scheduler.schedule(dispatch, 0, {
                obj: this.obj, keys, length, index: 0, subscriber
            });
        }
        else {
            for (let /** @type {?} */ idx = 0; idx < length; idx++) {
                const /** @type {?} */ key = keys[idx];
                subscriber.next([key, this.obj[key]]);
            }
            subscriber.complete();
        }
    }
}
function PairsObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    PairsObservable.prototype.keys;
}
