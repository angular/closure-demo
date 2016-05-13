goog.module('_angular$common$src$pipes$slice__pipe');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var collection_1 = goog.require('_angular$common$src$facade$collection');
var invalid_pipe_argument_exception_1 = goog.require('_angular$common$src$pipes$invalid__pipe__argument__exception');
class SlicePipe {
    /**
     * @param {?} value
     * @param {?} start
     * @param {?=} end
     * @return {?}
     */
    transform(value, start, end = null) {
        if (!this.supports(value)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(SlicePipe, value);
        }
        if (lang_1.isBlank(value))
            return value;
        if (lang_1.isString(value)) {
            return lang_1.StringWrapper.slice(value, start, end);
        }
        return collection_1.ListWrapper.slice(value, start, end);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    supports(obj) { return lang_1.isString(obj) || lang_1.isArray(obj); }
}
/** @nocollapse */ SlicePipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'slice', pure: false },] },
    { type: core_1.Injectable },
];
exports.SlicePipe = SlicePipe;
//# sourceMappingURL=slice_pipe.js.map