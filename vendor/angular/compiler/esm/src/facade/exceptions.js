goog.module('_angular$compiler$src$facade$exceptions');
var base_wrapped_exception_1 = goog.require('_angular$compiler$src$facade$base__wrapped__exception');
var exception_handler_1 = goog.require('_angular$compiler$src$facade$exception__handler');
var exception_handler_2 = exception_handler_1;
exports.ExceptionHandler = exception_handler_2.ExceptionHandler;
class BaseException extends Error {
    /**
     * @param {?=} message
     */
    constructor(message = "--") {
        super(message);
        this.message = message;
        this.stack = (new Error(message)).stack;
    }
    /**
     * @return {?}
     */
    toString() { return this.message; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BaseException.prototype.stack;
        /** @type {?} */
        BaseException.prototype.message;
    }
}
exports.BaseException = BaseException;
/**
 * Wraps an exception and provides additional context or information.
 */
class WrappedException extends base_wrapped_exception_1.BaseWrappedException {
    /**
     * @param {?} _wrapperMessage
     * @param {?} _originalException
     * @param {?=} _originalStack
     * @param {?=} _context
     */
    constructor(_wrapperMessage, _originalException, _originalStack, _context) {
        super(_wrapperMessage);
        this._wrapperMessage = _wrapperMessage;
        this._originalException = _originalException;
        this._originalStack = _originalStack;
        this._context = _context;
        this._wrapperStack = (new Error(_wrapperMessage)).stack;
    }
    get wrapperMessage() { return this._wrapperMessage; }
    get wrapperStack() { return this._wrapperStack; }
    get originalException() { return this._originalException; }
    get originalStack() { return this._originalStack; }
    get context() { return this._context; }
    get message() { return exception_handler_1.ExceptionHandler.exceptionToString(this); }
    /**
     * @return {?}
     */
    toString() { return this.message; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        WrappedException.prototype._wrapperStack;
        /** @type {?} */
        WrappedException.prototype._wrapperMessage;
        /** @type {?} */
        WrappedException.prototype._originalException;
        /** @type {?} */
        WrappedException.prototype._originalStack;
        /** @type {?} */
        WrappedException.prototype._context;
    }
}
exports.WrappedException = WrappedException;
/**
 * @param {?=} message
 * @return {?}
 */
function makeTypeError(message) {
    return new TypeError(message);
}
exports.makeTypeError = makeTypeError;
/**
 * @return {?}
 */
function unimplemented() {
    throw new BaseException('unimplemented');
}
exports.unimplemented = unimplemented;
//# sourceMappingURL=exceptions.js.map