goog.module('_angular$compiler$src$output$abstract__emitter');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
var o = goog.require('_angular$compiler$src$output$output__ast');
var /** @type {?} */ _SINGLE_QUOTE_ESCAPE_STRING_RE = /'|\\|\n|\r|\$/g;
exports.CATCH_ERROR_VAR = o.variable('error');
exports.CATCH_STACK_VAR = o.variable('stack');
class OutputEmitter {
}
exports.OutputEmitter = OutputEmitter;
class _EmittedLine {
    /**
     * @param {?} indent
     */
    constructor(indent) {
        this.indent = indent;
        this.parts = [];
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _EmittedLine.prototype.parts;
        /** @type {?} */
        _EmittedLine.prototype.indent;
    }
}
class EmitterVisitorContext {
    /**
     * @param {?} _exportedVars
     * @param {?} _indent
     */
    constructor(_exportedVars, _indent) {
        this._exportedVars = _exportedVars;
        this._indent = _indent;
        this._classes = [];
        this._lines = [new _EmittedLine(_indent)];
    }
    /**
     * @param {?} exportedVars
     * @return {?}
     */
    static createRoot(exportedVars) {
        return new EmitterVisitorContext(exportedVars, 0);
    }
    get _currentLine() { return this._lines[this._lines.length - 1]; }
    /**
     * @param {?} varName
     * @return {?}
     */
    isExportedVar(varName) { return this._exportedVars.indexOf(varName) !== -1; }
    /**
     * @param {?=} lastPart
     * @return {?}
     */
    println(lastPart = '') { this.print(lastPart, true); }
    /**
     * @return {?}
     */
    lineIsEmpty() { return this._currentLine.parts.length === 0; }
    /**
     * @param {?} part
     * @param {?=} newLine
     * @return {?}
     */
    print(part, newLine = false) {
        if (part.length > 0) {
            this._currentLine.parts.push(part);
        }
        if (newLine) {
            this._lines.push(new _EmittedLine(this._indent));
        }
    }
    /**
     * @return {?}
     */
    removeEmptyLastLine() {
        if (this.lineIsEmpty()) {
            this._lines.pop();
        }
    }
    /**
     * @return {?}
     */
    incIndent() {
        this._indent++;
        this._currentLine.indent = this._indent;
    }
    /**
     * @return {?}
     */
    decIndent() {
        this._indent--;
        this._currentLine.indent = this._indent;
    }
    /**
     * @param {?} clazz
     * @return {?}
     */
    pushClass(clazz) { this._classes.push(clazz); }
    /**
     * @return {?}
     */
    popClass() { return this._classes.pop(); }
    get currentClass() {
        return this._classes.length > 0 ? this._classes[this._classes.length - 1] : null;
    }
    /**
     * @return {?}
     */
    toSource() {
        var /** @type {?} */ lines = this._lines;
        if (lines[lines.length - 1].parts.length === 0) {
            lines = lines.slice(0, lines.length - 1);
        }
        return lines.map((line) => {
            if (line.parts.length > 0) {
                return _createIndent(line.indent) + line.parts.join('');
            }
            else {
                return '';
            }
        })
            .join('\n');
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        EmitterVisitorContext.prototype._lines;
        /** @type {?} */
        EmitterVisitorContext.prototype._classes;
        /** @type {?} */
        EmitterVisitorContext.prototype._exportedVars;
        /** @type {?} */
        EmitterVisitorContext.prototype._indent;
    }
}
exports.EmitterVisitorContext = EmitterVisitorContext;
class AbstractEmitterVisitor {
    /**
     * @param {?} _escapeDollarInStrings
     */
    constructor(_escapeDollarInStrings) {
        this._escapeDollarInStrings = _escapeDollarInStrings;
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitExpressionStmt(stmt, ctx) {
        stmt.expr.visitExpression(this, ctx);
        ctx.println(';');
        return null;
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitReturnStmt(stmt, ctx) {
        ctx.print(`return `);
        stmt.value.visitExpression(this, ctx);
        ctx.println(';');
        return null;
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitIfStmt(stmt, ctx) {
        ctx.print(`if (`);
        stmt.condition.visitExpression(this, ctx);
        ctx.print(`) {`);
        var /** @type {?} */ hasElseCase = lang_1.isPresent(stmt.falseCase) && stmt.falseCase.length > 0;
        if (stmt.trueCase.length <= 1 && !hasElseCase) {
            ctx.print(` `);
            this.visitAllStatements(stmt.trueCase, ctx);
            ctx.removeEmptyLastLine();
            ctx.print(` `);
        }
        else {
            ctx.println();
            ctx.incIndent();
            this.visitAllStatements(stmt.trueCase, ctx);
            ctx.decIndent();
            if (hasElseCase) {
                ctx.println(`} else {`);
                ctx.incIndent();
                this.visitAllStatements(stmt.falseCase, ctx);
                ctx.decIndent();
            }
        }
        ctx.println(`}`);
        return null;
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitThrowStmt(stmt, ctx) {
        ctx.print(`throw `);
        stmt.error.visitExpression(this, ctx);
        ctx.println(`;`);
        return null;
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitCommentStmt(stmt, ctx) {
        var /** @type {?} */ lines = stmt.comment.split('\n');
        lines.forEach((line) => { ctx.println(`// ${line}`); });
        return null;
    }
    /**
     * @param {?} expr
     * @param {?} ctx
     * @return {?}
     */
    visitWriteVarExpr(expr, ctx) {
        var /** @type {?} */ lineWasEmpty = ctx.lineIsEmpty();
        if (!lineWasEmpty) {
            ctx.print('(');
        }
        ctx.print(`${expr.name} = `);
        expr.value.visitExpression(this, ctx);
        if (!lineWasEmpty) {
            ctx.print(')');
        }
        return null;
    }
    /**
     * @param {?} expr
     * @param {?} ctx
     * @return {?}
     */
    visitWriteKeyExpr(expr, ctx) {
        var /** @type {?} */ lineWasEmpty = ctx.lineIsEmpty();
        if (!lineWasEmpty) {
            ctx.print('(');
        }
        expr.receiver.visitExpression(this, ctx);
        ctx.print(`[`);
        expr.index.visitExpression(this, ctx);
        ctx.print(`] = `);
        expr.value.visitExpression(this, ctx);
        if (!lineWasEmpty) {
            ctx.print(')');
        }
        return null;
    }
    /**
     * @param {?} expr
     * @param {?} ctx
     * @return {?}
     */
    visitWritePropExpr(expr, ctx) {
        var /** @type {?} */ lineWasEmpty = ctx.lineIsEmpty();
        if (!lineWasEmpty) {
            ctx.print('(');
        }
        expr.receiver.visitExpression(this, ctx);
        ctx.print(`.${expr.name} = `);
        expr.value.visitExpression(this, ctx);
        if (!lineWasEmpty) {
            ctx.print(')');
        }
        return null;
    }
    /**
     * @param {?} expr
     * @param {?} ctx
     * @return {?}
     */
    visitInvokeMethodExpr(expr, ctx) {
        expr.receiver.visitExpression(this, ctx);
        var /** @type {?} */ name = expr.name;
        if (lang_1.isPresent(expr.builtin)) {
            name = this.getBuiltinMethodName(expr.builtin);
            if (lang_1.isBlank(name)) {
                // some builtins just mean to skip the call.
                // e.g. `bind` in Dart.
                return null;
            }
        }
        ctx.print(`.${name}(`);
        this.visitAllExpressions(expr.args, ctx, `,`);
        ctx.print(`)`);
        return null;
    }
    /**
     * @param {?} expr
     * @param {?} ctx
     * @return {?}
     */
    visitInvokeFunctionExpr(expr, ctx) {
        expr.fn.visitExpression(this, ctx);
        ctx.print(`(`);
        this.visitAllExpressions(expr.args, ctx, ',');
        ctx.print(`)`);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitReadVarExpr(ast, ctx) {
        var /** @type {?} */ varName = ast.name;
        if (lang_1.isPresent(ast.builtin)) {
            switch (ast.builtin) {
                case o.BuiltinVar.Super:
                    varName = 'super';
                    break;
                case o.BuiltinVar.This:
                    varName = 'this';
                    break;
                case o.BuiltinVar.CatchError:
                    varName = exports.CATCH_ERROR_VAR.name;
                    break;
                case o.BuiltinVar.CatchStack:
                    varName = exports.CATCH_STACK_VAR.name;
                    break;
                default:
                    throw new exceptions_1.BaseException(`Unknown builtin variable ${ast.builtin}`);
            }
        }
        ctx.print(varName);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitInstantiateExpr(ast, ctx) {
        ctx.print(`new `);
        ast.classExpr.visitExpression(this, ctx);
        ctx.print(`(`);
        this.visitAllExpressions(ast.args, ctx, ',');
        ctx.print(`)`);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitLiteralExpr(ast, ctx) {
        var /** @type {?} */ value = ast.value;
        if (lang_1.isString(value)) {
            ctx.print(escapeSingleQuoteString(value, this._escapeDollarInStrings));
        }
        else if (lang_1.isBlank(value)) {
            ctx.print('null');
        }
        else {
            ctx.print(`${value}`);
        }
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitConditionalExpr(ast, ctx) {
        ctx.print(`(`);
        ast.condition.visitExpression(this, ctx);
        ctx.print('? ');
        ast.trueCase.visitExpression(this, ctx);
        ctx.print(': ');
        ast.falseCase.visitExpression(this, ctx);
        ctx.print(`)`);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitNotExpr(ast, ctx) {
        ctx.print('!');
        ast.condition.visitExpression(this, ctx);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitBinaryOperatorExpr(ast, ctx) {
        var /** @type {?} */ opStr;
        switch (ast.operator) {
            case o.BinaryOperator.Equals:
                opStr = '==';
                break;
            case o.BinaryOperator.Identical:
                opStr = '===';
                break;
            case o.BinaryOperator.NotEquals:
                opStr = '!=';
                break;
            case o.BinaryOperator.NotIdentical:
                opStr = '!==';
                break;
            case o.BinaryOperator.And:
                opStr = '&&';
                break;
            case o.BinaryOperator.Or:
                opStr = '||';
                break;
            case o.BinaryOperator.Plus:
                opStr = '+';
                break;
            case o.BinaryOperator.Minus:
                opStr = '-';
                break;
            case o.BinaryOperator.Divide:
                opStr = '/';
                break;
            case o.BinaryOperator.Multiply:
                opStr = '*';
                break;
            case o.BinaryOperator.Modulo:
                opStr = '%';
                break;
            case o.BinaryOperator.Lower:
                opStr = '<';
                break;
            case o.BinaryOperator.LowerEquals:
                opStr = '<=';
                break;
            case o.BinaryOperator.Bigger:
                opStr = '>';
                break;
            case o.BinaryOperator.BiggerEquals:
                opStr = '>=';
                break;
            default:
                throw new exceptions_1.BaseException(`Unknown operator ${ast.operator}`);
        }
        ctx.print(`(`);
        ast.lhs.visitExpression(this, ctx);
        ctx.print(` ${opStr} `);
        ast.rhs.visitExpression(this, ctx);
        ctx.print(`)`);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitReadPropExpr(ast, ctx) {
        ast.receiver.visitExpression(this, ctx);
        ctx.print(`.`);
        ctx.print(ast.name);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitReadKeyExpr(ast, ctx) {
        ast.receiver.visitExpression(this, ctx);
        ctx.print(`[`);
        ast.index.visitExpression(this, ctx);
        ctx.print(`]`);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitLiteralArrayExpr(ast, ctx) {
        var /** @type {?} */ useNewLine = ast.entries.length > 1;
        ctx.print(`[`, useNewLine);
        ctx.incIndent();
        this.visitAllExpressions(ast.entries, ctx, ',', useNewLine);
        ctx.decIndent();
        ctx.print(`]`, useNewLine);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitLiteralMapExpr(ast, ctx) {
        var /** @type {?} */ useNewLine = ast.entries.length > 1;
        ctx.print(`{`, useNewLine);
        ctx.incIndent();
        this.visitAllObjects((entry) => {
            ctx.print(`${escapeSingleQuoteString(entry[0], this._escapeDollarInStrings)}: `);
            entry[1].visitExpression(this, ctx);
        }, ast.entries, ctx, ',', useNewLine);
        ctx.decIndent();
        ctx.print(`}`, useNewLine);
        return null;
    }
    /**
     * @param {?} expressions
     * @param {?} ctx
     * @param {?} separator
     * @param {?=} newLine
     * @return {?}
     */
    visitAllExpressions(expressions, ctx, separator, newLine = false) {
        this.visitAllObjects((expr) => expr.visitExpression(this, ctx), expressions, ctx, separator, newLine);
    }
    /**
     * @param {?} handler
     * @param {?} expressions
     * @param {?} ctx
     * @param {?} separator
     * @param {?=} newLine
     * @return {?}
     */
    visitAllObjects(handler, expressions, ctx, separator, newLine = false) {
        for (var /** @type {?} */ i = 0; i < expressions.length; i++) {
            if (i > 0) {
                ctx.print(separator, newLine);
            }
            handler(expressions[i]);
        }
        if (newLine) {
            ctx.println();
        }
    }
    /**
     * @param {?} statements
     * @param {?} ctx
     * @return {?}
     */
    visitAllStatements(statements, ctx) {
        statements.forEach((stmt) => { return stmt.visitStatement(this, ctx); });
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        AbstractEmitterVisitor.prototype._escapeDollarInStrings;
    }
}
exports.AbstractEmitterVisitor = AbstractEmitterVisitor;
/**
 * @param {?} input
 * @param {?} escapeDollar
 * @return {?}
 */
function escapeSingleQuoteString(input, escapeDollar) {
    if (lang_1.isBlank(input)) {
        return null;
    }
    var /** @type {?} */ body = lang_1.StringWrapper.replaceAllMapped(input, _SINGLE_QUOTE_ESCAPE_STRING_RE, (match) => {
        if (match[0] == '$') {
            return escapeDollar ? '\\$' : '$';
        }
        else if (match[0] == '\n') {
            return '\\n';
        }
        else if (match[0] == '\r') {
            return '\\r';
        }
        else {
            return `\\${match[0]}`;
        }
    });
    return `'${body}'`;
}
exports.escapeSingleQuoteString = escapeSingleQuoteString;
/**
 * @param {?} count
 * @return {?}
 */
function _createIndent(count) {
    var /** @type {?} */ res = '';
    for (var /** @type {?} */ i = 0; i < count; i++) {
        res += '  ';
    }
    return res;
}
//# sourceMappingURL=abstract_emitter.js.map