/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import { CompilerConfig } from '../config';
import { ElementSchemaRegistry } from '../schema/element_schema_registry';
import { CompileElement } from './compile_element';
import { CompileView } from './compile_view';
import { bindView } from './view_binder';
import { buildView, finishView } from './view_builder';
export { ComponentFactoryDependency, DirectiveWrapperDependency, ViewClassDependency } from './deps';
export var ViewCompileResult = (function () {
    /**
     * @param {?} statements
     * @param {?} viewClassVar
     * @param {?} dependencies
     */
    function ViewCompileResult(statements, viewClassVar, dependencies) {
        this.statements = statements;
        this.viewClassVar = viewClassVar;
        this.dependencies = dependencies;
    }
    ViewCompileResult._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        ViewCompileResult.prototype.statements;
        /** @type {?} */
        ViewCompileResult.prototype.viewClassVar;
        /** @type {?} */
        ViewCompileResult.prototype.dependencies;
    };
    return ViewCompileResult;
}());
export var ViewCompiler = (function () {
    /**
     * @param {?} _genConfig
     * @param {?} _schemaRegistry
     */
    function ViewCompiler(_genConfig, _schemaRegistry) {
        this._genConfig = _genConfig;
        this._schemaRegistry = _schemaRegistry;
    }
    /**
     * @param {?} component
     * @param {?} template
     * @param {?} styles
     * @param {?} pipes
     * @param {?} compiledAnimations
     * @return {?}
     */
    ViewCompiler.prototype.compileComponent = function (component, template, styles, pipes, compiledAnimations) {
        var /** @type {?} */ dependencies = [];
        var /** @type {?} */ view = new CompileView(component, this._genConfig, pipes, styles, compiledAnimations, 0, CompileElement.createNull(), []);
        var /** @type {?} */ statements = [];
        buildView(view, template, dependencies);
        // Need to separate binding from creation to be able to refer to
        // variables that have been declared after usage.
        bindView(view, template, this._schemaRegistry);
        finishView(view, statements);
        return new ViewCompileResult(statements, view.classExpr.name, dependencies);
    };
    ViewCompiler._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        ViewCompiler.decorators;
        /** @nocollapse
        @type {?} */
        ViewCompiler.ctorParameters;
        /** @type {?} */
        ViewCompiler.prototype._genConfig;
        /** @type {?} */
        ViewCompiler.prototype._schemaRegistry;
    };
    ViewCompiler.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ViewCompiler.ctorParameters = [
        { type: CompilerConfig, },
        { type: ElementSchemaRegistry, },
    ];
    return ViewCompiler;
}());
//# sourceMappingURL=view_compiler.js.map