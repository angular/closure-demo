goog.module('_angular$platform_browser$testing$browser__static');
var core_1 = goog.require('_angular$core');
var compiler_1 = goog.require('_angular$compiler');
var browser_common_1 = goog.require('_angular$platform_browser$src$browser__common');
var browser_adapter_1 = goog.require('_angular$platform_browser$src$browser$browser__adapter');
var animation_builder_1 = goog.require('_angular$platform_browser$src$animate$animation__builder');
var animation_builder_mock_1 = goog.require('_angular$platform_browser$testing$animation__builder__mock');
var testing_1 = goog.require('_angular$compiler$testing');
var testing_2 = testing_1;
var testing_3 = goog.require('_angular$common$testing');
var common_1 = goog.require('_angular$common');
var testing_4 = goog.require('_angular$core$testing');
var testing_5 = testing_1;
var browser_util_1 = goog.require('_angular$platform_browser$testing$browser__util');
var testing_6 = testing_4;
var ng_probe_1 = goog.require('_angular$platform_browser$src$dom$debug$ng__probe');
var testing_7 = testing_1;
var dom_test_component_renderer_1 = goog.require('_angular$platform_browser$testing$dom__test__component__renderer');
var lang_1 = goog.require('_angular$platform_browser$src$facade$lang');
/**
 * @return {?}
 */
function initBrowserTests() {
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
    browser_util_1.BrowserDetection.setup();
}
/**
 * @return {?}
 */
function createNgZone() {
    return lang_1.IS_DART ? new testing_4.MockNgZone() : new core_1.NgZone({ enableLongStackTrace: true });
}
var testing_8 = testing_1;
exports.TestComponentRenderer = testing_8.TestComponentRenderer;
/**
 * Default platform providers for testing without a compiler.
 */
exports.TEST_BROWSER_STATIC_PLATFORM_PROVIDERS = 
/*@ts2dart_const*/ [
    core_1.PLATFORM_COMMON_PROVIDERS,
    /*@ts2dart_Provider*/ { provide: core_1.PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true }
];
exports.ADDITIONAL_TEST_BROWSER_PROVIDERS = 
/*@ts2dart_const*/ [
    /*@ts2dart_Provider*/ { provide: core_1.APP_ID, useValue: 'a' },
    ng_probe_1.ELEMENT_PROBE_PROVIDERS,
    /*@ts2dart_Provider*/ { provide: compiler_1.DirectiveResolver, useClass: testing_1.MockDirectiveResolver },
    /*@ts2dart_Provider*/ { provide: compiler_1.ViewResolver, useClass: testing_2.MockViewResolver },
    testing_6.Log,
    testing_5.TestComponentBuilder,
    /*@ts2dart_Provider*/ { provide: core_1.NgZone, useFactory: createNgZone },
    /*@ts2dart_Provider*/ { provide: common_1.LocationStrategy, useClass: testing_3.MockLocationStrategy },
    /*@ts2dart_Provider*/ { provide: animation_builder_1.AnimationBuilder, useClass: animation_builder_mock_1.MockAnimationBuilder },
    /*@ts2dart_Provider*/ { provide: testing_7.TestComponentRenderer, useClass: dom_test_component_renderer_1.DOMTestComponentRenderer }
];
/**
 * Default application providers for testing without a compiler.
 */
exports.TEST_BROWSER_STATIC_APPLICATION_PROVIDERS = 
/*@ts2dart_const*/ [browser_common_1.BROWSER_APP_COMMON_PROVIDERS, exports.ADDITIONAL_TEST_BROWSER_PROVIDERS];
//# sourceMappingURL=browser_static.js.map