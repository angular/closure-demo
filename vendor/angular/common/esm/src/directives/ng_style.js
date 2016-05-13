goog.module('_angular$common$src$directives$ng__style');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
class NgStyle {
    /**
     * @param {?} _differs
     * @param {?} _ngEl
     * @param {?} _renderer
     */
    constructor(_differs, _ngEl, _renderer) {
        this._differs = _differs;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
    }
    set rawStyle(v) {
        this._rawStyle = v;
        if (lang_1.isBlank(this._differ) && lang_1.isPresent(v)) {
            this._differ = this._differs.find(this._rawStyle).create(null);
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (lang_1.isPresent(this._differ)) {
            var /** @type {?} */ changes = this._differ.diff(this._rawStyle);
            if (lang_1.isPresent(changes)) {
                this._applyChanges(changes);
            }
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    _applyChanges(changes) {
        changes.forEachAddedItem((record) => { this._setStyle(record.key, record.currentValue); });
        changes.forEachChangedItem((record) => { this._setStyle(record.key, record.currentValue); });
        changes.forEachRemovedItem((record) => { this._setStyle(record.key, null); });
    }
    /**
     * @param {?} name
     * @param {?} val
     * @return {?}
     */
    _setStyle(name, val) {
        this._renderer.setElementStyle(this._ngEl.nativeElement, name, val);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        NgStyle.prototype._rawStyle;
        /** @internal
        @type {?} */
        NgStyle.prototype._differ;
        /** @type {?} */
        NgStyle.prototype._differs;
        /** @type {?} */
        NgStyle.prototype._ngEl;
        /** @type {?} */
        NgStyle.prototype._renderer;
    }
}
/** @nocollapse */ NgStyle.decorators = [
    { type: core_1.Directive, args: [{ selector: '[ngStyle]', inputs: ['rawStyle: ngStyle'] },] },
];
/** @nocollapse */ NgStyle.ctorParameters = [
    { type: core_1.KeyValueDiffers, },
    { type: core_1.ElementRef, },
    { type: core_1.Renderer, },
];
exports.NgStyle = NgStyle;
//# sourceMappingURL=ng_style.js.map