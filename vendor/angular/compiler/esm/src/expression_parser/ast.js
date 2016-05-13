goog.module('_angular$compiler$src$expression__parser$ast');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
class AST {
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) { return null; }
    /**
     * @return {?}
     */
    toString() { return "AST"; }
}
exports.AST = AST;
/**
 * Represents a quoted expression of the form:
 *
 * quote = prefix `:` uninterpretedExpression
 * prefix = identifier
 * uninterpretedExpression = arbitrary string
 *
 * A quoted expression is meant to be pre-processed by an AST transformer that
 * converts it into another AST that no longer contains quoted expressions.
 * It is meant to allow third-party developers to extend Angular template
 * expression language. The `uninterpretedExpression` part of the quote is
 * therefore not interpreted by the Angular's own expression parser.
 */
class Quote extends AST {
    /**
     * @param {?} prefix
     * @param {?} uninterpretedExpression
     * @param {?} location
     */
    constructor(prefix, uninterpretedExpression, location) {
        super();
        this.prefix = prefix;
        this.uninterpretedExpression = uninterpretedExpression;
        this.location = location;
    }
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) { return visitor.visitQuote(this, context); }
    /**
     * @return {?}
     */
    toString() { return "Quote"; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        Quote.prototype.prefix;
        /** @type {?} */
        Quote.prototype.uninterpretedExpression;
        /** @type {?} */
        Quote.prototype.location;
    }
}
exports.Quote = Quote;
class EmptyExpr extends AST {
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) {
        // do nothing
    }
}
exports.EmptyExpr = EmptyExpr;
class ImplicitReceiver extends AST {
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) {
        return visitor.visitImplicitReceiver(this, context);
    }
}
exports.ImplicitReceiver = ImplicitReceiver;
/**
 * Multiple expressions separated by a semicolon.
 */
class Chain extends AST {
    /**
     * @param {?} expressions
     */
    constructor(expressions) {
        super();
        this.expressions = expressions;
    }
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) { return visitor.visitChain(this, context); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        Chain.prototype.expressions;
    }
}
exports.Chain = Chain;
class Conditional extends AST {
    /**
     * @param {?} condition
     * @param {?} trueExp
     * @param {?} falseExp
     */
    constructor(condition, trueExp, falseExp) {
        super();
        this.condition = condition;
        this.trueExp = trueExp;
        this.falseExp = falseExp;
    }
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) {
        return visitor.visitConditional(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        Conditional.prototype.condition;
        /** @type {?} */
        Conditional.prototype.trueExp;
        /** @type {?} */
        Conditional.prototype.falseExp;
    }
}
exports.Conditional = Conditional;
class PropertyRead extends AST {
    /**
     * @param {?} receiver
     * @param {?} name
     */
    constructor(receiver, name) {
        super();
        this.receiver = receiver;
        this.name = name;
    }
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) {
        return visitor.visitPropertyRead(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        PropertyRead.prototype.receiver;
        /** @type {?} */
        PropertyRead.prototype.name;
    }
}
exports.PropertyRead = PropertyRead;
class PropertyWrite extends AST {
    /**
     * @param {?} receiver
     * @param {?} name
     * @param {?} value
     */
    constructor(receiver, name, value) {
        super();
        this.receiver = receiver;
        this.name = name;
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) {
        return visitor.visitPropertyWrite(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        PropertyWrite.prototype.receiver;
        /** @type {?} */
        PropertyWrite.prototype.name;
        /** @type {?} */
        PropertyWrite.prototype.value;
    }
}
exports.PropertyWrite = PropertyWrite;
class SafePropertyRead extends AST {
    /**
     * @param {?} receiver
     * @param {?} name
     */
    constructor(receiver, name) {
        super();
        this.receiver = receiver;
        this.name = name;
    }
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) {
        return visitor.visitSafePropertyRead(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SafePropertyRead.prototype.receiver;
        /** @type {?} */
        SafePropertyRead.prototype.name;
    }
}
exports.SafePropertyRead = SafePropertyRead;
class KeyedRead extends AST {
    /**
     * @param {?} obj
     * @param {?} key
     */
    constructor(obj, key) {
        super();
        this.obj = obj;
        this.key = key;
    }
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) {
        return visitor.visitKeyedRead(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        KeyedRead.prototype.obj;
        /** @type {?} */
        KeyedRead.prototype.key;
    }
}
exports.KeyedRead = KeyedRead;
class KeyedWrite extends AST {
    /**
     * @param {?} obj
     * @param {?} key
     * @param {?} value
     */
    constructor(obj, key, value) {
        super();
        this.obj = obj;
        this.key = key;
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) {
        return visitor.visitKeyedWrite(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        KeyedWrite.prototype.obj;
        /** @type {?} */
        KeyedWrite.prototype.key;
        /** @type {?} */
        KeyedWrite.prototype.value;
    }
}
exports.KeyedWrite = KeyedWrite;
class BindingPipe extends AST {
    /**
     * @param {?} exp
     * @param {?} name
     * @param {?} args
     */
    constructor(exp, name, args) {
        super();
        this.exp = exp;
        this.name = name;
        this.args = args;
    }
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) { return visitor.visitPipe(this, context); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BindingPipe.prototype.exp;
        /** @type {?} */
        BindingPipe.prototype.name;
        /** @type {?} */
        BindingPipe.prototype.args;
    }
}
exports.BindingPipe = BindingPipe;
class LiteralPrimitive extends AST {
    /**
     * @param {?} value
     */
    constructor(value) {
        super();
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) {
        return visitor.visitLiteralPrimitive(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        LiteralPrimitive.prototype.value;
    }
}
exports.LiteralPrimitive = LiteralPrimitive;
class LiteralArray extends AST {
    /**
     * @param {?} expressions
     */
    constructor(expressions) {
        super();
        this.expressions = expressions;
    }
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) {
        return visitor.visitLiteralArray(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        LiteralArray.prototype.expressions;
    }
}
exports.LiteralArray = LiteralArray;
class LiteralMap extends AST {
    /**
     * @param {?} keys
     * @param {?} values
     */
    constructor(keys, values) {
        super();
        this.keys = keys;
        this.values = values;
    }
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) {
        return visitor.visitLiteralMap(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        LiteralMap.prototype.keys;
        /** @type {?} */
        LiteralMap.prototype.values;
    }
}
exports.LiteralMap = LiteralMap;
class Interpolation extends AST {
    /**
     * @param {?} strings
     * @param {?} expressions
     */
    constructor(strings, expressions) {
        super();
        this.strings = strings;
        this.expressions = expressions;
    }
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) {
        return visitor.visitInterpolation(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        Interpolation.prototype.strings;
        /** @type {?} */
        Interpolation.prototype.expressions;
    }
}
exports.Interpolation = Interpolation;
class Binary extends AST {
    /**
     * @param {?} operation
     * @param {?} left
     * @param {?} right
     */
    constructor(operation, left, right) {
        super();
        this.operation = operation;
        this.left = left;
        this.right = right;
    }
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) {
        return visitor.visitBinary(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        Binary.prototype.operation;
        /** @type {?} */
        Binary.prototype.left;
        /** @type {?} */
        Binary.prototype.right;
    }
}
exports.Binary = Binary;
class PrefixNot extends AST {
    /**
     * @param {?} expression
     */
    constructor(expression) {
        super();
        this.expression = expression;
    }
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) {
        return visitor.visitPrefixNot(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        PrefixNot.prototype.expression;
    }
}
exports.PrefixNot = PrefixNot;
class MethodCall extends AST {
    /**
     * @param {?} receiver
     * @param {?} name
     * @param {?} args
     */
    constructor(receiver, name, args) {
        super();
        this.receiver = receiver;
        this.name = name;
        this.args = args;
    }
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) {
        return visitor.visitMethodCall(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        MethodCall.prototype.receiver;
        /** @type {?} */
        MethodCall.prototype.name;
        /** @type {?} */
        MethodCall.prototype.args;
    }
}
exports.MethodCall = MethodCall;
class SafeMethodCall extends AST {
    /**
     * @param {?} receiver
     * @param {?} name
     * @param {?} args
     */
    constructor(receiver, name, args) {
        super();
        this.receiver = receiver;
        this.name = name;
        this.args = args;
    }
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) {
        return visitor.visitSafeMethodCall(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SafeMethodCall.prototype.receiver;
        /** @type {?} */
        SafeMethodCall.prototype.name;
        /** @type {?} */
        SafeMethodCall.prototype.args;
    }
}
exports.SafeMethodCall = SafeMethodCall;
class FunctionCall extends AST {
    /**
     * @param {?} target
     * @param {?} args
     */
    constructor(target, args) {
        super();
        this.target = target;
        this.args = args;
    }
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) {
        return visitor.visitFunctionCall(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        FunctionCall.prototype.target;
        /** @type {?} */
        FunctionCall.prototype.args;
    }
}
exports.FunctionCall = FunctionCall;
class ASTWithSource extends AST {
    /**
     * @param {?} ast
     * @param {?} source
     * @param {?} location
     */
    constructor(ast, source, location) {
        super();
        this.ast = ast;
        this.source = source;
        this.location = location;
    }
    /**
     * @param {?} visitor
     * @param {?=} context
     * @return {?}
     */
    visit(visitor, context = null) { return this.ast.visit(visitor, context); }
    /**
     * @return {?}
     */
    toString() { return `${this.source} in ${this.location}`; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ASTWithSource.prototype.ast;
        /** @type {?} */
        ASTWithSource.prototype.source;
        /** @type {?} */
        ASTWithSource.prototype.location;
    }
}
exports.ASTWithSource = ASTWithSource;
class TemplateBinding {
    /**
     * @param {?} key
     * @param {?} keyIsVar
     * @param {?} name
     * @param {?} expression
     */
    constructor(key, keyIsVar, name, expression) {
        this.key = key;
        this.keyIsVar = keyIsVar;
        this.name = name;
        this.expression = expression;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TemplateBinding.prototype.key;
        /** @type {?} */
        TemplateBinding.prototype.keyIsVar;
        /** @type {?} */
        TemplateBinding.prototype.name;
        /** @type {?} */
        TemplateBinding.prototype.expression;
    }
}
exports.TemplateBinding = TemplateBinding;
class RecursiveAstVisitor {
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitBinary(ast, context) {
        ast.left.visit(this);
        ast.right.visit(this);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitChain(ast, context) { return this.visitAll(ast.expressions, context); }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitConditional(ast, context) {
        ast.condition.visit(this);
        ast.trueExp.visit(this);
        ast.falseExp.visit(this);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitPipe(ast, context) {
        ast.exp.visit(this);
        this.visitAll(ast.args, context);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitFunctionCall(ast, context) {
        ast.target.visit(this);
        this.visitAll(ast.args, context);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitImplicitReceiver(ast, context) { return null; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitInterpolation(ast, context) {
        return this.visitAll(ast.expressions, context);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitKeyedRead(ast, context) {
        ast.obj.visit(this);
        ast.key.visit(this);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitKeyedWrite(ast, context) {
        ast.obj.visit(this);
        ast.key.visit(this);
        ast.value.visit(this);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralArray(ast, context) {
        return this.visitAll(ast.expressions, context);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralMap(ast, context) { return this.visitAll(ast.values, context); }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralPrimitive(ast, context) { return null; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitMethodCall(ast, context) {
        ast.receiver.visit(this);
        return this.visitAll(ast.args, context);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitPrefixNot(ast, context) {
        ast.expression.visit(this);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitPropertyRead(ast, context) {
        ast.receiver.visit(this);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitPropertyWrite(ast, context) {
        ast.receiver.visit(this);
        ast.value.visit(this);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitSafePropertyRead(ast, context) {
        ast.receiver.visit(this);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitSafeMethodCall(ast, context) {
        ast.receiver.visit(this);
        return this.visitAll(ast.args, context);
    }
    /**
     * @param {?} asts
     * @param {?} context
     * @return {?}
     */
    visitAll(asts, context) {
        asts.forEach(ast => ast.visit(this, context));
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitQuote(ast, context) { return null; }
}
exports.RecursiveAstVisitor = RecursiveAstVisitor;
class AstTransformer {
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitImplicitReceiver(ast, context) { return ast; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitInterpolation(ast, context) {
        return new Interpolation(ast.strings, this.visitAll(ast.expressions));
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralPrimitive(ast, context) {
        return new LiteralPrimitive(ast.value);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitPropertyRead(ast, context) {
        return new PropertyRead(ast.receiver.visit(this), ast.name);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitPropertyWrite(ast, context) {
        return new PropertyWrite(ast.receiver.visit(this), ast.name, ast.value);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitSafePropertyRead(ast, context) {
        return new SafePropertyRead(ast.receiver.visit(this), ast.name);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitMethodCall(ast, context) {
        return new MethodCall(ast.receiver.visit(this), ast.name, this.visitAll(ast.args));
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitSafeMethodCall(ast, context) {
        return new SafeMethodCall(ast.receiver.visit(this), ast.name, this.visitAll(ast.args));
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitFunctionCall(ast, context) {
        return new FunctionCall(ast.target.visit(this), this.visitAll(ast.args));
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralArray(ast, context) {
        return new LiteralArray(this.visitAll(ast.expressions));
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralMap(ast, context) {
        return new LiteralMap(ast.keys, this.visitAll(ast.values));
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitBinary(ast, context) {
        return new Binary(ast.operation, ast.left.visit(this), ast.right.visit(this));
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitPrefixNot(ast, context) {
        return new PrefixNot(ast.expression.visit(this));
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitConditional(ast, context) {
        return new Conditional(ast.condition.visit(this), ast.trueExp.visit(this), ast.falseExp.visit(this));
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitPipe(ast, context) {
        return new BindingPipe(ast.exp.visit(this), ast.name, this.visitAll(ast.args));
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitKeyedRead(ast, context) {
        return new KeyedRead(ast.obj.visit(this), ast.key.visit(this));
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitKeyedWrite(ast, context) {
        return new KeyedWrite(ast.obj.visit(this), ast.key.visit(this), ast.value.visit(this));
    }
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
    visitChain(ast, context) { return new Chain(this.visitAll(ast.expressions)); }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitQuote(ast, context) {
        return new Quote(ast.prefix, ast.uninterpretedExpression, ast.location);
    }
}
exports.AstTransformer = AstTransformer;
//# sourceMappingURL=ast.js.map