goog.module('_angular$core$src$linker$component__resolver');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var exceptions_1 = goog.require('_angular$core$src$facade$exceptions');
var async_1 = goog.require('_angular$core$src$facade$async');
var reflection_1 = goog.require('_angular$core$src$reflection$reflection');
var component_factory_1 = goog.require('_angular$core$src$linker$component__factory');
var decorators_1 = goog.require('_angular$core$src$di$decorators');
/**
 * Low-level service for loading {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 */
class ComponentResolver {
}
exports.ComponentResolver = ComponentResolver;
/**
 * @param {?} type
 * @return {?}
 */
function _isComponentFactory(type) {
    return type instanceof component_factory_1.ComponentFactory;
}
class ReflectorComponentResolver extends ComponentResolver {
    /**
     * @param {?} component
     * @return {?}
     */
    resolveComponent(component) {
        if (lang_1.isString(component)) {
            return async_1.PromiseWrapper.reject(new exceptions_1.BaseException(`Cannot resolve component using '${component}'.`), null);
        }
        var /** @type {?} */ metadatas = reflection_1.reflector.annotations(/** @type {?} */ (component));
        var /** @type {?} */ componentFactory = metadatas.find(_isComponentFactory);
        if (lang_1.isBlank(componentFactory)) {
            throw new exceptions_1.BaseException(`No precompiled component ${lang_1.stringify(component)} found`);
        }
        return async_1.PromiseWrapper.resolve(componentFactory);
    }
    /**
     * @return {?}
     */
    clearCache() { }
}
ReflectorComponentResolver.decorators = [
    { type: decorators_1.Injectable },
];
exports.ReflectorComponentResolver = ReflectorComponentResolver;
//# sourceMappingURL=component_resolver.js.map