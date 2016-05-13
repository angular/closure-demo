goog.module('_angular$common$src$forms$directives$ng__form');
var core_1 = goog.require('_angular$core');
var async_1 = goog.require('_angular$common$src$facade$async');
var collection_1 = goog.require('_angular$common$src$facade$collection');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var control_container_1 = goog.require('_angular$common$src$forms$directives$control__container');
var model_1 = goog.require('_angular$common$src$forms$model');
var shared_1 = goog.require('_angular$common$src$forms$directives$shared');
var validators_1 = goog.require('_angular$common$src$forms$validators');
exports.formDirectiveProvider = 
/*@ts2dart_const*/ { provide: control_container_1.ControlContainer, useExisting: core_1.forwardRef(() => NgForm) };
class NgForm extends control_container_1.ControlContainer {
    /**
     * @param {?} validators
     * @param {?} asyncValidators
     */
    constructor(validators, asyncValidators) {
        super();
        this.ngSubmit = new async_1.EventEmitter();
        this.form = new model_1.ControlGroup({}, null, shared_1.composeValidators(validators), shared_1.composeAsyncValidators(asyncValidators));
    }
    get formDirective() { return this; }
    get control() { return this.form; }
    get path() { return []; }
    get controls() { return this.form.controls; }
    /**
     * @param {?} dir
     * @return {?}
     */
    addControl(dir) {
        async_1.PromiseWrapper.scheduleMicrotask(() => {
            var /** @type {?} */ container = this._findContainer(dir.path);
            var /** @type {?} */ ctrl = new model_1.Control();
            shared_1.setUpControl(ctrl, dir);
            container.addControl(dir.name, ctrl);
            ctrl.updateValueAndValidity({ emitEvent: false });
        });
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
    removeControl(dir) {
        async_1.PromiseWrapper.scheduleMicrotask(() => {
            var /** @type {?} */ container = this._findContainer(dir.path);
            if (lang_1.isPresent(container)) {
                container.removeControl(dir.name);
                container.updateValueAndValidity({ emitEvent: false });
            }
        });
    }
    /**
     * @param {?} dir
     * @return {?}
     */
    addControlGroup(dir) {
        async_1.PromiseWrapper.scheduleMicrotask(() => {
            var /** @type {?} */ container = this._findContainer(dir.path);
            var /** @type {?} */ group = new model_1.ControlGroup({});
            shared_1.setUpControlGroup(group, dir);
            container.addControl(dir.name, group);
            group.updateValueAndValidity({ emitEvent: false });
        });
    }
    /**
     * @param {?} dir
     * @return {?}
     */
    removeControlGroup(dir) {
        async_1.PromiseWrapper.scheduleMicrotask(() => {
            var /** @type {?} */ container = this._findContainer(dir.path);
            if (lang_1.isPresent(container)) {
                container.removeControl(dir.name);
                container.updateValueAndValidity({ emitEvent: false });
            }
        });
    }
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
        async_1.PromiseWrapper.scheduleMicrotask(() => {
            var /** @type {?} */ ctrl = (this.form.find(dir.path));
            ctrl.updateValue(value);
        });
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
     * @param {?} path
     * @return {?}
     */
    _findContainer(path) {
        path.pop();
        return collection_1.ListWrapper.isEmpty(path) ? this.form : (this.form.find(path));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        NgForm.prototype.form;
        /** @type {?} */
        NgForm.prototype.ngSubmit;
    }
}
/** @nocollapse */ NgForm.decorators = [
    { type: core_1.Directive, args: [{
                selector: 'form:not([ngNoForm]):not([ngFormModel]),ngForm,[ngForm]',
                bindings: [exports.formDirectiveProvider],
                host: {
                    '(submit)': 'onSubmit()',
                },
                outputs: ['ngSubmit'],
                exportAs: 'ngForm'
            },] },
];
/** @nocollapse */ NgForm.ctorParameters = [
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_VALIDATORS,] },] },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_ASYNC_VALIDATORS,] },] },
];
exports.NgForm = NgForm;
//# sourceMappingURL=ng_form.js.map