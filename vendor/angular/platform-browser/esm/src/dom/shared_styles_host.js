goog.module('_angular$platform_browser$src$dom$shared__styles__host');
var core_1 = goog.require('_angular$core');
var collection_1 = goog.require('_angular$platform_browser$src$facade$collection');
var dom_adapter_1 = goog.require('_angular$platform_browser$src$dom$dom__adapter');
var dom_tokens_1 = goog.require('_angular$platform_browser$src$dom$dom__tokens');
class SharedStylesHost {
    /**
     */
    constructor() {
        /** @internal */
        this._styles = [];
        /** @internal */
        this._stylesSet = new Set();
    }
    /**
     * @param {?} styles
     * @return {?}
     */
    addStyles(styles) {
        var /** @type {?} */ additions = [];
        styles.forEach(style => {
            if (!collection_1.SetWrapper.has(this._stylesSet, style)) {
                this._stylesSet.add(style);
                this._styles.push(style);
                additions.push(style);
            }
        });
        this.onStylesAdded(additions);
    }
    /**
     * @param {?} additions
     * @return {?}
     */
    onStylesAdded(additions) { }
    /**
     * @return {?}
     */
    getAllStyles() { return this._styles; }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        SharedStylesHost.prototype._styles;
        /** @internal
        @type {?} */
        SharedStylesHost.prototype._stylesSet;
    }
}
SharedStylesHost.decorators = [
    { type: core_1.Injectable },
];
SharedStylesHost.ctorParameters = [];
exports.SharedStylesHost = SharedStylesHost;
class DomSharedStylesHost extends SharedStylesHost {
    /**
     * @param {?} doc
     */
    constructor(doc) {
        super();
        this._hostNodes = new Set();
        this._hostNodes.add(doc.head);
    }
    /**
     * @internal
     * @param {?} styles
     * @param {?} host
     * @return {?}
     */
    _addStylesToHost(styles, host) {
        for (var /** @type {?} */ i = 0; i < styles.length; i++) {
            var /** @type {?} */ style = styles[i];
            dom_adapter_1.getDOM().appendChild(host, dom_adapter_1.getDOM().createStyleElement(style));
        }
    }
    /**
     * @param {?} hostNode
     * @return {?}
     */
    addHost(hostNode) {
        this._addStylesToHost(this._styles, hostNode);
        this._hostNodes.add(hostNode);
    }
    /**
     * @param {?} hostNode
     * @return {?}
     */
    removeHost(hostNode) { collection_1.SetWrapper.delete(this._hostNodes, hostNode); }
    /**
     * @param {?} additions
     * @return {?}
     */
    onStylesAdded(additions) {
        this._hostNodes.forEach((hostNode) => { this._addStylesToHost(additions, hostNode); });
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DomSharedStylesHost.prototype._hostNodes;
    }
}
DomSharedStylesHost.decorators = [
    { type: core_1.Injectable },
];
DomSharedStylesHost.ctorParameters = [
    { type: undefined, decorators: [{ type: core_1.Inject, args: [dom_tokens_1.DOCUMENT,] },] },
];
exports.DomSharedStylesHost = DomSharedStylesHost;
//# sourceMappingURL=shared_styles_host.js.map