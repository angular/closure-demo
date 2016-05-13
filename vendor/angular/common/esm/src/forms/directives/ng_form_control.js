goog.module('_angular$common$src$forms$directives$ng__form__control');
var core_1 = goog.require('_angular$core');
var collection_1 = goog.require('_angular$common$src$facade$collection');
var async_1 = goog.require('_angular$common$src$facade$async');
var ng_control_1 = goog.require('_angular$common$src$forms$directives$ng__control');
var validators_1 = goog.require('_angular$common$src$forms$validators');
var control_value_accessor_1 = goog.require('_angular$common$src$forms$directives$control__value__accessor');
var shared_1 = goog.require('_angular$common$src$forms$directives$shared');
exports.formControlBinding = 
/*@ts2dart_const*/ /* @ts2dart_Provider */ {
    provide: ng_control_1.NgControl,
    useExisting: core_1.forwardRef(() => NgFormControl)
};
class NgFormControl extends ng_control_1.NgControl {
    /**
     * @param {?} _validators
     * @param {?} _asyncValidators
     * @param {?} valueAccessors
     */
    constructor(_validators, _asyncValidators, valueAccessors) {
        super();
        this._validators = _validators;
        this._asyncValidators = _asyncValidators;
        this.update = new async_1.EventEmitter();
        this.valueAccessor = shared_1.selectValueAccessor(this, valueAccessors);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this._isControlChanged(changes)) {
            shared_1.setUpControl(this.form, this);
            this.form.updateValueAndValidity({ emitEvent: false });
        }
        if (shared_1.isPropertyUpdated(changes, this.viewModel)) {
            this.form.updateValue(this.model);
            this.viewModel = this.model;
        }
    }
    get path() { return []; }
    get validator() { return shared_1.composeValidators(this._validators); }
    get asyncValidator() { return shared_1.composeAsyncValidators(this._asyncValidators); }
    get control() { return this.form; }
    /**
     * @param {?} newValue
     * @return {?}
     */
    viewToModelUpdate(newValue) {
        this.viewModel = newValue;
        async_1.ObservableWrapper.callEmit(this.update, newValue);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    _isControlChanged(changes) {
        return collection_1.StringMapWrapper.contains(changes, "form");
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        NgFormControl.prototype.form;
        /** @type {?} */
        NgFormControl.prototype.update;
        /** @type {?} */
        NgFormControl.prototype.model;
        /** @type {?} */
        NgFormControl.prototype.viewModel;
        /** @type {?} */
        NgFormControl.prototype._validators;
        /** @type {?} */
        NgFormControl.prototype._asyncValidators;
    }
}
/** @nocollapse */ NgFormControl.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[ngFormControl]',
                bindings: [exports.formControlBinding],
                inputs: ['form: ngFormControl', 'model: ngModel'],
                outputs: ['update: ngModelChange'],
                exportAs: 'ngForm'
            },] },
];
/** @nocollapse */ NgFormControl.ctorParameters = [
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_VALIDATORS,] },] },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_ASYNC_VALIDATORS,] },] },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [control_value_accessor_1.NG_VALUE_ACCESSOR,] },] },
];
exports.NgFormControl = NgFormControl;
//# sourceMappingURL=ng_form_control.js.map