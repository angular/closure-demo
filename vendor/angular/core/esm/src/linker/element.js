goog.module('_angular$core$src$linker$element');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var collection_1 = goog.require('_angular$core$src$facade$collection');
var exceptions_1 = goog.require('_angular$core$src$facade$exceptions');
var view_type_1 = goog.require('_angular$core$src$linker$view__type');
var element_ref_1 = goog.require('_angular$core$src$linker$element__ref');
var view_container_ref_1 = goog.require('_angular$core$src$linker$view__container__ref');
/**
 * An AppElement is created for elements that have a ViewContainerRef,
 * a nested component or a <template> element to keep data around
 * that is needed for later instantiations.
 */
class AppElement {
    /**
     * @param {?} index
     * @param {?} parentIndex
     * @param {?} parentView
     * @param {?} nativeElement
     */
    constructor(index, parentIndex, parentView, nativeElement) {
        this.index = index;
        this.parentIndex = parentIndex;
        this.parentView = parentView;
        this.nativeElement = nativeElement;
        this.nestedViews = null;
        this.componentView = null;
    }
    get elementRef() { return new element_ref_1.ElementRef(this.nativeElement); }
    get vcRef() { return new view_container_ref_1.ViewContainerRef_(this); }
    /**
     * @param {?} component
     * @param {?} componentConstructorViewQueries
     * @param {?} view
     * @return {?}
     */
    initComponent(component, componentConstructorViewQueries, view) {
        this.component = component;
        this.componentConstructorViewQueries = componentConstructorViewQueries;
        this.componentView = view;
    }
    get parentInjector() { return this.parentView.injector(this.parentIndex); }
    get injector() { return this.parentView.injector(this.index); }
    /**
     * @param {?} nestedViewClass
     * @param {?} callback
     * @return {?}
     */
    mapNestedViews(nestedViewClass, callback) {
        var /** @type {?} */ result = [];
        if (lang_1.isPresent(this.nestedViews)) {
            this.nestedViews.forEach((nestedView) => {
                if (nestedView.clazz === nestedViewClass) {
                    result.push(callback(nestedView));
                }
            });
        }
        return result;
    }
    /**
     * @param {?} view
     * @param {?} viewIndex
     * @return {?}
     */
    attachView(view, viewIndex) {
        if (view.type === view_type_1.ViewType.COMPONENT) {
            throw new exceptions_1.BaseException(`Component views can't be moved!`);
        }
        var /** @type {?} */ nestedViews = this.nestedViews;
        if (nestedViews == null) {
            nestedViews = [];
            this.nestedViews = nestedViews;
        }
        collection_1.ListWrapper.insert(nestedViews, viewIndex, view);
        var /** @type {?} */ refRenderNode;
        if (viewIndex > 0) {
            var /** @type {?} */ prevView = nestedViews[viewIndex - 1];
            refRenderNode = prevView.lastRootNode;
        }
        else {
            refRenderNode = this.nativeElement;
        }
        if (lang_1.isPresent(refRenderNode)) {
            view.renderer.attachViewAfter(refRenderNode, view.flatRootNodes);
        }
        view.addToContentChildren(this);
    }
    /**
     * @param {?} viewIndex
     * @return {?}
     */
    detachView(viewIndex) {
        var /** @type {?} */ view = collection_1.ListWrapper.removeAt(this.nestedViews, viewIndex);
        if (view.type === view_type_1.ViewType.COMPONENT) {
            throw new exceptions_1.BaseException(`Component views can't be moved!`);
        }
        view.renderer.detachView(view.flatRootNodes);
        view.removeFromContentChildren(this);
        return view;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        AppElement.prototype.nestedViews;
        /** @type {?} */
        AppElement.prototype.componentView;
        /** @type {?} */
        AppElement.prototype.component;
        /** @type {?} */
        AppElement.prototype.componentConstructorViewQueries;
        /** @type {?} */
        AppElement.prototype.index;
        /** @type {?} */
        AppElement.prototype.parentIndex;
        /** @type {?} */
        AppElement.prototype.parentView;
        /** @type {?} */
        AppElement.prototype.nativeElement;
    }
}
exports.AppElement = AppElement;
//# sourceMappingURL=element.js.map