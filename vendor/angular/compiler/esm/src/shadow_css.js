goog.module('_angular$compiler$src$shadow__css');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
/**
 * This file is a port of shadowCSS from webcomponents.js to TypeScript.
 *
 * Please make sure to keep to edits in sync with the source file.
 *
 * Source:
 * https://github.com/webcomponents/webcomponentsjs/blob/4efecd7e0e/src/ShadowCSS/ShadowCSS.js
 *
 * The original file level comment is reproduced below
 */
/*
  This is a limited shim for ShadowDOM css styling.
  https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#styles

  The intention here is to support only the styling features which can be
  relatively simply implemented. The goal is to allow users to avoid the
  most obvious pitfalls and do so without compromising performance significantly.
  For ShadowDOM styling that's not covered here, a set of best practices
  can be provided that should allow users to accomplish more complex styling.

  The following is a list of specific ShadowDOM styling features and a brief
  discussion of the approach used to shim.

  Shimmed features:

  * :host, :host-context: ShadowDOM allows styling of the shadowRoot's host
  element using the :host rule. To shim this feature, the :host styles are
  reformatted and prefixed with a given scope name and promoted to a
  document level stylesheet.
  For example, given a scope name of .foo, a rule like this:

    :host {
        background: red;
      }
    }

  becomes:

    .foo {
      background: red;
    }

  * encapsultion: Styles defined within ShadowDOM, apply only to
  dom inside the ShadowDOM. Polymer uses one of two techniques to implement
  this feature.

  By default, rules are prefixed with the host element tag name
  as a descendant selector. This ensures styling does not leak out of the 'top'
  of the element's ShadowDOM. For example,

  div {
      font-weight: bold;
    }

  becomes:

  x-foo div {
      font-weight: bold;
    }

  becomes:


  Alternatively, if WebComponents.ShadowCSS.strictStyling is set to true then
  selectors are scoped by adding an attribute selector suffix to each
  simple selector that contains the host element tag name. Each element
  in the element's ShadowDOM template is also given the scope attribute.
  Thus, these rules match only elements that have the scope attribute.
  For example, given a scope name of x-foo, a rule like this:

    div {
      font-weight: bold;
    }

  becomes:

    div[x-foo] {
      font-weight: bold;
    }

  Note that elements that are dynamically added to a scope must have the scope
  selector added to them manually.

  * upper/lower bound encapsulation: Styles which are defined outside a
  shadowRoot should not cross the ShadowDOM boundary and should not apply
  inside a shadowRoot.

  This styling behavior is not emulated. Some possible ways to do this that
  were rejected due to complexity and/or performance concerns include: (1) reset
  every possible property for every possible selector for a given scope name;
  (2) re-implement css in javascript.

  As an alternative, users should make sure to use selectors
  specific to the scope in which they are working.

  * ::distributed: This behavior is not emulated. It's often not necessary
  to style the contents of a specific insertion point and instead, descendants
  of the host element can be styled selectively. Users can also create an
  extra node around an insertion point and style that node's contents
  via descendent selectors. For example, with a shadowRoot like this:

    <style>
      ::content(div) {
        background: red;
      }
    </style>
    <content></content>

  could become:

    <style>
      / *@polyfill .content-container div * /
      ::content(div) {
        background: red;
      }
    </style>
    <div class="content-container">
      <content></content>
    </div>

  Note the use of @polyfill in the comment above a ShadowDOM specific style
  declaration. This is a directive to the styling shim to use the selector
  in comments in lieu of the next selector when running under polyfill.
*/
class ShadowCss {
    /**
     */
    constructor() {
        this.strictStyling = true;
    }
    /**
     * @param {?} cssText
     * @param {?} selector
     * @param {?=} hostSelector
     * @return {?}
     */
    shimCssText(cssText, selector, hostSelector = '') {
        cssText = stripComments(cssText);
        cssText = this._insertDirectives(cssText);
        return this._scopeCssText(cssText, selector, hostSelector);
    }
    /**
     * @param {?} cssText
     * @return {?}
     */
    _insertDirectives(cssText) {
        cssText = this._insertPolyfillDirectivesInCssText(cssText);
        return this._insertPolyfillRulesInCssText(cssText);
    }
    /**
     * @param {?} cssText
     * @return {?}
     */
    _insertPolyfillDirectivesInCssText(cssText) {
        // Difference with webcomponents.js: does not handle comments
        return lang_1.StringWrapper.replaceAllMapped(cssText, _cssContentNextSelectorRe, function (m) { return m[1] + '{'; });
    }
    /**
     * @param {?} cssText
     * @return {?}
     */
    _insertPolyfillRulesInCssText(cssText) {
        // Difference with webcomponents.js: does not handle comments
        return lang_1.StringWrapper.replaceAllMapped(cssText, _cssContentRuleRe, function (m) {
            var /** @type {?} */ rule = m[0];
            rule = lang_1.StringWrapper.replace(rule, m[1], '');
            rule = lang_1.StringWrapper.replace(rule, m[2], '');
            return m[3] + rule;
        });
    }
    /**
     * @param {?} cssText
     * @param {?} scopeSelector
     * @param {?} hostSelector
     * @return {?}
     */
    _scopeCssText(cssText, scopeSelector, hostSelector) {
        var /** @type {?} */ unscoped = this._extractUnscopedRulesFromCssText(cssText);
        cssText = this._insertPolyfillHostInCssText(cssText);
        cssText = this._convertColonHost(cssText);
        cssText = this._convertColonHostContext(cssText);
        cssText = this._convertShadowDOMSelectors(cssText);
        if (lang_1.isPresent(scopeSelector)) {
            cssText = this._scopeSelectors(cssText, scopeSelector, hostSelector);
        }
        cssText = cssText + '\n' + unscoped;
        return cssText.trim();
    }
    /**
     * @param {?} cssText
     * @return {?}
     */
    _extractUnscopedRulesFromCssText(cssText) {
        // Difference with webcomponents.js: does not handle comments
        var /** @type {?} */ r = '', /** @type {?} */ m;
        var /** @type {?} */ matcher = lang_1.RegExpWrapper.matcher(_cssContentUnscopedRuleRe, cssText);
        while (lang_1.isPresent(m = lang_1.RegExpMatcherWrapper.next(matcher))) {
            var /** @type {?} */ rule = m[0];
            rule = lang_1.StringWrapper.replace(rule, m[2], '');
            rule = lang_1.StringWrapper.replace(rule, m[1], m[3]);
            r += rule + '\n\n';
        }
        return r;
    }
    /**
     * @param {?} cssText
     * @return {?}
     */
    _convertColonHost(cssText) {
        return this._convertColonRule(cssText, _cssColonHostRe, this._colonHostPartReplacer);
    }
    /**
     * @param {?} cssText
     * @return {?}
     */
    _convertColonHostContext(cssText) {
        return this._convertColonRule(cssText, _cssColonHostContextRe, this._colonHostContextPartReplacer);
    }
    /**
     * @param {?} cssText
     * @param {?} regExp
     * @param {?} partReplacer
     * @return {?}
     */
    _convertColonRule(cssText, regExp, partReplacer) {
        // p1 = :host, p2 = contents of (), p3 rest of rule
        return lang_1.StringWrapper.replaceAllMapped(cssText, regExp, function (m) {
            if (lang_1.isPresent(m[2])) {
                var /** @type {?} */ parts = m[2].split(','), /** @type {?} */ r = [];
                for (var /** @type {?} */ i = 0; i < parts.length; i++) {
                    var /** @type {?} */ p = parts[i];
                    if (lang_1.isBlank(p))
                        break;
                    p = p.trim();
                    r.push(partReplacer(_polyfillHostNoCombinator, p, m[3]));
                }
                return r.join(',');
            }
            else {
                return _polyfillHostNoCombinator + m[3];
            }
        });
    }
    /**
     * @param {?} host
     * @param {?} part
     * @param {?} suffix
     * @return {?}
     */
    _colonHostContextPartReplacer(host, part, suffix) {
        if (lang_1.StringWrapper.contains(part, _polyfillHost)) {
            return this._colonHostPartReplacer(host, part, suffix);
        }
        else {
            return host + part + suffix + ', ' + part + ' ' + host + suffix;
        }
    }
    /**
     * @param {?} host
     * @param {?} part
     * @param {?} suffix
     * @return {?}
     */
    _colonHostPartReplacer(host, part, suffix) {
        return host + lang_1.StringWrapper.replace(part, _polyfillHost, '') + suffix;
    }
    /**
     * @param {?} cssText
     * @return {?}
     */
    _convertShadowDOMSelectors(cssText) {
        for (var /** @type {?} */ i = 0; i < _shadowDOMSelectorsRe.length; i++) {
            cssText = lang_1.StringWrapper.replaceAll(cssText, _shadowDOMSelectorsRe[i], ' ');
        }
        return cssText;
    }
    /**
     * @param {?} cssText
     * @param {?} scopeSelector
     * @param {?} hostSelector
     * @return {?}
     */
    _scopeSelectors(cssText, scopeSelector, hostSelector) {
        return processRules(cssText, (rule) => {
            var /** @type {?} */ selector = rule.selector;
            var /** @type {?} */ content = rule.content;
            if (rule.selector[0] != '@' || rule.selector.startsWith('@page')) {
                selector =
                    this._scopeSelector(rule.selector, scopeSelector, hostSelector, this.strictStyling);
            }
            else if (rule.selector.startsWith('@media')) {
                content = this._scopeSelectors(rule.content, scopeSelector, hostSelector);
            }
            return new CssRule(selector, content);
        });
    }
    /**
     * @param {?} selector
     * @param {?} scopeSelector
     * @param {?} hostSelector
     * @param {?} strict
     * @return {?}
     */
    _scopeSelector(selector, scopeSelector, hostSelector, strict) {
        var /** @type {?} */ r = [], /** @type {?} */ parts = selector.split(',');
        for (var /** @type {?} */ i = 0; i < parts.length; i++) {
            var /** @type {?} */ p = parts[i].trim();
            var /** @type {?} */ deepParts = lang_1.StringWrapper.split(p, _shadowDeepSelectors);
            var /** @type {?} */ shallowPart = deepParts[0];
            if (this._selectorNeedsScoping(shallowPart, scopeSelector)) {
                deepParts[0] = strict && !lang_1.StringWrapper.contains(shallowPart, _polyfillHostNoCombinator) ?
                    this._applyStrictSelectorScope(shallowPart, scopeSelector) :
                    this._applySelectorScope(shallowPart, scopeSelector, hostSelector);
            }
            // replace /deep/ with a space for child selectors
            r.push(deepParts.join(' '));
        }
        return r.join(', ');
    }
    /**
     * @param {?} selector
     * @param {?} scopeSelector
     * @return {?}
     */
    _selectorNeedsScoping(selector, scopeSelector) {
        var /** @type {?} */ re = this._makeScopeMatcher(scopeSelector);
        return !lang_1.isPresent(lang_1.RegExpWrapper.firstMatch(re, selector));
    }
    /**
     * @param {?} scopeSelector
     * @return {?}
     */
    _makeScopeMatcher(scopeSelector) {
        var /** @type {?} */ lre = /\[/g;
        var /** @type {?} */ rre = /\]/g;
        scopeSelector = lang_1.StringWrapper.replaceAll(scopeSelector, lre, '\\[');
        scopeSelector = lang_1.StringWrapper.replaceAll(scopeSelector, rre, '\\]');
        return lang_1.RegExpWrapper.create('^(' + scopeSelector + ')' + _selectorReSuffix, 'm');
    }
    /**
     * @param {?} selector
     * @param {?} scopeSelector
     * @param {?} hostSelector
     * @return {?}
     */
    _applySelectorScope(selector, scopeSelector, hostSelector) {
        // Difference from webcomponentsjs: scopeSelector could not be an array
        return this._applySimpleSelectorScope(selector, scopeSelector, hostSelector);
    }
    /**
     * @param {?} selector
     * @param {?} scopeSelector
     * @param {?} hostSelector
     * @return {?}
     */
    _applySimpleSelectorScope(selector, scopeSelector, hostSelector) {
        if (lang_1.isPresent(lang_1.RegExpWrapper.firstMatch(_polyfillHostRe, selector))) {
            var /** @type {?} */ replaceBy = this.strictStyling ? `[${hostSelector}]` : scopeSelector;
            selector = lang_1.StringWrapper.replace(selector, _polyfillHostNoCombinator, replaceBy);
            return lang_1.StringWrapper.replaceAll(selector, _polyfillHostRe, replaceBy + ' ');
        }
        else {
            return scopeSelector + ' ' + selector;
        }
    }
    /**
     * @param {?} selector
     * @param {?} scopeSelector
     * @return {?}
     */
    _applyStrictSelectorScope(selector, scopeSelector) {
        var /** @type {?} */ isRe = /\[is=([^\]]*)\]/g;
        scopeSelector = lang_1.StringWrapper.replaceAllMapped(scopeSelector, isRe, (m) => m[1]);
        var /** @type {?} */ splits = [' ', '>', '+', '~'], /** @type {?} */ scoped = selector, /** @type {?} */ attrName = '[' + scopeSelector + ']';
        for (var /** @type {?} */ i = 0; i < splits.length; i++) {
            var /** @type {?} */ sep = splits[i];
            var /** @type {?} */ parts = scoped.split(sep);
            scoped = parts.map(p => {
                // remove :host since it should be unnecessary
                var /** @type {?} */ t = lang_1.StringWrapper.replaceAll(p.trim(), _polyfillHostRe, '');
                if (t.length > 0 && !collection_1.ListWrapper.contains(splits, t) &&
                    !lang_1.StringWrapper.contains(t, attrName)) {
                    var /** @type {?} */ re = /([^:]*)(:*)(.*)/g;
                    var /** @type {?} */ m = lang_1.RegExpWrapper.firstMatch(re, t);
                    if (lang_1.isPresent(m)) {
                        p = m[1] + attrName + m[2] + m[3];
                    }
                }
                return p;
            })
                .join(sep);
        }
        return scoped;
    }
    /**
     * @param {?} selector
     * @return {?}
     */
    _insertPolyfillHostInCssText(selector) {
        selector = lang_1.StringWrapper.replaceAll(selector, _colonHostContextRe, _polyfillHostContext);
        selector = lang_1.StringWrapper.replaceAll(selector, _colonHostRe, _polyfillHost);
        return selector;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ShadowCss.prototype.strictStyling;
    }
}
exports.ShadowCss = ShadowCss;
var /** @type {?} */ _cssContentNextSelectorRe = /polyfill-next-selector[^}]*content:[\s]*?['"](.*?)['"][;\s]*}([^{]*?){/gim;
var /** @type {?} */ _cssContentRuleRe = /(polyfill-rule)[^}]*(content:[\s]*['"](.*?)['"])[;\s]*[^}]*}/gim;
var /** @type {?} */ _cssContentUnscopedRuleRe = /(polyfill-unscoped-rule)[^}]*(content:[\s]*['"](.*?)['"])[;\s]*[^}]*}/gim;
var /** @type {?} */ _polyfillHost = '-shadowcsshost';
// note: :host-context pre-processed to -shadowcsshostcontext.
var /** @type {?} */ _polyfillHostContext = '-shadowcsscontext';
var /** @type {?} */ _parenSuffix = ')(?:\\((' +
    '(?:\\([^)(]*\\)|[^)(]*)+?' +
    ')\\))?([^,{]*)';
var /** @type {?} */ _cssColonHostRe = lang_1.RegExpWrapper.create('(' + _polyfillHost + _parenSuffix, 'im');
var /** @type {?} */ _cssColonHostContextRe = lang_1.RegExpWrapper.create('(' + _polyfillHostContext + _parenSuffix, 'im');
var /** @type {?} */ _polyfillHostNoCombinator = _polyfillHost + '-no-combinator';
var /** @type {?} */ _shadowDOMSelectorsRe = [
    /::shadow/g,
    /::content/g,
    // Deprecated selectors
    // TODO(vicb): see https://github.com/angular/clang-format/issues/16
    // clang-format off
    /\/shadow-deep\//g,
    /\/shadow\//g,
];
var /** @type {?} */ _shadowDeepSelectors = /(?:>>>)|(?:\/deep\/)/g;
var /** @type {?} */ _selectorReSuffix = '([>\\s~+\[.,{:][\\s\\S]*)?$';
var /** @type {?} */ _polyfillHostRe = lang_1.RegExpWrapper.create(_polyfillHost, 'im');
var /** @type {?} */ _colonHostRe = /:host/gim;
var /** @type {?} */ _colonHostContextRe = /:host-context/gim;
var /** @type {?} */ _commentRe = /\/\*[\s\S]*?\*\//g;
/**
 * @param {?} input
 * @return {?}
 */
function stripComments(input) {
    return lang_1.StringWrapper.replaceAllMapped(input, _commentRe, (_) => '');
}
var /** @type {?} */ _ruleRe = /(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g;
var /** @type {?} */ _curlyRe = /([{}])/g;
const /** @type {?} */ OPEN_CURLY = '{';
const /** @type {?} */ CLOSE_CURLY = '}';
const /** @type {?} */ BLOCK_PLACEHOLDER = '%BLOCK%';
class CssRule {
    /**
     * @param {?} selector
     * @param {?} content
     */
    constructor(selector, content) {
        this.selector = selector;
        this.content = content;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CssRule.prototype.selector;
        /** @type {?} */
        CssRule.prototype.content;
    }
}
exports.CssRule = CssRule;
/**
 * @param {?} input
 * @param {?} ruleCallback
 * @return {?}
 */
function processRules(input, ruleCallback) {
    var /** @type {?} */ inputWithEscapedBlocks = escapeBlocks(input);
    var /** @type {?} */ nextBlockIndex = 0;
    return lang_1.StringWrapper.replaceAllMapped(inputWithEscapedBlocks.escapedString, _ruleRe, function (m) {
        var /** @type {?} */ selector = m[2];
        var /** @type {?} */ content = '';
        var /** @type {?} */ suffix = m[4];
        var /** @type {?} */ contentPrefix = '';
        if (lang_1.isPresent(m[4]) && m[4].startsWith('{' + BLOCK_PLACEHOLDER)) {
            content = inputWithEscapedBlocks.blocks[nextBlockIndex++];
            suffix = m[4].substring(BLOCK_PLACEHOLDER.length + 1);
            contentPrefix = '{';
        }
        var /** @type {?} */ rule = ruleCallback(new CssRule(selector, content));
        return `${m[1]}${rule.selector}${m[3]}${contentPrefix}${rule.content}${suffix}`;
    });
}
exports.processRules = processRules;
class StringWithEscapedBlocks {
    /**
     * @param {?} escapedString
     * @param {?} blocks
     */
    constructor(escapedString, blocks) {
        this.escapedString = escapedString;
        this.blocks = blocks;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        StringWithEscapedBlocks.prototype.escapedString;
        /** @type {?} */
        StringWithEscapedBlocks.prototype.blocks;
    }
}
/**
 * @param {?} input
 * @return {?}
 */
function escapeBlocks(input) {
    var /** @type {?} */ inputParts = lang_1.StringWrapper.split(input, _curlyRe);
    var /** @type {?} */ resultParts = [];
    var /** @type {?} */ escapedBlocks = [];
    var /** @type {?} */ bracketCount = 0;
    var /** @type {?} */ currentBlockParts = [];
    for (var /** @type {?} */ partIndex = 0; partIndex < inputParts.length; partIndex++) {
        var /** @type {?} */ part = inputParts[partIndex];
        if (part == CLOSE_CURLY) {
            bracketCount--;
        }
        if (bracketCount > 0) {
            currentBlockParts.push(part);
        }
        else {
            if (currentBlockParts.length > 0) {
                escapedBlocks.push(currentBlockParts.join(''));
                resultParts.push(BLOCK_PLACEHOLDER);
                currentBlockParts = [];
            }
            resultParts.push(part);
        }
        if (part == OPEN_CURLY) {
            bracketCount++;
        }
    }
    if (currentBlockParts.length > 0) {
        escapedBlocks.push(currentBlockParts.join(''));
        resultParts.push(BLOCK_PLACEHOLDER);
    }
    return new StringWithEscapedBlocks(resultParts.join(''), escapedBlocks);
}
//# sourceMappingURL=shadow_css.js.map