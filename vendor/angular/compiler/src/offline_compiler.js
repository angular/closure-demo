/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationCompiler } from './animation/animation_compiler';
import { CompileProviderMetadata, createHostComponentMeta } from './compile_metadata';
import { ListWrapper } from './facade/collection';
import { Identifiers, resolveIdentifier, resolveIdentifierToken } from './identifiers';
import * as o from './output/output_ast';
import { ComponentFactoryDependency, DirectiveWrapperDependency, ViewClassDependency } from './view_compiler/view_compiler';
export var SourceModule = (function () {
    /**
     * @param {?} fileUrl
     * @param {?} moduleUrl
     * @param {?} source
     */
    function SourceModule(fileUrl, moduleUrl, source) {
        this.fileUrl = fileUrl;
        this.moduleUrl = moduleUrl;
        this.source = source;
    }
    SourceModule._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        SourceModule.prototype.fileUrl;
        /** @type {?} */
        SourceModule.prototype.moduleUrl;
        /** @type {?} */
        SourceModule.prototype.source;
    };
    return SourceModule;
}());
/**
 * @param {?} programStaticSymbols
 * @param {?} options
 * @param {?} metadataResolver
 * @return {?}
 */
export function analyzeNgModules(programStaticSymbols, options, metadataResolver) {
    var _a = _createNgModules(programStaticSymbols, options, metadataResolver), ngModules = _a.ngModules, symbolsMissingModule = _a.symbolsMissingModule;
    return _analyzeNgModules(ngModules, symbolsMissingModule);
}
/**
 * @param {?} programStaticSymbols
 * @param {?} options
 * @param {?} metadataResolver
 * @return {?}
 */
export function analyzeAndValidateNgModules(programStaticSymbols, options, metadataResolver) {
    var /** @type {?} */ result = analyzeNgModules(programStaticSymbols, options, metadataResolver);
    if (result.symbolsMissingModule && result.symbolsMissingModule.length) {
        var /** @type {?} */ messages = result.symbolsMissingModule.map(function (s) { return ("Cannot determine the module for class " + s.name + " in " + s.filePath + "!"); });
        throw new Error(messages.join('\n'));
    }
    return result;
}
/**
 * @param {?} ngModules
 * @return {?}
 */
export function loadNgModuleDirectives(ngModules) {
    return Promise
        .all(ListWrapper.flatten(ngModules.map(function (ngModule) { return ngModule.transitiveModule.directiveLoaders.map(function (loader) { return loader(); }); })))
        .then(function () { });
}
/**
 * @param {?} ngModuleMetas
 * @param {?} symbolsMissingModule
 * @return {?}
 */
function _analyzeNgModules(ngModuleMetas, symbolsMissingModule) {
    var /** @type {?} */ moduleMetasByRef = new Map();
    ngModuleMetas.forEach(function (ngModule) { return moduleMetasByRef.set(ngModule.type.reference, ngModule); });
    var /** @type {?} */ ngModuleByPipeOrDirective = new Map();
    var /** @type {?} */ ngModulesByFile = new Map();
    var /** @type {?} */ ngDirectivesByFile = new Map();
    var /** @type {?} */ filePaths = new Set();
    // Looping over all modules to construct:
    // - a map from file to modules `ngModulesByFile`,
    // - a map from file to directives `ngDirectivesByFile`,
    // - a map from directive/pipe to module `ngModuleByPipeOrDirective`.
    ngModuleMetas.forEach(function (ngModuleMeta) {
        var /** @type {?} */ srcFileUrl = ngModuleMeta.type.reference.filePath;
        filePaths.add(srcFileUrl);
        ngModulesByFile.set(srcFileUrl, (ngModulesByFile.get(srcFileUrl) || []).concat(ngModuleMeta.type.reference));
        ngModuleMeta.declaredDirectives.forEach(function (dirIdentifier) {
            var /** @type {?} */ fileUrl = dirIdentifier.reference.filePath;
            filePaths.add(fileUrl);
            ngDirectivesByFile.set(fileUrl, (ngDirectivesByFile.get(fileUrl) || []).concat(dirIdentifier.reference));
            ngModuleByPipeOrDirective.set(dirIdentifier.reference, ngModuleMeta);
        });
        ngModuleMeta.declaredPipes.forEach(function (pipeIdentifier) {
            var /** @type {?} */ fileUrl = pipeIdentifier.reference.filePath;
            filePaths.add(fileUrl);
            ngModuleByPipeOrDirective.set(pipeIdentifier.reference, ngModuleMeta);
        });
    });
    var /** @type {?} */ files = [];
    filePaths.forEach(function (srcUrl) {
        var /** @type {?} */ directives = ngDirectivesByFile.get(srcUrl) || [];
        var /** @type {?} */ ngModules = ngModulesByFile.get(srcUrl) || [];
        files.push({ srcUrl: srcUrl, directives: directives, ngModules: ngModules });
    });
    return {
        // map directive/pipe to module
        ngModuleByPipeOrDirective: ngModuleByPipeOrDirective,
        // list modules and directives for every source file
        files: files,
        ngModules: ngModuleMetas, symbolsMissingModule: symbolsMissingModule
    };
}
export var OfflineCompiler = (function () {
    /**
     * @param {?} _metadataResolver
     * @param {?} _templateParser
     * @param {?} _styleCompiler
     * @param {?} _viewCompiler
     * @param {?} _dirWrapperCompiler
     * @param {?} _ngModuleCompiler
     * @param {?} _outputEmitter
     * @param {?} _localeId
     * @param {?} _translationFormat
     * @param {?} _animationParser
     */
    function OfflineCompiler(_metadataResolver, _templateParser, _styleCompiler, _viewCompiler, _dirWrapperCompiler, _ngModuleCompiler, _outputEmitter, _localeId, _translationFormat, _animationParser) {
        this._metadataResolver = _metadataResolver;
        this._templateParser = _templateParser;
        this._styleCompiler = _styleCompiler;
        this._viewCompiler = _viewCompiler;
        this._dirWrapperCompiler = _dirWrapperCompiler;
        this._ngModuleCompiler = _ngModuleCompiler;
        this._outputEmitter = _outputEmitter;
        this._localeId = _localeId;
        this._translationFormat = _translationFormat;
        this._animationParser = _animationParser;
        this._animationCompiler = new AnimationCompiler();
    }
    /**
     * @return {?}
     */
    OfflineCompiler.prototype.clearCache = function () { this._metadataResolver.clearCache(); };
    /**
     * @param {?} staticSymbols
     * @param {?} options
     * @return {?}
     */
    OfflineCompiler.prototype.compileModules = function (staticSymbols, options) {
        var _this = this;
        var _a = analyzeAndValidateNgModules(staticSymbols, options, this._metadataResolver), ngModuleByPipeOrDirective = _a.ngModuleByPipeOrDirective, files = _a.files, ngModules = _a.ngModules;
        return loadNgModuleDirectives(ngModules).then(function () {
            var /** @type {?} */ sourceModules = files.map(function (file) { return _this._compileSrcFile(file.srcUrl, ngModuleByPipeOrDirective, file.directives, file.ngModules); });
            return ListWrapper.flatten(sourceModules);
        });
    };
    /**
     * @param {?} srcFileUrl
     * @param {?} ngModuleByPipeOrDirective
     * @param {?} directives
     * @param {?} ngModules
     * @return {?}
     */
    OfflineCompiler.prototype._compileSrcFile = function (srcFileUrl, ngModuleByPipeOrDirective, directives, ngModules) {
        var _this = this;
        var /** @type {?} */ fileSuffix = _splitTypescriptSuffix(srcFileUrl)[1];
        var /** @type {?} */ statements = [];
        var /** @type {?} */ exportedVars = [];
        var /** @type {?} */ outputSourceModules = [];
        // compile all ng modules
        exportedVars.push.apply(exportedVars, ngModules.map(function (ngModuleType) { return _this._compileModule(ngModuleType, statements); }));
        // compile directive wrappers
        exportedVars.push.apply(exportedVars, directives.map(function (directiveType) { return _this._compileDirectiveWrapper(directiveType, statements); }));
        // compile components
        directives.forEach(function (dirType) {
            var /** @type {?} */ compMeta = _this._metadataResolver.getDirectiveMetadata(/** @type {?} */ (dirType));
            if (!compMeta.isComponent) {
                return Promise.resolve(null);
            }
            var /** @type {?} */ ngModule = ngModuleByPipeOrDirective.get(dirType);
            if (!ngModule) {
                throw new Error("Internal Error: cannot determine the module for component " + compMeta.type.name + "!");
            }
            _assertComponent(compMeta);
            // compile styles
            var /** @type {?} */ stylesCompileResults = _this._styleCompiler.compileComponent(compMeta);
            stylesCompileResults.externalStylesheets.forEach(function (compiledStyleSheet) {
                outputSourceModules.push(_this._codgenStyles(srcFileUrl, compiledStyleSheet, fileSuffix));
            });
            // compile components
            exportedVars.push(_this._compileComponentFactory(compMeta, ngModule, fileSuffix, statements), _this._compileComponent(compMeta, ngModule, ngModule.transitiveModule.directives, stylesCompileResults.componentStylesheet, fileSuffix, statements));
        });
        if (statements.length > 0) {
            var /** @type {?} */ srcModule = this._codegenSourceModule(srcFileUrl, _ngfactoryModuleUrl(srcFileUrl), statements, exportedVars);
            outputSourceModules.unshift(srcModule);
        }
        return outputSourceModules;
    };
    /**
     * @param {?} ngModuleType
     * @param {?} targetStatements
     * @return {?}
     */
    OfflineCompiler.prototype._compileModule = function (ngModuleType, targetStatements) {
        var /** @type {?} */ ngModule = this._metadataResolver.getNgModuleMetadata(ngModuleType);
        var /** @type {?} */ providers = [];
        if (this._localeId) {
            providers.push(new CompileProviderMetadata({
                token: resolveIdentifierToken(Identifiers.LOCALE_ID),
                useValue: this._localeId,
            }));
        }
        if (this._translationFormat) {
            providers.push(new CompileProviderMetadata({
                token: resolveIdentifierToken(Identifiers.TRANSLATIONS_FORMAT),
                useValue: this._translationFormat
            }));
        }
        var /** @type {?} */ appCompileResult = this._ngModuleCompiler.compile(ngModule, providers);
        appCompileResult.dependencies.forEach(function (dep) {
            dep.placeholder.name = _componentFactoryName(dep.comp);
            dep.placeholder.moduleUrl = _ngfactoryModuleUrl(dep.comp.moduleUrl);
        });
        targetStatements.push.apply(targetStatements, appCompileResult.statements);
        return appCompileResult.ngModuleFactoryVar;
    };
    /**
     * @param {?} directiveType
     * @param {?} targetStatements
     * @return {?}
     */
    OfflineCompiler.prototype._compileDirectiveWrapper = function (directiveType, targetStatements) {
        var /** @type {?} */ dirMeta = this._metadataResolver.getDirectiveMetadata(directiveType);
        var /** @type {?} */ dirCompileResult = this._dirWrapperCompiler.compile(dirMeta);
        targetStatements.push.apply(targetStatements, dirCompileResult.statements);
        return dirCompileResult.dirWrapperClassVar;
    };
    /**
     * @param {?} compMeta
     * @param {?} ngModule
     * @param {?} fileSuffix
     * @param {?} targetStatements
     * @return {?}
     */
    OfflineCompiler.prototype._compileComponentFactory = function (compMeta, ngModule, fileSuffix, targetStatements) {
        var /** @type {?} */ hostMeta = createHostComponentMeta(compMeta);
        var /** @type {?} */ hostViewFactoryVar = this._compileComponent(hostMeta, ngModule, [compMeta.type], null, fileSuffix, targetStatements);
        var /** @type {?} */ compFactoryVar = _componentFactoryName(compMeta.type);
        targetStatements.push(o.variable(compFactoryVar)
            .set(o.importExpr(resolveIdentifier(Identifiers.ComponentFactory), [o.importType(compMeta.type)])
            .instantiate([
            o.literal(compMeta.selector),
            o.variable(hostViewFactoryVar),
            o.importExpr(compMeta.type),
        ], o.importType(resolveIdentifier(Identifiers.ComponentFactory), [o.importType(compMeta.type)], [o.TypeModifier.Const])))
            .toDeclStmt(null, [o.StmtModifier.Final]));
        return compFactoryVar;
    };
    /**
     * @param {?} compMeta
     * @param {?} ngModule
     * @param {?} directiveIdentifiers
     * @param {?} componentStyles
     * @param {?} fileSuffix
     * @param {?} targetStatements
     * @return {?}
     */
    OfflineCompiler.prototype._compileComponent = function (compMeta, ngModule, directiveIdentifiers, componentStyles, fileSuffix, targetStatements) {
        var _this = this;
        var /** @type {?} */ parsedAnimations = this._animationParser.parseComponent(compMeta);
        var /** @type {?} */ directives = directiveIdentifiers.map(function (dir) { return _this._metadataResolver.getDirectiveSummary(dir.reference); });
        var /** @type {?} */ pipes = ngModule.transitiveModule.pipes.map(function (pipe) { return _this._metadataResolver.getPipeSummary(pipe.reference); });
        var /** @type {?} */ parsedTemplate = this._templateParser.parse(compMeta, compMeta.template.template, directives, pipes, ngModule.schemas, compMeta.type.name);
        var /** @type {?} */ stylesExpr = componentStyles ? o.variable(componentStyles.stylesVar) : o.literalArr([]);
        var /** @type {?} */ compiledAnimations = this._animationCompiler.compile(compMeta.type.name, parsedAnimations);
        var /** @type {?} */ viewResult = this._viewCompiler.compileComponent(compMeta, parsedTemplate, stylesExpr, pipes, compiledAnimations);
        if (componentStyles) {
            targetStatements.push.apply(targetStatements, _resolveStyleStatements(componentStyles, fileSuffix));
        }
        compiledAnimations.forEach(function (entry) { return targetStatements.push.apply(targetStatements, entry.statements); });
        targetStatements.push.apply(targetStatements, _resolveViewStatements(viewResult));
        return viewResult.viewClassVar;
    };
    /**
     * @param {?} fileUrl
     * @param {?} stylesCompileResult
     * @param {?} fileSuffix
     * @return {?}
     */
    OfflineCompiler.prototype._codgenStyles = function (fileUrl, stylesCompileResult, fileSuffix) {
        _resolveStyleStatements(stylesCompileResult, fileSuffix);
        return this._codegenSourceModule(fileUrl, _stylesModuleUrl(stylesCompileResult.meta.moduleUrl, stylesCompileResult.isShimmed, fileSuffix), stylesCompileResult.statements, [stylesCompileResult.stylesVar]);
    };
    /**
     * @param {?} fileUrl
     * @param {?} moduleUrl
     * @param {?} statements
     * @param {?} exportedVars
     * @return {?}
     */
    OfflineCompiler.prototype._codegenSourceModule = function (fileUrl, moduleUrl, statements, exportedVars) {
        return new SourceModule(fileUrl, moduleUrl, this._outputEmitter.emitStatements(moduleUrl, statements, exportedVars));
    };
    OfflineCompiler._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        OfflineCompiler.prototype._animationCompiler;
        /** @type {?} */
        OfflineCompiler.prototype._metadataResolver;
        /** @type {?} */
        OfflineCompiler.prototype._templateParser;
        /** @type {?} */
        OfflineCompiler.prototype._styleCompiler;
        /** @type {?} */
        OfflineCompiler.prototype._viewCompiler;
        /** @type {?} */
        OfflineCompiler.prototype._dirWrapperCompiler;
        /** @type {?} */
        OfflineCompiler.prototype._ngModuleCompiler;
        /** @type {?} */
        OfflineCompiler.prototype._outputEmitter;
        /** @type {?} */
        OfflineCompiler.prototype._localeId;
        /** @type {?} */
        OfflineCompiler.prototype._translationFormat;
        /** @type {?} */
        OfflineCompiler.prototype._animationParser;
    };
    return OfflineCompiler;
}());
/**
 * @param {?} compileResult
 * @return {?}
 */
function _resolveViewStatements(compileResult) {
    compileResult.dependencies.forEach(function (dep) {
        if (dep instanceof ViewClassDependency) {
            var /** @type {?} */ vfd = (dep);
            vfd.placeholder.moduleUrl = _ngfactoryModuleUrl(vfd.comp.moduleUrl);
        }
        else if (dep instanceof ComponentFactoryDependency) {
            var /** @type {?} */ cfd = (dep);
            cfd.placeholder.name = _componentFactoryName(cfd.comp);
            cfd.placeholder.moduleUrl = _ngfactoryModuleUrl(cfd.comp.moduleUrl);
        }
        else if (dep instanceof DirectiveWrapperDependency) {
            var /** @type {?} */ dwd = (dep);
            dwd.placeholder.moduleUrl = _ngfactoryModuleUrl(dwd.dir.moduleUrl);
        }
    });
    return compileResult.statements;
}
/**
 * @param {?} compileResult
 * @param {?} fileSuffix
 * @return {?}
 */
function _resolveStyleStatements(compileResult, fileSuffix) {
    compileResult.dependencies.forEach(function (dep) {
        dep.valuePlaceholder.moduleUrl = _stylesModuleUrl(dep.moduleUrl, dep.isShimmed, fileSuffix);
    });
    return compileResult.statements;
}
/**
 * @param {?} dirUrl
 * @return {?}
 */
function _ngfactoryModuleUrl(dirUrl) {
    var /** @type {?} */ urlWithSuffix = _splitTypescriptSuffix(dirUrl);
    return urlWithSuffix[0] + ".ngfactory" + urlWithSuffix[1];
}
/**
 * @param {?} comp
 * @return {?}
 */
function _componentFactoryName(comp) {
    return comp.name + "NgFactory";
}
/**
 * @param {?} stylesheetUrl
 * @param {?} shim
 * @param {?} suffix
 * @return {?}
 */
function _stylesModuleUrl(stylesheetUrl, shim, suffix) {
    return shim ? stylesheetUrl + ".shim" + suffix : "" + stylesheetUrl + suffix;
}
/**
 * @param {?} meta
 * @return {?}
 */
function _assertComponent(meta) {
    if (!meta.isComponent) {
        throw new Error("Could not compile '" + meta.type.name + "' because it is not a component.");
    }
}
/**
 * @param {?} path
 * @return {?}
 */
function _splitTypescriptSuffix(path) {
    if (path.endsWith('.d.ts')) {
        return [path.slice(0, -5), '.ts'];
    }
    var /** @type {?} */ lastDot = path.lastIndexOf('.');
    if (lastDot !== -1) {
        return [path.substring(0, lastDot), path.substring(lastDot)];
    }
    return [path, ''];
}
/**
 * @param {?} programStaticSymbols
 * @param {?} options
 * @param {?} metadataResolver
 * @return {?}
 */
function _createNgModules(programStaticSymbols, options, metadataResolver) {
    var /** @type {?} */ ngModules = new Map();
    var /** @type {?} */ programPipesAndDirectives = [];
    var /** @type {?} */ ngModulePipesAndDirective = new Set();
    var /** @type {?} */ addNgModule = function (staticSymbol) {
        if (ngModules.has(staticSymbol)) {
            return false;
        }
        var /** @type {?} */ ngModule = metadataResolver.getUnloadedNgModuleMetadata(staticSymbol, false, false);
        if (ngModule) {
            ngModules.set(ngModule.type.reference, ngModule);
            ngModule.declaredDirectives.forEach(function (dir) { return ngModulePipesAndDirective.add(dir.reference); });
            ngModule.declaredPipes.forEach(function (pipe) { return ngModulePipesAndDirective.add(pipe.reference); });
            if (options.transitiveModules) {
                // For every input modules add the list of transitively included modules
                ngModule.transitiveModule.modules.forEach(function (modMeta) { return addNgModule(modMeta.type.reference); });
            }
        }
        return !!ngModule;
    };
    programStaticSymbols.forEach(function (staticSymbol) {
        if (!addNgModule(staticSymbol) &&
            (metadataResolver.isDirective(staticSymbol) || metadataResolver.isPipe(staticSymbol))) {
            programPipesAndDirectives.push(staticSymbol);
        }
    });
    // Throw an error if any of the program pipe or directives is not declared by a module
    var /** @type {?} */ symbolsMissingModule = programPipesAndDirectives.filter(function (s) { return !ngModulePipesAndDirective.has(s); });
    return { ngModules: Array.from(ngModules.values()), symbolsMissingModule: symbolsMissingModule };
}
//# sourceMappingURL=offline_compiler.js.map