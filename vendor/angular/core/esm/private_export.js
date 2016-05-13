goog.module('_angular$core$private__export');
var constants = goog.require('_angular$core$src$change__detection$constants');
var security = goog.require('_angular$core$src$security');
var reflective_provider = goog.require('_angular$core$src$di$reflective__provider');
var lifecycle_hooks = goog.require('_angular$core$src$metadata$lifecycle__hooks');
var reflector_reader = goog.require('_angular$core$src$reflection$reflector__reader');
var component_resolver = goog.require('_angular$core$src$linker$component__resolver');
var element = goog.require('_angular$core$src$linker$element');
var view = goog.require('_angular$core$src$linker$view');
var view_type = goog.require('_angular$core$src$linker$view__type');
var view_utils = goog.require('_angular$core$src$linker$view__utils');
var metadata_view = goog.require('_angular$core$src$metadata$view');
var debug_context = goog.require('_angular$core$src$linker$debug__context');
var change_detection_util = goog.require('_angular$core$src$change__detection$change__detection__util');
var api = goog.require('_angular$core$src$render$api');
var template_ref = goog.require('_angular$core$src$linker$template__ref');
var wtf_init = goog.require('_angular$core$src$profile$wtf__init');
var reflection_capabilities = goog.require('_angular$core$src$reflection$reflection__capabilities');
var decorators = goog.require('_angular$core$src$util$decorators');
var debug = goog.require('_angular$core$src$debug$debug__renderer');
var provider_util = goog.require('_angular$core$src$di$provider__util');
var console = goog.require('_angular$core$src$console');
exports.__core_private__ = {
    isDefaultChangeDetectionStrategy: constants.isDefaultChangeDetectionStrategy,
    ChangeDetectorState: constants.ChangeDetectorState,
    CHANGE_DETECTION_STRATEGY_VALUES: constants.CHANGE_DETECTION_STRATEGY_VALUES,
    constructDependencies: reflective_provider.constructDependencies,
    LifecycleHooks: lifecycle_hooks.LifecycleHooks,
    LIFECYCLE_HOOKS_VALUES: lifecycle_hooks.LIFECYCLE_HOOKS_VALUES,
    ReflectorReader: reflector_reader.ReflectorReader,
    ReflectorComponentResolver: component_resolver.ReflectorComponentResolver,
    AppElement: element.AppElement,
    AppView: view.AppView,
    DebugAppView: view.DebugAppView,
    ViewType: view_type.ViewType,
    MAX_INTERPOLATION_VALUES: view_utils.MAX_INTERPOLATION_VALUES,
    checkBinding: view_utils.checkBinding,
    flattenNestedViewRenderNodes: view_utils.flattenNestedViewRenderNodes,
    interpolate: view_utils.interpolate,
    ViewUtils: view_utils.ViewUtils,
    VIEW_ENCAPSULATION_VALUES: metadata_view.VIEW_ENCAPSULATION_VALUES,
    DebugContext: debug_context.DebugContext,
    StaticNodeDebugInfo: debug_context.StaticNodeDebugInfo,
    devModeEqual: change_detection_util.devModeEqual,
    uninitialized: change_detection_util.uninitialized,
    ValueUnwrapper: change_detection_util.ValueUnwrapper,
    RenderDebugInfo: api.RenderDebugInfo,
    SecurityContext: security.SecurityContext,
    SanitizationService: security.SanitizationService,
    TemplateRef_: template_ref.TemplateRef_,
    wtfInit: wtf_init.wtfInit,
    ReflectionCapabilities: reflection_capabilities.ReflectionCapabilities,
    makeDecorator: decorators.makeDecorator,
    DebugDomRootRenderer: debug.DebugDomRootRenderer,
    createProvider: provider_util.createProvider,
    isProviderLiteral: provider_util.isProviderLiteral,
    EMPTY_ARRAY: view_utils.EMPTY_ARRAY,
    EMPTY_MAP: view_utils.EMPTY_MAP,
    pureProxy1: view_utils.pureProxy1,
    pureProxy2: view_utils.pureProxy2,
    pureProxy3: view_utils.pureProxy3,
    pureProxy4: view_utils.pureProxy4,
    pureProxy5: view_utils.pureProxy5,
    pureProxy6: view_utils.pureProxy6,
    pureProxy7: view_utils.pureProxy7,
    pureProxy8: view_utils.pureProxy8,
    pureProxy9: view_utils.pureProxy9,
    pureProxy10: view_utils.pureProxy10,
    castByValue: view_utils.castByValue,
    Console: console.Console,
};
//# sourceMappingURL=private_export.js.map