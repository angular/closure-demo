/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { createEnumExpression } from '../compiler_util/identifier_util';
import { Identifiers } from '../identifiers';
import * as o from '../output/output_ast';
export var ViewTypeEnum = (function () {
    function ViewTypeEnum() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    ViewTypeEnum.fromValue = function (value) {
        return createEnumExpression(Identifiers.ViewType, value);
    };
    return ViewTypeEnum;
}());
export var ViewEncapsulationEnum = (function () {
    function ViewEncapsulationEnum() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    ViewEncapsulationEnum.fromValue = function (value) {
        return createEnumExpression(Identifiers.ViewEncapsulation, value);
    };
    return ViewEncapsulationEnum;
}());
export var ChangeDetectionStrategyEnum = (function () {
    function ChangeDetectionStrategyEnum() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    ChangeDetectionStrategyEnum.fromValue = function (value) {
        return createEnumExpression(Identifiers.ChangeDetectionStrategy, value);
    };
    return ChangeDetectionStrategyEnum;
}());
export var ChangeDetectorStatusEnum = (function () {
    function ChangeDetectorStatusEnum() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    ChangeDetectorStatusEnum.fromValue = function (value) {
        return createEnumExpression(Identifiers.ChangeDetectorStatus, value);
    };
    return ChangeDetectorStatusEnum;
}());
export var ViewConstructorVars = (function () {
    function ViewConstructorVars() {
    }
    ViewConstructorVars._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        ViewConstructorVars.viewUtils;
        /** @type {?} */
        ViewConstructorVars.parentView;
        /** @type {?} */
        ViewConstructorVars.parentIndex;
        /** @type {?} */
        ViewConstructorVars.parentElement;
    };
    ViewConstructorVars.viewUtils = o.variable('viewUtils');
    ViewConstructorVars.parentView = o.variable('parentView');
    ViewConstructorVars.parentIndex = o.variable('parentIndex');
    ViewConstructorVars.parentElement = o.variable('parentElement');
    return ViewConstructorVars;
}());
export var ViewProperties = (function () {
    function ViewProperties() {
    }
    ViewProperties._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        ViewProperties.renderer;
        /** @type {?} */
        ViewProperties.viewUtils;
    };
    ViewProperties.renderer = o.THIS_EXPR.prop('renderer');
    ViewProperties.viewUtils = o.THIS_EXPR.prop('viewUtils');
    return ViewProperties;
}());
export var InjectMethodVars = (function () {
    function InjectMethodVars() {
    }
    InjectMethodVars._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        InjectMethodVars.token;
        /** @type {?} */
        InjectMethodVars.requestNodeIndex;
        /** @type {?} */
        InjectMethodVars.notFoundResult;
    };
    InjectMethodVars.token = o.variable('token');
    InjectMethodVars.requestNodeIndex = o.variable('requestNodeIndex');
    InjectMethodVars.notFoundResult = o.variable('notFoundResult');
    return InjectMethodVars;
}());
export var DetectChangesVars = (function () {
    function DetectChangesVars() {
    }
    DetectChangesVars._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        DetectChangesVars.throwOnChange;
        /** @type {?} */
        DetectChangesVars.changes;
        /** @type {?} */
        DetectChangesVars.changed;
    };
    DetectChangesVars.throwOnChange = o.variable("throwOnChange");
    DetectChangesVars.changes = o.variable("changes");
    DetectChangesVars.changed = o.variable("changed");
    return DetectChangesVars;
}());
//# sourceMappingURL=constants.js.map