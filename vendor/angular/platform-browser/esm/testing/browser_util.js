goog.module('_angular$platform_browser$testing$browser__util');
var collection_1 = goog.require('_angular$platform_browser$src$facade$collection');
var dom_adapter_1 = goog.require('_angular$platform_browser$src$dom$dom__adapter');
var lang_1 = goog.require('_angular$platform_browser$src$facade$lang');
class BrowserDetection {
    /**
     * @param {?} ua
     */
    constructor(ua) {
        this._overrideUa = ua;
    }
    get _ua() {
        if (lang_1.isPresent(this._overrideUa)) {
            return this._overrideUa;
        }
        else {
            return lang_1.isPresent(dom_adapter_1.getDOM()) ? dom_adapter_1.getDOM().getUserAgent() : '';
        }
    }
    /**
     * @return {?}
     */
    static setup() { exports.browserDetection = new BrowserDetection(null); }
    get isFirefox() { return this._ua.indexOf('Firefox') > -1; }
    get isAndroid() {
        return this._ua.indexOf('Mozilla/5.0') > -1 && this._ua.indexOf('Android') > -1 &&
            this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Chrome') == -1;
    }
    get isEdge() { return this._ua.indexOf('Edge') > -1; }
    get isIE() { return this._ua.indexOf('Trident') > -1; }
    get isWebkit() {
        return this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Edge') == -1;
    }
    get isIOS7() {
        return this._ua.indexOf('iPhone OS 7') > -1 || this._ua.indexOf('iPad OS 7') > -1;
    }
    get isSlow() { return this.isAndroid || this.isIE || this.isIOS7; }
    // The Intl API is only properly supported in recent Chrome and Opera.
    // Note: Edge is disguised as Chrome 42, so checking the "Edge" part is needed,
    // see https://msdn.microsoft.com/en-us/library/hh869301(v=vs.85).aspx
    get supportsIntlApi() {
        return this._ua.indexOf('Chrome/4') > -1 && this._ua.indexOf('Edge') == -1;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BrowserDetection.prototype._overrideUa;
    }
}
exports.BrowserDetection = BrowserDetection;
/**
 * @param {?} element
 * @param {?} eventType
 * @return {?}
 */
function dispatchEvent(element, eventType) {
    dom_adapter_1.getDOM().dispatchEvent(element, dom_adapter_1.getDOM().createEvent(eventType));
}
exports.dispatchEvent = dispatchEvent;
/**
 * @param {?} html
 * @return {?}
 */
function el(html) {
    return (dom_adapter_1.getDOM().firstChild(dom_adapter_1.getDOM().content(dom_adapter_1.getDOM().createTemplate(html))));
}
exports.el = el;
/**
 * @param {?} css
 * @return {?}
 */
function normalizeCSS(css) {
    css = lang_1.StringWrapper.replaceAll(css, /\s+/g, ' ');
    css = lang_1.StringWrapper.replaceAll(css, /:\s/g, ':');
    css = lang_1.StringWrapper.replaceAll(css, /'/g, '"');
    css = lang_1.StringWrapper.replaceAll(css, / }/g, '}');
    css = lang_1.StringWrapper.replaceAllMapped(css, /url\((\"|\s)(.+)(\"|\s)\)(\s*)/g, (match) => `url("${match[2]}")`);
    css = lang_1.StringWrapper.replaceAllMapped(css, /\[(.+)=([^"\]]+)\]/g, (match) => `[${match[1]}="${match[2]}"]`);
    return css;
}
exports.normalizeCSS = normalizeCSS;
var /** @type {?} */ _singleTagWhitelist = ['br', 'hr', 'input'];
/**
 * @param {?} el
 * @return {?}
 */
function stringifyElement(el) {
    var /** @type {?} */ result = '';
    if (dom_adapter_1.getDOM().isElementNode(el)) {
        var /** @type {?} */ tagName = dom_adapter_1.getDOM().tagName(el).toLowerCase();
        // Opening tag
        result += `<${tagName}`;
        // Attributes in an ordered way
        var /** @type {?} */ attributeMap = dom_adapter_1.getDOM().attributeMap(el);
        var /** @type {?} */ keys = [];
        attributeMap.forEach((v, k) => keys.push(k));
        collection_1.ListWrapper.sort(keys);
        for (let /** @type {?} */ i = 0; i < keys.length; i++) {
            var /** @type {?} */ key = keys[i];
            var /** @type {?} */ attValue = attributeMap.get(key);
            if (!lang_1.isString(attValue)) {
                result += ` ${key}`;
            }
            else {
                result += ` ${key}="${attValue}"`;
            }
        }
        result += '>';
        // Children
        var /** @type {?} */ childrenRoot = dom_adapter_1.getDOM().templateAwareRoot(el);
        var /** @type {?} */ children = lang_1.isPresent(childrenRoot) ? dom_adapter_1.getDOM().childNodes(childrenRoot) : [];
        for (let /** @type {?} */ j = 0; j < children.length; j++) {
            result += stringifyElement(children[j]);
        }
        // Closing tag
        if (!collection_1.ListWrapper.contains(_singleTagWhitelist, tagName)) {
            result += `</${tagName}>`;
        }
    }
    else if (dom_adapter_1.getDOM().isCommentNode(el)) {
        result += `<!--${dom_adapter_1.getDOM().nodeValue(el)}-->`;
    }
    else {
        result += dom_adapter_1.getDOM().getText(el);
    }
    return result;
}
exports.stringifyElement = stringifyElement;
exports.browserDetection = new BrowserDetection(null);
//# sourceMappingURL=browser_util.js.map