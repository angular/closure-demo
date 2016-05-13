goog.module('_angular$common$src$forms');
/**
 * @module
 * @description
 * This module is used for handling user input, by defining and building a {@link ControlGroup} that
 * consists of
 * {@link Control} objects, and mapping them onto the DOM. {@link Control} objects can then be used
 * to read information
 * from the form DOM elements.
 *
 * Forms providers are not included in default providers; you must import these providers
 * explicitly.
 */
var model_1 = goog.require('_angular$common$src$forms$model');
exports.AbstractControl = model_1.AbstractControl;
exports.Control = model_1.Control;
exports.ControlGroup = model_1.ControlGroup;
exports.ControlArray = model_1.ControlArray;
var abstract_control_directive_1 = goog.require('_angular$common$src$forms$directives$abstract__control__directive');
exports.AbstractControlDirective = abstract_control_directive_1.AbstractControlDirective;
var control_container_1 = goog.require('_angular$common$src$forms$directives$control__container');
exports.ControlContainer = control_container_1.ControlContainer;
var ng_control_name_1 = goog.require('_angular$common$src$forms$directives$ng__control__name');
exports.NgControlName = ng_control_name_1.NgControlName;
var ng_form_control_1 = goog.require('_angular$common$src$forms$directives$ng__form__control');
exports.NgFormControl = ng_form_control_1.NgFormControl;
var ng_model_1 = goog.require('_angular$common$src$forms$directives$ng__model');
exports.NgModel = ng_model_1.NgModel;
var ng_control_1 = goog.require('_angular$common$src$forms$directives$ng__control');
exports.NgControl = ng_control_1.NgControl;
var ng_control_group_1 = goog.require('_angular$common$src$forms$directives$ng__control__group');
exports.NgControlGroup = ng_control_group_1.NgControlGroup;
var ng_form_model_1 = goog.require('_angular$common$src$forms$directives$ng__form__model');
exports.NgFormModel = ng_form_model_1.NgFormModel;
var ng_form_1 = goog.require('_angular$common$src$forms$directives$ng__form');
exports.NgForm = ng_form_1.NgForm;
var control_value_accessor_1 = goog.require('_angular$common$src$forms$directives$control__value__accessor');
exports.NG_VALUE_ACCESSOR = control_value_accessor_1.NG_VALUE_ACCESSOR;
var default_value_accessor_1 = goog.require('_angular$common$src$forms$directives$default__value__accessor');
exports.DefaultValueAccessor = default_value_accessor_1.DefaultValueAccessor;
var ng_control_status_1 = goog.require('_angular$common$src$forms$directives$ng__control__status');
exports.NgControlStatus = ng_control_status_1.NgControlStatus;
var checkbox_value_accessor_1 = goog.require('_angular$common$src$forms$directives$checkbox__value__accessor');
exports.CheckboxControlValueAccessor = checkbox_value_accessor_1.CheckboxControlValueAccessor;
var select_control_value_accessor_1 = goog.require('_angular$common$src$forms$directives$select__control__value__accessor');
exports.NgSelectOption = select_control_value_accessor_1.NgSelectOption;
exports.SelectControlValueAccessor = select_control_value_accessor_1.SelectControlValueAccessor;
var directives_1 = goog.require('_angular$common$src$forms$directives');
exports.FORM_DIRECTIVES = directives_1.FORM_DIRECTIVES;
exports.RadioButtonState = directives_1.RadioButtonState;
var validators_1 = goog.require('_angular$common$src$forms$validators');
exports.NG_VALIDATORS = validators_1.NG_VALIDATORS;
exports.NG_ASYNC_VALIDATORS = validators_1.NG_ASYNC_VALIDATORS;
exports.Validators = validators_1.Validators;
var validators_2 = goog.require('_angular$common$src$forms$directives$validators');
exports.RequiredValidator = validators_2.RequiredValidator;
exports.MinLengthValidator = validators_2.MinLengthValidator;
exports.MaxLengthValidator = validators_2.MaxLengthValidator;
exports.PatternValidator = validators_2.PatternValidator;
var form_builder_1 = goog.require('_angular$common$src$forms$form__builder');
exports.FormBuilder = form_builder_1.FormBuilder;
var form_builder_2 = form_builder_1;
var radio_control_value_accessor_1 = goog.require('_angular$common$src$forms$directives$radio__control__value__accessor');
/**
 * Shorthand set of providers used for building Angular forms.
 *
 * ### Example
 *
 * ```typescript
 * bootstrap(MyApp, [FORM_PROVIDERS]);
 * ```
 */
exports.FORM_PROVIDERS = [form_builder_2.FormBuilder, radio_control_value_accessor_1.RadioControlRegistry];
/**
 * See {@link FORM_PROVIDERS} instead.
 *
 * @deprecated
 */
exports.FORM_BINDINGS = exports.FORM_PROVIDERS;
//# sourceMappingURL=forms.js.map