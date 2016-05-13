goog.module('_angular$core$src$debug$debug__renderer');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var debug_node_1 = goog.require('_angular$core$src$debug$debug__node');
class DebugDomRootRenderer {
    /**
     * @param {?} _delegate
     */
    constructor(_delegate) {
        this._delegate = _delegate;
    }
    /**
     * @param {?} componentProto
     * @return {?}
     */
    renderComponent(componentProto) {
        return new DebugDomRenderer(this._delegate.renderComponent(componentProto));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DebugDomRootRenderer.prototype._delegate;
    }
}
exports.DebugDomRootRenderer = DebugDomRootRenderer;
class DebugDomRenderer {
    /**
     * @param {?} _delegate
     */
    constructor(_delegate) {
        this._delegate = _delegate;
    }
    /**
     * @param {?} selectorOrNode
     * @param {?} debugInfo
     * @return {?}
     */
    selectRootElement(selectorOrNode, debugInfo) {
        var /** @type {?} */ nativeEl = this._delegate.selectRootElement(selectorOrNode, debugInfo);
        var /** @type {?} */ debugEl = new debug_node_1.DebugElement(nativeEl, null, debugInfo);
        debug_node_1.indexDebugNode(debugEl);
        return nativeEl;
    }
    /**
     * @param {?} parentElement
     * @param {?} name
     * @param {?} debugInfo
     * @return {?}
     */
    createElement(parentElement, name, debugInfo) {
        var /** @type {?} */ nativeEl = this._delegate.createElement(parentElement, name, debugInfo);
        var /** @type {?} */ debugEl = new debug_node_1.DebugElement(nativeEl, debug_node_1.getDebugNode(parentElement), debugInfo);
        debugEl.name = name;
        debug_node_1.indexDebugNode(debugEl);
        return nativeEl;
    }
    /**
     * @param {?} hostElement
     * @return {?}
     */
    createViewRoot(hostElement) { return this._delegate.createViewRoot(hostElement); }
    /**
     * @param {?} parentElement
     * @param {?} debugInfo
     * @return {?}
     */
    createTemplateAnchor(parentElement, debugInfo) {
        var /** @type {?} */ comment = this._delegate.createTemplateAnchor(parentElement, debugInfo);
        var /** @type {?} */ debugEl = new debug_node_1.DebugNode(comment, debug_node_1.getDebugNode(parentElement), debugInfo);
        debug_node_1.indexDebugNode(debugEl);
        return comment;
    }
    /**
     * @param {?} parentElement
     * @param {?} value
     * @param {?} debugInfo
     * @return {?}
     */
    createText(parentElement, value, debugInfo) {
        var /** @type {?} */ text = this._delegate.createText(parentElement, value, debugInfo);
        var /** @type {?} */ debugEl = new debug_node_1.DebugNode(text, debug_node_1.getDebugNode(parentElement), debugInfo);
        debug_node_1.indexDebugNode(debugEl);
        return text;
    }
    /**
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    projectNodes(parentElement, nodes) {
        var /** @type {?} */ debugParent = debug_node_1.getDebugNode(parentElement);
        if (lang_1.isPresent(debugParent) && debugParent instanceof debug_node_1.DebugElement) {
            let /** @type {?} */ debugElement = debugParent;
            nodes.forEach((node) => { debugElement.addChild(debug_node_1.getDebugNode(node)); });
        }
        this._delegate.projectNodes(parentElement, nodes);
    }
    /**
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    attachViewAfter(node, viewRootNodes) {
        var /** @type {?} */ debugNode = debug_node_1.getDebugNode(node);
        if (lang_1.isPresent(debugNode)) {
            var /** @type {?} */ debugParent = debugNode.parent;
            if (viewRootNodes.length > 0 && lang_1.isPresent(debugParent)) {
                var /** @type {?} */ debugViewRootNodes = [];
                viewRootNodes.forEach((rootNode) => debugViewRootNodes.push(debug_node_1.getDebugNode(rootNode)));
                debugParent.insertChildrenAfter(debugNode, debugViewRootNodes);
            }
        }
        this._delegate.attachViewAfter(node, viewRootNodes);
    }
    /**
     * @param {?} viewRootNodes
     * @return {?}
     */
    detachView(viewRootNodes) {
        viewRootNodes.forEach((node) => {
            var /** @type {?} */ debugNode = debug_node_1.getDebugNode(node);
            if (lang_1.isPresent(debugNode) && lang_1.isPresent(debugNode.parent)) {
                debugNode.parent.removeChild(debugNode);
            }
        });
        this._delegate.detachView(viewRootNodes);
    }
    /**
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    destroyView(hostElement, viewAllNodes) {
        viewAllNodes.forEach((node) => { debug_node_1.removeDebugNodeFromIndex(debug_node_1.getDebugNode(node)); });
        this._delegate.destroyView(hostElement, viewAllNodes);
    }
    /**
     * @param {?} renderElement
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listen(renderElement, name, callback) {
        var /** @type {?} */ debugEl = debug_node_1.getDebugNode(renderElement);
        if (lang_1.isPresent(debugEl)) {
            debugEl.listeners.push(new debug_node_1.EventListener(name, callback));
        }
        return this._delegate.listen(renderElement, name, callback);
    }
    /**
     * @param {?} target
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listenGlobal(target, name, callback) {
        return this._delegate.listenGlobal(target, name, callback);
    }
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setElementProperty(renderElement, propertyName, propertyValue) {
        var /** @type {?} */ debugEl = debug_node_1.getDebugNode(renderElement);
        if (lang_1.isPresent(debugEl) && debugEl instanceof debug_node_1.DebugElement) {
            debugEl.properties[propertyName] = propertyValue;
        }
        this._delegate.setElementProperty(renderElement, propertyName, propertyValue);
    }
    /**
     * @param {?} renderElement
     * @param {?} attributeName
     * @param {?} attributeValue
     * @return {?}
     */
    setElementAttribute(renderElement, attributeName, attributeValue) {
        var /** @type {?} */ debugEl = debug_node_1.getDebugNode(renderElement);
        if (lang_1.isPresent(debugEl) && debugEl instanceof debug_node_1.DebugElement) {
            debugEl.attributes[attributeName] = attributeValue;
        }
        this._delegate.setElementAttribute(renderElement, attributeName, attributeValue);
    }
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setBindingDebugInfo(renderElement, propertyName, propertyValue) {
        this._delegate.setBindingDebugInfo(renderElement, propertyName, propertyValue);
    }
    /**
     * @param {?} renderElement
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    setElementClass(renderElement, className, isAdd) {
        this._delegate.setElementClass(renderElement, className, isAdd);
    }
    /**
     * @param {?} renderElement
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setElementStyle(renderElement, styleName, styleValue) {
        this._delegate.setElementStyle(renderElement, styleName, styleValue);
    }
    /**
     * @param {?} renderElement
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    invokeElementMethod(renderElement, methodName, args) {
        this._delegate.invokeElementMethod(renderElement, methodName, args);
    }
    /**
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    setText(renderNode, text) { this._delegate.setText(renderNode, text); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DebugDomRenderer.prototype._delegate;
    }
}
exports.DebugDomRenderer = DebugDomRenderer;
//# sourceMappingURL=debug_renderer.js.map