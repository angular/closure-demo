goog.module('_angular$common$src$pipes$async__pipe');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var async_1 = goog.require('_angular$common$src$facade$async');
var invalid_pipe_argument_exception_1 = goog.require('_angular$common$src$pipes$invalid__pipe__argument__exception');
class ObservableStrategy {
    /**
     * @param {?} async
     * @param {?} updateLatestValue
     * @return {?}
     */
    createSubscription(async, updateLatestValue) {
        return async_1.ObservableWrapper.subscribe(async, updateLatestValue, e => { throw e; });
    }
    /**
     * @param {?} subscription
     * @return {?}
     */
    dispose(subscription) { async_1.ObservableWrapper.dispose(subscription); }
    /**
     * @param {?} subscription
     * @return {?}
     */
    onDestroy(subscription) { async_1.ObservableWrapper.dispose(subscription); }
}
class PromiseStrategy {
    /**
     * @param {?} async
     * @param {?} updateLatestValue
     * @return {?}
     */
    createSubscription(async, updateLatestValue) {
        return async.then(updateLatestValue);
    }
    /**
     * @param {?} subscription
     * @return {?}
     */
    dispose(subscription) { }
    /**
     * @param {?} subscription
     * @return {?}
     */
    onDestroy(subscription) { }
}
var /** @type {?} */ _promiseStrategy = new PromiseStrategy();
var /** @type {?} */ _observableStrategy = new ObservableStrategy();
var /** @type {?} */ __unused;
class AsyncPipe {
    /**
     * @param {?} _ref
     */
    constructor(_ref) {
        /** @internal */
        this._latestValue = null;
        /** @internal */
        this._latestReturnedValue = null;
        /** @internal */
        this._subscription = null;
        /** @internal */
        this._obj = null;
        this._strategy = null;
        this._ref = _ref;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (lang_1.isPresent(this._subscription)) {
            this._dispose();
        }
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    transform(obj) {
        if (lang_1.isBlank(this._obj)) {
            if (lang_1.isPresent(obj)) {
                this._subscribe(obj);
            }
            this._latestReturnedValue = this._latestValue;
            return this._latestValue;
        }
        if (obj !== this._obj) {
            this._dispose();
            return this.transform(obj);
        }
        if (this._latestValue === this._latestReturnedValue) {
            return this._latestReturnedValue;
        }
        else {
            this._latestReturnedValue = this._latestValue;
            return core_1.WrappedValue.wrap(this._latestValue);
        }
    }
    /**
     * @internal
     * @param {?} obj
     * @return {?}
     */
    _subscribe(obj) {
        this._obj = obj;
        this._strategy = this._selectStrategy(obj);
        this._subscription = this._strategy.createSubscription(obj, (value) => this._updateLatestValue(obj, value));
    }
    /**
     * @internal
     * @param {?} obj
     * @return {?}
     */
    _selectStrategy(obj) {
        if (lang_1.isPromise(obj)) {
            return _promiseStrategy;
        }
        else if (async_1.ObservableWrapper.isObservable(obj)) {
            return _observableStrategy;
        }
        else {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(AsyncPipe, obj);
        }
    }
    /**
     * @internal
     * @return {?}
     */
    _dispose() {
        this._strategy.dispose(this._subscription);
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._obj = null;
    }
    /**
     * @internal
     * @param {?} async
     * @param {?} value
     * @return {?}
     */
    _updateLatestValue(async, value) {
        if (async === this._obj) {
            this._latestValue = value;
            this._ref.markForCheck();
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        AsyncPipe.prototype._latestValue;
        /** @internal
        @type {?} */
        AsyncPipe.prototype._latestReturnedValue;
        /** @internal
        @type {?} */
        AsyncPipe.prototype._subscription;
        /** @internal
        @type {?} */
        AsyncPipe.prototype._obj;
        /** @type {?} */
        AsyncPipe.prototype._strategy;
        /** @internal
        @type {?} */
        AsyncPipe.prototype._ref;
    }
}
/** @nocollapse */ AsyncPipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'async', pure: false },] },
    { type: core_1.Injectable },
];
/** @nocollapse */ AsyncPipe.ctorParameters = [
    { type: core_1.ChangeDetectorRef, },
];
exports.AsyncPipe = AsyncPipe;
//# sourceMappingURL=async_pipe.js.map