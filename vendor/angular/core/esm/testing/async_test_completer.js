goog.module('_angular$core$testing$async__test__completer');
var promise_1 = goog.require('_angular$core$src$facade$promise');
/**
 * Injectable completer that allows signaling completion of an asynchronous test. Used internally.
 */
class AsyncTestCompleter {
    constructor() {
        this._completer = new promise_1.PromiseCompleter();
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    done(value) { this._completer.resolve(value); }
    /**
     * @param {?=} error
     * @param {?=} stackTrace
     * @return {?}
     */
    fail(error, stackTrace) { this._completer.reject(error, stackTrace); }
    get promise() { return this._completer.promise; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        AsyncTestCompleter.prototype._completer;
    }
}
exports.AsyncTestCompleter = AsyncTestCompleter;
//# sourceMappingURL=async_test_completer.js.map