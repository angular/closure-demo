goog.module('_angular$platform_browser$testing$dom__test__component__renderer');
var core_1 = goog.require('_angular$core');
var dom_tokens_1 = goog.require('_angular$platform_browser$src$dom$dom__tokens');
var dom_adapter_1 = goog.require('_angular$platform_browser$src$dom$dom__adapter');
var testing_1 = goog.require('_angular$compiler$testing');
var browser_util_1 = goog.require('_angular$platform_browser$testing$browser__util');
class DOMTestComponentRenderer extends testing_1.TestComponentRenderer {
    /**
     * @param {?} _doc
     */
    constructor(_doc) {
        super();
        this._doc = _doc;
    }
    /**
     * @param {?} rootElId
     * @return {?}
     */
    insertRootElement(rootElId) {
        let /** @type {?} */ rootEl = browser_util_1.el(`<div id="${rootElId}"></div>`);
        // TODO(juliemr): can/should this be optional?
        let /** @type {?} */ oldRoots = dom_adapter_1.getDOM().querySelectorAll(this._doc, '[id^=root]');
        for (let /** @type {?} */ i = 0; i < oldRoots.length; i++) {
            dom_adapter_1.getDOM().remove(oldRoots[i]);
        }
        dom_adapter_1.getDOM().appendChild(this._doc.body, rootEl);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DOMTestComponentRenderer.prototype._doc;
    }
}
/** @nocollapse */ DOMTestComponentRenderer.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ DOMTestComponentRenderer.ctorParameters = [
    { type: undefined, decorators: [{ type: core_1.Inject, args: [dom_tokens_1.DOCUMENT,] },] },
];
exports.DOMTestComponentRenderer = DOMTestComponentRenderer;
//# sourceMappingURL=dom_test_component_renderer.js.map