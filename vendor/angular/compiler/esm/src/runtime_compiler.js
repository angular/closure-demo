goog.module('_angular$compiler$src$runtime__compiler');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var async_1 = goog.require('_angular$compiler$src$facade$async');
var compile_metadata_1 = goog.require('_angular$compiler$src$compile__metadata');
var style_compiler_1 = goog.require('_angular$compiler$src$style__compiler');
var view_compiler_1 = goog.require('_angular$compiler$src$view__compiler$view__compiler');
var template_parser_1 = goog.require('_angular$compiler$src$template__parser');
var directive_normalizer_1 = goog.require('_angular$compiler$src$directive__normalizer');
var metadata_resolver_1 = goog.require('_angular$compiler$src$metadata__resolver');
var config_1 = goog.require('_angular$compiler$src$config');
var ir = goog.require('_angular$compiler$src$output$output__ast');
var output_jit_1 = goog.require('_angular$compiler$src$output$output__jit');
var output_interpreter_1 = goog.require('_angular$compiler$src$output$output__interpreter');
var interpretive_view_1 = goog.require('_angular$compiler$src$output$interpretive__view');
var xhr_1 = goog.require('_angular$compiler$src$xhr');
class RuntimeCompiler {
    /**
     * @param {?} _metadataResolver
     * @param {?} _templateNormalizer
     * @param {?} _templateParser
     * @param {?} _styleCompiler
     * @param {?} _viewCompiler
     * @param {?} _xhr
     * @param {?} _genConfig
     */
    constructor(_metadataResolver, _templateNormalizer, _templateParser, _styleCompiler, _viewCompiler, _xhr, _genConfig) {
        this._metadataResolver = _metadataResolver;
        this._templateNormalizer = _templateNormalizer;
        this._templateParser = _templateParser;
        this._styleCompiler = _styleCompiler;
        this._viewCompiler = _viewCompiler;
        this._xhr = _xhr;
        this._genConfig = _genConfig;
        this._styleCache = new Map();
        this._hostCacheKeys = new Map();
        this._compiledTemplateCache = new Map();
        this._compiledTemplateDone = new Map();
    }
    /**
     * @param {?} component
     * @return {?}
     */
    resolveComponent(component) {
        if (lang_1.isString(component)) {
            return async_1.PromiseWrapper.reject(new exceptions_1.BaseException(`Cannot resolve component using '${component}'.`), null);
        }
        let /** @type {?} */ componentType = (component);
        var /** @type {?} */ compMeta = this._metadataResolver.getDirectiveMetadata(componentType);
        var /** @type {?} */ hostCacheKey = this._hostCacheKeys.get(componentType);
        if (lang_1.isBlank(hostCacheKey)) {
            hostCacheKey = new Object();
            this._hostCacheKeys.set(componentType, hostCacheKey);
            assertComponent(compMeta);
            var /** @type {?} */ hostMeta = compile_metadata_1.createHostComponentMeta(compMeta.type, compMeta.selector);
            this._loadAndCompileComponent(hostCacheKey, hostMeta, [compMeta], [], []);
        }
        return this._compiledTemplateDone.get(hostCacheKey)
            .then((compiledTemplate) => new core_1.ComponentFactory(compMeta.selector, compiledTemplate.viewFactory, componentType));
    }
    /**
     * @return {?}
     */
    clearCache() {
        this._styleCache.clear();
        this._compiledTemplateCache.clear();
        this._compiledTemplateDone.clear();
        this._hostCacheKeys.clear();
    }
    /**
     * @param {?} cacheKey
     * @param {?} compMeta
     * @param {?} viewDirectives
     * @param {?} pipes
     * @param {?} compilingComponentsPath
     * @return {?}
     */
    _loadAndCompileComponent(cacheKey, compMeta, viewDirectives, pipes, compilingComponentsPath) {
        var /** @type {?} */ compiledTemplate = this._compiledTemplateCache.get(cacheKey);
        var /** @type {?} */ done = this._compiledTemplateDone.get(cacheKey);
        if (lang_1.isBlank(compiledTemplate)) {
            compiledTemplate = new CompiledTemplate();
            this._compiledTemplateCache.set(cacheKey, compiledTemplate);
            done =
                async_1.PromiseWrapper.all([(this._compileComponentStyles(compMeta))].concat(viewDirectives.map(dirMeta => this._templateNormalizer.normalizeDirective(dirMeta))))
                    .then((stylesAndNormalizedViewDirMetas) => {
                    var /** @type {?} */ normalizedViewDirMetas = stylesAndNormalizedViewDirMetas.slice(1);
                    var /** @type {?} */ styles = stylesAndNormalizedViewDirMetas[0];
                    var /** @type {?} */ parsedTemplate = this._templateParser.parse(compMeta, compMeta.template.template, normalizedViewDirMetas, pipes, compMeta.type.name);
                    var /** @type {?} */ childPromises = [];
                    compiledTemplate.init(this._compileComponent(compMeta, parsedTemplate, styles, pipes, compilingComponentsPath, childPromises));
                    return async_1.PromiseWrapper.all(childPromises).then((_) => { return compiledTemplate; });
                });
            this._compiledTemplateDone.set(cacheKey, done);
        }
        return compiledTemplate;
    }
    /**
     * @param {?} compMeta
     * @param {?} parsedTemplate
     * @param {?} styles
     * @param {?} pipes
     * @param {?} compilingComponentsPath
     * @param {?} childPromises
     * @return {?}
     */
    _compileComponent(compMeta, parsedTemplate, styles, pipes, compilingComponentsPath, childPromises) {
        var /** @type {?} */ compileResult = this._viewCompiler.compileComponent(compMeta, parsedTemplate, new ir.ExternalExpr(new compile_metadata_1.CompileIdentifierMetadata({ runtime: styles })), pipes);
        compileResult.dependencies.forEach((dep) => {
            var /** @type {?} */ childCompilingComponentsPath = collection_1.ListWrapper.clone(compilingComponentsPath);
            var /** @type {?} */ childCacheKey = dep.comp.type.runtime;
            var /** @type {?} */ childViewDirectives = this._metadataResolver.getViewDirectivesMetadata(dep.comp.type.runtime);
            var /** @type {?} */ childViewPipes = this._metadataResolver.getViewPipesMetadata(dep.comp.type.runtime);
            var /** @type {?} */ childIsRecursive = collection_1.ListWrapper.contains(childCompilingComponentsPath, childCacheKey);
            childCompilingComponentsPath.push(childCacheKey);
            var /** @type {?} */ childComp = this._loadAndCompileComponent(dep.comp.type.runtime, dep.comp, childViewDirectives, childViewPipes, childCompilingComponentsPath);
            dep.factoryPlaceholder.runtime = childComp.proxyViewFactory;
            dep.factoryPlaceholder.name = `viewFactory_${dep.comp.type.name}`;
            if (!childIsRecursive) {
                // Only wait for a child if it is not a cycle
                childPromises.push(this._compiledTemplateDone.get(childCacheKey));
            }
        });
        var /** @type {?} */ factory;
        if (lang_1.IS_DART || !this._genConfig.useJit) {
            factory = output_interpreter_1.interpretStatements(compileResult.statements, compileResult.viewFactoryVar, new interpretive_view_1.InterpretiveAppViewInstanceFactory());
        }
        else {
            factory = output_jit_1.jitStatements(`${compMeta.type.name}.template.js`, compileResult.statements, compileResult.viewFactoryVar);
        }
        return factory;
    }
    /**
     * @param {?} compMeta
     * @return {?}
     */
    _compileComponentStyles(compMeta) {
        var /** @type {?} */ compileResult = this._styleCompiler.compileComponent(compMeta);
        return this._resolveStylesCompileResult(compMeta.type.name, compileResult);
    }
    /**
     * @param {?} sourceUrl
     * @param {?} result
     * @return {?}
     */
    _resolveStylesCompileResult(sourceUrl, result) {
        var /** @type {?} */ promises = result.dependencies.map((dep) => this._loadStylesheetDep(dep));
        return async_1.PromiseWrapper.all(promises)
            .then((cssTexts) => {
            var /** @type {?} */ nestedCompileResultPromises = [];
            for (var /** @type {?} */ i = 0; i < result.dependencies.length; i++) {
                var /** @type {?} */ dep = result.dependencies[i];
                var /** @type {?} */ cssText = cssTexts[i];
                var /** @type {?} */ nestedCompileResult = this._styleCompiler.compileStylesheet(dep.moduleUrl, cssText, dep.isShimmed);
                nestedCompileResultPromises.push(this._resolveStylesCompileResult(dep.moduleUrl, nestedCompileResult));
            }
            return async_1.PromiseWrapper.all(nestedCompileResultPromises);
        })
            .then((nestedStylesArr) => {
            for (var /** @type {?} */ i = 0; i < result.dependencies.length; i++) {
                var /** @type {?} */ dep = result.dependencies[i];
                dep.valuePlaceholder.runtime = nestedStylesArr[i];
                dep.valuePlaceholder.name = `importedStyles${i}`;
            }
            if (lang_1.IS_DART || !this._genConfig.useJit) {
                return output_interpreter_1.interpretStatements(result.statements, result.stylesVar, new interpretive_view_1.InterpretiveAppViewInstanceFactory());
            }
            else {
                return output_jit_1.jitStatements(`${sourceUrl}.css.js`, result.statements, result.stylesVar);
            }
        });
    }
    /**
     * @param {?} dep
     * @return {?}
     */
    _loadStylesheetDep(dep) {
        var /** @type {?} */ cacheKey = `${dep.moduleUrl}${dep.isShimmed ? '.shim' : ''}`;
        var /** @type {?} */ cssTextPromise = this._styleCache.get(cacheKey);
        if (lang_1.isBlank(cssTextPromise)) {
            cssTextPromise = this._xhr.get(dep.moduleUrl);
            this._styleCache.set(cacheKey, cssTextPromise);
        }
        return cssTextPromise;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        RuntimeCompiler.prototype._styleCache;
        /** @type {?} */
        RuntimeCompiler.prototype._hostCacheKeys;
        /** @type {?} */
        RuntimeCompiler.prototype._compiledTemplateCache;
        /** @type {?} */
        RuntimeCompiler.prototype._compiledTemplateDone;
        /** @type {?} */
        RuntimeCompiler.prototype._metadataResolver;
        /** @type {?} */
        RuntimeCompiler.prototype._templateNormalizer;
        /** @type {?} */
        RuntimeCompiler.prototype._templateParser;
        /** @type {?} */
        RuntimeCompiler.prototype._styleCompiler;
        /** @type {?} */
        RuntimeCompiler.prototype._viewCompiler;
        /** @type {?} */
        RuntimeCompiler.prototype._xhr;
        /** @type {?} */
        RuntimeCompiler.prototype._genConfig;
    }
}
RuntimeCompiler.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ RuntimeCompiler.ctorParameters = [
    { type: metadata_resolver_1.CompileMetadataResolver, },
    { type: directive_normalizer_1.DirectiveNormalizer, },
    { type: template_parser_1.TemplateParser, },
    { type: style_compiler_1.StyleCompiler, },
    { type: view_compiler_1.ViewCompiler, },
    { type: xhr_1.XHR, },
    { type: config_1.CompilerConfig, },
];
exports.RuntimeCompiler = RuntimeCompiler;
class CompiledTemplate {
    /**
     */
    constructor() {
        this.viewFactory = null;
        this.proxyViewFactory = (viewUtils, childInjector, contextEl) => this.viewFactory(viewUtils, childInjector, contextEl);
    }
    /**
     * @param {?} viewFactory
     * @return {?}
     */
    init(viewFactory) { this.viewFactory = viewFactory; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompiledTemplate.prototype.viewFactory;
        /** @type {?} */
        CompiledTemplate.prototype.proxyViewFactory;
    }
}
/**
 * @param {?} meta
 * @return {?}
 */
function assertComponent(meta) {
    if (!meta.isComponent) {
        throw new exceptions_1.BaseException(`Could not compile '${meta.type.name}' because it is not a component.`);
    }
}
//# sourceMappingURL=runtime_compiler.js.map