goog.module('_angular$compiler$src$html__parser');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var html_ast_1 = goog.require('_angular$compiler$src$html__ast');
var html_lexer_1 = goog.require('_angular$compiler$src$html__lexer');
var parse_util_1 = goog.require('_angular$compiler$src$parse__util');
var html_tags_1 = goog.require('_angular$compiler$src$html__tags');
class HtmlTreeError extends parse_util_1.ParseError {
    /**
     * @param {?} elementName
     * @param {?} span
     * @param {?} msg
     */
    constructor(elementName, span, msg) {
        super(span, msg);
        this.elementName = elementName;
    }
    /**
     * @param {?} elementName
     * @param {?} span
     * @param {?} msg
     * @return {?}
     */
    static create(elementName, span, msg) {
        return new HtmlTreeError(elementName, span, msg);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        HtmlTreeError.prototype.elementName;
    }
}
exports.HtmlTreeError = HtmlTreeError;
class HtmlParseTreeResult {
    /**
     * @param {?} rootNodes
     * @param {?} errors
     */
    constructor(rootNodes, errors) {
        this.rootNodes = rootNodes;
        this.errors = errors;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        HtmlParseTreeResult.prototype.rootNodes;
        /** @type {?} */
        HtmlParseTreeResult.prototype.errors;
    }
}
exports.HtmlParseTreeResult = HtmlParseTreeResult;
class HtmlParser {
    /**
     * @param {?} sourceContent
     * @param {?} sourceUrl
     * @param {?=} parseExpansionForms
     * @return {?}
     */
    parse(sourceContent, sourceUrl, parseExpansionForms = false) {
        var /** @type {?} */ tokensAndErrors = html_lexer_1.tokenizeHtml(sourceContent, sourceUrl, parseExpansionForms);
        var /** @type {?} */ treeAndErrors = new TreeBuilder(tokensAndErrors.tokens).build();
        return new HtmlParseTreeResult(treeAndErrors.rootNodes, ((tokensAndErrors.errors))
            .concat(treeAndErrors.errors));
    }
}
HtmlParser.decorators = [
    { type: core_1.Injectable },
];
exports.HtmlParser = HtmlParser;
class TreeBuilder {
    /**
     * @param {?} tokens
     */
    constructor(tokens) {
        this.tokens = tokens;
        this.index = -1;
        this.rootNodes = [];
        this.errors = [];
        this.elementStack = [];
        this._advance();
    }
    /**
     * @return {?}
     */
    build() {
        while (this.peek.type !== html_lexer_1.HtmlTokenType.EOF) {
            if (this.peek.type === html_lexer_1.HtmlTokenType.TAG_OPEN_START) {
                this._consumeStartTag(this._advance());
            }
            else if (this.peek.type === html_lexer_1.HtmlTokenType.TAG_CLOSE) {
                this._consumeEndTag(this._advance());
            }
            else if (this.peek.type === html_lexer_1.HtmlTokenType.CDATA_START) {
                this._closeVoidElement();
                this._consumeCdata(this._advance());
            }
            else if (this.peek.type === html_lexer_1.HtmlTokenType.COMMENT_START) {
                this._closeVoidElement();
                this._consumeComment(this._advance());
            }
            else if (this.peek.type === html_lexer_1.HtmlTokenType.TEXT ||
                this.peek.type === html_lexer_1.HtmlTokenType.RAW_TEXT ||
                this.peek.type === html_lexer_1.HtmlTokenType.ESCAPABLE_RAW_TEXT) {
                this._closeVoidElement();
                this._consumeText(this._advance());
            }
            else if (this.peek.type === html_lexer_1.HtmlTokenType.EXPANSION_FORM_START) {
                this._consumeExpansion(this._advance());
            }
            else {
                // Skip all other tokens...
                this._advance();
            }
        }
        return new HtmlParseTreeResult(this.rootNodes, this.errors);
    }
    /**
     * @return {?}
     */
    _advance() {
        var /** @type {?} */ prev = this.peek;
        if (this.index < this.tokens.length - 1) {
            // Note: there is always an EOF token at the end
            this.index++;
        }
        this.peek = this.tokens[this.index];
        return prev;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    _advanceIf(type) {
        if (this.peek.type === type) {
            return this._advance();
        }
        return null;
    }
    /**
     * @param {?} startToken
     * @return {?}
     */
    _consumeCdata(startToken) {
        this._consumeText(this._advance());
        this._advanceIf(html_lexer_1.HtmlTokenType.CDATA_END);
    }
    /**
     * @param {?} token
     * @return {?}
     */
    _consumeComment(token) {
        var /** @type {?} */ text = this._advanceIf(html_lexer_1.HtmlTokenType.RAW_TEXT);
        this._advanceIf(html_lexer_1.HtmlTokenType.COMMENT_END);
        var /** @type {?} */ value = lang_1.isPresent(text) ? text.parts[0].trim() : null;
        this._addToParent(new html_ast_1.HtmlCommentAst(value, token.sourceSpan));
    }
    /**
     * @param {?} token
     * @return {?}
     */
    _consumeExpansion(token) {
        let /** @type {?} */ switchValue = this._advance();
        let /** @type {?} */ type = this._advance();
        let /** @type {?} */ cases = [];
        // read =
        while (this.peek.type === html_lexer_1.HtmlTokenType.EXPANSION_CASE_VALUE) {
            let /** @type {?} */ expCase = this._parseExpansionCase();
            if (lang_1.isBlank(expCase))
                return; // error
            cases.push(expCase);
        }
        // read the final }
        if (this.peek.type !== html_lexer_1.HtmlTokenType.EXPANSION_FORM_END) {
            this.errors.push(HtmlTreeError.create(null, this.peek.sourceSpan, `Invalid expansion form. Missing '}'.`));
            return;
        }
        this._advance();
        let /** @type {?} */ mainSourceSpan = new parse_util_1.ParseSourceSpan(token.sourceSpan.start, this.peek.sourceSpan.end);
        this._addToParent(new html_ast_1.HtmlExpansionAst(switchValue.parts[0], type.parts[0], cases, mainSourceSpan, switchValue.sourceSpan));
    }
    /**
     * @return {?}
     */
    _parseExpansionCase() {
        let /** @type {?} */ value = this._advance();
        // read {
        if (this.peek.type !== html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START) {
            this.errors.push(HtmlTreeError.create(null, this.peek.sourceSpan, `Invalid expansion form. Missing '{'.,`));
            return null;
        }
        // read until }
        let /** @type {?} */ start = this._advance();
        let /** @type {?} */ exp = this._collectExpansionExpTokens(start);
        if (lang_1.isBlank(exp))
            return null;
        let /** @type {?} */ end = this._advance();
        exp.push(new html_lexer_1.HtmlToken(html_lexer_1.HtmlTokenType.EOF, [], end.sourceSpan));
        // parse everything in between { and }
        let /** @type {?} */ parsedExp = new TreeBuilder(exp).build();
        if (parsedExp.errors.length > 0) {
            this.errors = this.errors.concat(/** @type {?} */ (parsedExp.errors));
            return null;
        }
        let /** @type {?} */ sourceSpan = new parse_util_1.ParseSourceSpan(value.sourceSpan.start, end.sourceSpan.end);
        let /** @type {?} */ expSourceSpan = new parse_util_1.ParseSourceSpan(start.sourceSpan.start, end.sourceSpan.end);
        return new html_ast_1.HtmlExpansionCaseAst(value.parts[0], parsedExp.rootNodes, sourceSpan, value.sourceSpan, expSourceSpan);
    }
    /**
     * @param {?} start
     * @return {?}
     */
    _collectExpansionExpTokens(start) {
        let /** @type {?} */ exp = [];
        let /** @type {?} */ expansionFormStack = [html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START];
        while (true) {
            if (this.peek.type === html_lexer_1.HtmlTokenType.EXPANSION_FORM_START ||
                this.peek.type === html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START) {
                expansionFormStack.push(this.peek.type);
            }
            if (this.peek.type === html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_END) {
                if (lastOnStack(expansionFormStack, html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START)) {
                    expansionFormStack.pop();
                    if (expansionFormStack.length == 0)
                        return exp;
                }
                else {
                    this.errors.push(HtmlTreeError.create(null, start.sourceSpan, `Invalid expansion form. Missing '}'.`));
                    return null;
                }
            }
            if (this.peek.type === html_lexer_1.HtmlTokenType.EXPANSION_FORM_END) {
                if (lastOnStack(expansionFormStack, html_lexer_1.HtmlTokenType.EXPANSION_FORM_START)) {
                    expansionFormStack.pop();
                }
                else {
                    this.errors.push(HtmlTreeError.create(null, start.sourceSpan, `Invalid expansion form. Missing '}'.`));
                    return null;
                }
            }
            if (this.peek.type === html_lexer_1.HtmlTokenType.EOF) {
                this.errors.push(HtmlTreeError.create(null, start.sourceSpan, `Invalid expansion form. Missing '}'.`));
                return null;
            }
            exp.push(this._advance());
        }
    }
    /**
     * @param {?} token
     * @return {?}
     */
    _consumeText(token) {
        let /** @type {?} */ text = token.parts[0];
        if (text.length > 0 && text[0] == '\n') {
            let /** @type {?} */ parent = this._getParentElement();
            if (lang_1.isPresent(parent) && parent.children.length == 0 &&
                html_tags_1.getHtmlTagDefinition(parent.name).ignoreFirstLf) {
                text = text.substring(1);
            }
        }
        if (text.length > 0) {
            this._addToParent(new html_ast_1.HtmlTextAst(text, token.sourceSpan));
        }
    }
    /**
     * @return {?}
     */
    _closeVoidElement() {
        if (this.elementStack.length > 0) {
            let /** @type {?} */ el = collection_1.ListWrapper.last(this.elementStack);
            if (html_tags_1.getHtmlTagDefinition(el.name).isVoid) {
                this.elementStack.pop();
            }
        }
    }
    /**
     * @param {?} startTagToken
     * @return {?}
     */
    _consumeStartTag(startTagToken) {
        var /** @type {?} */ prefix = startTagToken.parts[0];
        var /** @type {?} */ name = startTagToken.parts[1];
        var /** @type {?} */ attrs = [];
        while (this.peek.type === html_lexer_1.HtmlTokenType.ATTR_NAME) {
            attrs.push(this._consumeAttr(this._advance()));
        }
        var /** @type {?} */ fullName = getElementFullName(prefix, name, this._getParentElement());
        var /** @type {?} */ selfClosing = false;
        // Note: There could have been a tokenizer error
        // so that we don't get a token for the end tag...
        if (this.peek.type === html_lexer_1.HtmlTokenType.TAG_OPEN_END_VOID) {
            this._advance();
            selfClosing = true;
            if (html_tags_1.getNsPrefix(fullName) == null && !html_tags_1.getHtmlTagDefinition(fullName).isVoid) {
                this.errors.push(HtmlTreeError.create(fullName, startTagToken.sourceSpan, `Only void and foreign elements can be self closed "${startTagToken.parts[1]}"`));
            }
        }
        else if (this.peek.type === html_lexer_1.HtmlTokenType.TAG_OPEN_END) {
            this._advance();
            selfClosing = false;
        }
        var /** @type {?} */ end = this.peek.sourceSpan.start;
        let /** @type {?} */ span = new parse_util_1.ParseSourceSpan(startTagToken.sourceSpan.start, end);
        var /** @type {?} */ el = new html_ast_1.HtmlElementAst(fullName, attrs, [], span, span, null);
        this._pushElement(el);
        if (selfClosing) {
            this._popElement(fullName);
            el.endSourceSpan = span;
        }
    }
    /**
     * @param {?} el
     * @return {?}
     */
    _pushElement(el) {
        if (this.elementStack.length > 0) {
            var /** @type {?} */ parentEl = collection_1.ListWrapper.last(this.elementStack);
            if (html_tags_1.getHtmlTagDefinition(parentEl.name).isClosedByChild(el.name)) {
                this.elementStack.pop();
            }
        }
        var /** @type {?} */ tagDef = html_tags_1.getHtmlTagDefinition(el.name);
        var /** @type {?} */ parentEl = this._getParentElement();
        if (tagDef.requireExtraParent(lang_1.isPresent(parentEl) ? parentEl.name : null)) {
            var /** @type {?} */ newParent = new html_ast_1.HtmlElementAst(tagDef.parentToAdd, [], [el], el.sourceSpan, el.startSourceSpan, el.endSourceSpan);
            this._addToParent(newParent);
            this.elementStack.push(newParent);
            this.elementStack.push(el);
        }
        else {
            this._addToParent(el);
            this.elementStack.push(el);
        }
    }
    /**
     * @param {?} endTagToken
     * @return {?}
     */
    _consumeEndTag(endTagToken) {
        var /** @type {?} */ fullName = getElementFullName(endTagToken.parts[0], endTagToken.parts[1], this._getParentElement());
        this._getParentElement().endSourceSpan = endTagToken.sourceSpan;
        if (html_tags_1.getHtmlTagDefinition(fullName).isVoid) {
            this.errors.push(HtmlTreeError.create(fullName, endTagToken.sourceSpan, `Void elements do not have end tags "${endTagToken.parts[1]}"`));
        }
        else if (!this._popElement(fullName)) {
            this.errors.push(HtmlTreeError.create(fullName, endTagToken.sourceSpan, `Unexpected closing tag "${endTagToken.parts[1]}"`));
        }
    }
    /**
     * @param {?} fullName
     * @return {?}
     */
    _popElement(fullName) {
        for (let /** @type {?} */ stackIndex = this.elementStack.length - 1; stackIndex >= 0; stackIndex--) {
            let /** @type {?} */ el = this.elementStack[stackIndex];
            if (el.name == fullName) {
                collection_1.ListWrapper.splice(this.elementStack, stackIndex, this.elementStack.length - stackIndex);
                return true;
            }
            if (!html_tags_1.getHtmlTagDefinition(el.name).closedByParent) {
                return false;
            }
        }
        return false;
    }
    /**
     * @param {?} attrName
     * @return {?}
     */
    _consumeAttr(attrName) {
        var /** @type {?} */ fullName = html_tags_1.mergeNsAndName(attrName.parts[0], attrName.parts[1]);
        var /** @type {?} */ end = attrName.sourceSpan.end;
        var /** @type {?} */ value = '';
        if (this.peek.type === html_lexer_1.HtmlTokenType.ATTR_VALUE) {
            var /** @type {?} */ valueToken = this._advance();
            value = valueToken.parts[0];
            end = valueToken.sourceSpan.end;
        }
        return new html_ast_1.HtmlAttrAst(fullName, value, new parse_util_1.ParseSourceSpan(attrName.sourceSpan.start, end));
    }
    /**
     * @return {?}
     */
    _getParentElement() {
        return this.elementStack.length > 0 ? collection_1.ListWrapper.last(this.elementStack) : null;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    _addToParent(node) {
        var /** @type {?} */ parent = this._getParentElement();
        if (lang_1.isPresent(parent)) {
            parent.children.push(node);
        }
        else {
            this.rootNodes.push(node);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TreeBuilder.prototype.index;
        /** @type {?} */
        TreeBuilder.prototype.peek;
        /** @type {?} */
        TreeBuilder.prototype.rootNodes;
        /** @type {?} */
        TreeBuilder.prototype.errors;
        /** @type {?} */
        TreeBuilder.prototype.elementStack;
        /** @type {?} */
        TreeBuilder.prototype.tokens;
    }
}
/**
 * @param {?} prefix
 * @param {?} localName
 * @param {?} parentElement
 * @return {?}
 */
function getElementFullName(prefix, localName, parentElement) {
    if (lang_1.isBlank(prefix)) {
        prefix = html_tags_1.getHtmlTagDefinition(localName).implicitNamespacePrefix;
        if (lang_1.isBlank(prefix) && lang_1.isPresent(parentElement)) {
            prefix = html_tags_1.getNsPrefix(parentElement.name);
        }
    }
    return html_tags_1.mergeNsAndName(prefix, localName);
}
/**
 * @param {?} stack
 * @param {?} element
 * @return {?}
 */
function lastOnStack(stack, element) {
    return stack.length > 0 && stack[stack.length - 1] === element;
}
//# sourceMappingURL=html_parser.js.map