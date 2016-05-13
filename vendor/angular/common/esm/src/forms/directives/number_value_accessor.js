goog.module('_angular$common$src$forms$directives$number__value__accessor');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var control_value_accessor_1 = goog.require('_angular$common$src$forms$directives$control__value__accessor');
exports.NUMBER_VALUE_ACCESSOR = {
    provide: control_value_accessor_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => NumberValueAccessor),
    multi: true
};
class NumberValueAccessor {
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
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', value);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = (value) => { fn(value == '' ? null : lang_1.NumberWrapper.parseFloat(value)); };
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        NumberValueAccessor.prototype.onChange;
        /** @type {?} */
        NumberValueAccessor.prototype.onTouched;
        /** @type {?} */
        NumberValueAccessor.prototype._renderer;
        /** @type {?} */
        NumberValueAccessor.prototype._elementRef;
    }
}
NumberValueAccessor.decorators = [
    { type: core_1.Directive, args: [{
                selector: 'input[type=number][ngControl],input[type=number][ngFormControl],input[type=number][ngModel]',
                host: {
                    '(change)': 'onChange($event.target.value)',
                    '(input)': 'onChange($event.target.value)',
                    '(blur)': 'onTouched()'
                },
                bindings: [exports.NUMBER_VALUE_ACCESSOR]
            },] },
];
NumberValueAccessor.ctorParameters = [
    { type: core_1.Renderer, },
    { type: core_1.ElementRef, },
];
exports.NumberValueAccessor = NumberValueAccessor;
//# sourceMappingURL=number_value_accessor.js.map