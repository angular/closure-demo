goog.module('_angular$core$src$linker$dynamic__component__loader');
var component_resolver_1 = goog.require('_angular$core$src$linker$component__resolver');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var reflective_injector_1 = goog.require('_angular$core$src$di$reflective__injector');
var decorators_1 = goog.require('_angular$core$src$di$decorators');
/**
 * Use ComponentResolver and ViewContainerRef directly.
 *
 * @deprecated
 */
class DynamicComponentLoader {
}
exports.DynamicComponentLoader = DynamicComponentLoader;
class DynamicComponentLoader_ extends DynamicComponentLoader {
    /**
     * @param {?} _compiler
     */
    constructor(_compiler) {
        super();
        this._compiler = _compiler;
    }
    /**
     * @param {?} type
     * @param {?} overrideSelectorOrNode
     * @param {?} injector
     * @param {?=} onDispose
     * @param {?=} projectableNodes
     * @return {?}
     */
    loadAsRoot(type, overrideSelectorOrNode, injector, onDispose, projectableNodes) {
        return this._compiler.resolveComponent(type).then(componentFactory => {
            var /** @type {?} */ componentRef = componentFactory.create(injector, projectableNodes, lang_1.isPresent(overrideSelectorOrNode) ? overrideSelectorOrNode : componentFactory.selector);
            if (lang_1.isPresent(onDispose)) {
                componentRef.onDestroy(onDispose);
            }
            return componentRef;
        });
    }
    /**
     * @param {?} type
     * @param {?} location
     * @param {?=} providers
     * @param {?=} projectableNodes
     * @return {?}
     */
    loadNextToLocation(type, location, providers = null, projectableNodes = null) {
        return this._compiler.resolveComponent(type).then(componentFactory => {
            var /** @type {?} */ contextInjector = location.parentInjector;
            var /** @type {?} */ childInjector = lang_1.isPresent(providers) && providers.length > 0 ?
                reflective_injector_1.ReflectiveInjector.fromResolvedProviders(providers, contextInjector) :
                contextInjector;
            return location.createComponent(componentFactory, location.length, childInjector, projectableNodes);
        });
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DynamicComponentLoader_.prototype._compiler;
    }
}
DynamicComponentLoader_.decorators = [
    { type: decorators_1.Injectable },
];
DynamicComponentLoader_.ctorParameters = [
    { type: component_resolver_1.ComponentResolver, },
];
exports.DynamicComponentLoader_ = DynamicComponentLoader_;
//# sourceMappingURL=dynamic_component_loader.js.map