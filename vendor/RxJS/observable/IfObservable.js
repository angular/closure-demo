goog.module('rxjs$observable$IfObservable');
var Observable_1 = goog.require('rxjs$Observable');
var subscribeToResult_1 = goog.require('rxjs$util$subscribeToResult');
var OuterSubscriber_1 = goog.require('rxjs$OuterSubscriber');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
class IfObservable extends Observable_1.Observable {
    /**
     * @param {?} condition
     * @param {?=} thenSource
     * @param {?=} elseSource
     */
    constructor(condition, thenSource, elseSource) {
        super();
        this.condition = condition;
        this.thenSource = thenSource;
        this.elseSource = elseSource;
    }
    /**
     * @param {?} condition
     * @param {?=} thenSource
     * @param {?=} elseSource
     * @return {?}
     */
    static create(condition, thenSource, elseSource) {
        return new IfObservable(condition, thenSource, elseSource);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const { condition, thenSource, elseSource } = this;
        return new IfSubscriber(subscriber, condition, thenSource, elseSource);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        IfObservable.prototype.condition;
        /** @type {?} */
        IfObservable.prototype.thenSource;
        /** @type {?} */
        IfObservable.prototype.elseSource;
    }
}
exports.IfObservable = IfObservable;
class IfSubscriber extends OuterSubscriber_1.OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} condition
     * @param {?=} thenSource
     * @param {?=} elseSource
     */
    constructor(destination, condition, thenSource, elseSource) {
        super(destination);
        this.condition = condition;
        this.thenSource = thenSource;
        this.elseSource = elseSource;
        this.tryIf();
    }
    /**
     * @return {?}
     */
    tryIf() {
        const { condition, thenSource, elseSource } = this;
        let /** @type {?} */ result;
        try {
            result = (condition());
            const /** @type {?} */ source = result ? thenSource : elseSource;
            if (source) {
                this.add(subscribeToResult_1.subscribeToResult(this, source));
            }
            else {
                this._complete();
            }
        }
        catch (err) {
            this._error(err);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        IfSubscriber.prototype.condition;
        /** @type {?} */
        IfSubscriber.prototype.thenSource;
        /** @type {?} */
        IfSubscriber.prototype.elseSource;
    }
}
