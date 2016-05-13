goog.module('_angular$compiler$src$view__compiler$expression__converter');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var o = goog.require('_angular$compiler$src$output$output__ast');
var identifiers_1 = goog.require('_angular$compiler$src$identifiers');
var /** @type {?} */ IMPLICIT_RECEIVER = o.variable('#implicit');
class ExpressionWithWrappedValueInfo {
    /**
     * @param {?} expression
     * @param {?} needsValueUnwrapper
     */
    constructor(expression, needsValueUnwrapper) {
        this.expression = expression;
        this.needsValueUnwrapper = needsValueUnwrapper;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ExpressionWithWrappedValueInfo.prototype.expression;
        /** @type {?} */
        ExpressionWithWrappedValueInfo.prototype.needsValueUnwrapper;
    }
}
exports.ExpressionWithWrappedValueInfo = ExpressionWithWrappedValueInfo;
/**
 * @param {?} nameResolver
 * @param {?} implicitReceiver
 * @param {?} expression
 * @param {?} valueUnwrapper
 * @return {?}
 */
function convertCdExpressionToIr(nameResolver, implicitReceiver, expression, valueUnwrapper) {
    var /** @type {?} */ visitor = new _AstToIrVisitor(nameResolver, implicitReceiver, valueUnwrapper);
    var /** @type {?} */ irAst = expression.visit(visitor, _Mode.Expression);
    return new ExpressionWithWrappedValueInfo(irAst, visitor.needsValueUnwrapper);
}
exports.convertCdExpressionToIr = convertCdExpressionToIr;
/**
 * @param {?} nameResolver
 * @param {?} implicitReceiver
 * @param {?} stmt
 * @return {?}
 */
function convertCdStatementToIr(nameResolver, implicitReceiver, stmt) {
    var /** @type {?} */ visitor = new _AstToIrVisitor(nameResolver, implicitReceiver, null);
    var /** @type {?} */ statements = [];
    flattenStatements(stmt.visit(visitor, _Mode.Statement), statements);
    return statements;
}
exports.convertCdStatementToIr = convertCdStatementToIr;
let _Mode = {};
_Mode.Statement = 0;
_Mode.Expression = 1;
_Mode[_Mode.Statement] = "Statement";
_Mode[_Mode.Expression] = "Expression";
/**
 * @param {?} mode
 * @param {?} ast
 * @return {?}
 */
function ensureStatementMode(mode, ast) {
    if (mode !== _Mode.Statement) {
        throw new exceptions_1.BaseException(`Expected a statement, but saw ${ast}`);
    }
}
/**
 * @param {?} mode
 * @param {?} ast
 * @return {?}
 */
function ensureExpressionMode(mode, ast) {
    if (mode !== _Mode.Expression) {
        throw new exceptions_1.BaseException(`Expected an expression, but saw ${ast}`);
    }
}
/**
 * @param {?} mode
 * @param {?} expr
 * @return {?}
 */
function convertToStatementIfNeeded(mode, expr) {
    if (mode === _Mode.Statement) {
        return expr.toStmt();
    }
    else {
        return expr;
    }
}
class _AstToIrVisitor {
    /**
     * @param {?} _nameResolver
     * @param {?} _implicitReceiver
     * @param {?} _valueUnwrapper
     */
    constructor(_nameResolver, _implicitReceiver, _valueUnwrapper) {
        this._nameResolver = _nameResolver;
        this._implicitReceiver = _implicitReceiver;
        this._valueUnwrapper = _valueUnwrapper;
        this.needsValueUnwrapper = false;
    }
    /**
     * @param {?} ast
     * @param {?} mode
     * @return {?}
     */
    visitBinary(ast, mode) {
        var /** @type {?} */ op;
        switch (ast.operation) {
            case '+':
                op = o.BinaryOperator.Plus;
                break;
            case '-':
                op = o.BinaryOperator.Minus;
                break;
            case '*':
                op = o.BinaryOperator.Multiply;
                break;
            case '/':
                op = o.BinaryOperator.Divide;
                break;
            case '%':
                op = o.BinaryOperator.Modulo;
                break;
            case '&&':
                op = o.BinaryOperator.And;
                break;
            case '||':
                op = o.BinaryOperator.Or;
                break;
            case '==':
                op = o.BinaryOperator.Equals;
                break;
            case '!=':
                op = o.BinaryOperator.NotEquals;
                break;
            case '===':
                op = o.BinaryOperator.Identical;
                break;
            case '!==':
                op = o.BinaryOperator.NotIdentical;
                break;
            case '<':
                op = o.BinaryOperator.Lower;
                break;
            case '>':
                op = o.BinaryOperator.Bigger;
                break;
            case '<=':
                op = o.BinaryOperator.LowerEquals;
                break;
            case '>=':
                op = o.BinaryOperator.BiggerEquals;
                break;
            default:
                throw new exceptions_1.BaseException(`Unsupported operation ${ast.operation}`);
        }
        return convertToStatementIfNeeded(mode, new o.BinaryOperatorExpr(op, ast.left.visit(this, _Mode.Expression), ast.right.visit(this, _Mode.Expression)));
    }
    /**
     * @param {?} ast
     * @param {?} mode
     * @return {?}
     */
    visitChain(ast, mode) {
        ensureStatementMode(mode, ast);
        return this.visitAll(ast.expressions, mode);
    }
    /**
     * @param {?} ast
     * @param {?} mode
     * @return {?}
     */
    visitConditional(ast, mode) {
        var /** @type {?} */ value = ast.condition.visit(this, _Mode.Expression);
        return convertToStatementIfNeeded(mode, value.conditional(ast.trueExp.visit(this, _Mode.Expression), ast.falseExp.visit(this, _Mode.Expression)));
    }
    /**
     * @param {?} ast
     * @param {?} mode
     * @return {?}
     */
    visitPipe(ast, mode) {
        var /** @type {?} */ input = ast.exp.visit(this, _Mode.Expression);
        var /** @type {?} */ args = this.visitAll(ast.args, _Mode.Expression);
        var /** @type {?} */ value = this._nameResolver.callPipe(ast.name, input, args);
        this.needsValueUnwrapper = true;
        return convertToStatementIfNeeded(mode, this._valueUnwrapper.callMethod('unwrap', [value]));
    }
    /**
     * @param {?} ast
     * @param {?} mode
     * @return {?}
     */
    visitFunctionCall(ast, mode) {
        return convertToStatementIfNeeded(mode, ast.target.visit(this, _Mode.Expression)
            .callFn(this.visitAll(ast.args, _Mode.Expression)));
    }
    /**
     * @param {?} ast
     * @param {?} mode
     * @return {?}
     */
    visitImplicitReceiver(ast, mode) {
        ensureExpressionMode(mode, ast);
        return IMPLICIT_RECEIVER;
    }
    /**
     * @param {?} ast
     * @param {?} mode
     * @return {?}
     */
    visitInterpolation(ast, mode) {
        ensureExpressionMode(mode, ast);
        var /** @type {?} */ args = [o.literal(ast.expressions.length)];
        for (var /** @type {?} */ i = 0; i < ast.strings.length - 1; i++) {
            args.push(o.literal(ast.strings[i]));
            args.push(ast.expressions[i].visit(this, _Mode.Expression));
        }
        args.push(o.literal(ast.strings[ast.strings.length - 1]));
        return o.importExpr(identifiers_1.Identifiers.interpolate).callFn(args);
    }
    /**
     * @param {?} ast
     * @param {?} mode
     * @return {?}
     */
    visitKeyedRead(ast, mode) {
        return convertToStatementIfNeeded(mode, ast.obj.visit(this, _Mode.Expression).key(ast.key.visit(this, _Mode.Expression)));
    }
    /**
     * @param {?} ast
     * @param {?} mode
     * @return {?}
     */
    visitKeyedWrite(ast, mode) {
        var /** @type {?} */ obj = ast.obj.visit(this, _Mode.Expression);
        var /** @type {?} */ key = ast.key.visit(this, _Mode.Expression);
        var /** @type {?} */ value = ast.value.visit(this, _Mode.Expression);
        return convertToStatementIfNeeded(mode, obj.key(key).set(value));
    }
    /**
     * @param {?} ast
     * @param {?} mode
     * @return {?}
     */
    visitLiteralArray(ast, mode) {
        return convertToStatementIfNeeded(mode, this._nameResolver.createLiteralArray(this.visitAll(ast.expressions, mode)));
    }
    /**
     * @param {?} ast
     * @param {?} mode
     * @return {?}
     */
    visitLiteralMap(ast, mode) {
        var /** @type {?} */ parts = [];
        for (var /** @type {?} */ i = 0; i < ast.keys.length; i++) {
            parts.push([ast.keys[i], ast.values[i].visit(this, _Mode.Expression)]);
        }
        return convertToStatementIfNeeded(mode, this._nameResolver.createLiteralMap(parts));
    }
    /**
     * @param {?} ast
     * @param {?} mode
     * @return {?}
     */
    visitLiteralPrimitive(ast, mode) {
        return convertToStatementIfNeeded(mode, o.literal(ast.value));
    }
    /**
     * @param {?} ast
     * @param {?} mode
     * @return {?}
     */
    visitMethodCall(ast, mode) {
        var /** @type {?} */ args = this.visitAll(ast.args, _Mode.Expression);
        var /** @type {?} */ result = null;
        var /** @type {?} */ receiver = ast.receiver.visit(this, _Mode.Expression);
        if (receiver === IMPLICIT_RECEIVER) {
            var /** @type {?} */ varExpr = this._nameResolver.getLocal(ast.name);
            if (lang_1.isPresent(varExpr)) {
                result = varExpr.callFn(args);
            }
            else {
                receiver = this._implicitReceiver;
            }
        }
        if (lang_1.isBlank(result)) {
            result = receiver.callMethod(ast.name, args);
        }
        return convertToStatementIfNeeded(mode, result);
    }
    /**
     * @param {?} ast
     * @param {?} mode
     * @return {?}
     */
    visitPrefixNot(ast, mode) {
        return convertToStatementIfNeeded(mode, o.not(ast.expression.visit(this, _Mode.Expression)));
    }
    /**
     * @param {?} ast
     * @param {?} mode
     * @return {?}
     */
    visitPropertyRead(ast, mode) {
        var /** @type {?} */ result = null;
        var /** @type {?} */ receiver = ast.receiver.visit(this, _Mode.Expression);
        if (receiver === IMPLICIT_RECEIVER) {
            result = this._nameResolver.getLocal(ast.name);
            if (lang_1.isBlank(result)) {
                receiver = this._implicitReceiver;
            }
        }
        if (lang_1.isBlank(result)) {
            result = receiver.prop(ast.name);
        }
        return convertToStatementIfNeeded(mode, result);
    }
    /**
     * @param {?} ast
     * @param {?} mode
     * @return {?}
     */
    visitPropertyWrite(ast, mode) {
        var /** @type {?} */ receiver = ast.receiver.visit(this, _Mode.Expression);
        if (receiver === IMPLICIT_RECEIVER) {
            var /** @type {?} */ varExpr = this._nameResolver.getLocal(ast.name);
            if (lang_1.isPresent(varExpr)) {
                throw new exceptions_1.BaseException('Cannot assign to a reference or variable!');
            }
            receiver = this._implicitReceiver;
        }
        return convertToStatementIfNeeded(mode, receiver.prop(ast.name).set(ast.value.visit(this, _Mode.Expression)));
    }
    /**
     * @param {?} ast
     * @param {?} mode
     * @return {?}
     */
    visitSafePropertyRead(ast, mode) {
        var /** @type {?} */ receiver = ast.receiver.visit(this, _Mode.Expression);
        return convertToStatementIfNeeded(mode, receiver.isBlank().conditional(o.NULL_EXPR, receiver.prop(ast.name)));
    }
    /**
     * @param {?} ast
     * @param {?} mode
     * @return {?}
     */
    visitSafeMethodCall(ast, mode) {
        var /** @type {?} */ receiver = ast.receiver.visit(this, _Mode.Expression);
        var /** @type {?} */ args = this.visitAll(ast.args, _Mode.Expression);
        return convertToStatementIfNeeded(mode, receiver.isBlank().conditional(o.NULL_EXPR, receiver.callMethod(ast.name, args)));
    }
    /**
     * @param {?} asts
     * @param {?} mode
     * @return {?}
     */
    visitAll(asts, mode) { return asts.map(ast => ast.visit(this, mode)); }
    /**
     * @param {?} ast
     * @param {?} mode
     * @return {?}
     */
    visitQuote(ast, mode) {
        throw new exceptions_1.BaseException('Quotes are not supported for evaluation!');
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _AstToIrVisitor.prototype.needsValueUnwrapper;
        /** @type {?} */
        _AstToIrVisitor.prototype._nameResolver;
        /** @type {?} */
        _AstToIrVisitor.prototype._implicitReceiver;
        /** @type {?} */
        _AstToIrVisitor.prototype._valueUnwrapper;
    }
}
/**
 * @param {?} arg
 * @param {?} output
 * @return {?}
 */
function flattenStatements(arg, output) {
    if (lang_1.isArray(arg)) {
        ((arg)).forEach((entry) => flattenStatements(entry, output));
    }
    else {
        output.push(arg);
    }
}
//# sourceMappingURL=expression_converter.js.map