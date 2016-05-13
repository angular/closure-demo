goog.module('_angular$common$testing$mock__location__strategy');
var core_1 = goog.require('_angular$core');
var async_1 = goog.require('_angular$common$src$facade$async');
var index_1 = goog.require('_angular$common');
class MockLocationStrategy extends index_1.LocationStrategy {
    /**
     */
    constructor() {
        super();
        this.internalBaseHref = '/';
        this.internalPath = '/';
        this.internalTitle = '';
        this.urlChanges = [];
        /** @internal */
        this._subject = new async_1.EventEmitter();
    }
    /**
     * @param {?} url
     * @return {?}
     */
    simulatePopState(url) {
        this.internalPath = url;
        async_1.ObservableWrapper.callEmit(this._subject, new _MockPopStateEvent(this.path()));
    }
    /**
     * @return {?}
     */
    path() { return this.internalPath; }
    /**
     * @param {?} internal
     * @return {?}
     */
    prepareExternalUrl(internal) {
        if (internal.startsWith('/') && this.internalBaseHref.endsWith('/')) {
            return this.internalBaseHref + internal.substring(1);
        }
        return this.internalBaseHref + internal;
    }
    /**
     * @param {?} ctx
     * @param {?} title
     * @param {?} path
     * @param {?} query
     * @return {?}
     */
    pushState(ctx, title, path, query) {
        this.internalTitle = title;
        var /** @type {?} */ url = path + (query.length > 0 ? ('?' + query) : '');
        this.internalPath = url;
        var /** @type {?} */ externalUrl = this.prepareExternalUrl(url);
        this.urlChanges.push(externalUrl);
    }
    /**
     * @param {?} ctx
     * @param {?} title
     * @param {?} path
     * @param {?} query
     * @return {?}
     */
    replaceState(ctx, title, path, query) {
        this.internalTitle = title;
        var /** @type {?} */ url = path + (query.length > 0 ? ('?' + query) : '');
        this.internalPath = url;
        var /** @type {?} */ externalUrl = this.prepareExternalUrl(url);
        this.urlChanges.push('replace: ' + externalUrl);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onPopState(fn) { async_1.ObservableWrapper.subscribe(this._subject, fn); }
    /**
     * @return {?}
     */
    getBaseHref() { return this.internalBaseHref; }
    /**
     * @return {?}
     */
    back() {
        if (this.urlChanges.length > 0) {
            this.urlChanges.pop();
            var /** @type {?} */ nextUrl = this.urlChanges.length > 0 ? this.urlChanges[this.urlChanges.length - 1] : '';
            this.simulatePopState(nextUrl);
        }
    }
    /**
     * @return {?}
     */
    forward() { throw 'not implemented'; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        MockLocationStrategy.prototype.internalBaseHref;
        /** @type {?} */
        MockLocationStrategy.prototype.internalPath;
        /** @type {?} */
        MockLocationStrategy.prototype.internalTitle;
        /** @type {?} */
        MockLocationStrategy.prototype.urlChanges;
        /** @internal
        @type {?} */
        MockLocationStrategy.prototype._subject;
    }
}
MockLocationStrategy.decorators = [
    { type: core_1.Injectable },
];
MockLocationStrategy.ctorParameters = [];
exports.MockLocationStrategy = MockLocationStrategy;
class _MockPopStateEvent {
    /**
     * @param {?} newUrl
     */
    constructor(newUrl) {
        this.newUrl = newUrl;
        this.pop = true;
        this.type = 'popstate';
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _MockPopStateEvent.prototype.pop;
        /** @type {?} */
        _MockPopStateEvent.prototype.type;
        /** @type {?} */
        _MockPopStateEvent.prototype.newUrl;
    }
}
//# sourceMappingURL=mock_location_strategy.js.map