goog.module('_angular$core$src$change__detection$change__detection__util');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var collection_1 = goog.require('_angular$core$src$facade$collection');
var lang_2 = lang_1;
exports.looseIdentical = lang_2.looseIdentical;
exports.uninitialized = new Object();
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function devModeEqual(a, b) {
    if (collection_1.isListLikeIterable(a) && collection_1.isListLikeIterable(b)) {
        return collection_1.areIterablesEqual(a, b, devModeEqual);
    }
    else if (!collection_1.isListLikeIterable(a) && !lang_1.isPrimitive(a) && !collection_1.isListLikeIterable(b) &&
        !lang_1.isPrimitive(b)) {
        return true;
    }
    else {
        return lang_1.looseIdentical(a, b);
    }
}
exports.devModeEqual = devModeEqual;
/**
 * Indicates that the result of a {@link PipeMetadata} transformation has changed even though the
 * reference
 * has not changed.
 *
 * The wrapped value will be unwrapped by change detection, and the unwrapped value will be stored.
 *
 * Example:
 *
 * ```
 * if (this._latestValue === this._latestReturnedValue) {
 *    return this._latestReturnedValue;
 *  } else {
 *    this._latestReturnedValue = this._latestValue;
 *    return WrappedValue.wrap(this._latestValue); // this will force update
 *  }
 * ```
 */
class WrappedValue {
    /**
     * @param {?} wrapped
     */
    constructor(wrapped) {
        this.wrapped = wrapped;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static wrap(value) { return new WrappedValue(value); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        WrappedValue.prototype.wrapped;
    }
}
exports.WrappedValue = WrappedValue;
/**
 * Helper class for unwrapping WrappedValue s
 */
class ValueUnwrapper {
    constructor() {
        this.hasWrappedValue = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    unwrap(value) {
        if (value instanceof WrappedValue) {
            this.hasWrappedValue = true;
            return value.wrapped;
        }
        return value;
    }
    /**
     * @return {?}
     */
    reset() { this.hasWrappedValue = false; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ValueUnwrapper.prototype.hasWrappedValue;
    }
}
exports.ValueUnwrapper = ValueUnwrapper;
/**
 * Represents a basic change from a previous to a new value.
 */
class SimpleChange {
    /**
     * @param {?} previousValue
     * @param {?} currentValue
     */
    constructor(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
    }
    /**
     *  Check whether the new value is the first value assigned.
     * @return {?}
     */
    isFirstChange() { return this.previousValue === exports.uninitialized; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SimpleChange.prototype.previousValue;
        /** @type {?} */
        SimpleChange.prototype.currentValue;
    }
}
exports.SimpleChange = SimpleChange;
//# sourceMappingURL=change_detection_util.js.map