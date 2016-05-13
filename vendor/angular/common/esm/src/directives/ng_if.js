goog.module('_angular$common$src$directives$ng__if');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
class NgIf {
    /**
     * @param {?} _viewContainer
     * @param {?} _templateRef
     */
    constructor(_viewContainer, _templateRef) {
        this._viewContainer = _viewContainer;
        this._templateRef = _templateRef;
        this._prevCondition = null;
    }
    set ngIf(newCondition /* boolean */) {
        if (newCondition && (lang_1.isBlank(this._prevCondition) || !this._prevCondition)) {
            this._prevCondition = true;
            this._viewContainer.createEmbeddedView(this._templateRef);
        }
        else if (!newCondition && (lang_1.isBlank(this._prevCondition) || this._prevCondition)) {
            this._prevCondition = false;
            this._viewContainer.clear();
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        NgIf.prototype._prevCondition;
        /** @type {?} */
        NgIf.prototype._viewContainer;
        /** @type {?} */
        NgIf.prototype._templateRef;
    }
}
NgIf.decorators = [
    { type: core_1.Directive, args: [{ selector: '[ngIf]', inputs: ['ngIf'] },] },
];
NgIf.ctorParameters = [
    { type: core_1.ViewContainerRef, },
    { type: core_1.TemplateRef, },
];
exports.NgIf = NgIf;
//# sourceMappingURL=ng_if.js.map