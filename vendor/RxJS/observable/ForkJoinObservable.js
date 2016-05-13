goog.module('rxjs$observable$ForkJoinObservable');
var Observable_1 = goog.require('rxjs$Observable');
var EmptyObservable_1 = goog.require('rxjs$observable$EmptyObservable');
var isArray_1 = goog.require('rxjs$util$isArray');
var subscribeToResult_1 = goog.require('rxjs$util$subscribeToResult');
var OuterSubscriber_1 = goog.require('rxjs$OuterSubscriber');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
class ForkJoinObservable extends Observable_1.Observable {
    /**
     * @param {?} sources
     * @param {?=} resultSelector
     */
    constructor(sources, resultSelector) {
        super();
        this.sources = sources;
        this.resultSelector = resultSelector;
    }
    /**
     * @static true
     * @name forkJoin
     * @owner Observable
     * @param {...?} sources
     * @return {?}
     */
    static create(...sources) {
        if (sources === null || arguments.length === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        let /** @type {?} */ resultSelector = null;
        if (typeof sources[sources.length - 1] === 'function') {
            resultSelector = (sources.pop());
        }
        // if the first and only other argument besides the resultSelector is an array
        // assume it's been called with `forkJoin([obs1, obs2, obs3], resultSelector)`
        if (sources.length === 1 && isArray_1.isArray(sources[0])) {
            sources = (sources[0]);
        }
        if (sources.length === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        return new ForkJoinObservable(/** @type {?} */ (sources), resultSelector);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        return new ForkJoinSubscriber(subscriber, this.sources, this.resultSelector);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ForkJoinObservable.prototype.sources;
        /** @type {?} */
        ForkJoinObservable.prototype.resultSelector;
    }
}
exports.ForkJoinObservable = ForkJoinObservable;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class ForkJoinSubscriber extends OuterSubscriber_1.OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} sources
     * @param {?=} resultSelector
     */
    constructor(destination, sources, resultSelector) {
        super(destination);
        this.sources = sources;
        this.resultSelector = resultSelector;
        this.completed = 0;
        this.haveValues = 0;
        const len = sources.length;
        this.total = len;
        this.values = new Array(len);
        for (let i = 0; i < len; i++) {
            const source = sources[i];
            const innerSubscription = subscribeToResult_1.subscribeToResult(this, source, null, i);
            if (innerSubscription) {
                innerSubscription.outerIndex = i;
                this.add(innerSubscription);
            }
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
        if (!((innerSub))._hasValue) {
            ((innerSub))._hasValue = true;
            this.haveValues++;
        }
    }
    /**
     * @param {?} innerSub
     * @return {?}
     */
    notifyComplete(innerSub) {
        const /** @type {?} */ destination = this.destination;
        const { haveValues, resultSelector, values } = this;
        const /** @type {?} */ len = values.length;
        if (!((innerSub))._hasValue) {
            destination.complete();
            return;
        }
        this.completed++;
        if (this.completed !== len) {
            return;
        }
        if (haveValues === len) {
            const /** @type {?} */ value = resultSelector ? resultSelector.apply(this, values) : values;
            destination.next(value);
        }
        destination.complete();
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ForkJoinSubscriber.prototype.completed;
        /** @type {?} */
        ForkJoinSubscriber.prototype.total;
        /** @type {?} */
        ForkJoinSubscriber.prototype.values;
        /** @type {?} */
        ForkJoinSubscriber.prototype.haveValues;
        /** @type {?} */
        ForkJoinSubscriber.prototype.sources;
        /** @type {?} */
        ForkJoinSubscriber.prototype.resultSelector;
    }
}
