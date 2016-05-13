goog.module('_angular$core$src$linker$template__ref');
var lang_1 = goog.require('_angular$core$src$facade$lang');
const /** @type {?} */ EMPTY_CONTEXT = new Object();
/**
 * Represents an Embedded Template that can be used to instantiate Embedded Views.
 *
 * You can access a `TemplateRef`, in two ways. Via a directive placed on a `<template>` element (or
 * directive prefixed with `*`) and have the `TemplateRef` for this Embedded View injected into the
 * constructor of the directive using the `TemplateRef` Token. Alternatively you can query for the
 * `TemplateRef` from a Component or a Directive via {@link Query}.
 *
 * To instantiate Embedded Views based on a Template, use
 * {@link ViewContainerRef#createEmbeddedView}, which will create the View and attach it to the
 * View Container.
 */
class TemplateRef {
    /**
     * The location in the View where the Embedded View logically belongs to.
     *
     * The data-binding and injection contexts of Embedded Views created from this `TemplateRef`
     * inherit from the contexts of this location.
     *
     * Typically new Embedded Views are attached to the View Container of this location, but in
     * advanced use-cases, the View can be attached to a different container while keeping the
     * data-binding and injection context from the original location.
     *
     */
    // TODO(i): rename to anchor or location
    get elementRef() { return null; }
}
exports.TemplateRef = TemplateRef;
class TemplateRef_ extends TemplateRef {
    /**
     * @param {?} _appElement
     * @param {?} _viewFactory
     */
    constructor(_appElement, _viewFactory) {
        super();
        this._appElement = _appElement;
        this._viewFactory = _viewFactory;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    createEmbeddedView(context) {
        var /** @type {?} */ view = this._viewFactory(this._appElement.parentView.viewUtils, this._appElement.parentInjector, this._appElement);
        if (lang_1.isBlank(context)) {
            context = (EMPTY_CONTEXT);
        }
        view.create(context, null, null);
        return view.ref;
    }
    get elementRef() { return this._appElement.elementRef; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TemplateRef_.prototype._appElement;
        /** @type {?} */
        TemplateRef_.prototype._viewFactory;
    }
}
exports.TemplateRef_ = TemplateRef_;
//# sourceMappingURL=template_ref.js.map