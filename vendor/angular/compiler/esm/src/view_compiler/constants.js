goog.module('_angular$compiler$src$view__compiler$constants');
var core_1 = goog.require('_angular$core');
var core_private_1 = goog.require('_angular$compiler$core__private');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var compile_metadata_1 = goog.require('_angular$compiler$src$compile__metadata');
var o = goog.require('_angular$compiler$src$output$output__ast');
var identifiers_1 = goog.require('_angular$compiler$src$identifiers');
/**
 * @param {?} classIdentifier
 * @param {?} value
 * @return {?}
 */
function _enumExpression(classIdentifier, value) {
    if (lang_1.isBlank(value))
        return o.NULL_EXPR;
    var /** @type {?} */ name = lang_1.resolveEnumToken(classIdentifier.runtime, value);
    return o.importExpr(new compile_metadata_1.CompileIdentifierMetadata({
        name: `${classIdentifier.name}.${name}`,
        moduleUrl: classIdentifier.moduleUrl,
        runtime: value
    }));
}
class ViewTypeEnum {
    /**
     * @param {?} value
     * @return {?}
     */
    static fromValue(value) {
        return _enumExpression(identifiers_1.Identifiers.ViewType, value);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ViewTypeEnum.HOST;
        /** @type {?} */
        ViewTypeEnum.COMPONENT;
        /** @type {?} */
        ViewTypeEnum.EMBEDDED;
    }
}
ViewTypeEnum.HOST = ViewTypeEnum.fromValue(core_private_1.ViewType.HOST);
ViewTypeEnum.COMPONENT = ViewTypeEnum.fromValue(core_private_1.ViewType.COMPONENT);
ViewTypeEnum.EMBEDDED = ViewTypeEnum.fromValue(core_private_1.ViewType.EMBEDDED);
exports.ViewTypeEnum = ViewTypeEnum;
class ViewEncapsulationEnum {
    /**
     * @param {?} value
     * @return {?}
     */
    static fromValue(value) {
        return _enumExpression(identifiers_1.Identifiers.ViewEncapsulation, value);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ViewEncapsulationEnum.Emulated;
        /** @type {?} */
        ViewEncapsulationEnum.Native;
        /** @type {?} */
        ViewEncapsulationEnum.None;
    }
}
ViewEncapsulationEnum.Emulated = ViewEncapsulationEnum.fromValue(core_1.ViewEncapsulation.Emulated);
ViewEncapsulationEnum.Native = ViewEncapsulationEnum.fromValue(core_1.ViewEncapsulation.Native);
ViewEncapsulationEnum.None = ViewEncapsulationEnum.fromValue(core_1.ViewEncapsulation.None);
exports.ViewEncapsulationEnum = ViewEncapsulationEnum;
class ChangeDetectorStateEnum {
    /**
     * @param {?} value
     * @return {?}
     */
    static fromValue(value) {
        return _enumExpression(identifiers_1.Identifiers.ChangeDetectorState, value);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ChangeDetectorStateEnum.NeverChecked;
        /** @type {?} */
        ChangeDetectorStateEnum.CheckedBefore;
        /** @type {?} */
        ChangeDetectorStateEnum.Errored;
    }
}
ChangeDetectorStateEnum.NeverChecked = ChangeDetectorStateEnum.fromValue(core_private_1.ChangeDetectorState.NeverChecked);
ChangeDetectorStateEnum.CheckedBefore = ChangeDetectorStateEnum.fromValue(core_private_1.ChangeDetectorState.CheckedBefore);
ChangeDetectorStateEnum.Errored = ChangeDetectorStateEnum.fromValue(core_private_1.ChangeDetectorState.Errored);
exports.ChangeDetectorStateEnum = ChangeDetectorStateEnum;
class ChangeDetectionStrategyEnum {
    /**
     * @param {?} value
     * @return {?}
     */
    static fromValue(value) {
        return _enumExpression(identifiers_1.Identifiers.ChangeDetectionStrategy, value);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ChangeDetectionStrategyEnum.CheckOnce;
        /** @type {?} */
        ChangeDetectionStrategyEnum.Checked;
        /** @type {?} */
        ChangeDetectionStrategyEnum.CheckAlways;
        /** @type {?} */
        ChangeDetectionStrategyEnum.Detached;
        /** @type {?} */
        ChangeDetectionStrategyEnum.OnPush;
        /** @type {?} */
        ChangeDetectionStrategyEnum.Default;
    }
}
ChangeDetectionStrategyEnum.CheckOnce = ChangeDetectionStrategyEnum.fromValue(core_1.ChangeDetectionStrategy.CheckOnce);
ChangeDetectionStrategyEnum.Checked = ChangeDetectionStrategyEnum.fromValue(core_1.ChangeDetectionStrategy.Checked);
ChangeDetectionStrategyEnum.CheckAlways = ChangeDetectionStrategyEnum.fromValue(core_1.ChangeDetectionStrategy.CheckAlways);
ChangeDetectionStrategyEnum.Detached = ChangeDetectionStrategyEnum.fromValue(core_1.ChangeDetectionStrategy.Detached);
ChangeDetectionStrategyEnum.OnPush = ChangeDetectionStrategyEnum.fromValue(core_1.ChangeDetectionStrategy.OnPush);
ChangeDetectionStrategyEnum.Default = ChangeDetectionStrategyEnum.fromValue(core_1.ChangeDetectionStrategy.Default);
exports.ChangeDetectionStrategyEnum = ChangeDetectionStrategyEnum;
class ViewConstructorVars {
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ViewConstructorVars.viewUtils;
        /** @type {?} */
        ViewConstructorVars.parentInjector;
        /** @type {?} */
        ViewConstructorVars.declarationEl;
    }
}
ViewConstructorVars.viewUtils = o.variable('viewUtils');
ViewConstructorVars.parentInjector = o.variable('parentInjector');
ViewConstructorVars.declarationEl = o.variable('declarationEl');
exports.ViewConstructorVars = ViewConstructorVars;
class ViewProperties {
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ViewProperties.renderer;
        /** @type {?} */
        ViewProperties.projectableNodes;
        /** @type {?} */
        ViewProperties.viewUtils;
    }
}
ViewProperties.renderer = o.THIS_EXPR.prop('renderer');
ViewProperties.projectableNodes = o.THIS_EXPR.prop('projectableNodes');
ViewProperties.viewUtils = o.THIS_EXPR.prop('viewUtils');
exports.ViewProperties = ViewProperties;
class EventHandlerVars {
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        EventHandlerVars.event;
    }
}
EventHandlerVars.event = o.variable('$event');
exports.EventHandlerVars = EventHandlerVars;
class InjectMethodVars {
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        InjectMethodVars.token;
        /** @type {?} */
        InjectMethodVars.requestNodeIndex;
        /** @type {?} */
        InjectMethodVars.notFoundResult;
    }
}
InjectMethodVars.token = o.variable('token');
InjectMethodVars.requestNodeIndex = o.variable('requestNodeIndex');
InjectMethodVars.notFoundResult = o.variable('notFoundResult');
exports.InjectMethodVars = InjectMethodVars;
class DetectChangesVars {
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DetectChangesVars.throwOnChange;
        /** @type {?} */
        DetectChangesVars.changes;
        /** @type {?} */
        DetectChangesVars.changed;
        /** @type {?} */
        DetectChangesVars.valUnwrapper;
    }
}
DetectChangesVars.throwOnChange = o.variable(`throwOnChange`);
DetectChangesVars.changes = o.variable(`changes`);
DetectChangesVars.changed = o.variable(`changed`);
DetectChangesVars.valUnwrapper = o.variable(`valUnwrapper`);
exports.DetectChangesVars = DetectChangesVars;
//# sourceMappingURL=constants.js.map