goog.module('_angular$common$src$forms$directives$default__value__accessor');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var control_value_accessor_1 = goog.require('_angular$common$src$forms$directives$control__value__accessor');
exports.DEFAULT_VALUE_ACCESSOR = 
/* @ts2dart_Provider */ {
    provide: control_value_accessor_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => DefaultValueAccessor),
    multi: true
};
class DefaultValueAccessor {
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
        var /** @type {?} */ normalizedValue = lang_1.isBlank(value) ? '' : value;
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
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
        DefaultValueAccessor.prototype.onChange;
        /** @type {?} */
        DefaultValueAccessor.prototype.onTouched;
        /** @type {?} */
        DefaultValueAccessor.prototype._renderer;
        /** @type {?} */
        DefaultValueAccessor.prototype._elementRef;
    }
}
/** @nocollapse */ DefaultValueAccessor.decorators = [
    { type: core_1.Directive, args: [{
                selector: 'input:not([type=checkbox])[ngControl],textarea[ngControl],input:not([type=checkbox])[ngFormControl],textarea[ngFormControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
                // TODO: vsavkin replace the above selector with the one below it once
                // https://github.com/angular/angular/issues/3011 is implemented
                // selector: '[ngControl],[ngModel],[ngFormControl]',
                host: { '(input)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
                bindings: [exports.DEFAULT_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */ DefaultValueAccessor.ctorParameters = [
    { type: core_1.Renderer, },
    { type: core_1.ElementRef, },
];
exports.DefaultValueAccessor = DefaultValueAccessor;
//# sourceMappingURL=default_value_accessor.js.map