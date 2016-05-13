goog.module('_angular$compiler$src$expression__parser$parser');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var lexer_1 = goog.require('_angular$compiler$src$expression__parser$lexer');
var ast_1 = goog.require('_angular$compiler$src$expression__parser$ast');
var /** @type {?} */ _implicitReceiver = new ast_1.ImplicitReceiver();
// TODO(tbosch): Cannot make this const/final right now because of the transpiler...
var /** @type {?} */ INTERPOLATION_REGEXP = /\{\{([\s\S]*?)\}\}/g;
class ParseException extends exceptions_1.BaseException {
    /**
     * @param {?} message
     * @param {?} input
     * @param {?} errLocation
     * @param {?=} ctxLocation
     */
    constructor(message, input, errLocation, ctxLocation) {
        super(`Parser Error: ${message} ${errLocation} [${input}] in ${ctxLocation}`);
    }
}
class SplitInterpolation {
    /**
     * @param {?} strings
     * @param {?} expressions
     */
    constructor(strings, expressions) {
        this.strings = strings;
        this.expressions = expressions;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SplitInterpolation.prototype.strings;
        /** @type {?} */
        SplitInterpolation.prototype.expressions;
    }
}
exports.SplitInterpolation = SplitInterpolation;
class TemplateBindingParseResult {
    /**
     * @param {?} templateBindings
     * @param {?} warnings
     */
    constructor(templateBindings, warnings) {
        this.templateBindings = templateBindings;
        this.warnings = warnings;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TemplateBindingParseResult.prototype.templateBindings;
        /** @type {?} */
        TemplateBindingParseResult.prototype.warnings;
    }
}
exports.TemplateBindingParseResult = TemplateBindingParseResult;
class Parser {
    /**
     * @param {?} _lexer
     */
    constructor(_lexer) {
        this._lexer = _lexer;
    }
    /**
     * @param {?} input
     * @param {?} location
     * @return {?}
     */
    parseAction(input, location) {
        this._checkNoInterpolation(input, location);
        var /** @type {?} */ tokens = this._lexer.tokenize(this._stripComments(input));
        var /** @type {?} */ ast = new _ParseAST(input, location, tokens, true).parseChain();
        return new ast_1.ASTWithSource(ast, input, location);
    }
    /**
     * @param {?} input
     * @param {?} location
     * @return {?}
     */
    parseBinding(input, location) {
        var /** @type {?} */ ast = this._parseBindingAst(input, location);
        return new ast_1.ASTWithSource(ast, input, location);
    }
    /**
     * @param {?} input
     * @param {?} location
     * @return {?}
     */
    parseSimpleBinding(input, location) {
        var /** @type {?} */ ast = this._parseBindingAst(input, location);
        if (!SimpleExpressionChecker.check(ast)) {
            throw new ParseException('Host binding expression can only contain field access and constants', input, location);
        }
        return new ast_1.ASTWithSource(ast, input, location);
    }
    /**
     * @param {?} input
     * @param {?} location
     * @return {?}
     */
    _parseBindingAst(input, location) {
        // Quotes expressions use 3rd-party expression language. We don't want to use
        // our lexer or parser for that, so we check for that ahead of time.
        var /** @type {?} */ quote = this._parseQuote(input, location);
        if (lang_1.isPresent(quote)) {
            return quote;
        }
        this._checkNoInterpolation(input, location);
        var /** @type {?} */ tokens = this._lexer.tokenize(this._stripComments(input));
        return new _ParseAST(input, location, tokens, false).parseChain();
    }
    /**
     * @param {?} input
     * @param {?} location
     * @return {?}
     */
    _parseQuote(input, location) {
        if (lang_1.isBlank(input))
            return null;
        var /** @type {?} */ prefixSeparatorIndex = input.indexOf(':');
        if (prefixSeparatorIndex == -1)
            return null;
        var /** @type {?} */ prefix = input.substring(0, prefixSeparatorIndex).trim();
        if (!lexer_1.isIdentifier(prefix))
            return null;
        var /** @type {?} */ uninterpretedExpression = input.substring(prefixSeparatorIndex + 1);
        return new ast_1.Quote(prefix, uninterpretedExpression, location);
    }
    /**
     * @param {?} input
     * @param {?} location
     * @return {?}
     */
    parseTemplateBindings(input, location) {
        var /** @type {?} */ tokens = this._lexer.tokenize(input);
        return new _ParseAST(input, location, tokens, false).parseTemplateBindings();
    }
    /**
     * @param {?} input
     * @param {?} location
     * @return {?}
     */
    parseInterpolation(input, location) {
        let /** @type {?} */ split = this.splitInterpolation(input, location);
        if (split == null)
            return null;
        let /** @type {?} */ expressions = [];
        for (let /** @type {?} */ i = 0; i < split.expressions.length; ++i) {
            var /** @type {?} */ tokens = this._lexer.tokenize(this._stripComments(split.expressions[i]));
            var /** @type {?} */ ast = new _ParseAST(input, location, tokens, false).parseChain();
            expressions.push(ast);
        }
        return new ast_1.ASTWithSource(new ast_1.Interpolation(split.strings, expressions), input, location);
    }
    /**
     * @param {?} input
     * @param {?} location
     * @return {?}
     */
    splitInterpolation(input, location) {
        var /** @type {?} */ parts = lang_1.StringWrapper.split(input, INTERPOLATION_REGEXP);
        if (parts.length <= 1) {
            return null;
        }
        var /** @type {?} */ strings = [];
        var /** @type {?} */ expressions = [];
        for (var /** @type {?} */ i = 0; i < parts.length; i++) {
            var /** @type {?} */ part = parts[i];
            if (i % 2 === 0) {
                // fixed string
                strings.push(part);
            }
            else if (part.trim().length > 0) {
                expressions.push(part);
            }
            else {
                throw new ParseException('Blank expressions are not allowed in interpolated strings', input, `at column ${this._findInterpolationErrorColumn(parts, i)} in`, location);
            }
        }
        return new SplitInterpolation(strings, expressions);
    }
    /**
     * @param {?} input
     * @param {?} location
     * @return {?}
     */
    wrapLiteralPrimitive(input, location) {
        return new ast_1.ASTWithSource(new ast_1.LiteralPrimitive(input), input, location);
    }
    /**
     * @param {?} input
     * @return {?}
     */
    _stripComments(input) {
        let /** @type {?} */ i = this._commentStart(input);
        return lang_1.isPresent(i) ? input.substring(0, i).trim() : input;
    }
    /**
     * @param {?} input
     * @return {?}
     */
    _commentStart(input) {
        var /** @type {?} */ outerQuote = null;
        for (var /** @type {?} */ i = 0; i < input.length - 1; i++) {
            let /** @type {?} */ char = lang_1.StringWrapper.charCodeAt(input, i);
            let /** @type {?} */ nextChar = lang_1.StringWrapper.charCodeAt(input, i + 1);
            if (char === lexer_1.$SLASH && nextChar == lexer_1.$SLASH && lang_1.isBlank(outerQuote))
                return i;
            if (outerQuote === char) {
                outerQuote = null;
            }
            else if (lang_1.isBlank(outerQuote) && lexer_1.isQuote(char)) {
                outerQuote = char;
            }
        }
        return null;
    }
    /**
     * @param {?} input
     * @param {?} location
     * @return {?}
     */
    _checkNoInterpolation(input, location) {
        var /** @type {?} */ parts = lang_1.StringWrapper.split(input, INTERPOLATION_REGEXP);
        if (parts.length > 1) {
            throw new ParseException('Got interpolation ({{}}) where expression was expected', input, `at column ${this._findInterpolationErrorColumn(parts, 1)} in`, location);
        }
    }
    /**
     * @param {?} parts
     * @param {?} partInErrIdx
     * @return {?}
     */
    _findInterpolationErrorColumn(parts, partInErrIdx) {
        var /** @type {?} */ errLocation = '';
        for (var /** @type {?} */ j = 0; j < partInErrIdx; j++) {
            errLocation += j % 2 === 0 ? parts[j] : `{{${parts[j]}}}`;
        }
        return errLocation.length;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        Parser.prototype._lexer;
    }
}
/** @nocollapse */ Parser.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ Parser.ctorParameters = [
    { type: lexer_1.Lexer, },
];
exports.Parser = Parser;
class _ParseAST {
    /**
     * @param {?} input
     * @param {?} location
     * @param {?} tokens
     * @param {?} parseAction
     */
    constructor(input, location, tokens, parseAction) {
        this.input = input;
        this.location = location;
        this.tokens = tokens;
        this.parseAction = parseAction;
        this.index = 0;
    }
    /**
     * @param {?} offset
     * @return {?}
     */
    peek(offset) {
        var /** @type {?} */ i = this.index + offset;
        return i < this.tokens.length ? this.tokens[i] : lexer_1.EOF;
    }
    get next() { return this.peek(0); }
    get inputIndex() {
        return (this.index < this.tokens.length) ? this.next.index : this.input.length;
    }
    /**
     * @return {?}
     */
    advance() { this.index++; }
    /**
     * @param {?} code
     * @return {?}
     */
    optionalCharacter(code) {
        if (this.next.isCharacter(code)) {
            this.advance();
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @return {?}
     */
    peekKeywordLet() { return this.next.isKeywordLet(); }
    /**
     * @return {?}
     */
    peekDeprecatedKeywordVar() { return this.next.isKeywordDeprecatedVar(); }
    /**
     * @return {?}
     */
    peekDeprecatedOperatorHash() { return this.next.isOperator('#'); }
    /**
     * @param {?} code
     * @return {?}
     */
    expectCharacter(code) {
        if (this.optionalCharacter(code))
            return;
        this.error(`Missing expected ${lang_1.StringWrapper.fromCharCode(code)}`);
    }
    /**
     * @param {?} op
     * @return {?}
     */
    optionalOperator(op) {
        if (this.next.isOperator(op)) {
            this.advance();
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} operator
     * @return {?}
     */
    expectOperator(operator) {
        if (this.optionalOperator(operator))
            return;
        this.error(`Missing expected operator ${operator}`);
    }
    /**
     * @return {?}
     */
    expectIdentifierOrKeyword() {
        var /** @type {?} */ n = this.next;
        if (!n.isIdentifier() && !n.isKeyword()) {
            this.error(`Unexpected token ${n}, expected identifier or keyword`);
        }
        this.advance();
        return n.toString();
    }
    /**
     * @return {?}
     */
    expectIdentifierOrKeywordOrString() {
        var /** @type {?} */ n = this.next;
        if (!n.isIdentifier() && !n.isKeyword() && !n.isString()) {
            this.error(`Unexpected token ${n}, expected identifier, keyword, or string`);
        }
        this.advance();
        return n.toString();
    }
    /**
     * @return {?}
     */
    parseChain() {
        var /** @type {?} */ exprs = [];
        while (this.index < this.tokens.length) {
            var /** @type {?} */ expr = this.parsePipe();
            exprs.push(expr);
            if (this.optionalCharacter(lexer_1.$SEMICOLON)) {
                if (!this.parseAction) {
                    this.error("Binding expression cannot contain chained expression");
                }
                while (this.optionalCharacter(lexer_1.$SEMICOLON)) {
                } // read all semicolons
            }
            else if (this.index < this.tokens.length) {
                this.error(`Unexpected token '${this.next}'`);
            }
        }
        if (exprs.length == 0)
            return new ast_1.EmptyExpr();
        if (exprs.length == 1)
            return exprs[0];
        return new ast_1.Chain(exprs);
    }
    /**
     * @return {?}
     */
    parsePipe() {
        var /** @type {?} */ result = this.parseExpression();
        if (this.optionalOperator("|")) {
            if (this.parseAction) {
                this.error("Cannot have a pipe in an action expression");
            }
            do {
                var /** @type {?} */ name = this.expectIdentifierOrKeyword();
                var /** @type {?} */ args = [];
                while (this.optionalCharacter(lexer_1.$COLON)) {
                    args.push(this.parseExpression());
                }
                result = new ast_1.BindingPipe(result, name, args);
            } while (this.optionalOperator("|"));
        }
        return result;
    }
    /**
     * @return {?}
     */
    parseExpression() { return this.parseConditional(); }
    /**
     * @return {?}
     */
    parseConditional() {
        var /** @type {?} */ start = this.inputIndex;
        var /** @type {?} */ result = this.parseLogicalOr();
        if (this.optionalOperator('?')) {
            var /** @type {?} */ yes = this.parsePipe();
            if (!this.optionalCharacter(lexer_1.$COLON)) {
                var /** @type {?} */ end = this.inputIndex;
                var /** @type {?} */ expression = this.input.substring(start, end);
                this.error(`Conditional expression ${expression} requires all 3 expressions`);
            }
            var /** @type {?} */ no = this.parsePipe();
            return new ast_1.Conditional(result, yes, no);
        }
        else {
            return result;
        }
    }
    /**
     * @return {?}
     */
    parseLogicalOr() {
        // '||'
        var /** @type {?} */ result = this.parseLogicalAnd();
        while (this.optionalOperator('||')) {
            result = new ast_1.Binary('||', result, this.parseLogicalAnd());
        }
        return result;
    }
    /**
     * @return {?}
     */
    parseLogicalAnd() {
        // '&&'
        var /** @type {?} */ result = this.parseEquality();
        while (this.optionalOperator('&&')) {
            result = new ast_1.Binary('&&', result, this.parseEquality());
        }
        return result;
    }
    /**
     * @return {?}
     */
    parseEquality() {
        // '==','!=','===','!=='
        var /** @type {?} */ result = this.parseRelational();
        while (true) {
            if (this.optionalOperator('==')) {
                result = new ast_1.Binary('==', result, this.parseRelational());
            }
            else if (this.optionalOperator('===')) {
                result = new ast_1.Binary('===', result, this.parseRelational());
            }
            else if (this.optionalOperator('!=')) {
                result = new ast_1.Binary('!=', result, this.parseRelational());
            }
            else if (this.optionalOperator('!==')) {
                result = new ast_1.Binary('!==', result, this.parseRelational());
            }
            else {
                return result;
            }
        }
    }
    /**
     * @return {?}
     */
    parseRelational() {
        // '<', '>', '<=', '>='
        var /** @type {?} */ result = this.parseAdditive();
        while (true) {
            if (this.optionalOperator('<')) {
                result = new ast_1.Binary('<', result, this.parseAdditive());
            }
            else if (this.optionalOperator('>')) {
                result = new ast_1.Binary('>', result, this.parseAdditive());
            }
            else if (this.optionalOperator('<=')) {
                result = new ast_1.Binary('<=', result, this.parseAdditive());
            }
            else if (this.optionalOperator('>=')) {
                result = new ast_1.Binary('>=', result, this.parseAdditive());
            }
            else {
                return result;
            }
        }
    }
    /**
     * @return {?}
     */
    parseAdditive() {
        // '+', '-'
        var /** @type {?} */ result = this.parseMultiplicative();
        while (true) {
            if (this.optionalOperator('+')) {
                result = new ast_1.Binary('+', result, this.parseMultiplicative());
            }
            else if (this.optionalOperator('-')) {
                result = new ast_1.Binary('-', result, this.parseMultiplicative());
            }
            else {
                return result;
            }
        }
    }
    /**
     * @return {?}
     */
    parseMultiplicative() {
        // '*', '%', '/'
        var /** @type {?} */ result = this.parsePrefix();
        while (true) {
            if (this.optionalOperator('*')) {
                result = new ast_1.Binary('*', result, this.parsePrefix());
            }
            else if (this.optionalOperator('%')) {
                result = new ast_1.Binary('%', result, this.parsePrefix());
            }
            else if (this.optionalOperator('/')) {
                result = new ast_1.Binary('/', result, this.parsePrefix());
            }
            else {
                return result;
            }
        }
    }
    /**
     * @return {?}
     */
    parsePrefix() {
        if (this.optionalOperator('+')) {
            return this.parsePrefix();
        }
        else if (this.optionalOperator('-')) {
            return new ast_1.Binary('-', new ast_1.LiteralPrimitive(0), this.parsePrefix());
        }
        else if (this.optionalOperator('!')) {
            return new ast_1.PrefixNot(this.parsePrefix());
        }
        else {
            return this.parseCallChain();
        }
    }
    /**
     * @return {?}
     */
    parseCallChain() {
        var /** @type {?} */ result = this.parsePrimary();
        while (true) {
            if (this.optionalCharacter(lexer_1.$PERIOD)) {
                result = this.parseAccessMemberOrMethodCall(result, false);
            }
            else if (this.optionalOperator('?.')) {
                result = this.parseAccessMemberOrMethodCall(result, true);
            }
            else if (this.optionalCharacter(lexer_1.$LBRACKET)) {
                var /** @type {?} */ key = this.parsePipe();
                this.expectCharacter(lexer_1.$RBRACKET);
                if (this.optionalOperator("=")) {
                    var /** @type {?} */ value = this.parseConditional();
                    result = new ast_1.KeyedWrite(result, key, value);
                }
                else {
                    result = new ast_1.KeyedRead(result, key);
                }
            }
            else if (this.optionalCharacter(lexer_1.$LPAREN)) {
                var /** @type {?} */ args = this.parseCallArguments();
                this.expectCharacter(lexer_1.$RPAREN);
                result = new ast_1.FunctionCall(result, args);
            }
            else {
                return result;
            }
        }
    }
    /**
     * @return {?}
     */
    parsePrimary() {
        if (this.optionalCharacter(lexer_1.$LPAREN)) {
            let /** @type {?} */ result = this.parsePipe();
            this.expectCharacter(lexer_1.$RPAREN);
            return result;
        }
        else if (this.next.isKeywordNull() || this.next.isKeywordUndefined()) {
            this.advance();
            return new ast_1.LiteralPrimitive(null);
        }
        else if (this.next.isKeywordTrue()) {
            this.advance();
            return new ast_1.LiteralPrimitive(true);
        }
        else if (this.next.isKeywordFalse()) {
            this.advance();
            return new ast_1.LiteralPrimitive(false);
        }
        else if (this.optionalCharacter(lexer_1.$LBRACKET)) {
            var /** @type {?} */ elements = this.parseExpressionList(lexer_1.$RBRACKET);
            this.expectCharacter(lexer_1.$RBRACKET);
            return new ast_1.LiteralArray(elements);
        }
        else if (this.next.isCharacter(lexer_1.$LBRACE)) {
            return this.parseLiteralMap();
        }
        else if (this.next.isIdentifier()) {
            return this.parseAccessMemberOrMethodCall(_implicitReceiver, false);
        }
        else if (this.next.isNumber()) {
            var /** @type {?} */ value = this.next.toNumber();
            this.advance();
            return new ast_1.LiteralPrimitive(value);
        }
        else if (this.next.isString()) {
            var /** @type {?} */ literalValue = this.next.toString();
            this.advance();
            return new ast_1.LiteralPrimitive(literalValue);
        }
        else if (this.index >= this.tokens.length) {
            this.error(`Unexpected end of expression: ${this.input}`);
        }
        else {
            this.error(`Unexpected token ${this.next}`);
        }
        // error() throws, so we don't reach here.
        throw new exceptions_1.BaseException("Fell through all cases in parsePrimary");
    }
    /**
     * @param {?} terminator
     * @return {?}
     */
    parseExpressionList(terminator) {
        var /** @type {?} */ result = [];
        if (!this.next.isCharacter(terminator)) {
            do {
                result.push(this.parsePipe());
            } while (this.optionalCharacter(lexer_1.$COMMA));
        }
        return result;
    }
    /**
     * @return {?}
     */
    parseLiteralMap() {
        var /** @type {?} */ keys = [];
        var /** @type {?} */ values = [];
        this.expectCharacter(lexer_1.$LBRACE);
        if (!this.optionalCharacter(lexer_1.$RBRACE)) {
            do {
                var /** @type {?} */ key = this.expectIdentifierOrKeywordOrString();
                keys.push(key);
                this.expectCharacter(lexer_1.$COLON);
                values.push(this.parsePipe());
            } while (this.optionalCharacter(lexer_1.$COMMA));
            this.expectCharacter(lexer_1.$RBRACE);
        }
        return new ast_1.LiteralMap(keys, values);
    }
    /**
     * @param {?} receiver
     * @param {?=} isSafe
     * @return {?}
     */
    parseAccessMemberOrMethodCall(receiver, isSafe = false) {
        let /** @type {?} */ id = this.expectIdentifierOrKeyword();
        if (this.optionalCharacter(lexer_1.$LPAREN)) {
            let /** @type {?} */ args = this.parseCallArguments();
            this.expectCharacter(lexer_1.$RPAREN);
            return isSafe ? new ast_1.SafeMethodCall(receiver, id, args) : new ast_1.MethodCall(receiver, id, args);
        }
        else {
            if (isSafe) {
                if (this.optionalOperator("=")) {
                    this.error("The '?.' operator cannot be used in the assignment");
                }
                else {
                    return new ast_1.SafePropertyRead(receiver, id);
                }
            }
            else {
                if (this.optionalOperator("=")) {
                    if (!this.parseAction) {
                        this.error("Bindings cannot contain assignments");
                    }
                    let /** @type {?} */ value = this.parseConditional();
                    return new ast_1.PropertyWrite(receiver, id, value);
                }
                else {
                    return new ast_1.PropertyRead(receiver, id);
                }
            }
        }
        return null;
    }
    /**
     * @return {?}
     */
    parseCallArguments() {
        if (this.next.isCharacter(lexer_1.$RPAREN))
            return [];
        var /** @type {?} */ positionals = [];
        do {
            positionals.push(this.parsePipe());
        } while (this.optionalCharacter(lexer_1.$COMMA));
        return positionals;
    }
    /**
     * @return {?}
     */
    parseBlockContent() {
        if (!this.parseAction) {
            this.error("Binding expression cannot contain chained expression");
        }
        var /** @type {?} */ exprs = [];
        while (this.index < this.tokens.length && !this.next.isCharacter(lexer_1.$RBRACE)) {
            var /** @type {?} */ expr = this.parseExpression();
            exprs.push(expr);
            if (this.optionalCharacter(lexer_1.$SEMICOLON)) {
                while (this.optionalCharacter(lexer_1.$SEMICOLON)) {
                } // read all semicolons
            }
        }
        if (exprs.length == 0)
            return new ast_1.EmptyExpr();
        if (exprs.length == 1)
            return exprs[0];
        return new ast_1.Chain(exprs);
    }
    /**
     *  An identifier, a keyword, a string with an optional `-` inbetween.
     * @return {?}
     */
    expectTemplateBindingKey() {
        var /** @type {?} */ result = '';
        var /** @type {?} */ operatorFound = false;
        do {
            result += this.expectIdentifierOrKeywordOrString();
            operatorFound = this.optionalOperator('-');
            if (operatorFound) {
                result += '-';
            }
        } while (operatorFound);
        return result.toString();
    }
    /**
     * @return {?}
     */
    parseTemplateBindings() {
        var /** @type {?} */ bindings = [];
        var /** @type {?} */ prefix = null;
        var /** @type {?} */ warnings = [];
        while (this.index < this.tokens.length) {
            var /** @type {?} */ keyIsVar = this.peekKeywordLet();
            if (!keyIsVar && this.peekDeprecatedKeywordVar()) {
                keyIsVar = true;
                warnings.push(`"var" inside of expressions is deprecated. Use "let" instead!`);
            }
            if (!keyIsVar && this.peekDeprecatedOperatorHash()) {
                keyIsVar = true;
                warnings.push(`"#" inside of expressions is deprecated. Use "let" instead!`);
            }
            if (keyIsVar) {
                this.advance();
            }
            var /** @type {?} */ key = this.expectTemplateBindingKey();
            if (!keyIsVar) {
                if (prefix == null) {
                    prefix = key;
                }
                else {
                    key = prefix + key[0].toUpperCase() + key.substring(1);
                }
            }
            this.optionalCharacter(lexer_1.$COLON);
            var /** @type {?} */ name = null;
            var /** @type {?} */ expression = null;
            if (keyIsVar) {
                if (this.optionalOperator("=")) {
                    name = this.expectTemplateBindingKey();
                }
                else {
                    name = '\$implicit';
                }
            }
            else if (this.next !== lexer_1.EOF && !this.peekKeywordLet() && !this.peekDeprecatedKeywordVar() &&
                !this.peekDeprecatedOperatorHash()) {
                var /** @type {?} */ start = this.inputIndex;
                var /** @type {?} */ ast = this.parsePipe();
                var /** @type {?} */ source = this.input.substring(start, this.inputIndex);
                expression = new ast_1.ASTWithSource(ast, source, this.location);
            }
            bindings.push(new ast_1.TemplateBinding(key, keyIsVar, name, expression));
            if (!this.optionalCharacter(lexer_1.$SEMICOLON)) {
                this.optionalCharacter(lexer_1.$COMMA);
            }
        }
        return new TemplateBindingParseResult(bindings, warnings);
    }
    /**
     * @param {?} message
     * @param {?=} index
     * @return {?}
     */
    error(message, index = null) {
        if (lang_1.isBlank(index))
            index = this.index;
        var /** @type {?} */ location = (index < this.tokens.length) ? `at column ${this.tokens[index].index + 1} in` :
            `at the end of the expression`;
        throw new ParseException(message, this.input, location, this.location);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _ParseAST.prototype.index;
        /** @type {?} */
        _ParseAST.prototype.input;
        /** @type {?} */
        _ParseAST.prototype.location;
        /** @type {?} */
        _ParseAST.prototype.tokens;
        /** @type {?} */
        _ParseAST.prototype.parseAction;
    }
}
exports._ParseAST = _ParseAST;
class SimpleExpressionChecker {
    constructor() {
        this.simple = true;
    }
    /**
     * @param {?} ast
     * @return {?}
     */
    static check(ast) {
        var /** @type {?} */ s = new SimpleExpressionChecker();
        ast.visit(s);
        return s.simple;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitImplicitReceiver(ast, context) { }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitInterpolation(ast, context) { this.simple = false; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralPrimitive(ast, context) { }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitPropertyRead(ast, context) { }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitPropertyWrite(ast, context) { this.simple = false; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitSafePropertyRead(ast, context) { this.simple = false; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitMethodCall(ast, context) { this.simple = false; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitSafeMethodCall(ast, context) { this.simple = false; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitFunctionCall(ast, context) { this.simple = false; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralArray(ast, context) { this.visitAll(ast.expressions); }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralMap(ast, context) { this.visitAll(ast.values); }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitBinary(ast, context) { this.simple = false; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitPrefixNot(ast, context) { this.simple = false; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitConditional(ast, context) { this.simple = false; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitPipe(ast, context) { this.simple = false; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitKeyedRead(ast, context) { this.simple = false; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitKeyedWrite(ast, context) { this.simple = false; }
    /**
     * @param {?} asts
     * @return {?}
     */
    visitAll(asts) {
        var /** @type {?} */ res = collection_1.ListWrapper.createFixedSize(asts.length);
        for (var /** @type {?} */ i = 0; i < asts.length; ++i) {
            res[i] = asts[i].visit(this);
        }
        return res;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitChain(ast, context) { this.simple = false; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitQuote(ast, context) { this.simple = false; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SimpleExpressionChecker.prototype.simple;
    }
}
//# sourceMappingURL=parser.js.map