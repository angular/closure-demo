goog.module('_angular$core$src$change__detection$constants');
var lang_1 = goog.require('_angular$core$src$facade$lang');
exports.ChangeDetectorState = {};
exports.ChangeDetectorState.NeverChecked = 0;
exports.ChangeDetectorState.CheckedBefore = 1;
exports.ChangeDetectorState.Errored = 2;
exports.ChangeDetectorState[exports.ChangeDetectorState.NeverChecked] = "NeverChecked";
exports.ChangeDetectorState[exports.ChangeDetectorState.CheckedBefore] = "CheckedBefore";
exports.ChangeDetectorState[exports.ChangeDetectorState.Errored] = "Errored";
exports.ChangeDetectionStrategy = {};
exports.ChangeDetectionStrategy.CheckOnce = 0;
exports.ChangeDetectionStrategy.Checked = 1;
exports.ChangeDetectionStrategy.CheckAlways = 2;
exports.ChangeDetectionStrategy.Detached = 3;
exports.ChangeDetectionStrategy.OnPush = 4;
exports.ChangeDetectionStrategy.Default = 5;
exports.ChangeDetectionStrategy[exports.ChangeDetectionStrategy.CheckOnce] = "CheckOnce";
exports.ChangeDetectionStrategy[exports.ChangeDetectionStrategy.Checked] = "Checked";
exports.ChangeDetectionStrategy[exports.ChangeDetectionStrategy.CheckAlways] = "CheckAlways";
exports.ChangeDetectionStrategy[exports.ChangeDetectionStrategy.Detached] = "Detached";
exports.ChangeDetectionStrategy[exports.ChangeDetectionStrategy.OnPush] = "OnPush";
exports.ChangeDetectionStrategy[exports.ChangeDetectionStrategy.Default] = "Default";
/**
 * List of possible {@link ChangeDetectionStrategy} values.
 */
exports.CHANGE_DETECTION_STRATEGY_VALUES = [
    exports.ChangeDetectionStrategy.CheckOnce,
    exports.ChangeDetectionStrategy.Checked,
    exports.ChangeDetectionStrategy.CheckAlways,
    exports.ChangeDetectionStrategy.Detached,
    exports.ChangeDetectionStrategy.OnPush,
    exports.ChangeDetectionStrategy.Default
];
/**
 * List of possible {@link ChangeDetectorState} values.
 */
exports.CHANGE_DETECTOR_STATE_VALUES = [
    exports.ChangeDetectorState.NeverChecked,
    exports.ChangeDetectorState.CheckedBefore,
    exports.ChangeDetectorState.Errored
];
/**
 * @param {?} changeDetectionStrategy
 * @return {?}
 */
function isDefaultChangeDetectionStrategy(changeDetectionStrategy) {
    return lang_1.isBlank(changeDetectionStrategy) ||
        changeDetectionStrategy === exports.ChangeDetectionStrategy.Default;
}
exports.isDefaultChangeDetectionStrategy = isDefaultChangeDetectionStrategy;
//# sourceMappingURL=constants.js.map