goog.module('_angular$platform_browser$src$platform__browser__static');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$platform_browser$src$facade$lang');
var browser_common_1 = goog.require('_angular$platform_browser$src$browser__common');
var ng_probe_1 = goog.require('_angular$platform_browser$src$dom$debug$ng__probe');
exports.ELEMENT_PROBE_PROVIDERS = ng_probe_1.ELEMENT_PROBE_PROVIDERS;
var browser_platform_location_1 = goog.require('_angular$platform_browser$src$browser$location$browser__platform__location');
exports.BrowserPlatformLocation = browser_platform_location_1.BrowserPlatformLocation;
var browser_common_2 = browser_common_1;
exports.BROWSER_PROVIDERS = browser_common_2.BROWSER_PROVIDERS;
exports.By = browser_common_2.By;
exports.Title = browser_common_2.Title;
exports.enableDebugTools = browser_common_2.enableDebugTools;
exports.disableDebugTools = browser_common_2.disableDebugTools;
/**
 * An array of providers that should be passed into `application()` when bootstrapping a component
 * when all templates
 * have been precompiled offline.
 */
exports.BROWSER_APP_STATIC_PROVIDERS = 
/*@ts2dart_const*/ browser_common_1.BROWSER_APP_COMMON_PROVIDERS;
/**
 * @return {?}
 */
function browserStaticPlatform() {
    if (lang_1.isBlank(core_1.getPlatform())) {
        core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(browser_common_1.BROWSER_PROVIDERS));
    }
    return core_1.assertPlatform(browser_common_1.BROWSER_PLATFORM_MARKER);
}
exports.browserStaticPlatform = browserStaticPlatform;
/**
 *  See {@link bootstrap} for more information.
 * @param {?} appComponentType
 * @param {?=} customProviders
 * @param {?=} initReflector
 * @return {?}
 */
function bootstrapStatic(appComponentType, customProviders, initReflector) {
    if (lang_1.isPresent(initReflector)) {
        initReflector();
    }
    let /** @type {?} */ appProviders = lang_1.isPresent(customProviders) ? [exports.BROWSER_APP_STATIC_PROVIDERS, customProviders] :
        exports.BROWSER_APP_STATIC_PROVIDERS;
    var /** @type {?} */ appInjector = core_1.ReflectiveInjector.resolveAndCreate(appProviders, browserStaticPlatform().injector);
    return core_1.coreLoadAndBootstrap(appInjector, appComponentType);
}
exports.bootstrapStatic = bootstrapStatic;
//# sourceMappingURL=platform_browser_static.js.map