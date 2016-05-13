goog.module('_angular$compiler$src$selector');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
const /** @type {?} */ _EMPTY_ATTR_VALUE = '';
// TODO: Can't use `const` here as
// in Dart this is not transpiled into `final` yet...
var /** @type {?} */ _SELECTOR_REGEXP = lang_1.RegExpWrapper.create('(\\:not\\()|' +
    '([-\\w]+)|' +
    '(?:\\.([-\\w]+))|' +
    '(?:\\[([-\\w*]+)(?:=([^\\]]*))?\\])|' +
    '(\\))|' +
    '(\\s*,\\s*)'); // ","
/**
 * A css selector contains an element name,
 * css classes and attribute/value pairs with the purpose
 * of selecting subsets out of them.
 */
class CssSelector {
    constructor() {
        this.element = null;
        this.classNames = [];
        this.attrs = [];
        this.notSelectors = [];
    }
    /**
     * @param {?} selector
     * @return {?}
     */
    static parse(selector) {
        var /** @type {?} */ results = [];
        var /** @type {?} */ _addResult = (res, cssSel) => {
            if (cssSel.notSelectors.length > 0 && lang_1.isBlank(cssSel.element) &&
                collection_1.ListWrapper.isEmpty(cssSel.classNames) && collection_1.ListWrapper.isEmpty(cssSel.attrs)) {
                cssSel.element = "*";
            }
            res.push(cssSel);
        };
        var /** @type {?} */ cssSelector = new CssSelector();
        var /** @type {?} */ matcher = lang_1.RegExpWrapper.matcher(_SELECTOR_REGEXP, selector);
        var /** @type {?} */ match;
        var /** @type {?} */ current = cssSelector;
        var /** @type {?} */ inNot = false;
        while (lang_1.isPresent(match = lang_1.RegExpMatcherWrapper.next(matcher))) {
            if (lang_1.isPresent(match[1])) {
                if (inNot) {
                    throw new exceptions_1.BaseException('Nesting :not is not allowed in a selector');
                }
                inNot = true;
                current = new CssSelector();
                cssSelector.notSelectors.push(current);
            }
            if (lang_1.isPresent(match[2])) {
                current.setElement(match[2]);
            }
            if (lang_1.isPresent(match[3])) {
                current.addClassName(match[3]);
            }
            if (lang_1.isPresent(match[4])) {
                current.addAttribute(match[4], match[5]);
            }
            if (lang_1.isPresent(match[6])) {
                inNot = false;
                current = cssSelector;
            }
            if (lang_1.isPresent(match[7])) {
                if (inNot) {
                    throw new exceptions_1.BaseException('Multiple selectors in :not are not supported');
                }
                _addResult(results, cssSelector);
                cssSelector = current = new CssSelector();
            }
        }
        _addResult(results, cssSelector);
        return results;
    }
    /**
     * @return {?}
     */
    isElementSelector() {
        return lang_1.isPresent(this.element) && collection_1.ListWrapper.isEmpty(this.classNames) &&
            collection_1.ListWrapper.isEmpty(this.attrs) && this.notSelectors.length === 0;
    }
    /**
     * @param {?=} element
     * @return {?}
     */
    setElement(element = null) { this.element = element; }
    /**
     *  Gets a template string for an element that matches the selector.
     * @return {?}
     */
    getMatchingElementTemplate() {
        let /** @type {?} */ tagName = lang_1.isPresent(this.element) ? this.element : 'div';
        let /** @type {?} */ classAttr = this.classNames.length > 0 ? ` class="${this.classNames.join(' ')}"` : '';
        let /** @type {?} */ attrs = '';
        for (let /** @type {?} */ i = 0; i < this.attrs.length; i += 2) {
            let /** @type {?} */ attrName = this.attrs[i];
            let /** @type {?} */ attrValue = this.attrs[i + 1] !== '' ? `="${this.attrs[i + 1]}"` : '';
            attrs += ` ${attrName}${attrValue}`;
        }
        return `<${tagName}${classAttr}${attrs}></${tagName}>`;
    }
    /**
     * @param {?} name
     * @param {?=} value
     * @return {?}
     */
    addAttribute(name, value = _EMPTY_ATTR_VALUE) {
        this.attrs.push(name);
        if (lang_1.isPresent(value)) {
            value = value.toLowerCase();
        }
        else {
            value = _EMPTY_ATTR_VALUE;
        }
        this.attrs.push(value);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    addClassName(name) { this.classNames.push(name.toLowerCase()); }
    /**
     * @return {?}
     */
    toString() {
        var /** @type {?} */ res = '';
        if (lang_1.isPresent(this.element)) {
            res += this.element;
        }
        if (lang_1.isPresent(this.classNames)) {
            for (var /** @type {?} */ i = 0; i < this.classNames.length; i++) {
                res += '.' + this.classNames[i];
            }
        }
        if (lang_1.isPresent(this.attrs)) {
            for (var /** @type {?} */ i = 0; i < this.attrs.length;) {
                var /** @type {?} */ attrName = this.attrs[i++];
                var /** @type {?} */ attrValue = this.attrs[i++];
                res += '[' + attrName;
                if (attrValue.length > 0) {
                    res += '=' + attrValue;
                }
                res += ']';
            }
        }
        this.notSelectors.forEach(notSelector => res += `:not(${notSelector})`);
        return res;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CssSelector.prototype.element;
        /** @type {?} */
        CssSelector.prototype.classNames;
        /** @type {?} */
        CssSelector.prototype.attrs;
        /** @type {?} */
        CssSelector.prototype.notSelectors;
    }
}
exports.CssSelector = CssSelector;
/**
 * Reads a list of CssSelectors and allows to calculate which ones
 * are contained in a given CssSelector.
 */
class SelectorMatcher {
    constructor() {
        this._elementMap = new collection_1.Map();
        this._elementPartialMap = new collection_1.Map();
        this._classMap = new collection_1.Map();
        this._classPartialMap = new collection_1.Map();
        this._attrValueMap = new collection_1.Map();
        this._attrValuePartialMap = new collection_1.Map();
        this._listContexts = [];
    }
    /**
     * @param {?} notSelectors
     * @return {?}
     */
    static createNotMatcher(notSelectors) {
        var /** @type {?} */ notMatcher = new SelectorMatcher();
        notMatcher.addSelectables(notSelectors, null);
        return notMatcher;
    }
    /**
     * @param {?} cssSelectors
     * @param {?=} callbackCtxt
     * @return {?}
     */
    addSelectables(cssSelectors, callbackCtxt) {
        var /** @type {?} */ listContext = null;
        if (cssSelectors.length > 1) {
            listContext = new SelectorListContext(cssSelectors);
            this._listContexts.push(listContext);
        }
        for (var /** @type {?} */ i = 0; i < cssSelectors.length; i++) {
            this._addSelectable(cssSelectors[i], callbackCtxt, listContext);
        }
    }
    /**
     *  Add an object that can be found later on by calling `match`.
     * @param {?} cssSelector A css selector
     * @param {?} callbackCtxt An opaque object that will be given to the callback of the `match` function
     * @param {?} listContext
     * @return {?}
     */
    _addSelectable(cssSelector, callbackCtxt, listContext) {
        var /** @type {?} */ matcher = this;
        var /** @type {?} */ element = cssSelector.element;
        var /** @type {?} */ classNames = cssSelector.classNames;
        var /** @type {?} */ attrs = cssSelector.attrs;
        var /** @type {?} */ selectable = new SelectorContext(cssSelector, callbackCtxt, listContext);
        if (lang_1.isPresent(element)) {
            var /** @type {?} */ isTerminal = attrs.length === 0 && classNames.length === 0;
            if (isTerminal) {
                this._addTerminal(matcher._elementMap, element, selectable);
            }
            else {
                matcher = this._addPartial(matcher._elementPartialMap, element);
            }
        }
        if (lang_1.isPresent(classNames)) {
            for (var /** @type {?} */ index = 0; index < classNames.length; index++) {
                var /** @type {?} */ isTerminal = attrs.length === 0 && index === classNames.length - 1;
                var /** @type {?} */ className = classNames[index];
                if (isTerminal) {
                    this._addTerminal(matcher._classMap, className, selectable);
                }
                else {
                    matcher = this._addPartial(matcher._classPartialMap, className);
                }
            }
        }
        if (lang_1.isPresent(attrs)) {
            for (var /** @type {?} */ index = 0; index < attrs.length;) {
                var /** @type {?} */ isTerminal = index === attrs.length - 2;
                var /** @type {?} */ attrName = attrs[index++];
                var /** @type {?} */ attrValue = attrs[index++];
                if (isTerminal) {
                    var /** @type {?} */ terminalMap = matcher._attrValueMap;
                    var /** @type {?} */ terminalValuesMap = terminalMap.get(attrName);
                    if (lang_1.isBlank(terminalValuesMap)) {
                        terminalValuesMap = new collection_1.Map();
                        terminalMap.set(attrName, terminalValuesMap);
                    }
                    this._addTerminal(terminalValuesMap, attrValue, selectable);
                }
                else {
                    var /** @type {?} */ parttialMap = matcher._attrValuePartialMap;
                    var /** @type {?} */ partialValuesMap = parttialMap.get(attrName);
                    if (lang_1.isBlank(partialValuesMap)) {
                        partialValuesMap = new collection_1.Map();
                        parttialMap.set(attrName, partialValuesMap);
                    }
                    matcher = this._addPartial(partialValuesMap, attrValue);
                }
            }
        }
    }
    /**
     * @param {?} map
     * @param {?} name
     * @param {?} selectable
     * @return {?}
     */
    _addTerminal(map, name, selectable) {
        var /** @type {?} */ terminalList = map.get(name);
        if (lang_1.isBlank(terminalList)) {
            terminalList = [];
            map.set(name, terminalList);
        }
        terminalList.push(selectable);
    }
    /**
     * @param {?} map
     * @param {?} name
     * @return {?}
     */
    _addPartial(map, name) {
        var /** @type {?} */ matcher = map.get(name);
        if (lang_1.isBlank(matcher)) {
            matcher = new SelectorMatcher();
            map.set(name, matcher);
        }
        return matcher;
    }
    /**
     *  Find the objects that have been added via `addSelectable` whose css selector is contained in the given css selector.
     * @param {?} cssSelector A css selector
     * @param {?} matchedCallback This callback will be called with the object handed into `addSelectable`
     * @return {?} boolean true if a match was found
     */
    match(cssSelector, matchedCallback) {
        var /** @type {?} */ result = false;
        var /** @type {?} */ element = cssSelector.element;
        var /** @type {?} */ classNames = cssSelector.classNames;
        var /** @type {?} */ attrs = cssSelector.attrs;
        for (var /** @type {?} */ i = 0; i < this._listContexts.length; i++) {
            this._listContexts[i].alreadyMatched = false;
        }
        result = this._matchTerminal(this._elementMap, element, cssSelector, matchedCallback) || result;
        result = this._matchPartial(this._elementPartialMap, element, cssSelector, matchedCallback) ||
            result;
        if (lang_1.isPresent(classNames)) {
            for (var /** @type {?} */ index = 0; index < classNames.length; index++) {
                var /** @type {?} */ className = classNames[index];
                result =
                    this._matchTerminal(this._classMap, className, cssSelector, matchedCallback) || result;
                result =
                    this._matchPartial(this._classPartialMap, className, cssSelector, matchedCallback) ||
                        result;
            }
        }
        if (lang_1.isPresent(attrs)) {
            for (var /** @type {?} */ index = 0; index < attrs.length;) {
                var /** @type {?} */ attrName = attrs[index++];
                var /** @type {?} */ attrValue = attrs[index++];
                var /** @type {?} */ terminalValuesMap = this._attrValueMap.get(attrName);
                if (!lang_1.StringWrapper.equals(attrValue, _EMPTY_ATTR_VALUE)) {
                    result = this._matchTerminal(terminalValuesMap, _EMPTY_ATTR_VALUE, cssSelector, matchedCallback) ||
                        result;
                }
                result = this._matchTerminal(terminalValuesMap, attrValue, cssSelector, matchedCallback) ||
                    result;
                var /** @type {?} */ partialValuesMap = this._attrValuePartialMap.get(attrName);
                if (!lang_1.StringWrapper.equals(attrValue, _EMPTY_ATTR_VALUE)) {
                    result = this._matchPartial(partialValuesMap, _EMPTY_ATTR_VALUE, cssSelector, matchedCallback) ||
                        result;
                }
                result =
                    this._matchPartial(partialValuesMap, attrValue, cssSelector, matchedCallback) || result;
            }
        }
        return result;
    }
    /**
     * @internal
     * @param {?} map
     * @param {?} name
     * @param {?} cssSelector
     * @param {?} matchedCallback
     * @return {?}
     */
    _matchTerminal(map, name, cssSelector, matchedCallback) {
        if (lang_1.isBlank(map) || lang_1.isBlank(name)) {
            return false;
        }
        var /** @type {?} */ selectables = map.get(name);
        var /** @type {?} */ starSelectables = map.get("*");
        if (lang_1.isPresent(starSelectables)) {
            selectables = selectables.concat(starSelectables);
        }
        if (lang_1.isBlank(selectables)) {
            return false;
        }
        var /** @type {?} */ selectable;
        var /** @type {?} */ result = false;
        for (var /** @type {?} */ index = 0; index < selectables.length; index++) {
            selectable = selectables[index];
            result = selectable.finalize(cssSelector, matchedCallback) || result;
        }
        return result;
    }
    /**
     * @internal
     * @param {?} map
     * @param {?} name
     * @param {?} cssSelector
     * @param {?} matchedCallback
     * @return {?}
     */
    _matchPartial(map, name, cssSelector, matchedCallback /*: (c: CssSelector, a: any) => void*/) {
        if (lang_1.isBlank(map) || lang_1.isBlank(name)) {
            return false;
        }
        var /** @type {?} */ nestedSelector = map.get(name);
        if (lang_1.isBlank(nestedSelector)) {
            return false;
        }
        // TODO(perf): get rid of recursion and measure again
        // TODO(perf): don't pass the whole selector into the recursion,
        // but only the not processed parts
        return nestedSelector.match(cssSelector, matchedCallback);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SelectorMatcher.prototype._elementMap;
        /** @type {?} */
        SelectorMatcher.prototype._elementPartialMap;
        /** @type {?} */
        SelectorMatcher.prototype._classMap;
        /** @type {?} */
        SelectorMatcher.prototype._classPartialMap;
        /** @type {?} */
        SelectorMatcher.prototype._attrValueMap;
        /** @type {?} */
        SelectorMatcher.prototype._attrValuePartialMap;
        /** @type {?} */
        SelectorMatcher.prototype._listContexts;
    }
}
exports.SelectorMatcher = SelectorMatcher;
class SelectorListContext {
    /**
     * @param {?} selectors
     */
    constructor(selectors) {
        this.selectors = selectors;
        this.alreadyMatched = false;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SelectorListContext.prototype.alreadyMatched;
        /** @type {?} */
        SelectorListContext.prototype.selectors;
    }
}
exports.SelectorListContext = SelectorListContext;
// Store context to pass back selector and context when a selector is matched
class SelectorContext {
    /**
     * @param {?} selector
     * @param {?} cbContext
     * @param {?} listContext
     */
    constructor(selector, cbContext, listContext) {
        this.selector = selector;
        this.cbContext = cbContext;
        this.listContext = listContext;
        this.notSelectors = selector.notSelectors;
    }
    /**
     * @param {?} cssSelector
     * @param {?} callback
     * @return {?}
     */
    finalize(cssSelector, callback) {
        var /** @type {?} */ result = true;
        if (this.notSelectors.length > 0 &&
            (lang_1.isBlank(this.listContext) || !this.listContext.alreadyMatched)) {
            var /** @type {?} */ notMatcher = SelectorMatcher.createNotMatcher(this.notSelectors);
            result = !notMatcher.match(cssSelector, null);
        }
        if (result && lang_1.isPresent(callback) &&
            (lang_1.isBlank(this.listContext) || !this.listContext.alreadyMatched)) {
            if (lang_1.isPresent(this.listContext)) {
                this.listContext.alreadyMatched = true;
            }
            callback(this.selector, this.cbContext);
        }
        return result;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SelectorContext.prototype.notSelectors;
        /** @type {?} */
        SelectorContext.prototype.selector;
        /** @type {?} */
        SelectorContext.prototype.cbContext;
        /** @type {?} */
        SelectorContext.prototype.listContext;
    }
}
exports.SelectorContext = SelectorContext;
//# sourceMappingURL=selector.js.map