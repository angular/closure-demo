goog.module('_angular$platform_server$src$facade$base__wrapped__exception');
/**
 * A base class for the WrappedException that can be used to identify
 * a WrappedException from ExceptionHandler without adding circular
 * dependency.
 */
class BaseWrappedException extends Error {
    /**
     * @param {?} message
     */
    constructor(message) {
        super(message);
    }
    get wrapperMessage() { return ''; }
    get wrapperStack() { return null; }
    get originalException() { return null; }
    get originalStack() { return null; }
    get context() { return null; }
    get message() { return ''; }
}
exports.BaseWrappedException = BaseWrappedException;
//# sourceMappingURL=base_wrapped_exception.js.map