goog.module('_angular$common$src$location$hash__location__strategy');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var location_strategy_1 = goog.require('_angular$common$src$location$location__strategy');
var location_1 = goog.require('_angular$common$src$location$location');
var platform_location_1 = goog.require('_angular$common$src$location$platform__location');
class HashLocationStrategy extends location_strategy_1.LocationStrategy {
    /**
     * @param {?} _platformLocation
     * @param {?=} _baseHref
     */
    constructor(_platformLocation, _baseHref) {
        super();
        this._platformLocation = _platformLocation;
        this._baseHref = '';
        if (lang_1.isPresent(_baseHref)) {
            this._baseHref = _baseHref;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onPopState(fn) {
        this._platformLocation.onPopState(fn);
        this._platformLocation.onHashChange(fn);
    }
    /**
     * @return {?}
     */
    getBaseHref() { return this._baseHref; }
    /**
     * @return {?}
     */
    path() {
        // the hash value is always prefixed with a `#`
        // and if it is empty then it will stay empty
        var /** @type {?} */ path = this._platformLocation.hash;
        if (!lang_1.isPresent(path))
            path = '#';
        // Dart will complain if a call to substring is
        // executed with a position value that extends the
        // length of string.
        return (path.length > 0 ? path.substring(1) : path);
    }
    /**
     * @param {?} internal
     * @return {?}
     */
    prepareExternalUrl(internal) {
        var /** @type {?} */ url = location_1.Location.joinWithSlash(this._baseHref, internal);
        return url.length > 0 ? ('#' + url) : url;
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} path
     * @param {?} queryParams
     * @return {?}
     */
    pushState(state, title, path, queryParams) {
        var /** @type {?} */ url = this.prepareExternalUrl(path + location_1.Location.normalizeQueryParams(queryParams));
        if (url.length == 0) {
            url = this._platformLocation.pathname;
        }
        this._platformLocation.pushState(state, title, url);
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} path
     * @param {?} queryParams
     * @return {?}
     */
    replaceState(state, title, path, queryParams) {
        var /** @type {?} */ url = this.prepareExternalUrl(path + location_1.Location.normalizeQueryParams(queryParams));
        if (url.length == 0) {
            url = this._platformLocation.pathname;
        }
        this._platformLocation.replaceState(state, title, url);
    }
    /**
     * @return {?}
     */
    forward() { this._platformLocation.forward(); }
    /**
     * @return {?}
     */
    back() { this._platformLocation.back(); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        HashLocationStrategy.prototype._baseHref;
        /** @type {?} */
        HashLocationStrategy.prototype._platformLocation;
    }
}
/** @nocollapse */ HashLocationStrategy.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ HashLocationStrategy.ctorParameters = [
    { type: platform_location_1.PlatformLocation, },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [location_strategy_1.APP_BASE_HREF,] },] },
];
exports.HashLocationStrategy = HashLocationStrategy;
//# sourceMappingURL=hash_location_strategy.js.map