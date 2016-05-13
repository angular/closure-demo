goog.module('_angular$compiler$src$config');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
var identifiers_1 = goog.require('_angular$compiler$src$identifiers');
class CompilerConfig {
    /**
     * @param {?} genDebugInfo
     * @param {?} logBindingUpdate
     * @param {?} useJit
     * @param {?=} renderTypes
     */
    constructor(genDebugInfo, logBindingUpdate, useJit, renderTypes = null) {
        this.genDebugInfo = genDebugInfo;
        this.logBindingUpdate = logBindingUpdate;
        this.useJit = useJit;
        if (lang_1.isBlank(renderTypes)) {
            renderTypes = new DefaultRenderTypes();
        }
        this.renderTypes = renderTypes;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompilerConfig.prototype.renderTypes;
        /** @type {?} */
        CompilerConfig.prototype.genDebugInfo;
        /** @type {?} */
        CompilerConfig.prototype.logBindingUpdate;
        /** @type {?} */
        CompilerConfig.prototype.useJit;
    }
}
exports.CompilerConfig = CompilerConfig;
/**
 * Types used for the renderer.
 * Can be replaced to specialize the generated output to a specific renderer
 * to help tree shaking.
 */
class RenderTypes {
    get renderer() { return exceptions_1.unimplemented(); }
    get renderText() { return exceptions_1.unimplemented(); }
    get renderElement() { return exceptions_1.unimplemented(); }
    get renderComment() { return exceptions_1.unimplemented(); }
    get renderNode() { return exceptions_1.unimplemented(); }
    get renderEvent() { return exceptions_1.unimplemented(); }
}
exports.RenderTypes = RenderTypes;
class DefaultRenderTypes {
    constructor() {
        this.renderer = identifiers_1.Identifiers.Renderer;
        this.renderText = null;
        this.renderElement = null;
        this.renderComment = null;
        this.renderNode = null;
        this.renderEvent = null;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DefaultRenderTypes.prototype.renderer;
        /** @type {?} */
        DefaultRenderTypes.prototype.renderText;
        /** @type {?} */
        DefaultRenderTypes.prototype.renderElement;
        /** @type {?} */
        DefaultRenderTypes.prototype.renderComment;
        /** @type {?} */
        DefaultRenderTypes.prototype.renderNode;
        /** @type {?} */
        DefaultRenderTypes.prototype.renderEvent;
    }
}
exports.DefaultRenderTypes = DefaultRenderTypes;
//# sourceMappingURL=config.js.map