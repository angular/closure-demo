goog.module('_angular$common$src$forms$directives$ng__control__group');
var core_1 = goog.require('_angular$core');
var control_container_1 = goog.require('_angular$common$src$forms$directives$control__container');
var shared_1 = goog.require('_angular$common$src$forms$directives$shared');
var validators_1 = goog.require('_angular$common$src$forms$validators');
exports.controlGroupProvider = 
/*@ts2dart_const*/ /* @ts2dart_Provider */ {
    provide: control_container_1.ControlContainer,
    useExisting: core_1.forwardRef(() => NgControlGroup)
};
class NgControlGroup extends control_container_1.ControlContainer {
    /**
     * @param {?} parent
     * @param {?} _validators
     * @param {?} _asyncValidators
     */
    constructor(parent, _validators, _asyncValidators) {
        super();
        this._validators = _validators;
        this._asyncValidators = _asyncValidators;
        this._parent = parent;
    }
    /**
     * @return {?}
     */
    ngOnInit() { this.formDirective.addControlGroup(this); }
    /**
     * @return {?}
     */
    ngOnDestroy() { this.formDirective.removeControlGroup(this); }
    /**
     * Get the {@link ControlGroup} backing this binding.
     */
    get control() { return this.formDirective.getControlGroup(this); }
    /**
     * Get the path to this control group.
     */
    get path() { return shared_1.controlPath(this.name, this._parent); }
    /**
     * Get the {@link Form} to which this group belongs.
     */
    get formDirective() { return this._parent.formDirective; }
    get validator() { return shared_1.composeValidators(this._validators); }
    get asyncValidator() { return shared_1.composeAsyncValidators(this._asyncValidators); }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        NgControlGroup.prototype._parent;
        /** @type {?} */
        NgControlGroup.prototype._validators;
        /** @type {?} */
        NgControlGroup.prototype._asyncValidators;
    }
}
NgControlGroup.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[ngControlGroup]',
                providers: [exports.controlGroupProvider],
                inputs: ['name: ngControlGroup'],
                exportAs: 'ngForm'
            },] },
];
NgControlGroup.ctorParameters = [
    { type: control_container_1.ControlContainer, decorators: [{ type: core_1.Host }, { type: core_1.SkipSelf },] },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_VALIDATORS,] },] },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_ASYNC_VALIDATORS,] },] },
];
exports.NgControlGroup = NgControlGroup;
//# sourceMappingURL=ng_control_group.js.map