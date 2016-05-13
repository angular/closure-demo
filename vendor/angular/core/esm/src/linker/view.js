goog.module('_angular$core$src$linker$view');
var collection_1 = goog.require('_angular$core$src$facade$collection');
var element_1 = goog.require('_angular$core$src$linker$element');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var async_1 = goog.require('_angular$core$src$facade$async');
var view_ref_1 = goog.require('_angular$core$src$linker$view__ref');
var view_type_1 = goog.require('_angular$core$src$linker$view__type');
var view_utils_1 = goog.require('_angular$core$src$linker$view__utils');
var change_detection_1 = goog.require('_angular$core$src$change__detection$change__detection');
var profile_1 = goog.require('_angular$core$src$profile$profile');
var exceptions_1 = goog.require('_angular$core$src$linker$exceptions');
var debug_context_1 = goog.require('_angular$core$src$linker$debug__context');
var element_injector_1 = goog.require('_angular$core$src$linker$element__injector');
var /** @type {?} */ _scope_check = profile_1.wtfCreateScope(`AppView#check(ascii id)`);
/**
 * Cost of making objects: http://jsperf.com/instantiate-size-of-object
 *
 */
class AppView {
    /**
     * @param {?} clazz
     * @param {?} componentType
     * @param {?} type
     * @param {?} viewUtils
     * @param {?} parentInjector
     * @param {?} declarationAppElement
     * @param {?} cdMode
     */
    constructor(clazz, componentType, type, viewUtils, parentInjector, declarationAppElement, cdMode) {
        this.clazz = clazz;
        this.componentType = componentType;
        this.type = type;
        this.viewUtils = viewUtils;
        this.parentInjector = parentInjector;
        this.declarationAppElement = declarationAppElement;
        this.cdMode = cdMode;
        this.contentChildren = [];
        this.viewChildren = [];
        this.viewContainerElement = null;
        // The names of the below fields must be kept in sync with codegen_name_util.ts or
        // change detection will fail.
        this.cdState = change_detection_1.ChangeDetectorState.NeverChecked;
        this.destroyed = false;
        this.ref = new view_ref_1.ViewRef_(this);
        if (type === view_type_1.ViewType.COMPONENT || type === view_type_1.ViewType.HOST) {
            this.renderer = viewUtils.renderComponent(componentType);
        }
        else {
            this.renderer = declarationAppElement.parentView.renderer;
        }
    }
    /**
     * @param {?} context
     * @param {?} givenProjectableNodes
     * @param {?} rootSelectorOrNode
     * @return {?}
     */
    create(context, givenProjectableNodes, rootSelectorOrNode) {
        this.context = context;
        var /** @type {?} */ projectableNodes;
        switch (this.type) {
            case view_type_1.ViewType.COMPONENT:
                projectableNodes = view_utils_1.ensureSlotCount(givenProjectableNodes, this.componentType.slotCount);
                break;
            case view_type_1.ViewType.EMBEDDED:
                projectableNodes = this.declarationAppElement.parentView.projectableNodes;
                break;
            case view_type_1.ViewType.HOST:
                // Note: Don't ensure the slot count for the projectableNodes as we store
                // them only for the contained component view (which will later check the slot count...)
                projectableNodes = givenProjectableNodes;
                break;
        }
        this._hasExternalHostElement = lang_1.isPresent(rootSelectorOrNode);
        this.projectableNodes = projectableNodes;
        return this.createInternal(rootSelectorOrNode);
    }
    /**
     *  Overwritten by implementations. Returns the AppElement for the host element for ViewType.HOST.
     * @param {?} rootSelectorOrNode
     * @return {?}
     */
    createInternal(rootSelectorOrNode) { return null; }
    /**
     * @param {?} rootNodesOrAppElements
     * @param {?} allNodes
     * @param {?} disposables
     * @param {?} subscriptions
     * @return {?}
     */
    init(rootNodesOrAppElements, allNodes, disposables, subscriptions) {
        this.rootNodesOrAppElements = rootNodesOrAppElements;
        this.allNodes = allNodes;
        this.disposables = disposables;
        this.subscriptions = subscriptions;
        if (this.type === view_type_1.ViewType.COMPONENT) {
            // Note: the render nodes have been attached to their host element
            // in the ViewFactory already.
            this.declarationAppElement.parentView.viewChildren.push(this);
            this.dirtyParentQueriesInternal();
        }
    }
    /**
     * @param {?} elementName
     * @param {?} rootSelectorOrNode
     * @param {?} debugInfo
     * @return {?}
     */
    selectOrCreateHostElement(elementName, rootSelectorOrNode, debugInfo) {
        var /** @type {?} */ hostElement;
        if (lang_1.isPresent(rootSelectorOrNode)) {
            hostElement = this.renderer.selectRootElement(rootSelectorOrNode, debugInfo);
        }
        else {
            hostElement = this.renderer.createElement(null, elementName, debugInfo);
        }
        return hostElement;
    }
    /**
     * @param {?} token
     * @param {?} nodeIndex
     * @param {?} notFoundResult
     * @return {?}
     */
    injectorGet(token, nodeIndex, notFoundResult) {
        return this.injectorGetInternal(token, nodeIndex, notFoundResult);
    }
    /**
     *  Overwritten by implementations
     * @param {?} token
     * @param {?} nodeIndex
     * @param {?} notFoundResult
     * @return {?}
     */
    injectorGetInternal(token, nodeIndex, notFoundResult) {
        return notFoundResult;
    }
    /**
     * @param {?} nodeIndex
     * @return {?}
     */
    injector(nodeIndex) {
        if (lang_1.isPresent(nodeIndex)) {
            return new element_injector_1.ElementInjector(this, nodeIndex);
        }
        else {
            return this.parentInjector;
        }
    }
    /**
     * @return {?}
     */
    destroy() {
        if (this._hasExternalHostElement) {
            this.renderer.detachView(this.flatRootNodes);
        }
        else if (lang_1.isPresent(this.viewContainerElement)) {
            this.viewContainerElement.detachView(this.viewContainerElement.nestedViews.indexOf(this));
        }
        this._destroyRecurse();
    }
    /**
     * @return {?}
     */
    _destroyRecurse() {
        if (this.destroyed) {
            return;
        }
        var /** @type {?} */ children = this.contentChildren;
        for (var /** @type {?} */ i = 0; i < children.length; i++) {
            children[i]._destroyRecurse();
        }
        children = this.viewChildren;
        for (var /** @type {?} */ i = 0; i < children.length; i++) {
            children[i]._destroyRecurse();
        }
        this.destroyLocal();
        this.destroyed = true;
    }
    /**
     * @return {?}
     */
    destroyLocal() {
        var /** @type {?} */ hostElement = this.type === view_type_1.ViewType.COMPONENT ? this.declarationAppElement.nativeElement : null;
        for (var /** @type {?} */ i = 0; i < this.disposables.length; i++) {
            this.disposables[i]();
        }
        for (var /** @type {?} */ i = 0; i < this.subscriptions.length; i++) {
            async_1.ObservableWrapper.dispose(this.subscriptions[i]);
        }
        this.destroyInternal();
        this.dirtyParentQueriesInternal();
        this.renderer.destroyView(hostElement, this.allNodes);
    }
    /**
     *  Overwritten by implementations
     * @return {?}
     */
    destroyInternal() { }
    get changeDetectorRef() { return this.ref; }
    get parent() {
        return lang_1.isPresent(this.declarationAppElement) ? this.declarationAppElement.parentView : null;
    }
    get flatRootNodes() { return view_utils_1.flattenNestedViewRenderNodes(this.rootNodesOrAppElements); }
    get lastRootNode() {
        var /** @type {?} */ lastNode = this.rootNodesOrAppElements.length > 0 ?
            this.rootNodesOrAppElements[this.rootNodesOrAppElements.length - 1] :
            null;
        return _findLastRenderNode(lastNode);
    }
    /**
     *  Overwritten by implementations
     * @return {?}
     */
    dirtyParentQueriesInternal() { }
    /**
     * @param {?} throwOnChange
     * @return {?}
     */
    detectChanges(throwOnChange) {
        var /** @type {?} */ s = _scope_check(this.clazz);
        if (this.cdMode === change_detection_1.ChangeDetectionStrategy.Detached ||
            this.cdMode === change_detection_1.ChangeDetectionStrategy.Checked ||
            this.cdState === change_detection_1.ChangeDetectorState.Errored)
            return;
        if (this.destroyed) {
            this.throwDestroyedError('detectChanges');
        }
        this.detectChangesInternal(throwOnChange);
        if (this.cdMode === change_detection_1.ChangeDetectionStrategy.CheckOnce)
            this.cdMode = change_detection_1.ChangeDetectionStrategy.Checked;
        this.cdState = change_detection_1.ChangeDetectorState.CheckedBefore;
        profile_1.wtfLeave(s);
    }
    /**
     *  Overwritten by implementations
     * @param {?} throwOnChange
     * @return {?}
     */
    detectChangesInternal(throwOnChange) {
        this.detectContentChildrenChanges(throwOnChange);
        this.detectViewChildrenChanges(throwOnChange);
    }
    /**
     * @param {?} throwOnChange
     * @return {?}
     */
    detectContentChildrenChanges(throwOnChange) {
        for (var /** @type {?} */ i = 0; i < this.contentChildren.length; ++i) {
            this.contentChildren[i].detectChanges(throwOnChange);
        }
    }
    /**
     * @param {?} throwOnChange
     * @return {?}
     */
    detectViewChildrenChanges(throwOnChange) {
        for (var /** @type {?} */ i = 0; i < this.viewChildren.length; ++i) {
            this.viewChildren[i].detectChanges(throwOnChange);
        }
    }
    /**
     * @param {?} renderAppElement
     * @return {?}
     */
    addToContentChildren(renderAppElement) {
        renderAppElement.parentView.contentChildren.push(this);
        this.viewContainerElement = renderAppElement;
        this.dirtyParentQueriesInternal();
    }
    /**
     * @param {?} renderAppElement
     * @return {?}
     */
    removeFromContentChildren(renderAppElement) {
        collection_1.ListWrapper.remove(renderAppElement.parentView.contentChildren, this);
        this.dirtyParentQueriesInternal();
        this.viewContainerElement = null;
    }
    /**
     * @return {?}
     */
    markAsCheckOnce() { this.cdMode = change_detection_1.ChangeDetectionStrategy.CheckOnce; }
    /**
     * @return {?}
     */
    markPathToRootAsCheckOnce() {
        let /** @type {?} */ c = this;
        while (lang_1.isPresent(c) && c.cdMode !== change_detection_1.ChangeDetectionStrategy.Detached) {
            if (c.cdMode === change_detection_1.ChangeDetectionStrategy.Checked) {
                c.cdMode = change_detection_1.ChangeDetectionStrategy.CheckOnce;
            }
            let /** @type {?} */ parentEl = c.type === view_type_1.ViewType.COMPONENT ? c.declarationAppElement : c.viewContainerElement;
            c = lang_1.isPresent(parentEl) ? parentEl.parentView : null;
        }
    }
    /**
     * @param {?} cb
     * @return {?}
     */
    eventHandler(cb) { return cb; }
    /**
     * @param {?} details
     * @return {?}
     */
    throwDestroyedError(details) { throw new exceptions_1.ViewDestroyedException(details); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        AppView.prototype.ref;
        /** @type {?} */
        AppView.prototype.rootNodesOrAppElements;
        /** @type {?} */
        AppView.prototype.allNodes;
        /** @type {?} */
        AppView.prototype.disposables;
        /** @type {?} */
        AppView.prototype.subscriptions;
        /** @type {?} */
        AppView.prototype.contentChildren;
        /** @type {?} */
        AppView.prototype.viewChildren;
        /** @type {?} */
        AppView.prototype.viewContainerElement;
        /** @type {?} */
        AppView.prototype.cdState;
        /** @type {?} */
        AppView.prototype.projectableNodes;
        /** @type {?} */
        AppView.prototype.destroyed;
        /** @type {?} */
        AppView.prototype.renderer;
        /** @type {?} */
        AppView.prototype._hasExternalHostElement;
        /** @type {?} */
        AppView.prototype.context;
        /** @type {?} */
        AppView.prototype.clazz;
        /** @type {?} */
        AppView.prototype.componentType;
        /** @type {?} */
        AppView.prototype.type;
        /** @type {?} */
        AppView.prototype.viewUtils;
        /** @type {?} */
        AppView.prototype.parentInjector;
        /** @type {?} */
        AppView.prototype.declarationAppElement;
        /** @type {?} */
        AppView.prototype.cdMode;
    }
}
exports.AppView = AppView;
class DebugAppView extends AppView {
    /**
     * @param {?} clazz
     * @param {?} componentType
     * @param {?} type
     * @param {?} viewUtils
     * @param {?} parentInjector
     * @param {?} declarationAppElement
     * @param {?} cdMode
     * @param {?} staticNodeDebugInfos
     */
    constructor(clazz, componentType, type, viewUtils, parentInjector, declarationAppElement, cdMode, staticNodeDebugInfos) {
        super(clazz, componentType, type, viewUtils, parentInjector, declarationAppElement, cdMode);
        this.staticNodeDebugInfos = staticNodeDebugInfos;
        this._currentDebugContext = null;
    }
    /**
     * @param {?} context
     * @param {?} givenProjectableNodes
     * @param {?} rootSelectorOrNode
     * @return {?}
     */
    create(context, givenProjectableNodes, rootSelectorOrNode) {
        this._resetDebug();
        try {
            return super.create(context, givenProjectableNodes, rootSelectorOrNode);
        }
        catch (e) {
            this._rethrowWithContext(e, e.stack);
            throw e;
        }
    }
    /**
     * @param {?} token
     * @param {?} nodeIndex
     * @param {?} notFoundResult
     * @return {?}
     */
    injectorGet(token, nodeIndex, notFoundResult) {
        this._resetDebug();
        try {
            return super.injectorGet(token, nodeIndex, notFoundResult);
        }
        catch (e) {
            this._rethrowWithContext(e, e.stack);
            throw e;
        }
    }
    /**
     * @return {?}
     */
    destroyLocal() {
        this._resetDebug();
        try {
            super.destroyLocal();
        }
        catch (e) {
            this._rethrowWithContext(e, e.stack);
            throw e;
        }
    }
    /**
     * @param {?} throwOnChange
     * @return {?}
     */
    detectChanges(throwOnChange) {
        this._resetDebug();
        try {
            super.detectChanges(throwOnChange);
        }
        catch (e) {
            this._rethrowWithContext(e, e.stack);
            throw e;
        }
    }
    /**
     * @return {?}
     */
    _resetDebug() { this._currentDebugContext = null; }
    /**
     * @param {?} nodeIndex
     * @param {?} rowNum
     * @param {?} colNum
     * @return {?}
     */
    debug(nodeIndex, rowNum, colNum) {
        return this._currentDebugContext = new debug_context_1.DebugContext(this, nodeIndex, rowNum, colNum);
    }
    /**
     * @param {?} e
     * @param {?} stack
     * @return {?}
     */
    _rethrowWithContext(e, stack) {
        if (!(e instanceof exceptions_1.ViewWrappedException)) {
            if (!(e instanceof exceptions_1.ExpressionChangedAfterItHasBeenCheckedException)) {
                this.cdState = change_detection_1.ChangeDetectorState.Errored;
            }
            if (lang_1.isPresent(this._currentDebugContext)) {
                throw new exceptions_1.ViewWrappedException(e, stack, this._currentDebugContext);
            }
        }
    }
    /**
     * @param {?} cb
     * @return {?}
     */
    eventHandler(cb) {
        var /** @type {?} */ superHandler = super.eventHandler(cb);
        return (event) => {
            this._resetDebug();
            try {
                return superHandler(event);
            }
            catch (e) {
                this._rethrowWithContext(e, e.stack);
                throw e;
            }
        };
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DebugAppView.prototype._currentDebugContext;
        /** @type {?} */
        DebugAppView.prototype.staticNodeDebugInfos;
    }
}
exports.DebugAppView = DebugAppView;
/**
 * @param {?} node
 * @return {?}
 */
function _findLastRenderNode(node) {
    var /** @type {?} */ lastNode;
    if (node instanceof element_1.AppElement) {
        var /** @type {?} */ appEl = (node);
        lastNode = appEl.nativeElement;
        if (lang_1.isPresent(appEl.nestedViews)) {
            // Note: Views might have no root nodes at all!
            for (var /** @type {?} */ i = appEl.nestedViews.length - 1; i >= 0; i--) {
                var /** @type {?} */ nestedView = appEl.nestedViews[i];
                if (nestedView.rootNodesOrAppElements.length > 0) {
                    lastNode = _findLastRenderNode(nestedView.rootNodesOrAppElements[nestedView.rootNodesOrAppElements.length - 1]);
                }
            }
        }
    }
    else {
        lastNode = node;
    }
    return lastNode;
}
//# sourceMappingURL=view.js.map