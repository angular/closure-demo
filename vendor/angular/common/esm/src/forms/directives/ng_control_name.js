goog.module('_angular$common$src$forms$directives$ng__control__name');
var core_1 = goog.require('_angular$core');
var async_1 = goog.require('_angular$common$src$facade$async');
var control_container_1 = goog.require('_angular$common$src$forms$directives$control__container');
var ng_control_1 = goog.require('_angular$common$src$forms$directives$ng__control');
var control_value_accessor_1 = goog.require('_angular$common$src$forms$directives$control__value__accessor');
var shared_1 = goog.require('_angular$common$src$forms$directives$shared');
var validators_1 = goog.require('_angular$common$src$forms$validators');
exports.controlNameBinding = 
/*@ts2dart_const*/ /* @ts2dart_Provider */ {
    provide: ng_control_1.NgControl,
    useExisting: core_1.forwardRef(() => NgControlName)
};
class NgControlName extends ng_control_1.NgControl {
    /**
     * @param {?} _parent
     * @param {?} _validators
     * @param {?} _asyncValidators
     * @param {?} valueAccessors
     */
    constructor(_parent, _validators, _asyncValidators, valueAccessors) {
        super();
        this._parent = _parent;
        this._validators = _validators;
        this._asyncValidators = _asyncValidators;
        /** @internal */
        this.update = new async_1.EventEmitter();
        this._added = false;
        this.valueAccessor = shared_1.selectValueAccessor(this, valueAccessors);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this._added) {
            this.formDirective.addControl(this);
            this._added = true;
        }
        if (shared_1.isPropertyUpdated(changes, this.viewModel)) {
            this.viewModel = this.model;
            this.formDirective.updateModel(this, this.model);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() { this.formDirective.removeControl(this); }
    /**
     * @param {?} newValue
     * @return {?}
     */
    viewToModelUpdate(newValue) {
        this.viewModel = newValue;
        async_1.ObservableWrapper.callEmit(this.update, newValue);
    }
    get path() { return shared_1.controlPath(this.name, this._parent); }
    get formDirective() { return this._parent.formDirective; }
    get validator() { return shared_1.composeValidators(this._validators); }
    get asyncValidator() { return shared_1.composeAsyncValidators(this._asyncValidators); }
    get control() { return this.formDirective.getControl(this); }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        NgControlName.prototype.update;
        /** @type {?} */
        NgControlName.prototype.model;
        /** @type {?} */
        NgControlName.prototype.viewModel;
        /** @type {?} */
        NgControlName.prototype._added;
        /** @type {?} */
        NgControlName.prototype._parent;
        /** @type {?} */
        NgControlName.prototype._validators;
        /** @type {?} */
        NgControlName.prototype._asyncValidators;
    }
}
NgControlName.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[ngControl]',
                bindings: [exports.controlNameBinding],
                inputs: ['name: ngControl', 'model: ngModel'],
                outputs: ['update: ngModelChange'],
                exportAs: 'ngForm'
            },] },
];
/** @nocollapse */ NgControlName.ctorParameters = [
    { type: control_container_1.ControlContainer, decorators: [{ type: core_1.Host }, { type: core_1.SkipSelf },] },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_VALIDATORS,] },] },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_ASYNC_VALIDATORS,] },] },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [control_value_accessor_1.NG_VALUE_ACCESSOR,] },] },
];
exports.NgControlName = NgControlName;
//# sourceMappingURL=ng_control_name.js.map