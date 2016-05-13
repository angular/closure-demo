goog.module('_angular$common$src$directives$ng__plural');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var collection_1 = goog.require('_angular$common$src$facade$collection');
var ng_switch_1 = goog.require('_angular$common$src$directives$ng__switch');
const /** @type {?} */ _CATEGORY_DEFAULT = 'other';
class NgLocalization {
}
exports.NgLocalization = NgLocalization;
class NgPluralCase {
    /**
     * @param {?} value
     * @param {?} template
     * @param {?} viewContainer
     */
    constructor(value, template, viewContainer) {
        this.value = value;
        this._view = new ng_switch_1.SwitchView(viewContainer, template);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        NgPluralCase.prototype._view;
        /** @type {?} */
        NgPluralCase.prototype.value;
    }
}
/** @nocollapse */ NgPluralCase.decorators = [
    { type: core_1.Directive, args: [{ selector: '[ngPluralCase]' },] },
];
/** @nocollapse */ NgPluralCase.ctorParameters = [
    { type: undefined, decorators: [{ type: core_1.Attribute, args: ['ngPluralCase',] },] },
    { type: core_1.TemplateRef, },
    { type: core_1.ViewContainerRef, },
];
exports.NgPluralCase = NgPluralCase;
class NgPlural {
    /**
     * @param {?} _localization
     */
    constructor(_localization) {
        this._localization = _localization;
        this._caseViews = new collection_1.Map();
        this.cases = null;
    }
    set ngPlural(value) {
        this._switchValue = value;
        this._updateView();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.cases.forEach((pluralCase) => {
            this._caseViews.set(this._formatValue(pluralCase), pluralCase._view);
        });
        this._updateView();
    }
    /**
     * @internal
     * @return {?}
     */
    _updateView() {
        this._clearViews();
        var /** @type {?} */ view = this._caseViews.get(this._switchValue);
        if (!lang_1.isPresent(view))
            view = this._getCategoryView(this._switchValue);
        this._activateView(view);
    }
    /**
     * @internal
     * @return {?}
     */
    _clearViews() {
        if (lang_1.isPresent(this._activeView))
            this._activeView.destroy();
    }
    /**
     * @internal
     * @param {?} view
     * @return {?}
     */
    _activateView(view) {
        if (!lang_1.isPresent(view))
            return;
        this._activeView = view;
        this._activeView.create();
    }
    /**
     * @internal
     * @param {?} value
     * @return {?}
     */
    _getCategoryView(value) {
        var /** @type {?} */ category = this._localization.getPluralCategory(value);
        var /** @type {?} */ categoryView = this._caseViews.get(category);
        return lang_1.isPresent(categoryView) ? categoryView : this._caseViews.get(_CATEGORY_DEFAULT);
    }
    /**
     * @internal
     * @param {?} pluralCase
     * @return {?}
     */
    _isValueView(pluralCase) { return pluralCase.value[0] === "="; }
    /**
     * @internal
     * @param {?} pluralCase
     * @return {?}
     */
    _formatValue(pluralCase) {
        return this._isValueView(pluralCase) ? this._stripValue(pluralCase.value) : pluralCase.value;
    }
    /**
     * @internal
     * @param {?} value
     * @return {?}
     */
    _stripValue(value) { return lang_1.NumberWrapper.parseInt(value.substring(1), 10); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        NgPlural.prototype._switchValue;
        /** @type {?} */
        NgPlural.prototype._activeView;
        /** @type {?} */
        NgPlural.prototype._caseViews;
        /** @type {?} */
        NgPlural.prototype.cases;
        /** @type {?} */
        NgPlural.prototype._localization;
    }
}
/** @nocollapse */ NgPlural.decorators = [
    { type: core_1.Directive, args: [{ selector: '[ngPlural]' },] },
];
/** @nocollapse */ NgPlural.ctorParameters = [
    { type: NgLocalization, },
];
/** @nocollapse */ NgPlural.propDecorators = {
    'cases': [{ type: core_1.ContentChildren, args: [NgPluralCase,] },],
    'ngPlural': [{ type: core_1.Input },],
};
exports.NgPlural = NgPlural;
//# sourceMappingURL=ng_plural.js.map