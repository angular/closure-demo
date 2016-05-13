goog.module('_angular$common$src$location$location');
var core_1 = goog.require('_angular$core');
var async_1 = goog.require('_angular$common$src$facade$async');
var location_strategy_1 = goog.require('_angular$common$src$location$location__strategy');
class Location {
    /**
     * @param {?} platformStrategy
     */
    constructor(platformStrategy) {
        this.platformStrategy = platformStrategy;
        /** @internal */
        this._subject = new async_1.EventEmitter();
        var browserBaseHref = this.platformStrategy.getBaseHref();
        this._baseHref = Location.stripTrailingSlash(_stripIndexHtml(browserBaseHref));
        this.platformStrategy.onPopState((ev) => {
            async_1.ObservableWrapper.callEmit(this._subject, { 'url': this.path(), 'pop': true, 'type': ev.type });
        });
    }
    /**
     *  Returns the normalized URL path.
     * @return {?}
     */
    path() { return this.normalize(this.platformStrategy.path()); }
    /**
     *  Given a string representing a URL, returns the normalized URL path without leading or trailing slashes
     * @param {?} url
     * @return {?}
     */
    normalize(url) {
        return Location.stripTrailingSlash(_stripBaseHref(this._baseHref, _stripIndexHtml(url)));
    }
    /**
     *  Given a string representing a URL, returns the platform-specific external URL path. If the given URL doesn't begin with a leading slash (`'/'`), this method adds one before normalizing. This method will also add a hash if `HashLocationStrategy` is used, or the `APP_BASE_HREF` if the `PathLocationStrategy` is in use.
     * @param {?} url
     * @return {?}
     */
    prepareExternalUrl(url) {
        if (url.length > 0 && !url.startsWith('/')) {
            url = '/' + url;
        }
        return this.platformStrategy.prepareExternalUrl(url);
    }
    /**
     *  Changes the browsers URL to the normalized version of the given URL, and pushes a new item onto the platform's history.
     * @param {?} path
     * @param {?=} query
     * @return {?}
     */
    go(path, query = '') {
        this.platformStrategy.pushState(null, '', path, query);
    }
    /**
     *  Changes the browsers URL to the normalized version of the given URL, and replaces the top item on the platform's history stack.
     * @param {?} path
     * @param {?=} query
     * @return {?}
     */
    replaceState(path, query = '') {
        this.platformStrategy.replaceState(null, '', path, query);
    }
    /**
     *  Navigates forward in the platform's history.
     * @return {?}
     */
    forward() { this.platformStrategy.forward(); }
    /**
     *  Navigates back in the platform's history.
     * @return {?}
     */
    back() { this.platformStrategy.back(); }
    /**
     *  Subscribe to the platform's `popState` events.
     * @param {?} onNext
     * @param {?=} onThrow
     * @param {?=} onReturn
     * @return {?}
     */
    subscribe(onNext, onThrow = null, onReturn = null) {
        return async_1.ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
    }
    /**
     *  Given a string of url parameters, prepend with '?' if needed, otherwise return parameters as is.
     * @param {?} params
     * @return {?}
     */
    static normalizeQueryParams(params) {
        return (params.length > 0 && params.substring(0, 1) != '?') ? ('?' + params) : params;
    }
    /**
     *  Given 2 parts of a url, join them with a slash if needed.
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    static joinWithSlash(start, end) {
        if (start.length == 0) {
            return end;
        }
        if (end.length == 0) {
            return start;
        }
        var /** @type {?} */ slashes = 0;
        if (start.endsWith('/')) {
            slashes++;
        }
        if (end.startsWith('/')) {
            slashes++;
        }
        if (slashes == 2) {
            return start + end.substring(1);
        }
        if (slashes == 1) {
            return start + end;
        }
        return start + '/' + end;
    }
    /**
     *  If url has a trailing slash, remove it, otherwise return url as is.
     * @param {?} url
     * @return {?}
     */
    static stripTrailingSlash(url) {
        if (/\/$/g.test(url)) {
            url = url.substring(0, url.length - 1);
        }
        return url;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        Location.prototype._subject;
        /** @internal
        @type {?} */
        Location.prototype._baseHref;
        /** @type {?} */
        Location.prototype.platformStrategy;
    }
}
/** @nocollapse */ Location.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ Location.ctorParameters = [
    { type: location_strategy_1.LocationStrategy, },
];
exports.Location = Location;
/**
 * @param {?} baseHref
 * @param {?} url
 * @return {?}
 */
function _stripBaseHref(baseHref, url) {
    if (baseHref.length > 0 && url.startsWith(baseHref)) {
        return url.substring(baseHref.length);
    }
    return url;
}
/**
 * @param {?} url
 * @return {?}
 */
function _stripIndexHtml(url) {
    if (/\/index.html$/g.test(url)) {
        // '/index.html'.length == 11
        return url.substring(0, url.length - 11);
    }
    return url;
}
//# sourceMappingURL=location.js.map