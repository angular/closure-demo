goog.module('_angular$compiler$src$view__compiler$event__binder');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var constants_1 = goog.require('_angular$compiler$src$view__compiler$constants');
var o = goog.require('_angular$compiler$src$output$output__ast');
var compile_method_1 = goog.require('_angular$compiler$src$view__compiler$compile__method');
var expression_converter_1 = goog.require('_angular$compiler$src$view__compiler$expression__converter');
var compile_binding_1 = goog.require('_angular$compiler$src$view__compiler$compile__binding');
class CompileEventListener {
    /**
     * @param {?} compileElement
     * @param {?} eventTarget
     * @param {?} eventName
     * @param {?} listenerIndex
     */
    constructor(compileElement, eventTarget, eventName, listenerIndex) {
        this.compileElement = compileElement;
        this.eventTarget = eventTarget;
        this.eventName = eventName;
        this._hasComponentHostListener = false;
        this._actionResultExprs = [];
        this._method = new compile_method_1.CompileMethod(compileElement.view);
        this._methodName =
            `_handle_${santitizeEventName(eventName)}_${compileElement.nodeIndex}_${listenerIndex}`;
        this._eventParam =
            new o.FnParam(constants_1.EventHandlerVars.event.name, o.importType(this.compileElement.view.genConfig.renderTypes.renderEvent));
    }
    /**
     * @param {?} compileElement
     * @param {?} eventTarget
     * @param {?} eventName
     * @param {?} targetEventListeners
     * @return {?}
     */
    static getOrCreate(compileElement, eventTarget, eventName, targetEventListeners) {
        var /** @type {?} */ listener = targetEventListeners.find(listener => listener.eventTarget == eventTarget &&
            listener.eventName == eventName);
        if (lang_1.isBlank(listener)) {
            listener = new CompileEventListener(compileElement, eventTarget, eventName, targetEventListeners.length);
            targetEventListeners.push(listener);
        }
        return listener;
    }
    /**
     * @param {?} hostEvent
     * @param {?} directive
     * @param {?} directiveInstance
     * @return {?}
     */
    addAction(hostEvent, directive, directiveInstance) {
        if (lang_1.isPresent(directive) && directive.isComponent) {
            this._hasComponentHostListener = true;
        }
        this._method.resetDebugInfo(this.compileElement.nodeIndex, hostEvent);
        var /** @type {?} */ context = lang_1.isPresent(directiveInstance) ? directiveInstance :
            this.compileElement.view.componentContext;
        var /** @type {?} */ actionStmts = expression_converter_1.convertCdStatementToIr(this.compileElement.view, context, hostEvent.handler);
        var /** @type {?} */ lastIndex = actionStmts.length - 1;
        if (lastIndex >= 0) {
            var /** @type {?} */ lastStatement = actionStmts[lastIndex];
            var /** @type {?} */ returnExpr = convertStmtIntoExpression(lastStatement);
            var /** @type {?} */ preventDefaultVar = o.variable(`pd_${this._actionResultExprs.length}`);
            this._actionResultExprs.push(preventDefaultVar);
            if (lang_1.isPresent(returnExpr)) {
                // Note: We need to cast the result of the method call to dynamic,
                // as it might be a void method!
                actionStmts[lastIndex] =
                    preventDefaultVar.set(returnExpr.cast(o.DYNAMIC_TYPE).notIdentical(o.literal(false)))
                        .toDeclStmt(null, [o.StmtModifier.Final]);
            }
        }
        this._method.addStmts(actionStmts);
    }
    /**
     * @return {?}
     */
    finishMethod() {
        var /** @type {?} */ markPathToRootStart = this._hasComponentHostListener ?
            this.compileElement.appElement.prop('componentView') :
            o.THIS_EXPR;
        var /** @type {?} */ resultExpr = o.literal(true);
        this._actionResultExprs.forEach((expr) => { resultExpr = resultExpr.and(expr); });
        var /** @type {?} */ stmts = (([markPathToRootStart.callMethod('markPathToRootAsCheckOnce', []).toStmt()]))
            .concat(this._method.finish())
            .concat([new o.ReturnStatement(resultExpr)]);
        // private is fine here as no child view will reference the event handler...
        this.compileElement.view.eventHandlerMethods.push(new o.ClassMethod(this._methodName, [this._eventParam], stmts, o.BOOL_TYPE, [o.StmtModifier.Private]));
    }
    /**
     * @return {?}
     */
    listenToRenderer() {
        var /** @type {?} */ listenExpr;
        var /** @type {?} */ eventListener = o.THIS_EXPR.callMethod('eventHandler', [o.THIS_EXPR.prop(this._methodName).callMethod(o.BuiltinMethod.bind, [o.THIS_EXPR])]);
        if (lang_1.isPresent(this.eventTarget)) {
            listenExpr = constants_1.ViewProperties.renderer.callMethod('listenGlobal', [o.literal(this.eventTarget), o.literal(this.eventName), eventListener]);
        }
        else {
            listenExpr = constants_1.ViewProperties.renderer.callMethod('listen', [this.compileElement.renderNode, o.literal(this.eventName), eventListener]);
        }
        var /** @type {?} */ disposable = o.variable(`disposable_${this.compileElement.view.disposables.length}`);
        this.compileElement.view.disposables.push(disposable);
        // private is fine here as no child view will reference the event handler...
        this.compileElement.view.createMethod.addStmt(disposable.set(listenExpr).toDeclStmt(o.FUNCTION_TYPE, [o.StmtModifier.Private]));
    }
    /**
     * @param {?} directiveInstance
     * @param {?} observablePropName
     * @return {?}
     */
    listenToDirective(directiveInstance, observablePropName) {
        var /** @type {?} */ subscription = o.variable(`subscription_${this.compileElement.view.subscriptions.length}`);
        this.compileElement.view.subscriptions.push(subscription);
        var /** @type {?} */ eventListener = o.THIS_EXPR.callMethod('eventHandler', [o.THIS_EXPR.prop(this._methodName).callMethod(o.BuiltinMethod.bind, [o.THIS_EXPR])]);
        this.compileElement.view.createMethod.addStmt(subscription.set(directiveInstance.prop(observablePropName)
            .callMethod(o.BuiltinMethod.SubscribeObservable, [eventListener]))
            .toDeclStmt(null, [o.StmtModifier.Final]));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompileEventListener.prototype._method;
        /** @type {?} */
        CompileEventListener.prototype._hasComponentHostListener;
        /** @type {?} */
        CompileEventListener.prototype._methodName;
        /** @type {?} */
        CompileEventListener.prototype._eventParam;
        /** @type {?} */
        CompileEventListener.prototype._actionResultExprs;
        /** @type {?} */
        CompileEventListener.prototype.compileElement;
        /** @type {?} */
        CompileEventListener.prototype.eventTarget;
        /** @type {?} */
        CompileEventListener.prototype.eventName;
    }
}
exports.CompileEventListener = CompileEventListener;
/**
 * @param {?} hostEvents
 * @param {?} dirs
 * @param {?} compileElement
 * @return {?}
 */
function collectEventListeners(hostEvents, dirs, compileElement) {
    var /** @type {?} */ eventListeners = [];
    hostEvents.forEach((hostEvent) => {
        compileElement.view.bindings.push(new compile_binding_1.CompileBinding(compileElement, hostEvent));
        var /** @type {?} */ listener = CompileEventListener.getOrCreate(compileElement, hostEvent.target, hostEvent.name, eventListeners);
        listener.addAction(hostEvent, null, null);
    });
    collection_1.ListWrapper.forEachWithIndex(dirs, (directiveAst, i) => {
        var /** @type {?} */ directiveInstance = compileElement.directiveInstances[i];
        directiveAst.hostEvents.forEach((hostEvent) => {
            compileElement.view.bindings.push(new compile_binding_1.CompileBinding(compileElement, hostEvent));
            var /** @type {?} */ listener = CompileEventListener.getOrCreate(compileElement, hostEvent.target, hostEvent.name, eventListeners);
            listener.addAction(hostEvent, directiveAst.directive, directiveInstance);
        });
    });
    eventListeners.forEach((listener) => listener.finishMethod());
    return eventListeners;
}
exports.collectEventListeners = collectEventListeners;
/**
 * @param {?} directiveAst
 * @param {?} directiveInstance
 * @param {?} eventListeners
 * @return {?}
 */
function bindDirectiveOutputs(directiveAst, directiveInstance, eventListeners) {
    collection_1.StringMapWrapper.forEach(directiveAst.directive.outputs, (eventName, observablePropName) => {
        eventListeners.filter(listener => listener.eventName == eventName)
            .forEach((listener) => { listener.listenToDirective(directiveInstance, observablePropName); });
    });
}
exports.bindDirectiveOutputs = bindDirectiveOutputs;
/**
 * @param {?} eventListeners
 * @return {?}
 */
function bindRenderOutputs(eventListeners) {
    eventListeners.forEach(listener => listener.listenToRenderer());
}
exports.bindRenderOutputs = bindRenderOutputs;
/**
 * @param {?} stmt
 * @return {?}
 */
function convertStmtIntoExpression(stmt) {
    if (stmt instanceof o.ExpressionStatement) {
        return stmt.expr;
    }
    else if (stmt instanceof o.ReturnStatement) {
        return stmt.value;
    }
    return null;
}
/**
 * @param {?} name
 * @return {?}
 */
function santitizeEventName(name) {
    return lang_1.StringWrapper.replaceAll(name, /[^a-zA-Z_]/g, '_');
}
//# sourceMappingURL=event_binder.js.map