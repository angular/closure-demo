goog.module('_angular$compiler$src$view__compiler$lifecycle__binder');
var core_private_1 = goog.require('_angular$compiler$core__private');
var o = goog.require('_angular$compiler$src$output$output__ast');
var constants_1 = goog.require('_angular$compiler$src$view__compiler$constants');
var /** @type {?} */ STATE_IS_NEVER_CHECKED = o.THIS_EXPR.prop('cdState').identical(constants_1.ChangeDetectorStateEnum.NeverChecked);
var /** @type {?} */ NOT_THROW_ON_CHANGES = o.not(constants_1.DetectChangesVars.throwOnChange);
/**
 * @param {?} directiveAst
 * @param {?} directiveInstance
 * @param {?} compileElement
 * @return {?}
 */
function bindDirectiveDetectChangesLifecycleCallbacks(directiveAst, directiveInstance, compileElement) {
    var /** @type {?} */ view = compileElement.view;
    var /** @type {?} */ detectChangesInInputsMethod = view.detectChangesInInputsMethod;
    var /** @type {?} */ lifecycleHooks = directiveAst.directive.lifecycleHooks;
    if (lifecycleHooks.indexOf(core_private_1.LifecycleHooks.OnChanges) !== -1 && directiveAst.inputs.length > 0) {
        detectChangesInInputsMethod.addStmt(new o.IfStmt(constants_1.DetectChangesVars.changes.notIdentical(o.NULL_EXPR), [directiveInstance.callMethod('ngOnChanges', [constants_1.DetectChangesVars.changes]).toStmt()]));
    }
    if (lifecycleHooks.indexOf(core_private_1.LifecycleHooks.OnInit) !== -1) {
        detectChangesInInputsMethod.addStmt(new o.IfStmt(STATE_IS_NEVER_CHECKED.and(NOT_THROW_ON_CHANGES), [directiveInstance.callMethod('ngOnInit', []).toStmt()]));
    }
    if (lifecycleHooks.indexOf(core_private_1.LifecycleHooks.DoCheck) !== -1) {
        detectChangesInInputsMethod.addStmt(new o.IfStmt(NOT_THROW_ON_CHANGES, [directiveInstance.callMethod('ngDoCheck', []).toStmt()]));
    }
}
exports.bindDirectiveDetectChangesLifecycleCallbacks = bindDirectiveDetectChangesLifecycleCallbacks;
/**
 * @param {?} directiveMeta
 * @param {?} directiveInstance
 * @param {?} compileElement
 * @return {?}
 */
function bindDirectiveAfterContentLifecycleCallbacks(directiveMeta, directiveInstance, compileElement) {
    var /** @type {?} */ view = compileElement.view;
    var /** @type {?} */ lifecycleHooks = directiveMeta.lifecycleHooks;
    var /** @type {?} */ afterContentLifecycleCallbacksMethod = view.afterContentLifecycleCallbacksMethod;
    afterContentLifecycleCallbacksMethod.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
    if (lifecycleHooks.indexOf(core_private_1.LifecycleHooks.AfterContentInit) !== -1) {
        afterContentLifecycleCallbacksMethod.addStmt(new o.IfStmt(STATE_IS_NEVER_CHECKED, [directiveInstance.callMethod('ngAfterContentInit', []).toStmt()]));
    }
    if (lifecycleHooks.indexOf(core_private_1.LifecycleHooks.AfterContentChecked) !== -1) {
        afterContentLifecycleCallbacksMethod.addStmt(directiveInstance.callMethod('ngAfterContentChecked', []).toStmt());
    }
}
exports.bindDirectiveAfterContentLifecycleCallbacks = bindDirectiveAfterContentLifecycleCallbacks;
/**
 * @param {?} directiveMeta
 * @param {?} directiveInstance
 * @param {?} compileElement
 * @return {?}
 */
function bindDirectiveAfterViewLifecycleCallbacks(directiveMeta, directiveInstance, compileElement) {
    var /** @type {?} */ view = compileElement.view;
    var /** @type {?} */ lifecycleHooks = directiveMeta.lifecycleHooks;
    var /** @type {?} */ afterViewLifecycleCallbacksMethod = view.afterViewLifecycleCallbacksMethod;
    afterViewLifecycleCallbacksMethod.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
    if (lifecycleHooks.indexOf(core_private_1.LifecycleHooks.AfterViewInit) !== -1) {
        afterViewLifecycleCallbacksMethod.addStmt(new o.IfStmt(STATE_IS_NEVER_CHECKED, [directiveInstance.callMethod('ngAfterViewInit', []).toStmt()]));
    }
    if (lifecycleHooks.indexOf(core_private_1.LifecycleHooks.AfterViewChecked) !== -1) {
        afterViewLifecycleCallbacksMethod.addStmt(directiveInstance.callMethod('ngAfterViewChecked', []).toStmt());
    }
}
exports.bindDirectiveAfterViewLifecycleCallbacks = bindDirectiveAfterViewLifecycleCallbacks;
/**
 * @param {?} directiveMeta
 * @param {?} directiveInstance
 * @param {?} compileElement
 * @return {?}
 */
function bindDirectiveDestroyLifecycleCallbacks(directiveMeta, directiveInstance, compileElement) {
    var /** @type {?} */ onDestroyMethod = compileElement.view.destroyMethod;
    onDestroyMethod.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
    if (directiveMeta.lifecycleHooks.indexOf(core_private_1.LifecycleHooks.OnDestroy) !== -1) {
        onDestroyMethod.addStmt(directiveInstance.callMethod('ngOnDestroy', []).toStmt());
    }
}
exports.bindDirectiveDestroyLifecycleCallbacks = bindDirectiveDestroyLifecycleCallbacks;
/**
 * @param {?} pipeMeta
 * @param {?} pipeInstance
 * @param {?} view
 * @return {?}
 */
function bindPipeDestroyLifecycleCallbacks(pipeMeta, pipeInstance, view) {
    var /** @type {?} */ onDestroyMethod = view.destroyMethod;
    if (pipeMeta.lifecycleHooks.indexOf(core_private_1.LifecycleHooks.OnDestroy) !== -1) {
        onDestroyMethod.addStmt(pipeInstance.callMethod('ngOnDestroy', []).toStmt());
    }
}
exports.bindPipeDestroyLifecycleCallbacks = bindPipeDestroyLifecycleCallbacks;
//# sourceMappingURL=lifecycle_binder.js.map