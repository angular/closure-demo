goog.module('_angular$common$src$forms$directives$checkbox__value__accessor');
var core_1 = goog.require('_angular$core');
var control_value_accessor_1 = goog.require('_angular$common$src$forms$directives$control__value__accessor');
exports.CHECKBOX_VALUE_ACCESSOR = {
    provide: control_value_accessor_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => CheckboxControlValueAccessor),
    multi: true
};
class CheckboxControlValueAccessor {
    /**
     * @param {?} _renderer
     * @param {?} _elementRef
     */
    constructor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', value);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CheckboxControlValueAccessor.prototype.onChange;
        /** @type {?} */
        CheckboxControlValueAccessor.prototype.onTouched;
        /** @type {?} */
        CheckboxControlValueAccessor.prototype._renderer;
        /** @type {?} */
        CheckboxControlValueAccessor.prototype._elementRef;
    }
}
/** @nocollapse */ CheckboxControlValueAccessor.decorators = [
    { type: core_1.Directive, args: [{
                selector: 'input[type=checkbox][ngControl],input[type=checkbox][ngFormControl],input[type=checkbox][ngModel]',
                host: { '(change)': 'onChange($event.target.checked)', '(blur)': 'onTouched()' },
                providers: [exports.CHECKBOX_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */ CheckboxControlValueAccessor.ctorParameters = [
    { type: core_1.Renderer, },
    { type: core_1.ElementRef, },
];
exports.CheckboxControlValueAccessor = CheckboxControlValueAccessor;
//# sourceMappingURL=checkbox_value_accessor.js.map