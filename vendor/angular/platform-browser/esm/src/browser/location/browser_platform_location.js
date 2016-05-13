goog.module('_angular$platform_browser$src$browser$location$browser__platform__location');
var core_1 = goog.require('_angular$core');
var common_1 = goog.require('_angular$common');
var dom_adapter_1 = goog.require('_angular$platform_browser$src$dom$dom__adapter');
class BrowserPlatformLocation extends common_1.PlatformLocation {
    /**
     */
    constructor() {
        super();
        this._init();
    }
    /**
     * @internal
     * @return {?}
     */
    _init() {
        this._location = dom_adapter_1.getDOM().getLocation();
        this._history = dom_adapter_1.getDOM().getHistory();
    }
    /** @internal */
    get location() { return this._location; }
    /**
     * @return {?}
     */
    getBaseHrefFromDOM() { return dom_adapter_1.getDOM().getBaseHref(); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onPopState(fn) {
        dom_adapter_1.getDOM().getGlobalEventTarget('window').addEventListener('popstate', fn, false);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onHashChange(fn) {
        dom_adapter_1.getDOM().getGlobalEventTarget('window').addEventListener('hashchange', fn, false);
    }
    get pathname() { return this._location.pathname; }
    get search() { return this._location.search; }
    get hash() { return this._location.hash; }
    set pathname(newPath) { this._location.pathname = newPath; }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    pushState(state, title, url) {
        this._history.pushState(state, title, url);
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    replaceState(state, title, url) {
        this._history.replaceState(state, title, url);
    }
    /**
     * @return {?}
     */
    forward() { this._history.forward(); }
    /**
     * @return {?}
     */
    back() { this._history.back(); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BrowserPlatformLocation.prototype._location;
        /** @type {?} */
        BrowserPlatformLocation.prototype._history;
    }
}
BrowserPlatformLocation.decorators = [
    { type: core_1.Injectable },
];
BrowserPlatformLocation.ctorParameters = [];
exports.BrowserPlatformLocation = BrowserPlatformLocation;
//# sourceMappingURL=browser_platform_location.js.map