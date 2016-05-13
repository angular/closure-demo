goog.module('_angular$common$src$forms$directives$shared');
var collection_1 = goog.require('_angular$common$src$facade$collection');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var exceptions_1 = goog.require('_angular$common$src$facade$exceptions');
var validators_1 = goog.require('_angular$common$src$forms$validators');
var default_value_accessor_1 = goog.require('_angular$common$src$forms$directives$default__value__accessor');
var number_value_accessor_1 = goog.require('_angular$common$src$forms$directives$number__value__accessor');
var checkbox_value_accessor_1 = goog.require('_angular$common$src$forms$directives$checkbox__value__accessor');
var select_control_value_accessor_1 = goog.require('_angular$common$src$forms$directives$select__control__value__accessor');
var radio_control_value_accessor_1 = goog.require('_angular$common$src$forms$directives$radio__control__value__accessor');
var normalize_validator_1 = goog.require('_angular$common$src$forms$directives$normalize__validator');
/**
 * @param {?} name
 * @param {?} parent
 * @return {?}
 */
function controlPath(name, parent) {
    var /** @type {?} */ p = collection_1.ListWrapper.clone(parent.path);
    p.push(name);
    return p;
}
exports.controlPath = controlPath;
/**
 * @param {?} control
 * @param {?} dir
 * @return {?}
 */
function setUpControl(control, dir) {
    if (lang_1.isBlank(control))
        _throwError(dir, "Cannot find control");
    if (lang_1.isBlank(dir.valueAccessor))
        _throwError(dir, "No value accessor for");
    control.validator = validators_1.Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = validators_1.Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
    dir.valueAccessor.writeValue(control.value);
    // view -> model
    dir.valueAccessor.registerOnChange((newValue) => {
        dir.viewToModelUpdate(newValue);
        control.updateValue(newValue, { emitModelToViewChange: false });
        control.markAsDirty();
    });
    // model -> view
    control.registerOnChange((newValue) => dir.valueAccessor.writeValue(newValue));
    // touched
    dir.valueAccessor.registerOnTouched(() => control.markAsTouched());
}
exports.setUpControl = setUpControl;
/**
 * @param {?} control
 * @param {?} dir
 * @return {?}
 */
function setUpControlGroup(control, dir) {
    if (lang_1.isBlank(control))
        _throwError(dir, "Cannot find control");
    control.validator = validators_1.Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = validators_1.Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
}
exports.setUpControlGroup = setUpControlGroup;
/**
 * @param {?} dir
 * @param {?} message
 * @return {?}
 */
function _throwError(dir, message) {
    var /** @type {?} */ path = dir.path.join(" -> ");
    throw new exceptions_1.BaseException(`${message} '${path}'`);
}
/**
 * @param {?} validators
 * @return {?}
 */
function composeValidators(validators) {
    return lang_1.isPresent(validators) ? validators_1.Validators.compose(validators.map(normalize_validator_1.normalizeValidator)) : null;
}
exports.composeValidators = composeValidators;
/**
 * @param {?} validators
 * @return {?}
 */
function composeAsyncValidators(validators) {
    return lang_1.isPresent(validators) ? validators_1.Validators.composeAsync(validators.map(normalize_validator_1.normalizeAsyncValidator)) :
        null;
}
exports.composeAsyncValidators = composeAsyncValidators;
/**
 * @param {?} changes
 * @param {?} viewModel
 * @return {?}
 */
function isPropertyUpdated(changes, viewModel) {
    if (!collection_1.StringMapWrapper.contains(changes, "model"))
        return false;
    var /** @type {?} */ change = changes["model"];
    if (change.isFirstChange())
        return true;
    return !lang_1.looseIdentical(viewModel, change.currentValue);
}
exports.isPropertyUpdated = isPropertyUpdated;
/**
 * @param {?} dir
 * @param {?} valueAccessors
 * @return {?}
 */
function selectValueAccessor(dir, valueAccessors) {
    if (lang_1.isBlank(valueAccessors))
        return null;
    var /** @type {?} */ defaultAccessor;
    var /** @type {?} */ builtinAccessor;
    var /** @type {?} */ customAccessor;
    valueAccessors.forEach((v) => {
        if (lang_1.hasConstructor(v, default_value_accessor_1.DefaultValueAccessor)) {
            defaultAccessor = v;
        }
        else if (lang_1.hasConstructor(v, checkbox_value_accessor_1.CheckboxControlValueAccessor) ||
            lang_1.hasConstructor(v, number_value_accessor_1.NumberValueAccessor) ||
            lang_1.hasConstructor(v, select_control_value_accessor_1.SelectControlValueAccessor) ||
            lang_1.hasConstructor(v, radio_control_value_accessor_1.RadioControlValueAccessor)) {
            if (lang_1.isPresent(builtinAccessor))
                _throwError(dir, "More than one built-in value accessor matches");
            builtinAccessor = v;
        }
        else {
            if (lang_1.isPresent(customAccessor))
                _throwError(dir, "More than one custom value accessor matches");
            customAccessor = v;
        }
    });
    if (lang_1.isPresent(customAccessor))
        return customAccessor;
    if (lang_1.isPresent(builtinAccessor))
        return builtinAccessor;
    if (lang_1.isPresent(defaultAccessor))
        return defaultAccessor;
    _throwError(dir, "No valid value accessor for");
    return null;
}
exports.selectValueAccessor = selectValueAccessor;
//# sourceMappingURL=shared.js.map