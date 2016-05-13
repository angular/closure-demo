goog.module('_angular$core$src$render$api');
var exceptions_1 = goog.require('_angular$core$src$facade$exceptions');
class RenderComponentType {
    /**
     * @param {?} id
     * @param {?} templateUrl
     * @param {?} slotCount
     * @param {?} encapsulation
     * @param {?} styles
     */
    constructor(id, templateUrl, slotCount, encapsulation, styles) {
        this.id = id;
        this.templateUrl = templateUrl;
        this.slotCount = slotCount;
        this.encapsulation = encapsulation;
        this.styles = styles;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        RenderComponentType.prototype.id;
        /** @type {?} */
        RenderComponentType.prototype.templateUrl;
        /** @type {?} */
        RenderComponentType.prototype.slotCount;
        /** @type {?} */
        RenderComponentType.prototype.encapsulation;
        /** @type {?} */
        RenderComponentType.prototype.styles;
    }
}
exports.RenderComponentType = RenderComponentType;
class RenderDebugInfo {
    get injector() { return exceptions_1.unimplemented(); }
    get component() { return exceptions_1.unimplemented(); }
    get providerTokens() { return exceptions_1.unimplemented(); }
    get references() { return exceptions_1.unimplemented(); }
    get context() { return exceptions_1.unimplemented(); }
    get source() { return exceptions_1.unimplemented(); }
}
exports.RenderDebugInfo = RenderDebugInfo;
class Renderer {
}
exports.Renderer = Renderer;
/**
 * Injectable service that provides a low-level interface for modifying the UI.
 *
 * Use this service to bypass Angular's templating and make custom UI changes that can't be
 * expressed declaratively. For example if you need to set a property or an attribute whose name is
 * not statically known, use {@link #setElementProperty} or {@link #setElementAttribute}
 * respectively.
 *
 * If you are implementing a custom renderer, you must implement this interface.
 *
 * The default Renderer implementation is `DomRenderer`. Also available is `WebWorkerRenderer`.
 */
class RootRenderer {
}
exports.RootRenderer = RootRenderer;
//# sourceMappingURL=api.js.map