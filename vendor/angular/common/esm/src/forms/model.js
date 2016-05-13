goog.module('_angular$common$src$forms$model');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var async_1 = goog.require('_angular$common$src$facade$async');
var promise_1 = goog.require('_angular$common$src$facade$promise');
var collection_1 = goog.require('_angular$common$src$facade$collection');
/**
 * Indicates that a Control is valid, i.e. that no errors exist in the input value.
 */
exports.VALID = "VALID";
/**
 * Indicates that a Control is invalid, i.e. that an error exists in the input value.
 */
exports.INVALID = "INVALID";
/**
 * Indicates that a Control is pending, i.e. that async validation is occurring and
 * errors are not yet available for the input value.
 */
exports.PENDING = "PENDING";
/**
 * @param {?} control
 * @return {?}
 */
function isControl(control) {
    return control instanceof AbstractControl;
}
exports.isControl = isControl;
/**
 * @param {?} control
 * @param {?} path
 * @return {?}
 */
function _find(control, path) {
    if (lang_1.isBlank(path))
        return null;
    if (!(path instanceof Array)) {
        path = ((path)).split("/");
    }
    if (path instanceof Array && collection_1.ListWrapper.isEmpty(path))
        return null;
    return ((path))
        .reduce((v, name) => {
        if (v instanceof ControlGroup) {
            return lang_1.isPresent(v.controls[name]) ? v.controls[name] : null;
        }
        else if (v instanceof ControlArray) {
            var /** @type {?} */ index = (name);
            return lang_1.isPresent(v.at(index)) ? v.at(index) : null;
        }
        else {
            return null;
        }
    }, control);
}
/**
 * @param {?} r
 * @return {?}
 */
function toObservable(r) {
    return promise_1.PromiseWrapper.isPromise(r) ? async_1.ObservableWrapper.fromPromise(r) : r;
}
/**
 *
 */
class AbstractControl {
    /**
     * @param {?} validator
     * @param {?} asyncValidator
     */
    constructor(validator, asyncValidator) {
        this.validator = validator;
        this.asyncValidator = asyncValidator;
        this._pristine = true;
        this._touched = false;
    }
    get value() { return this._value; }
    get status() { return this._status; }
    get valid() { return this._status === exports.VALID; }
    /**
     * Returns the errors of this control.
     */
    get errors() { return this._errors; }
    get pristine() { return this._pristine; }
    get dirty() { return !this.pristine; }
    get touched() { return this._touched; }
    get untouched() { return !this._touched; }
    get valueChanges() { return this._valueChanges; }
    get statusChanges() { return this._statusChanges; }
    get pending() { return this._status == exports.PENDING; }
    /**
     * @return {?}
     */
    markAsTouched() { this._touched = true; }
    /**
     * @param {?=} __0
     * @return {?}
     */
    markAsDirty({ onlySelf } = {}) {
        onlySelf = lang_1.normalizeBool(onlySelf);
        this._pristine = false;
        if (lang_1.isPresent(this._parent) && !onlySelf) {
            this._parent.markAsDirty({ onlySelf: onlySelf });
        }
    }
    /**
     * @param {?=} __0
     * @return {?}
     */
    markAsPending({ onlySelf } = {}) {
        onlySelf = lang_1.normalizeBool(onlySelf);
        this._status = exports.PENDING;
        if (lang_1.isPresent(this._parent) && !onlySelf) {
            this._parent.markAsPending({ onlySelf: onlySelf });
        }
    }
    /**
     * @param {?} parent
     * @return {?}
     */
    setParent(parent) { this._parent = parent; }
    /**
     * @param {?=} __0
     * @return {?}
     */
    updateValueAndValidity({ onlySelf, emitEvent } = {}) {
        onlySelf = lang_1.normalizeBool(onlySelf);
        emitEvent = lang_1.isPresent(emitEvent) ? emitEvent : true;
        this._updateValue();
        this._errors = this._runValidator();
        this._status = this._calculateStatus();
        if (this._status == exports.VALID || this._status == exports.PENDING) {
            this._runAsyncValidator(emitEvent);
        }
        if (emitEvent) {
            async_1.ObservableWrapper.callEmit(this._valueChanges, this._value);
            async_1.ObservableWrapper.callEmit(this._statusChanges, this._status);
        }
        if (lang_1.isPresent(this._parent) && !onlySelf) {
            this._parent.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
        }
    }
    /**
     * @return {?}
     */
    _runValidator() {
        return lang_1.isPresent(this.validator) ? this.validator(this) : null;
    }
    /**
     * @param {?} emitEvent
     * @return {?}
     */
    _runAsyncValidator(emitEvent) {
        if (lang_1.isPresent(this.asyncValidator)) {
            this._status = exports.PENDING;
            this._cancelExistingSubscription();
            var /** @type {?} */ obs = toObservable(this.asyncValidator(this));
            this._asyncValidationSubscription = async_1.ObservableWrapper.subscribe(obs, (res) => this.setErrors(res, { emitEvent: emitEvent }));
        }
    }
    /**
     * @return {?}
     */
    _cancelExistingSubscription() {
        if (lang_1.isPresent(this._asyncValidationSubscription)) {
            async_1.ObservableWrapper.dispose(this._asyncValidationSubscription);
        }
    }
    /**
     *  Sets errors on a control. * This is used when validations are run not automatically, but manually by the user. * Calling `setErrors` will also update the validity of the parent control. * ## Usage * ``` var login = new Control("someLogin"); login.setErrors({ "notUnique": true }); * expect(login.valid).toEqual(false); expect(login.errors).toEqual({"notUnique": true}); * login.updateValue("someOtherLogin"); * expect(login.valid).toEqual(true); ```
     * @param {?} errors
     * @param {?=} __1
     * @return {?}
     */
    setErrors(errors, { emitEvent } = {}) {
        emitEvent = lang_1.isPresent(emitEvent) ? emitEvent : true;
        this._errors = errors;
        this._status = this._calculateStatus();
        if (emitEvent) {
            async_1.ObservableWrapper.callEmit(this._statusChanges, this._status);
        }
        if (lang_1.isPresent(this._parent)) {
            this._parent._updateControlsErrors();
        }
    }
    /**
     * @param {?} path
     * @return {?}
     */
    find(path) { return _find(this, path); }
    /**
     * @param {?} errorCode
     * @param {?=} path
     * @return {?}
     */
    getError(errorCode, path = null) {
        var /** @type {?} */ control = lang_1.isPresent(path) && !collection_1.ListWrapper.isEmpty(path) ? this.find(path) : this;
        if (lang_1.isPresent(control) && lang_1.isPresent(control._errors)) {
            return collection_1.StringMapWrapper.get(control._errors, errorCode);
        }
        else {
            return null;
        }
    }
    /**
     * @param {?} errorCode
     * @param {?=} path
     * @return {?}
     */
    hasError(errorCode, path = null) {
        return lang_1.isPresent(this.getError(errorCode, path));
    }
    get root() {
        let /** @type {?} */ x = this;
        while (lang_1.isPresent(x._parent)) {
            x = x._parent;
        }
        return x;
    }
    /**
     * @internal
     * @return {?}
     */
    _updateControlsErrors() {
        this._status = this._calculateStatus();
        if (lang_1.isPresent(this._parent)) {
            this._parent._updateControlsErrors();
        }
    }
    /**
     * @internal
     * @return {?}
     */
    _initObservables() {
        this._valueChanges = new async_1.EventEmitter();
        this._statusChanges = new async_1.EventEmitter();
    }
    /**
     * @return {?}
     */
    _calculateStatus() {
        if (lang_1.isPresent(this._errors))
            return exports.INVALID;
        if (this._anyControlsHaveStatus(exports.PENDING))
            return exports.PENDING;
        if (this._anyControlsHaveStatus(exports.INVALID))
            return exports.INVALID;
        return exports.VALID;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        AbstractControl.prototype._value;
        /** @type {?} */
        AbstractControl.prototype._valueChanges;
        /** @type {?} */
        AbstractControl.prototype._statusChanges;
        /** @type {?} */
        AbstractControl.prototype._status;
        /** @type {?} */
        AbstractControl.prototype._errors;
        /** @type {?} */
        AbstractControl.prototype._pristine;
        /** @type {?} */
        AbstractControl.prototype._touched;
        /** @type {?} */
        AbstractControl.prototype._parent;
        /** @type {?} */
        AbstractControl.prototype._asyncValidationSubscription;
        /** @type {?} */
        AbstractControl.prototype.validator;
        /** @type {?} */
        AbstractControl.prototype.asyncValidator;
    }
}
exports.AbstractControl = AbstractControl;
/**
 * Defines a part of a form that cannot be divided into other controls. `Control`s have values and
 * validation state, which is determined by an optional validation function.
 *
 * `Control` is one of the three fundamental building blocks used to define forms in Angular, along
 * with {@link ControlGroup} and {@link ControlArray}.
 *
 * ## Usage
 *
 * By default, a `Control` is created for every `<input>` or other form component.
 * With {@link NgFormControl} or {@link NgFormModel} an existing {@link Control} can be
 * bound to a DOM element instead. This `Control` can be configured with a custom
 * validation function.
 *
 * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
 */
class Control extends AbstractControl {
    /**
     * @param {?=} value
     * @param {?=} validator
     * @param {?=} asyncValidator
     */
    constructor(value = null, validator = null, asyncValidator = null) {
        super(validator, asyncValidator);
        this._value = value;
        this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        this._initObservables();
    }
    /**
     *  Set the value of the control to `value`. * If `onlySelf` is `true`, this change will only affect the validation of this `Control` and not its parent component. If `emitEvent` is `true`, this change will cause a `valueChanges` event on the `Control` to be emitted. Both of these options default to `false`. * If `emitModelToViewChange` is `true`, the view will be notified about the new value via an `onChange` event. This is the default behavior if `emitModelToViewChange` is not specified.
     * @param {?} value
     * @param {?=} __1
     * @return {?}
     */
    updateValue(value, { onlySelf, emitEvent, emitModelToViewChange } = {}) {
        emitModelToViewChange = lang_1.isPresent(emitModelToViewChange) ? emitModelToViewChange : true;
        this._value = value;
        if (lang_1.isPresent(this._onChange) && emitModelToViewChange)
            this._onChange(this._value);
        this.updateValueAndValidity({ onlySelf: onlySelf, emitEvent: emitEvent });
    }
    /**
     * @internal
     * @return {?}
     */
    _updateValue() { }
    /**
     * @internal
     * @param {?} status
     * @return {?}
     */
    _anyControlsHaveStatus(status) { return false; }
    /**
     *  Register a listener for change events.
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this._onChange = fn; }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        Control.prototype._onChange;
    }
}
exports.Control = Control;
/**
 * Defines a part of a form, of fixed length, that can contain other controls.
 *
 * A `ControlGroup` aggregates the values of each {@link Control} in the group.
 * The status of a `ControlGroup` depends on the status of its children.
 * If one of the controls in a group is invalid, the entire group is invalid.
 * Similarly, if a control changes its value, the entire group changes as well.
 *
 * `ControlGroup` is one of the three fundamental building blocks used to define forms in Angular,
 * along with {@link Control} and {@link ControlArray}. {@link ControlArray} can also contain other
 * controls, but is of variable length.
 *
 * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
 */
class ControlGroup extends AbstractControl {
    /**
     * @param {?} controls
     * @param {?=} optionals
     * @param {?=} validator
     * @param {?=} asyncValidator
     */
    constructor(controls, optionals = null, validator = null, asyncValidator = null) {
        super(validator, asyncValidator);
        this.controls = controls;
        this._optionals = lang_1.isPresent(optionals) ? optionals : {};
        this._initObservables();
        this._setParentForControls();
        this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
    /**
     *  Add a control to this group.
     * @param {?} name
     * @param {?} control
     * @return {?}
     */
    addControl(name, control) {
        this.controls[name] = control;
        control.setParent(this);
    }
    /**
     *  Remove a control from this group.
     * @param {?} name
     * @return {?}
     */
    removeControl(name) { collection_1.StringMapWrapper.delete(this.controls, name); }
    /**
     *  Mark the named control as non-optional.
     * @param {?} controlName
     * @return {?}
     */
    include(controlName) {
        collection_1.StringMapWrapper.set(this._optionals, controlName, true);
        this.updateValueAndValidity();
    }
    /**
     *  Mark the named control as optional.
     * @param {?} controlName
     * @return {?}
     */
    exclude(controlName) {
        collection_1.StringMapWrapper.set(this._optionals, controlName, false);
        this.updateValueAndValidity();
    }
    /**
     *  Check whether there is a control with the given name in the group.
     * @param {?} controlName
     * @return {?}
     */
    contains(controlName) {
        var /** @type {?} */ c = collection_1.StringMapWrapper.contains(this.controls, controlName);
        return c && this._included(controlName);
    }
    /**
     * @internal
     * @return {?}
     */
    _setParentForControls() {
        collection_1.StringMapWrapper.forEach(this.controls, (control, name) => { control.setParent(this); });
    }
    /**
     * @internal
     * @return {?}
     */
    _updateValue() { this._value = this._reduceValue(); }
    /**
     * @internal
     * @param {?} status
     * @return {?}
     */
    _anyControlsHaveStatus(status) {
        var /** @type {?} */ res = false;
        collection_1.StringMapWrapper.forEach(this.controls, (control, name) => {
            res = res || (this.contains(name) && control.status == status);
        });
        return res;
    }
    /**
     * @internal
     * @return {?}
     */
    _reduceValue() {
        return this._reduceChildren({}, (acc, control, name) => {
            acc[name] = control.value;
            return acc;
        });
    }
    /**
     * @internal
     * @param {?} initValue
     * @param {?} fn
     * @return {?}
     */
    _reduceChildren(initValue, fn) {
        var /** @type {?} */ res = initValue;
        collection_1.StringMapWrapper.forEach(this.controls, (control, name) => {
            if (this._included(name)) {
                res = fn(res, control, name);
            }
        });
        return res;
    }
    /**
     * @internal
     * @param {?} controlName
     * @return {?}
     */
    _included(controlName) {
        var /** @type {?} */ isOptional = collection_1.StringMapWrapper.contains(this._optionals, controlName);
        return !isOptional || collection_1.StringMapWrapper.get(this._optionals, controlName);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ControlGroup.prototype._optionals;
        /** @type {?} */
        ControlGroup.prototype.controls;
    }
}
exports.ControlGroup = ControlGroup;
/**
 * Defines a part of a form, of variable length, that can contain other controls.
 *
 * A `ControlArray` aggregates the values of each {@link Control} in the group.
 * The status of a `ControlArray` depends on the status of its children.
 * If one of the controls in a group is invalid, the entire array is invalid.
 * Similarly, if a control changes its value, the entire array changes as well.
 *
 * `ControlArray` is one of the three fundamental building blocks used to define forms in Angular,
 * along with {@link Control} and {@link ControlGroup}. {@link ControlGroup} can also contain
 * other controls, but is of fixed length.
 *
 * ## Adding or removing controls
 *
 * To change the controls in the array, use the `push`, `insert`, or `removeAt` methods
 * in `ControlArray` itself. These methods ensure the controls are properly tracked in the
 * form's hierarchy. Do not modify the array of `AbstractControl`s used to instantiate
 * the `ControlArray` directly, as that will result in strange and unexpected behavior such
 * as broken change detection.
 *
 * ### Example ([live demo](http://plnkr.co/edit/23DESOpbNnBpBHZt1BR4?p=preview))
 */
class ControlArray extends AbstractControl {
    /**
     * @param {?} controls
     * @param {?=} validator
     * @param {?=} asyncValidator
     */
    constructor(controls, validator = null, asyncValidator = null) {
        super(validator, asyncValidator);
        this.controls = controls;
        this._initObservables();
        this._setParentForControls();
        this.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
    /**
     *  Get the {@link AbstractControl} at the given `index` in the array.
     * @param {?} index
     * @return {?}
     */
    at(index) { return this.controls[index]; }
    /**
     *  Insert a new {@link AbstractControl} at the end of the array.
     * @param {?} control
     * @return {?}
     */
    push(control) {
        this.controls.push(control);
        control.setParent(this);
        this.updateValueAndValidity();
    }
    /**
     *  Insert a new {@link AbstractControl} at the given `index` in the array.
     * @param {?} index
     * @param {?} control
     * @return {?}
     */
    insert(index, control) {
        collection_1.ListWrapper.insert(this.controls, index, control);
        control.setParent(this);
        this.updateValueAndValidity();
    }
    /**
     *  Remove the control at the given `index` in the array.
     * @param {?} index
     * @return {?}
     */
    removeAt(index) {
        collection_1.ListWrapper.removeAt(this.controls, index);
        this.updateValueAndValidity();
    }
    /**
     * Length of the control array.
     */
    get length() { return this.controls.length; }
    /**
     * @internal
     * @return {?}
     */
    _updateValue() { this._value = this.controls.map((control) => control.value); }
    /**
     * @internal
     * @param {?} status
     * @return {?}
     */
    _anyControlsHaveStatus(status) {
        return this.controls.some(c => c.status == status);
    }
    /**
     * @internal
     * @return {?}
     */
    _setParentForControls() {
        this.controls.forEach((control) => { control.setParent(this); });
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ControlArray.prototype.controls;
    }
}
exports.ControlArray = ControlArray;
//# sourceMappingURL=model.js.map