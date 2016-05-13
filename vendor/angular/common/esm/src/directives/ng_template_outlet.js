goog.module('_angular$common$src$directives$ng__template__outlet');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
class NgTemplateOutlet {
    /**
     * @param {?} _viewContainerRef
     */
    constructor(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
    }
    set ngTemplateOutlet(templateRef) {
        if (lang_1.isPresent(this._insertedViewRef)) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._insertedViewRef));
        }
        if (lang_1.isPresent(templateRef)) {
            this._insertedViewRef = this._viewContainerRef.createEmbeddedView(templateRef);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        NgTemplateOutlet.prototype._insertedViewRef;
        /** @type {?} */
        NgTemplateOutlet.prototype._viewContainerRef;
    }
}
NgTemplateOutlet.decorators = [
    { type: core_1.Directive, args: [{ selector: '[ngTemplateOutlet]' },] },
];
NgTemplateOutlet.ctorParameters = [
    { type: core_1.ViewContainerRef, },
];
NgTemplateOutlet.propDecorators = {
    'ngTemplateOutlet': [{ type: core_1.Input },],
};
exports.NgTemplateOutlet = NgTemplateOutlet;
//# sourceMappingURL=ng_template_outlet.js.map