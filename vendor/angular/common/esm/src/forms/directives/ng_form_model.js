goog.module('_angular$common$src$forms$directives$ng__form__model');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var collection_1 = goog.require('_angular$common$src$facade$collection');
var exceptions_1 = goog.require('_angular$common$src$facade$exceptions');
var async_1 = goog.require('_angular$common$src$facade$async');
var control_container_1 = goog.require('_angular$common$src$forms$directives$control__container');
var shared_1 = goog.require('_angular$common$src$forms$directives$shared');
var validators_1 = goog.require('_angular$common$src$forms$validators');
exports.formDirectiveProvider = 
/*@ts2dart_const*/ /* @ts2dart_Provider */ {
    provide: control_container_1.ControlContainer,
    useExisting: core_1.forwardRef(() => NgFormModel)
};
class NgFormModel extends control_container_1.ControlContainer {
    /**
     * @param {?} _validators
     * @param {?} _asyncValidators
     */
    constructor(_validators, _asyncValidators) {
        super();
        this._validators = _validators;
        this._asyncValidators = _asyncValidators;
        this.form = null;
        this.directives = [];
        this.ngSubmit = new async_1.EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this._checkFormPresent();
        if (collection_1.StringMapWrapper.contains(changes, "form")) {
            var /** @type {?} */ sync = shared_1.composeValidators(this._validators);
            this.form.validator = validators_1.Validators.compose([this.form.validator, sync]);
            var /** @type {?} */ async = shared_1.composeAsyncValidators(this._asyncValidators);
            this.form.asyncValidator = validators_1.Validators.composeAsync([this.form.asyncValidator, async]);
            this.form.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        }
        this._updateDomValue();
    }
    get formDirective() { return this; }
    get control() { return this.form; }
    get path() { return []; }
    /**
     * @param {?} dir
     * @return {?}
     */
    addControl(dir) {
        var /** @type {?} */ ctrl = this.form.find(dir.path);
        shared_1.setUpControl(ctrl, dir);
        ctrl.updateValueAndValidity({ emitEvent: false });
        this.directives.push(dir);
    }
    /**
     * @param {?} dir
     * @return {?}
     */
    getControl(dir) { return (this.form.find(dir.path)); }
    /**
     * @param {?} dir
     * @return {?}
     */
    removeControl(dir) { collection_1.ListWrapper.remove(this.directives, dir); }
    /**
     * @param {?} dir
     * @return {?}
     */
    addControlGroup(dir) {
        var /** @type {?} */ ctrl = this.form.find(dir.path);
        shared_1.setUpControlGroup(ctrl, dir);
        ctrl.updateValueAndValidity({ emitEvent: false });
    }
    /**
     * @param {?} dir
     * @return {?}
     */
    removeControlGroup(dir) { }
    /**
     * @param {?} dir
     * @return {?}
     */
    getControlGroup(dir) {
        return (this.form.find(dir.path));
    }
    /**
     * @param {?} dir
     * @param {?} value
     * @return {?}
     */
    updateModel(dir, value) {
        var /** @type {?} */ ctrl = (this.form.find(dir.path));
        ctrl.updateValue(value);
    }
    /**
     * @return {?}
     */
    onSubmit() {
        async_1.ObservableWrapper.callEmit(this.ngSubmit, null);
        return false;
    }
    /**
     * @internal
     * @return {?}
     */
    _updateDomValue() {
        this.directives.forEach(dir => {
            var /** @type {?} */ ctrl = this.form.find(dir.path);
            dir.valueAccessor.writeValue(ctrl.value);
        });
    }
    /**
     * @return {?}
     */
    _checkFormPresent() {
        if (lang_1.isBlank(this.form)) {
            throw new exceptions_1.BaseException(`ngFormModel expects a form. Please pass one in. Example: <form [ngFormModel]="myCoolForm">`);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        NgFormModel.prototype.form;
        /** @type {?} */
        NgFormModel.prototype.directives;
        /** @type {?} */
        NgFormModel.prototype.ngSubmit;
        /** @type {?} */
        NgFormModel.prototype._validators;
        /** @type {?} */
        NgFormModel.prototype._asyncValidators;
    }
}
NgFormModel.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[ngFormModel]',
                bindings: [exports.formDirectiveProvider],
                inputs: ['form: ngFormModel'],
                host: { '(submit)': 'onSubmit()' },
                outputs: ['ngSubmit'],
                exportAs: 'ngForm'
            },] },
];
NgFormModel.ctorParameters = [
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_VALIDATORS,] },] },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_ASYNC_VALIDATORS,] },] },
];
exports.NgFormModel = NgFormModel;
//# sourceMappingURL=ng_form_model.js.map