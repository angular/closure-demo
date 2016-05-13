goog.module('_angular$platform_browser$src$browser$generic__browser__adapter');
var collection_1 = goog.require('_angular$platform_browser$src$facade$collection');
var lang_1 = goog.require('_angular$platform_browser$src$facade$lang');
var dom_adapter_1 = goog.require('_angular$platform_browser$src$dom$dom__adapter');
/**
 * Provides DOM operations in any browser environment.
 */
class GenericBrowserDomAdapter extends dom_adapter_1.DomAdapter {
    /**
     */
    constructor() {
        super();
        this._animationPrefix = null;
        this._transitionEnd = null;
        try {
            var element = this.createElement('div', this.defaultDoc());
            if (lang_1.isPresent(this.getStyle(element, 'animationName'))) {
                this._animationPrefix = '';
            }
            else {
                var domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
                for (var i = 0; i < domPrefixes.length; i++) {
                    if (lang_1.isPresent(this.getStyle(element, domPrefixes[i] + 'AnimationName'))) {
                        this._animationPrefix = '-' + domPrefixes[i].toLowerCase() + '-';
                        break;
                    }
                }
            }
            var transEndEventNames = {
                WebkitTransition: 'webkitTransitionEnd',
                MozTransition: 'transitionend',
                OTransition: 'oTransitionEnd otransitionend',
                transition: 'transitionend'
            };
            collection_1.StringMapWrapper.forEach(transEndEventNames, (value, key) => {
                if (lang_1.isPresent(this.getStyle(element, key))) {
                    this._transitionEnd = value;
                }
            });
        }
        catch (e) {
            this._animationPrefix = null;
            this._transitionEnd = null;
        }
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getDistributedNodes(el) { return ((el)).getDistributedNodes(); }
    /**
     * @param {?} el
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */
    resolveAndSetHref(el, baseUrl, href) {
        el.href = href == null ? baseUrl : baseUrl + '/../' + href;
    }
    /**
     * @return {?}
     */
    supportsDOMEvents() { return true; }
    /**
     * @return {?}
     */
    supportsNativeShadowDOM() {
        return lang_1.isFunction(((this.defaultDoc().body)).createShadowRoot);
    }
    /**
     * @return {?}
     */
    getAnimationPrefix() {
        return lang_1.isPresent(this._animationPrefix) ? this._animationPrefix : "";
    }
    /**
     * @return {?}
     */
    getTransitionEnd() { return lang_1.isPresent(this._transitionEnd) ? this._transitionEnd : ""; }
    /**
     * @return {?}
     */
    supportsAnimation() {
        return lang_1.isPresent(this._animationPrefix) && lang_1.isPresent(this._transitionEnd);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        GenericBrowserDomAdapter.prototype._animationPrefix;
        /** @type {?} */
        GenericBrowserDomAdapter.prototype._transitionEnd;
    }
}
exports.GenericBrowserDomAdapter = GenericBrowserDomAdapter;
//# sourceMappingURL=generic_browser_adapter.js.map