goog.module('_angular$common$src$pipes$uppercase__pipe');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var invalid_pipe_argument_exception_1 = goog.require('_angular$common$src$pipes$invalid__pipe__argument__exception');
class UpperCasePipe {
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        if (lang_1.isBlank(value))
            return value;
        if (!lang_1.isString(value)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(UpperCasePipe, value);
        }
        return value.toUpperCase();
    }
}
UpperCasePipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'uppercase' },] },
    { type: core_1.Injectable },
];
exports.UpperCasePipe = UpperCasePipe;
//# sourceMappingURL=uppercase_pipe.js.map