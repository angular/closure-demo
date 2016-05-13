goog.module('_angular$core$src$linker$systemjs__component__resolver');
var lang_1 = goog.require('_angular$core$src$facade$lang');
/**
 * Component resolver that can load components lazily
 */
class SystemJsComponentResolver {
    /**
     * @param {?} _resolver
     */
    constructor(_resolver) {
        this._resolver = _resolver;
    }
    /**
     * @param {?} componentType
     * @return {?}
     */
    resolveComponent(componentType) {
        if (lang_1.isString(componentType)) {
            return ((lang_1.global)).System.import(componentType).then(module => this._resolver.resolveComponent(module.default));
        }
        else {
            return this._resolver.resolveComponent(/** @type {?} */ (componentType));
        }
    }
    /**
     * @return {?}
     */
    clearCache() { }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SystemJsComponentResolver.prototype._resolver;
    }
}
exports.SystemJsComponentResolver = SystemJsComponentResolver;
//# sourceMappingURL=systemjs_component_resolver.js.map