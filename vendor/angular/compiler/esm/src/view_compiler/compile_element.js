goog.module('_angular$compiler$src$view__compiler$compile__element');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var o = goog.require('_angular$compiler$src$output$output__ast');
var identifiers_1 = goog.require('_angular$compiler$src$identifiers');
var constants_1 = goog.require('_angular$compiler$src$view__compiler$constants');
var template_ast_1 = goog.require('_angular$compiler$src$template__ast');
var compile_metadata_1 = goog.require('_angular$compiler$src$compile__metadata');
var util_1 = goog.require('_angular$compiler$src$view__compiler$util');
var compile_query_1 = goog.require('_angular$compiler$src$view__compiler$compile__query');
var compile_method_1 = goog.require('_angular$compiler$src$view__compiler$compile__method');
var util_2 = goog.require('_angular$compiler$src$util');
class CompileNode {
    /**
     * @param {?} parent
     * @param {?} view
     * @param {?} nodeIndex
     * @param {?} renderNode
     * @param {?} sourceAst
     */
    constructor(parent, view, nodeIndex, renderNode, sourceAst) {
        this.parent = parent;
        this.view = view;
        this.nodeIndex = nodeIndex;
        this.renderNode = renderNode;
        this.sourceAst = sourceAst;
    }
    /**
     * @return {?}
     */
    isNull() { return lang_1.isBlank(this.renderNode); }
    /**
     * @return {?}
     */
    isRootElement() { return this.view != this.parent.view; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompileNode.prototype.parent;
        /** @type {?} */
        CompileNode.prototype.view;
        /** @type {?} */
        CompileNode.prototype.nodeIndex;
        /** @type {?} */
        CompileNode.prototype.renderNode;
        /** @type {?} */
        CompileNode.prototype.sourceAst;
    }
}
exports.CompileNode = CompileNode;
class CompileElement extends CompileNode {
    /**
     * @param {?} parent
     * @param {?} view
     * @param {?} nodeIndex
     * @param {?} renderNode
     * @param {?} sourceAst
     * @param {?} component
     * @param {?} _directives
     * @param {?} _resolvedProvidersArray
     * @param {?} hasViewContainer
     * @param {?} hasEmbeddedView
     * @param {?} references
     */
    constructor(parent, view, nodeIndex, renderNode, sourceAst, component, _directives, _resolvedProvidersArray, hasViewContainer, hasEmbeddedView, references) {
        super(parent, view, nodeIndex, renderNode, sourceAst);
        this.component = component;
        this._directives = _directives;
        this._resolvedProvidersArray = _resolvedProvidersArray;
        this.hasViewContainer = hasViewContainer;
        this.hasEmbeddedView = hasEmbeddedView;
        this._compViewExpr = null;
        this._instances = new compile_metadata_1.CompileTokenMap();
        this._queryCount = 0;
        this._queries = new compile_metadata_1.CompileTokenMap();
        this._componentConstructorViewQueryLists = [];
        this.contentNodesByNgContentIndex = null;
        this.referenceTokens = {};
        references.forEach(ref => this.referenceTokens[ref.name] = ref.value);
        this.elementRef = o.importExpr(identifiers_1.Identifiers.ElementRef).instantiate([this.renderNode]);
        this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.ElementRef), this.elementRef);
        this.injector = o.THIS_EXPR.callMethod('injector', [o.literal(this.nodeIndex)]);
        this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.Injector), this.injector);
        this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.Renderer), o.THIS_EXPR.prop('renderer'));
        if (this.hasViewContainer || this.hasEmbeddedView || lang_1.isPresent(this.component)) {
            this._createAppElement();
        }
    }
    /**
     * @return {?}
     */
    static createNull() {
        return new CompileElement(null, null, null, null, null, null, [], [], false, false, []);
    }
    /**
     * @return {?}
     */
    _createAppElement() {
        var /** @type {?} */ fieldName = `_appEl_${this.nodeIndex}`;
        var /** @type {?} */ parentNodeIndex = this.isRootElement() ? null : this.parent.nodeIndex;
        // private is fine here as no child view will reference an AppElement
        this.view.fields.push(new o.ClassField(fieldName, o.importType(identifiers_1.Identifiers.AppElement), [o.StmtModifier.Private]));
        var /** @type {?} */ statement = o.THIS_EXPR.prop(fieldName)
            .set(o.importExpr(identifiers_1.Identifiers.AppElement)
            .instantiate([
            o.literal(this.nodeIndex),
            o.literal(parentNodeIndex),
            o.THIS_EXPR,
            this.renderNode
        ]))
            .toStmt();
        this.view.createMethod.addStmt(statement);
        this.appElement = o.THIS_EXPR.prop(fieldName);
        this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.AppElement), this.appElement);
    }
    /**
     * @param {?} compViewExpr
     * @return {?}
     */
    setComponentView(compViewExpr) {
        this._compViewExpr = compViewExpr;
        this.contentNodesByNgContentIndex =
            collection_1.ListWrapper.createFixedSize(this.component.template.ngContentSelectors.length);
        for (var /** @type {?} */ i = 0; i < this.contentNodesByNgContentIndex.length; i++) {
            this.contentNodesByNgContentIndex[i] = [];
        }
    }
    /**
     * @param {?} embeddedView
     * @return {?}
     */
    setEmbeddedView(embeddedView) {
        this.embeddedView = embeddedView;
        if (lang_1.isPresent(embeddedView)) {
            var /** @type {?} */ createTemplateRefExpr = o.importExpr(identifiers_1.Identifiers.TemplateRef_)
                .instantiate([this.appElement, this.embeddedView.viewFactory]);
            var /** @type {?} */ provider = new compile_metadata_1.CompileProviderMetadata({ token: identifiers_1.identifierToken(identifiers_1.Identifiers.TemplateRef), useValue: createTemplateRefExpr });
            // Add TemplateRef as first provider as it does not have deps on other providers
            this._resolvedProvidersArray.unshift(new template_ast_1.ProviderAst(provider.token, false, true, [provider], template_ast_1.ProviderAstType.Builtin, this.sourceAst.sourceSpan));
        }
    }
    /**
     * @return {?}
     */
    beforeChildren() {
        if (this.hasViewContainer) {
            this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.ViewContainerRef), this.appElement.prop('vcRef'));
        }
        this._resolvedProviders = new compile_metadata_1.CompileTokenMap();
        this._resolvedProvidersArray.forEach(provider => this._resolvedProviders.add(provider.token, provider));
        // create all the provider instances, some in the view constructor,
        // some as getters. We rely on the fact that they are already sorted topologically.
        this._resolvedProviders.values().forEach((resolvedProvider) => {
            var /** @type {?} */ providerValueExpressions = resolvedProvider.providers.map((provider) => {
                if (lang_1.isPresent(provider.useExisting)) {
                    return this._getDependency(resolvedProvider.providerType, new compile_metadata_1.CompileDiDependencyMetadata({ token: provider.useExisting }));
                }
                else if (lang_1.isPresent(provider.useFactory)) {
                    var /** @type {?} */ deps = lang_1.isPresent(provider.deps) ? provider.deps : provider.useFactory.diDeps;
                    var /** @type {?} */ depsExpr = deps.map((dep) => this._getDependency(resolvedProvider.providerType, dep));
                    return o.importExpr(provider.useFactory).callFn(depsExpr);
                }
                else if (lang_1.isPresent(provider.useClass)) {
                    var /** @type {?} */ deps = lang_1.isPresent(provider.deps) ? provider.deps : provider.useClass.diDeps;
                    var /** @type {?} */ depsExpr = deps.map((dep) => this._getDependency(resolvedProvider.providerType, dep));
                    return o.importExpr(provider.useClass)
                        .instantiate(depsExpr, o.importType(provider.useClass));
                }
                else {
                    return _convertValueToOutputAst(provider.useValue);
                }
            });
            var /** @type {?} */ propName = `_${resolvedProvider.token.name}_${this.nodeIndex}_${this._instances.size}`;
            var /** @type {?} */ instance = createProviderProperty(propName, resolvedProvider, providerValueExpressions, resolvedProvider.multiProvider, resolvedProvider.eager, this);
            this._instances.add(resolvedProvider.token, instance);
        });
        this.directiveInstances =
            this._directives.map((directive) => this._instances.get(identifiers_1.identifierToken(directive.type)));
        for (var /** @type {?} */ i = 0; i < this.directiveInstances.length; i++) {
            var /** @type {?} */ directiveInstance = this.directiveInstances[i];
            var /** @type {?} */ directive = this._directives[i];
            directive.queries.forEach((queryMeta) => { this._addQuery(queryMeta, directiveInstance); });
        }
        var /** @type {?} */ queriesWithReads = [];
        this._resolvedProviders.values().forEach((resolvedProvider) => {
            var /** @type {?} */ queriesForProvider = this._getQueriesFor(resolvedProvider.token);
            collection_1.ListWrapper.addAll(queriesWithReads, queriesForProvider.map(query => new _QueryWithRead(query, resolvedProvider.token)));
        });
        collection_1.StringMapWrapper.forEach(this.referenceTokens, (_, varName) => {
            var /** @type {?} */ token = this.referenceTokens[varName];
            var /** @type {?} */ varValue;
            if (lang_1.isPresent(token)) {
                varValue = this._instances.get(token);
            }
            else {
                varValue = this.renderNode;
            }
            this.view.locals.set(varName, varValue);
            var /** @type {?} */ varToken = new compile_metadata_1.CompileTokenMetadata({ value: varName });
            collection_1.ListWrapper.addAll(queriesWithReads, this._getQueriesFor(varToken)
                .map(query => new _QueryWithRead(query, varToken)));
        });
        queriesWithReads.forEach((queryWithRead) => {
            var /** @type {?} */ value;
            if (lang_1.isPresent(queryWithRead.read.identifier)) {
                // query for an identifier
                value = this._instances.get(queryWithRead.read);
            }
            else {
                // query for a reference
                var /** @type {?} */ token = this.referenceTokens[queryWithRead.read.value];
                if (lang_1.isPresent(token)) {
                    value = this._instances.get(token);
                }
                else {
                    value = this.elementRef;
                }
            }
            if (lang_1.isPresent(value)) {
                queryWithRead.query.addValue(value, this.view);
            }
        });
        if (lang_1.isPresent(this.component)) {
            var /** @type {?} */ componentConstructorViewQueryList = lang_1.isPresent(this.component) ? o.literalArr(this._componentConstructorViewQueryLists) :
                o.NULL_EXPR;
            var /** @type {?} */ compExpr = lang_1.isPresent(this.getComponent()) ? this.getComponent() : o.NULL_EXPR;
            this.view.createMethod.addStmt(this.appElement.callMethod('initComponent', [compExpr, componentConstructorViewQueryList, this._compViewExpr])
                .toStmt());
        }
    }
    /**
     * @param {?} childNodeCount
     * @return {?}
     */
    afterChildren(childNodeCount) {
        this._resolvedProviders.values().forEach((resolvedProvider) => {
            // Note: afterChildren is called after recursing into children.
            // This is good so that an injector match in an element that is closer to a requesting element
            // matches first.
            var /** @type {?} */ providerExpr = this._instances.get(resolvedProvider.token);
            // Note: view providers are only visible on the injector of that element.
            // This is not fully correct as the rules during codegen don't allow a directive
            // to get hold of a view provdier on the same element. We still do this semantic
            // as it simplifies our model to having only one runtime injector per element.
            var /** @type {?} */ providerChildNodeCount = resolvedProvider.providerType === template_ast_1.ProviderAstType.PrivateService ? 0 : childNodeCount;
            this.view.injectorGetMethod.addStmt(createInjectInternalCondition(this.nodeIndex, providerChildNodeCount, resolvedProvider, providerExpr));
        });
        this._queries.values().forEach((queries) => queries.forEach((query) => query.afterChildren(this.view.updateContentQueriesMethod)));
    }
    /**
     * @param {?} ngContentIndex
     * @param {?} nodeExpr
     * @return {?}
     */
    addContentNode(ngContentIndex, nodeExpr) {
        this.contentNodesByNgContentIndex[ngContentIndex].push(nodeExpr);
    }
    /**
     * @return {?}
     */
    getComponent() {
        return lang_1.isPresent(this.component) ? this._instances.get(identifiers_1.identifierToken(this.component.type)) :
            null;
    }
    /**
     * @return {?}
     */
    getProviderTokens() {
        return this._resolvedProviders.values().map((resolvedProvider) => util_1.createDiTokenExpression(resolvedProvider.token));
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
        while (!currentEl.isNull()) {
            queries = currentEl._queries.get(token);
            if (lang_1.isPresent(queries)) {
                collection_1.ListWrapper.addAll(result, queries.filter((query) => query.meta.descendants || distance <= 1));
            }
            if (currentEl._directives.length > 0) {
                distance++;
            }
            currentEl = currentEl.parent;
        }
        queries = this.view.componentView.viewQueries.get(token);
        if (lang_1.isPresent(queries)) {
            collection_1.ListWrapper.addAll(result, queries);
        }
        return result;
    }
    /**
     * @param {?} queryMeta
     * @param {?} directiveInstance
     * @return {?}
     */
    _addQuery(queryMeta, directiveInstance) {
        var /** @type {?} */ propName = `_query_${queryMeta.selectors[0].name}_${this.nodeIndex}_${this._queryCount++}`;
        var /** @type {?} */ queryList = compile_query_1.createQueryList(queryMeta, directiveInstance, propName, this.view);
        var /** @type {?} */ query = new compile_query_1.CompileQuery(queryMeta, queryList, directiveInstance, this.view);
        compile_query_1.addQueryToTokenMap(this._queries, query);
        return query;
    }
    /**
     * @param {?} requestingProviderType
     * @param {?} dep
     * @return {?}
     */
    _getLocalDependency(requestingProviderType, dep) {
        var /** @type {?} */ result = null;
        // constructor content query
        if (lang_1.isBlank(result) && lang_1.isPresent(dep.query)) {
            result = this._addQuery(dep.query, null).queryList;
        }
        // constructor view query
        if (lang_1.isBlank(result) && lang_1.isPresent(dep.viewQuery)) {
            result = compile_query_1.createQueryList(dep.viewQuery, null, `_viewQuery_${dep.viewQuery.selectors[0].name}_${this.nodeIndex}_${this._componentConstructorViewQueryLists.length}`, this.view);
            this._componentConstructorViewQueryLists.push(result);
        }
        if (lang_1.isPresent(dep.token)) {
            // access builtins with special visibility
            if (lang_1.isBlank(result)) {
                if (dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ChangeDetectorRef))) {
                    if (requestingProviderType === template_ast_1.ProviderAstType.Component) {
                        return this._compViewExpr.prop('ref');
                    }
                    else {
                        return util_1.getPropertyInView(o.THIS_EXPR.prop('ref'), this.view, this.view.componentView);
                    }
                }
            }
            // access regular providers on the element
            if (lang_1.isBlank(result)) {
                result = this._instances.get(dep.token);
            }
        }
        return result;
    }
    /**
     * @param {?} requestingProviderType
     * @param {?} dep
     * @return {?}
     */
    _getDependency(requestingProviderType, dep) {
        var /** @type {?} */ currElement = this;
        var /** @type {?} */ result = null;
        if (dep.isValue) {
            result = o.literal(dep.value);
        }
        if (lang_1.isBlank(result) && !dep.isSkipSelf) {
            result = this._getLocalDependency(requestingProviderType, dep);
        }
        // check parent elements
        while (lang_1.isBlank(result) && !currElement.parent.isNull()) {
            currElement = currElement.parent;
            result = currElement._getLocalDependency(template_ast_1.ProviderAstType.PublicService, new compile_metadata_1.CompileDiDependencyMetadata({ token: dep.token }));
        }
        if (lang_1.isBlank(result)) {
            result = util_1.injectFromViewParentInjector(dep.token, dep.isOptional);
        }
        if (lang_1.isBlank(result)) {
            result = o.NULL_EXPR;
        }
        return util_1.getPropertyInView(result, this.view, currElement.view);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompileElement.prototype._compViewExpr;
        /** @type {?} */
        CompileElement.prototype.appElement;
        /** @type {?} */
        CompileElement.prototype.elementRef;
        /** @type {?} */
        CompileElement.prototype.injector;
        /** @type {?} */
        CompileElement.prototype._instances;
        /** @type {?} */
        CompileElement.prototype._resolvedProviders;
        /** @type {?} */
        CompileElement.prototype._queryCount;
        /** @type {?} */
        CompileElement.prototype._queries;
        /** @type {?} */
        CompileElement.prototype._componentConstructorViewQueryLists;
        /** @type {?} */
        CompileElement.prototype.contentNodesByNgContentIndex;
        /** @type {?} */
        CompileElement.prototype.embeddedView;
        /** @type {?} */
        CompileElement.prototype.directiveInstances;
        /** @type {?} */
        CompileElement.prototype.referenceTokens;
        /** @type {?} */
        CompileElement.prototype.component;
        /** @type {?} */
        CompileElement.prototype._directives;
        /** @type {?} */
        CompileElement.prototype._resolvedProvidersArray;
        /** @type {?} */
        CompileElement.prototype.hasViewContainer;
        /** @type {?} */
        CompileElement.prototype.hasEmbeddedView;
    }
}
exports.CompileElement = CompileElement;
/**
 * @param {?} nodeIndex
 * @param {?} childNodeCount
 * @param {?} provider
 * @param {?} providerExpr
 * @return {?}
 */
function createInjectInternalCondition(nodeIndex, childNodeCount, provider, providerExpr) {
    var /** @type {?} */ indexCondition;
    if (childNodeCount > 0) {
        indexCondition = o.literal(nodeIndex)
            .lowerEquals(constants_1.InjectMethodVars.requestNodeIndex)
            .and(constants_1.InjectMethodVars.requestNodeIndex.lowerEquals(o.literal(nodeIndex + childNodeCount)));
    }
    else {
        indexCondition = o.literal(nodeIndex).identical(constants_1.InjectMethodVars.requestNodeIndex);
    }
    return new o.IfStmt(constants_1.InjectMethodVars.token.identical(util_1.createDiTokenExpression(provider.token)).and(indexCondition), [new o.ReturnStatement(providerExpr)]);
}
/**
 * @param {?} propName
 * @param {?} provider
 * @param {?} providerValueExpressions
 * @param {?} isMulti
 * @param {?} isEager
 * @param {?} compileElement
 * @return {?}
 */
function createProviderProperty(propName, provider, providerValueExpressions, isMulti, isEager, compileElement) {
    var /** @type {?} */ view = compileElement.view;
    var /** @type {?} */ resolvedProviderValueExpr;
    var /** @type {?} */ type;
    if (isMulti) {
        resolvedProviderValueExpr = o.literalArr(providerValueExpressions);
        type = new o.ArrayType(o.DYNAMIC_TYPE);
    }
    else {
        resolvedProviderValueExpr = providerValueExpressions[0];
        type = providerValueExpressions[0].type;
    }
    if (lang_1.isBlank(type)) {
        type = o.DYNAMIC_TYPE;
    }
    if (isEager) {
        view.fields.push(new o.ClassField(propName, type));
        view.createMethod.addStmt(o.THIS_EXPR.prop(propName).set(resolvedProviderValueExpr).toStmt());
    }
    else {
        var /** @type {?} */ internalField = `_${propName}`;
        view.fields.push(new o.ClassField(internalField, type));
        var /** @type {?} */ getter = new compile_method_1.CompileMethod(view);
        getter.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
        // Note: Equals is important for JS so that it also checks the undefined case!
        getter.addStmt(new o.IfStmt(o.THIS_EXPR.prop(internalField).isBlank(), [o.THIS_EXPR.prop(internalField).set(resolvedProviderValueExpr).toStmt()]));
        getter.addStmt(new o.ReturnStatement(o.THIS_EXPR.prop(internalField)));
        view.getters.push(new o.ClassGetter(propName, getter.finish(), type));
    }
    return o.THIS_EXPR.prop(propName);
}
class _QueryWithRead {
    /**
     * @param {?} query
     * @param {?} match
     */
    constructor(query, match) {
        this.query = query;
        this.read = lang_1.isPresent(query.meta.read) ? query.meta.read : match;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _QueryWithRead.prototype.read;
        /** @type {?} */
        _QueryWithRead.prototype.query;
    }
}
/**
 * @param {?} value
 * @return {?}
 */
function _convertValueToOutputAst(value) {
    return util_2.visitValue(value, new _ValueOutputAstTransformer(), null);
}
class _ValueOutputAstTransformer extends util_2.ValueTransformer {
    /**
     * @param {?} arr
     * @param {?} context
     * @return {?}
     */
    visitArray(arr, context) {
        return o.literalArr(arr.map(value => util_2.visitValue(value, this, context)));
    }
    /**
     * @param {?} map
     * @param {?} context
     * @return {?}
     */
    visitStringMap(map, context) {
        var /** @type {?} */ entries = [];
        collection_1.StringMapWrapper.forEach(map, (value, key) => { entries.push([key, util_2.visitValue(value, this, context)]); });
        return o.literalMap(entries);
    }
    /**
     * @param {?} value
     * @param {?} context
     * @return {?}
     */
    visitPrimitive(value, context) { return o.literal(value); }
    /**
     * @param {?} value
     * @param {?} context
     * @return {?}
     */
    visitOther(value, context) {
        if (value instanceof compile_metadata_1.CompileIdentifierMetadata) {
            return o.importExpr(value);
        }
        else if (value instanceof o.Expression) {
            return value;
        }
        else {
            throw new core_1.BaseException(`Illegal state: Don't now how to compile value ${value}`);
        }
    }
}
//# sourceMappingURL=compile_element.js.map