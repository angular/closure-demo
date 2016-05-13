goog.module('_angular$platform_browser$src$platform__browser');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$platform_browser$src$facade$lang');
var browser_common_1 = goog.require('_angular$platform_browser$src$browser__common');
var dom_events_1 = goog.require('_angular$platform_browser$src$dom$events$dom__events');
exports.DomEventsPlugin = dom_events_1.DomEventsPlugin;
var event_manager_1 = goog.require('_angular$platform_browser$src$dom$events$event__manager');
exports.EventManager = event_manager_1.EventManager;
exports.EVENT_MANAGER_PLUGINS = event_manager_1.EVENT_MANAGER_PLUGINS;
var ng_probe_1 = goog.require('_angular$platform_browser$src$dom$debug$ng__probe');
exports.ELEMENT_PROBE_PROVIDERS = ng_probe_1.ELEMENT_PROBE_PROVIDERS;
var browser_common_2 = browser_common_1;
exports.BROWSER_APP_COMMON_PROVIDERS = browser_common_2.BROWSER_APP_COMMON_PROVIDERS;
exports.BROWSER_SANITIZATION_PROVIDERS = browser_common_2.BROWSER_SANITIZATION_PROVIDERS;
exports.BROWSER_PROVIDERS = browser_common_2.BROWSER_PROVIDERS;
exports.By = browser_common_2.By;
exports.Title = browser_common_2.Title;
exports.enableDebugTools = browser_common_2.enableDebugTools;
exports.disableDebugTools = browser_common_2.disableDebugTools;
exports.HAMMER_GESTURE_CONFIG = browser_common_2.HAMMER_GESTURE_CONFIG;
exports.HammerGestureConfig = browser_common_2.HammerGestureConfig;
var private_export_1 = goog.require('_angular$platform_browser$private__export');
exports.__platform_browser_private__ = private_export_1.__platform_browser_private__;
var dom_tokens_1 = goog.require('_angular$platform_browser$src$dom$dom__tokens');
exports.DOCUMENT = dom_tokens_1.DOCUMENT;
var dom_sanitization_service_1 = goog.require('_angular$platform_browser$src$security$dom__sanitization__service');
exports.DomSanitizationService = dom_sanitization_service_1.DomSanitizationService;
exports.SecurityContext = dom_sanitization_service_1.SecurityContext;
var platform_browser_static_1 = goog.require('_angular$platform_browser$src$platform__browser__static');
exports.bootstrapStatic = platform_browser_static_1.bootstrapStatic;
exports.browserStaticPlatform = platform_browser_static_1.browserStaticPlatform;
exports.BROWSER_APP_STATIC_PROVIDERS = platform_browser_static_1.BROWSER_APP_STATIC_PROVIDERS;
exports.BrowserPlatformLocation = platform_browser_static_1.BrowserPlatformLocation;
/**
 * @return {?}
 */
function browserPlatform() {
    if (lang_1.isBlank(core_1.getPlatform())) {
        core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(browser_common_1.BROWSER_PROVIDERS));
    }
    return core_1.assertPlatform(browser_common_1.BROWSER_PLATFORM_MARKER);
}
exports.browserPlatform = browserPlatform;
//# sourceMappingURL=platform_browser.js.map