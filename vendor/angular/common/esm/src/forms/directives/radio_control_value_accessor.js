goog.module('_angular$common$src$forms$directives$radio__control__value__accessor');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var collection_1 = goog.require('_angular$common$src$facade$collection');
var control_value_accessor_1 = goog.require('_angular$common$src$forms$directives$control__value__accessor');
var ng_control_1 = goog.require('_angular$common$src$forms$directives$ng__control');
exports.RADIO_VALUE_ACCESSOR = {
    provide: control_value_accessor_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => RadioControlValueAccessor),
    multi: true
};
class RadioControlRegistry {
    constructor() {
        this._accessors = [];
    }
    /**
     * @param {?} control
     * @param {?} accessor
     * @return {?}
     */
    add(control, accessor) {
        this._accessors.push([control, accessor]);
    }
    /**
     * @param {?} accessor
     * @return {?}
     */
    remove(accessor) {
        var /** @type {?} */ indexToRemove = -1;
        for (var /** @type {?} */ i = 0; i < this._accessors.length; ++i) {
            if (this._accessors[i][1] === accessor) {
                indexToRemove = i;
            }
        }
        collection_1.ListWrapper.removeAt(this._accessors, indexToRemove);
    }
    /**
     * @param {?} accessor
     * @return {?}
     */
    select(accessor) {
        this._accessors.forEach((c) => {
            if (c[0].control.root === accessor._control.control.root && c[1] !== accessor) {
                c[1].fireUncheck();
            }
        });
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        RadioControlRegistry.prototype._accessors;
    }
}
/** @nocollapse */ RadioControlRegistry.decorators = [
    { type: core_1.Injectable },
];
exports.RadioControlRegistry = RadioControlRegistry;
/**
 * The value provided by the forms API for radio buttons.
 */
class RadioButtonState {
    /**
     * @param {?} checked
     * @param {?} value
     */
    constructor(checked, value) {
        this.checked = checked;
        this.value = value;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        RadioButtonState.prototype.checked;
        /** @type {?} */
        RadioButtonState.prototype.value;
    }
}
exports.RadioButtonState = RadioButtonState;
class RadioControlValueAccessor {
    /**
     * @param {?} _renderer
     * @param {?} _elementRef
     * @param {?} _registry
     * @param {?} _injector
     */
    constructor(_renderer, _elementRef, _registry, _injector) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._registry = _registry;
        this._injector = _injector;
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._control = this._injector.get(ng_control_1.NgControl);
        this._registry.add(this._control, this);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() { this._registry.remove(this); }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._state = value;
        if (lang_1.isPresent(value) && value.checked) {
            this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', true);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._fn = fn;
        this.onChange = () => {
            fn(new RadioButtonState(true, this._state.value));
            this._registry.select(this);
        };
    }
    /**
     * @return {?}
     */
    fireUncheck() { this._fn(new RadioButtonState(false, this._state.value)); }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        RadioControlValueAccessor.prototype._state;
        /** @internal
        @type {?} */
        RadioControlValueAccessor.prototype._control;
        /** @type {?} */
        RadioControlValueAccessor.prototype.name;
        /** @internal
        @type {?} */
        RadioControlValueAccessor.prototype._fn;
        /** @type {?} */
        RadioControlValueAccessor.prototype.onChange;
        /** @type {?} */
        RadioControlValueAccessor.prototype.onTouched;
        /** @type {?} */
        RadioControlValueAccessor.prototype._renderer;
        /** @type {?} */
        RadioControlValueAccessor.prototype._elementRef;
        /** @type {?} */
        RadioControlValueAccessor.prototype._registry;
        /** @type {?} */
        RadioControlValueAccessor.prototype._injector;
    }
}
/** @nocollapse */ RadioControlValueAccessor.decorators = [
    { type: core_1.Directive, args: [{
                selector: 'input[type=radio][ngControl],input[type=radio][ngFormControl],input[type=radio][ngModel]',
                host: { '(change)': 'onChange()', '(blur)': 'onTouched()' },
                providers: [exports.RADIO_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */ RadioControlValueAccessor.ctorParameters = [
    { type: core_1.Renderer, },
    { type: core_1.ElementRef, },
    { type: RadioControlRegistry, },
    { type: core_1.Injector, },
];
/** @nocollapse */ RadioControlValueAccessor.propDecorators = {
    'name': [{ type: core_1.Input },],
};
exports.RadioControlValueAccessor = RadioControlValueAccessor;
//# sourceMappingURL=radio_control_value_accessor.js.map