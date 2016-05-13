goog.module('_angular$common$src$forms$directives');
var ng_control_name_1 = goog.require('_angular$common$src$forms$directives$ng__control__name');
var ng_form_control_1 = goog.require('_angular$common$src$forms$directives$ng__form__control');
var ng_model_1 = goog.require('_angular$common$src$forms$directives$ng__model');
var ng_control_group_1 = goog.require('_angular$common$src$forms$directives$ng__control__group');
var ng_form_model_1 = goog.require('_angular$common$src$forms$directives$ng__form__model');
var ng_form_1 = goog.require('_angular$common$src$forms$directives$ng__form');
var default_value_accessor_1 = goog.require('_angular$common$src$forms$directives$default__value__accessor');
var checkbox_value_accessor_1 = goog.require('_angular$common$src$forms$directives$checkbox__value__accessor');
var number_value_accessor_1 = goog.require('_angular$common$src$forms$directives$number__value__accessor');
var radio_control_value_accessor_1 = goog.require('_angular$common$src$forms$directives$radio__control__value__accessor');
var ng_control_status_1 = goog.require('_angular$common$src$forms$directives$ng__control__status');
var select_control_value_accessor_1 = goog.require('_angular$common$src$forms$directives$select__control__value__accessor');
var validators_1 = goog.require('_angular$common$src$forms$directives$validators');
var ng_control_name_2 = ng_control_name_1;
exports.NgControlName = ng_control_name_2.NgControlName;
var ng_form_control_2 = ng_form_control_1;
exports.NgFormControl = ng_form_control_2.NgFormControl;
var ng_model_2 = ng_model_1;
exports.NgModel = ng_model_2.NgModel;
var ng_control_group_2 = ng_control_group_1;
exports.NgControlGroup = ng_control_group_2.NgControlGroup;
var ng_form_model_2 = ng_form_model_1;
exports.NgFormModel = ng_form_model_2.NgFormModel;
var ng_form_2 = ng_form_1;
exports.NgForm = ng_form_2.NgForm;
var default_value_accessor_2 = default_value_accessor_1;
exports.DefaultValueAccessor = default_value_accessor_2.DefaultValueAccessor;
var checkbox_value_accessor_2 = checkbox_value_accessor_1;
exports.CheckboxControlValueAccessor = checkbox_value_accessor_2.CheckboxControlValueAccessor;
var radio_control_value_accessor_2 = radio_control_value_accessor_1;
exports.RadioControlValueAccessor = radio_control_value_accessor_2.RadioControlValueAccessor;
exports.RadioButtonState = radio_control_value_accessor_2.RadioButtonState;
var number_value_accessor_2 = number_value_accessor_1;
exports.NumberValueAccessor = number_value_accessor_2.NumberValueAccessor;
var ng_control_status_2 = ng_control_status_1;
exports.NgControlStatus = ng_control_status_2.NgControlStatus;
var select_control_value_accessor_2 = select_control_value_accessor_1;
exports.SelectControlValueAccessor = select_control_value_accessor_2.SelectControlValueAccessor;
exports.NgSelectOption = select_control_value_accessor_2.NgSelectOption;
var validators_2 = validators_1;
exports.RequiredValidator = validators_2.RequiredValidator;
exports.MinLengthValidator = validators_2.MinLengthValidator;
exports.MaxLengthValidator = validators_2.MaxLengthValidator;
exports.PatternValidator = validators_2.PatternValidator;
var ng_control_1 = goog.require('_angular$common$src$forms$directives$ng__control');
exports.NgControl = ng_control_1.NgControl;
/**
 *
 * A list of all the form directives used as part of a `@Component` annotation.
 *
 *  This is a shorthand for importing them each individually.
 *
 * ### Example
 *
 * ```typescript
 * @Component({
 *   selector: 'my-app',
 *   directives: [FORM_DIRECTIVES]
 * })
 * class MyApp {}
 * ```
 */
exports.FORM_DIRECTIVES = [
    ng_control_name_1.NgControlName,
    ng_control_group_1.NgControlGroup,
    ng_form_control_1.NgFormControl,
    ng_model_1.NgModel,
    ng_form_model_1.NgFormModel,
    ng_form_1.NgForm,
    select_control_value_accessor_1.NgSelectOption,
    default_value_accessor_1.DefaultValueAccessor,
    number_value_accessor_1.NumberValueAccessor,
    checkbox_value_accessor_1.CheckboxControlValueAccessor,
    select_control_value_accessor_1.SelectControlValueAccessor,
    radio_control_value_accessor_1.RadioControlValueAccessor,
    ng_control_status_1.NgControlStatus,
    validators_1.RequiredValidator,
    validators_1.MinLengthValidator,
    validators_1.MaxLengthValidator,
    validators_1.PatternValidator
];
//# sourceMappingURL=directives.js.map