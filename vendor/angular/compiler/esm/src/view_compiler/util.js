goog.module('_angular$compiler$src$view__compiler$util');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
var o = goog.require('_angular$compiler$src$output$output__ast');
var identifiers_1 = goog.require('_angular$compiler$src$identifiers');
/**
 * @param {?} property
 * @param {?} callingView
 * @param {?} definedView
 * @return {?}
 */
function getPropertyInView(property, callingView, definedView) {
    if (callingView === definedView) {
        return property;
    }
    else {
        var /** @type {?} */ viewProp = o.THIS_EXPR;
        var /** @type {?} */ currView = callingView;
        while (currView !== definedView && lang_1.isPresent(currView.declarationElement.view)) {
            currView = currView.declarationElement.view;
            viewProp = viewProp.prop('parent');
        }
        if (currView !== definedView) {
            throw new exceptions_1.BaseException(`Internal error: Could not calculate a property in a parent view: ${property}`);
        }
        if (property instanceof o.ReadPropExpr) {
            let /** @type {?} */ readPropExpr = property;
            // Note: Don't cast for members of the AppView base class...
            if (definedView.fields.some((field) => field.name == readPropExpr.name) ||
                definedView.getters.some((field) => field.name == readPropExpr.name)) {
                viewProp = viewProp.cast(definedView.classType);
            }
        }
        return o.replaceVarInExpression(o.THIS_EXPR.name, viewProp, property);
    }
}
exports.getPropertyInView = getPropertyInView;
/**
 * @param {?} token
 * @param {?} optional
 * @return {?}
 */
function injectFromViewParentInjector(token, optional) {
    var /** @type {?} */ args = [createDiTokenExpression(token)];
    if (optional) {
        args.push(o.NULL_EXPR);
    }
    return o.THIS_EXPR.prop('parentInjector').callMethod('get', args);
}
exports.injectFromViewParentInjector = injectFromViewParentInjector;
/**
 * @param {?} component
 * @param {?} embeddedTemplateIndex
 * @return {?}
 */
function getViewFactoryName(component, embeddedTemplateIndex) {
    return `viewFactory_${component.type.name}${embeddedTemplateIndex}`;
}
exports.getViewFactoryName = getViewFactoryName;
/**
 * @param {?} token
 * @return {?}
 */
function createDiTokenExpression(token) {
    if (lang_1.isPresent(token.value)) {
        return o.literal(token.value);
    }
    else if (token.identifierIsInstance) {
        return o.importExpr(token.identifier)
            .instantiate([], o.importType(token.identifier, [], [o.TypeModifier.Const]));
    }
    else {
        return o.importExpr(token.identifier);
    }
}
exports.createDiTokenExpression = createDiTokenExpression;
/**
 * @param {?} expressions
 * @return {?}
 */
function createFlatArray(expressions) {
    var /** @type {?} */ lastNonArrayExpressions = [];
    var /** @type {?} */ result = o.literalArr([]);
    for (var /** @type {?} */ i = 0; i < expressions.length; i++) {
        var /** @type {?} */ expr = expressions[i];
        if (expr.type instanceof o.ArrayType) {
            if (lastNonArrayExpressions.length > 0) {
                result =
                    result.callMethod(o.BuiltinMethod.ConcatArray, [o.literalArr(lastNonArrayExpressions)]);
                lastNonArrayExpressions = [];
            }
            result = result.callMethod(o.BuiltinMethod.ConcatArray, [expr]);
        }
        else {
            lastNonArrayExpressions.push(expr);
        }
    }
    if (lastNonArrayExpressions.length > 0) {
        result =
            result.callMethod(o.BuiltinMethod.ConcatArray, [o.literalArr(lastNonArrayExpressions)]);
    }
    return result;
}
exports.createFlatArray = createFlatArray;
/**
 * @param {?} fn
 * @param {?} argCount
 * @param {?} pureProxyProp
 * @param {?} view
 * @return {?}
 */
function createPureProxy(fn, argCount, pureProxyProp, view) {
    view.fields.push(new o.ClassField(pureProxyProp.name, null));
    var /** @type {?} */ pureProxyId = argCount < identifiers_1.Identifiers.pureProxies.length ? identifiers_1.Identifiers.pureProxies[argCount] : null;
    if (lang_1.isBlank(pureProxyId)) {
        throw new exceptions_1.BaseException(`Unsupported number of argument for pure functions: ${argCount}`);
    }
    view.createMethod.addStmt(o.THIS_EXPR.prop(pureProxyProp.name).set(o.importExpr(pureProxyId).callFn([fn])).toStmt());
}
exports.createPureProxy = createPureProxy;
//# sourceMappingURL=util.js.map