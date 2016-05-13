goog.module('_angular$core$src$change__detection$change__detection');
var iterable_differs_1 = goog.require('_angular$core$src$change__detection$differs$iterable__differs');
var default_iterable_differ_1 = goog.require('_angular$core$src$change__detection$differs$default__iterable__differ');
var keyvalue_differs_1 = goog.require('_angular$core$src$change__detection$differs$keyvalue__differs');
var default_keyvalue_differ_1 = goog.require('_angular$core$src$change__detection$differs$default__keyvalue__differ');
var default_keyvalue_differ_2 = default_keyvalue_differ_1;
exports.DefaultKeyValueDifferFactory = default_keyvalue_differ_2.DefaultKeyValueDifferFactory;
exports.KeyValueChangeRecord = default_keyvalue_differ_2.KeyValueChangeRecord;
var default_iterable_differ_2 = default_iterable_differ_1;
exports.DefaultIterableDifferFactory = default_iterable_differ_2.DefaultIterableDifferFactory;
exports.CollectionChangeRecord = default_iterable_differ_2.CollectionChangeRecord;
var constants_1 = goog.require('_angular$core$src$change__detection$constants');
exports.ChangeDetectionStrategy = constants_1.ChangeDetectionStrategy;
exports.CHANGE_DETECTION_STRATEGY_VALUES = constants_1.CHANGE_DETECTION_STRATEGY_VALUES;
exports.ChangeDetectorState = constants_1.ChangeDetectorState;
exports.CHANGE_DETECTOR_STATE_VALUES = constants_1.CHANGE_DETECTOR_STATE_VALUES;
exports.isDefaultChangeDetectionStrategy = constants_1.isDefaultChangeDetectionStrategy;
var change_detector_ref_1 = goog.require('_angular$core$src$change__detection$change__detector__ref');
exports.ChangeDetectorRef = change_detector_ref_1.ChangeDetectorRef;
var iterable_differs_2 = iterable_differs_1;
exports.IterableDiffers = iterable_differs_2.IterableDiffers;
var keyvalue_differs_2 = keyvalue_differs_1;
exports.KeyValueDiffers = keyvalue_differs_2.KeyValueDiffers;
var default_iterable_differ_3 = default_iterable_differ_1;
exports.DefaultIterableDiffer = default_iterable_differ_3.DefaultIterableDiffer;
var change_detection_util_1 = goog.require('_angular$core$src$change__detection$change__detection__util');
exports.WrappedValue = change_detection_util_1.WrappedValue;
exports.ValueUnwrapper = change_detection_util_1.ValueUnwrapper;
exports.SimpleChange = change_detection_util_1.SimpleChange;
exports.devModeEqual = change_detection_util_1.devModeEqual;
exports.looseIdentical = change_detection_util_1.looseIdentical;
exports.uninitialized = change_detection_util_1.uninitialized;
/**
 * Structural diffing for `Object`s and `Map`s.
 */
exports.keyValDiff = 
/*@ts2dart_const*/ [new default_keyvalue_differ_1.DefaultKeyValueDifferFactory()];
/**
 * Structural diffing for `Iterable` types such as `Array`s.
 */
exports.iterableDiff = 
/*@ts2dart_const*/ [new default_iterable_differ_1.DefaultIterableDifferFactory()];
exports.defaultIterableDiffers = new iterable_differs_1.IterableDiffers(exports.iterableDiff);
exports.defaultKeyValueDiffers = new keyvalue_differs_1.KeyValueDiffers(exports.keyValDiff);
//# sourceMappingURL=change_detection.js.map