goog.module('_angular$compiler$src$provider__parser');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var template_ast_1 = goog.require('_angular$compiler$src$template__ast');
var compile_metadata_1 = goog.require('_angular$compiler$src$compile__metadata');
var identifiers_1 = goog.require('_angular$compiler$src$identifiers');
var parse_util_1 = goog.require('_angular$compiler$src$parse__util');
class ProviderError extends parse_util_1.ParseError {
    /**
     * @param {?} message
     * @param {?} span
     */
    constructor(message, span) {
        super(span, message);
    }
}
exports.ProviderError = ProviderError;
class ProviderViewContext {
    /**
     * @param {?} component
     * @param {?} sourceSpan
     */
    constructor(component, sourceSpan) {
        this.component = component;
        this.sourceSpan = sourceSpan;
        this.errors = [];
        this.viewQueries = _getViewQueries(component);
        this.viewProviders = new compile_metadata_1.CompileTokenMap();
        _normalizeProviders(component.viewProviders, sourceSpan, this.errors)
            .forEach((provider) => {
            if (lang_1.isBlank(this.viewProviders.get(provider.token))) {
                this.viewProviders.add(provider.token, true);
            }
        });
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        ProviderViewContext.prototype.viewQueries;
        /** @internal
        @type {?} */
        ProviderViewContext.prototype.viewProviders;
        /** @type {?} */
        ProviderViewContext.prototype.errors;
        /** @type {?} */
        ProviderViewContext.prototype.component;
        /** @type {?} */
        ProviderViewContext.prototype.sourceSpan;
    }
}
exports.ProviderViewContext = ProviderViewContext;
class ProviderElementContext {
    /**
     * @param {?} _viewContext
     * @param {?} _parent
     * @param {?} _isViewRoot
     * @param {?} _directiveAsts
     * @param {?} attrs
     * @param {?} refs
     * @param {?} _sourceSpan
     */
    constructor(_viewContext, _parent, _isViewRoot, _directiveAsts, attrs, refs, _sourceSpan) {
        this._viewContext = _viewContext;
        this._parent = _parent;
        this._isViewRoot = _isViewRoot;
        this._directiveAsts = _directiveAsts;
        this._sourceSpan = _sourceSpan;
        this._transformedProviders = new compile_metadata_1.CompileTokenMap();
        this._seenProviders = new compile_metadata_1.CompileTokenMap();
        this._hasViewContainer = false;
        this._attrs = {};
        attrs.forEach((attrAst) => this._attrs[attrAst.name] = attrAst.value);
        var directivesMeta = _directiveAsts.map(directiveAst => directiveAst.directive);
        this._allProviders =
            _resolveProvidersFromDirectives(directivesMeta, _sourceSpan, _viewContext.errors);
        this._contentQueries = _getContentQueries(directivesMeta);
        var queriedTokens = new compile_metadata_1.CompileTokenMap();
        this._allProviders.values().forEach((provider) => { this._addQueryReadsTo(provider.token, queriedTokens); });
        refs.forEach((refAst) => {
            this._addQueryReadsTo(new compile_metadata_1.CompileTokenMetadata({ value: refAst.name }), queriedTokens);
        });
        if (lang_1.isPresent(queriedTokens.get(identifiers_1.identifierToken(identifiers_1.Identifiers.ViewContainerRef)))) {
            this._hasViewContainer = true;
        }
        // create the providers that we know are eager first
        this._allProviders.values().forEach((provider) => {
            var eager = provider.eager || lang_1.isPresent(queriedTokens.get(provider.token));
            if (eager) {
                this._getOrCreateLocalProvider(provider.providerType, provider.token, true);
            }
        });
    }
    /**
     * @return {?}
     */
    afterElement() {
        // collect lazy providers
        this._allProviders.values().forEach((provider) => {
            this._getOrCreateLocalProvider(provider.providerType, provider.token, false);
        });
    }
    get transformProviders() { return this._transformedProviders.values(); }
    get transformedDirectiveAsts() {
        var /** @type {?} */ sortedProviderTypes = this._transformedProviders.values().map(provider => provider.token.identifier);
        var /** @type {?} */ sortedDirectives = collection_1.ListWrapper.clone(this._directiveAsts);
        collection_1.ListWrapper.sort(sortedDirectives, (dir1, dir2) => sortedProviderTypes.indexOf(dir1.directive.type) -
            sortedProviderTypes.indexOf(dir2.directive.type));
        return sortedDirectives;
    }
    get transformedHasViewContainer() { return this._hasViewContainer; }
    /**
     * @param {?} token
     * @param {?} queryReadTokens
     * @return {?}
     */
    _addQueryReadsTo(token, queryReadTokens) {
        this._getQueriesFor(token).forEach((query) => {
            var /** @type {?} */ queryReadToken = lang_1.isPresent(query.read) ? query.read : token;
            if (lang_1.isBlank(queryReadTokens.get(queryReadToken))) {
                queryReadTokens.add(queryReadToken, true);
            }
        });
    }
    /**
     * @param {?} token
     * @return {?}
     */
    _getQueriesFor(token) {
        var /** @type {?} */ result = [];
        var /** @type {?} */ currentEl = this;
        var /** @type {?} */ distance = 0;
        var /** @type {?} */ queries;
        while (currentEl !== null) {
            queries = currentEl._contentQueries.get(token);
            if (lang_1.isPresent(queries)) {
                collection_1.ListWrapper.addAll(result, queries.filter((query) => query.descendants || distance <= 1));
            }
            if (currentEl._directiveAsts.length > 0) {
                distance++;
            }
            currentEl = currentEl._parent;
        }
        queries = this._viewContext.viewQueries.get(token);
        if (lang_1.isPresent(queries)) {
            collection_1.ListWrapper.addAll(result, queries);
        }
        return result;
    }
    /**
     * @param {?} requestingProviderType
     * @param {?} token
     * @param {?} eager
     * @return {?}
     */
    _getOrCreateLocalProvider(requestingProviderType, token, eager) {
        var /** @type {?} */ resolvedProvider = this._allProviders.get(token);
        if (lang_1.isBlank(resolvedProvider) ||
            ((requestingProviderType === template_ast_1.ProviderAstType.Directive ||
                requestingProviderType === template_ast_1.ProviderAstType.PublicService) &&
                resolvedProvider.providerType === template_ast_1.ProviderAstType.PrivateService) ||
            ((requestingProviderType === template_ast_1.ProviderAstType.PrivateService ||
                requestingProviderType === template_ast_1.ProviderAstType.PublicService) &&
                resolvedProvider.providerType === template_ast_1.ProviderAstType.Builtin)) {
            return null;
        }
        var /** @type {?} */ transformedProviderAst = this._transformedProviders.get(token);
        if (lang_1.isPresent(transformedProviderAst)) {
            return transformedProviderAst;
        }
        if (lang_1.isPresent(this._seenProviders.get(token))) {
            this._viewContext.errors.push(new ProviderError(`Cannot instantiate cyclic dependency! ${token.name}`, this._sourceSpan));
            return null;
        }
        this._seenProviders.add(token, true);
        var /** @type {?} */ transformedProviders = resolvedProvider.providers.map((provider) => {
            var /** @type {?} */ transformedUseValue = provider.useValue;
            var /** @type {?} */ transformedUseExisting = provider.useExisting;
            var /** @type {?} */ transformedDeps;
            if (lang_1.isPresent(provider.useExisting)) {
                var /** @type {?} */ existingDiDep = this._getDependency(resolvedProvider.providerType, new compile_metadata_1.CompileDiDependencyMetadata({ token: provider.useExisting }), eager);
                if (lang_1.isPresent(existingDiDep.token)) {
                    transformedUseExisting = existingDiDep.token;
                }
                else {
                    transformedUseExisting = null;
                    transformedUseValue = existingDiDep.value;
                }
            }
            else if (lang_1.isPresent(provider.useFactory)) {
                var /** @type {?} */ deps = lang_1.isPresent(provider.deps) ? provider.deps : provider.useFactory.diDeps;
                transformedDeps =
                    deps.map((dep) => this._getDependency(resolvedProvider.providerType, dep, eager));
            }
            else if (lang_1.isPresent(provider.useClass)) {
                var /** @type {?} */ deps = lang_1.isPresent(provider.deps) ? provider.deps : provider.useClass.diDeps;
                transformedDeps =
                    deps.map((dep) => this._getDependency(resolvedProvider.providerType, dep, eager));
            }
            return _transformProvider(provider, {
                useExisting: transformedUseExisting,
                useValue: transformedUseValue,
                deps: transformedDeps
            });
        });
        transformedProviderAst =
            _transformProviderAst(resolvedProvider, { eager: eager, providers: transformedProviders });
        this._transformedProviders.add(token, transformedProviderAst);
        return transformedProviderAst;
    }
    /**
     * @param {?} requestingProviderType
     * @param {?} dep
     * @param {?=} eager
     * @return {?}
     */
    _getLocalDependency(requestingProviderType, dep, eager = null) {
        if (dep.isAttribute) {
            var /** @type {?} */ attrValue = this._attrs[dep.token.value];
            return new compile_metadata_1.CompileDiDependencyMetadata({ isValue: true, value: lang_1.normalizeBlank(attrValue) });
        }
        if (lang_1.isPresent(dep.query) || lang_1.isPresent(dep.viewQuery)) {
            return dep;
        }
        if (lang_1.isPresent(dep.token)) {
            // access builtints
            if ((requestingProviderType === template_ast_1.ProviderAstType.Directive ||
                requestingProviderType === template_ast_1.ProviderAstType.Component)) {
                if (dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.Renderer)) ||
                    dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ElementRef)) ||
                    dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ChangeDetectorRef)) ||
                    dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.TemplateRef))) {
                    return dep;
                }
                if (dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ViewContainerRef))) {
                    this._hasViewContainer = true;
                }
            }
            // access the injector
            if (dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.Injector))) {
                return dep;
            }
            // access providers
            if (lang_1.isPresent(this._getOrCreateLocalProvider(requestingProviderType, dep.token, eager))) {
                return dep;
            }
        }
        return null;
    }
    /**
     * @param {?} requestingProviderType
     * @param {?} dep
     * @param {?=} eager
     * @return {?}
     */
    _getDependency(requestingProviderType, dep, eager = null) {
        var /** @type {?} */ currElement = this;
        var /** @type {?} */ currEager = eager;
        var /** @type {?} */ result = null;
        if (!dep.isSkipSelf) {
            result = this._getLocalDependency(requestingProviderType, dep, eager);
        }
        if (dep.isSelf) {
            if (lang_1.isBlank(result) && dep.isOptional) {
                result = new compile_metadata_1.CompileDiDependencyMetadata({ isValue: true, value: null });
            }
        }
        else {
            // check parent elements
            while (lang_1.isBlank(result) && lang_1.isPresent(currElement._parent)) {
                var /** @type {?} */ prevElement = currElement;
                currElement = currElement._parent;
                if (prevElement._isViewRoot) {
                    currEager = false;
                }
                result = currElement._getLocalDependency(template_ast_1.ProviderAstType.PublicService, dep, currEager);
            }
            // check @Host restriction
            if (lang_1.isBlank(result)) {
                if (!dep.isHost || this._viewContext.component.type.isHost ||
                    identifiers_1.identifierToken(this._viewContext.component.type).equalsTo(dep.token) ||
                    lang_1.isPresent(this._viewContext.viewProviders.get(dep.token))) {
                    result = dep;
                }
                else {
                    result = dep.isOptional ?
                        result = new compile_metadata_1.CompileDiDependencyMetadata({ isValue: true, value: null }) :
                        null;
                }
            }
        }
        if (lang_1.isBlank(result)) {
            this._viewContext.errors.push(new ProviderError(`No provider for ${dep.token.name}`, this._sourceSpan));
        }
        return result;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ProviderElementContext.prototype._contentQueries;
        /** @type {?} */
        ProviderElementContext.prototype._transformedProviders;
        /** @type {?} */
        ProviderElementContext.prototype._seenProviders;
        /** @type {?} */
        ProviderElementContext.prototype._allProviders;
        /** @type {?} */
        ProviderElementContext.prototype._attrs;
        /** @type {?} */
        ProviderElementContext.prototype._hasViewContainer;
        /** @type {?} */
        ProviderElementContext.prototype._viewContext;
        /** @type {?} */
        ProviderElementContext.prototype._parent;
        /** @type {?} */
        ProviderElementContext.prototype._isViewRoot;
        /** @type {?} */
        ProviderElementContext.prototype._directiveAsts;
        /** @type {?} */
        ProviderElementContext.prototype._sourceSpan;
    }
}
exports.ProviderElementContext = ProviderElementContext;
/**
 * @param {?} provider
 * @param {?} __1
 * @return {?}
 */
function _transformProvider(provider, { useExisting, useValue, deps }) {
    return new compile_metadata_1.CompileProviderMetadata({
        token: provider.token,
        useClass: provider.useClass,
        useExisting: useExisting,
        useFactory: provider.useFactory,
        useValue: useValue,
        deps: deps,
        multi: provider.multi
    });
}
/**
 * @param {?} provider
 * @param {?} __1
 * @return {?}
 */
function _transformProviderAst(provider, { eager, providers }) {
    return new template_ast_1.ProviderAst(provider.token, provider.multiProvider, provider.eager || eager, providers, provider.providerType, provider.sourceSpan);
}
/**
 * @param {?} providers
 * @param {?} sourceSpan
 * @param {?} targetErrors
 * @param {?=} targetProviders
 * @return {?}
 */
function _normalizeProviders(providers, sourceSpan, targetErrors, targetProviders = null) {
    if (lang_1.isBlank(targetProviders)) {
        targetProviders = [];
    }
    if (lang_1.isPresent(providers)) {
        providers.forEach((provider) => {
            if (lang_1.isArray(provider)) {
                _normalizeProviders(/** @type {?} */ (provider), sourceSpan, targetErrors, targetProviders);
            }
            else {
                var /** @type {?} */ normalizeProvider;
                if (provider instanceof compile_metadata_1.CompileProviderMetadata) {
                    normalizeProvider = provider;
                }
                else if (provider instanceof compile_metadata_1.CompileTypeMetadata) {
                    normalizeProvider = new compile_metadata_1.CompileProviderMetadata({ token: new compile_metadata_1.CompileTokenMetadata({ identifier: provider }), useClass: provider });
                }
                else {
                    targetErrors.push(new ProviderError(`Unknown provider type ${provider}`, sourceSpan));
                }
                if (lang_1.isPresent(normalizeProvider)) {
                    targetProviders.push(normalizeProvider);
                }
            }
        });
    }
    return targetProviders;
}
/**
 * @param {?} directives
 * @param {?} sourceSpan
 * @param {?} targetErrors
 * @return {?}
 */
function _resolveProvidersFromDirectives(directives, sourceSpan, targetErrors) {
    var /** @type {?} */ providersByToken = new compile_metadata_1.CompileTokenMap();
    directives.forEach((directive) => {
        var /** @type {?} */ dirProvider = new compile_metadata_1.CompileProviderMetadata({ token: new compile_metadata_1.CompileTokenMetadata({ identifier: directive.type }), useClass: directive.type });
        _resolveProviders([dirProvider], directive.isComponent ? template_ast_1.ProviderAstType.Component : template_ast_1.ProviderAstType.Directive, true, sourceSpan, targetErrors, providersByToken);
    });
    // Note: directives need to be able to overwrite providers of a component!
    var /** @type {?} */ directivesWithComponentFirst = directives.filter(dir => dir.isComponent).concat(directives.filter(dir => !dir.isComponent));
    directivesWithComponentFirst.forEach((directive) => {
        _resolveProviders(_normalizeProviders(directive.providers, sourceSpan, targetErrors), template_ast_1.ProviderAstType.PublicService, false, sourceSpan, targetErrors, providersByToken);
        _resolveProviders(_normalizeProviders(directive.viewProviders, sourceSpan, targetErrors), template_ast_1.ProviderAstType.PrivateService, false, sourceSpan, targetErrors, providersByToken);
    });
    return providersByToken;
}
/**
 * @param {?} providers
 * @param {?} providerType
 * @param {?} eager
 * @param {?} sourceSpan
 * @param {?} targetErrors
 * @param {?} targetProvidersByToken
 * @return {?}
 */
function _resolveProviders(providers, providerType, eager, sourceSpan, targetErrors, targetProvidersByToken) {
    providers.forEach((provider) => {
        var /** @type {?} */ resolvedProvider = targetProvidersByToken.get(provider.token);
        if (lang_1.isPresent(resolvedProvider) && resolvedProvider.multiProvider !== provider.multi) {
            targetErrors.push(new ProviderError(`Mixing multi and non multi provider is not possible for token ${resolvedProvider.token.name}`, sourceSpan));
        }
        if (lang_1.isBlank(resolvedProvider)) {
            resolvedProvider = new template_ast_1.ProviderAst(provider.token, provider.multi, eager, [provider], providerType, sourceSpan);
            targetProvidersByToken.add(provider.token, resolvedProvider);
        }
        else {
            if (!provider.multi) {
                collection_1.ListWrapper.clear(resolvedProvider.providers);
            }
            resolvedProvider.providers.push(provider);
        }
    });
}
/**
 * @param {?} component
 * @return {?}
 */
function _getViewQueries(component) {
    var /** @type {?} */ viewQueries = new compile_metadata_1.CompileTokenMap();
    if (lang_1.isPresent(component.viewQueries)) {
        component.viewQueries.forEach((query) => _addQueryToTokenMap(viewQueries, query));
    }
    component.type.diDeps.forEach((dep) => {
        if (lang_1.isPresent(dep.viewQuery)) {
            _addQueryToTokenMap(viewQueries, dep.viewQuery);
        }
    });
    return viewQueries;
}
/**
 * @param {?} directives
 * @return {?}
 */
function _getContentQueries(directives) {
    var /** @type {?} */ contentQueries = new compile_metadata_1.CompileTokenMap();
    directives.forEach(directive => {
        if (lang_1.isPresent(directive.queries)) {
            directive.queries.forEach((query) => _addQueryToTokenMap(contentQueries, query));
        }
        directive.type.diDeps.forEach((dep) => {
            if (lang_1.isPresent(dep.query)) {
                _addQueryToTokenMap(contentQueries, dep.query);
            }
        });
    });
    return contentQueries;
}
/**
 * @param {?} map
 * @param {?} query
 * @return {?}
 */
function _addQueryToTokenMap(map, query) {
    query.selectors.forEach((token) => {
        var /** @type {?} */ entry = map.get(token);
        if (lang_1.isBlank(entry)) {
            entry = [];
            map.add(token, entry);
        }
        entry.push(query);
    });
}
//# sourceMappingURL=provider_parser.js.map