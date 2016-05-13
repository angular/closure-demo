goog.module('_angular$platform_browser$src$dom$debug$ng__probe');
var core_1 = goog.require('_angular$core');
var core_private_1 = goog.require('_angular$platform_browser$core__private');
var lang_1 = goog.require('_angular$platform_browser$src$facade$lang');
var dom_adapter_1 = goog.require('_angular$platform_browser$src$dom$dom__adapter');
var dom_renderer_1 = goog.require('_angular$platform_browser$src$dom$dom__renderer');
const /** @type {?} */ CORE_TOKENS = { 'ApplicationRef': core_1.ApplicationRef, 'NgZone': core_1.NgZone };
const /** @type {?} */ INSPECT_GLOBAL_NAME = 'ng.probe';
const /** @type {?} */ CORE_TOKENS_GLOBAL_NAME = 'ng.coreTokens';
/**
 *  Returns a {@link DebugElement} for the given native DOM element, or null if the given native element does not have an Angular view associated with it.
 * @param {?} element
 * @return {?}
 */
function inspectNativeElement(element) {
    return core_1.getDebugNode(element);
}
exports.inspectNativeElement = inspectNativeElement;
/**
 * @param {?} rootRenderer
 * @return {?}
 */
function _createConditionalRootRenderer(rootRenderer) {
    if (lang_1.assertionsEnabled()) {
        return _createRootRenderer(rootRenderer);
    }
    return rootRenderer;
}
/**
 * @param {?} rootRenderer
 * @return {?}
 */
function _createRootRenderer(rootRenderer) {
    dom_adapter_1.getDOM().setGlobalVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
    dom_adapter_1.getDOM().setGlobalVar(CORE_TOKENS_GLOBAL_NAME, CORE_TOKENS);
    return new core_private_1.DebugDomRootRenderer(rootRenderer);
}
/**
 * Providers which support debugging Angular applications (e.g. via `ng.probe`).
 */
exports.ELEMENT_PROBE_PROVIDERS = [
    /*@ts2dart_Provider*/ {
        provide: core_1.RootRenderer,
        useFactory: _createConditionalRootRenderer,
        deps: [dom_renderer_1.DomRootRenderer]
    }
];
exports.ELEMENT_PROBE_PROVIDERS_PROD_MODE = [
    /*@ts2dart_Provider*/ {
        provide: core_1.RootRenderer,
        useFactory: _createRootRenderer,
        deps: [dom_renderer_1.DomRootRenderer]
    }
];
//# sourceMappingURL=ng_probe.js.map