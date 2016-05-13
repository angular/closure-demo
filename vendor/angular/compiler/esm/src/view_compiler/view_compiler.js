goog.module('_angular$compiler$src$view__compiler$view__compiler');
var core_1 = goog.require('_angular$core');
var compile_element_1 = goog.require('_angular$compiler$src$view__compiler$compile__element');
var compile_view_1 = goog.require('_angular$compiler$src$view__compiler$compile__view');
var view_builder_1 = goog.require('_angular$compiler$src$view__compiler$view__builder');
var view_binder_1 = goog.require('_angular$compiler$src$view__compiler$view__binder');
var config_1 = goog.require('_angular$compiler$src$config');
class ViewCompileResult {
    /**
     * @param {?} statements
     * @param {?} viewFactoryVar
     * @param {?} dependencies
     */
    constructor(statements, viewFactoryVar, dependencies) {
        this.statements = statements;
        this.viewFactoryVar = viewFactoryVar;
        this.dependencies = dependencies;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ViewCompileResult.prototype.statements;
        /** @type {?} */
        ViewCompileResult.prototype.viewFactoryVar;
        /** @type {?} */
        ViewCompileResult.prototype.dependencies;
    }
}
exports.ViewCompileResult = ViewCompileResult;
class ViewCompiler {
    /**
     * @param {?} _genConfig
     */
    constructor(_genConfig) {
        this._genConfig = _genConfig;
    }
    /**
     * @param {?} component
     * @param {?} template
     * @param {?} styles
     * @param {?} pipes
     * @return {?}
     */
    compileComponent(component, template, styles, pipes) {
        var /** @type {?} */ statements = [];
        var /** @type {?} */ dependencies = [];
        var /** @type {?} */ view = new compile_view_1.CompileView(component, this._genConfig, pipes, styles, 0, compile_element_1.CompileElement.createNull(), []);
        view_builder_1.buildView(view, template, dependencies);
        // Need to separate binding from creation to be able to refer to
        // variables that have been declared after usage.
        view_binder_1.bindView(view, template);
        view_builder_1.finishView(view, statements);
        return new ViewCompileResult(statements, view.viewFactory.name, dependencies);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ViewCompiler.prototype._genConfig;
    }
}
ViewCompiler.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ ViewCompiler.ctorParameters = [
    { type: config_1.CompilerConfig, },
];
exports.ViewCompiler = ViewCompiler;
//# sourceMappingURL=view_compiler.js.map