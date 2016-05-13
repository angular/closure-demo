/**
 * @license AngularJS v$$ANGULAR_VERSION$$
 * (c) 2010-2016 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (factory());
}(this, function () {
    'use strict';
    goog.module('_angular$common');
    var pipes_1 = goog.require('_angular$common$src$pipes');
    exports.AsyncPipe = pipes_1.AsyncPipe;
    exports.DatePipe = pipes_1.DatePipe;
    exports.JsonPipe = pipes_1.JsonPipe;
    exports.SlicePipe = pipes_1.SlicePipe;
    exports.LowerCasePipe = pipes_1.LowerCasePipe;
    exports.NumberPipe = pipes_1.NumberPipe;
    exports.DecimalPipe = pipes_1.DecimalPipe;
    exports.PercentPipe = pipes_1.PercentPipe;
    exports.CurrencyPipe = pipes_1.CurrencyPipe;
    exports.UpperCasePipe = pipes_1.UpperCasePipe;
    exports.ReplacePipe = pipes_1.ReplacePipe;
    exports.I18nPluralPipe = pipes_1.I18nPluralPipe;
    exports.I18nSelectPipe = pipes_1.I18nSelectPipe;
    exports.COMMON_PIPES = pipes_1.COMMON_PIPES;
    var directives_1 = goog.require('_angular$common$src$directives');
    exports.NgClass = directives_1.NgClass;
    exports.NgFor = directives_1.NgFor;
    exports.NgIf = directives_1.NgIf;
    exports.NgTemplateOutlet = directives_1.NgTemplateOutlet;
    exports.NgStyle = directives_1.NgStyle;
    exports.NgSwitch = directives_1.NgSwitch;
    exports.NgSwitchWhen = directives_1.NgSwitchWhen;
    exports.NgSwitchDefault = directives_1.NgSwitchDefault;
    exports.NgPlural = directives_1.NgPlural;
    exports.NgPluralCase = directives_1.NgPluralCase;
    exports.NgLocalization = directives_1.NgLocalization;
    exports.CORE_DIRECTIVES = directives_1.CORE_DIRECTIVES;
    exports.workaround_empty_observable_list_diff = directives_1.workaround_empty_observable_list_diff;
    var forms_1 = goog.require('_angular$common$src$forms');
    exports.AbstractControl = forms_1.AbstractControl;
    exports.Control = forms_1.Control;
    exports.ControlGroup = forms_1.ControlGroup;
    exports.ControlArray = forms_1.ControlArray;
    exports.AbstractControlDirective = forms_1.AbstractControlDirective;
    exports.ControlContainer = forms_1.ControlContainer;
    exports.NgControlName = forms_1.NgControlName;
    exports.NgFormControl = forms_1.NgFormControl;
    exports.NgModel = forms_1.NgModel;
    exports.NgControl = forms_1.NgControl;
    exports.NgControlGroup = forms_1.NgControlGroup;
    exports.NgFormModel = forms_1.NgFormModel;
    exports.NgForm = forms_1.NgForm;
    exports.NG_VALUE_ACCESSOR = forms_1.NG_VALUE_ACCESSOR;
    exports.DefaultValueAccessor = forms_1.DefaultValueAccessor;
    exports.NgControlStatus = forms_1.NgControlStatus;
    exports.CheckboxControlValueAccessor = forms_1.CheckboxControlValueAccessor;
    exports.NgSelectOption = forms_1.NgSelectOption;
    exports.SelectControlValueAccessor = forms_1.SelectControlValueAccessor;
    exports.FORM_DIRECTIVES = forms_1.FORM_DIRECTIVES;
    exports.RadioButtonState = forms_1.RadioButtonState;
    exports.NG_VALIDATORS = forms_1.NG_VALIDATORS;
    exports.NG_ASYNC_VALIDATORS = forms_1.NG_ASYNC_VALIDATORS;
    exports.Validators = forms_1.Validators;
    exports.RequiredValidator = forms_1.RequiredValidator;
    exports.MinLengthValidator = forms_1.MinLengthValidator;
    exports.MaxLengthValidator = forms_1.MaxLengthValidator;
    exports.PatternValidator = forms_1.PatternValidator;
    exports.FormBuilder = forms_1.FormBuilder;
    exports.FORM_PROVIDERS = forms_1.FORM_PROVIDERS;
    exports.FORM_BINDINGS = forms_1.FORM_BINDINGS;
    var common_directives_1 = goog.require('_angular$common$src$common__directives');
    exports.COMMON_DIRECTIVES = common_directives_1.COMMON_DIRECTIVES;
    var location_1 = goog.require('_angular$common$src$location');
    exports.PlatformLocation = location_1.PlatformLocation;
    exports.LocationStrategy = location_1.LocationStrategy;
    exports.APP_BASE_HREF = location_1.APP_BASE_HREF;
    exports.HashLocationStrategy = location_1.HashLocationStrategy;
    exports.PathLocationStrategy = location_1.PathLocationStrategy;
    exports.Location = location_1.Location;
}));
