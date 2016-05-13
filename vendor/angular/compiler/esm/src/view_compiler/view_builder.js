goog.module('_angular$compiler$src$view__compiler$view__builder');
var core_1 = goog.require('_angular$core');
var core_private_1 = goog.require('_angular$compiler$core__private');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var o = goog.require('_angular$compiler$src$output$output__ast');
var identifiers_1 = goog.require('_angular$compiler$src$identifiers');
var constants_1 = goog.require('_angular$compiler$src$view__compiler$constants');
var compile_view_1 = goog.require('_angular$compiler$src$view__compiler$compile__view');
var compile_element_1 = goog.require('_angular$compiler$src$view__compiler$compile__element');
var template_ast_1 = goog.require('_angular$compiler$src$template__ast');
var util_1 = goog.require('_angular$compiler$src$view__compiler$util');
var compile_metadata_1 = goog.require('_angular$compiler$src$compile__metadata');
const /** @type {?} */ IMPLICIT_TEMPLATE_VAR = '\$implicit';
const /** @type {?} */ CLASS_ATTR = 'class';
const /** @type {?} */ STYLE_ATTR = 'style';
var /** @type {?} */ parentRenderNodeVar = o.variable('parentRenderNode');
var /** @type {?} */ rootSelectorVar = o.variable('rootSelector');
class ViewCompileDependency {
    /**
     * @param {?} comp
     * @param {?} factoryPlaceholder
     */
    constructor(comp, factoryPlaceholder) {
        this.comp = comp;
        this.factoryPlaceholder = factoryPlaceholder;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ViewCompileDependency.prototype.comp;
        /** @type {?} */
        ViewCompileDependency.prototype.factoryPlaceholder;
    }
}
exports.ViewCompileDependency = ViewCompileDependency;
/**
 * @param {?} view
 * @param {?} template
 * @param {?} targetDependencies
 * @return {?}
 */
function buildView(view, template, targetDependencies) {
    var /** @type {?} */ builderVisitor = new ViewBuilderVisitor(view, targetDependencies);
    template_ast_1.templateVisitAll(builderVisitor, template, view.declarationElement.isNull() ?
        view.declarationElement :
        view.declarationElement.parent);
    return builderVisitor.nestedViewCount;
}
exports.buildView = buildView;
/**
 * @param {?} view
 * @param {?} targetStatements
 * @return {?}
 */
function finishView(view, targetStatements) {
    view.afterNodes();
    createViewTopLevelStmts(view, targetStatements);
    view.nodes.forEach((node) => {
        if (node instanceof compile_element_1.CompileElement && node.hasEmbeddedView) {
            finishView(node.embeddedView, targetStatements);
        }
    });
}
exports.finishView = finishView;
class ViewBuilderVisitor {
    /**
     * @param {?} view
     * @param {?} targetDependencies
     */
    constructor(view, targetDependencies) {
        this.view = view;
        this.targetDependencies = targetDependencies;
        this.nestedViewCount = 0;
    }
    /**
     * @param {?} parent
     * @return {?}
     */
    _isRootNode(parent) { return parent.view !== this.view; }
    /**
     * @param {?} node
     * @param {?} ngContentIndex
     * @param {?} parent
     * @return {?}
     */
    _addRootNodeAndProject(node, ngContentIndex, parent) {
        var /** @type {?} */ vcAppEl = (node instanceof compile_element_1.CompileElement && node.hasViewContainer) ? node.appElement : null;
        if (this._isRootNode(parent)) {
            // store appElement as root node only for ViewContainers
            if (this.view.viewType !== core_private_1.ViewType.COMPONENT) {
                this.view.rootNodesOrAppElements.push(lang_1.isPresent(vcAppEl) ? vcAppEl : node.renderNode);
            }
        }
        else if (lang_1.isPresent(parent.component) && lang_1.isPresent(ngContentIndex)) {
            parent.addContentNode(ngContentIndex, lang_1.isPresent(vcAppEl) ? vcAppEl : node.renderNode);
        }
    }
    /**
     * @param {?} parent
     * @return {?}
     */
    _getParentRenderNode(parent) {
        if (this._isRootNode(parent)) {
            if (this.view.viewType === core_private_1.ViewType.COMPONENT) {
                return parentRenderNodeVar;
            }
            else {
                // root node of an embedded/host view
                return o.NULL_EXPR;
            }
        }
        else {
            return lang_1.isPresent(parent.component) &&
                parent.component.template.encapsulation !== core_1.ViewEncapsulation.Native ?
                o.NULL_EXPR :
                parent.renderNode;
        }
    }
    /**
     * @param {?} ast
     * @param {?} parent
     * @return {?}
     */
    visitBoundText(ast, parent) {
        return this._visitText(ast, '', ast.ngContentIndex, parent);
    }
    /**
     * @param {?} ast
     * @param {?} parent
     * @return {?}
     */
    visitText(ast, parent) {
        return this._visitText(ast, ast.value, ast.ngContentIndex, parent);
    }
    /**
     * @param {?} ast
     * @param {?} value
     * @param {?} ngContentIndex
     * @param {?} parent
     * @return {?}
     */
    _visitText(ast, value, ngContentIndex, parent) {
        var /** @type {?} */ fieldName = `_text_${this.view.nodes.length}`;
        this.view.fields.push(new o.ClassField(fieldName, o.importType(this.view.genConfig.renderTypes.renderText)));
        var /** @type {?} */ renderNode = o.THIS_EXPR.prop(fieldName);
        var /** @type {?} */ compileNode = new compile_element_1.CompileNode(parent, this.view, this.view.nodes.length, renderNode, ast);
        var /** @type {?} */ createRenderNode = o.THIS_EXPR.prop(fieldName)
            .set(constants_1.ViewProperties.renderer.callMethod('createText', [
            this._getParentRenderNode(parent),
            o.literal(value),
            this.view.createMethod.resetDebugInfoExpr(this.view.nodes.length, ast)
        ]))
            .toStmt();
        this.view.nodes.push(compileNode);
        this.view.createMethod.addStmt(createRenderNode);
        this._addRootNodeAndProject(compileNode, ngContentIndex, parent);
        return renderNode;
    }
    /**
     * @param {?} ast
     * @param {?} parent
     * @return {?}
     */
    visitNgContent(ast, parent) {
        // the projected nodes originate from a different view, so we don't
        // have debug information for them...
        this.view.createMethod.resetDebugInfo(null, ast);
        var /** @type {?} */ parentRenderNode = this._getParentRenderNode(parent);
        var /** @type {?} */ nodesExpression = constants_1.ViewProperties.projectableNodes.key(o.literal(ast.index), new o.ArrayType(o.importType(this.view.genConfig.renderTypes.renderNode)));
        if (parentRenderNode !== o.NULL_EXPR) {
            this.view.createMethod.addStmt(constants_1.ViewProperties.renderer.callMethod('projectNodes', [
                parentRenderNode,
                o.importExpr(identifiers_1.Identifiers.flattenNestedViewRenderNodes)
                    .callFn([nodesExpression])
            ])
                .toStmt());
        }
        else if (this._isRootNode(parent)) {
            if (this.view.viewType !== core_private_1.ViewType.COMPONENT) {
                // store root nodes only for embedded/host views
                this.view.rootNodesOrAppElements.push(nodesExpression);
            }
        }
        else {
            if (lang_1.isPresent(parent.component) && lang_1.isPresent(ast.ngContentIndex)) {
                parent.addContentNode(ast.ngContentIndex, nodesExpression);
            }
        }
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} parent
     * @return {?}
     */
    visitElement(ast, parent) {
        var /** @type {?} */ nodeIndex = this.view.nodes.length;
        var /** @type {?} */ createRenderNodeExpr;
        var /** @type {?} */ debugContextExpr = this.view.createMethod.resetDebugInfoExpr(nodeIndex, ast);
        if (nodeIndex === 0 && this.view.viewType === core_private_1.ViewType.HOST) {
            createRenderNodeExpr = o.THIS_EXPR.callMethod('selectOrCreateHostElement', [o.literal(ast.name), rootSelectorVar, debugContextExpr]);
        }
        else {
            createRenderNodeExpr = constants_1.ViewProperties.renderer.callMethod('createElement', [this._getParentRenderNode(parent), o.literal(ast.name), debugContextExpr]);
        }
        var /** @type {?} */ fieldName = `_el_${nodeIndex}`;
        this.view.fields.push(new o.ClassField(fieldName, o.importType(this.view.genConfig.renderTypes.renderElement)));
        this.view.createMethod.addStmt(o.THIS_EXPR.prop(fieldName).set(createRenderNodeExpr).toStmt());
        var /** @type {?} */ renderNode = o.THIS_EXPR.prop(fieldName);
        var /** @type {?} */ directives = ast.directives.map(directiveAst => directiveAst.directive);
        var /** @type {?} */ component = directives.find(directive => directive.isComponent);
        var /** @type {?} */ htmlAttrs = _readHtmlAttrs(ast.attrs);
        var /** @type {?} */ attrNameAndValues = _mergeHtmlAndDirectiveAttrs(htmlAttrs, directives);
        for (var /** @type {?} */ i = 0; i < attrNameAndValues.length; i++) {
            var /** @type {?} */ attrName = attrNameAndValues[i][0];
            var /** @type {?} */ attrValue = attrNameAndValues[i][1];
            this.view.createMethod.addStmt(constants_1.ViewProperties.renderer.callMethod('setElementAttribute', [renderNode, o.literal(attrName), o.literal(attrValue)])
                .toStmt());
        }
        var /** @type {?} */ compileElement = new compile_element_1.CompileElement(parent, this.view, nodeIndex, renderNode, ast, component, directives, ast.providers, ast.hasViewContainer, false, ast.references);
        this.view.nodes.push(compileElement);
        var /** @type {?} */ compViewExpr = null;
        if (lang_1.isPresent(component)) {
            var /** @type {?} */ nestedComponentIdentifier = new compile_metadata_1.CompileIdentifierMetadata({ name: util_1.getViewFactoryName(component, 0) });
            this.targetDependencies.push(new ViewCompileDependency(component, nestedComponentIdentifier));
            compViewExpr = o.variable(`compView_${nodeIndex}`); // fix highlighting: `
            compileElement.setComponentView(compViewExpr);
            this.view.createMethod.addStmt(compViewExpr.set(o.importExpr(nestedComponentIdentifier)
                .callFn([
                constants_1.ViewProperties.viewUtils,
                compileElement.injector,
                compileElement.appElement
            ]))
                .toDeclStmt());
        }
        compileElement.beforeChildren();
        this._addRootNodeAndProject(compileElement, ast.ngContentIndex, parent);
        template_ast_1.templateVisitAll(this, ast.children, compileElement);
        compileElement.afterChildren(this.view.nodes.length - nodeIndex - 1);
        if (lang_1.isPresent(compViewExpr)) {
            var /** @type {?} */ codeGenContentNodes;
            if (this.view.component.type.isHost) {
                codeGenContentNodes = constants_1.ViewProperties.projectableNodes;
            }
            else {
                codeGenContentNodes = o.literalArr(compileElement.contentNodesByNgContentIndex.map(nodes => util_1.createFlatArray(nodes)));
            }
            this.view.createMethod.addStmt(compViewExpr.callMethod('create', [compileElement.getComponent(), codeGenContentNodes, o.NULL_EXPR])
                .toStmt());
        }
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} parent
     * @return {?}
     */
    visitEmbeddedTemplate(ast, parent) {
        var /** @type {?} */ nodeIndex = this.view.nodes.length;
        var /** @type {?} */ fieldName = `_anchor_${nodeIndex}`;
        this.view.fields.push(new o.ClassField(fieldName, o.importType(this.view.genConfig.renderTypes.renderComment)));
        this.view.createMethod.addStmt(o.THIS_EXPR.prop(fieldName)
            .set(constants_1.ViewProperties.renderer.callMethod('createTemplateAnchor', [
            this._getParentRenderNode(parent),
            this.view.createMethod.resetDebugInfoExpr(nodeIndex, ast)
        ]))
            .toStmt());
        var /** @type {?} */ renderNode = o.THIS_EXPR.prop(fieldName);
        var /** @type {?} */ templateVariableBindings = ast.variables.map(varAst => [varAst.value.length > 0 ? varAst.value : IMPLICIT_TEMPLATE_VAR, varAst.name]);
        var /** @type {?} */ directives = ast.directives.map(directiveAst => directiveAst.directive);
        var /** @type {?} */ compileElement = new compile_element_1.CompileElement(parent, this.view, nodeIndex, renderNode, ast, null, directives, ast.providers, ast.hasViewContainer, true, ast.references);
        this.view.nodes.push(compileElement);
        this.nestedViewCount++;
        var /** @type {?} */ embeddedView = new compile_view_1.CompileView(this.view.component, this.view.genConfig, this.view.pipeMetas, o.NULL_EXPR, this.view.viewIndex + this.nestedViewCount, compileElement, templateVariableBindings);
        this.nestedViewCount += buildView(embeddedView, ast.children, this.targetDependencies);
        compileElement.beforeChildren();
        this._addRootNodeAndProject(compileElement, ast.ngContentIndex, parent);
        compileElement.afterChildren(0);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitAttr(ast, ctx) { return null; }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitDirective(ast, ctx) { return null; }
    /**
     * @param {?} ast
     * @param {?} eventTargetAndNames
     * @return {?}
     */
    visitEvent(ast, eventTargetAndNames) {
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitReference(ast, ctx) { return null; }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitVariable(ast, ctx) { return null; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitDirectiveProperty(ast, context) { return null; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitElementProperty(ast, context) { return null; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ViewBuilderVisitor.prototype.nestedViewCount;
        /** @type {?} */
        ViewBuilderVisitor.prototype.view;
        /** @type {?} */
        ViewBuilderVisitor.prototype.targetDependencies;
    }
}
/**
 * @param {?} declaredHtmlAttrs
 * @param {?} directives
 * @return {?}
 */
function _mergeHtmlAndDirectiveAttrs(declaredHtmlAttrs, directives) {
    var /** @type {?} */ result = {};
    collection_1.StringMapWrapper.forEach(declaredHtmlAttrs, (value, key) => { result[key] = value; });
    directives.forEach(directiveMeta => {
        collection_1.StringMapWrapper.forEach(directiveMeta.hostAttributes, (value, name) => {
            var /** @type {?} */ prevValue = result[name];
            result[name] = lang_1.isPresent(prevValue) ? mergeAttributeValue(name, prevValue, value) : value;
        });
    });
    return mapToKeyValueArray(result);
}
/**
 * @param {?} attrs
 * @return {?}
 */
function _readHtmlAttrs(attrs) {
    var /** @type {?} */ htmlAttrs = {};
    attrs.forEach((ast) => { htmlAttrs[ast.name] = ast.value; });
    return htmlAttrs;
}
/**
 * @param {?} attrName
 * @param {?} attrValue1
 * @param {?} attrValue2
 * @return {?}
 */
function mergeAttributeValue(attrName, attrValue1, attrValue2) {
    if (attrName == CLASS_ATTR || attrName == STYLE_ATTR) {
        return `${attrValue1} ${attrValue2}`;
    }
    else {
        return attrValue2;
    }
}
/**
 * @param {?} data
 * @return {?}
 */
function mapToKeyValueArray(data) {
    var /** @type {?} */ entryArray = [];
    collection_1.StringMapWrapper.forEach(data, (value, name) => { entryArray.push([name, value]); });
    // We need to sort to get a defined output order
    // for tests and for caching generated artifacts...
    collection_1.ListWrapper.sort(entryArray, (entry1, entry2) => lang_1.StringWrapper.compare(entry1[0], entry2[0]));
    var /** @type {?} */ keyValueArray = [];
    entryArray.forEach((entry) => { keyValueArray.push([entry[0], entry[1]]); });
    return keyValueArray;
}
/**
 * @param {?} view
 * @param {?} targetStatements
 * @return {?}
 */
function createViewTopLevelStmts(view, targetStatements) {
    var /** @type {?} */ nodeDebugInfosVar = o.NULL_EXPR;
    if (view.genConfig.genDebugInfo) {
        nodeDebugInfosVar = o.variable(`nodeDebugInfos_${view.component.type.name}${view.viewIndex}`); // fix highlighting: `
        targetStatements.push(((nodeDebugInfosVar))
            .set(o.literalArr(view.nodes.map(createStaticNodeDebugInfo), new o.ArrayType(new o.ExternalType(identifiers_1.Identifiers.StaticNodeDebugInfo), [o.TypeModifier.Const])))
            .toDeclStmt(null, [o.StmtModifier.Final]));
    }
    var /** @type {?} */ renderCompTypeVar = o.variable(`renderType_${view.component.type.name}`); // fix highlighting: `
    if (view.viewIndex === 0) {
        targetStatements.push(renderCompTypeVar.set(o.NULL_EXPR)
            .toDeclStmt(o.importType(identifiers_1.Identifiers.RenderComponentType)));
    }
    var /** @type {?} */ viewClass = createViewClass(view, renderCompTypeVar, nodeDebugInfosVar);
    targetStatements.push(viewClass);
    targetStatements.push(createViewFactory(view, viewClass, renderCompTypeVar));
}
/**
 * @param {?} node
 * @return {?}
 */
function createStaticNodeDebugInfo(node) {
    var /** @type {?} */ compileElement = node instanceof compile_element_1.CompileElement ? node : null;
    var /** @type {?} */ providerTokens = [];
    var /** @type {?} */ componentToken = o.NULL_EXPR;
    var /** @type {?} */ varTokenEntries = [];
    if (lang_1.isPresent(compileElement)) {
        providerTokens = compileElement.getProviderTokens();
        if (lang_1.isPresent(compileElement.component)) {
            componentToken = util_1.createDiTokenExpression(identifiers_1.identifierToken(compileElement.component.type));
        }
        collection_1.StringMapWrapper.forEach(compileElement.referenceTokens, (token, varName) => {
            varTokenEntries.push([varName, lang_1.isPresent(token) ? util_1.createDiTokenExpression(token) : o.NULL_EXPR]);
        });
    }
    return o.importExpr(identifiers_1.Identifiers.StaticNodeDebugInfo)
        .instantiate([
        o.literalArr(providerTokens, new o.ArrayType(o.DYNAMIC_TYPE, [o.TypeModifier.Const])),
        componentToken,
        o.literalMap(varTokenEntries, new o.MapType(o.DYNAMIC_TYPE, [o.TypeModifier.Const]))
    ], o.importType(identifiers_1.Identifiers.StaticNodeDebugInfo, null, [o.TypeModifier.Const]));
}
/**
 * @param {?} view
 * @param {?} renderCompTypeVar
 * @param {?} nodeDebugInfosVar
 * @return {?}
 */
function createViewClass(view, renderCompTypeVar, nodeDebugInfosVar) {
    var /** @type {?} */ viewConstructorArgs = [
        new o.FnParam(constants_1.ViewConstructorVars.viewUtils.name, o.importType(identifiers_1.Identifiers.ViewUtils)),
        new o.FnParam(constants_1.ViewConstructorVars.parentInjector.name, o.importType(identifiers_1.Identifiers.Injector)),
        new o.FnParam(constants_1.ViewConstructorVars.declarationEl.name, o.importType(identifiers_1.Identifiers.AppElement))
    ];
    var /** @type {?} */ superConstructorArgs = [
        o.variable(view.className),
        renderCompTypeVar,
        constants_1.ViewTypeEnum.fromValue(view.viewType),
        constants_1.ViewConstructorVars.viewUtils,
        constants_1.ViewConstructorVars.parentInjector,
        constants_1.ViewConstructorVars.declarationEl,
        constants_1.ChangeDetectionStrategyEnum.fromValue(getChangeDetectionMode(view))
    ];
    if (view.genConfig.genDebugInfo) {
        superConstructorArgs.push(nodeDebugInfosVar);
    }
    var /** @type {?} */ viewConstructor = new o.ClassMethod(null, viewConstructorArgs, [o.SUPER_EXPR.callFn(superConstructorArgs).toStmt()]);
    var /** @type {?} */ viewMethods = [
        new o.ClassMethod('createInternal', [new o.FnParam(rootSelectorVar.name, o.STRING_TYPE)], generateCreateMethod(view), o.importType(identifiers_1.Identifiers.AppElement)),
        new o.ClassMethod('injectorGetInternal', [
            new o.FnParam(constants_1.InjectMethodVars.token.name, o.DYNAMIC_TYPE),
            // Note: Can't use o.INT_TYPE here as the method in AppView uses number
            new o.FnParam(constants_1.InjectMethodVars.requestNodeIndex.name, o.NUMBER_TYPE),
            new o.FnParam(constants_1.InjectMethodVars.notFoundResult.name, o.DYNAMIC_TYPE)
        ], addReturnValuefNotEmpty(view.injectorGetMethod.finish(), constants_1.InjectMethodVars.notFoundResult), o.DYNAMIC_TYPE),
        new o.ClassMethod('detectChangesInternal', [new o.FnParam(constants_1.DetectChangesVars.throwOnChange.name, o.BOOL_TYPE)], generateDetectChangesMethod(view)),
        new o.ClassMethod('dirtyParentQueriesInternal', [], view.dirtyParentQueriesMethod.finish()),
        new o.ClassMethod('destroyInternal', [], view.destroyMethod.finish())
    ].concat(view.eventHandlerMethods);
    var /** @type {?} */ superClass = view.genConfig.genDebugInfo ? identifiers_1.Identifiers.DebugAppView : identifiers_1.Identifiers.AppView;
    var /** @type {?} */ viewClass = new o.ClassStmt(view.className, o.importExpr(superClass, [getContextType(view)]), view.fields, view.getters, viewConstructor, viewMethods.filter((method) => method.body.length > 0));
    return viewClass;
}
/**
 * @param {?} view
 * @param {?} viewClass
 * @param {?} renderCompTypeVar
 * @return {?}
 */
function createViewFactory(view, viewClass, renderCompTypeVar) {
    var /** @type {?} */ viewFactoryArgs = [
        new o.FnParam(constants_1.ViewConstructorVars.viewUtils.name, o.importType(identifiers_1.Identifiers.ViewUtils)),
        new o.FnParam(constants_1.ViewConstructorVars.parentInjector.name, o.importType(identifiers_1.Identifiers.Injector)),
        new o.FnParam(constants_1.ViewConstructorVars.declarationEl.name, o.importType(identifiers_1.Identifiers.AppElement))
    ];
    var /** @type {?} */ initRenderCompTypeStmts = [];
    var /** @type {?} */ templateUrlInfo;
    if (view.component.template.templateUrl == view.component.type.moduleUrl) {
        templateUrlInfo =
            `${view.component.type.moduleUrl} class ${view.component.type.name} - inline template`;
    }
    else {
        templateUrlInfo = view.component.template.templateUrl;
    }
    if (view.viewIndex === 0) {
        initRenderCompTypeStmts = [
            new o.IfStmt(renderCompTypeVar.identical(o.NULL_EXPR), [
                renderCompTypeVar.set(constants_1.ViewConstructorVars
                    .viewUtils.callMethod('createRenderComponentType', [
                    o.literal(templateUrlInfo),
                    o.literal(view.component
                        .template.ngContentSelectors.length),
                    constants_1.ViewEncapsulationEnum
                        .fromValue(view.component.template.encapsulation),
                    view.styles
                ]))
                    .toStmt()
            ])
        ];
    }
    return o.fn(viewFactoryArgs, initRenderCompTypeStmts.concat([
        new o.ReturnStatement(o.variable(viewClass.name)
            .instantiate(viewClass.constructorMethod.params.map((param) => o.variable(param.name))))
    ]), o.importType(identifiers_1.Identifiers.AppView, [getContextType(view)]))
        .toDeclStmt(view.viewFactory.name, [o.StmtModifier.Final]);
}
/**
 * @param {?} view
 * @return {?}
 */
function generateCreateMethod(view) {
    var /** @type {?} */ parentRenderNodeExpr = o.NULL_EXPR;
    var /** @type {?} */ parentRenderNodeStmts = [];
    if (view.viewType === core_private_1.ViewType.COMPONENT) {
        parentRenderNodeExpr = constants_1.ViewProperties.renderer.callMethod('createViewRoot', [o.THIS_EXPR.prop('declarationAppElement').prop('nativeElement')]);
        parentRenderNodeStmts = [
            parentRenderNodeVar.set(parentRenderNodeExpr)
                .toDeclStmt(o.importType(view.genConfig.renderTypes.renderNode), [o.StmtModifier.Final])
        ];
    }
    var /** @type {?} */ resultExpr;
    if (view.viewType === core_private_1.ViewType.HOST) {
        resultExpr = ((view.nodes[0])).appElement;
    }
    else {
        resultExpr = o.NULL_EXPR;
    }
    return parentRenderNodeStmts.concat(view.createMethod.finish())
        .concat([
        o.THIS_EXPR.callMethod('init', [
            util_1.createFlatArray(view.rootNodesOrAppElements),
            o.literalArr(view.nodes.map(node => node.renderNode)),
            o.literalArr(view.disposables),
            o.literalArr(view.subscriptions)
        ])
            .toStmt(),
        new o.ReturnStatement(resultExpr)
    ]);
}
/**
 * @param {?} view
 * @return {?}
 */
function generateDetectChangesMethod(view) {
    var /** @type {?} */ stmts = [];
    if (view.detectChangesInInputsMethod.isEmpty() && view.updateContentQueriesMethod.isEmpty() &&
        view.afterContentLifecycleCallbacksMethod.isEmpty() &&
        view.detectChangesRenderPropertiesMethod.isEmpty() &&
        view.updateViewQueriesMethod.isEmpty() && view.afterViewLifecycleCallbacksMethod.isEmpty()) {
        return stmts;
    }
    collection_1.ListWrapper.addAll(stmts, view.detectChangesInInputsMethod.finish());
    stmts.push(o.THIS_EXPR.callMethod('detectContentChildrenChanges', [constants_1.DetectChangesVars.throwOnChange])
        .toStmt());
    var /** @type {?} */ afterContentStmts = view.updateContentQueriesMethod.finish().concat(view.afterContentLifecycleCallbacksMethod.finish());
    if (afterContentStmts.length > 0) {
        stmts.push(new o.IfStmt(o.not(constants_1.DetectChangesVars.throwOnChange), afterContentStmts));
    }
    collection_1.ListWrapper.addAll(stmts, view.detectChangesRenderPropertiesMethod.finish());
    stmts.push(o.THIS_EXPR.callMethod('detectViewChildrenChanges', [constants_1.DetectChangesVars.throwOnChange])
        .toStmt());
    var /** @type {?} */ afterViewStmts = view.updateViewQueriesMethod.finish().concat(view.afterViewLifecycleCallbacksMethod.finish());
    if (afterViewStmts.length > 0) {
        stmts.push(new o.IfStmt(o.not(constants_1.DetectChangesVars.throwOnChange), afterViewStmts));
    }
    var /** @type {?} */ varStmts = [];
    var /** @type {?} */ readVars = o.findReadVarNames(stmts);
    if (collection_1.SetWrapper.has(readVars, constants_1.DetectChangesVars.changed.name)) {
        varStmts.push(constants_1.DetectChangesVars.changed.set(o.literal(true)).toDeclStmt(o.BOOL_TYPE));
    }
    if (collection_1.SetWrapper.has(readVars, constants_1.DetectChangesVars.changes.name)) {
        varStmts.push(constants_1.DetectChangesVars.changes.set(o.NULL_EXPR)
            .toDeclStmt(new o.MapType(o.importType(identifiers_1.Identifiers.SimpleChange))));
    }
    if (collection_1.SetWrapper.has(readVars, constants_1.DetectChangesVars.valUnwrapper.name)) {
        varStmts.push(constants_1.DetectChangesVars.valUnwrapper.set(o.importExpr(identifiers_1.Identifiers.ValueUnwrapper).instantiate([]))
            .toDeclStmt(null, [o.StmtModifier.Final]));
    }
    return varStmts.concat(stmts);
}
/**
 * @param {?} statements
 * @param {?} value
 * @return {?}
 */
function addReturnValuefNotEmpty(statements, value) {
    if (statements.length > 0) {
        return statements.concat([new o.ReturnStatement(value)]);
    }
    else {
        return statements;
    }
}
/**
 * @param {?} view
 * @return {?}
 */
function getContextType(view) {
    if (view.viewType === core_private_1.ViewType.COMPONENT) {
        return o.importType(view.component.type);
    }
    return o.DYNAMIC_TYPE;
}
/**
 * @param {?} view
 * @return {?}
 */
function getChangeDetectionMode(view) {
    var /** @type {?} */ mode;
    if (view.viewType === core_private_1.ViewType.COMPONENT) {
        mode = core_private_1.isDefaultChangeDetectionStrategy(view.component.changeDetection) ?
            core_1.ChangeDetectionStrategy.CheckAlways :
            core_1.ChangeDetectionStrategy.CheckOnce;
    }
    else {
        mode = core_1.ChangeDetectionStrategy.CheckAlways;
    }
    return mode;
}
//# sourceMappingURL=view_builder.js.map