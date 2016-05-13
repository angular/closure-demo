goog.module('_angular$common$src$forms$directives$ng__model');
var core_1 = goog.require('_angular$core');
var async_1 = goog.require('_angular$common$src$facade$async');
var control_value_accessor_1 = goog.require('_angular$common$src$forms$directives$control__value__accessor');
var ng_control_1 = goog.require('_angular$common$src$forms$directives$ng__control');
var model_1 = goog.require('_angular$common$src$forms$model');
var validators_1 = goog.require('_angular$common$src$forms$validators');
var shared_1 = goog.require('_angular$common$src$forms$directives$shared');
exports.formControlBinding = 
/*@ts2dart_const*/ /* @ts2dart_Provider */ {
    provide: ng_control_1.NgControl,
    useExisting: core_1.forwardRef(() => NgModel)
};
class NgModel extends ng_control_1.NgControl {
    /**
     * @param {?} _validators
     * @param {?} _asyncValidators
     * @param {?} valueAccessors
     */
    constructor(_validators, _asyncValidators, valueAccessors) {
        super();
        this._validators = _validators;
        this._asyncValidators = _asyncValidators;
        /** @internal */
        this._control = new model_1.Control();
        /** @internal */
        this._added = false;
        this.update = new async_1.EventEmitter();
        this.valueAccessor = shared_1.selectValueAccessor(this, valueAccessors);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this._added) {
            shared_1.setUpControl(this._control, this);
            this._control.updateValueAndValidity({ emitEvent: false });
            this._added = true;
        }
        if (shared_1.isPropertyUpdated(changes, this.viewModel)) {
            this._control.updateValue(this.model);
            this.viewModel = this.model;
        }
    }
    get control() { return this._control; }
    get path() { return []; }
    get validator() { return shared_1.composeValidators(this._validators); }
    get asyncValidator() { return shared_1.composeAsyncValidators(this._asyncValidators); }
    /**
     * @param {?} newValue
     * @return {?}
     */
    viewToModelUpdate(newValue) {
        this.viewModel = newValue;
        async_1.ObservableWrapper.callEmit(this.update, newValue);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        NgModel.prototype._control;
        /** @internal
        @type {?} */
        NgModel.prototype._added;
        /** @type {?} */
        NgModel.prototype.update;
        /** @type {?} */
        NgModel.prototype.model;
        /** @type {?} */
        NgModel.prototype.viewModel;
        /** @type {?} */
        NgModel.prototype._validators;
        /** @type {?} */
        NgModel.prototype._asyncValidators;
    }
}
/** @nocollapse */ NgModel.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[ngModel]:not([ngControl]):not([ngFormControl])',
                bindings: [exports.formControlBinding],
                inputs: ['model: ngModel'],
                outputs: ['update: ngModelChange'],
                exportAs: 'ngForm'
            },] },
];
/** @nocollapse */ NgModel.ctorParameters = [
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_VALIDATORS,] },] },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_ASYNC_VALIDATORS,] },] },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [control_value_accessor_1.NG_VALUE_ACCESSOR,] },] },
];
exports.NgModel = NgModel;
//# sourceMappingURL=ng_model.js.map