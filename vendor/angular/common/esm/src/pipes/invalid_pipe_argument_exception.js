goog.module('_angular$common$src$pipes$invalid__pipe__argument__exception');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var exceptions_1 = goog.require('_angular$common$src$facade$exceptions');
class InvalidPipeArgumentException extends exceptions_1.BaseException {
    /**
     * @param {?} type
     * @param {?} value
     */
    constructor(type, value) {
        super(`Invalid argument '${value}' for pipe '${lang_1.stringify(type)}'`);
    }
}
exports.InvalidPipeArgumentException = InvalidPipeArgumentException;
//# sourceMappingURL=invalid_pipe_argument_exception.js.map