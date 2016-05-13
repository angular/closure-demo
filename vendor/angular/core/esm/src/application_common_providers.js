goog.module('_angular$core$src$application__common__providers');
var application_tokens_1 = goog.require('_angular$core$src$application__tokens');
var application_ref_1 = goog.require('_angular$core$src$application__ref');
var change_detection_1 = goog.require('_angular$core$src$change__detection$change__detection');
var view_utils_1 = goog.require('_angular$core$src$linker$view__utils');
var component_resolver_1 = goog.require('_angular$core$src$linker$component__resolver');
var dynamic_component_loader_1 = goog.require('_angular$core$src$linker$dynamic__component__loader');
let /** @type {?} */ __unused; // avoid unused import when Type union types are erased
/**
 * A default set of providers which should be included in any Angular
 * application, regardless of the platform it runs onto.
 */
exports.APPLICATION_COMMON_PROVIDERS = 
/*@ts2dart_const*/ [
    application_ref_1.APPLICATION_CORE_PROVIDERS,
    /* @ts2dart_Provider */ { provide: component_resolver_1.ComponentResolver, useClass: component_resolver_1.ReflectorComponentResolver },
    application_tokens_1.APP_ID_RANDOM_PROVIDER,
    view_utils_1.ViewUtils,
    /* @ts2dart_Provider */ { provide: change_detection_1.IterableDiffers, useValue: change_detection_1.defaultIterableDiffers },
    /* @ts2dart_Provider */ { provide: change_detection_1.KeyValueDiffers, useValue: change_detection_1.defaultKeyValueDiffers },
    /* @ts2dart_Provider */ { provide: dynamic_component_loader_1.DynamicComponentLoader, useClass: dynamic_component_loader_1.DynamicComponentLoader_ }
];
//# sourceMappingURL=application_common_providers.js.map