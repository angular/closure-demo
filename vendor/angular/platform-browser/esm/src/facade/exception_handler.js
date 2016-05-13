goog.module('_angular$platform_browser$src$facade$exception__handler');
var lang_1 = goog.require('_angular$platform_browser$src$facade$lang');
var base_wrapped_exception_1 = goog.require('_angular$platform_browser$src$facade$base__wrapped__exception');
var collection_1 = goog.require('_angular$platform_browser$src$facade$collection');
class _ArrayLogger {
    constructor() {
        this.res = [];
    }
    /**
     * @param {?} s
     * @return {?}
     */
    log(s) { this.res.push(s); }
    /**
     * @param {?} s
     * @return {?}
     */
    logError(s) { this.res.push(s); }
    /**
     * @param {?} s
     * @return {?}
     */
    logGroup(s) { this.res.push(s); }
    /**
     * @return {?}
     */
    logGroupEnd() { }
    ;
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _ArrayLogger.prototype.res;
    }
}
/**
 * Provides a hook for centralized exception handling.
 *
 * The default implementation of `ExceptionHandler` prints error messages to the `Console`. To
 * intercept error handling,
 * write a custom exception handler that replaces this default as appropriate for your app.
 *
 * ### Example
 *
 * ```javascript
 *
 * class MyExceptionHandler implements ExceptionHandler {
 *   call(error, stackTrace = null, reason = null) {
 *     // do something with the exception
 *   }
 * }
 *
 * bootstrap(MyApp, [provide(ExceptionHandler, {useClass: MyExceptionHandler})])
 *
 * ```
 */
class ExceptionHandler {
    /**
     * @param {?} _logger
     * @param {?=} _rethrowException
     */
    constructor(_logger, _rethrowException = true) {
        this._logger = _logger;
        this._rethrowException = _rethrowException;
    }
    /**
     * @param {?} exception
     * @param {?=} stackTrace
     * @param {?=} reason
     * @return {?}
     */
    static exceptionToString(exception, stackTrace = null, reason = null) {
        var /** @type {?} */ l = new _ArrayLogger();
        var /** @type {?} */ e = new ExceptionHandler(l, false);
        e.call(exception, stackTrace, reason);
        return l.res.join("\n");
    }
    /**
     * @param {?} exception
     * @param {?=} stackTrace
     * @param {?=} reason
     * @return {?}
     */
    call(exception, stackTrace = null, reason = null) {
        var /** @type {?} */ originalException = this._findOriginalException(exception);
        var /** @type {?} */ originalStack = this._findOriginalStack(exception);
        var /** @type {?} */ context = this._findContext(exception);
        this._logger.logGroup(`EXCEPTION: ${this._extractMessage(exception)}`);
        if (lang_1.isPresent(stackTrace) && lang_1.isBlank(originalStack)) {
            this._logger.logError("STACKTRACE:");
            this._logger.logError(this._longStackTrace(stackTrace));
        }
        if (lang_1.isPresent(reason)) {
            this._logger.logError(`REASON: ${reason}`);
        }
        if (lang_1.isPresent(originalException)) {
            this._logger.logError(`ORIGINAL EXCEPTION: ${this._extractMessage(originalException)}`);
        }
        if (lang_1.isPresent(originalStack)) {
            this._logger.logError("ORIGINAL STACKTRACE:");
            this._logger.logError(this._longStackTrace(originalStack));
        }
        if (lang_1.isPresent(context)) {
            this._logger.logError("ERROR CONTEXT:");
            this._logger.logError(context);
        }
        this._logger.logGroupEnd();
        // We rethrow exceptions, so operations like 'bootstrap' will result in an error
        // when an exception happens. If we do not rethrow, bootstrap will always succeed.
        if (this._rethrowException)
            throw exception;
    }
    /**
     * @internal
     * @param {?} exception
     * @return {?}
     */
    _extractMessage(exception) {
        return exception instanceof base_wrapped_exception_1.BaseWrappedException ? exception.wrapperMessage :
            exception.toString();
    }
    /**
     * @internal
     * @param {?} stackTrace
     * @return {?}
     */
    _longStackTrace(stackTrace) {
        return collection_1.isListLikeIterable(stackTrace) ? ((stackTrace)).join("\n\n-----async gap-----\n") :
            stackTrace.toString();
    }
    /**
     * @internal
     * @param {?} exception
     * @return {?}
     */
    _findContext(exception) {
        try {
            if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
                return null;
            return lang_1.isPresent(exception.context) ? exception.context :
                this._findContext(exception.originalException);
        }
        catch (e) {
            // exception.context can throw an exception. if it happens, we ignore the context.
            return null;
        }
    }
    /**
     * @internal
     * @param {?} exception
     * @return {?}
     */
    _findOriginalException(exception) {
        if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
            return null;
        var /** @type {?} */ e = exception.originalException;
        while (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
            e = e.originalException;
        }
        return e;
    }
    /**
     * @internal
     * @param {?} exception
     * @return {?}
     */
    _findOriginalStack(exception) {
        if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
            return null;
        var /** @type {?} */ e = exception;
        var /** @type {?} */ stack = exception.originalStack;
        while (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
            e = e.originalException;
            if (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
                stack = e.originalStack;
            }
        }
        return stack;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ExceptionHandler.prototype._logger;
        /** @type {?} */
        ExceptionHandler.prototype._rethrowException;
    }
}
exports.ExceptionHandler = ExceptionHandler;
//# sourceMappingURL=exception_handler.js.map