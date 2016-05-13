goog.module('_angular$platform_server$src$parse5__adapter');
var parse5 = goog.require('parse5$index');
var collection_1 = goog.require('_angular$platform_server$src$facade$collection');
var platform_browser_private_1 = goog.require('_angular$platform_server$platform__browser__private');
var lang_1 = goog.require('_angular$platform_server$src$facade$lang');
var exceptions_1 = goog.require('_angular$platform_server$src$facade$exceptions');
var compiler_private_1 = goog.require('_angular$platform_server$compiler__private');
var compiler_1 = goog.require('_angular$compiler');
var /** @type {?} */ parser = null;
var /** @type {?} */ serializer = null;
var /** @type {?} */ treeAdapter = null;
var /** @type {?} */ _attrToPropMap = {
    'class': 'className',
    'innerHtml': 'innerHTML',
    'readonly': 'readOnly',
    'tabindex': 'tabIndex',
};
var /** @type {?} */ defDoc = null;
var /** @type {?} */ mapProps = ['attribs', 'x-attribsNamespace', 'x-attribsPrefix'];
/**
 * @param {?} methodName
 * @return {?}
 */
function _notImplemented(methodName) {
    return new exceptions_1.BaseException('This method is not implemented in Parse5DomAdapter: ' + methodName);
}
/* tslint:disable:requireParameterType */
class Parse5DomAdapter extends platform_browser_private_1.DomAdapter {
    /**
     * @return {?}
     */
    static makeCurrent() {
        parser = new parse5.Parser(parse5.TreeAdapters.htmlparser2);
        serializer = new parse5.Serializer(parse5.TreeAdapters.htmlparser2);
        treeAdapter = parser.treeAdapter;
        platform_browser_private_1.setRootDomAdapter(new Parse5DomAdapter());
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    hasProperty(element, name) {
        return _HTMLElementPropertyList.indexOf(name) > -1;
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) {
        if (name === 'innerHTML') {
            this.setInnerHTML(el, value);
        }
        else if (name === 'className') {
            el.attribs["class"] = el.className = value;
        }
        else {
            el[name] = value;
        }
    }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    getProperty(el, name) { return el[name]; }
    /**
     * @param {?} error
     * @return {?}
     */
    logError(error) { console.error(error); }
    /**
     * @param {?} error
     * @return {?}
     */
    log(error) { console.log(error); }
    /**
     * @param {?} error
     * @return {?}
     */
    logGroup(error) { console.error(error); }
    /**
     * @return {?}
     */
    logGroupEnd() { }
    /**
     * @return {?}
     */
    getXHR() { return compiler_1.XHR; }
    get attrToPropMap() { return _attrToPropMap; }
    /**
     * @param {?} selector
     * @return {?}
     */
    query(selector) { throw _notImplemented('query'); }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelector(el, selector) { return this.querySelectorAll(el, selector)[0]; }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelectorAll(el, selector) {
        var /** @type {?} */ res = [];
        var /** @type {?} */ _recursive = (result, node, selector, matcher) => {
            var /** @type {?} */ cNodes = node.childNodes;
            if (cNodes && cNodes.length > 0) {
                for (var /** @type {?} */ i = 0; i < cNodes.length; i++) {
                    var /** @type {?} */ childNode = cNodes[i];
                    if (this.elementMatches(childNode, selector, matcher)) {
                        result.push(childNode);
                    }
                    _recursive(result, childNode, selector, matcher);
                }
            }
        };
        var /** @type {?} */ matcher = new compiler_private_1.SelectorMatcher();
        matcher.addSelectables(compiler_private_1.CssSelector.parse(selector));
        _recursive(res, el, selector, matcher);
        return res;
    }
    /**
     * @param {?} node
     * @param {?} selector
     * @param {?=} matcher
     * @return {?}
     */
    elementMatches(node, selector, matcher = null) {
        if (this.isElementNode(node) && selector === '*') {
            return true;
        }
        var /** @type {?} */ result = false;
        if (selector && selector.charAt(0) == "#") {
            result = this.getAttribute(node, 'id') == selector.substring(1);
        }
        else if (selector) {
            var /** @type {?} */ result = false;
            if (matcher == null) {
                matcher = new compiler_private_1.SelectorMatcher();
                matcher.addSelectables(compiler_private_1.CssSelector.parse(selector));
            }
            var /** @type {?} */ cssSelector = new compiler_private_1.CssSelector();
            cssSelector.setElement(this.tagName(node));
            if (node.attribs) {
                for (var attrName in node.attribs) {
                    cssSelector.addAttribute(attrName, node.attribs[attrName]);
                }
            }
            var /** @type {?} */ classList = this.classList(node);
            for (var /** @type {?} */ i = 0; i < classList.length; i++) {
                cssSelector.addClassName(classList[i]);
            }
            matcher.match(cssSelector, function (selector, cb) { result = true; });
        }
        return result;
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    on(el, evt, listener) {
        var /** @type {?} */ listenersMap = el._eventListenersMap;
        if (lang_1.isBlank(listenersMap)) {
            var /** @type {?} */ listenersMap = collection_1.StringMapWrapper.create();
            el._eventListenersMap = listenersMap;
        }
        var /** @type {?} */ listeners = collection_1.StringMapWrapper.get(listenersMap, evt);
        if (lang_1.isBlank(listeners)) {
            listeners = [];
        }
        listeners.push(listener);
        collection_1.StringMapWrapper.set(listenersMap, evt, listeners);
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    onAndCancel(el, evt, listener) {
        this.on(el, evt, listener);
        return () => {
            collection_1.ListWrapper.remove(collection_1.StringMapWrapper.get(el._eventListenersMap, evt), listener);
        };
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    dispatchEvent(el, evt) {
        if (lang_1.isBlank(evt.target)) {
            evt.target = el;
        }
        if (lang_1.isPresent(el._eventListenersMap)) {
            var /** @type {?} */ listeners = collection_1.StringMapWrapper.get(el._eventListenersMap, evt.type);
            if (lang_1.isPresent(listeners)) {
                for (var /** @type {?} */ i = 0; i < listeners.length; i++) {
                    listeners[i](evt);
                }
            }
        }
        if (lang_1.isPresent(el.parent)) {
            this.dispatchEvent(el.parent, evt);
        }
        if (lang_1.isPresent(el._window)) {
            this.dispatchEvent(el._window, evt);
        }
    }
    /**
     * @param {?} eventType
     * @return {?}
     */
    createMouseEvent(eventType) { return this.createEvent(eventType); }
    /**
     * @param {?} eventType
     * @return {?}
     */
    createEvent(eventType) {
        var /** @type {?} */ evt = ({
            type: eventType,
            defaultPrevented: false,
            preventDefault: () => { ((evt)).defaultPrevented = true; }
        });
        return evt;
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    preventDefault(evt) { evt.returnValue = false; }
    /**
     * @param {?} evt
     * @return {?}
     */
    isPrevented(evt) { return lang_1.isPresent(evt.returnValue) && !evt.returnValue; }
    /**
     * @param {?} el
     * @return {?}
     */
    getInnerHTML(el) { return serializer.serialize(this.templateAwareRoot(el)); }
    /**
     * @param {?} el
     * @return {?}
     */
    getTemplateContent(el) {
        return null; // no <template> support in parse5.
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getOuterHTML(el) {
        serializer.html = '';
        serializer._serializeElement(el);
        return serializer.html;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeName(node) { return node.tagName; }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeValue(node) { return node.nodeValue; }
    /**
     * @param {?} node
     * @return {?}
     */
    type(node) { throw _notImplemented('type'); }
    /**
     * @param {?} node
     * @return {?}
     */
    content(node) { return node.childNodes[0]; }
    /**
     * @param {?} el
     * @return {?}
     */
    firstChild(el) { return el.firstChild; }
    /**
     * @param {?} el
     * @return {?}
     */
    nextSibling(el) { return el.nextSibling; }
    /**
     * @param {?} el
     * @return {?}
     */
    parentElement(el) { return el.parent; }
    /**
     * @param {?} el
     * @return {?}
     */
    childNodes(el) { return el.childNodes; }
    /**
     * @param {?} el
     * @return {?}
     */
    childNodesAsList(el) {
        var /** @type {?} */ childNodes = el.childNodes;
        var /** @type {?} */ res = collection_1.ListWrapper.createFixedSize(childNodes.length);
        for (var /** @type {?} */ i = 0; i < childNodes.length; i++) {
            res[i] = childNodes[i];
        }
        return res;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    clearNodes(el) {
        while (el.childNodes.length > 0) {
            this.remove(el.childNodes[0]);
        }
    }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    appendChild(el, node) {
        this.remove(node);
        treeAdapter.appendChild(this.templateAwareRoot(el), node);
    }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    removeChild(el, node) {
        if (collection_1.ListWrapper.contains(el.childNodes, node)) {
            this.remove(node);
        }
    }
    /**
     * @param {?} el
     * @return {?}
     */
    remove(el) {
        var /** @type {?} */ parent = el.parent;
        if (parent) {
            var /** @type {?} */ index = parent.childNodes.indexOf(el);
            parent.childNodes.splice(index, 1);
        }
        var /** @type {?} */ prev = el.previousSibling;
        var /** @type {?} */ next = el.nextSibling;
        if (prev) {
            prev.next = next;
        }
        if (next) {
            next.prev = prev;
        }
        el.prev = null;
        el.next = null;
        el.parent = null;
        return el;
    }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    insertBefore(el, node) {
        this.remove(node);
        treeAdapter.insertBefore(el.parent, node, el);
    }
    /**
     * @param {?} el
     * @param {?} nodes
     * @return {?}
     */
    insertAllBefore(el, nodes) { nodes.forEach(n => this.insertBefore(el, n)); }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    insertAfter(el, node) {
        if (el.nextSibling) {
            this.insertBefore(el.nextSibling, node);
        }
        else {
            this.appendChild(el.parent, node);
        }
    }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setInnerHTML(el, value) {
        this.clearNodes(el);
        var /** @type {?} */ content = parser.parseFragment(value);
        for (var /** @type {?} */ i = 0; i < content.childNodes.length; i++) {
            treeAdapter.appendChild(el, content.childNodes[i]);
        }
    }
    /**
     * @param {?} el
     * @param {?=} isRecursive
     * @return {?}
     */
    getText(el, isRecursive) {
        if (this.isTextNode(el)) {
            return el.data;
        }
        else if (this.isCommentNode(el)) {
            // In the DOM, comments within an element return an empty string for textContent
            // However, comment node instances return the comment content for textContent getter
            return isRecursive ? '' : el.data;
        }
        else if (lang_1.isBlank(el.childNodes) || el.childNodes.length == 0) {
            return "";
        }
        else {
            var /** @type {?} */ textContent = "";
            for (var /** @type {?} */ i = 0; i < el.childNodes.length; i++) {
                textContent += this.getText(el.childNodes[i], true);
            }
            return textContent;
        }
    }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setText(el, value) {
        if (this.isTextNode(el) || this.isCommentNode(el)) {
            el.data = value;
        }
        else {
            this.clearNodes(el);
            if (value !== '')
                treeAdapter.insertText(el, value);
        }
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getValue(el) { return el.value; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setValue(el, value) { el.value = value; }
    /**
     * @param {?} el
     * @return {?}
     */
    getChecked(el) { return el.checked; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setChecked(el, value) { el.checked = value; }
    /**
     * @param {?} text
     * @return {?}
     */
    createComment(text) { return treeAdapter.createCommentNode(text); }
    /**
     * @param {?} html
     * @return {?}
     */
    createTemplate(html) {
        var /** @type {?} */ template = treeAdapter.createElement("template", 'http://www.w3.org/1999/xhtml', []);
        var /** @type {?} */ content = parser.parseFragment(html);
        treeAdapter.appendChild(template, content);
        return template;
    }
    /**
     * @param {?} tagName
     * @return {?}
     */
    createElement(tagName) {
        return treeAdapter.createElement(tagName, 'http://www.w3.org/1999/xhtml', []);
    }
    /**
     * @param {?} ns
     * @param {?} tagName
     * @return {?}
     */
    createElementNS(ns, tagName) { return treeAdapter.createElement(tagName, ns, []); }
    /**
     * @param {?} text
     * @return {?}
     */
    createTextNode(text) {
        var /** @type {?} */ t = (this.createComment(text));
        t.type = 'text';
        return t;
    }
    /**
     * @param {?} attrName
     * @param {?} attrValue
     * @return {?}
     */
    createScriptTag(attrName, attrValue) {
        return treeAdapter.createElement("script", 'http://www.w3.org/1999/xhtml', [{ name: attrName, value: attrValue }]);
    }
    /**
     * @param {?} css
     * @return {?}
     */
    createStyleElement(css) {
        var /** @type {?} */ style = this.createElement('style');
        this.setText(style, css);
        return (style);
    }
    /**
     * @param {?} el
     * @return {?}
     */
    createShadowRoot(el) {
        el.shadowRoot = treeAdapter.createDocumentFragment();
        el.shadowRoot.parent = el;
        return el.shadowRoot;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getShadowRoot(el) { return el.shadowRoot; }
    /**
     * @param {?} el
     * @return {?}
     */
    getHost(el) { return el.host; }
    /**
     * @param {?} el
     * @return {?}
     */
    getDistributedNodes(el) { throw _notImplemented('getDistributedNodes'); }
    /**
     * @param {?} node
     * @return {?}
     */
    clone(node) {
        var /** @type {?} */ _recursive = (node) => {
            var /** @type {?} */ nodeClone = Object.create(Object.getPrototypeOf(node));
            for (var prop in node) {
                var /** @type {?} */ desc = Object.getOwnPropertyDescriptor(node, prop);
                if (desc && 'value' in desc && typeof desc.value !== 'object') {
                    nodeClone[prop] = node[prop];
                }
            }
            nodeClone.parent = null;
            nodeClone.prev = null;
            nodeClone.next = null;
            nodeClone.children = null;
            mapProps.forEach(mapName => {
                if (lang_1.isPresent(node[mapName])) {
                    nodeClone[mapName] = {};
                    for (var prop in node[mapName]) {
                        nodeClone[mapName][prop] = node[mapName][prop];
                    }
                }
            });
            var /** @type {?} */ cNodes = node.children;
            if (cNodes) {
                var /** @type {?} */ cNodesClone = new Array(cNodes.length);
                for (var /** @type {?} */ i = 0; i < cNodes.length; i++) {
                    var /** @type {?} */ childNode = cNodes[i];
                    var /** @type {?} */ childNodeClone = _recursive(childNode);
                    cNodesClone[i] = childNodeClone;
                    if (i > 0) {
                        childNodeClone.prev = cNodesClone[i - 1];
                        cNodesClone[i - 1].next = childNodeClone;
                    }
                    childNodeClone.parent = nodeClone;
                }
                nodeClone.children = cNodesClone;
            }
            return nodeClone;
        };
        return _recursive(node);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByClassName(element, name) {
        return this.querySelectorAll(element, "." + name);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByTagName(element, name) {
        throw _notImplemented('getElementsByTagName');
    }
    /**
     * @param {?} element
     * @return {?}
     */
    classList(element) {
        var /** @type {?} */ classAttrValue = null;
        var /** @type {?} */ attributes = element.attribs;
        if (attributes && attributes.hasOwnProperty("class")) {
            classAttrValue = attributes["class"];
        }
        return classAttrValue ? classAttrValue.trim().split(/\s+/g) : [];
    }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    addClass(element, className) {
        var /** @type {?} */ classList = this.classList(element);
        var /** @type {?} */ index = classList.indexOf(className);
        if (index == -1) {
            classList.push(className);
            element.attribs["class"] = element.className = classList.join(" ");
        }
    }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    removeClass(element, className) {
        var /** @type {?} */ classList = this.classList(element);
        var /** @type {?} */ index = classList.indexOf(className);
        if (index > -1) {
            classList.splice(index, 1);
            element.attribs["class"] = element.className = classList.join(" ");
        }
    }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    hasClass(element, className) {
        return collection_1.ListWrapper.contains(this.classList(element), className);
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    hasStyle(element, styleName, styleValue = null) {
        var /** @type {?} */ value = this.getStyle(element, styleName) || '';
        return styleValue ? value == styleValue : value.length > 0;
    }
    /**
     * @internal
     * @param {?} element
     * @return {?}
     */
    _readStyleAttribute(element) {
        var /** @type {?} */ styleMap = {};
        var /** @type {?} */ attributes = element.attribs;
        if (attributes && attributes.hasOwnProperty("style")) {
            var /** @type {?} */ styleAttrValue = attributes["style"];
            var /** @type {?} */ styleList = styleAttrValue.split(/;+/g);
            for (var /** @type {?} */ i = 0; i < styleList.length; i++) {
                if (styleList[i].length > 0) {
                    var /** @type {?} */ elems = styleList[i].split(/:+/g);
                    styleMap[elems[0].trim()] = elems[1].trim();
                }
            }
        }
        return styleMap;
    }
    /**
     * @internal
     * @param {?} element
     * @param {?} styleMap
     * @return {?}
     */
    _writeStyleAttribute(element, styleMap) {
        var /** @type {?} */ styleAttrValue = "";
        for (var key in styleMap) {
            var /** @type {?} */ newValue = styleMap[key];
            if (newValue && newValue.length > 0) {
                styleAttrValue += key + ":" + styleMap[key] + ";";
            }
        }
        element.attribs["style"] = styleAttrValue;
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setStyle(element, styleName, styleValue) {
        var /** @type {?} */ styleMap = this._readStyleAttribute(element);
        styleMap[styleName] = styleValue;
        this._writeStyleAttribute(element, styleMap);
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    removeStyle(element, styleName) { this.setStyle(element, styleName, null); }
    /**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    getStyle(element, styleName) {
        var /** @type {?} */ styleMap = this._readStyleAttribute(element);
        return styleMap.hasOwnProperty(styleName) ? styleMap[styleName] : "";
    }
    /**
     * @param {?} element
     * @return {?}
     */
    tagName(element) { return element.tagName == "style" ? "STYLE" : element.tagName; }
    /**
     * @param {?} element
     * @return {?}
     */
    attributeMap(element) {
        var /** @type {?} */ res = new Map();
        var /** @type {?} */ elAttrs = treeAdapter.getAttrList(element);
        for (var /** @type {?} */ i = 0; i < elAttrs.length; i++) {
            var /** @type {?} */ attrib = elAttrs[i];
            res.set(attrib.name, attrib.value);
        }
        return res;
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    hasAttribute(element, attribute) {
        return element.attribs && element.attribs.hasOwnProperty(attribute);
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    hasAttributeNS(element, ns, attribute) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    getAttribute(element, attribute) {
        return element.attribs && element.attribs.hasOwnProperty(attribute) ?
            element.attribs[attribute] :
            null;
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    getAttributeNS(element, ns, attribute) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    setAttribute(element, attribute, value) {
        if (attribute) {
            element.attribs[attribute] = value;
            if (attribute === 'class') {
                element.className = value;
            }
        }
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    setAttributeNS(element, ns, attribute, value) { throw 'not implemented'; }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    removeAttribute(element, attribute) {
        if (attribute) {
            collection_1.StringMapWrapper.delete(element.attribs, attribute);
        }
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @return {?}
     */
    removeAttributeNS(element, ns, name) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @return {?}
     */
    templateAwareRoot(el) { return this.isTemplateElement(el) ? this.content(el) : el; }
    /**
     * @return {?}
     */
    createHtmlDocument() {
        var /** @type {?} */ newDoc = treeAdapter.createDocument();
        newDoc.title = "fake title";
        var /** @type {?} */ head = treeAdapter.createElement("head", null, []);
        var /** @type {?} */ body = treeAdapter.createElement("body", 'http://www.w3.org/1999/xhtml', []);
        this.appendChild(newDoc, head);
        this.appendChild(newDoc, body);
        collection_1.StringMapWrapper.set(newDoc, "head", head);
        collection_1.StringMapWrapper.set(newDoc, "body", body);
        collection_1.StringMapWrapper.set(newDoc, "_window", collection_1.StringMapWrapper.create());
        return newDoc;
    }
    /**
     * @return {?}
     */
    defaultDoc() {
        if (defDoc === null) {
            defDoc = this.createHtmlDocument();
        }
        return defDoc;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getBoundingClientRect(el) { return { left: 0, top: 0, width: 0, height: 0 }; }
    /**
     * @return {?}
     */
    getTitle() { return this.defaultDoc().title || ""; }
    /**
     * @param {?} newTitle
     * @return {?}
     */
    setTitle(newTitle) { this.defaultDoc().title = newTitle; }
    /**
     * @param {?} el
     * @return {?}
     */
    isTemplateElement(el) {
        return this.isElementNode(el) && this.tagName(el) === "template";
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isTextNode(node) { return treeAdapter.isTextNode(node); }
    /**
     * @param {?} node
     * @return {?}
     */
    isCommentNode(node) { return treeAdapter.isCommentNode(node); }
    /**
     * @param {?} node
     * @return {?}
     */
    isElementNode(node) { return node ? treeAdapter.isElementNode(node) : false; }
    /**
     * @param {?} node
     * @return {?}
     */
    hasShadowRoot(node) { return lang_1.isPresent(node.shadowRoot); }
    /**
     * @param {?} node
     * @return {?}
     */
    isShadowRoot(node) { return this.getShadowRoot(node) == node; }
    /**
     * @param {?} node
     * @return {?}
     */
    importIntoDoc(node) { return this.clone(node); }
    /**
     * @param {?} node
     * @return {?}
     */
    adoptNode(node) { return node; }
    /**
     * @param {?} el
     * @return {?}
     */
    getHref(el) { return el.href; }
    /**
     * @param {?} el
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */
    resolveAndSetHref(el, baseUrl, href) {
        if (href == null) {
            el.href = baseUrl;
        }
        else {
            el.href = baseUrl + '/../' + href;
        }
    }
    /**
     * @internal
     * @param {?} parsedRules
     * @param {?=} css
     * @return {?}
     */
    _buildRules(parsedRules, css) {
        var /** @type {?} */ rules = [];
        for (var /** @type {?} */ i = 0; i < parsedRules.length; i++) {
            var /** @type {?} */ parsedRule = parsedRules[i];
            var /** @type {?} */ rule = collection_1.StringMapWrapper.create();
            collection_1.StringMapWrapper.set(rule, "cssText", css);
            collection_1.StringMapWrapper.set(rule, "style", { content: "", cssText: "" });
            if (parsedRule.type == "rule") {
                collection_1.StringMapWrapper.set(rule, "type", 1);
                collection_1.StringMapWrapper.set(rule, "selectorText", parsedRule.selectors.join(", ")
                    .replace(/\s{2,}/g, " ")
                    .replace(/\s*~\s*/g, " ~ ")
                    .replace(/\s*\+\s*/g, " + ")
                    .replace(/\s*>\s*/g, " > ")
                    .replace(/\[(\w+)=(\w+)\]/g, '[$1="$2"]'));
                if (lang_1.isBlank(parsedRule.declarations)) {
                    continue;
                }
                for (var /** @type {?} */ j = 0; j < parsedRule.declarations.length; j++) {
                    var /** @type {?} */ declaration = parsedRule.declarations[j];
                    collection_1.StringMapWrapper.set(collection_1.StringMapWrapper.get(rule, "style"), declaration.property, declaration.value);
                    collection_1.StringMapWrapper.get(rule, "style").cssText +=
                        declaration.property + ": " + declaration.value + ";";
                }
            }
            else if (parsedRule.type == "media") {
                collection_1.StringMapWrapper.set(rule, "type", 4);
                collection_1.StringMapWrapper.set(rule, "media", { mediaText: parsedRule.media });
                if (parsedRule.rules) {
                    collection_1.StringMapWrapper.set(rule, "cssRules", this._buildRules(parsedRule.rules));
                }
            }
            rules.push(rule);
        }
        return rules;
    }
    /**
     * @return {?}
     */
    supportsDOMEvents() { return false; }
    /**
     * @return {?}
     */
    supportsNativeShadowDOM() { return false; }
    /**
     * @param {?} target
     * @return {?}
     */
    getGlobalEventTarget(target) {
        if (target == "window") {
            return ((this.defaultDoc()))._window;
        }
        else if (target == "document") {
            return this.defaultDoc();
        }
        else if (target == "body") {
            return this.defaultDoc().body;
        }
    }
    /**
     * @return {?}
     */
    getBaseHref() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    resetBaseElement() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getHistory() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getLocation() { throw 'not implemented'; }
    /**
     * @return {?}
     */
    getUserAgent() { return "Fake user agent"; }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    getData(el, name) { return this.getAttribute(el, 'data-' + name); }
    /**
     * @param {?} el
     * @return {?}
     */
    getComputedStyle(el) { throw 'not implemented'; }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setData(el, name, value) { this.setAttribute(el, 'data-' + name, value); }
    /**
     * @param {?} path
     * @param {?} value
     * @return {?}
     */
    setGlobalVar(path, value) { lang_1.setValueOnPath(lang_1.global, path, value); }
    /**
     * @param {?} callback
     * @return {?}
     */
    requestAnimationFrame(callback) { return setTimeout(callback, 0); }
    /**
     * @param {?} id
     * @return {?}
     */
    cancelAnimationFrame(id) { clearTimeout(id); }
    /**
     * @return {?}
     */
    performanceNow() { return lang_1.DateWrapper.toMillis(lang_1.DateWrapper.now()); }
    /**
     * @return {?}
     */
    getAnimationPrefix() { return ''; }
    /**
     * @return {?}
     */
    getTransitionEnd() { return 'transitionend'; }
    /**
     * @return {?}
     */
    supportsAnimation() { return true; }
    /**
     * @param {?} el
     * @param {?} newNode
     * @param {?} oldNode
     * @return {?}
     */
    replaceChild(el, newNode, oldNode) { throw new Error('not implemented'); }
    /**
     * @param {?} templateHtml
     * @return {?}
     */
    parse(templateHtml) { throw new Error('not implemented'); }
    /**
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    invoke(el, methodName, args) { throw new Error('not implemented'); }
    /**
     * @param {?} event
     * @return {?}
     */
    getEventKey(event) { throw new Error('not implemented'); }
}
exports.Parse5DomAdapter = Parse5DomAdapter;
// TODO: build a proper list, this one is all the keys of a HTMLInputElement
var /** @type {?} */ _HTMLElementPropertyList = [
    "webkitEntries",
    "incremental",
    "webkitdirectory",
    "selectionDirection",
    "selectionEnd",
    "selectionStart",
    "labels",
    "validationMessage",
    "validity",
    "willValidate",
    "width",
    "valueAsNumber",
    "valueAsDate",
    "value",
    "useMap",
    "defaultValue",
    "type",
    "step",
    "src",
    "size",
    "required",
    "readOnly",
    "placeholder",
    "pattern",
    "name",
    "multiple",
    "min",
    "minLength",
    "maxLength",
    "max",
    "list",
    "indeterminate",
    "height",
    "formTarget",
    "formNoValidate",
    "formMethod",
    "formEnctype",
    "formAction",
    "files",
    "form",
    "disabled",
    "dirName",
    "checked",
    "defaultChecked",
    "autofocus",
    "autocomplete",
    "alt",
    "align",
    "accept",
    "onautocompleteerror",
    "onautocomplete",
    "onwaiting",
    "onvolumechange",
    "ontoggle",
    "ontimeupdate",
    "onsuspend",
    "onsubmit",
    "onstalled",
    "onshow",
    "onselect",
    "onseeking",
    "onseeked",
    "onscroll",
    "onresize",
    "onreset",
    "onratechange",
    "onprogress",
    "onplaying",
    "onplay",
    "onpause",
    "onmousewheel",
    "onmouseup",
    "onmouseover",
    "onmouseout",
    "onmousemove",
    "onmouseleave",
    "onmouseenter",
    "onmousedown",
    "onloadstart",
    "onloadedmetadata",
    "onloadeddata",
    "onload",
    "onkeyup",
    "onkeypress",
    "onkeydown",
    "oninvalid",
    "oninput",
    "onfocus",
    "onerror",
    "onended",
    "onemptied",
    "ondurationchange",
    "ondrop",
    "ondragstart",
    "ondragover",
    "ondragleave",
    "ondragenter",
    "ondragend",
    "ondrag",
    "ondblclick",
    "oncuechange",
    "oncontextmenu",
    "onclose",
    "onclick",
    "onchange",
    "oncanplaythrough",
    "oncanplay",
    "oncancel",
    "onblur",
    "onabort",
    "spellcheck",
    "isContentEditable",
    "contentEditable",
    "outerText",
    "innerText",
    "accessKey",
    "hidden",
    "webkitdropzone",
    "draggable",
    "tabIndex",
    "dir",
    "translate",
    "lang",
    "title",
    "childElementCount",
    "lastElementChild",
    "firstElementChild",
    "children",
    "onwebkitfullscreenerror",
    "onwebkitfullscreenchange",
    "nextElementSibling",
    "previousElementSibling",
    "onwheel",
    "onselectstart",
    "onsearch",
    "onpaste",
    "oncut",
    "oncopy",
    "onbeforepaste",
    "onbeforecut",
    "onbeforecopy",
    "shadowRoot",
    "dataset",
    "classList",
    "className",
    "outerHTML",
    "innerHTML",
    "scrollHeight",
    "scrollWidth",
    "scrollTop",
    "scrollLeft",
    "clientHeight",
    "clientWidth",
    "clientTop",
    "clientLeft",
    "offsetParent",
    "offsetHeight",
    "offsetWidth",
    "offsetTop",
    "offsetLeft",
    "localName",
    "prefix",
    "namespaceURI",
    "id",
    "style",
    "attributes",
    "tagName",
    "parentElement",
    "textContent",
    "baseURI",
    "ownerDocument",
    "nextSibling",
    "previousSibling",
    "lastChild",
    "firstChild",
    "childNodes",
    "parentNode",
    "nodeType",
    "nodeValue",
    "nodeName",
    "closure_lm_714617",
    "__jsaction"
];
//# sourceMappingURL=parse5_adapter.js.map