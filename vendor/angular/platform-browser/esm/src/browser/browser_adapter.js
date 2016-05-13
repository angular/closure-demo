goog.module('_angular$platform_browser$src$browser$browser__adapter');
var collection_1 = goog.require('_angular$platform_browser$src$facade$collection');
var lang_1 = goog.require('_angular$platform_browser$src$facade$lang');
var generic_browser_adapter_1 = goog.require('_angular$platform_browser$src$browser$generic__browser__adapter');
var dom_adapter_1 = goog.require('_angular$platform_browser$src$dom$dom__adapter');
var /** @type {?} */ _attrToPropMap = {
    'class': 'className',
    'innerHtml': 'innerHTML',
    'readonly': 'readOnly',
    'tabindex': 'tabIndex'
};
const /** @type {?} */ DOM_KEY_LOCATION_NUMPAD = 3;
// Map to convert some key or keyIdentifier values to what will be returned by getEventKey
var /** @type {?} */ _keyMap = {
    // The following values are here for cross-browser compatibility and to match the W3C standard
    // cf http://www.w3.org/TR/DOM-Level-3-Events-key/
    '\b': 'Backspace',
    '\t': 'Tab',
    '\x7F': 'Delete',
    '\x1B': 'Escape',
    'Del': 'Delete',
    'Esc': 'Escape',
    'Left': 'ArrowLeft',
    'Right': 'ArrowRight',
    'Up': 'ArrowUp',
    'Down': 'ArrowDown',
    'Menu': 'ContextMenu',
    'Scroll': 'ScrollLock',
    'Win': 'OS'
};
// There is a bug in Chrome for numeric keypad keys:
// https://code.google.com/p/chromium/issues/detail?id=155654
// 1, 2, 3 ... are reported as A, B, C ...
var /** @type {?} */ _chromeNumKeyPadMap = {
    'A': '1',
    'B': '2',
    'C': '3',
    'D': '4',
    'E': '5',
    'F': '6',
    'G': '7',
    'H': '8',
    'I': '9',
    'J': '*',
    'K': '+',
    'M': '-',
    'N': '.',
    'O': '/',
    '\x60': '0',
    '\x90': 'NumLock'
};
/**
 * A `DomAdapter` powered by full browser DOM APIs.
 */
/* tslint:disable:requireParameterType */
class BrowserDomAdapter extends generic_browser_adapter_1.GenericBrowserDomAdapter {
    /**
     * @param {?} templateHtml
     * @return {?}
     */
    parse(templateHtml) { throw new Error("parse not implemented"); }
    /**
     * @return {?}
     */
    static makeCurrent() { dom_adapter_1.setRootDomAdapter(new BrowserDomAdapter()); }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    hasProperty(element, name) { return name in element; }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) { el[name] = value; }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    getProperty(el, name) { return el[name]; }
    /**
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    invoke(el, methodName, args) {
        el[methodName].apply(el, args);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    logError(error) {
        if (window.console.error) {
            window.console.error(error);
        }
        else {
            window.console.log(error);
        }
    }
    /**
     * @param {?} error
     * @return {?}
     */
    log(error) { window.console.log(error); }
    /**
     * @param {?} error
     * @return {?}
     */
    logGroup(error) {
        if (window.console.group) {
            window.console.group(error);
            this.logError(error);
        }
        else {
            window.console.log(error);
        }
    }
    /**
     * @return {?}
     */
    logGroupEnd() {
        if (window.console.groupEnd) {
            window.console.groupEnd();
        }
    }
    get attrToPropMap() { return _attrToPropMap; }
    /**
     * @param {?} selector
     * @return {?}
     */
    query(selector) { return document.querySelector(selector); }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelector(el, selector) { return el.querySelector(selector); }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelectorAll(el, selector) { return el.querySelectorAll(selector); }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    on(el, evt, listener) { el.addEventListener(evt, listener, false); }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    onAndCancel(el, evt, listener) {
        el.addEventListener(evt, listener, false);
        // Needed to follow Dart's subscription semantic, until fix of
        // https://code.google.com/p/dart/issues/detail?id=17406
        return () => { el.removeEventListener(evt, listener, false); };
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    dispatchEvent(el, evt) { el.dispatchEvent(evt); }
    /**
     * @param {?} eventType
     * @return {?}
     */
    createMouseEvent(eventType) {
        var /** @type {?} */ evt = document.createEvent('MouseEvent');
        evt.initEvent(eventType, true, true);
        return evt;
    }
    /**
     * @param {?} eventType
     * @return {?}
     */
    createEvent(eventType) {
        var /** @type {?} */ evt = document.createEvent('Event');
        evt.initEvent(eventType, true, true);
        return evt;
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    preventDefault(evt) {
        evt.preventDefault();
        evt.returnValue = false;
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    isPrevented(evt) {
        return evt.defaultPrevented || lang_1.isPresent(evt.returnValue) && !evt.returnValue;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getInnerHTML(el) { return el.innerHTML; }
    /**
     * @param {?} el
     * @return {?}
     */
    getTemplateContent(el) {
        return 'content' in el && el instanceof HTMLTemplateElement ? el.content : null;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getOuterHTML(el) { return el.outerHTML; }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeName(node) { return node.nodeName; }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeValue(node) { return node.nodeValue; }
    /**
     * @param {?} node
     * @return {?}
     */
    type(node) { return node.type; }
    /**
     * @param {?} node
     * @return {?}
     */
    content(node) {
        if (this.hasProperty(node, "content")) {
            return ((node)).content;
        }
        else {
            return node;
        }
    }
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
    parentElement(el) { return el.parentNode; }
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
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    appendChild(el, node) { el.appendChild(node); }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    removeChild(el, node) { el.removeChild(node); }
    /**
     * @param {?} el
     * @param {?} newChild
     * @param {?} oldChild
     * @return {?}
     */
    replaceChild(el, newChild, oldChild) { el.replaceChild(newChild, oldChild); }
    /**
     * @param {?} node
     * @return {?}
     */
    remove(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
        return node;
    }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    insertBefore(el, node) { el.parentNode.insertBefore(node, el); }
    /**
     * @param {?} el
     * @param {?} nodes
     * @return {?}
     */
    insertAllBefore(el, nodes) { nodes.forEach(n => el.parentNode.insertBefore(n, el)); }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    insertAfter(el, node) { el.parentNode.insertBefore(node, el.nextSibling); }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setInnerHTML(el, value) { el.innerHTML = value; }
    /**
     * @param {?} el
     * @return {?}
     */
    getText(el) { return el.textContent; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setText(el, value) { el.textContent = value; }
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
    createComment(text) { return document.createComment(text); }
    /**
     * @param {?} html
     * @return {?}
     */
    createTemplate(html) {
        var /** @type {?} */ t = document.createElement('template');
        t.innerHTML = html;
        return t;
    }
    /**
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElement(tagName, doc = document) { return doc.createElement(tagName); }
    /**
     * @param {?} ns
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElementNS(ns, tagName, doc = document) { return doc.createElementNS(ns, tagName); }
    /**
     * @param {?} text
     * @param {?=} doc
     * @return {?}
     */
    createTextNode(text, doc = document) { return doc.createTextNode(text); }
    /**
     * @param {?} attrName
     * @param {?} attrValue
     * @param {?=} doc
     * @return {?}
     */
    createScriptTag(attrName, attrValue, doc = document) {
        var /** @type {?} */ el = (doc.createElement('SCRIPT'));
        el.setAttribute(attrName, attrValue);
        return el;
    }
    /**
     * @param {?} css
     * @param {?=} doc
     * @return {?}
     */
    createStyleElement(css, doc = document) {
        var /** @type {?} */ style = (doc.createElement('style'));
        this.appendChild(style, this.createTextNode(css));
        return style;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    createShadowRoot(el) { return ((el)).createShadowRoot(); }
    /**
     * @param {?} el
     * @return {?}
     */
    getShadowRoot(el) { return ((el)).shadowRoot; }
    /**
     * @param {?} el
     * @return {?}
     */
    getHost(el) { return ((el)).host; }
    /**
     * @param {?} node
     * @return {?}
     */
    clone(node) { return node.cloneNode(true); }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByClassName(element, name) {
        return element.getElementsByClassName(name);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByTagName(element, name) {
        return element.getElementsByTagName(name);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    classList(element) { return (Array.prototype.slice.call(element.classList, 0)); }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    addClass(element, className) { element.classList.add(className); }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    removeClass(element, className) { element.classList.remove(className); }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    hasClass(element, className) { return element.classList.contains(className); }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setStyle(element, styleName, styleValue) {
        element.style[styleName] = styleValue;
    }
    /**
     * @param {?} element
     * @param {?} stylename
     * @return {?}
     */
    removeStyle(element, stylename) { element.style[stylename] = null; }
    /**
     * @param {?} element
     * @param {?} stylename
     * @return {?}
     */
    getStyle(element, stylename) { return element.style[stylename]; }
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
     * @param {?} element
     * @return {?}
     */
    tagName(element) { return element.tagName; }
    /**
     * @param {?} element
     * @return {?}
     */
    attributeMap(element) {
        var /** @type {?} */ res = new Map();
        var /** @type {?} */ elAttrs = element.attributes;
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
    hasAttribute(element, attribute) { return element.hasAttribute(attribute); }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    hasAttributeNS(element, ns, attribute) {
        return element.hasAttributeNS(ns, attribute);
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    getAttribute(element, attribute) { return element.getAttribute(attribute); }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @return {?}
     */
    getAttributeNS(element, ns, name) {
        return element.getAttributeNS(ns, name);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttribute(element, name, value) { element.setAttribute(name, value); }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttributeNS(element, ns, name, value) {
        element.setAttributeNS(ns, name, value);
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    removeAttribute(element, attribute) { element.removeAttribute(attribute); }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @return {?}
     */
    removeAttributeNS(element, ns, name) { element.removeAttributeNS(ns, name); }
    /**
     * @param {?} el
     * @return {?}
     */
    templateAwareRoot(el) { return this.isTemplateElement(el) ? this.content(el) : el; }
    /**
     * @return {?}
     */
    createHtmlDocument() {
        return document.implementation.createHTMLDocument('fakeTitle');
    }
    /**
     * @return {?}
     */
    defaultDoc() { return document; }
    /**
     * @param {?} el
     * @return {?}
     */
    getBoundingClientRect(el) {
        try {
            return el.getBoundingClientRect();
        }
        catch (e) {
            return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
        }
    }
    /**
     * @return {?}
     */
    getTitle() { return document.title; }
    /**
     * @param {?} newTitle
     * @return {?}
     */
    setTitle(newTitle) { document.title = newTitle || ''; }
    /**
     * @param {?} n
     * @param {?} selector
     * @return {?}
     */
    elementMatches(n, selector) {
        var /** @type {?} */ matches = false;
        if (n instanceof HTMLElement) {
            if (n.matches) {
                matches = n.matches(selector);
            }
            else if (n.msMatchesSelector) {
                matches = n.msMatchesSelector(selector);
            }
            else if (n.webkitMatchesSelector) {
                matches = n.webkitMatchesSelector(selector);
            }
        }
        return matches;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    isTemplateElement(el) {
        return el instanceof HTMLElement && el.nodeName == "TEMPLATE";
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isTextNode(node) { return node.nodeType === Node.TEXT_NODE; }
    /**
     * @param {?} node
     * @return {?}
     */
    isCommentNode(node) { return node.nodeType === Node.COMMENT_NODE; }
    /**
     * @param {?} node
     * @return {?}
     */
    isElementNode(node) { return node.nodeType === Node.ELEMENT_NODE; }
    /**
     * @param {?} node
     * @return {?}
     */
    hasShadowRoot(node) { return node instanceof HTMLElement && lang_1.isPresent(node.shadowRoot); }
    /**
     * @param {?} node
     * @return {?}
     */
    isShadowRoot(node) { return node instanceof DocumentFragment; }
    /**
     * @param {?} node
     * @return {?}
     */
    importIntoDoc(node) {
        var /** @type {?} */ toImport = node;
        if (this.isTemplateElement(node)) {
            toImport = this.content(node);
        }
        return document.importNode(toImport, true);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    adoptNode(node) { return document.adoptNode(node); }
    /**
     * @param {?} el
     * @return {?}
     */
    getHref(el) { return ((el)).href; }
    /**
     * @param {?} event
     * @return {?}
     */
    getEventKey(event) {
        var /** @type {?} */ key = event.key;
        if (lang_1.isBlank(key)) {
            key = event.keyIdentifier;
            // keyIdentifier is defined in the old draft of DOM Level 3 Events implemented by Chrome and
            // Safari
            // cf
            // http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html#Events-KeyboardEvents-Interfaces
            if (lang_1.isBlank(key)) {
                return 'Unidentified';
            }
            if (key.startsWith('U+')) {
                key = String.fromCharCode(parseInt(key.substring(2), 16));
                if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
                    // There is a bug in Chrome for numeric keypad keys:
                    // https://code.google.com/p/chromium/issues/detail?id=155654
                    // 1, 2, 3 ... are reported as A, B, C ...
                    key = _chromeNumKeyPadMap[key];
                }
            }
        }
        if (_keyMap.hasOwnProperty(key)) {
            key = _keyMap[key];
        }
        return key;
    }
    /**
     * @param {?} target
     * @return {?}
     */
    getGlobalEventTarget(target) {
        if (target == "window") {
            return window;
        }
        else if (target == "document") {
            return document;
        }
        else if (target == "body") {
            return document.body;
        }
    }
    /**
     * @return {?}
     */
    getHistory() { return window.history; }
    /**
     * @return {?}
     */
    getLocation() { return window.location; }
    /**
     * @return {?}
     */
    getBaseHref() {
        var /** @type {?} */ href = getBaseElementHref();
        if (lang_1.isBlank(href)) {
            return null;
        }
        return relativePath(href);
    }
    /**
     * @return {?}
     */
    resetBaseElement() { baseElement = null; }
    /**
     * @return {?}
     */
    getUserAgent() { return window.navigator.userAgent; }
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setData(element, name, value) {
        this.setAttribute(element, 'data-' + name, value);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getData(element, name) { return this.getAttribute(element, 'data-' + name); }
    /**
     * @param {?} element
     * @return {?}
     */
    getComputedStyle(element) { return getComputedStyle(element); }
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
    requestAnimationFrame(callback) { return window.requestAnimationFrame(callback); }
    /**
     * @param {?} id
     * @return {?}
     */
    cancelAnimationFrame(id) { window.cancelAnimationFrame(id); }
    /**
     * @return {?}
     */
    performanceNow() {
        // performance.now() is not available in all browsers, see
        // http://caniuse.com/#search=performance.now
        if (lang_1.isPresent(window.performance) && lang_1.isPresent(window.performance.now)) {
            return window.performance.now();
        }
        else {
            return lang_1.DateWrapper.toMillis(lang_1.DateWrapper.now());
        }
    }
}
exports.BrowserDomAdapter = BrowserDomAdapter;
var /** @type {?} */ baseElement = null;
/**
 * @return {?}
 */
function getBaseElementHref() {
    if (lang_1.isBlank(baseElement)) {
        baseElement = document.querySelector('base');
        if (lang_1.isBlank(baseElement)) {
            return null;
        }
    }
    return baseElement.getAttribute('href');
}
// based on urlUtils.js in AngularJS 1
var /** @type {?} */ urlParsingNode = null;
/**
 * @param {?} url
 * @return {?}
 */
function relativePath(url) {
    if (lang_1.isBlank(urlParsingNode)) {
        urlParsingNode = document.createElement("a");
    }
    urlParsingNode.setAttribute('href', url);
    return (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname :
        '/' + urlParsingNode.pathname;
}
//# sourceMappingURL=browser_adapter.js.map