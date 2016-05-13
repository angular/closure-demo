goog.module('rxjs$observable$SubscribeOnObservable');
var Observable_1 = goog.require('rxjs$Observable');
var asap_1 = goog.require('rxjs$scheduler$asap');
var isNumeric_1 = goog.require('rxjs$util$isNumeric');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
class SubscribeOnObservable extends Observable_1.Observable {
    /**
     * @param {?} source
     * @param {?=} delayTime
     * @param {?=} scheduler
     */
    constructor(source, delayTime = 0, scheduler = asap_1.asap) {
        super();
        this.source = source;
        this.delayTime = delayTime;
        this.scheduler = scheduler;
        if (!isNumeric_1.isNumeric(delayTime) || delayTime < 0) {
            this.delayTime = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            this.scheduler = asap_1.asap;
        }
    }
    /**
     * @param {?} source
     * @param {?=} delay
     * @param {?=} scheduler
     * @return {?}
     */
    static create(source, delay = 0, scheduler = asap_1.asap) {
        return new SubscribeOnObservable(source, delay, scheduler);
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    static dispatch(arg) {
        const { source, subscriber } = arg;
        return source.subscribe(subscriber);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ delay = this.delayTime;
        const /** @type {?} */ source = this.source;
        const /** @type {?} */ scheduler = this.scheduler;
        return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
            source, subscriber
        });
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SubscribeOnObservable.prototype.source;
        /** @type {?} */
        SubscribeOnObservable.prototype.delayTime;
        /** @type {?} */
        SubscribeOnObservable.prototype.scheduler;
    }
}
exports.SubscribeOnObservable = SubscribeOnObservable;
