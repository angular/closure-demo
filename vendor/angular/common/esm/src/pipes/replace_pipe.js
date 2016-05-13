goog.module('_angular$common$src$pipes$replace__pipe');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var invalid_pipe_argument_exception_1 = goog.require('_angular$common$src$pipes$invalid__pipe__argument__exception');
class ReplacePipe {
    /**
     * @param {?} value
     * @param {?} pattern
     * @param {?} replacement
     * @return {?}
     */
    transform(value, pattern, replacement) {
        if (lang_1.isBlank(value)) {
            return value;
        }
        if (!this._supportedInput(value)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(ReplacePipe, value);
        }
        var /** @type {?} */ input = value.toString();
        if (!this._supportedPattern(pattern)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(ReplacePipe, pattern);
        }
        if (!this._supportedReplacement(replacement)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(ReplacePipe, replacement);
        }
        // template fails with literal RegExp e.g /pattern/igm
        // var rgx = pattern instanceof RegExp ? pattern : RegExpWrapper.create(pattern);
        if (lang_1.isFunction(replacement)) {
            var /** @type {?} */ rgxPattern = lang_1.isString(pattern) ? lang_1.RegExpWrapper.create(/** @type {?} */ (pattern)) : (pattern);
            return lang_1.StringWrapper.replaceAllMapped(input, rgxPattern, /** @type {?} */ (replacement));
        }
        if (pattern instanceof RegExp) {
            // use the replaceAll variant
            return lang_1.StringWrapper.replaceAll(input, pattern, /** @type {?} */ (replacement));
        }
        return lang_1.StringWrapper.replace(input, /** @type {?} */ (pattern), /** @type {?} */ (replacement));
    }
    /**
     * @param {?} input
     * @return {?}
     */
    _supportedInput(input) { return lang_1.isString(input) || lang_1.isNumber(input); }
    /**
     * @param {?} pattern
     * @return {?}
     */
    _supportedPattern(pattern) {
        return lang_1.isString(pattern) || pattern instanceof RegExp;
    }
    /**
     * @param {?} replacement
     * @return {?}
     */
    _supportedReplacement(replacement) {
        return lang_1.isString(replacement) || lang_1.isFunction(replacement);
    }
}
ReplacePipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'replace' },] },
    { type: core_1.Injectable },
];
exports.ReplacePipe = ReplacePipe;
//# sourceMappingURL=replace_pipe.js.map