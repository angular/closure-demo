goog.module('_angular$compiler$testing$directive__resolver__mock');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var core_1 = goog.require('_angular$core');
var directive_resolver_1 = goog.require('_angular$compiler$src$directive__resolver');
class MockDirectiveResolver extends directive_resolver_1.DirectiveResolver {
    constructor(...args) {
        super(...args);
        this._providerOverrides = new collection_1.Map();
        this.viewProviderOverrides = new collection_1.Map();
    }
    /**
     * @param {?} type
     * @return {?}
     */
    resolve(type) {
        var /** @type {?} */ dm = super.resolve(type);
        var /** @type {?} */ providerOverrides = this._providerOverrides.get(type);
        var /** @type {?} */ viewProviderOverrides = this.viewProviderOverrides.get(type);
        var /** @type {?} */ providers = dm.providers;
        if (lang_1.isPresent(providerOverrides)) {
            var /** @type {?} */ originalViewProviders = lang_1.isPresent(dm.providers) ? dm.providers : [];
            providers = originalViewProviders.concat(providerOverrides);
        }
        if (dm instanceof core_1.ComponentMetadata) {
            var /** @type {?} */ viewProviders = dm.viewProviders;
            if (lang_1.isPresent(viewProviderOverrides)) {
                var /** @type {?} */ originalViewProviders = lang_1.isPresent(dm.viewProviders) ? dm.viewProviders : [];
                viewProviders = originalViewProviders.concat(viewProviderOverrides);
            }
            return new core_1.ComponentMetadata({
                selector: dm.selector,
                inputs: dm.inputs,
                outputs: dm.outputs,
                host: dm.host,
                exportAs: dm.exportAs,
                moduleId: dm.moduleId,
                queries: dm.queries,
                changeDetection: dm.changeDetection,
                providers: providers,
                viewProviders: viewProviders
            });
        }
        return new core_1.DirectiveMetadata({
            selector: dm.selector,
            inputs: dm.inputs,
            outputs: dm.outputs,
            host: dm.host,
            providers: providers,
            exportAs: dm.exportAs,
            queries: dm.queries
        });
    }
    /**
     * @deprecated
     * @param {?} type
     * @param {?} bindings
     * @return {?}
     */
    setBindingsOverride(type, bindings) {
        this._providerOverrides.set(type, bindings);
    }
    /**
     * @deprecated
     * @param {?} type
     * @param {?} viewBindings
     * @return {?}
     */
    setViewBindingsOverride(type, viewBindings) {
        this.viewProviderOverrides.set(type, viewBindings);
    }
    /**
     * @param {?} type
     * @param {?} providers
     * @return {?}
     */
    setProvidersOverride(type, providers) {
        this._providerOverrides.set(type, providers);
    }
    /**
     * @param {?} type
     * @param {?} viewProviders
     * @return {?}
     */
    setViewProvidersOverride(type, viewProviders) {
        this.viewProviderOverrides.set(type, viewProviders);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        MockDirectiveResolver.prototype._providerOverrides;
        /** @type {?} */
        MockDirectiveResolver.prototype.viewProviderOverrides;
    }
}
MockDirectiveResolver.decorators = [
    { type: core_1.Injectable },
];
exports.MockDirectiveResolver = MockDirectiveResolver;
//# sourceMappingURL=directive_resolver_mock.js.map