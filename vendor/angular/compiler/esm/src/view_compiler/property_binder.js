goog.module('_angular$compiler$src$view__compiler$property__binder');
var core_private_1 = goog.require('_angular$compiler$core__private');
var core_private_2 = core_private_1;
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var o = goog.require('_angular$compiler$src$output$output__ast');
var identifiers_1 = goog.require('_angular$compiler$src$identifiers');
var constants_1 = goog.require('_angular$compiler$src$view__compiler$constants');
var template_ast_1 = goog.require('_angular$compiler$src$template__ast');
var util_1 = goog.require('_angular$compiler$src$util');
var expression_converter_1 = goog.require('_angular$compiler$src$view__compiler$expression__converter');
var compile_binding_1 = goog.require('_angular$compiler$src$view__compiler$compile__binding');
/**
 * @param {?} exprIndex
 * @return {?}
 */
function createBindFieldExpr(exprIndex) {
    return o.THIS_EXPR.prop(`_expr_${exprIndex}`);
}
/**
 * @param {?} exprIndex
 * @return {?}
 */
function createCurrValueExpr(exprIndex) {
    return o.variable(`currVal_${exprIndex}`); // fix syntax highlighting: `
}
/**
 * @param {?} view
 * @param {?} currValExpr
 * @param {?} fieldExpr
 * @param {?} parsedExpression
 * @param {?} context
 * @param {?} actions
 * @param {?} method
 * @return {?}
 */
function bind(view, currValExpr, fieldExpr, parsedExpression, context, actions, method) {
    var /** @type {?} */ checkExpression = expression_converter_1.convertCdExpressionToIr(view, context, parsedExpression, constants_1.DetectChangesVars.valUnwrapper);
    if (lang_1.isBlank(checkExpression.expression)) {
        // e.g. an empty expression was given
        return;
    }
    // private is fine here as no child view will reference the cached value...
    view.fields.push(new o.ClassField(fieldExpr.name, null, [o.StmtModifier.Private]));
    view.createMethod.addStmt(o.THIS_EXPR.prop(fieldExpr.name).set(o.importExpr(identifiers_1.Identifiers.uninitialized)).toStmt());
    if (checkExpression.needsValueUnwrapper) {
        var /** @type {?} */ initValueUnwrapperStmt = constants_1.DetectChangesVars.valUnwrapper.callMethod('reset', []).toStmt();
        method.addStmt(initValueUnwrapperStmt);
    }
    method.addStmt(currValExpr.set(checkExpression.expression).toDeclStmt(null, [o.StmtModifier.Final]));
    var /** @type {?} */ condition = o.importExpr(identifiers_1.Identifiers.checkBinding)
        .callFn([constants_1.DetectChangesVars.throwOnChange, fieldExpr, currValExpr]);
    if (checkExpression.needsValueUnwrapper) {
        condition = constants_1.DetectChangesVars.valUnwrapper.prop('hasWrappedValue').or(condition);
    }
    method.addStmt(new o.IfStmt(condition, actions.concat([(o.THIS_EXPR.prop(fieldExpr.name).set(currValExpr).toStmt())])));
}
/**
 * @param {?} boundText
 * @param {?} compileNode
 * @param {?} view
 * @return {?}
 */
function bindRenderText(boundText, compileNode, view) {
    var /** @type {?} */ bindingIndex = view.bindings.length;
    view.bindings.push(new compile_binding_1.CompileBinding(compileNode, boundText));
    var /** @type {?} */ currValExpr = createCurrValueExpr(bindingIndex);
    var /** @type {?} */ valueField = createBindFieldExpr(bindingIndex);
    view.detectChangesRenderPropertiesMethod.resetDebugInfo(compileNode.nodeIndex, boundText);
    bind(view, currValExpr, valueField, boundText.value, view.componentContext, [
        o.THIS_EXPR.prop('renderer')
            .callMethod('setText', [compileNode.renderNode, currValExpr])
            .toStmt()
    ], view.detectChangesRenderPropertiesMethod);
}
exports.bindRenderText = bindRenderText;
/**
 * @param {?} boundProps
 * @param {?} context
 * @param {?} compileElement
 * @return {?}
 */
function bindAndWriteToRenderer(boundProps, context, compileElement) {
    var /** @type {?} */ view = compileElement.view;
    var /** @type {?} */ renderNode = compileElement.renderNode;
    boundProps.forEach((boundProp) => {
        var /** @type {?} */ bindingIndex = view.bindings.length;
        view.bindings.push(new compile_binding_1.CompileBinding(compileElement, boundProp));
        view.detectChangesRenderPropertiesMethod.resetDebugInfo(compileElement.nodeIndex, boundProp);
        var /** @type {?} */ fieldExpr = createBindFieldExpr(bindingIndex);
        var /** @type {?} */ currValExpr = createCurrValueExpr(bindingIndex);
        var /** @type {?} */ renderMethod;
        var /** @type {?} */ renderValue = sanitizedValue(boundProp, currValExpr);
        var /** @type {?} */ updateStmts = [];
        switch (boundProp.type) {
            case template_ast_1.PropertyBindingType.Property:
                renderMethod = 'setElementProperty';
                if (view.genConfig.logBindingUpdate) {
                    updateStmts.push(logBindingUpdateStmt(renderNode, boundProp.name, currValExpr));
                }
                break;
            case template_ast_1.PropertyBindingType.Attribute:
                renderMethod = 'setElementAttribute';
                renderValue =
                    renderValue.isBlank().conditional(o.NULL_EXPR, renderValue.callMethod('toString', []));
                break;
            case template_ast_1.PropertyBindingType.Class:
                renderMethod = 'setElementClass';
                break;
            case template_ast_1.PropertyBindingType.Style:
                renderMethod = 'setElementStyle';
                var /** @type {?} */ strValue = renderValue.callMethod('toString', []);
                if (lang_1.isPresent(boundProp.unit)) {
                    strValue = strValue.plus(o.literal(boundProp.unit));
                }
                renderValue = renderValue.isBlank().conditional(o.NULL_EXPR, strValue);
                break;
        }
        updateStmts.push(o.THIS_EXPR.prop('renderer')
            .callMethod(renderMethod, [renderNode, o.literal(boundProp.name), renderValue])
            .toStmt());
        bind(view, currValExpr, fieldExpr, boundProp.value, context, updateStmts, view.detectChangesRenderPropertiesMethod);
    });
}
/**
 * @param {?} boundProp
 * @param {?} renderValue
 * @return {?}
 */
function sanitizedValue(boundProp, renderValue) {
    let /** @type {?} */ enumValue;
    switch (boundProp.securityContext) {
        case core_private_1.SecurityContext.NONE:
            return renderValue; // No sanitization needed.
        case core_private_1.SecurityContext.HTML:
            enumValue = 'HTML';
            break;
        case core_private_1.SecurityContext.STYLE:
            enumValue = 'STYLE';
            break;
        case core_private_1.SecurityContext.SCRIPT:
            enumValue = 'SCRIPT';
            break;
        case core_private_1.SecurityContext.URL:
            enumValue = 'URL';
            break;
        case core_private_1.SecurityContext.RESOURCE_URL:
            enumValue = 'RESOURCE_URL';
            break;
        default:
            throw new Error(`internal error, unexpected SecurityContext ${boundProp.securityContext}.`);
    }
    let /** @type {?} */ ctx = constants_1.ViewProperties.viewUtils.prop('sanitizer');
    let /** @type {?} */ args = [o.importExpr(identifiers_1.Identifiers.SecurityContext).prop(enumValue), renderValue];
    return ctx.callMethod('sanitize', args);
}
/**
 * @param {?} boundProps
 * @param {?} compileElement
 * @return {?}
 */
function bindRenderInputs(boundProps, compileElement) {
    bindAndWriteToRenderer(boundProps, compileElement.view.componentContext, compileElement);
}
exports.bindRenderInputs = bindRenderInputs;
/**
 * @param {?} directiveAst
 * @param {?} directiveInstance
 * @param {?} compileElement
 * @return {?}
 */
function bindDirectiveHostProps(directiveAst, directiveInstance, compileElement) {
    bindAndWriteToRenderer(directiveAst.hostProperties, directiveInstance, compileElement);
}
exports.bindDirectiveHostProps = bindDirectiveHostProps;
/**
 * @param {?} directiveAst
 * @param {?} directiveInstance
 * @param {?} compileElement
 * @return {?}
 */
function bindDirectiveInputs(directiveAst, directiveInstance, compileElement) {
    if (directiveAst.inputs.length === 0) {
        return;
    }
    var /** @type {?} */ view = compileElement.view;
    var /** @type {?} */ detectChangesInInputsMethod = view.detectChangesInInputsMethod;
    detectChangesInInputsMethod.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
    var /** @type {?} */ lifecycleHooks = directiveAst.directive.lifecycleHooks;
    var /** @type {?} */ calcChangesMap = lifecycleHooks.indexOf(core_private_2.LifecycleHooks.OnChanges) !== -1;
    var /** @type {?} */ isOnPushComp = directiveAst.directive.isComponent &&
        !core_private_2.isDefaultChangeDetectionStrategy(directiveAst.directive.changeDetection);
    if (calcChangesMap) {
        detectChangesInInputsMethod.addStmt(constants_1.DetectChangesVars.changes.set(o.NULL_EXPR).toStmt());
    }
    if (isOnPushComp) {
        detectChangesInInputsMethod.addStmt(constants_1.DetectChangesVars.changed.set(o.literal(false)).toStmt());
    }
    directiveAst.inputs.forEach((input) => {
        var /** @type {?} */ bindingIndex = view.bindings.length;
        view.bindings.push(new compile_binding_1.CompileBinding(compileElement, input));
        detectChangesInInputsMethod.resetDebugInfo(compileElement.nodeIndex, input);
        var /** @type {?} */ fieldExpr = createBindFieldExpr(bindingIndex);
        var /** @type {?} */ currValExpr = createCurrValueExpr(bindingIndex);
        var /** @type {?} */ statements = [directiveInstance.prop(input.directiveName).set(currValExpr).toStmt()];
        if (calcChangesMap) {
            statements.push(new o.IfStmt(constants_1.DetectChangesVars.changes.identical(o.NULL_EXPR), [
                constants_1.DetectChangesVars.changes.set(o.literalMap([], new o.MapType(o.importType(identifiers_1.Identifiers.SimpleChange))))
                    .toStmt()
            ]));
            statements.push(constants_1.DetectChangesVars.changes.key(o.literal(input.directiveName))
                .set(o.importExpr(identifiers_1.Identifiers.SimpleChange).instantiate([fieldExpr, currValExpr]))
                .toStmt());
        }
        if (isOnPushComp) {
            statements.push(constants_1.DetectChangesVars.changed.set(o.literal(true)).toStmt());
        }
        if (view.genConfig.logBindingUpdate) {
            statements.push(logBindingUpdateStmt(compileElement.renderNode, input.directiveName, currValExpr));
        }
        bind(view, currValExpr, fieldExpr, input.value, view.componentContext, statements, detectChangesInInputsMethod);
    });
    if (isOnPushComp) {
        detectChangesInInputsMethod.addStmt(new o.IfStmt(constants_1.DetectChangesVars.changed, [
            compileElement.appElement.prop('componentView')
                .callMethod('markAsCheckOnce', [])
                .toStmt()
        ]));
    }
}
exports.bindDirectiveInputs = bindDirectiveInputs;
/**
 * @param {?} renderNode
 * @param {?} propName
 * @param {?} value
 * @return {?}
 */
function logBindingUpdateStmt(renderNode, propName, value) {
    return o.THIS_EXPR.prop('renderer')
        .callMethod('setBindingDebugInfo', [
        renderNode,
        o.literal(`ng-reflect-${util_1.camelCaseToDashCase(propName)}`),
        value.isBlank().conditional(o.NULL_EXPR, value.callMethod('toString', []))
    ])
        .toStmt();
}
//# sourceMappingURL=property_binder.js.map