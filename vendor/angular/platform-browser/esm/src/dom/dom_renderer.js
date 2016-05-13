goog.module('_angular$platform_browser$src$dom$dom__renderer');
var core_1 = goog.require('_angular$core');
var animation_builder_1 = goog.require('_angular$platform_browser$src$animate$animation__builder');
var lang_1 = goog.require('_angular$platform_browser$src$facade$lang');
var exceptions_1 = goog.require('_angular$platform_browser$src$facade$exceptions');
var shared_styles_host_1 = goog.require('_angular$platform_browser$src$dom$shared__styles__host');
var event_manager_1 = goog.require('_angular$platform_browser$src$dom$events$event__manager');
var dom_tokens_1 = goog.require('_angular$platform_browser$src$dom$dom__tokens');
var dom_adapter_1 = goog.require('_angular$platform_browser$src$dom$dom__adapter');
var util_1 = goog.require('_angular$platform_browser$src$dom$util');
const /** @type {?} */ NAMESPACE_URIS = 
/*@ts2dart_const*/
{ 'xlink': 'http://www.w3.org/1999/xlink', 'svg': 'http://www.w3.org/2000/svg' };
const /** @type {?} */ TEMPLATE_COMMENT_TEXT = 'template bindings={}';
var /** @type {?} */ TEMPLATE_BINDINGS_EXP = /^template bindings=(.*)$/g;
class DomRootRenderer {
    /**
     * @param {?} document
     * @param {?} eventManager
     * @param {?} sharedStylesHost
     * @param {?} animate
     */
    constructor(document, eventManager, sharedStylesHost, animate) {
        this.document = document;
        this.eventManager = eventManager;
        this.sharedStylesHost = sharedStylesHost;
        this.animate = animate;
        this._registeredComponents = new Map();
    }
    /**
     * @param {?} componentProto
     * @return {?}
     */
    renderComponent(componentProto) {
        var /** @type {?} */ renderer = this._registeredComponents.get(componentProto.id);
        if (lang_1.isBlank(renderer)) {
            renderer = new DomRenderer(this, componentProto);
            this._registeredComponents.set(componentProto.id, renderer);
        }
        return renderer;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DomRootRenderer.prototype._registeredComponents;
        /** @type {?} */
        DomRootRenderer.prototype.document;
        /** @type {?} */
        DomRootRenderer.prototype.eventManager;
        /** @type {?} */
        DomRootRenderer.prototype.sharedStylesHost;
        /** @type {?} */
        DomRootRenderer.prototype.animate;
    }
}
exports.DomRootRenderer = DomRootRenderer;
class DomRootRenderer_ extends DomRootRenderer {
    /**
     * @param {?} _document
     * @param {?} _eventManager
     * @param {?} sharedStylesHost
     * @param {?} animate
     */
    constructor(_document, _eventManager, sharedStylesHost, animate) {
        super(_document, _eventManager, sharedStylesHost, animate);
    }
}
/** @nocollapse */ DomRootRenderer_.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ DomRootRenderer_.ctorParameters = [
    { type: undefined, decorators: [{ type: core_1.Inject, args: [dom_tokens_1.DOCUMENT,] },] },
    { type: event_manager_1.EventManager, },
    { type: shared_styles_host_1.DomSharedStylesHost, },
    { type: animation_builder_1.AnimationBuilder, },
];
exports.DomRootRenderer_ = DomRootRenderer_;
class DomRenderer {
    /**
     * @param {?} _rootRenderer
     * @param {?} componentProto
     */
    constructor(_rootRenderer, componentProto) {
        this._rootRenderer = _rootRenderer;
        this.componentProto = componentProto;
        this._styles = _flattenStyles(componentProto.id, componentProto.styles, []);
        if (componentProto.encapsulation !== core_1.ViewEncapsulation.Native) {
            this._rootRenderer.sharedStylesHost.addStyles(this._styles);
        }
        if (this.componentProto.encapsulation === core_1.ViewEncapsulation.Emulated) {
            this._contentAttr = _shimContentAttribute(componentProto.id);
            this._hostAttr = _shimHostAttribute(componentProto.id);
        }
        else {
            this._contentAttr = null;
            this._hostAttr = null;
        }
    }
    /**
     * @param {?} selectorOrNode
     * @param {?} debugInfo
     * @return {?}
     */
    selectRootElement(selectorOrNode, debugInfo) {
        var /** @type {?} */ el;
        if (lang_1.isString(selectorOrNode)) {
            el = dom_adapter_1.getDOM().querySelector(this._rootRenderer.document, selectorOrNode);
            if (lang_1.isBlank(el)) {
                throw new exceptions_1.BaseException(`The selector "${selectorOrNode}" did not match any elements`);
            }
        }
        else {
            el = selectorOrNode;
        }
        dom_adapter_1.getDOM().clearNodes(el);
        return el;
    }
    /**
     * @param {?} parent
     * @param {?} name
     * @param {?} debugInfo
     * @return {?}
     */
    createElement(parent, name, debugInfo) {
        var /** @type {?} */ nsAndName = splitNamespace(name);
        var /** @type {?} */ el = lang_1.isPresent(nsAndName[0]) ?
            dom_adapter_1.getDOM().createElementNS(NAMESPACE_URIS[nsAndName[0]], nsAndName[1]) :
            dom_adapter_1.getDOM().createElement(nsAndName[1]);
        if (lang_1.isPresent(this._contentAttr)) {
            dom_adapter_1.getDOM().setAttribute(el, this._contentAttr, '');
        }
        if (lang_1.isPresent(parent)) {
            dom_adapter_1.getDOM().appendChild(parent, el);
        }
        return el;
    }
    /**
     * @param {?} hostElement
     * @return {?}
     */
    createViewRoot(hostElement) {
        var /** @type {?} */ nodesParent;
        if (this.componentProto.encapsulation === core_1.ViewEncapsulation.Native) {
            nodesParent = dom_adapter_1.getDOM().createShadowRoot(hostElement);
            this._rootRenderer.sharedStylesHost.addHost(nodesParent);
            for (var /** @type {?} */ i = 0; i < this._styles.length; i++) {
                dom_adapter_1.getDOM().appendChild(nodesParent, dom_adapter_1.getDOM().createStyleElement(this._styles[i]));
            }
        }
        else {
            if (lang_1.isPresent(this._hostAttr)) {
                dom_adapter_1.getDOM().setAttribute(hostElement, this._hostAttr, '');
            }
            nodesParent = hostElement;
        }
        return nodesParent;
    }
    /**
     * @param {?} parentElement
     * @param {?} debugInfo
     * @return {?}
     */
    createTemplateAnchor(parentElement, debugInfo) {
        var /** @type {?} */ comment = dom_adapter_1.getDOM().createComment(TEMPLATE_COMMENT_TEXT);
        if (lang_1.isPresent(parentElement)) {
            dom_adapter_1.getDOM().appendChild(parentElement, comment);
        }
        return comment;
    }
    /**
     * @param {?} parentElement
     * @param {?} value
     * @param {?} debugInfo
     * @return {?}
     */
    createText(parentElement, value, debugInfo) {
        var /** @type {?} */ node = dom_adapter_1.getDOM().createTextNode(value);
        if (lang_1.isPresent(parentElement)) {
            dom_adapter_1.getDOM().appendChild(parentElement, node);
        }
        return node;
    }
    /**
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    projectNodes(parentElement, nodes) {
        if (lang_1.isBlank(parentElement))
            return;
        appendNodes(parentElement, nodes);
    }
    /**
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    attachViewAfter(node, viewRootNodes) {
        moveNodesAfterSibling(node, viewRootNodes);
        for (let /** @type {?} */ i = 0; i < viewRootNodes.length; i++)
            this.animateNodeEnter(viewRootNodes[i]);
    }
    /**
     * @param {?} viewRootNodes
     * @return {?}
     */
    detachView(viewRootNodes) {
        for (var /** @type {?} */ i = 0; i < viewRootNodes.length; i++) {
            var /** @type {?} */ node = viewRootNodes[i];
            dom_adapter_1.getDOM().remove(node);
            this.animateNodeLeave(node);
        }
    }
    /**
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    destroyView(hostElement, viewAllNodes) {
        if (this.componentProto.encapsulation === core_1.ViewEncapsulation.Native && lang_1.isPresent(hostElement)) {
            this._rootRenderer.sharedStylesHost.removeHost(dom_adapter_1.getDOM().getShadowRoot(hostElement));
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listen(renderElement, name, callback) {
        return this._rootRenderer.eventManager.addEventListener(renderElement, name, decoratePreventDefault(callback));
    }
    /**
     * @param {?} target
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listenGlobal(target, name, callback) {
        return this._rootRenderer.eventManager.addGlobalEventListener(target, name, decoratePreventDefault(callback));
    }
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setElementProperty(renderElement, propertyName, propertyValue) {
        dom_adapter_1.getDOM().setProperty(renderElement, propertyName, propertyValue);
    }
    /**
     * @param {?} renderElement
     * @param {?} attributeName
     * @param {?} attributeValue
     * @return {?}
     */
    setElementAttribute(renderElement, attributeName, attributeValue) {
        var /** @type {?} */ attrNs;
        var /** @type {?} */ nsAndName = splitNamespace(attributeName);
        if (lang_1.isPresent(nsAndName[0])) {
            attributeName = nsAndName[0] + ':' + nsAndName[1];
            attrNs = NAMESPACE_URIS[nsAndName[0]];
        }
        if (lang_1.isPresent(attributeValue)) {
            if (lang_1.isPresent(attrNs)) {
                dom_adapter_1.getDOM().setAttributeNS(renderElement, attrNs, attributeName, attributeValue);
            }
            else {
                dom_adapter_1.getDOM().setAttribute(renderElement, attributeName, attributeValue);
            }
        }
        else {
            if (lang_1.isPresent(attrNs)) {
                dom_adapter_1.getDOM().removeAttributeNS(renderElement, attrNs, nsAndName[1]);
            }
            else {
                dom_adapter_1.getDOM().removeAttribute(renderElement, attributeName);
            }
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setBindingDebugInfo(renderElement, propertyName, propertyValue) {
        var /** @type {?} */ dashCasedPropertyName = util_1.camelCaseToDashCase(propertyName);
        if (dom_adapter_1.getDOM().isCommentNode(renderElement)) {
            var /** @type {?} */ existingBindings = lang_1.RegExpWrapper.firstMatch(TEMPLATE_BINDINGS_EXP, lang_1.StringWrapper.replaceAll(dom_adapter_1.getDOM().getText(renderElement), /\n/g, ''));
            var /** @type {?} */ parsedBindings = lang_1.Json.parse(existingBindings[1]);
            parsedBindings[dashCasedPropertyName] = propertyValue;
            dom_adapter_1.getDOM().setText(renderElement, lang_1.StringWrapper.replace(TEMPLATE_COMMENT_TEXT, '{}', lang_1.Json.stringify(parsedBindings)));
        }
        else {
            this.setElementAttribute(renderElement, propertyName, propertyValue);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    setElementClass(renderElement, className, isAdd) {
        if (isAdd) {
            dom_adapter_1.getDOM().addClass(renderElement, className);
        }
        else {
            dom_adapter_1.getDOM().removeClass(renderElement, className);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setElementStyle(renderElement, styleName, styleValue) {
        if (lang_1.isPresent(styleValue)) {
            dom_adapter_1.getDOM().setStyle(renderElement, styleName, lang_1.stringify(styleValue));
        }
        else {
            dom_adapter_1.getDOM().removeStyle(renderElement, styleName);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    invokeElementMethod(renderElement, methodName, args) {
        dom_adapter_1.getDOM().invoke(renderElement, methodName, args);
    }
    /**
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    setText(renderNode, text) { dom_adapter_1.getDOM().setText(renderNode, text); }
    /**
     *  Performs animations if necessary
     * @param {?} node
     * @return {?}
     */
    animateNodeEnter(node) {
        if (dom_adapter_1.getDOM().isElementNode(node) && dom_adapter_1.getDOM().hasClass(node, 'ng-animate')) {
            dom_adapter_1.getDOM().addClass(node, 'ng-enter');
            this._rootRenderer.animate.css()
                .addAnimationClass('ng-enter-active')
                .start(/** @type {?} */ (node))
                .onComplete(() => { dom_adapter_1.getDOM().removeClass(node, 'ng-enter'); });
        }
    }
    /**
     *  If animations are necessary, performs animations then removes the element; otherwise, it just removes the element.
     * @param {?} node
     * @return {?}
     */
    animateNodeLeave(node) {
        if (dom_adapter_1.getDOM().isElementNode(node) && dom_adapter_1.getDOM().hasClass(node, 'ng-animate')) {
            dom_adapter_1.getDOM().addClass(node, 'ng-leave');
            this._rootRenderer.animate.css()
                .addAnimationClass('ng-leave-active')
                .start(/** @type {?} */ (node))
                .onComplete(() => {
                dom_adapter_1.getDOM().removeClass(node, 'ng-leave');
                dom_adapter_1.getDOM().remove(node);
            });
        }
        else {
            dom_adapter_1.getDOM().remove(node);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DomRenderer.prototype._contentAttr;
        /** @type {?} */
        DomRenderer.prototype._hostAttr;
        /** @type {?} */
        DomRenderer.prototype._styles;
        /** @type {?} */
        DomRenderer.prototype._rootRenderer;
        /** @type {?} */
        DomRenderer.prototype.componentProto;
    }
}
exports.DomRenderer = DomRenderer;
/**
 * @param {?} sibling
 * @param {?} nodes
 * @return {?}
 */
function moveNodesAfterSibling(sibling, nodes) {
    var /** @type {?} */ parent = dom_adapter_1.getDOM().parentElement(sibling);
    if (nodes.length > 0 && lang_1.isPresent(parent)) {
        var /** @type {?} */ nextSibling = dom_adapter_1.getDOM().nextSibling(sibling);
        if (lang_1.isPresent(nextSibling)) {
            for (var /** @type {?} */ i = 0; i < nodes.length; i++) {
                dom_adapter_1.getDOM().insertBefore(nextSibling, nodes[i]);
            }
        }
        else {
            for (var /** @type {?} */ i = 0; i < nodes.length; i++) {
                dom_adapter_1.getDOM().appendChild(parent, nodes[i]);
            }
        }
    }
}
/**
 * @param {?} parent
 * @param {?} nodes
 * @return {?}
 */
function appendNodes(parent, nodes) {
    for (var /** @type {?} */ i = 0; i < nodes.length; i++) {
        dom_adapter_1.getDOM().appendChild(parent, nodes[i]);
    }
}
/**
 * @param {?} eventHandler
 * @return {?}
 */
function decoratePreventDefault(eventHandler) {
    return (event) => {
        var /** @type {?} */ allowDefaultBehavior = eventHandler(event);
        if (allowDefaultBehavior === false) {
            // TODO(tbosch): move preventDefault into event plugins...
            dom_adapter_1.getDOM().preventDefault(event);
        }
    };
}
var /** @type {?} */ COMPONENT_REGEX = /%COMP%/g;
exports.COMPONENT_VARIABLE = '%COMP%';
exports.HOST_ATTR = `_nghost-${exports.COMPONENT_VARIABLE}`;
exports.CONTENT_ATTR = `_ngcontent-${exports.COMPONENT_VARIABLE}`;
/**
 * @param {?} componentShortId
 * @return {?}
 */
function _shimContentAttribute(componentShortId) {
    return lang_1.StringWrapper.replaceAll(exports.CONTENT_ATTR, COMPONENT_REGEX, componentShortId);
}
/**
 * @param {?} componentShortId
 * @return {?}
 */
function _shimHostAttribute(componentShortId) {
    return lang_1.StringWrapper.replaceAll(exports.HOST_ATTR, COMPONENT_REGEX, componentShortId);
}
/**
 * @param {?} compId
 * @param {?} styles
 * @param {?} target
 * @return {?}
 */
function _flattenStyles(compId, styles, target) {
    for (var /** @type {?} */ i = 0; i < styles.length; i++) {
        var /** @type {?} */ style = styles[i];
        if (lang_1.isArray(style)) {
            _flattenStyles(compId, style, target);
        }
        else {
            style = lang_1.StringWrapper.replaceAll(style, COMPONENT_REGEX, compId);
            target.push(style);
        }
    }
    return target;
}
var /** @type {?} */ NS_PREFIX_RE = /^:([^:]+):(.+)/g;
/**
 * @param {?} name
 * @return {?}
 */
function splitNamespace(name) {
    if (name[0] != ':') {
        return [null, name];
    }
    let /** @type {?} */ match = lang_1.RegExpWrapper.firstMatch(NS_PREFIX_RE, name);
    return [match[1], match[2]];
}
//# sourceMappingURL=dom_renderer.js.map