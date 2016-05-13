goog.module('_angular$compiler$src$offline__compiler');
var core_1 = goog.require('_angular$core');
var compile_metadata_1 = goog.require('_angular$compiler$src$compile__metadata');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var o = goog.require('_angular$compiler$src$output$output__ast');
var util_1 = goog.require('_angular$compiler$src$util');
var /** @type {?} */ _COMPONENT_FACTORY_IDENTIFIER = new compile_metadata_1.CompileIdentifierMetadata({
    name: 'ComponentFactory',
    runtime: core_1.ComponentFactory,
    moduleUrl: util_1.assetUrl('core', 'linker/component_factory')
});
class SourceModule {
    /**
     * @param {?} moduleUrl
     * @param {?} source
     */
    constructor(moduleUrl, source) {
        this.moduleUrl = moduleUrl;
        this.source = source;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SourceModule.prototype.moduleUrl;
        /** @type {?} */
        SourceModule.prototype.source;
    }
}
exports.SourceModule = SourceModule;
class StyleSheetSourceWithImports {
    /**
     * @param {?} source
     * @param {?} importedUrls
     */
    constructor(source, importedUrls) {
        this.source = source;
        this.importedUrls = importedUrls;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        StyleSheetSourceWithImports.prototype.source;
        /** @type {?} */
        StyleSheetSourceWithImports.prototype.importedUrls;
    }
}
exports.StyleSheetSourceWithImports = StyleSheetSourceWithImports;
class NormalizedComponentWithViewDirectives {
    /**
     * @param {?} component
     * @param {?} directives
     * @param {?} pipes
     */
    constructor(component, directives, pipes) {
        this.component = component;
        this.directives = directives;
        this.pipes = pipes;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        NormalizedComponentWithViewDirectives.prototype.component;
        /** @type {?} */
        NormalizedComponentWithViewDirectives.prototype.directives;
        /** @type {?} */
        NormalizedComponentWithViewDirectives.prototype.pipes;
    }
}
exports.NormalizedComponentWithViewDirectives = NormalizedComponentWithViewDirectives;
class OfflineCompiler {
    /**
     * @param {?} _directiveNormalizer
     * @param {?} _templateParser
     * @param {?} _styleCompiler
     * @param {?} _viewCompiler
     * @param {?} _outputEmitter
     * @param {?} _xhr
     */
    constructor(_directiveNormalizer, _templateParser, _styleCompiler, _viewCompiler, _outputEmitter, _xhr) {
        this._directiveNormalizer = _directiveNormalizer;
        this._templateParser = _templateParser;
        this._styleCompiler = _styleCompiler;
        this._viewCompiler = _viewCompiler;
        this._outputEmitter = _outputEmitter;
        this._xhr = _xhr;
    }
    /**
     * @param {?} directive
     * @return {?}
     */
    normalizeDirectiveMetadata(directive) {
        return this._directiveNormalizer.normalizeDirective(directive);
    }
    /**
     * @param {?} components
     * @return {?}
     */
    compileTemplates(components) {
        if (components.length === 0) {
            throw new exceptions_1.BaseException('No components given');
        }
        var /** @type {?} */ statements = [];
        var /** @type {?} */ exportedVars = [];
        var /** @type {?} */ moduleUrl = _templateModuleUrl(components[0].component);
        components.forEach(componentWithDirs => {
            var /** @type {?} */ compMeta = (componentWithDirs.component);
            _assertComponent(compMeta);
            var /** @type {?} */ compViewFactoryVar = this._compileComponent(compMeta, componentWithDirs.directives, componentWithDirs.pipes, statements);
            exportedVars.push(compViewFactoryVar);
            var /** @type {?} */ hostMeta = compile_metadata_1.createHostComponentMeta(compMeta.type, compMeta.selector);
            var /** @type {?} */ hostViewFactoryVar = this._compileComponent(hostMeta, [compMeta], [], statements);
            var /** @type {?} */ compFactoryVar = `${compMeta.type.name}NgFactory`;
            statements.push(o.variable(compFactoryVar)
                .set(o.importExpr(_COMPONENT_FACTORY_IDENTIFIER, [o.importType(compMeta.type)])
                .instantiate([
                o.literal(compMeta.selector),
                o.variable(hostViewFactoryVar),
                o.importExpr(compMeta.type)
            ], o.importType(_COMPONENT_FACTORY_IDENTIFIER, [o.importType(compMeta.type)], [o.TypeModifier.Const])))
                .toDeclStmt(null, [o.StmtModifier.Final]));
            exportedVars.push(compFactoryVar);
        });
        return this._codegenSourceModule(moduleUrl, statements, exportedVars);
    }
    /**
     * @param {?} stylesheetUrl
     * @param {?} shim
     * @param {?} suffix
     * @return {?}
     */
    loadAndCompileStylesheet(stylesheetUrl, shim, suffix) {
        return this._xhr.get(stylesheetUrl)
            .then((cssText) => {
            var /** @type {?} */ compileResult = this._styleCompiler.compileStylesheet(stylesheetUrl, cssText, shim);
            var /** @type {?} */ importedUrls = [];
            compileResult.dependencies.forEach((dep) => {
                importedUrls.push(dep.moduleUrl);
                dep.valuePlaceholder.moduleUrl = _stylesModuleUrl(dep.moduleUrl, dep.isShimmed, suffix);
            });
            return new StyleSheetSourceWithImports(this._codgenStyles(stylesheetUrl, shim, suffix, compileResult), importedUrls);
        });
    }
    /**
     * @param {?} compMeta
     * @param {?} directives
     * @param {?} pipes
     * @param {?} targetStatements
     * @return {?}
     */
    _compileComponent(compMeta, directives, pipes, targetStatements) {
        var /** @type {?} */ styleResult = this._styleCompiler.compileComponent(compMeta);
        var /** @type {?} */ parsedTemplate = this._templateParser.parse(compMeta, compMeta.template.template, directives, pipes, compMeta.type.name);
        var /** @type {?} */ viewResult = this._viewCompiler.compileComponent(compMeta, parsedTemplate, o.variable(styleResult.stylesVar), pipes);
        collection_1.ListWrapper.addAll(targetStatements, _resolveStyleStatements(compMeta.type.moduleUrl, styleResult));
        collection_1.ListWrapper.addAll(targetStatements, _resolveViewStatements(viewResult));
        return viewResult.viewFactoryVar;
    }
    /**
     * @param {?} inputUrl
     * @param {?} shim
     * @param {?} suffix
     * @param {?} stylesCompileResult
     * @return {?}
     */
    _codgenStyles(inputUrl, shim, suffix, stylesCompileResult) {
        return this._codegenSourceModule(_stylesModuleUrl(inputUrl, shim, suffix), stylesCompileResult.statements, [stylesCompileResult.stylesVar]);
    }
    /**
     * @param {?} moduleUrl
     * @param {?} statements
     * @param {?} exportedVars
     * @return {?}
     */
    _codegenSourceModule(moduleUrl, statements, exportedVars) {
        return new SourceModule(moduleUrl, this._outputEmitter.emitStatements(moduleUrl, statements, exportedVars));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        OfflineCompiler.prototype._directiveNormalizer;
        /** @type {?} */
        OfflineCompiler.prototype._templateParser;
        /** @type {?} */
        OfflineCompiler.prototype._styleCompiler;
        /** @type {?} */
        OfflineCompiler.prototype._viewCompiler;
        /** @type {?} */
        OfflineCompiler.prototype._outputEmitter;
        /** @type {?} */
        OfflineCompiler.prototype._xhr;
    }
}
exports.OfflineCompiler = OfflineCompiler;
/**
 * @param {?} compileResult
 * @return {?}
 */
function _resolveViewStatements(compileResult) {
    compileResult.dependencies.forEach((dep) => { dep.factoryPlaceholder.moduleUrl = _templateModuleUrl(dep.comp); });
    return compileResult.statements;
}
/**
 * @param {?} containingModuleUrl
 * @param {?} compileResult
 * @return {?}
 */
function _resolveStyleStatements(containingModuleUrl, compileResult) {
    var /** @type {?} */ containingSuffix = _splitSuffix(containingModuleUrl)[1];
    compileResult.dependencies.forEach((dep) => {
        dep.valuePlaceholder.moduleUrl =
            _stylesModuleUrl(dep.moduleUrl, dep.isShimmed, containingSuffix);
    });
    return compileResult.statements;
}
/**
 * @param {?} comp
 * @return {?}
 */
function _templateModuleUrl(comp) {
    var /** @type {?} */ urlWithSuffix = _splitSuffix(comp.type.moduleUrl);
    return `${urlWithSuffix[0]}.ngfactory${urlWithSuffix[1]}`;
}
/**
 * @param {?} stylesheetUrl
 * @param {?} shim
 * @param {?} suffix
 * @return {?}
 */
function _stylesModuleUrl(stylesheetUrl, shim, suffix) {
    return shim ? `${stylesheetUrl}.shim${suffix}` : `${stylesheetUrl}${suffix}`;
}
/**
 * @param {?} meta
 * @return {?}
 */
function _assertComponent(meta) {
    if (!meta.isComponent) {
        throw new exceptions_1.BaseException(`Could not compile '${meta.type.name}' because it is not a component.`);
    }
}
/**
 * @param {?} path
 * @return {?}
 */
function _splitSuffix(path) {
    let /** @type {?} */ lastDot = path.lastIndexOf('.');
    if (lastDot !== -1) {
        return [path.substring(0, lastDot), path.substring(lastDot)];
    }
    else {
        return [path, ''];
    }
}
//# sourceMappingURL=offline_compiler.js.map