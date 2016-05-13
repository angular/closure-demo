goog.module('_angular$core$src$linker$view__ref');
var exceptions_1 = goog.require('_angular$core$src$facade$exceptions');
var constants_1 = goog.require('_angular$core$src$change__detection$constants');
class ViewRef {
    get destroyed() { return (exceptions_1.unimplemented()); }
}
exports.ViewRef = ViewRef;
/**
 * Represents an Angular View.
 *
 * <!-- TODO: move the next two paragraphs to the dev guide -->
 * A View is a fundamental building block of the application UI. It is the smallest grouping of
 * Elements which are created and destroyed together.
 *
 * Properties of elements in a View can change, but the structure (number and order) of elements in
 * a View cannot. Changing the structure of Elements can only be done by inserting, moving or
 * removing nested Views via a {@link ViewContainerRef}. Each View can contain many View Containers.
 * <!-- /TODO -->
 *
 * ### Example
 *
 * Given this template...
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <li *ngFor="let  item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * ... we have two {@link TemplateRef}s:
 *
 * Outer {@link TemplateRef}:
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <template ngFor let-item [ngForOf]="items"></template>
 * </ul>
 * ```
 *
 * Inner {@link TemplateRef}:
 * ```
 *   <li>{{item}}</li>
 * ```
 *
 * Notice that the original template is broken down into two separate {@link TemplateRef}s.
 *
 * The outer/inner {@link TemplateRef}s are then assembled into views like so:
 *
 * ```
 * <!-- ViewRef: outer-0 -->
 * Count: 2
 * <ul>
 *   <template view-container-ref></template>
 *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
 *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
 * </ul>
 * <!-- /ViewRef: outer-0 -->
 * ```
 */
class EmbeddedViewRef extends ViewRef {
    get context() { return exceptions_1.unimplemented(); }
    get rootNodes() { return (exceptions_1.unimplemented()); }
    ;
}
exports.EmbeddedViewRef = EmbeddedViewRef;
class ViewRef_ {
    /**
     * @param {?} _view
     */
    constructor(_view) {
        this._view = _view;
        this._view = _view;
    }
    get internalView() { return this._view; }
    get rootNodes() { return this._view.flatRootNodes; }
    get context() { return this._view.context; }
    get destroyed() { return this._view.destroyed; }
    /**
     * @return {?}
     */
    markForCheck() { this._view.markPathToRootAsCheckOnce(); }
    /**
     * @return {?}
     */
    detach() { this._view.cdMode = constants_1.ChangeDetectionStrategy.Detached; }
    /**
     * @return {?}
     */
    detectChanges() { this._view.detectChanges(false); }
    /**
     * @return {?}
     */
    checkNoChanges() { this._view.detectChanges(true); }
    /**
     * @return {?}
     */
    reattach() {
        this._view.cdMode = constants_1.ChangeDetectionStrategy.CheckAlways;
        this.markForCheck();
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) { this._view.disposables.push(callback); }
    /**
     * @return {?}
     */
    destroy() { this._view.destroy(); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ViewRef_.prototype._view;
    }
}
exports.ViewRef_ = ViewRef_;
//# sourceMappingURL=view_ref.js.map