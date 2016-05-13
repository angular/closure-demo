goog.module('_angular$common$src$forms$directives$select__control__value__accessor');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var collection_1 = goog.require('_angular$common$src$facade$collection');
var control_value_accessor_1 = goog.require('_angular$common$src$forms$directives$control__value__accessor');
exports.SELECT_VALUE_ACCESSOR = {
    provide: control_value_accessor_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => SelectControlValueAccessor),
    multi: true
};
/**
 * @param {?} id
 * @param {?} value
 * @return {?}
 */
function _buildValueString(id, value) {
    if (lang_1.isBlank(id))
        return `${value}`;
    if (!lang_1.isPrimitive(value))
        value = "Object";
    return lang_1.StringWrapper.slice(`${id}: ${value}`, 0, 50);
}
/**
 * @param {?} valueString
 * @return {?}
 */
function _extractId(valueString) {
    return valueString.split(":")[0];
}
class SelectControlValueAccessor {
    /**
     * @param {?} _renderer
     * @param {?} _elementRef
     */
    constructor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /** @internal */
        this._optionMap = new Map();
        /** @internal */
        this._idCounter = 0;
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
        var /** @type {?} */ valueString = _buildValueString(this._getOptionId(value), value);
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', valueString);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = (valueString) => { fn(this._getOptionValue(valueString)); };
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @internal
     * @return {?}
     */
    _registerOption() { return (this._idCounter++).toString(); }
    /**
     * @internal
     * @param {?} value
     * @return {?}
     */
    _getOptionId(value) {
        for (let id of collection_1.MapWrapper.keys(this._optionMap)) {
            if (lang_1.looseIdentical(this._optionMap.get(id), value))
                return id;
        }
        return null;
    }
    /**
     * @internal
     * @param {?} valueString
     * @return {?}
     */
    _getOptionValue(valueString) {
        let /** @type {?} */ value = this._optionMap.get(_extractId(valueString));
        return lang_1.isPresent(value) ? value : valueString;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SelectControlValueAccessor.prototype.value;
        /** @internal
        @type {?} */
        SelectControlValueAccessor.prototype._optionMap;
        /** @internal
        @type {?} */
        SelectControlValueAccessor.prototype._idCounter;
        /** @type {?} */
        SelectControlValueAccessor.prototype.onChange;
        /** @type {?} */
        SelectControlValueAccessor.prototype.onTouched;
        /** @type {?} */
        SelectControlValueAccessor.prototype._renderer;
        /** @type {?} */
        SelectControlValueAccessor.prototype._elementRef;
    }
}
SelectControlValueAccessor.decorators = [
    { type: core_1.Directive, args: [{
                selector: 'select[ngControl],select[ngFormControl],select[ngModel]',
                host: { '(change)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
                providers: [exports.SELECT_VALUE_ACCESSOR]
            },] },
];
SelectControlValueAccessor.ctorParameters = [
    { type: core_1.Renderer, },
    { type: core_1.ElementRef, },
];
exports.SelectControlValueAccessor = SelectControlValueAccessor;
class NgSelectOption {
    /**
     * @param {?} _element
     * @param {?} _renderer
     * @param {?} _select
     */
    constructor(_element, _renderer, _select) {
        this._element = _element;
        this._renderer = _renderer;
        this._select = _select;
        if (lang_1.isPresent(this._select))
            this.id = this._select._registerOption();
    }
    set ngValue(value) {
        if (this._select == null)
            return;
        this._select._optionMap.set(this.id, value);
        this._setElementValue(_buildValueString(this.id, value));
        this._select.writeValue(this._select.value);
    }
    set value(value) {
        this._setElementValue(value);
        if (lang_1.isPresent(this._select))
            this._select.writeValue(this._select.value);
    }
    /**
     * @internal
     * @param {?} value
     * @return {?}
     */
    _setElementValue(value) {
        this._renderer.setElementProperty(this._element.nativeElement, 'value', value);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (lang_1.isPresent(this._select)) {
            this._select._optionMap.delete(this.id);
            this._select.writeValue(this._select.value);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        NgSelectOption.prototype.id;
        /** @type {?} */
        NgSelectOption.prototype._element;
        /** @type {?} */
        NgSelectOption.prototype._renderer;
        /** @type {?} */
        NgSelectOption.prototype._select;
    }
}
NgSelectOption.decorators = [
    { type: core_1.Directive, args: [{ selector: 'option' },] },
];
NgSelectOption.ctorParameters = [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer, },
    { type: SelectControlValueAccessor, decorators: [{ type: core_1.Optional }, { type: core_1.Host },] },
];
NgSelectOption.propDecorators = {
    'ngValue': [{ type: core_1.Input, args: ['ngValue',] },],
    'value': [{ type: core_1.Input, args: ['value',] },],
};
exports.NgSelectOption = NgSelectOption;
//# sourceMappingURL=select_control_value_accessor.js.map