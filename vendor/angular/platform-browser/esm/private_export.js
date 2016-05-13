goog.module('_angular$platform_browser$private__export');
var animation_builder = goog.require('_angular$platform_browser$src$animate$animation__builder');
var css_animation_builder = goog.require('_angular$platform_browser$src$animate$css__animation__builder');
var browser_details = goog.require('_angular$platform_browser$src$animate$browser__details');
var css_animation_options = goog.require('_angular$platform_browser$src$animate$css__animation__options');
var animation = goog.require('_angular$platform_browser$src$animate$animation');
var dom_adapter = goog.require('_angular$platform_browser$src$dom$dom__adapter');
var browser_adapter = goog.require('_angular$platform_browser$src$browser$browser__adapter');
var __platform_browser_private__;
(function (__platform_browser_private__) {
    __platform_browser_private__.DomAdapter = dom_adapter.DomAdapter;
    /**
     * @return {?}
     */
    function getDOM() { return dom_adapter.getDOM(); }
    __platform_browser_private__.getDOM = getDOM;
    /**
     * @param {?} adapter
     * @return {?}
     */
    function setDOM(adapter) { return dom_adapter.setDOM(adapter); }
    __platform_browser_private__.setDOM = setDOM;
    __platform_browser_private__.setRootDomAdapter = dom_adapter.setRootDomAdapter;
    __platform_browser_private__.BrowserDomAdapter = browser_adapter.BrowserDomAdapter;
    __platform_browser_private__.AnimationBuilder = animation_builder.AnimationBuilder;
    __platform_browser_private__.CssAnimationBuilder = css_animation_builder.CssAnimationBuilder;
    __platform_browser_private__.CssAnimationOptions = css_animation_options.CssAnimationOptions;
    __platform_browser_private__.Animation = animation.Animation;
    __platform_browser_private__.BrowserDetails = browser_details.BrowserDetails;
})(__platform_browser_private__ = exports.__platform_browser_private__ || (exports.__platform_browser_private__ = {}));
//# sourceMappingURL=private_export.js.map