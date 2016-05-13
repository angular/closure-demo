goog.module('rxjs$observable$ArrayLikeObservable');
var Observable_1 = goog.require('rxjs$Observable');
var ScalarObservable_1 = goog.require('rxjs$observable$ScalarObservable');
var EmptyObservable_1 = goog.require('rxjs$observable$EmptyObservable');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
class ArrayLikeObservable extends Observable_1.Observable {
    /**
     * @param {?} arrayLike
     * @param {?} mapFn
     * @param {?} thisArg
     * @param {?=} scheduler
     */
    constructor(arrayLike, mapFn, thisArg, scheduler) {
        super();
        this.arrayLike = arrayLike;
        this.scheduler = scheduler;
        if (!mapFn && !scheduler && arrayLike.length === 1) {
            this._isScalar = true;
            this.value = arrayLike[0];
        }
        if (mapFn) {
            this.mapFn = mapFn.bind(thisArg);
        }
    }
    /**
     * @param {?} arrayLike
     * @param {?} mapFn
     * @param {?} thisArg
     * @param {?=} scheduler
     * @return {?}
     */
    static create(arrayLike, mapFn, thisArg, scheduler) {
        const /** @type {?} */ length = arrayLike.length;
        if (length === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        else if (length === 1 && !mapFn) {
            return new ScalarObservable_1.ScalarObservable(/** @type {?} */ (arrayLike[0]), scheduler);
        }
        else {
            return new ArrayLikeObservable(arrayLike, mapFn, thisArg, scheduler);
        }
    }
    /**
     * @param {?} state
     * @return {?}
     */
    static dispatch(state) {
        const { arrayLike, index, length, mapFn, subscriber } = state;
        if (subscriber.isUnsubscribed) {
            return;
        }
        if (index >= length) {
            subscriber.complete();
            return;
        }
        const /** @type {?} */ result = mapFn ? mapFn(arrayLike[index], index) : arrayLike[index];
        subscriber.next(result);
        state.index = index + 1;
        ((this)).schedule(state);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        let /** @type {?} */ index = 0;
        const { arrayLike, mapFn, scheduler } = this;
        const /** @type {?} */ length = arrayLike.length;
        if (scheduler) {
            return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
                arrayLike, index, length, mapFn, subscriber
            });
        }
        else {
            for (let /** @type {?} */ i = 0; i < length && !subscriber.isUnsubscribed; i++) {
                const /** @type {?} */ result = mapFn ? mapFn(arrayLike[i], i) : arrayLike[i];
                subscriber.next(result);
            }
            subscriber.complete();
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ArrayLikeObservable.prototype.mapFn;
        /** @type {?} */
        ArrayLikeObservable.prototype.value;
        /** @type {?} */
        ArrayLikeObservable.prototype.arrayLike;
        /** @type {?} */
        ArrayLikeObservable.prototype.scheduler;
    }
}
exports.ArrayLikeObservable = ArrayLikeObservable;
