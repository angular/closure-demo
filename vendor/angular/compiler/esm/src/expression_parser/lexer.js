goog.module('_angular$compiler$src$expression__parser$lexer');
var core_1 = goog.require('_angular$core');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
exports.TokenType = {};
exports.TokenType.Character = 0;
exports.TokenType.Identifier = 1;
exports.TokenType.Keyword = 2;
exports.TokenType.String = 3;
exports.TokenType.Operator = 4;
exports.TokenType.Number = 5;
exports.TokenType[exports.TokenType.Character] = "Character";
exports.TokenType[exports.TokenType.Identifier] = "Identifier";
exports.TokenType[exports.TokenType.Keyword] = "Keyword";
exports.TokenType[exports.TokenType.String] = "String";
exports.TokenType[exports.TokenType.Operator] = "Operator";
exports.TokenType[exports.TokenType.Number] = "Number";
class Lexer {
    /**
     * @param {?} text
     * @return {?}
     */
    tokenize(text) {
        var /** @type {?} */ scanner = new _Scanner(text);
        var /** @type {?} */ tokens = [];
        var /** @type {?} */ token = scanner.scanToken();
        while (token != null) {
            tokens.push(token);
            token = scanner.scanToken();
        }
        return tokens;
    }
}
/** @nocollapse */ Lexer.decorators = [
    { type: core_1.Injectable },
];
exports.Lexer = Lexer;
class Token {
    /**
     * @param {?} index
     * @param {?} type
     * @param {?} numValue
     * @param {?} strValue
     */
    constructor(index, type, numValue, strValue) {
        this.index = index;
        this.type = type;
        this.numValue = numValue;
        this.strValue = strValue;
    }
    /**
     * @param {?} code
     * @return {?}
     */
    isCharacter(code) {
        return (this.type == exports.TokenType.Character && this.numValue == code);
    }
    /**
     * @return {?}
     */
    isNumber() { return (this.type == exports.TokenType.Number); }
    /**
     * @return {?}
     */
    isString() { return (this.type == exports.TokenType.String); }
    /**
     * @param {?} operater
     * @return {?}
     */
    isOperator(operater) {
        return (this.type == exports.TokenType.Operator && this.strValue == operater);
    }
    /**
     * @return {?}
     */
    isIdentifier() { return (this.type == exports.TokenType.Identifier); }
    /**
     * @return {?}
     */
    isKeyword() { return (this.type == exports.TokenType.Keyword); }
    /**
     * @return {?}
     */
    isKeywordDeprecatedVar() {
        return (this.type == exports.TokenType.Keyword && this.strValue == "var");
    }
    /**
     * @return {?}
     */
    isKeywordLet() { return (this.type == exports.TokenType.Keyword && this.strValue == "let"); }
    /**
     * @return {?}
     */
    isKeywordNull() { return (this.type == exports.TokenType.Keyword && this.strValue == "null"); }
    /**
     * @return {?}
     */
    isKeywordUndefined() {
        return (this.type == exports.TokenType.Keyword && this.strValue == "undefined");
    }
    /**
     * @return {?}
     */
    isKeywordTrue() { return (this.type == exports.TokenType.Keyword && this.strValue == "true"); }
    /**
     * @return {?}
     */
    isKeywordFalse() { return (this.type == exports.TokenType.Keyword && this.strValue == "false"); }
    /**
     * @return {?}
     */
    toNumber() {
        // -1 instead of NULL ok?
        return (this.type == exports.TokenType.Number) ? this.numValue : -1;
    }
    /**
     * @return {?}
     */
    toString() {
        switch (this.type) {
            case exports.TokenType.Character:
            case exports.TokenType.Identifier:
            case exports.TokenType.Keyword:
            case exports.TokenType.Operator:
            case exports.TokenType.String:
                return this.strValue;
            case exports.TokenType.Number:
                return this.numValue.toString();
            default:
                return null;
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        Token.prototype.index;
        /** @type {?} */
        Token.prototype.type;
        /** @type {?} */
        Token.prototype.numValue;
        /** @type {?} */
        Token.prototype.strValue;
    }
}
exports.Token = Token;
/**
 * @param {?} index
 * @param {?} code
 * @return {?}
 */
function newCharacterToken(index, code) {
    return new Token(index, exports.TokenType.Character, code, lang_1.StringWrapper.fromCharCode(code));
}
/**
 * @param {?} index
 * @param {?} text
 * @return {?}
 */
function newIdentifierToken(index, text) {
    return new Token(index, exports.TokenType.Identifier, 0, text);
}
/**
 * @param {?} index
 * @param {?} text
 * @return {?}
 */
function newKeywordToken(index, text) {
    return new Token(index, exports.TokenType.Keyword, 0, text);
}
/**
 * @param {?} index
 * @param {?} text
 * @return {?}
 */
function newOperatorToken(index, text) {
    return new Token(index, exports.TokenType.Operator, 0, text);
}
/**
 * @param {?} index
 * @param {?} text
 * @return {?}
 */
function newStringToken(index, text) {
    return new Token(index, exports.TokenType.String, 0, text);
}
/**
 * @param {?} index
 * @param {?} n
 * @return {?}
 */
function newNumberToken(index, n) {
    return new Token(index, exports.TokenType.Number, n, "");
}
exports.EOF = new Token(-1, exports.TokenType.Character, 0, "");
exports.$EOF = 0;
exports.$TAB = 9;
exports.$LF = 10;
exports.$VTAB = 11;
exports.$FF = 12;
exports.$CR = 13;
exports.$SPACE = 32;
exports.$BANG = 33;
exports.$DQ = 34;
exports.$HASH = 35;
exports.$$ = 36;
exports.$PERCENT = 37;
exports.$AMPERSAND = 38;
exports.$SQ = 39;
exports.$LPAREN = 40;
exports.$RPAREN = 41;
exports.$STAR = 42;
exports.$PLUS = 43;
exports.$COMMA = 44;
exports.$MINUS = 45;
exports.$PERIOD = 46;
exports.$SLASH = 47;
exports.$COLON = 58;
exports.$SEMICOLON = 59;
exports.$LT = 60;
exports.$EQ = 61;
exports.$GT = 62;
exports.$QUESTION = 63;
const /** @type {?} */ $0 = 48;
const /** @type {?} */ $9 = 57;
const /** @type {?} */ $A = 65, /** @type {?} */ $E = 69, /** @type {?} */ $Z = 90;
exports.$LBRACKET = 91;
exports.$BACKSLASH = 92;
exports.$RBRACKET = 93;
const /** @type {?} */ $CARET = 94;
const /** @type {?} */ $_ = 95;
exports.$BT = 96;
const /** @type {?} */ $a = 97, /** @type {?} */ $e = 101, /** @type {?} */ $f = 102;
const /** @type {?} */ $n = 110, /** @type {?} */ $r = 114, /** @type {?} */ $t = 116, /** @type {?} */ $u = 117, /** @type {?} */ $v = 118, /** @type {?} */ $z = 122;
exports.$LBRACE = 123;
exports.$BAR = 124;
exports.$RBRACE = 125;
const /** @type {?} */ $NBSP = 160;
class ScannerError extends exceptions_1.BaseException {
    /**
     * @param {?} message
     */
    constructor(message) {
        super();
        this.message = message;
    }
    /**
     * @return {?}
     */
    toString() { return this.message; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ScannerError.prototype.message;
    }
}
exports.ScannerError = ScannerError;
class _Scanner {
    /**
     * @param {?} input
     */
    constructor(input) {
        this.input = input;
        this.peek = 0;
        this.index = -1;
        this.length = input.length;
        this.advance();
    }
    /**
     * @return {?}
     */
    advance() {
        this.peek =
            ++this.index >= this.length ? exports.$EOF : lang_1.StringWrapper.charCodeAt(this.input, this.index);
    }
    /**
     * @return {?}
     */
    scanToken() {
        var /** @type {?} */ input = this.input, /** @type {?} */ length = this.length, /** @type {?} */ peek = this.peek, /** @type {?} */ index = this.index;
        // Skip whitespace.
        while (peek <= exports.$SPACE) {
            if (++index >= length) {
                peek = exports.$EOF;
                break;
            }
            else {
                peek = lang_1.StringWrapper.charCodeAt(input, index);
            }
        }
        this.peek = peek;
        this.index = index;
        if (index >= length) {
            return null;
        }
        // Handle identifiers and numbers.
        if (isIdentifierStart(peek))
            return this.scanIdentifier();
        if (isDigit(peek))
            return this.scanNumber(index);
        var /** @type {?} */ start = index;
        switch (peek) {
            case exports.$PERIOD:
                this.advance();
                return isDigit(this.peek) ? this.scanNumber(start) : newCharacterToken(start, exports.$PERIOD);
            case exports.$LPAREN:
            case exports.$RPAREN:
            case exports.$LBRACE:
            case exports.$RBRACE:
            case exports.$LBRACKET:
            case exports.$RBRACKET:
            case exports.$COMMA:
            case exports.$COLON:
            case exports.$SEMICOLON:
                return this.scanCharacter(start, peek);
            case exports.$SQ:
            case exports.$DQ:
                return this.scanString();
            case exports.$HASH:
            case exports.$PLUS:
            case exports.$MINUS:
            case exports.$STAR:
            case exports.$SLASH:
            case exports.$PERCENT:
            case $CARET:
                return this.scanOperator(start, lang_1.StringWrapper.fromCharCode(peek));
            case exports.$QUESTION:
                return this.scanComplexOperator(start, '?', exports.$PERIOD, '.');
            case exports.$LT:
            case exports.$GT:
                return this.scanComplexOperator(start, lang_1.StringWrapper.fromCharCode(peek), exports.$EQ, '=');
            case exports.$BANG:
            case exports.$EQ:
                return this.scanComplexOperator(start, lang_1.StringWrapper.fromCharCode(peek), exports.$EQ, '=', exports.$EQ, '=');
            case exports.$AMPERSAND:
                return this.scanComplexOperator(start, '&', exports.$AMPERSAND, '&');
            case exports.$BAR:
                return this.scanComplexOperator(start, '|', exports.$BAR, '|');
            case $NBSP:
                while (isWhitespace(this.peek))
                    this.advance();
                return this.scanToken();
        }
        this.error(`Unexpected character [${lang_1.StringWrapper.fromCharCode(peek)}]`, 0);
        return null;
    }
    /**
     * @param {?} start
     * @param {?} code
     * @return {?}
     */
    scanCharacter(start, code) {
        this.advance();
        return newCharacterToken(start, code);
    }
    /**
     * @param {?} start
     * @param {?} str
     * @return {?}
     */
    scanOperator(start, str) {
        this.advance();
        return newOperatorToken(start, str);
    }
    /**
     *  Tokenize a 2/3 char long operator *
     * @returns {Token}
     * @param {?} start start index in the expression
     * @param {?} one first symbol (always part of the operator)
     * @param {?} twoCode code point for the second symbol
     * @param {?} two second symbol (part of the operator when the second code point matches)
     * @param {?=} threeCode code point for the third symbol
     * @param {?=} three third symbol (part of the operator when provided and matches source expression)
     * @return {?}
     */
    scanComplexOperator(start, one, twoCode, two, threeCode, three) {
        this.advance();
        var /** @type {?} */ str = one;
        if (this.peek == twoCode) {
            this.advance();
            str += two;
        }
        if (lang_1.isPresent(threeCode) && this.peek == threeCode) {
            this.advance();
            str += three;
        }
        return newOperatorToken(start, str);
    }
    /**
     * @return {?}
     */
    scanIdentifier() {
        var /** @type {?} */ start = this.index;
        this.advance();
        while (isIdentifierPart(this.peek))
            this.advance();
        var /** @type {?} */ str = this.input.substring(start, this.index);
        if (collection_1.SetWrapper.has(KEYWORDS, str)) {
            return newKeywordToken(start, str);
        }
        else {
            return newIdentifierToken(start, str);
        }
    }
    /**
     * @param {?} start
     * @return {?}
     */
    scanNumber(start) {
        var /** @type {?} */ simple = (this.index === start);
        this.advance(); // Skip initial digit.
        while (true) {
            if (isDigit(this.peek)) {
            }
            else if (this.peek == exports.$PERIOD) {
                simple = false;
            }
            else if (isExponentStart(this.peek)) {
                this.advance();
                if (isExponentSign(this.peek))
                    this.advance();
                if (!isDigit(this.peek))
                    this.error('Invalid exponent', -1);
                simple = false;
            }
            else {
                break;
            }
            this.advance();
        }
        var /** @type {?} */ str = this.input.substring(start, this.index);
        // TODO
        var /** @type {?} */ value = simple ? lang_1.NumberWrapper.parseIntAutoRadix(str) : lang_1.NumberWrapper.parseFloat(str);
        return newNumberToken(start, value);
    }
    /**
     * @return {?}
     */
    scanString() {
        var /** @type {?} */ start = this.index;
        var /** @type {?} */ quote = this.peek;
        this.advance(); // Skip initial quote.
        var /** @type {?} */ buffer;
        var /** @type {?} */ marker = this.index;
        var /** @type {?} */ input = this.input;
        while (this.peek != quote) {
            if (this.peek == exports.$BACKSLASH) {
                if (buffer == null)
                    buffer = new lang_1.StringJoiner();
                buffer.add(input.substring(marker, this.index));
                this.advance();
                var /** @type {?} */ unescapedCode;
                if (this.peek == $u) {
                    // 4 character hex code for unicode character.
                    var /** @type {?} */ hex = input.substring(this.index + 1, this.index + 5);
                    try {
                        unescapedCode = lang_1.NumberWrapper.parseInt(hex, 16);
                    }
                    catch (e) {
                        this.error(`Invalid unicode escape [\\u${hex}]`, 0);
                    }
                    for (var /** @type {?} */ i = 0; i < 5; i++) {
                        this.advance();
                    }
                }
                else {
                    unescapedCode = unescape(this.peek);
                    this.advance();
                }
                buffer.add(lang_1.StringWrapper.fromCharCode(unescapedCode));
                marker = this.index;
            }
            else if (this.peek == exports.$EOF) {
                this.error('Unterminated quote', 0);
            }
            else {
                this.advance();
            }
        }
        var /** @type {?} */ last = input.substring(marker, this.index);
        this.advance(); // Skip terminating quote.
        // Compute the unescaped string value.
        var /** @type {?} */ unescaped = last;
        if (buffer != null) {
            buffer.add(last);
            unescaped = buffer.toString();
        }
        return newStringToken(start, unescaped);
    }
    /**
     * @param {?} message
     * @param {?} offset
     * @return {?}
     */
    error(message, offset) {
        var /** @type {?} */ position = this.index + offset;
        throw new ScannerError(`Lexer Error: ${message} at column ${position} in expression [${this.input}]`);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _Scanner.prototype.length;
        /** @type {?} */
        _Scanner.prototype.peek;
        /** @type {?} */
        _Scanner.prototype.index;
        /** @type {?} */
        _Scanner.prototype.input;
    }
}
/**
 * @param {?} code
 * @return {?}
 */
function isWhitespace(code) {
    return (code >= exports.$TAB && code <= exports.$SPACE) || (code == $NBSP);
}
/**
 * @param {?} code
 * @return {?}
 */
function isIdentifierStart(code) {
    return ($a <= code && code <= $z) || ($A <= code && code <= $Z) || (code == $_) || (code == exports.$$);
}
/**
 * @param {?} input
 * @return {?}
 */
function isIdentifier(input) {
    if (input.length == 0)
        return false;
    var /** @type {?} */ scanner = new _Scanner(input);
    if (!isIdentifierStart(scanner.peek))
        return false;
    scanner.advance();
    while (scanner.peek !== exports.$EOF) {
        if (!isIdentifierPart(scanner.peek))
            return false;
        scanner.advance();
    }
    return true;
}
exports.isIdentifier = isIdentifier;
/**
 * @param {?} code
 * @return {?}
 */
function isIdentifierPart(code) {
    return ($a <= code && code <= $z) || ($A <= code && code <= $Z) || ($0 <= code && code <= $9) ||
        (code == $_) || (code == exports.$$);
}
/**
 * @param {?} code
 * @return {?}
 */
function isDigit(code) {
    return $0 <= code && code <= $9;
}
/**
 * @param {?} code
 * @return {?}
 */
function isExponentStart(code) {
    return code == $e || code == $E;
}
/**
 * @param {?} code
 * @return {?}
 */
function isExponentSign(code) {
    return code == exports.$MINUS || code == exports.$PLUS;
}
/**
 * @param {?} code
 * @return {?}
 */
function isQuote(code) {
    return code === exports.$SQ || code === exports.$DQ || code === exports.$BT;
}
exports.isQuote = isQuote;
/**
 * @param {?} code
 * @return {?}
 */
function unescape(code) {
    switch (code) {
        case $n:
            return exports.$LF;
        case $f:
            return exports.$FF;
        case $r:
            return exports.$CR;
        case $t:
            return exports.$TAB;
        case $v:
            return exports.$VTAB;
        default:
            return code;
    }
}
var /** @type {?} */ OPERATORS = collection_1.SetWrapper.createFromList([
    '+',
    '-',
    '*',
    '/',
    '%',
    '^',
    '=',
    '==',
    '!=',
    '===',
    '!==',
    '<',
    '>',
    '<=',
    '>=',
    '&&',
    '||',
    '&',
    '|',
    '!',
    '?',
    '#',
    '?.'
]);
var /** @type {?} */ KEYWORDS = collection_1.SetWrapper.createFromList(['var', 'let', 'null', 'undefined', 'true', 'false', 'if', 'else']);
//# sourceMappingURL=lexer.js.map