goog.module('rxjs$observable$FromObservable');
var isArray_1 = goog.require('rxjs$util$isArray');
var isFunction_1 = goog.require('rxjs$util$isFunction');
var isPromise_1 = goog.require('rxjs$util$isPromise');
var isScheduler_1 = goog.require('rxjs$util$isScheduler');
var PromiseObservable_1 = goog.require('rxjs$observable$PromiseObservable');
var IteratorObservable_1 = goog.require('rxjs$observable$IteratorObservable');
var ArrayObservable_1 = goog.require('rxjs$observable$ArrayObservable');
var ArrayLikeObservable_1 = goog.require('rxjs$observable$ArrayLikeObservable');
var observable_1 = goog.require('rxjs$symbol$observable');
var iterator_1 = goog.require('rxjs$symbol$iterator');
var Observable_1 = goog.require('rxjs$Observable');
var observeOn_1 = goog.require('rxjs$operator$observeOn');
const /** @type {?} */ isArrayLike = ((x) => x && typeof x.length === 'number');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
class FromObservable extends Observable_1.Observable {
    /**
     * @param {?} ish
     * @param {?} scheduler
     */
    constructor(ish, scheduler) {
        super(null);
        this.ish = ish;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} ish
     * @param {?=} mapFnOrScheduler
     * @param {?=} thisArg
     * @param {?=} lastScheduler
     * @return {?}
     */
    static create(ish, mapFnOrScheduler, thisArg, lastScheduler) {
        let /** @type {?} */ scheduler = null;
        let /** @type {?} */ mapFn = null;
        if (isFunction_1.isFunction(mapFnOrScheduler)) {
            scheduler = lastScheduler || null;
            mapFn = (mapFnOrScheduler);
        }
        else if (isScheduler_1.isScheduler(scheduler)) {
            scheduler = (mapFnOrScheduler);
        }
        if (ish != null) {
            if (typeof ish[observable_1.$$observable] === 'function') {
                if (ish instanceof Observable_1.Observable && !scheduler) {
                    return ish;
                }
                return new FromObservable(ish, scheduler);
            }
            else if (isArray_1.isArray(ish)) {
                return new ArrayObservable_1.ArrayObservable(ish, scheduler);
            }
            else if (isPromise_1.isPromise(ish)) {
                return new PromiseObservable_1.PromiseObservable(ish, scheduler);
            }
            else if (typeof ish[iterator_1.$$iterator] === 'function' || typeof ish === 'string') {
                return new IteratorObservable_1.IteratorObservable(/** @type {?} */ (ish), null, null, scheduler);
            }
            else if (isArrayLike(ish)) {
                return new ArrayLikeObservable_1.ArrayLikeObservable(ish, mapFn, thisArg, scheduler);
            }
        }
        throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ ish = this.ish;
        const /** @type {?} */ scheduler = this.scheduler;
        if (scheduler == null) {
            return ish[observable_1.$$observable]().subscribe(subscriber);
        }
        else {
            return ish[observable_1.$$observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        FromObservable.prototype.ish;
        /** @type {?} */
        FromObservable.prototype.scheduler;
    }
}
exports.FromObservable = FromObservable;
