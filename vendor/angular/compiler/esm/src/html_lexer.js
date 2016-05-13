goog.module('_angular$compiler$src$html__lexer');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var parse_util_1 = goog.require('_angular$compiler$src$parse__util');
var html_tags_1 = goog.require('_angular$compiler$src$html__tags');
exports.HtmlTokenType = {};
exports.HtmlTokenType.TAG_OPEN_START = 0;
exports.HtmlTokenType.TAG_OPEN_END = 1;
exports.HtmlTokenType.TAG_OPEN_END_VOID = 2;
exports.HtmlTokenType.TAG_CLOSE = 3;
exports.HtmlTokenType.TEXT = 4;
exports.HtmlTokenType.ESCAPABLE_RAW_TEXT = 5;
exports.HtmlTokenType.RAW_TEXT = 6;
exports.HtmlTokenType.COMMENT_START = 7;
exports.HtmlTokenType.COMMENT_END = 8;
exports.HtmlTokenType.CDATA_START = 9;
exports.HtmlTokenType.CDATA_END = 10;
exports.HtmlTokenType.ATTR_NAME = 11;
exports.HtmlTokenType.ATTR_VALUE = 12;
exports.HtmlTokenType.DOC_TYPE = 13;
exports.HtmlTokenType.EXPANSION_FORM_START = 14;
exports.HtmlTokenType.EXPANSION_CASE_VALUE = 15;
exports.HtmlTokenType.EXPANSION_CASE_EXP_START = 16;
exports.HtmlTokenType.EXPANSION_CASE_EXP_END = 17;
exports.HtmlTokenType.EXPANSION_FORM_END = 18;
exports.HtmlTokenType.EOF = 19;
exports.HtmlTokenType[exports.HtmlTokenType.TAG_OPEN_START] = "TAG_OPEN_START";
exports.HtmlTokenType[exports.HtmlTokenType.TAG_OPEN_END] = "TAG_OPEN_END";
exports.HtmlTokenType[exports.HtmlTokenType.TAG_OPEN_END_VOID] = "TAG_OPEN_END_VOID";
exports.HtmlTokenType[exports.HtmlTokenType.TAG_CLOSE] = "TAG_CLOSE";
exports.HtmlTokenType[exports.HtmlTokenType.TEXT] = "TEXT";
exports.HtmlTokenType[exports.HtmlTokenType.ESCAPABLE_RAW_TEXT] = "ESCAPABLE_RAW_TEXT";
exports.HtmlTokenType[exports.HtmlTokenType.RAW_TEXT] = "RAW_TEXT";
exports.HtmlTokenType[exports.HtmlTokenType.COMMENT_START] = "COMMENT_START";
exports.HtmlTokenType[exports.HtmlTokenType.COMMENT_END] = "COMMENT_END";
exports.HtmlTokenType[exports.HtmlTokenType.CDATA_START] = "CDATA_START";
exports.HtmlTokenType[exports.HtmlTokenType.CDATA_END] = "CDATA_END";
exports.HtmlTokenType[exports.HtmlTokenType.ATTR_NAME] = "ATTR_NAME";
exports.HtmlTokenType[exports.HtmlTokenType.ATTR_VALUE] = "ATTR_VALUE";
exports.HtmlTokenType[exports.HtmlTokenType.DOC_TYPE] = "DOC_TYPE";
exports.HtmlTokenType[exports.HtmlTokenType.EXPANSION_FORM_START] = "EXPANSION_FORM_START";
exports.HtmlTokenType[exports.HtmlTokenType.EXPANSION_CASE_VALUE] = "EXPANSION_CASE_VALUE";
exports.HtmlTokenType[exports.HtmlTokenType.EXPANSION_CASE_EXP_START] = "EXPANSION_CASE_EXP_START";
exports.HtmlTokenType[exports.HtmlTokenType.EXPANSION_CASE_EXP_END] = "EXPANSION_CASE_EXP_END";
exports.HtmlTokenType[exports.HtmlTokenType.EXPANSION_FORM_END] = "EXPANSION_FORM_END";
exports.HtmlTokenType[exports.HtmlTokenType.EOF] = "EOF";
class HtmlToken {
    /**
     * @param {?} type
     * @param {?} parts
     * @param {?} sourceSpan
     */
    constructor(type, parts, sourceSpan) {
        this.type = type;
        this.parts = parts;
        this.sourceSpan = sourceSpan;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        HtmlToken.prototype.type;
        /** @type {?} */
        HtmlToken.prototype.parts;
        /** @type {?} */
        HtmlToken.prototype.sourceSpan;
    }
}
exports.HtmlToken = HtmlToken;
class HtmlTokenError extends parse_util_1.ParseError {
    /**
     * @param {?} errorMsg
     * @param {?} tokenType
     * @param {?} span
     */
    constructor(errorMsg, tokenType, span) {
        super(span, errorMsg);
        this.tokenType = tokenType;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        HtmlTokenError.prototype.tokenType;
    }
}
exports.HtmlTokenError = HtmlTokenError;
class HtmlTokenizeResult {
    /**
     * @param {?} tokens
     * @param {?} errors
     */
    constructor(tokens, errors) {
        this.tokens = tokens;
        this.errors = errors;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        HtmlTokenizeResult.prototype.tokens;
        /** @type {?} */
        HtmlTokenizeResult.prototype.errors;
    }
}
exports.HtmlTokenizeResult = HtmlTokenizeResult;
/**
 * @param {?} sourceContent
 * @param {?} sourceUrl
 * @param {?=} tokenizeExpansionForms
 * @return {?}
 */
function tokenizeHtml(sourceContent, sourceUrl, tokenizeExpansionForms = false) {
    return new _HtmlTokenizer(new parse_util_1.ParseSourceFile(sourceContent, sourceUrl), tokenizeExpansionForms)
        .tokenize();
}
exports.tokenizeHtml = tokenizeHtml;
const /** @type {?} */ $EOF = 0;
const /** @type {?} */ $TAB = 9;
const /** @type {?} */ $LF = 10;
const /** @type {?} */ $FF = 12;
const /** @type {?} */ $CR = 13;
const /** @type {?} */ $SPACE = 32;
const /** @type {?} */ $BANG = 33;
const /** @type {?} */ $DQ = 34;
const /** @type {?} */ $HASH = 35;
const /** @type {?} */ $$ = 36;
const /** @type {?} */ $AMPERSAND = 38;
const /** @type {?} */ $SQ = 39;
const /** @type {?} */ $MINUS = 45;
const /** @type {?} */ $SLASH = 47;
const /** @type {?} */ $0 = 48;
const /** @type {?} */ $SEMICOLON = 59;
const /** @type {?} */ $9 = 57;
const /** @type {?} */ $COLON = 58;
const /** @type {?} */ $LT = 60;
const /** @type {?} */ $EQ = 61;
const /** @type {?} */ $GT = 62;
const /** @type {?} */ $QUESTION = 63;
const /** @type {?} */ $LBRACKET = 91;
const /** @type {?} */ $RBRACKET = 93;
const /** @type {?} */ $LBRACE = 123;
const /** @type {?} */ $RBRACE = 125;
const /** @type {?} */ $COMMA = 44;
const /** @type {?} */ $A = 65;
const /** @type {?} */ $F = 70;
const /** @type {?} */ $X = 88;
const /** @type {?} */ $Z = 90;
const /** @type {?} */ $a = 97;
const /** @type {?} */ $f = 102;
const /** @type {?} */ $z = 122;
const /** @type {?} */ $x = 120;
const /** @type {?} */ $NBSP = 160;
var /** @type {?} */ CR_OR_CRLF_REGEXP = /\r\n?/g;
/**
 * @param {?} charCode
 * @return {?}
 */
function unexpectedCharacterErrorMsg(charCode) {
    var /** @type {?} */ char = charCode === $EOF ? 'EOF' : lang_1.StringWrapper.fromCharCode(charCode);
    return `Unexpected character "${char}"`;
}
/**
 * @param {?} entitySrc
 * @return {?}
 */
function unknownEntityErrorMsg(entitySrc) {
    return `Unknown entity "${entitySrc}" - use the "&#<decimal>;" or  "&#x<hex>;" syntax`;
}
class ControlFlowError {
    /**
     * @param {?} error
     */
    constructor(error) {
        this.error = error;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ControlFlowError.prototype.error;
    }
}
// See http://www.w3.org/TR/html51/syntax.html#writing
class _HtmlTokenizer {
    /**
     * @param {?} file
     * @param {?} tokenizeExpansionForms
     */
    constructor(file, tokenizeExpansionForms) {
        this.file = file;
        this.tokenizeExpansionForms = tokenizeExpansionForms;
        this.peek = -1;
        this.nextPeek = -1;
        this.index = -1;
        this.line = 0;
        this.column = -1;
        this.expansionCaseStack = [];
        this.tokens = [];
        this.errors = [];
        this.input = file.content;
        this.length = file.content.length;
        this._advance();
    }
    /**
     * @param {?} content
     * @return {?}
     */
    _processCarriageReturns(content) {
        // http://www.w3.org/TR/html5/syntax.html#preprocessing-the-input-stream
        // In order to keep the original position in the source, we can not
        // pre-process it.
        // Instead CRs are processed right before instantiating the tokens.
        return lang_1.StringWrapper.replaceAll(content, CR_OR_CRLF_REGEXP, '\n');
    }
    /**
     * @return {?}
     */
    tokenize() {
        while (this.peek !== $EOF) {
            var /** @type {?} */ start = this._getLocation();
            try {
                if (this._attemptCharCode($LT)) {
                    if (this._attemptCharCode($BANG)) {
                        if (this._attemptCharCode($LBRACKET)) {
                            this._consumeCdata(start);
                        }
                        else if (this._attemptCharCode($MINUS)) {
                            this._consumeComment(start);
                        }
                        else {
                            this._consumeDocType(start);
                        }
                    }
                    else if (this._attemptCharCode($SLASH)) {
                        this._consumeTagClose(start);
                    }
                    else {
                        this._consumeTagOpen(start);
                    }
                }
                else if (isSpecialFormStart(this.peek, this.nextPeek) && this.tokenizeExpansionForms) {
                    this._consumeExpansionFormStart();
                }
                else if (this.peek === $EQ && this.tokenizeExpansionForms) {
                    this._consumeExpansionCaseStart();
                }
                else if (this.peek === $RBRACE && this.isInExpansionCase() &&
                    this.tokenizeExpansionForms) {
                    this._consumeExpansionCaseEnd();
                }
                else if (this.peek === $RBRACE && this.isInExpansionForm() &&
                    this.tokenizeExpansionForms) {
                    this._consumeExpansionFormEnd();
                }
                else {
                    this._consumeText();
                }
            }
            catch (e) {
                if (e instanceof ControlFlowError) {
                    this.errors.push(e.error);
                }
                else {
                    throw e;
                }
            }
        }
        this._beginToken(exports.HtmlTokenType.EOF);
        this._endToken([]);
        return new HtmlTokenizeResult(mergeTextTokens(this.tokens), this.errors);
    }
    /**
     * @return {?}
     */
    _getLocation() {
        return new parse_util_1.ParseLocation(this.file, this.index, this.line, this.column);
    }
    /**
     * @param {?=} start
     * @param {?=} end
     * @return {?}
     */
    _getSpan(start, end) {
        if (lang_1.isBlank(start)) {
            start = this._getLocation();
        }
        if (lang_1.isBlank(end)) {
            end = this._getLocation();
        }
        return new parse_util_1.ParseSourceSpan(start, end);
    }
    /**
     * @param {?} type
     * @param {?=} start
     * @return {?}
     */
    _beginToken(type, start = null) {
        if (lang_1.isBlank(start)) {
            start = this._getLocation();
        }
        this.currentTokenStart = start;
        this.currentTokenType = type;
    }
    /**
     * @param {?} parts
     * @param {?=} end
     * @return {?}
     */
    _endToken(parts, end = null) {
        if (lang_1.isBlank(end)) {
            end = this._getLocation();
        }
        var /** @type {?} */ token = new HtmlToken(this.currentTokenType, parts, new parse_util_1.ParseSourceSpan(this.currentTokenStart, end));
        this.tokens.push(token);
        this.currentTokenStart = null;
        this.currentTokenType = null;
        return token;
    }
    /**
     * @param {?} msg
     * @param {?} span
     * @return {?}
     */
    _createError(msg, span) {
        var /** @type {?} */ error = new HtmlTokenError(msg, this.currentTokenType, span);
        this.currentTokenStart = null;
        this.currentTokenType = null;
        return new ControlFlowError(error);
    }
    /**
     * @return {?}
     */
    _advance() {
        if (this.index >= this.length) {
            throw this._createError(unexpectedCharacterErrorMsg($EOF), this._getSpan());
        }
        if (this.peek === $LF) {
            this.line++;
            this.column = 0;
        }
        else if (this.peek !== $LF && this.peek !== $CR) {
            this.column++;
        }
        this.index++;
        this.peek = this.index >= this.length ? $EOF : lang_1.StringWrapper.charCodeAt(this.input, this.index);
        this.nextPeek =
            this.index + 1 >= this.length ? $EOF : lang_1.StringWrapper.charCodeAt(this.input, this.index + 1);
    }
    /**
     * @param {?} charCode
     * @return {?}
     */
    _attemptCharCode(charCode) {
        if (this.peek === charCode) {
            this._advance();
            return true;
        }
        return false;
    }
    /**
     * @param {?} charCode
     * @return {?}
     */
    _attemptCharCodeCaseInsensitive(charCode) {
        if (compareCharCodeCaseInsensitive(this.peek, charCode)) {
            this._advance();
            return true;
        }
        return false;
    }
    /**
     * @param {?} charCode
     * @return {?}
     */
    _requireCharCode(charCode) {
        var /** @type {?} */ location = this._getLocation();
        if (!this._attemptCharCode(charCode)) {
            throw this._createError(unexpectedCharacterErrorMsg(this.peek), this._getSpan(location, location));
        }
    }
    /**
     * @param {?} chars
     * @return {?}
     */
    _attemptStr(chars) {
        for (var /** @type {?} */ i = 0; i < chars.length; i++) {
            if (!this._attemptCharCode(lang_1.StringWrapper.charCodeAt(chars, i))) {
                return false;
            }
        }
        return true;
    }
    /**
     * @param {?} chars
     * @return {?}
     */
    _attemptStrCaseInsensitive(chars) {
        for (var /** @type {?} */ i = 0; i < chars.length; i++) {
            if (!this._attemptCharCodeCaseInsensitive(lang_1.StringWrapper.charCodeAt(chars, i))) {
                return false;
            }
        }
        return true;
    }
    /**
     * @param {?} chars
     * @return {?}
     */
    _requireStr(chars) {
        var /** @type {?} */ location = this._getLocation();
        if (!this._attemptStr(chars)) {
            throw this._createError(unexpectedCharacterErrorMsg(this.peek), this._getSpan(location));
        }
    }
    /**
     * @param {?} predicate
     * @return {?}
     */
    _attemptCharCodeUntilFn(predicate) {
        while (!predicate(this.peek)) {
            this._advance();
        }
    }
    /**
     * @param {?} predicate
     * @param {?} len
     * @return {?}
     */
    _requireCharCodeUntilFn(predicate, len) {
        var /** @type {?} */ start = this._getLocation();
        this._attemptCharCodeUntilFn(predicate);
        if (this.index - start.offset < len) {
            throw this._createError(unexpectedCharacterErrorMsg(this.peek), this._getSpan(start, start));
        }
    }
    /**
     * @param {?} char
     * @return {?}
     */
    _attemptUntilChar(char) {
        while (this.peek !== char) {
            this._advance();
        }
    }
    /**
     * @param {?} decodeEntities
     * @return {?}
     */
    _readChar(decodeEntities) {
        if (decodeEntities && this.peek === $AMPERSAND) {
            return this._decodeEntity();
        }
        else {
            var /** @type {?} */ index = this.index;
            this._advance();
            return this.input[index];
        }
    }
    /**
     * @return {?}
     */
    _decodeEntity() {
        var /** @type {?} */ start = this._getLocation();
        this._advance();
        if (this._attemptCharCode($HASH)) {
            let /** @type {?} */ isHex = this._attemptCharCode($x) || this._attemptCharCode($X);
            let /** @type {?} */ numberStart = this._getLocation().offset;
            this._attemptCharCodeUntilFn(isDigitEntityEnd);
            if (this.peek != $SEMICOLON) {
                throw this._createError(unexpectedCharacterErrorMsg(this.peek), this._getSpan());
            }
            this._advance();
            let /** @type {?} */ strNum = this.input.substring(numberStart, this.index - 1);
            try {
                let /** @type {?} */ charCode = lang_1.NumberWrapper.parseInt(strNum, isHex ? 16 : 10);
                return lang_1.StringWrapper.fromCharCode(charCode);
            }
            catch (e) {
                let /** @type {?} */ entity = this.input.substring(start.offset + 1, this.index - 1);
                throw this._createError(unknownEntityErrorMsg(entity), this._getSpan(start));
            }
        }
        else {
            let /** @type {?} */ startPosition = this._savePosition();
            this._attemptCharCodeUntilFn(isNamedEntityEnd);
            if (this.peek != $SEMICOLON) {
                this._restorePosition(startPosition);
                return '&';
            }
            this._advance();
            let /** @type {?} */ name = this.input.substring(start.offset + 1, this.index - 1);
            let /** @type {?} */ char = html_tags_1.NAMED_ENTITIES[name];
            if (lang_1.isBlank(char)) {
                throw this._createError(unknownEntityErrorMsg(name), this._getSpan(start));
            }
            return char;
        }
    }
    /**
     * @param {?} decodeEntities
     * @param {?} firstCharOfEnd
     * @param {?} attemptEndRest
     * @return {?}
     */
    _consumeRawText(decodeEntities, firstCharOfEnd, attemptEndRest) {
        var /** @type {?} */ tagCloseStart;
        var /** @type {?} */ textStart = this._getLocation();
        this._beginToken(decodeEntities ? exports.HtmlTokenType.ESCAPABLE_RAW_TEXT : exports.HtmlTokenType.RAW_TEXT, textStart);
        var /** @type {?} */ parts = [];
        while (true) {
            tagCloseStart = this._getLocation();
            if (this._attemptCharCode(firstCharOfEnd) && attemptEndRest()) {
                break;
            }
            if (this.index > tagCloseStart.offset) {
                parts.push(this.input.substring(tagCloseStart.offset, this.index));
            }
            while (this.peek !== firstCharOfEnd) {
                parts.push(this._readChar(decodeEntities));
            }
        }
        return this._endToken([this._processCarriageReturns(parts.join(''))], tagCloseStart);
    }
    /**
     * @param {?} start
     * @return {?}
     */
    _consumeComment(start) {
        this._beginToken(exports.HtmlTokenType.COMMENT_START, start);
        this._requireCharCode($MINUS);
        this._endToken([]);
        var /** @type {?} */ textToken = this._consumeRawText(false, $MINUS, () => this._attemptStr('->'));
        this._beginToken(exports.HtmlTokenType.COMMENT_END, textToken.sourceSpan.end);
        this._endToken([]);
    }
    /**
     * @param {?} start
     * @return {?}
     */
    _consumeCdata(start) {
        this._beginToken(exports.HtmlTokenType.CDATA_START, start);
        this._requireStr('CDATA[');
        this._endToken([]);
        var /** @type {?} */ textToken = this._consumeRawText(false, $RBRACKET, () => this._attemptStr(']>'));
        this._beginToken(exports.HtmlTokenType.CDATA_END, textToken.sourceSpan.end);
        this._endToken([]);
    }
    /**
     * @param {?} start
     * @return {?}
     */
    _consumeDocType(start) {
        this._beginToken(exports.HtmlTokenType.DOC_TYPE, start);
        this._attemptUntilChar($GT);
        this._advance();
        this._endToken([this.input.substring(start.offset + 2, this.index - 1)]);
    }
    /**
     * @return {?}
     */
    _consumePrefixAndName() {
        var /** @type {?} */ nameOrPrefixStart = this.index;
        var /** @type {?} */ prefix = null;
        while (this.peek !== $COLON && !isPrefixEnd(this.peek)) {
            this._advance();
        }
        var /** @type {?} */ nameStart;
        if (this.peek === $COLON) {
            this._advance();
            prefix = this.input.substring(nameOrPrefixStart, this.index - 1);
            nameStart = this.index;
        }
        else {
            nameStart = nameOrPrefixStart;
        }
        this._requireCharCodeUntilFn(isNameEnd, this.index === nameStart ? 1 : 0);
        var /** @type {?} */ name = this.input.substring(nameStart, this.index);
        return [prefix, name];
    }
    /**
     * @param {?} start
     * @return {?}
     */
    _consumeTagOpen(start) {
        let /** @type {?} */ savedPos = this._savePosition();
        let /** @type {?} */ lowercaseTagName;
        try {
            if (!isAsciiLetter(this.peek)) {
                throw this._createError(unexpectedCharacterErrorMsg(this.peek), this._getSpan());
            }
            var /** @type {?} */ nameStart = this.index;
            this._consumeTagOpenStart(start);
            lowercaseTagName = this.input.substring(nameStart, this.index).toLowerCase();
            this._attemptCharCodeUntilFn(isNotWhitespace);
            while (this.peek !== $SLASH && this.peek !== $GT) {
                this._consumeAttributeName();
                this._attemptCharCodeUntilFn(isNotWhitespace);
                if (this._attemptCharCode($EQ)) {
                    this._attemptCharCodeUntilFn(isNotWhitespace);
                    this._consumeAttributeValue();
                }
                this._attemptCharCodeUntilFn(isNotWhitespace);
            }
            this._consumeTagOpenEnd();
        }
        catch (e) {
            if (e instanceof ControlFlowError) {
                // When the start tag is invalid, assume we want a "<"
                this._restorePosition(savedPos);
                // Back to back text tokens are merged at the end
                this._beginToken(exports.HtmlTokenType.TEXT, start);
                this._endToken(['<']);
                return;
            }
            throw e;
        }
        var /** @type {?} */ contentTokenType = html_tags_1.getHtmlTagDefinition(lowercaseTagName).contentType;
        if (contentTokenType === html_tags_1.HtmlTagContentType.RAW_TEXT) {
            this._consumeRawTextWithTagClose(lowercaseTagName, false);
        }
        else if (contentTokenType === html_tags_1.HtmlTagContentType.ESCAPABLE_RAW_TEXT) {
            this._consumeRawTextWithTagClose(lowercaseTagName, true);
        }
    }
    /**
     * @param {?} lowercaseTagName
     * @param {?} decodeEntities
     * @return {?}
     */
    _consumeRawTextWithTagClose(lowercaseTagName, decodeEntities) {
        var /** @type {?} */ textToken = this._consumeRawText(decodeEntities, $LT, () => {
            if (!this._attemptCharCode($SLASH))
                return false;
            this._attemptCharCodeUntilFn(isNotWhitespace);
            if (!this._attemptStrCaseInsensitive(lowercaseTagName))
                return false;
            this._attemptCharCodeUntilFn(isNotWhitespace);
            if (!this._attemptCharCode($GT))
                return false;
            return true;
        });
        this._beginToken(exports.HtmlTokenType.TAG_CLOSE, textToken.sourceSpan.end);
        this._endToken([null, lowercaseTagName]);
    }
    /**
     * @param {?} start
     * @return {?}
     */
    _consumeTagOpenStart(start) {
        this._beginToken(exports.HtmlTokenType.TAG_OPEN_START, start);
        var /** @type {?} */ parts = this._consumePrefixAndName();
        this._endToken(parts);
    }
    /**
     * @return {?}
     */
    _consumeAttributeName() {
        this._beginToken(exports.HtmlTokenType.ATTR_NAME);
        var /** @type {?} */ prefixAndName = this._consumePrefixAndName();
        this._endToken(prefixAndName);
    }
    /**
     * @return {?}
     */
    _consumeAttributeValue() {
        this._beginToken(exports.HtmlTokenType.ATTR_VALUE);
        var /** @type {?} */ value;
        if (this.peek === $SQ || this.peek === $DQ) {
            var /** @type {?} */ quoteChar = this.peek;
            this._advance();
            var /** @type {?} */ parts = [];
            while (this.peek !== quoteChar) {
                parts.push(this._readChar(true));
            }
            value = parts.join('');
            this._advance();
        }
        else {
            var /** @type {?} */ valueStart = this.index;
            this._requireCharCodeUntilFn(isNameEnd, 1);
            value = this.input.substring(valueStart, this.index);
        }
        this._endToken([this._processCarriageReturns(value)]);
    }
    /**
     * @return {?}
     */
    _consumeTagOpenEnd() {
        var /** @type {?} */ tokenType = this._attemptCharCode($SLASH) ? exports.HtmlTokenType.TAG_OPEN_END_VOID :
            exports.HtmlTokenType.TAG_OPEN_END;
        this._beginToken(tokenType);
        this._requireCharCode($GT);
        this._endToken([]);
    }
    /**
     * @param {?} start
     * @return {?}
     */
    _consumeTagClose(start) {
        this._beginToken(exports.HtmlTokenType.TAG_CLOSE, start);
        this._attemptCharCodeUntilFn(isNotWhitespace);
        var /** @type {?} */ prefixAndName;
        prefixAndName = this._consumePrefixAndName();
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this._requireCharCode($GT);
        this._endToken(prefixAndName);
    }
    /**
     * @return {?}
     */
    _consumeExpansionFormStart() {
        this._beginToken(exports.HtmlTokenType.EXPANSION_FORM_START, this._getLocation());
        this._requireCharCode($LBRACE);
        this._endToken([]);
        this._beginToken(exports.HtmlTokenType.RAW_TEXT, this._getLocation());
        let /** @type {?} */ condition = this._readUntil($COMMA);
        this._endToken([condition], this._getLocation());
        this._requireCharCode($COMMA);
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this._beginToken(exports.HtmlTokenType.RAW_TEXT, this._getLocation());
        let /** @type {?} */ type = this._readUntil($COMMA);
        this._endToken([type], this._getLocation());
        this._requireCharCode($COMMA);
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this.expansionCaseStack.push(exports.HtmlTokenType.EXPANSION_FORM_START);
    }
    /**
     * @return {?}
     */
    _consumeExpansionCaseStart() {
        this._requireCharCode($EQ);
        this._beginToken(exports.HtmlTokenType.EXPANSION_CASE_VALUE, this._getLocation());
        let /** @type {?} */ value = this._readUntil($LBRACE).trim();
        this._endToken([value], this._getLocation());
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this._beginToken(exports.HtmlTokenType.EXPANSION_CASE_EXP_START, this._getLocation());
        this._requireCharCode($LBRACE);
        this._endToken([], this._getLocation());
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this.expansionCaseStack.push(exports.HtmlTokenType.EXPANSION_CASE_EXP_START);
    }
    /**
     * @return {?}
     */
    _consumeExpansionCaseEnd() {
        this._beginToken(exports.HtmlTokenType.EXPANSION_CASE_EXP_END, this._getLocation());
        this._requireCharCode($RBRACE);
        this._endToken([], this._getLocation());
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this.expansionCaseStack.pop();
    }
    /**
     * @return {?}
     */
    _consumeExpansionFormEnd() {
        this._beginToken(exports.HtmlTokenType.EXPANSION_FORM_END, this._getLocation());
        this._requireCharCode($RBRACE);
        this._endToken([]);
        this.expansionCaseStack.pop();
    }
    /**
     * @return {?}
     */
    _consumeText() {
        var /** @type {?} */ start = this._getLocation();
        this._beginToken(exports.HtmlTokenType.TEXT, start);
        var /** @type {?} */ parts = [];
        let /** @type {?} */ interpolation = false;
        if (this.peek === $LBRACE && this.nextPeek === $LBRACE) {
            parts.push(this._readChar(true));
            parts.push(this._readChar(true));
            interpolation = true;
        }
        else {
            parts.push(this._readChar(true));
        }
        while (!this.isTextEnd(interpolation)) {
            if (this.peek === $LBRACE && this.nextPeek === $LBRACE) {
                parts.push(this._readChar(true));
                parts.push(this._readChar(true));
                interpolation = true;
            }
            else if (this.peek === $RBRACE && this.nextPeek === $RBRACE && interpolation) {
                parts.push(this._readChar(true));
                parts.push(this._readChar(true));
                interpolation = false;
            }
            else {
                parts.push(this._readChar(true));
            }
        }
        this._endToken([this._processCarriageReturns(parts.join(''))]);
    }
    /**
     * @param {?} interpolation
     * @return {?}
     */
    isTextEnd(interpolation) {
        if (this.peek === $LT || this.peek === $EOF)
            return true;
        if (this.tokenizeExpansionForms) {
            if (isSpecialFormStart(this.peek, this.nextPeek))
                return true;
            if (this.peek === $RBRACE && !interpolation &&
                (this.isInExpansionCase() || this.isInExpansionForm()))
                return true;
        }
        return false;
    }
    /**
     * @return {?}
     */
    _savePosition() {
        return [this.peek, this.index, this.column, this.line, this.tokens.length];
    }
    /**
     * @param {?} char
     * @return {?}
     */
    _readUntil(char) {
        let /** @type {?} */ start = this.index;
        this._attemptUntilChar(char);
        return this.input.substring(start, this.index);
    }
    /**
     * @param {?} position
     * @return {?}
     */
    _restorePosition(position) {
        this.peek = position[0];
        this.index = position[1];
        this.column = position[2];
        this.line = position[3];
        let /** @type {?} */ nbTokens = position[4];
        if (nbTokens < this.tokens.length) {
            // remove any extra tokens
            this.tokens = collection_1.ListWrapper.slice(this.tokens, 0, nbTokens);
        }
    }
    /**
     * @return {?}
     */
    isInExpansionCase() {
        return this.expansionCaseStack.length > 0 &&
            this.expansionCaseStack[this.expansionCaseStack.length - 1] ===
                exports.HtmlTokenType.EXPANSION_CASE_EXP_START;
    }
    /**
     * @return {?}
     */
    isInExpansionForm() {
        return this.expansionCaseStack.length > 0 &&
            this.expansionCaseStack[this.expansionCaseStack.length - 1] ===
                exports.HtmlTokenType.EXPANSION_FORM_START;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _HtmlTokenizer.prototype.input;
        /** @type {?} */
        _HtmlTokenizer.prototype.length;
        /** @type {?} */
        _HtmlTokenizer.prototype.peek;
        /** @type {?} */
        _HtmlTokenizer.prototype.nextPeek;
        /** @type {?} */
        _HtmlTokenizer.prototype.index;
        /** @type {?} */
        _HtmlTokenizer.prototype.line;
        /** @type {?} */
        _HtmlTokenizer.prototype.column;
        /** @type {?} */
        _HtmlTokenizer.prototype.currentTokenStart;
        /** @type {?} */
        _HtmlTokenizer.prototype.currentTokenType;
        /** @type {?} */
        _HtmlTokenizer.prototype.expansionCaseStack;
        /** @type {?} */
        _HtmlTokenizer.prototype.tokens;
        /** @type {?} */
        _HtmlTokenizer.prototype.errors;
        /** @type {?} */
        _HtmlTokenizer.prototype.file;
        /** @type {?} */
        _HtmlTokenizer.prototype.tokenizeExpansionForms;
    }
}
/**
 * @param {?} code
 * @return {?}
 */
function isNotWhitespace(code) {
    return !isWhitespace(code) || code === $EOF;
}
/**
 * @param {?} code
 * @return {?}
 */
function isWhitespace(code) {
    return (code >= $TAB && code <= $SPACE) || (code === $NBSP);
}
/**
 * @param {?} code
 * @return {?}
 */
function isNameEnd(code) {
    return isWhitespace(code) || code === $GT || code === $SLASH || code === $SQ || code === $DQ ||
        code === $EQ;
}
/**
 * @param {?} code
 * @return {?}
 */
function isPrefixEnd(code) {
    return (code < $a || $z < code) && (code < $A || $Z < code) && (code < $0 || code > $9);
}
/**
 * @param {?} code
 * @return {?}
 */
function isDigitEntityEnd(code) {
    return code == $SEMICOLON || code == $EOF || !isAsciiHexDigit(code);
}
/**
 * @param {?} code
 * @return {?}
 */
function isNamedEntityEnd(code) {
    return code == $SEMICOLON || code == $EOF || !isAsciiLetter(code);
}
/**
 * @param {?} peek
 * @param {?} nextPeek
 * @return {?}
 */
function isSpecialFormStart(peek, nextPeek) {
    return peek === $LBRACE && nextPeek != $LBRACE;
}
/**
 * @param {?} code
 * @return {?}
 */
function isAsciiLetter(code) {
    return code >= $a && code <= $z || code >= $A && code <= $Z;
}
/**
 * @param {?} code
 * @return {?}
 */
function isAsciiHexDigit(code) {
    return code >= $a && code <= $f || code >= $A && code <= $F || code >= $0 && code <= $9;
}
/**
 * @param {?} code1
 * @param {?} code2
 * @return {?}
 */
function compareCharCodeCaseInsensitive(code1, code2) {
    return toUpperCaseCharCode(code1) == toUpperCaseCharCode(code2);
}
/**
 * @param {?} code
 * @return {?}
 */
function toUpperCaseCharCode(code) {
    return code >= $a && code <= $z ? code - $a + $A : code;
}
/**
 * @param {?} srcTokens
 * @return {?}
 */
function mergeTextTokens(srcTokens) {
    let /** @type {?} */ dstTokens = [];
    let /** @type {?} */ lastDstToken;
    for (let /** @type {?} */ i = 0; i < srcTokens.length; i++) {
        let /** @type {?} */ token = srcTokens[i];
        if (lang_1.isPresent(lastDstToken) && lastDstToken.type == exports.HtmlTokenType.TEXT &&
            token.type == exports.HtmlTokenType.TEXT) {
            lastDstToken.parts[0] += token.parts[0];
            lastDstToken.sourceSpan.end = token.sourceSpan.end;
        }
        else {
            lastDstToken = token;
            dstTokens.push(lastDstToken);
        }
    }
    return dstTokens;
}
//# sourceMappingURL=html_lexer.js.map