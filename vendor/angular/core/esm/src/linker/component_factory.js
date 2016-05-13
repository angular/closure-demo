goog.module('_angular$core$src$linker$component__factory');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var exceptions_1 = goog.require('_angular$core$src$facade$exceptions');
var view_utils_1 = goog.require('_angular$core$src$linker$view__utils');
/**
 * Represents an instance of a Component created via a {@link ComponentFactory}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {@link #destroy}
 * method.
 */
class ComponentRef {
    /**
     * Location of the Host Element of this Component Instance.
     */
    get location() { return exceptions_1.unimplemented(); }
    /**
     * The injector on which the component instance exists.
     */
    get injector() { return exceptions_1.unimplemented(); }
    /**
     * The instance of the Component.
     */
    get instance() { return exceptions_1.unimplemented(); }
    ;
    /**
     * The {@link ViewRef} of the Host View of this Component instance.
     */
    get hostView() { return exceptions_1.unimplemented(); }
    ;
    /**
     * The {@link ChangeDetectorRef} of the Component instance.
     */
    get changeDetectorRef() { return exceptions_1.unimplemented(); }
    /**
     * The component type.
     */
    get componentType() { return exceptions_1.unimplemented(); }
}
exports.ComponentRef = ComponentRef;
class ComponentRef_ extends ComponentRef {
    /**
     * @param {?} _hostElement
     * @param {?} _componentType
     */
    constructor(_hostElement, _componentType) {
        super();
        this._hostElement = _hostElement;
        this._componentType = _componentType;
    }
    get location() { return this._hostElement.elementRef; }
    get injector() { return this._hostElement.injector; }
    get instance() { return this._hostElement.component; }
    ;
    get hostView() { return this._hostElement.parentView.ref; }
    ;
    get changeDetectorRef() { return this._hostElement.parentView.ref; }
    ;
    get componentType() { return this._componentType; }
    /**
     * @return {?}
     */
    destroy() { this._hostElement.parentView.destroy(); }
    /**
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) { this.hostView.onDestroy(callback); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ComponentRef_.prototype._hostElement;
        /** @type {?} */
        ComponentRef_.prototype._componentType;
    }
}
exports.ComponentRef_ = ComponentRef_;
const /** @type {?} */ EMPTY_CONTEXT = new Object();
/*@ts2dart_const*/
class ComponentFactory {
    /**
     * @param {?} selector
     * @param {?} _viewFactory
     * @param {?} _componentType
     */
    constructor(selector, _viewFactory, _componentType) {
        this.selector = selector;
        this._viewFactory = _viewFactory;
        this._componentType = _componentType;
    }
    get componentType() { return this._componentType; }
    /**
     *  Creates a new component.
     * @param {?} injector
     * @param {?=} projectableNodes
     * @param {?=} rootSelectorOrNode
     * @return {?}
     */
    create(injector, projectableNodes = null, rootSelectorOrNode = null) {
        var /** @type {?} */ vu = injector.get(view_utils_1.ViewUtils);
        if (lang_1.isBlank(projectableNodes)) {
            projectableNodes = [];
        }
        // Note: Host views don't need a declarationAppElement!
        var /** @type {?} */ hostView = this._viewFactory(vu, injector, null);
        var /** @type {?} */ hostElement = hostView.create(EMPTY_CONTEXT, projectableNodes, rootSelectorOrNode);
        return new ComponentRef_(hostElement, this._componentType);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ComponentFactory.prototype.selector;
        /** @type {?} */
        ComponentFactory.prototype._viewFactory;
        /** @type {?} */
        ComponentFactory.prototype._componentType;
    }
}
exports.ComponentFactory = ComponentFactory;
//# sourceMappingURL=component_factory.js.map