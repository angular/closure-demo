goog.module('_angular$common$testing$location__mock');
var core_1 = goog.require('_angular$core');
var async_1 = goog.require('_angular$common$src$facade$async');
class SpyLocation {
    constructor() {
        this.urlChanges = [];
        /** @internal */
        this._path = '';
        /** @internal */
        this._query = '';
        /** @internal */
        this._subject = new core_1.EventEmitter();
        /** @internal */
        this._baseHref = '';
        // TODO: remove these once Location is an interface, and can be implemented cleanly
        this.platformStrategy = null;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    setInitialPath(url) { this._path = url; }
    /**
     * @param {?} url
     * @return {?}
     */
    setBaseHref(url) { this._baseHref = url; }
    /**
     * @return {?}
     */
    path() { return this._path; }
    /**
     * @param {?} pathname
     * @return {?}
     */
    simulateUrlPop(pathname) {
        async_1.ObservableWrapper.callEmit(this._subject, { 'url': pathname, 'pop': true });
    }
    /**
     * @param {?} pathname
     * @return {?}
     */
    simulateHashChange(pathname) {
        // Because we don't prevent the native event, the browser will independently update the path
        this.setInitialPath(pathname);
        this.urlChanges.push('hash: ' + pathname);
        async_1.ObservableWrapper.callEmit(this._subject, { 'url': pathname, 'pop': true, 'type': 'hashchange' });
    }
    /**
     * @param {?} url
     * @return {?}
     */
    prepareExternalUrl(url) {
        if (url.length > 0 && !url.startsWith('/')) {
            url = '/' + url;
        }
        return this._baseHref + url;
    }
    /**
     * @param {?} path
     * @param {?=} query
     * @return {?}
     */
    go(path, query = '') {
        path = this.prepareExternalUrl(path);
        if (this._path == path && this._query == query) {
            return;
        }
        this._path = path;
        this._query = query;
        var /** @type {?} */ url = path + (query.length > 0 ? ('?' + query) : '');
        this.urlChanges.push(url);
    }
    /**
     * @param {?} path
     * @param {?=} query
     * @return {?}
     */
    replaceState(path, query = '') {
        path = this.prepareExternalUrl(path);
        this._path = path;
        this._query = query;
        var /** @type {?} */ url = path + (query.length > 0 ? ('?' + query) : '');
        this.urlChanges.push('replace: ' + url);
    }
    /**
     * @return {?}
     */
    forward() {
        // TODO
    }
    /**
     * @return {?}
     */
    back() {
        // TODO
    }
    /**
     * @param {?} onNext
     * @param {?=} onThrow
     * @param {?=} onReturn
     * @return {?}
     */
    subscribe(onNext, onThrow = null, onReturn = null) {
        return async_1.ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
    }
    /**
     * @param {?} url
     * @return {?}
     */
    normalize(url) { return null; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SpyLocation.prototype.urlChanges;
        /** @internal
        @type {?} */
        SpyLocation.prototype._path;
        /** @internal
        @type {?} */
        SpyLocation.prototype._query;
        /** @internal
        @type {?} */
        SpyLocation.prototype._subject;
        /** @internal
        @type {?} */
        SpyLocation.prototype._baseHref;
        /** @type {?} */
        SpyLocation.prototype.platformStrategy;
    }
}
/** @nocollapse */ SpyLocation.decorators = [
    { type: core_1.Injectable },
];
exports.SpyLocation = SpyLocation;
//# sourceMappingURL=location_mock.js.map