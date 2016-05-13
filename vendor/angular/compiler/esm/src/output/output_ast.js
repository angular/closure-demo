goog.module('_angular$compiler$src$output$output__ast');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
exports.TypeModifier = {};
exports.TypeModifier.Const = 0;
exports.TypeModifier[exports.TypeModifier.Const] = "Const";
class Type {
    /**
     * @param {?=} modifiers
     */
    constructor(modifiers = null) {
        this.modifiers = modifiers;
        if (lang_1.isBlank(modifiers)) {
            this.modifiers = [];
        }
    }
    /**
     * @param {?} modifier
     * @return {?}
     */
    hasModifier(modifier) { return this.modifiers.indexOf(modifier) !== -1; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        Type.prototype.modifiers;
    }
}
exports.Type = Type;
exports.BuiltinTypeName = {};
exports.BuiltinTypeName.Dynamic = 0;
exports.BuiltinTypeName.Bool = 1;
exports.BuiltinTypeName.String = 2;
exports.BuiltinTypeName.Int = 3;
exports.BuiltinTypeName.Number = 4;
exports.BuiltinTypeName.Function = 5;
exports.BuiltinTypeName[exports.BuiltinTypeName.Dynamic] = "Dynamic";
exports.BuiltinTypeName[exports.BuiltinTypeName.Bool] = "Bool";
exports.BuiltinTypeName[exports.BuiltinTypeName.String] = "String";
exports.BuiltinTypeName[exports.BuiltinTypeName.Int] = "Int";
exports.BuiltinTypeName[exports.BuiltinTypeName.Number] = "Number";
exports.BuiltinTypeName[exports.BuiltinTypeName.Function] = "Function";
class BuiltinType extends Type {
    /**
     * @param {?} name
     * @param {?=} modifiers
     */
    constructor(name, modifiers = null) {
        super(modifiers);
        this.name = name;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitType(visitor, context) {
        return visitor.visitBuiltintType(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BuiltinType.prototype.name;
    }
}
exports.BuiltinType = BuiltinType;
class ExternalType extends Type {
    /**
     * @param {?} value
     * @param {?=} typeParams
     * @param {?=} modifiers
     */
    constructor(value, typeParams = null, modifiers = null) {
        super(modifiers);
        this.value = value;
        this.typeParams = typeParams;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitType(visitor, context) {
        return visitor.visitExternalType(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ExternalType.prototype.value;
        /** @type {?} */
        ExternalType.prototype.typeParams;
    }
}
exports.ExternalType = ExternalType;
class ArrayType extends Type {
    /**
     * @param {?} of
     * @param {?=} modifiers
     */
    constructor(of, modifiers = null) {
        super(modifiers);
        this.of = of;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitType(visitor, context) {
        return visitor.visitArrayType(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ArrayType.prototype.of;
    }
}
exports.ArrayType = ArrayType;
class MapType extends Type {
    /**
     * @param {?} valueType
     * @param {?=} modifiers
     */
    constructor(valueType, modifiers = null) {
        super(modifiers);
        this.valueType = valueType;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitType(visitor, context) { return visitor.visitMapType(this, context); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        MapType.prototype.valueType;
    }
}
exports.MapType = MapType;
exports.DYNAMIC_TYPE = new BuiltinType(exports.BuiltinTypeName.Dynamic);
exports.BOOL_TYPE = new BuiltinType(exports.BuiltinTypeName.Bool);
exports.INT_TYPE = new BuiltinType(exports.BuiltinTypeName.Int);
exports.NUMBER_TYPE = new BuiltinType(exports.BuiltinTypeName.Number);
exports.STRING_TYPE = new BuiltinType(exports.BuiltinTypeName.String);
exports.FUNCTION_TYPE = new BuiltinType(exports.BuiltinTypeName.Function);
exports.BinaryOperator = {};
exports.BinaryOperator.Equals = 0;
exports.BinaryOperator.NotEquals = 1;
exports.BinaryOperator.Identical = 2;
exports.BinaryOperator.NotIdentical = 3;
exports.BinaryOperator.Minus = 4;
exports.BinaryOperator.Plus = 5;
exports.BinaryOperator.Divide = 6;
exports.BinaryOperator.Multiply = 7;
exports.BinaryOperator.Modulo = 8;
exports.BinaryOperator.And = 9;
exports.BinaryOperator.Or = 10;
exports.BinaryOperator.Lower = 11;
exports.BinaryOperator.LowerEquals = 12;
exports.BinaryOperator.Bigger = 13;
exports.BinaryOperator.BiggerEquals = 14;
exports.BinaryOperator[exports.BinaryOperator.Equals] = "Equals";
exports.BinaryOperator[exports.BinaryOperator.NotEquals] = "NotEquals";
exports.BinaryOperator[exports.BinaryOperator.Identical] = "Identical";
exports.BinaryOperator[exports.BinaryOperator.NotIdentical] = "NotIdentical";
exports.BinaryOperator[exports.BinaryOperator.Minus] = "Minus";
exports.BinaryOperator[exports.BinaryOperator.Plus] = "Plus";
exports.BinaryOperator[exports.BinaryOperator.Divide] = "Divide";
exports.BinaryOperator[exports.BinaryOperator.Multiply] = "Multiply";
exports.BinaryOperator[exports.BinaryOperator.Modulo] = "Modulo";
exports.BinaryOperator[exports.BinaryOperator.And] = "And";
exports.BinaryOperator[exports.BinaryOperator.Or] = "Or";
exports.BinaryOperator[exports.BinaryOperator.Lower] = "Lower";
exports.BinaryOperator[exports.BinaryOperator.LowerEquals] = "LowerEquals";
exports.BinaryOperator[exports.BinaryOperator.Bigger] = "Bigger";
exports.BinaryOperator[exports.BinaryOperator.BiggerEquals] = "BiggerEquals";
class Expression {
    /**
     * @param {?} type
     */
    constructor(type) {
        this.type = type;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    prop(name) { return new ReadPropExpr(this, name); }
    /**
     * @param {?} index
     * @param {?=} type
     * @return {?}
     */
    key(index, type = null) {
        return new ReadKeyExpr(this, index, type);
    }
    /**
     * @param {?} name
     * @param {?} params
     * @return {?}
     */
    callMethod(name, params) {
        return new InvokeMethodExpr(this, name, params);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    callFn(params) { return new InvokeFunctionExpr(this, params); }
    /**
     * @param {?} params
     * @param {?=} type
     * @return {?}
     */
    instantiate(params, type = null) {
        return new InstantiateExpr(this, params, type);
    }
    /**
     * @param {?} trueCase
     * @param {?=} falseCase
     * @return {?}
     */
    conditional(trueCase, falseCase = null) {
        return new ConditionalExpr(this, trueCase, falseCase);
    }
    /**
     * @param {?} rhs
     * @return {?}
     */
    equals(rhs) {
        return new BinaryOperatorExpr(exports.BinaryOperator.Equals, this, rhs);
    }
    /**
     * @param {?} rhs
     * @return {?}
     */
    notEquals(rhs) {
        return new BinaryOperatorExpr(exports.BinaryOperator.NotEquals, this, rhs);
    }
    /**
     * @param {?} rhs
     * @return {?}
     */
    identical(rhs) {
        return new BinaryOperatorExpr(exports.BinaryOperator.Identical, this, rhs);
    }
    /**
     * @param {?} rhs
     * @return {?}
     */
    notIdentical(rhs) {
        return new BinaryOperatorExpr(exports.BinaryOperator.NotIdentical, this, rhs);
    }
    /**
     * @param {?} rhs
     * @return {?}
     */
    minus(rhs) {
        return new BinaryOperatorExpr(exports.BinaryOperator.Minus, this, rhs);
    }
    /**
     * @param {?} rhs
     * @return {?}
     */
    plus(rhs) {
        return new BinaryOperatorExpr(exports.BinaryOperator.Plus, this, rhs);
    }
    /**
     * @param {?} rhs
     * @return {?}
     */
    divide(rhs) {
        return new BinaryOperatorExpr(exports.BinaryOperator.Divide, this, rhs);
    }
    /**
     * @param {?} rhs
     * @return {?}
     */
    multiply(rhs) {
        return new BinaryOperatorExpr(exports.BinaryOperator.Multiply, this, rhs);
    }
    /**
     * @param {?} rhs
     * @return {?}
     */
    modulo(rhs) {
        return new BinaryOperatorExpr(exports.BinaryOperator.Modulo, this, rhs);
    }
    /**
     * @param {?} rhs
     * @return {?}
     */
    and(rhs) {
        return new BinaryOperatorExpr(exports.BinaryOperator.And, this, rhs);
    }
    /**
     * @param {?} rhs
     * @return {?}
     */
    or(rhs) {
        return new BinaryOperatorExpr(exports.BinaryOperator.Or, this, rhs);
    }
    /**
     * @param {?} rhs
     * @return {?}
     */
    lower(rhs) {
        return new BinaryOperatorExpr(exports.BinaryOperator.Lower, this, rhs);
    }
    /**
     * @param {?} rhs
     * @return {?}
     */
    lowerEquals(rhs) {
        return new BinaryOperatorExpr(exports.BinaryOperator.LowerEquals, this, rhs);
    }
    /**
     * @param {?} rhs
     * @return {?}
     */
    bigger(rhs) {
        return new BinaryOperatorExpr(exports.BinaryOperator.Bigger, this, rhs);
    }
    /**
     * @param {?} rhs
     * @return {?}
     */
    biggerEquals(rhs) {
        return new BinaryOperatorExpr(exports.BinaryOperator.BiggerEquals, this, rhs);
    }
    /**
     * @return {?}
     */
    isBlank() {
        // Note: We use equals by purpose here to compare to null and undefined in JS.
        return this.equals(exports.NULL_EXPR);
    }
    /**
     * @param {?} type
     * @return {?}
     */
    cast(type) { return new CastExpr(this, type); }
    /**
     * @return {?}
     */
    toStmt() { return new ExpressionStatement(this); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        Expression.prototype.type;
    }
}
exports.Expression = Expression;
exports.BuiltinVar = {};
exports.BuiltinVar.This = 0;
exports.BuiltinVar.Super = 1;
exports.BuiltinVar.CatchError = 2;
exports.BuiltinVar.CatchStack = 3;
exports.BuiltinVar[exports.BuiltinVar.This] = "This";
exports.BuiltinVar[exports.BuiltinVar.Super] = "Super";
exports.BuiltinVar[exports.BuiltinVar.CatchError] = "CatchError";
exports.BuiltinVar[exports.BuiltinVar.CatchStack] = "CatchStack";
class ReadVarExpr extends Expression {
    /**
     * @param {?} name
     * @param {?=} type
     */
    constructor(name, type = null) {
        super(type);
        if (lang_1.isString(name)) {
            this.name = name;
            this.builtin = null;
        }
        else {
            this.name = null;
            this.builtin = name;
        }
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitReadVarExpr(this, context);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set(value) { return new WriteVarExpr(this.name, value); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ReadVarExpr.prototype.name;
        /** @type {?} */
        ReadVarExpr.prototype.builtin;
    }
}
exports.ReadVarExpr = ReadVarExpr;
class WriteVarExpr extends Expression {
    /**
     * @param {?} name
     * @param {?} value
     * @param {?=} type
     */
    constructor(name, value, type = null) {
        super(lang_1.isPresent(type) ? type : value.type);
        this.name = name;
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitWriteVarExpr(this, context);
    }
    /**
     * @param {?=} type
     * @param {?=} modifiers
     * @return {?}
     */
    toDeclStmt(type = null, modifiers = null) {
        return new DeclareVarStmt(this.name, this.value, type, modifiers);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        WriteVarExpr.prototype.value;
        /** @type {?} */
        WriteVarExpr.prototype.name;
    }
}
exports.WriteVarExpr = WriteVarExpr;
class WriteKeyExpr extends Expression {
    /**
     * @param {?} receiver
     * @param {?} index
     * @param {?} value
     * @param {?=} type
     */
    constructor(receiver, index, value, type = null) {
        super(lang_1.isPresent(type) ? type : value.type);
        this.receiver = receiver;
        this.index = index;
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitWriteKeyExpr(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        WriteKeyExpr.prototype.value;
        /** @type {?} */
        WriteKeyExpr.prototype.receiver;
        /** @type {?} */
        WriteKeyExpr.prototype.index;
    }
}
exports.WriteKeyExpr = WriteKeyExpr;
class WritePropExpr extends Expression {
    /**
     * @param {?} receiver
     * @param {?} name
     * @param {?} value
     * @param {?=} type
     */
    constructor(receiver, name, value, type = null) {
        super(lang_1.isPresent(type) ? type : value.type);
        this.receiver = receiver;
        this.name = name;
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitWritePropExpr(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        WritePropExpr.prototype.value;
        /** @type {?} */
        WritePropExpr.prototype.receiver;
        /** @type {?} */
        WritePropExpr.prototype.name;
    }
}
exports.WritePropExpr = WritePropExpr;
exports.BuiltinMethod = {};
exports.BuiltinMethod.ConcatArray = 0;
exports.BuiltinMethod.SubscribeObservable = 1;
exports.BuiltinMethod.bind = 2;
exports.BuiltinMethod[exports.BuiltinMethod.ConcatArray] = "ConcatArray";
exports.BuiltinMethod[exports.BuiltinMethod.SubscribeObservable] = "SubscribeObservable";
exports.BuiltinMethod[exports.BuiltinMethod.bind] = "bind";
class InvokeMethodExpr extends Expression {
    /**
     * @param {?} receiver
     * @param {?} method
     * @param {?} args
     * @param {?=} type
     */
    constructor(receiver, method, args, type = null) {
        super(type);
        this.receiver = receiver;
        this.args = args;
        if (lang_1.isString(method)) {
            this.name = method;
            this.builtin = null;
        }
        else {
            this.name = null;
            this.builtin = method;
        }
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitInvokeMethodExpr(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        InvokeMethodExpr.prototype.name;
        /** @type {?} */
        InvokeMethodExpr.prototype.builtin;
        /** @type {?} */
        InvokeMethodExpr.prototype.receiver;
        /** @type {?} */
        InvokeMethodExpr.prototype.args;
    }
}
exports.InvokeMethodExpr = InvokeMethodExpr;
class InvokeFunctionExpr extends Expression {
    /**
     * @param {?} fn
     * @param {?} args
     * @param {?=} type
     */
    constructor(fn, args, type = null) {
        super(type);
        this.fn = fn;
        this.args = args;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitInvokeFunctionExpr(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        InvokeFunctionExpr.prototype.fn;
        /** @type {?} */
        InvokeFunctionExpr.prototype.args;
    }
}
exports.InvokeFunctionExpr = InvokeFunctionExpr;
class InstantiateExpr extends Expression {
    /**
     * @param {?} classExpr
     * @param {?} args
     * @param {?=} type
     */
    constructor(classExpr, args, type) {
        super(type);
        this.classExpr = classExpr;
        this.args = args;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitInstantiateExpr(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        InstantiateExpr.prototype.classExpr;
        /** @type {?} */
        InstantiateExpr.prototype.args;
    }
}
exports.InstantiateExpr = InstantiateExpr;
class LiteralExpr extends Expression {
    /**
     * @param {?} value
     * @param {?=} type
     */
    constructor(value, type = null) {
        super(type);
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitLiteralExpr(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        LiteralExpr.prototype.value;
    }
}
exports.LiteralExpr = LiteralExpr;
class ExternalExpr extends Expression {
    /**
     * @param {?} value
     * @param {?=} type
     * @param {?=} typeParams
     */
    constructor(value, type = null, typeParams = null) {
        super(type);
        this.value = value;
        this.typeParams = typeParams;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitExternalExpr(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ExternalExpr.prototype.value;
        /** @type {?} */
        ExternalExpr.prototype.typeParams;
    }
}
exports.ExternalExpr = ExternalExpr;
class ConditionalExpr extends Expression {
    /**
     * @param {?} condition
     * @param {?} trueCase
     * @param {?=} falseCase
     * @param {?=} type
     */
    constructor(condition, trueCase, falseCase = null, type = null) {
        super(lang_1.isPresent(type) ? type : trueCase.type);
        this.condition = condition;
        this.falseCase = falseCase;
        this.trueCase = trueCase;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitConditionalExpr(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ConditionalExpr.prototype.trueCase;
        /** @type {?} */
        ConditionalExpr.prototype.condition;
        /** @type {?} */
        ConditionalExpr.prototype.falseCase;
    }
}
exports.ConditionalExpr = ConditionalExpr;
class NotExpr extends Expression {
    /**
     * @param {?} condition
     */
    constructor(condition) {
        super(exports.BOOL_TYPE);
        this.condition = condition;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitNotExpr(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        NotExpr.prototype.condition;
    }
}
exports.NotExpr = NotExpr;
class CastExpr extends Expression {
    /**
     * @param {?} value
     * @param {?} type
     */
    constructor(value, type) {
        super(type);
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitCastExpr(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CastExpr.prototype.value;
    }
}
exports.CastExpr = CastExpr;
class FnParam {
    /**
     * @param {?} name
     * @param {?=} type
     */
    constructor(name, type = null) {
        this.name = name;
        this.type = type;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        FnParam.prototype.name;
        /** @type {?} */
        FnParam.prototype.type;
    }
}
exports.FnParam = FnParam;
class FunctionExpr extends Expression {
    /**
     * @param {?} params
     * @param {?} statements
     * @param {?=} type
     */
    constructor(params, statements, type = null) {
        super(type);
        this.params = params;
        this.statements = statements;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitFunctionExpr(this, context);
    }
    /**
     * @param {?} name
     * @param {?=} modifiers
     * @return {?}
     */
    toDeclStmt(name, modifiers = null) {
        return new DeclareFunctionStmt(name, this.params, this.statements, this.type, modifiers);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        FunctionExpr.prototype.params;
        /** @type {?} */
        FunctionExpr.prototype.statements;
    }
}
exports.FunctionExpr = FunctionExpr;
class BinaryOperatorExpr extends Expression {
    /**
     * @param {?} operator
     * @param {?} lhs
     * @param {?} rhs
     * @param {?=} type
     */
    constructor(operator, lhs, rhs, type = null) {
        super(lang_1.isPresent(type) ? type : lhs.type);
        this.operator = operator;
        this.rhs = rhs;
        this.lhs = lhs;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitBinaryOperatorExpr(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BinaryOperatorExpr.prototype.lhs;
        /** @type {?} */
        BinaryOperatorExpr.prototype.operator;
        /** @type {?} */
        BinaryOperatorExpr.prototype.rhs;
    }
}
exports.BinaryOperatorExpr = BinaryOperatorExpr;
class ReadPropExpr extends Expression {
    /**
     * @param {?} receiver
     * @param {?} name
     * @param {?=} type
     */
    constructor(receiver, name, type = null) {
        super(type);
        this.receiver = receiver;
        this.name = name;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitReadPropExpr(this, context);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set(value) {
        return new WritePropExpr(this.receiver, this.name, value);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ReadPropExpr.prototype.receiver;
        /** @type {?} */
        ReadPropExpr.prototype.name;
    }
}
exports.ReadPropExpr = ReadPropExpr;
class ReadKeyExpr extends Expression {
    /**
     * @param {?} receiver
     * @param {?} index
     * @param {?=} type
     */
    constructor(receiver, index, type = null) {
        super(type);
        this.receiver = receiver;
        this.index = index;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitReadKeyExpr(this, context);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set(value) {
        return new WriteKeyExpr(this.receiver, this.index, value);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ReadKeyExpr.prototype.receiver;
        /** @type {?} */
        ReadKeyExpr.prototype.index;
    }
}
exports.ReadKeyExpr = ReadKeyExpr;
class LiteralArrayExpr extends Expression {
    /**
     * @param {?} entries
     * @param {?=} type
     */
    constructor(entries, type = null) {
        super(type);
        this.entries = entries;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitLiteralArrayExpr(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        LiteralArrayExpr.prototype.entries;
    }
}
exports.LiteralArrayExpr = LiteralArrayExpr;
class LiteralMapExpr extends Expression {
    /**
     * @param {?} entries
     * @param {?=} type
     */
    constructor(entries, type = null) {
        super(type);
        this.entries = entries;
        this.valueType = null;
        if (lang_1.isPresent(type)) {
            this.valueType = type.valueType;
        }
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitLiteralMapExpr(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        LiteralMapExpr.prototype.valueType;
        /** @type {?} */
        LiteralMapExpr.prototype.entries;
    }
}
exports.LiteralMapExpr = LiteralMapExpr;
exports.THIS_EXPR = new ReadVarExpr(exports.BuiltinVar.This);
exports.SUPER_EXPR = new ReadVarExpr(exports.BuiltinVar.Super);
exports.CATCH_ERROR_VAR = new ReadVarExpr(exports.BuiltinVar.CatchError);
exports.CATCH_STACK_VAR = new ReadVarExpr(exports.BuiltinVar.CatchStack);
exports.NULL_EXPR = new LiteralExpr(null, null);
exports.StmtModifier = {};
exports.StmtModifier.Final = 0;
exports.StmtModifier.Private = 1;
exports.StmtModifier[exports.StmtModifier.Final] = "Final";
exports.StmtModifier[exports.StmtModifier.Private] = "Private";
class Statement {
    /**
     * @param {?=} modifiers
     */
    constructor(modifiers = null) {
        this.modifiers = modifiers;
        if (lang_1.isBlank(modifiers)) {
            this.modifiers = [];
        }
    }
    /**
     * @param {?} modifier
     * @return {?}
     */
    hasModifier(modifier) { return this.modifiers.indexOf(modifier) !== -1; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        Statement.prototype.modifiers;
    }
}
exports.Statement = Statement;
class DeclareVarStmt extends Statement {
    /**
     * @param {?} name
     * @param {?} value
     * @param {?=} type
     * @param {?=} modifiers
     */
    constructor(name, value, type = null, modifiers = null) {
        super(modifiers);
        this.name = name;
        this.value = value;
        this.type = lang_1.isPresent(type) ? type : value.type;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitStatement(visitor, context) {
        return visitor.visitDeclareVarStmt(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DeclareVarStmt.prototype.type;
        /** @type {?} */
        DeclareVarStmt.prototype.name;
        /** @type {?} */
        DeclareVarStmt.prototype.value;
    }
}
exports.DeclareVarStmt = DeclareVarStmt;
class DeclareFunctionStmt extends Statement {
    /**
     * @param {?} name
     * @param {?} params
     * @param {?} statements
     * @param {?=} type
     * @param {?=} modifiers
     */
    constructor(name, params, statements, type = null, modifiers = null) {
        super(modifiers);
        this.name = name;
        this.params = params;
        this.statements = statements;
        this.type = type;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitStatement(visitor, context) {
        return visitor.visitDeclareFunctionStmt(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DeclareFunctionStmt.prototype.name;
        /** @type {?} */
        DeclareFunctionStmt.prototype.params;
        /** @type {?} */
        DeclareFunctionStmt.prototype.statements;
        /** @type {?} */
        DeclareFunctionStmt.prototype.type;
    }
}
exports.DeclareFunctionStmt = DeclareFunctionStmt;
class ExpressionStatement extends Statement {
    /**
     * @param {?} expr
     */
    constructor(expr) {
        super();
        this.expr = expr;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitStatement(visitor, context) {
        return visitor.visitExpressionStmt(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ExpressionStatement.prototype.expr;
    }
}
exports.ExpressionStatement = ExpressionStatement;
class ReturnStatement extends Statement {
    /**
     * @param {?} value
     */
    constructor(value) {
        super();
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitStatement(visitor, context) {
        return visitor.visitReturnStmt(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ReturnStatement.prototype.value;
    }
}
exports.ReturnStatement = ReturnStatement;
class AbstractClassPart {
    /**
     * @param {?=} type
     * @param {?} modifiers
     */
    constructor(type = null, modifiers) {
        this.type = type;
        this.modifiers = modifiers;
        if (lang_1.isBlank(modifiers)) {
            this.modifiers = [];
        }
    }
    /**
     * @param {?} modifier
     * @return {?}
     */
    hasModifier(modifier) { return this.modifiers.indexOf(modifier) !== -1; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        AbstractClassPart.prototype.type;
        /** @type {?} */
        AbstractClassPart.prototype.modifiers;
    }
}
exports.AbstractClassPart = AbstractClassPart;
class ClassField extends AbstractClassPart {
    /**
     * @param {?} name
     * @param {?=} type
     * @param {?=} modifiers
     */
    constructor(name, type = null, modifiers = null) {
        super(type, modifiers);
        this.name = name;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ClassField.prototype.name;
    }
}
exports.ClassField = ClassField;
class ClassMethod extends AbstractClassPart {
    /**
     * @param {?} name
     * @param {?} params
     * @param {?} body
     * @param {?=} type
     * @param {?=} modifiers
     */
    constructor(name, params, body, type = null, modifiers = null) {
        super(type, modifiers);
        this.name = name;
        this.params = params;
        this.body = body;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ClassMethod.prototype.name;
        /** @type {?} */
        ClassMethod.prototype.params;
        /** @type {?} */
        ClassMethod.prototype.body;
    }
}
exports.ClassMethod = ClassMethod;
class ClassGetter extends AbstractClassPart {
    /**
     * @param {?} name
     * @param {?} body
     * @param {?=} type
     * @param {?=} modifiers
     */
    constructor(name, body, type = null, modifiers = null) {
        super(type, modifiers);
        this.name = name;
        this.body = body;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ClassGetter.prototype.name;
        /** @type {?} */
        ClassGetter.prototype.body;
    }
}
exports.ClassGetter = ClassGetter;
class ClassStmt extends Statement {
    /**
     * @param {?} name
     * @param {?} parent
     * @param {?} fields
     * @param {?} getters
     * @param {?} constructorMethod
     * @param {?} methods
     * @param {?=} modifiers
     */
    constructor(name, parent, fields, getters, constructorMethod, methods, modifiers = null) {
        super(modifiers);
        this.name = name;
        this.parent = parent;
        this.fields = fields;
        this.getters = getters;
        this.constructorMethod = constructorMethod;
        this.methods = methods;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitStatement(visitor, context) {
        return visitor.visitDeclareClassStmt(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ClassStmt.prototype.name;
        /** @type {?} */
        ClassStmt.prototype.parent;
        /** @type {?} */
        ClassStmt.prototype.fields;
        /** @type {?} */
        ClassStmt.prototype.getters;
        /** @type {?} */
        ClassStmt.prototype.constructorMethod;
        /** @type {?} */
        ClassStmt.prototype.methods;
    }
}
exports.ClassStmt = ClassStmt;
class IfStmt extends Statement {
    /**
     * @param {?} condition
     * @param {?} trueCase
     * @param {?=} falseCase
     */
    constructor(condition, trueCase, falseCase = []) {
        super();
        this.condition = condition;
        this.trueCase = trueCase;
        this.falseCase = falseCase;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitStatement(visitor, context) {
        return visitor.visitIfStmt(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        IfStmt.prototype.condition;
        /** @type {?} */
        IfStmt.prototype.trueCase;
        /** @type {?} */
        IfStmt.prototype.falseCase;
    }
}
exports.IfStmt = IfStmt;
class CommentStmt extends Statement {
    /**
     * @param {?} comment
     */
    constructor(comment) {
        super();
        this.comment = comment;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitStatement(visitor, context) {
        return visitor.visitCommentStmt(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CommentStmt.prototype.comment;
    }
}
exports.CommentStmt = CommentStmt;
class TryCatchStmt extends Statement {
    /**
     * @param {?} bodyStmts
     * @param {?} catchStmts
     */
    constructor(bodyStmts, catchStmts) {
        super();
        this.bodyStmts = bodyStmts;
        this.catchStmts = catchStmts;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitStatement(visitor, context) {
        return visitor.visitTryCatchStmt(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TryCatchStmt.prototype.bodyStmts;
        /** @type {?} */
        TryCatchStmt.prototype.catchStmts;
    }
}
exports.TryCatchStmt = TryCatchStmt;
class ThrowStmt extends Statement {
    /**
     * @param {?} error
     */
    constructor(error) {
        super();
        this.error = error;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitStatement(visitor, context) {
        return visitor.visitThrowStmt(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ThrowStmt.prototype.error;
    }
}
exports.ThrowStmt = ThrowStmt;
class ExpressionTransformer {
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitReadVarExpr(ast, context) { return ast; }
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    visitWriteVarExpr(expr, context) {
        return new WriteVarExpr(expr.name, expr.value.visitExpression(this, context));
    }
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    visitWriteKeyExpr(expr, context) {
        return new WriteKeyExpr(expr.receiver.visitExpression(this, context), expr.index.visitExpression(this, context), expr.value.visitExpression(this, context));
    }
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    visitWritePropExpr(expr, context) {
        return new WritePropExpr(expr.receiver.visitExpression(this, context), expr.name, expr.value.visitExpression(this, context));
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitInvokeMethodExpr(ast, context) {
        var /** @type {?} */ method = lang_1.isPresent(ast.builtin) ? ast.builtin : ast.name;
        return new InvokeMethodExpr(ast.receiver.visitExpression(this, context), method, this.visitAllExpressions(ast.args, context), ast.type);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitInvokeFunctionExpr(ast, context) {
        return new InvokeFunctionExpr(ast.fn.visitExpression(this, context), this.visitAllExpressions(ast.args, context), ast.type);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitInstantiateExpr(ast, context) {
        return new InstantiateExpr(ast.classExpr.visitExpression(this, context), this.visitAllExpressions(ast.args, context), ast.type);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralExpr(ast, context) { return ast; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitExternalExpr(ast, context) { return ast; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitConditionalExpr(ast, context) {
        return new ConditionalExpr(ast.condition.visitExpression(this, context), ast.trueCase.visitExpression(this, context), ast.falseCase.visitExpression(this, context));
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitNotExpr(ast, context) {
        return new NotExpr(ast.condition.visitExpression(this, context));
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitCastExpr(ast, context) {
        return new CastExpr(ast.value.visitExpression(this, context), context);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitFunctionExpr(ast, context) {
        // Don't descend into nested functions
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitBinaryOperatorExpr(ast, context) {
        return new BinaryOperatorExpr(ast.operator, ast.lhs.visitExpression(this, context), ast.rhs.visitExpression(this, context), ast.type);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitReadPropExpr(ast, context) {
        return new ReadPropExpr(ast.receiver.visitExpression(this, context), ast.name, ast.type);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitReadKeyExpr(ast, context) {
        return new ReadKeyExpr(ast.receiver.visitExpression(this, context), ast.index.visitExpression(this, context), ast.type);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralArrayExpr(ast, context) {
        return new LiteralArrayExpr(this.visitAllExpressions(ast.entries, context));
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralMapExpr(ast, context) {
        return new LiteralMapExpr(ast.entries.map((entry) => [entry[0], ((entry[1])).visitExpression(this, context)]));
    }
    /**
     * @param {?} exprs
     * @param {?} context
     * @return {?}
     */
    visitAllExpressions(exprs, context) {
        return exprs.map(expr => expr.visitExpression(this, context));
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitDeclareVarStmt(stmt, context) {
        return new DeclareVarStmt(stmt.name, stmt.value.visitExpression(this, context), stmt.type, stmt.modifiers);
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitDeclareFunctionStmt(stmt, context) {
        // Don't descend into nested functions
        return stmt;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitExpressionStmt(stmt, context) {
        return new ExpressionStatement(stmt.expr.visitExpression(this, context));
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitReturnStmt(stmt, context) {
        return new ReturnStatement(stmt.value.visitExpression(this, context));
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitDeclareClassStmt(stmt, context) {
        // Don't descend into nested functions
        return stmt;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitIfStmt(stmt, context) {
        return new IfStmt(stmt.condition.visitExpression(this, context), this.visitAllStatements(stmt.trueCase, context), this.visitAllStatements(stmt.falseCase, context));
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitTryCatchStmt(stmt, context) {
        return new TryCatchStmt(this.visitAllStatements(stmt.bodyStmts, context), this.visitAllStatements(stmt.catchStmts, context));
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitThrowStmt(stmt, context) {
        return new ThrowStmt(stmt.error.visitExpression(this, context));
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitCommentStmt(stmt, context) { return stmt; }
    /**
     * @param {?} stmts
     * @param {?} context
     * @return {?}
     */
    visitAllStatements(stmts, context) {
        return stmts.map(stmt => stmt.visitStatement(this, context));
    }
}
exports.ExpressionTransformer = ExpressionTransformer;
class RecursiveExpressionVisitor {
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitReadVarExpr(ast, context) { return ast; }
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    visitWriteVarExpr(expr, context) {
        expr.value.visitExpression(this, context);
        return expr;
    }
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    visitWriteKeyExpr(expr, context) {
        expr.receiver.visitExpression(this, context);
        expr.index.visitExpression(this, context);
        expr.value.visitExpression(this, context);
        return expr;
    }
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    visitWritePropExpr(expr, context) {
        expr.receiver.visitExpression(this, context);
        expr.value.visitExpression(this, context);
        return expr;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitInvokeMethodExpr(ast, context) {
        ast.receiver.visitExpression(this, context);
        this.visitAllExpressions(ast.args, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitInvokeFunctionExpr(ast, context) {
        ast.fn.visitExpression(this, context);
        this.visitAllExpressions(ast.args, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitInstantiateExpr(ast, context) {
        ast.classExpr.visitExpression(this, context);
        this.visitAllExpressions(ast.args, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralExpr(ast, context) { return ast; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitExternalExpr(ast, context) { return ast; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitConditionalExpr(ast, context) {
        ast.condition.visitExpression(this, context);
        ast.trueCase.visitExpression(this, context);
        ast.falseCase.visitExpression(this, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitNotExpr(ast, context) {
        ast.condition.visitExpression(this, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitCastExpr(ast, context) {
        ast.value.visitExpression(this, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitFunctionExpr(ast, context) { return ast; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitBinaryOperatorExpr(ast, context) {
        ast.lhs.visitExpression(this, context);
        ast.rhs.visitExpression(this, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitReadPropExpr(ast, context) {
        ast.receiver.visitExpression(this, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitReadKeyExpr(ast, context) {
        ast.receiver.visitExpression(this, context);
        ast.index.visitExpression(this, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralArrayExpr(ast, context) {
        this.visitAllExpressions(ast.entries, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralMapExpr(ast, context) {
        ast.entries.forEach((entry) => ((entry[1])).visitExpression(this, context));
        return ast;
    }
    /**
     * @param {?} exprs
     * @param {?} context
     * @return {?}
     */
    visitAllExpressions(exprs, context) {
        exprs.forEach(expr => expr.visitExpression(this, context));
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitDeclareVarStmt(stmt, context) {
        stmt.value.visitExpression(this, context);
        return stmt;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitDeclareFunctionStmt(stmt, context) {
        // Don't descend into nested functions
        return stmt;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitExpressionStmt(stmt, context) {
        stmt.expr.visitExpression(this, context);
        return stmt;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitReturnStmt(stmt, context) {
        stmt.value.visitExpression(this, context);
        return stmt;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitDeclareClassStmt(stmt, context) {
        // Don't descend into nested functions
        return stmt;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitIfStmt(stmt, context) {
        stmt.condition.visitExpression(this, context);
        this.visitAllStatements(stmt.trueCase, context);
        this.visitAllStatements(stmt.falseCase, context);
        return stmt;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitTryCatchStmt(stmt, context) {
        this.visitAllStatements(stmt.bodyStmts, context);
        this.visitAllStatements(stmt.catchStmts, context);
        return stmt;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitThrowStmt(stmt, context) {
        stmt.error.visitExpression(this, context);
        return stmt;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitCommentStmt(stmt, context) { return stmt; }
    /**
     * @param {?} stmts
     * @param {?} context
     * @return {?}
     */
    visitAllStatements(stmts, context) {
        stmts.forEach(stmt => stmt.visitStatement(this, context));
    }
}
exports.RecursiveExpressionVisitor = RecursiveExpressionVisitor;
/**
 * @param {?} varName
 * @param {?} newValue
 * @param {?} expression
 * @return {?}
 */
function replaceVarInExpression(varName, newValue, expression) {
    var /** @type {?} */ transformer = new _ReplaceVariableTransformer(varName, newValue);
    return expression.visitExpression(transformer, null);
}
exports.replaceVarInExpression = replaceVarInExpression;
class _ReplaceVariableTransformer extends ExpressionTransformer {
    /**
     * @param {?} _varName
     * @param {?} _newValue
     */
    constructor(_varName, _newValue) {
        super();
        this._varName = _varName;
        this._newValue = _newValue;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitReadVarExpr(ast, context) {
        return ast.name == this._varName ? this._newValue : ast;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _ReplaceVariableTransformer.prototype._varName;
        /** @type {?} */
        _ReplaceVariableTransformer.prototype._newValue;
    }
}
/**
 * @param {?} stmts
 * @return {?}
 */
function findReadVarNames(stmts) {
    var /** @type {?} */ finder = new _VariableFinder();
    finder.visitAllStatements(stmts, null);
    return finder.varNames;
}
exports.findReadVarNames = findReadVarNames;
class _VariableFinder extends RecursiveExpressionVisitor {
    constructor(...args) {
        super(...args);
        this.varNames = new Set();
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitReadVarExpr(ast, context) {
        this.varNames.add(ast.name);
        return null;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _VariableFinder.prototype.varNames;
    }
}
/**
 * @param {?} name
 * @param {?=} type
 * @return {?}
 */
function variable(name, type = null) {
    return new ReadVarExpr(name, type);
}
exports.variable = variable;
/**
 * @param {?} id
 * @param {?=} typeParams
 * @return {?}
 */
function importExpr(id, typeParams = null) {
    return new ExternalExpr(id, null, typeParams);
}
exports.importExpr = importExpr;
/**
 * @param {?} id
 * @param {?=} typeParams
 * @param {?=} typeModifiers
 * @return {?}
 */
function importType(id, typeParams = null, typeModifiers = null) {
    return lang_1.isPresent(id) ? new ExternalType(id, typeParams, typeModifiers) : null;
}
exports.importType = importType;
/**
 * @param {?} value
 * @param {?=} type
 * @return {?}
 */
function literal(value, type = null) {
    return new LiteralExpr(value, type);
}
exports.literal = literal;
/**
 * @param {?} values
 * @param {?=} type
 * @return {?}
 */
function literalArr(values, type = null) {
    return new LiteralArrayExpr(values, type);
}
exports.literalArr = literalArr;
/**
 * @param {?} values
 * @param {?=} type
 * @return {?}
 */
function literalMap(values, type = null) {
    return new LiteralMapExpr(values, type);
}
exports.literalMap = literalMap;
/**
 * @param {?} expr
 * @return {?}
 */
function not(expr) {
    return new NotExpr(expr);
}
exports.not = not;
/**
 * @param {?} params
 * @param {?} body
 * @param {?=} type
 * @return {?}
 */
function fn(params, body, type = null) {
    return new FunctionExpr(params, body, type);
}
exports.fn = fn;
//# sourceMappingURL=output_ast.js.map