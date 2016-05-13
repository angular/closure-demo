goog.module('_angular$core$src$di$reflective__provider');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var collection_1 = goog.require('_angular$core$src$facade$collection');
var reflection_1 = goog.require('_angular$core$src$reflection$reflection');
var reflective_key_1 = goog.require('_angular$core$src$di$reflective__key');
var metadata_1 = goog.require('_angular$core$src$di$metadata');
var reflective_exceptions_1 = goog.require('_angular$core$src$di$reflective__exceptions');
var forward_ref_1 = goog.require('_angular$core$src$di$forward__ref');
var provider_1 = goog.require('_angular$core$src$di$provider');
var provider_util_1 = goog.require('_angular$core$src$di$provider__util');
/**
 * `Dependency` is used by the framework to extend DI.
 * This is internal to Angular and should not be used directly.
 */
class ReflectiveDependency {
    /**
     * @param {?} key
     * @param {?} optional
     * @param {?} lowerBoundVisibility
     * @param {?} upperBoundVisibility
     * @param {?} properties
     */
    constructor(key, optional, lowerBoundVisibility, upperBoundVisibility, properties) {
        this.key = key;
        this.optional = optional;
        this.lowerBoundVisibility = lowerBoundVisibility;
        this.upperBoundVisibility = upperBoundVisibility;
        this.properties = properties;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    static fromKey(key) {
        return new ReflectiveDependency(key, false, null, null, []);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ReflectiveDependency.prototype.key;
        /** @type {?} */
        ReflectiveDependency.prototype.optional;
        /** @type {?} */
        ReflectiveDependency.prototype.lowerBoundVisibility;
        /** @type {?} */
        ReflectiveDependency.prototype.upperBoundVisibility;
        /** @type {?} */
        ReflectiveDependency.prototype.properties;
    }
}
exports.ReflectiveDependency = ReflectiveDependency;
const /** @type {?} */ _EMPTY_LIST = [];
class ResolvedReflectiveProvider_ {
    /**
     * @param {?} key
     * @param {?} resolvedFactories
     * @param {?} multiProvider
     */
    constructor(key, resolvedFactories, multiProvider) {
        this.key = key;
        this.resolvedFactories = resolvedFactories;
        this.multiProvider = multiProvider;
    }
    get resolvedFactory() { return this.resolvedFactories[0]; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ResolvedReflectiveProvider_.prototype.key;
        /** @type {?} */
        ResolvedReflectiveProvider_.prototype.resolvedFactories;
        /** @type {?} */
        ResolvedReflectiveProvider_.prototype.multiProvider;
    }
}
exports.ResolvedReflectiveProvider_ = ResolvedReflectiveProvider_;
/**
 * An internal resolved representation of a factory function created by resolving {@link Provider}.
 */
class ResolvedReflectiveFactory {
    /**
     * @param {?} factory
     * @param {?} dependencies
     */
    constructor(factory, dependencies) {
        this.factory = factory;
        this.dependencies = dependencies;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** Factory function which can return an instance of an object represented by a key.
        @type {?} */
        ResolvedReflectiveFactory.prototype.factory;
        /** Arguments (dependencies) to the `factory` function.
        @type {?} */
        ResolvedReflectiveFactory.prototype.dependencies;
    }
}
exports.ResolvedReflectiveFactory = ResolvedReflectiveFactory;
/**
 *  Resolve a single provider.
 * @param {?} provider
 * @return {?}
 */
function resolveReflectiveFactory(provider) {
    var /** @type {?} */ factoryFn;
    var /** @type {?} */ resolvedDeps;
    if (lang_1.isPresent(provider.useClass)) {
        var /** @type {?} */ useClass = forward_ref_1.resolveForwardRef(provider.useClass);
        factoryFn = reflection_1.reflector.factory(useClass);
        resolvedDeps = _dependenciesFor(useClass);
    }
    else if (lang_1.isPresent(provider.useExisting)) {
        factoryFn = (aliasInstance) => aliasInstance;
        resolvedDeps = [ReflectiveDependency.fromKey(reflective_key_1.ReflectiveKey.get(provider.useExisting))];
    }
    else if (lang_1.isPresent(provider.useFactory)) {
        factoryFn = provider.useFactory;
        resolvedDeps = constructDependencies(provider.useFactory, provider.dependencies);
    }
    else {
        factoryFn = () => provider.useValue;
        resolvedDeps = _EMPTY_LIST;
    }
    return new ResolvedReflectiveFactory(factoryFn, resolvedDeps);
}
exports.resolveReflectiveFactory = resolveReflectiveFactory;
/**
 *  Converts the {@link Provider} into {@link ResolvedProvider}. * {@link Injector} internally only uses {@link ResolvedProvider}, {@link Provider} contains convenience provider syntax.
 * @param {?} provider
 * @return {?}
 */
function resolveReflectiveProvider(provider) {
    return new ResolvedReflectiveProvider_(reflective_key_1.ReflectiveKey.get(provider.token), [resolveReflectiveFactory(provider)], provider.multi);
}
exports.resolveReflectiveProvider = resolveReflectiveProvider;
/**
 *  Resolve a list of Providers.
 * @param {?} providers
 * @return {?}
 */
function resolveReflectiveProviders(providers) {
    var /** @type {?} */ normalized = _normalizeProviders(providers, []);
    var /** @type {?} */ resolved = normalized.map(resolveReflectiveProvider);
    return collection_1.MapWrapper.values(mergeResolvedReflectiveProviders(resolved, new Map()));
}
exports.resolveReflectiveProviders = resolveReflectiveProviders;
/**
 *  Merges a list of ResolvedProviders into a list where each key is contained exactly once and multi providers have been merged.
 * @param {?} providers
 * @param {?} normalizedProvidersMap
 * @return {?}
 */
function mergeResolvedReflectiveProviders(providers, normalizedProvidersMap) {
    for (var /** @type {?} */ i = 0; i < providers.length; i++) {
        var /** @type {?} */ provider = providers[i];
        var /** @type {?} */ existing = normalizedProvidersMap.get(provider.key.id);
        if (lang_1.isPresent(existing)) {
            if (provider.multiProvider !== existing.multiProvider) {
                throw new reflective_exceptions_1.MixingMultiProvidersWithRegularProvidersError(existing, provider);
            }
            if (provider.multiProvider) {
                for (var /** @type {?} */ j = 0; j < provider.resolvedFactories.length; j++) {
                    existing.resolvedFactories.push(provider.resolvedFactories[j]);
                }
            }
            else {
                normalizedProvidersMap.set(provider.key.id, provider);
            }
        }
        else {
            var /** @type {?} */ resolvedProvider;
            if (provider.multiProvider) {
                resolvedProvider = new ResolvedReflectiveProvider_(provider.key, collection_1.ListWrapper.clone(provider.resolvedFactories), provider.multiProvider);
            }
            else {
                resolvedProvider = provider;
            }
            normalizedProvidersMap.set(provider.key.id, resolvedProvider);
        }
    }
    return normalizedProvidersMap;
}
exports.mergeResolvedReflectiveProviders = mergeResolvedReflectiveProviders;
/**
 * @param {?} providers
 * @param {?} res
 * @return {?}
 */
function _normalizeProviders(providers, res) {
    providers.forEach(b => {
        if (b instanceof lang_1.Type) {
            res.push(provider_1.provide(b, { useClass: b }));
        }
        else if (b instanceof provider_1.Provider) {
            res.push(b);
        }
        else if (provider_util_1.isProviderLiteral(b)) {
            res.push(provider_util_1.createProvider(b));
        }
        else if (b instanceof Array) {
            _normalizeProviders(b, res);
        }
        else if (b instanceof provider_1.ProviderBuilder) {
            throw new reflective_exceptions_1.InvalidProviderError(b.token);
        }
        else {
            throw new reflective_exceptions_1.InvalidProviderError(b);
        }
    });
    return res;
}
/**
 * @param {?} typeOrFunc
 * @param {?} dependencies
 * @return {?}
 */
function constructDependencies(typeOrFunc, dependencies) {
    if (lang_1.isBlank(dependencies)) {
        return _dependenciesFor(typeOrFunc);
    }
    else {
        var /** @type {?} */ params = dependencies.map(t => [t]);
        return dependencies.map(t => _extractToken(typeOrFunc, t, params));
    }
}
exports.constructDependencies = constructDependencies;
/**
 * @param {?} typeOrFunc
 * @return {?}
 */
function _dependenciesFor(typeOrFunc) {
    var /** @type {?} */ params = reflection_1.reflector.parameters(typeOrFunc);
    if (lang_1.isBlank(params))
        return [];
    if (params.some(lang_1.isBlank)) {
        throw new reflective_exceptions_1.NoAnnotationError(typeOrFunc, params);
    }
    return params.map((p) => _extractToken(typeOrFunc, p, params));
}
/**
 * @param {?} typeOrFunc
 * @param {?} metadata
 * @param {?} params
 * @return {?}
 */
function _extractToken(typeOrFunc, metadata /*any[] | any*/, params) {
    var /** @type {?} */ depProps = [];
    var /** @type {?} */ token = null;
    var /** @type {?} */ optional = false;
    if (!lang_1.isArray(metadata)) {
        if (metadata instanceof metadata_1.InjectMetadata) {
            return _createDependency(metadata.token, optional, null, null, depProps);
        }
        else {
            return _createDependency(metadata, optional, null, null, depProps);
        }
    }
    var /** @type {?} */ lowerBoundVisibility = null;
    var /** @type {?} */ upperBoundVisibility = null;
    for (var /** @type {?} */ i = 0; i < metadata.length; ++i) {
        var /** @type {?} */ paramMetadata = metadata[i];
        if (paramMetadata instanceof lang_1.Type) {
            token = paramMetadata;
        }
        else if (paramMetadata instanceof metadata_1.InjectMetadata) {
            token = paramMetadata.token;
        }
        else if (paramMetadata instanceof metadata_1.OptionalMetadata) {
            optional = true;
        }
        else if (paramMetadata instanceof metadata_1.SelfMetadata) {
            upperBoundVisibility = paramMetadata;
        }
        else if (paramMetadata instanceof metadata_1.HostMetadata) {
            upperBoundVisibility = paramMetadata;
        }
        else if (paramMetadata instanceof metadata_1.SkipSelfMetadata) {
            lowerBoundVisibility = paramMetadata;
        }
        else if (paramMetadata instanceof metadata_1.DependencyMetadata) {
            if (lang_1.isPresent(paramMetadata.token)) {
                token = paramMetadata.token;
            }
            depProps.push(paramMetadata);
        }
    }
    token = forward_ref_1.resolveForwardRef(token);
    if (lang_1.isPresent(token)) {
        return _createDependency(token, optional, lowerBoundVisibility, upperBoundVisibility, depProps);
    }
    else {
        throw new reflective_exceptions_1.NoAnnotationError(typeOrFunc, params);
    }
}
/**
 * @param {?} token
 * @param {?} optional
 * @param {?} lowerBoundVisibility
 * @param {?} upperBoundVisibility
 * @param {?} depProps
 * @return {?}
 */
function _createDependency(token, optional, lowerBoundVisibility, upperBoundVisibility, depProps) {
    return new ReflectiveDependency(reflective_key_1.ReflectiveKey.get(token), optional, lowerBoundVisibility, upperBoundVisibility, depProps);
}
//# sourceMappingURL=reflective_provider.js.map