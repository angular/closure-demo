goog.module('_angular$core$src$linker$view__container__ref');
var collection_1 = goog.require('_angular$core$src$facade$collection');
var exceptions_1 = goog.require('_angular$core$src$facade$exceptions');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var profile_1 = goog.require('_angular$core$src$profile$profile');
/**
 * Represents a container where one or more Views can be attached.
 *
 * The container can contain two kinds of Views. Host Views, created by instantiating a
 * {@link Component} via {@link #createComponent}, and Embedded Views, created by instantiating an
 * {@link TemplateRef Embedded Template} via {@link #createEmbeddedView}.
 *
 * The location of the View Container within the containing View is specified by the Anchor
 * `element`. Each View Container can have only one Anchor Element and each Anchor Element can only
 * have a single View Container.
 *
 * Root elements of Views attached to this container become siblings of the Anchor Element in
 * the Rendered View.
 *
 * To access a `ViewContainerRef` of an Element, you can either place a {@link Directive} injected
 * with `ViewContainerRef` on the Element, or you obtain it via a {@link ViewChild} query.
 */
class ViewContainerRef {
    /**
     * Anchor element that specifies the location of this container in the containing View.
     * <!-- TODO: rename to anchorElement -->
     */
    get element() { return (exceptions_1.unimplemented()); }
    get injector() { return (exceptions_1.unimplemented()); }
    get parentInjector() { return (exceptions_1.unimplemented()); }
    /**
     * Returns the number of Views currently attached to this container.
     */
    get length() { return (exceptions_1.unimplemented()); }
    ;
}
exports.ViewContainerRef = ViewContainerRef;
class ViewContainerRef_ {
    /**
     * @param {?} _element
     */
    constructor(_element) {
        this._element = _element;
        /** @internal */
        this._createComponentInContainerScope = profile_1.wtfCreateScope('ViewContainerRef#createComponent()');
        /** @internal */
        this._insertScope = profile_1.wtfCreateScope('ViewContainerRef#insert()');
        /** @internal */
        this._removeScope = profile_1.wtfCreateScope('ViewContainerRef#remove()');
        /** @internal */
        this._detachScope = profile_1.wtfCreateScope('ViewContainerRef#detach()');
    }
    /**
     * @param {?} index
     * @return {?}
     */
    get(index) { return this._element.nestedViews[index].ref; }
    get length() {
        var /** @type {?} */ views = this._element.nestedViews;
        return lang_1.isPresent(views) ? views.length : 0;
    }
    get element() { return this._element.elementRef; }
    get injector() { return this._element.injector; }
    get parentInjector() { return this._element.parentInjector; }
    /**
     * @param {?} templateRef
     * @param {?=} context
     * @param {?=} index
     * @return {?}
     */
    createEmbeddedView(templateRef, context = null, index = -1) {
        var /** @type {?} */ viewRef = templateRef.createEmbeddedView(context);
        this.insert(viewRef, index);
        return viewRef;
    }
    /**
     * @param {?} componentFactory
     * @param {?=} index
     * @param {?=} injector
     * @param {?=} projectableNodes
     * @return {?}
     */
    createComponent(componentFactory, index = -1, injector = null, projectableNodes = null) {
        var /** @type {?} */ s = this._createComponentInContainerScope();
        var /** @type {?} */ contextInjector = lang_1.isPresent(injector) ? injector : this._element.parentInjector;
        var /** @type {?} */ componentRef = componentFactory.create(contextInjector, projectableNodes);
        this.insert(componentRef.hostView, index);
        return profile_1.wtfLeave(s, componentRef);
    }
    /**
     * @param {?} viewRef
     * @param {?=} index
     * @return {?}
     */
    insert(viewRef, index = -1) {
        var /** @type {?} */ s = this._insertScope();
        if (index == -1)
            index = this.length;
        var /** @type {?} */ viewRef_ = (viewRef);
        this._element.attachView(viewRef_.internalView, index);
        return profile_1.wtfLeave(s, viewRef_);
    }
    /**
     * @param {?} viewRef
     * @return {?}
     */
    indexOf(viewRef) {
        return collection_1.ListWrapper.indexOf(this._element.nestedViews, ((viewRef)).internalView);
    }
    /**
     * @param {?=} index
     * @return {?}
     */
    remove(index = -1) {
        var /** @type {?} */ s = this._removeScope();
        if (index == -1)
            index = this.length - 1;
        var /** @type {?} */ view = this._element.detachView(index);
        view.destroy();
        // view is intentionally not returned to the client.
        profile_1.wtfLeave(s);
    }
    /**
     * @param {?=} index
     * @return {?}
     */
    detach(index = -1) {
        var /** @type {?} */ s = this._detachScope();
        if (index == -1)
            index = this.length - 1;
        var /** @type {?} */ view = this._element.detachView(index);
        return profile_1.wtfLeave(s, view.ref);
    }
    /**
     * @return {?}
     */
    clear() {
        for (var /** @type {?} */ i = this.length - 1; i >= 0; i--) {
            this.remove(i);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        ViewContainerRef_.prototype._createComponentInContainerScope;
        /** @internal
        @type {?} */
        ViewContainerRef_.prototype._insertScope;
        /** @internal
        @type {?} */
        ViewContainerRef_.prototype._removeScope;
        /** @internal
        @type {?} */
        ViewContainerRef_.prototype._detachScope;
        /** @type {?} */
        ViewContainerRef_.prototype._element;
    }
}
exports.ViewContainerRef_ = ViewContainerRef_;
//# sourceMappingURL=view_container_ref.js.map