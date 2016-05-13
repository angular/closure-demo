goog.module('_angular$common$src$location$path__location__strategy');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var exceptions_1 = goog.require('_angular$common$src$facade$exceptions');
var platform_location_1 = goog.require('_angular$common$src$location$platform__location');
var location_strategy_1 = goog.require('_angular$common$src$location$location__strategy');
var location_1 = goog.require('_angular$common$src$location$location');
class PathLocationStrategy extends location_strategy_1.LocationStrategy {
    /**
     * @param {?} _platformLocation
     * @param {?=} href
     */
    constructor(_platformLocation, href) {
        super();
        this._platformLocation = _platformLocation;
        if (lang_1.isBlank(href)) {
            href = this._platformLocation.getBaseHrefFromDOM();
        }
        if (lang_1.isBlank(href)) {
            throw new exceptions_1.BaseException(`No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.`);
        }
        this._baseHref = href;
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
     * @param {?} internal
     * @return {?}
     */
    prepareExternalUrl(internal) {
        return location_1.Location.joinWithSlash(this._baseHref, internal);
    }
    /**
     * @return {?}
     */
    path() {
        return this._platformLocation.pathname +
            location_1.Location.normalizeQueryParams(this._platformLocation.search);
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @param {?} queryParams
     * @return {?}
     */
    pushState(state, title, url, queryParams) {
        var /** @type {?} */ externalUrl = this.prepareExternalUrl(url + location_1.Location.normalizeQueryParams(queryParams));
        this._platformLocation.pushState(state, title, externalUrl);
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @param {?} queryParams
     * @return {?}
     */
    replaceState(state, title, url, queryParams) {
        var /** @type {?} */ externalUrl = this.prepareExternalUrl(url + location_1.Location.normalizeQueryParams(queryParams));
        this._platformLocation.replaceState(state, title, externalUrl);
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
        PathLocationStrategy.prototype._baseHref;
        /** @type {?} */
        PathLocationStrategy.prototype._platformLocation;
    }
}
PathLocationStrategy.decorators = [
    { type: core_1.Injectable },
];
PathLocationStrategy.ctorParameters = [
    { type: platform_location_1.PlatformLocation, },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [location_strategy_1.APP_BASE_HREF,] },] },
];
exports.PathLocationStrategy = PathLocationStrategy;
//# sourceMappingURL=path_location_strategy.js.map