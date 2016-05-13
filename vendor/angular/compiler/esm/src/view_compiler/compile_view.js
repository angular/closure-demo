goog.module('_angular$compiler$src$view__compiler$compile__view');
var core_private_1 = goog.require('_angular$compiler$core__private');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var o = goog.require('_angular$compiler$src$output$output__ast');
var constants_1 = goog.require('_angular$compiler$src$view__compiler$constants');
var compile_query_1 = goog.require('_angular$compiler$src$view__compiler$compile__query');
var compile_method_1 = goog.require('_angular$compiler$src$view__compiler$compile__method');
var compile_pipe_1 = goog.require('_angular$compiler$src$view__compiler$compile__pipe');
var compile_metadata_1 = goog.require('_angular$compiler$src$compile__metadata');
var util_1 = goog.require('_angular$compiler$src$view__compiler$util');
var identifiers_1 = goog.require('_angular$compiler$src$identifiers');
class CompileView {
    /**
     * @param {?} component
     * @param {?} genConfig
     * @param {?} pipeMetas
     * @param {?} styles
     * @param {?} viewIndex
     * @param {?} declarationElement
     * @param {?} templateVariableBindings
     */
    constructor(component, genConfig, pipeMetas, styles, viewIndex, declarationElement, templateVariableBindings) {
        this.component = component;
        this.genConfig = genConfig;
        this.pipeMetas = pipeMetas;
        this.styles = styles;
        this.viewIndex = viewIndex;
        this.declarationElement = declarationElement;
        this.templateVariableBindings = templateVariableBindings;
        this.nodes = [];
        this.rootNodesOrAppElements = [];
        this.bindings = [];
        this.classStatements = [];
        this.eventHandlerMethods = [];
        this.fields = [];
        this.getters = [];
        this.disposables = [];
        this.subscriptions = [];
        this.purePipes = new Map();
        this.pipes = [];
        this.locals = new Map();
        this.literalArrayCount = 0;
        this.literalMapCount = 0;
        this.pipeCount = 0;
        this.createMethod = new compile_method_1.CompileMethod(this);
        this.injectorGetMethod = new compile_method_1.CompileMethod(this);
        this.updateContentQueriesMethod = new compile_method_1.CompileMethod(this);
        this.dirtyParentQueriesMethod = new compile_method_1.CompileMethod(this);
        this.updateViewQueriesMethod = new compile_method_1.CompileMethod(this);
        this.detectChangesInInputsMethod = new compile_method_1.CompileMethod(this);
        this.detectChangesRenderPropertiesMethod = new compile_method_1.CompileMethod(this);
        this.afterContentLifecycleCallbacksMethod = new compile_method_1.CompileMethod(this);
        this.afterViewLifecycleCallbacksMethod = new compile_method_1.CompileMethod(this);
        this.destroyMethod = new compile_method_1.CompileMethod(this);
        this.viewType = getViewType(component, viewIndex);
        this.className = `_View_${component.type.name}${viewIndex}`;
        this.classType = o.importType(new compile_metadata_1.CompileIdentifierMetadata({ name: this.className }));
        this.viewFactory = o.variable(util_1.getViewFactoryName(component, viewIndex));
        if (this.viewType === core_private_1.ViewType.COMPONENT || this.viewType === core_private_1.ViewType.HOST) {
            this.componentView = this;
        }
        else {
            this.componentView = this.declarationElement.view.componentView;
        }
        this.componentContext =
            util_1.getPropertyInView(o.THIS_EXPR.prop('context'), this, this.componentView);
        var viewQueries = new compile_metadata_1.CompileTokenMap();
        if (this.viewType === core_private_1.ViewType.COMPONENT) {
            var directiveInstance = o.THIS_EXPR.prop('context');
            collection_1.ListWrapper.forEachWithIndex(this.component.viewQueries, (queryMeta, queryIndex) => {
                var propName = `_viewQuery_${queryMeta.selectors[0].name}_${queryIndex}`;
                var queryList = compile_query_1.createQueryList(queryMeta, directiveInstance, propName, this);
                var query = new compile_query_1.CompileQuery(queryMeta, queryList, directiveInstance, this);
                compile_query_1.addQueryToTokenMap(viewQueries, query);
            });
            var constructorViewQueryCount = 0;
            this.component.type.diDeps.forEach((dep) => {
                if (lang_1.isPresent(dep.viewQuery)) {
                    var queryList = o.THIS_EXPR.prop('declarationAppElement')
                        .prop('componentConstructorViewQueries')
                        .key(o.literal(constructorViewQueryCount++));
                    var query = new compile_query_1.CompileQuery(dep.viewQuery, queryList, null, this);
                    compile_query_1.addQueryToTokenMap(viewQueries, query);
                }
            });
        }
        this.viewQueries = viewQueries;
        templateVariableBindings.forEach((entry) => { this.locals.set(entry[1], o.THIS_EXPR.prop('context').prop(entry[0])); });
        if (!this.declarationElement.isNull()) {
            this.declarationElement.setEmbeddedView(this);
        }
    }
    /**
     * @param {?} name
     * @param {?} input
     * @param {?} args
     * @return {?}
     */
    callPipe(name, input, args) {
        return compile_pipe_1.CompilePipe.call(this, name, [input].concat(args));
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getLocal(name) {
        if (name == constants_1.EventHandlerVars.event.name) {
            return constants_1.EventHandlerVars.event;
        }
        var /** @type {?} */ currView = this;
        var /** @type {?} */ result = currView.locals.get(name);
        while (lang_1.isBlank(result) && lang_1.isPresent(currView.declarationElement.view)) {
            currView = currView.declarationElement.view;
            result = currView.locals.get(name);
        }
        if (lang_1.isPresent(result)) {
            return util_1.getPropertyInView(result, this, currView);
        }
        else {
            return null;
        }
    }
    /**
     * @param {?} values
     * @return {?}
     */
    createLiteralArray(values) {
        if (values.length === 0) {
            return o.importExpr(identifiers_1.Identifiers.EMPTY_ARRAY);
        }
        var /** @type {?} */ proxyExpr = o.THIS_EXPR.prop(`_arr_${this.literalArrayCount++}`);
        var /** @type {?} */ proxyParams = [];
        var /** @type {?} */ proxyReturnEntries = [];
        for (var /** @type {?} */ i = 0; i < values.length; i++) {
            var /** @type {?} */ paramName = `p${i}`;
            proxyParams.push(new o.FnParam(paramName));
            proxyReturnEntries.push(o.variable(paramName));
        }
        util_1.createPureProxy(o.fn(proxyParams, [new o.ReturnStatement(o.literalArr(proxyReturnEntries))], new o.ArrayType(o.DYNAMIC_TYPE)), values.length, proxyExpr, this);
        return proxyExpr.callFn(values);
    }
    /**
     * @param {?} entries
     * @return {?}
     */
    createLiteralMap(entries) {
        if (entries.length === 0) {
            return o.importExpr(identifiers_1.Identifiers.EMPTY_MAP);
        }
        var /** @type {?} */ proxyExpr = o.THIS_EXPR.prop(`_map_${this.literalMapCount++}`);
        var /** @type {?} */ proxyParams = [];
        var /** @type {?} */ proxyReturnEntries = [];
        var /** @type {?} */ values = [];
        for (var /** @type {?} */ i = 0; i < entries.length; i++) {
            var /** @type {?} */ paramName = `p${i}`;
            proxyParams.push(new o.FnParam(paramName));
            proxyReturnEntries.push([entries[i][0], o.variable(paramName)]);
            values.push(/** @type {?} */ (entries[i][1]));
        }
        util_1.createPureProxy(o.fn(proxyParams, [new o.ReturnStatement(o.literalMap(proxyReturnEntries))], new o.MapType(o.DYNAMIC_TYPE)), entries.length, proxyExpr, this);
        return proxyExpr.callFn(values);
    }
    /**
     * @return {?}
     */
    afterNodes() {
        this.pipes.forEach((pipe) => pipe.create());
        this.viewQueries.values().forEach((queries) => queries.forEach((query) => query.afterChildren(this.updateViewQueriesMethod)));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompileView.prototype.viewType;
        /** @type {?} */
        CompileView.prototype.viewQueries;
        /** @type {?} */
        CompileView.prototype.nodes;
        /** @type {?} */
        CompileView.prototype.rootNodesOrAppElements;
        /** @type {?} */
        CompileView.prototype.bindings;
        /** @type {?} */
        CompileView.prototype.classStatements;
        /** @type {?} */
        CompileView.prototype.createMethod;
        /** @type {?} */
        CompileView.prototype.injectorGetMethod;
        /** @type {?} */
        CompileView.prototype.updateContentQueriesMethod;
        /** @type {?} */
        CompileView.prototype.dirtyParentQueriesMethod;
        /** @type {?} */
        CompileView.prototype.updateViewQueriesMethod;
        /** @type {?} */
        CompileView.prototype.detectChangesInInputsMethod;
        /** @type {?} */
        CompileView.prototype.detectChangesRenderPropertiesMethod;
        /** @type {?} */
        CompileView.prototype.afterContentLifecycleCallbacksMethod;
        /** @type {?} */
        CompileView.prototype.afterViewLifecycleCallbacksMethod;
        /** @type {?} */
        CompileView.prototype.destroyMethod;
        /** @type {?} */
        CompileView.prototype.eventHandlerMethods;
        /** @type {?} */
        CompileView.prototype.fields;
        /** @type {?} */
        CompileView.prototype.getters;
        /** @type {?} */
        CompileView.prototype.disposables;
        /** @type {?} */
        CompileView.prototype.subscriptions;
        /** @type {?} */
        CompileView.prototype.componentView;
        /** @type {?} */
        CompileView.prototype.purePipes;
        /** @type {?} */
        CompileView.prototype.pipes;
        /** @type {?} */
        CompileView.prototype.locals;
        /** @type {?} */
        CompileView.prototype.className;
        /** @type {?} */
        CompileView.prototype.classType;
        /** @type {?} */
        CompileView.prototype.viewFactory;
        /** @type {?} */
        CompileView.prototype.literalArrayCount;
        /** @type {?} */
        CompileView.prototype.literalMapCount;
        /** @type {?} */
        CompileView.prototype.pipeCount;
        /** @type {?} */
        CompileView.prototype.componentContext;
        /** @type {?} */
        CompileView.prototype.component;
        /** @type {?} */
        CompileView.prototype.genConfig;
        /** @type {?} */
        CompileView.prototype.pipeMetas;
        /** @type {?} */
        CompileView.prototype.styles;
        /** @type {?} */
        CompileView.prototype.viewIndex;
        /** @type {?} */
        CompileView.prototype.declarationElement;
        /** @type {?} */
        CompileView.prototype.templateVariableBindings;
    }
}
exports.CompileView = CompileView;
/**
 * @param {?} component
 * @param {?} embeddedTemplateIndex
 * @return {?}
 */
function getViewType(component, embeddedTemplateIndex) {
    if (embeddedTemplateIndex > 0) {
        return core_private_1.ViewType.EMBEDDED;
    }
    else if (component.type.isHost) {
        return core_private_1.ViewType.HOST;
    }
    else {
        return core_private_1.ViewType.COMPONENT;
    }
}
//# sourceMappingURL=compile_view.js.map