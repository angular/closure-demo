goog.module('_angular$compiler$src$view__compiler$view__binder');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var template_ast_1 = goog.require('_angular$compiler$src$template__ast');
var property_binder_1 = goog.require('_angular$compiler$src$view__compiler$property__binder');
var event_binder_1 = goog.require('_angular$compiler$src$view__compiler$event__binder');
var lifecycle_binder_1 = goog.require('_angular$compiler$src$view__compiler$lifecycle__binder');
/**
 * @param {?} view
 * @param {?} parsedTemplate
 * @return {?}
 */
function bindView(view, parsedTemplate) {
    var /** @type {?} */ visitor = new ViewBinderVisitor(view);
    template_ast_1.templateVisitAll(visitor, parsedTemplate);
    view.pipes.forEach((pipe) => { lifecycle_binder_1.bindPipeDestroyLifecycleCallbacks(pipe.meta, pipe.instance, pipe.view); });
}
exports.bindView = bindView;
class ViewBinderVisitor {
    /**
     * @param {?} view
     */
    constructor(view) {
        this.view = view;
        this._nodeIndex = 0;
    }
    /**
     * @param {?} ast
     * @param {?} parent
     * @return {?}
     */
    visitBoundText(ast, parent) {
        var /** @type {?} */ node = this.view.nodes[this._nodeIndex++];
        property_binder_1.bindRenderText(ast, node, this.view);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} parent
     * @return {?}
     */
    visitText(ast, parent) {
        this._nodeIndex++;
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} parent
     * @return {?}
     */
    visitNgContent(ast, parent) { return null; }
    /**
     * @param {?} ast
     * @param {?} parent
     * @return {?}
     */
    visitElement(ast, parent) {
        var /** @type {?} */ compileElement = (this.view.nodes[this._nodeIndex++]);
        var /** @type {?} */ eventListeners = event_binder_1.collectEventListeners(ast.outputs, ast.directives, compileElement);
        property_binder_1.bindRenderInputs(ast.inputs, compileElement);
        event_binder_1.bindRenderOutputs(eventListeners);
        collection_1.ListWrapper.forEachWithIndex(ast.directives, (directiveAst, index) => {
            var /** @type {?} */ directiveInstance = compileElement.directiveInstances[index];
            property_binder_1.bindDirectiveInputs(directiveAst, directiveInstance, compileElement);
            lifecycle_binder_1.bindDirectiveDetectChangesLifecycleCallbacks(directiveAst, directiveInstance, compileElement);
            property_binder_1.bindDirectiveHostProps(directiveAst, directiveInstance, compileElement);
            event_binder_1.bindDirectiveOutputs(directiveAst, directiveInstance, eventListeners);
        });
        template_ast_1.templateVisitAll(this, ast.children, compileElement);
        // afterContent and afterView lifecycles need to be called bottom up
        // so that children are notified before parents
        collection_1.ListWrapper.forEachWithIndex(ast.directives, (directiveAst, index) => {
            var /** @type {?} */ directiveInstance = compileElement.directiveInstances[index];
            lifecycle_binder_1.bindDirectiveAfterContentLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
            lifecycle_binder_1.bindDirectiveAfterViewLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
            lifecycle_binder_1.bindDirectiveDestroyLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
        });
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} parent
     * @return {?}
     */
    visitEmbeddedTemplate(ast, parent) {
        var /** @type {?} */ compileElement = (this.view.nodes[this._nodeIndex++]);
        var /** @type {?} */ eventListeners = event_binder_1.collectEventListeners(ast.outputs, ast.directives, compileElement);
        collection_1.ListWrapper.forEachWithIndex(ast.directives, (directiveAst, index) => {
            var /** @type {?} */ directiveInstance = compileElement.directiveInstances[index];
            property_binder_1.bindDirectiveInputs(directiveAst, directiveInstance, compileElement);
            lifecycle_binder_1.bindDirectiveDetectChangesLifecycleCallbacks(directiveAst, directiveInstance, compileElement);
            event_binder_1.bindDirectiveOutputs(directiveAst, directiveInstance, eventListeners);
            lifecycle_binder_1.bindDirectiveAfterContentLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
            lifecycle_binder_1.bindDirectiveAfterViewLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
            lifecycle_binder_1.bindDirectiveDestroyLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
        });
        bindView(compileElement.embeddedView, ast.children);
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
        ViewBinderVisitor.prototype._nodeIndex;
        /** @type {?} */
        ViewBinderVisitor.prototype.view;
    }
}
//# sourceMappingURL=view_binder.js.map