/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { isPresent } from '../facade/lang';
export var TypeModifier = {};
TypeModifier.Const = 0;
TypeModifier[TypeModifier.Const] = "Const";
export var Type = (function () {
    /**
     * @param {?=} modifiers
     */
    function Type(modifiers) {
        if (modifiers === void 0) { modifiers = null; }
        this.modifiers = modifiers;
        if (!modifiers) {
            this.modifiers = [];
        }
    }
    /**
     * @abstract
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    Type.prototype.visitType = function (visitor, context) { };
    /**
     * @param {?} modifier
     * @return {?}
     */
    Type.prototype.hasModifier = function (modifier) { return this.modifiers.indexOf(modifier) !== -1; };
    Type._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        Type.prototype.modifiers;
    };
    return Type;
}());
export var BuiltinTypeName = {};
BuiltinTypeName.Dynamic = 0;
BuiltinTypeName.Bool = 1;
BuiltinTypeName.String = 2;
BuiltinTypeName.Int = 3;
BuiltinTypeName.Number = 4;
BuiltinTypeName.Function = 5;
BuiltinTypeName.Null = 6;
BuiltinTypeName[BuiltinTypeName.Dynamic] = "Dynamic";
BuiltinTypeName[BuiltinTypeName.Bool] = "Bool";
BuiltinTypeName[BuiltinTypeName.String] = "String";
BuiltinTypeName[BuiltinTypeName.Int] = "Int";
BuiltinTypeName[BuiltinTypeName.Number] = "Number";
BuiltinTypeName[BuiltinTypeName.Function] = "Function";
BuiltinTypeName[BuiltinTypeName.Null] = "Null";
export var BuiltinType = (function (_super) {
    __extends(BuiltinType, _super);
    /**
     * @param {?} name
     * @param {?=} modifiers
     */
    function BuiltinType(name, modifiers) {
        if (modifiers === void 0) { modifiers = null; }
        _super.call(this, modifiers);
        this.name = name;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    BuiltinType.prototype.visitType = function (visitor, context) {
        return visitor.visitBuiltintType(this, context);
    };
    BuiltinType._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        BuiltinType.prototype.name;
    };
    return BuiltinType;
}(Type));
export var ExternalType = (function (_super) {
    __extends(ExternalType, _super);
    /**
     * @param {?} value
     * @param {?=} typeParams
     * @param {?=} modifiers
     */
    function ExternalType(value, typeParams, modifiers) {
        if (typeParams === void 0) { typeParams = null; }
        if (modifiers === void 0) { modifiers = null; }
        _super.call(this, modifiers);
        this.value = value;
        this.typeParams = typeParams;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    ExternalType.prototype.visitType = function (visitor, context) {
        return visitor.visitExternalType(this, context);
    };
    ExternalType._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        ExternalType.prototype.value;
        /** @type {?} */
        ExternalType.prototype.typeParams;
    };
    return ExternalType;
}(Type));
export var ArrayType = (function (_super) {
    __extends(ArrayType, _super);
    /**
     * @param {?} of
     * @param {?=} modifiers
     */
    function ArrayType(of, modifiers) {
        if (modifiers === void 0) { modifiers = null; }
        _super.call(this, modifiers);
        this.of = of;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    ArrayType.prototype.visitType = function (visitor, context) {
        return visitor.visitArrayType(this, context);
    };
    ArrayType._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        ArrayType.prototype.of;
    };
    return ArrayType;
}(Type));
export var MapType = (function (_super) {
    __extends(MapType, _super);
    /**
     * @param {?} valueType
     * @param {?=} modifiers
     */
    function MapType(valueType, modifiers) {
        if (modifiers === void 0) { modifiers = null; }
        _super.call(this, modifiers);
        this.valueType = valueType;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    MapType.prototype.visitType = function (visitor, context) { return visitor.visitMapType(this, context); };
    MapType._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        MapType.prototype.valueType;
    };
    return MapType;
}(Type));
export var /** @type {?} */ DYNAMIC_TYPE = new BuiltinType(BuiltinTypeName.Dynamic);
export var /** @type {?} */ BOOL_TYPE = new BuiltinType(BuiltinTypeName.Bool);
export var /** @type {?} */ INT_TYPE = new BuiltinType(BuiltinTypeName.Int);
export var /** @type {?} */ NUMBER_TYPE = new BuiltinType(BuiltinTypeName.Number);
export var /** @type {?} */ STRING_TYPE = new BuiltinType(BuiltinTypeName.String);
export var /** @type {?} */ FUNCTION_TYPE = new BuiltinType(BuiltinTypeName.Function);
export var /** @type {?} */ NULL_TYPE = new BuiltinType(BuiltinTypeName.Null);
export var BinaryOperator = {};
BinaryOperator.Equals = 0;
BinaryOperator.NotEquals = 1;
BinaryOperator.Identical = 2;
BinaryOperator.NotIdentical = 3;
BinaryOperator.Minus = 4;
BinaryOperator.Plus = 5;
BinaryOperator.Divide = 6;
BinaryOperator.Multiply = 7;
BinaryOperator.Modulo = 8;
BinaryOperator.And = 9;
BinaryOperator.Or = 10;
BinaryOperator.Lower = 11;
BinaryOperator.LowerEquals = 12;
BinaryOperator.Bigger = 13;
BinaryOperator.BiggerEquals = 14;
BinaryOperator[BinaryOperator.Equals] = "Equals";
BinaryOperator[BinaryOperator.NotEquals] = "NotEquals";
BinaryOperator[BinaryOperator.Identical] = "Identical";
BinaryOperator[BinaryOperator.NotIdentical] = "NotIdentical";
BinaryOperator[BinaryOperator.Minus] = "Minus";
BinaryOperator[BinaryOperator.Plus] = "Plus";
BinaryOperator[BinaryOperator.Divide] = "Divide";
BinaryOperator[BinaryOperator.Multiply] = "Multiply";
BinaryOperator[BinaryOperator.Modulo] = "Modulo";
BinaryOperator[BinaryOperator.And] = "And";
BinaryOperator[BinaryOperator.Or] = "Or";
BinaryOperator[BinaryOperator.Lower] = "Lower";
BinaryOperator[BinaryOperator.LowerEquals] = "LowerEquals";
BinaryOperator[BinaryOperator.Bigger] = "Bigger";
BinaryOperator[BinaryOperator.BiggerEquals] = "BiggerEquals";
export var Expression = (function () {
    /**
     * @param {?} type
     */
    function Expression(type) {
        this.type = type;
    }
    /**
     * @abstract
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    Expression.prototype.visitExpression = function (visitor, context) { };
    /**
     * @param {?} name
     * @return {?}
     */
    Expression.prototype.prop = function (name) { return new ReadPropExpr(this, name); };
    /**
     * @param {?} index
     * @param {?=} type
     * @return {?}
     */
    Expression.prototype.key = function (index, type) {
        if (type === void 0) { type = null; }
        return new ReadKeyExpr(this, index, type);
    };
    /**
     * @param {?} name
     * @param {?} params
     * @return {?}
     */
    Expression.prototype.callMethod = function (name, params) {
        return new InvokeMethodExpr(this, name, params);
    };
    /**
     * @param {?} params
     * @return {?}
     */
    Expression.prototype.callFn = function (params) { return new InvokeFunctionExpr(this, params); };
    /**
     * @param {?} params
     * @param {?=} type
     * @return {?}
     */
    Expression.prototype.instantiate = function (params, type) {
        if (type === void 0) { type = null; }
        return new InstantiateExpr(this, params, type);
    };
    /**
     * @param {?} trueCase
     * @param {?=} falseCase
     * @return {?}
     */
    Expression.prototype.conditional = function (trueCase, falseCase) {
        if (falseCase === void 0) { falseCase = null; }
        return new ConditionalExpr(this, trueCase, falseCase);
    };
    /**
     * @param {?} rhs
     * @return {?}
     */
    Expression.prototype.equals = function (rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Equals, this, rhs);
    };
    /**
     * @param {?} rhs
     * @return {?}
     */
    Expression.prototype.notEquals = function (rhs) {
        return new BinaryOperatorExpr(BinaryOperator.NotEquals, this, rhs);
    };
    /**
     * @param {?} rhs
     * @return {?}
     */
    Expression.prototype.identical = function (rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Identical, this, rhs);
    };
    /**
     * @param {?} rhs
     * @return {?}
     */
    Expression.prototype.notIdentical = function (rhs) {
        return new BinaryOperatorExpr(BinaryOperator.NotIdentical, this, rhs);
    };
    /**
     * @param {?} rhs
     * @return {?}
     */
    Expression.prototype.minus = function (rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Minus, this, rhs);
    };
    /**
     * @param {?} rhs
     * @return {?}
     */
    Expression.prototype.plus = function (rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Plus, this, rhs);
    };
    /**
     * @param {?} rhs
     * @return {?}
     */
    Expression.prototype.divide = function (rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Divide, this, rhs);
    };
    /**
     * @param {?} rhs
     * @return {?}
     */
    Expression.prototype.multiply = function (rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Multiply, this, rhs);
    };
    /**
     * @param {?} rhs
     * @return {?}
     */
    Expression.prototype.modulo = function (rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Modulo, this, rhs);
    };
    /**
     * @param {?} rhs
     * @return {?}
     */
    Expression.prototype.and = function (rhs) {
        return new BinaryOperatorExpr(BinaryOperator.And, this, rhs);
    };
    /**
     * @param {?} rhs
     * @return {?}
     */
    Expression.prototype.or = function (rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Or, this, rhs);
    };
    /**
     * @param {?} rhs
     * @return {?}
     */
    Expression.prototype.lower = function (rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Lower, this, rhs);
    };
    /**
     * @param {?} rhs
     * @return {?}
     */
    Expression.prototype.lowerEquals = function (rhs) {
        return new BinaryOperatorExpr(BinaryOperator.LowerEquals, this, rhs);
    };
    /**
     * @param {?} rhs
     * @return {?}
     */
    Expression.prototype.bigger = function (rhs) {
        return new BinaryOperatorExpr(BinaryOperator.Bigger, this, rhs);
    };
    /**
     * @param {?} rhs
     * @return {?}
     */
    Expression.prototype.biggerEquals = function (rhs) {
        return new BinaryOperatorExpr(BinaryOperator.BiggerEquals, this, rhs);
    };
    /**
     * @return {?}
     */
    Expression.prototype.isBlank = function () {
        // Note: We use equals by purpose here to compare to null and undefined in JS.
        // We use the typed null to allow strictNullChecks to narrow types.
        return this.equals(TYPED_NULL_EXPR);
    };
    /**
     * @param {?} type
     * @return {?}
     */
    Expression.prototype.cast = function (type) { return new CastExpr(this, type); };
    /**
     * @return {?}
     */
    Expression.prototype.toStmt = function () { return new ExpressionStatement(this); };
    Expression._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        Expression.prototype.type;
    };
    return Expression;
}());
export var BuiltinVar = {};
BuiltinVar.This = 0;
BuiltinVar.Super = 1;
BuiltinVar.CatchError = 2;
BuiltinVar.CatchStack = 3;
BuiltinVar[BuiltinVar.This] = "This";
BuiltinVar[BuiltinVar.Super] = "Super";
BuiltinVar[BuiltinVar.CatchError] = "CatchError";
BuiltinVar[BuiltinVar.CatchStack] = "CatchStack";
export var ReadVarExpr = (function (_super) {
    __extends(ReadVarExpr, _super);
    /**
     * @param {?} name
     * @param {?=} type
     */
    function ReadVarExpr(name, type) {
        if (type === void 0) { type = null; }
        _super.call(this, type);
        if (typeof name === 'string') {
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
    ReadVarExpr.prototype.visitExpression = function (visitor, context) {
        return visitor.visitReadVarExpr(this, context);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ReadVarExpr.prototype.set = function (value) { return new WriteVarExpr(this.name, value); };
    ReadVarExpr._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        ReadVarExpr.prototype.name;
        /** @type {?} */
        ReadVarExpr.prototype.builtin;
    };
    return ReadVarExpr;
}(Expression));
export var WriteVarExpr = (function (_super) {
    __extends(WriteVarExpr, _super);
    /**
     * @param {?} name
     * @param {?} value
     * @param {?=} type
     */
    function WriteVarExpr(name, value, type) {
        if (type === void 0) { type = null; }
        _super.call(this, type || value.type);
        this.name = name;
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    WriteVarExpr.prototype.visitExpression = function (visitor, context) {
        return visitor.visitWriteVarExpr(this, context);
    };
    /**
     * @param {?=} type
     * @param {?=} modifiers
     * @return {?}
     */
    WriteVarExpr.prototype.toDeclStmt = function (type, modifiers) {
        if (type === void 0) { type = null; }
        if (modifiers === void 0) { modifiers = null; }
        return new DeclareVarStmt(this.name, this.value, type, modifiers);
    };
    WriteVarExpr._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        WriteVarExpr.prototype.value;
        /** @type {?} */
        WriteVarExpr.prototype.name;
    };
    return WriteVarExpr;
}(Expression));
export var WriteKeyExpr = (function (_super) {
    __extends(WriteKeyExpr, _super);
    /**
     * @param {?} receiver
     * @param {?} index
     * @param {?} value
     * @param {?=} type
     */
    function WriteKeyExpr(receiver, index, value, type) {
        if (type === void 0) { type = null; }
        _super.call(this, type || value.type);
        this.receiver = receiver;
        this.index = index;
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    WriteKeyExpr.prototype.visitExpression = function (visitor, context) {
        return visitor.visitWriteKeyExpr(this, context);
    };
    WriteKeyExpr._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        WriteKeyExpr.prototype.value;
        /** @type {?} */
        WriteKeyExpr.prototype.receiver;
        /** @type {?} */
        WriteKeyExpr.prototype.index;
    };
    return WriteKeyExpr;
}(Expression));
export var WritePropExpr = (function (_super) {
    __extends(WritePropExpr, _super);
    /**
     * @param {?} receiver
     * @param {?} name
     * @param {?} value
     * @param {?=} type
     */
    function WritePropExpr(receiver, name, value, type) {
        if (type === void 0) { type = null; }
        _super.call(this, type || value.type);
        this.receiver = receiver;
        this.name = name;
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    WritePropExpr.prototype.visitExpression = function (visitor, context) {
        return visitor.visitWritePropExpr(this, context);
    };
    WritePropExpr._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        WritePropExpr.prototype.value;
        /** @type {?} */
        WritePropExpr.prototype.receiver;
        /** @type {?} */
        WritePropExpr.prototype.name;
    };
    return WritePropExpr;
}(Expression));
export var BuiltinMethod = {};
BuiltinMethod.ConcatArray = 0;
BuiltinMethod.SubscribeObservable = 1;
BuiltinMethod.Bind = 2;
BuiltinMethod[BuiltinMethod.ConcatArray] = "ConcatArray";
BuiltinMethod[BuiltinMethod.SubscribeObservable] = "SubscribeObservable";
BuiltinMethod[BuiltinMethod.Bind] = "Bind";
export var InvokeMethodExpr = (function (_super) {
    __extends(InvokeMethodExpr, _super);
    /**
     * @param {?} receiver
     * @param {?} method
     * @param {?} args
     * @param {?=} type
     */
    function InvokeMethodExpr(receiver, method, args, type) {
        if (type === void 0) { type = null; }
        _super.call(this, type);
        this.receiver = receiver;
        this.args = args;
        if (typeof method === 'string') {
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
    InvokeMethodExpr.prototype.visitExpression = function (visitor, context) {
        return visitor.visitInvokeMethodExpr(this, context);
    };
    InvokeMethodExpr._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        InvokeMethodExpr.prototype.name;
        /** @type {?} */
        InvokeMethodExpr.prototype.builtin;
        /** @type {?} */
        InvokeMethodExpr.prototype.receiver;
        /** @type {?} */
        InvokeMethodExpr.prototype.args;
    };
    return InvokeMethodExpr;
}(Expression));
export var InvokeFunctionExpr = (function (_super) {
    __extends(InvokeFunctionExpr, _super);
    /**
     * @param {?} fn
     * @param {?} args
     * @param {?=} type
     */
    function InvokeFunctionExpr(fn, args, type) {
        if (type === void 0) { type = null; }
        _super.call(this, type);
        this.fn = fn;
        this.args = args;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    InvokeFunctionExpr.prototype.visitExpression = function (visitor, context) {
        return visitor.visitInvokeFunctionExpr(this, context);
    };
    InvokeFunctionExpr._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        InvokeFunctionExpr.prototype.fn;
        /** @type {?} */
        InvokeFunctionExpr.prototype.args;
    };
    return InvokeFunctionExpr;
}(Expression));
export var InstantiateExpr = (function (_super) {
    __extends(InstantiateExpr, _super);
    /**
     * @param {?} classExpr
     * @param {?} args
     * @param {?=} type
     */
    function InstantiateExpr(classExpr, args, type) {
        _super.call(this, type);
        this.classExpr = classExpr;
        this.args = args;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    InstantiateExpr.prototype.visitExpression = function (visitor, context) {
        return visitor.visitInstantiateExpr(this, context);
    };
    InstantiateExpr._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        InstantiateExpr.prototype.classExpr;
        /** @type {?} */
        InstantiateExpr.prototype.args;
    };
    return InstantiateExpr;
}(Expression));
export var LiteralExpr = (function (_super) {
    __extends(LiteralExpr, _super);
    /**
     * @param {?} value
     * @param {?=} type
     */
    function LiteralExpr(value, type) {
        if (type === void 0) { type = null; }
        _super.call(this, type);
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    LiteralExpr.prototype.visitExpression = function (visitor, context) {
        return visitor.visitLiteralExpr(this, context);
    };
    LiteralExpr._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        LiteralExpr.prototype.value;
    };
    return LiteralExpr;
}(Expression));
export var ExternalExpr = (function (_super) {
    __extends(ExternalExpr, _super);
    /**
     * @param {?} value
     * @param {?=} type
     * @param {?=} typeParams
     */
    function ExternalExpr(value, type, typeParams) {
        if (type === void 0) { type = null; }
        if (typeParams === void 0) { typeParams = null; }
        _super.call(this, type);
        this.value = value;
        this.typeParams = typeParams;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    ExternalExpr.prototype.visitExpression = function (visitor, context) {
        return visitor.visitExternalExpr(this, context);
    };
    ExternalExpr._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        ExternalExpr.prototype.value;
        /** @type {?} */
        ExternalExpr.prototype.typeParams;
    };
    return ExternalExpr;
}(Expression));
export var ConditionalExpr = (function (_super) {
    __extends(ConditionalExpr, _super);
    /**
     * @param {?} condition
     * @param {?} trueCase
     * @param {?=} falseCase
     * @param {?=} type
     */
    function ConditionalExpr(condition, trueCase, falseCase, type) {
        if (falseCase === void 0) { falseCase = null; }
        if (type === void 0) { type = null; }
        _super.call(this, type || trueCase.type);
        this.condition = condition;
        this.falseCase = falseCase;
        this.trueCase = trueCase;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    ConditionalExpr.prototype.visitExpression = function (visitor, context) {
        return visitor.visitConditionalExpr(this, context);
    };
    ConditionalExpr._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        ConditionalExpr.prototype.trueCase;
        /** @type {?} */
        ConditionalExpr.prototype.condition;
        /** @type {?} */
        ConditionalExpr.prototype.falseCase;
    };
    return ConditionalExpr;
}(Expression));
export var NotExpr = (function (_super) {
    __extends(NotExpr, _super);
    /**
     * @param {?} condition
     */
    function NotExpr(condition) {
        _super.call(this, BOOL_TYPE);
        this.condition = condition;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    NotExpr.prototype.visitExpression = function (visitor, context) {
        return visitor.visitNotExpr(this, context);
    };
    NotExpr._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        NotExpr.prototype.condition;
    };
    return NotExpr;
}(Expression));
export var CastExpr = (function (_super) {
    __extends(CastExpr, _super);
    /**
     * @param {?} value
     * @param {?} type
     */
    function CastExpr(value, type) {
        _super.call(this, type);
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    CastExpr.prototype.visitExpression = function (visitor, context) {
        return visitor.visitCastExpr(this, context);
    };
    CastExpr._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        CastExpr.prototype.value;
    };
    return CastExpr;
}(Expression));
export var FnParam = (function () {
    /**
     * @param {?} name
     * @param {?=} type
     */
    function FnParam(name, type) {
        if (type === void 0) { type = null; }
        this.name = name;
        this.type = type;
    }
    FnParam._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        FnParam.prototype.name;
        /** @type {?} */
        FnParam.prototype.type;
    };
    return FnParam;
}());
export var FunctionExpr = (function (_super) {
    __extends(FunctionExpr, _super);
    /**
     * @param {?} params
     * @param {?} statements
     * @param {?=} type
     */
    function FunctionExpr(params, statements, type) {
        if (type === void 0) { type = null; }
        _super.call(this, type);
        this.params = params;
        this.statements = statements;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    FunctionExpr.prototype.visitExpression = function (visitor, context) {
        return visitor.visitFunctionExpr(this, context);
    };
    /**
     * @param {?} name
     * @param {?=} modifiers
     * @return {?}
     */
    FunctionExpr.prototype.toDeclStmt = function (name, modifiers) {
        if (modifiers === void 0) { modifiers = null; }
        return new DeclareFunctionStmt(name, this.params, this.statements, this.type, modifiers);
    };
    FunctionExpr._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        FunctionExpr.prototype.params;
        /** @type {?} */
        FunctionExpr.prototype.statements;
    };
    return FunctionExpr;
}(Expression));
export var BinaryOperatorExpr = (function (_super) {
    __extends(BinaryOperatorExpr, _super);
    /**
     * @param {?} operator
     * @param {?} lhs
     * @param {?} rhs
     * @param {?=} type
     */
    function BinaryOperatorExpr(operator, lhs, rhs, type) {
        if (type === void 0) { type = null; }
        _super.call(this, type || lhs.type);
        this.operator = operator;
        this.rhs = rhs;
        this.lhs = lhs;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    BinaryOperatorExpr.prototype.visitExpression = function (visitor, context) {
        return visitor.visitBinaryOperatorExpr(this, context);
    };
    BinaryOperatorExpr._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        BinaryOperatorExpr.prototype.lhs;
        /** @type {?} */
        BinaryOperatorExpr.prototype.operator;
        /** @type {?} */
        BinaryOperatorExpr.prototype.rhs;
    };
    return BinaryOperatorExpr;
}(Expression));
export var ReadPropExpr = (function (_super) {
    __extends(ReadPropExpr, _super);
    /**
     * @param {?} receiver
     * @param {?} name
     * @param {?=} type
     */
    function ReadPropExpr(receiver, name, type) {
        if (type === void 0) { type = null; }
        _super.call(this, type);
        this.receiver = receiver;
        this.name = name;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    ReadPropExpr.prototype.visitExpression = function (visitor, context) {
        return visitor.visitReadPropExpr(this, context);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ReadPropExpr.prototype.set = function (value) {
        return new WritePropExpr(this.receiver, this.name, value);
    };
    ReadPropExpr._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        ReadPropExpr.prototype.receiver;
        /** @type {?} */
        ReadPropExpr.prototype.name;
    };
    return ReadPropExpr;
}(Expression));
export var ReadKeyExpr = (function (_super) {
    __extends(ReadKeyExpr, _super);
    /**
     * @param {?} receiver
     * @param {?} index
     * @param {?=} type
     */
    function ReadKeyExpr(receiver, index, type) {
        if (type === void 0) { type = null; }
        _super.call(this, type);
        this.receiver = receiver;
        this.index = index;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    ReadKeyExpr.prototype.visitExpression = function (visitor, context) {
        return visitor.visitReadKeyExpr(this, context);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ReadKeyExpr.prototype.set = function (value) {
        return new WriteKeyExpr(this.receiver, this.index, value);
    };
    ReadKeyExpr._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        ReadKeyExpr.prototype.receiver;
        /** @type {?} */
        ReadKeyExpr.prototype.index;
    };
    return ReadKeyExpr;
}(Expression));
export var LiteralArrayExpr = (function (_super) {
    __extends(LiteralArrayExpr, _super);
    /**
     * @param {?} entries
     * @param {?=} type
     */
    function LiteralArrayExpr(entries, type) {
        if (type === void 0) { type = null; }
        _super.call(this, type);
        this.entries = entries;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    LiteralArrayExpr.prototype.visitExpression = function (visitor, context) {
        return visitor.visitLiteralArrayExpr(this, context);
    };
    LiteralArrayExpr._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        LiteralArrayExpr.prototype.entries;
    };
    return LiteralArrayExpr;
}(Expression));
export var LiteralMapExpr = (function (_super) {
    __extends(LiteralMapExpr, _super);
    /**
     * @param {?} entries
     * @param {?=} type
     */
    function LiteralMapExpr(entries, type) {
        if (type === void 0) { type = null; }
        _super.call(this, type);
        this.entries = entries;
        this.valueType = null;
        if (isPresent(type)) {
            this.valueType = type.valueType;
        }
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    LiteralMapExpr.prototype.visitExpression = function (visitor, context) {
        return visitor.visitLiteralMapExpr(this, context);
    };
    LiteralMapExpr._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        LiteralMapExpr.prototype.valueType;
        /** @type {?} */
        LiteralMapExpr.prototype.entries;
    };
    return LiteralMapExpr;
}(Expression));
export var /** @type {?} */ THIS_EXPR = new ReadVarExpr(BuiltinVar.This);
export var /** @type {?} */ SUPER_EXPR = new ReadVarExpr(BuiltinVar.Super);
export var /** @type {?} */ CATCH_ERROR_VAR = new ReadVarExpr(BuiltinVar.CatchError);
export var /** @type {?} */ CATCH_STACK_VAR = new ReadVarExpr(BuiltinVar.CatchStack);
export var /** @type {?} */ NULL_EXPR = new LiteralExpr(null, null);
export var /** @type {?} */ TYPED_NULL_EXPR = new LiteralExpr(null, NULL_TYPE);
export var StmtModifier = {};
StmtModifier.Final = 0;
StmtModifier.Private = 1;
StmtModifier[StmtModifier.Final] = "Final";
StmtModifier[StmtModifier.Private] = "Private";
export var Statement = (function () {
    /**
     * @param {?=} modifiers
     */
    function Statement(modifiers) {
        if (modifiers === void 0) { modifiers = null; }
        this.modifiers = modifiers;
        if (!modifiers) {
            this.modifiers = [];
        }
    }
    /**
     * @abstract
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    Statement.prototype.visitStatement = function (visitor, context) { };
    /**
     * @param {?} modifier
     * @return {?}
     */
    Statement.prototype.hasModifier = function (modifier) { return this.modifiers.indexOf(modifier) !== -1; };
    Statement._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        Statement.prototype.modifiers;
    };
    return Statement;
}());
export var DeclareVarStmt = (function (_super) {
    __extends(DeclareVarStmt, _super);
    /**
     * @param {?} name
     * @param {?} value
     * @param {?=} type
     * @param {?=} modifiers
     */
    function DeclareVarStmt(name, value, type, modifiers) {
        if (type === void 0) { type = null; }
        if (modifiers === void 0) { modifiers = null; }
        _super.call(this, modifiers);
        this.name = name;
        this.value = value;
        this.type = type || value.type;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    DeclareVarStmt.prototype.visitStatement = function (visitor, context) {
        return visitor.visitDeclareVarStmt(this, context);
    };
    DeclareVarStmt._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        DeclareVarStmt.prototype.type;
        /** @type {?} */
        DeclareVarStmt.prototype.name;
        /** @type {?} */
        DeclareVarStmt.prototype.value;
    };
    return DeclareVarStmt;
}(Statement));
export var DeclareFunctionStmt = (function (_super) {
    __extends(DeclareFunctionStmt, _super);
    /**
     * @param {?} name
     * @param {?} params
     * @param {?} statements
     * @param {?=} type
     * @param {?=} modifiers
     */
    function DeclareFunctionStmt(name, params, statements, type, modifiers) {
        if (type === void 0) { type = null; }
        if (modifiers === void 0) { modifiers = null; }
        _super.call(this, modifiers);
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
    DeclareFunctionStmt.prototype.visitStatement = function (visitor, context) {
        return visitor.visitDeclareFunctionStmt(this, context);
    };
    DeclareFunctionStmt._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        DeclareFunctionStmt.prototype.name;
        /** @type {?} */
        DeclareFunctionStmt.prototype.params;
        /** @type {?} */
        DeclareFunctionStmt.prototype.statements;
        /** @type {?} */
        DeclareFunctionStmt.prototype.type;
    };
    return DeclareFunctionStmt;
}(Statement));
export var ExpressionStatement = (function (_super) {
    __extends(ExpressionStatement, _super);
    /**
     * @param {?} expr
     */
    function ExpressionStatement(expr) {
        _super.call(this);
        this.expr = expr;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    ExpressionStatement.prototype.visitStatement = function (visitor, context) {
        return visitor.visitExpressionStmt(this, context);
    };
    ExpressionStatement._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        ExpressionStatement.prototype.expr;
    };
    return ExpressionStatement;
}(Statement));
export var ReturnStatement = (function (_super) {
    __extends(ReturnStatement, _super);
    /**
     * @param {?} value
     */
    function ReturnStatement(value) {
        _super.call(this);
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    ReturnStatement.prototype.visitStatement = function (visitor, context) {
        return visitor.visitReturnStmt(this, context);
    };
    ReturnStatement._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        ReturnStatement.prototype.value;
    };
    return ReturnStatement;
}(Statement));
export var AbstractClassPart = (function () {
    /**
     * @param {?=} type
     * @param {?} modifiers
     */
    function AbstractClassPart(type, modifiers) {
        if (type === void 0) { type = null; }
        this.type = type;
        this.modifiers = modifiers;
        if (!modifiers) {
            this.modifiers = [];
        }
    }
    /**
     * @param {?} modifier
     * @return {?}
     */
    AbstractClassPart.prototype.hasModifier = function (modifier) { return this.modifiers.indexOf(modifier) !== -1; };
    AbstractClassPart._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        AbstractClassPart.prototype.type;
        /** @type {?} */
        AbstractClassPart.prototype.modifiers;
    };
    return AbstractClassPart;
}());
export var ClassField = (function (_super) {
    __extends(ClassField, _super);
    /**
     * @param {?} name
     * @param {?=} type
     * @param {?=} modifiers
     */
    function ClassField(name, type, modifiers) {
        if (type === void 0) { type = null; }
        if (modifiers === void 0) { modifiers = null; }
        _super.call(this, type, modifiers);
        this.name = name;
    }
    ClassField._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        ClassField.prototype.name;
    };
    return ClassField;
}(AbstractClassPart));
export var ClassMethod = (function (_super) {
    __extends(ClassMethod, _super);
    /**
     * @param {?} name
     * @param {?} params
     * @param {?} body
     * @param {?=} type
     * @param {?=} modifiers
     */
    function ClassMethod(name, params, body, type, modifiers) {
        if (type === void 0) { type = null; }
        if (modifiers === void 0) { modifiers = null; }
        _super.call(this, type, modifiers);
        this.name = name;
        this.params = params;
        this.body = body;
    }
    ClassMethod._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        ClassMethod.prototype.name;
        /** @type {?} */
        ClassMethod.prototype.params;
        /** @type {?} */
        ClassMethod.prototype.body;
    };
    return ClassMethod;
}(AbstractClassPart));
export var ClassGetter = (function (_super) {
    __extends(ClassGetter, _super);
    /**
     * @param {?} name
     * @param {?} body
     * @param {?=} type
     * @param {?=} modifiers
     */
    function ClassGetter(name, body, type, modifiers) {
        if (type === void 0) { type = null; }
        if (modifiers === void 0) { modifiers = null; }
        _super.call(this, type, modifiers);
        this.name = name;
        this.body = body;
    }
    ClassGetter._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        ClassGetter.prototype.name;
        /** @type {?} */
        ClassGetter.prototype.body;
    };
    return ClassGetter;
}(AbstractClassPart));
export var ClassStmt = (function (_super) {
    __extends(ClassStmt, _super);
    /**
     * @param {?} name
     * @param {?} parent
     * @param {?} fields
     * @param {?} getters
     * @param {?} constructorMethod
     * @param {?} methods
     * @param {?=} modifiers
     */
    function ClassStmt(name, parent, fields, getters, constructorMethod, methods, modifiers) {
        if (modifiers === void 0) { modifiers = null; }
        _super.call(this, modifiers);
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
    ClassStmt.prototype.visitStatement = function (visitor, context) {
        return visitor.visitDeclareClassStmt(this, context);
    };
    ClassStmt._tsickle_typeAnnotationsHelper = function () {
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
    };
    return ClassStmt;
}(Statement));
export var IfStmt = (function (_super) {
    __extends(IfStmt, _super);
    /**
     * @param {?} condition
     * @param {?} trueCase
     * @param {?=} falseCase
     */
    function IfStmt(condition, trueCase, falseCase) {
        if (falseCase === void 0) { falseCase = []; }
        _super.call(this);
        this.condition = condition;
        this.trueCase = trueCase;
        this.falseCase = falseCase;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    IfStmt.prototype.visitStatement = function (visitor, context) {
        return visitor.visitIfStmt(this, context);
    };
    IfStmt._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        IfStmt.prototype.condition;
        /** @type {?} */
        IfStmt.prototype.trueCase;
        /** @type {?} */
        IfStmt.prototype.falseCase;
    };
    return IfStmt;
}(Statement));
export var CommentStmt = (function (_super) {
    __extends(CommentStmt, _super);
    /**
     * @param {?} comment
     */
    function CommentStmt(comment) {
        _super.call(this);
        this.comment = comment;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    CommentStmt.prototype.visitStatement = function (visitor, context) {
        return visitor.visitCommentStmt(this, context);
    };
    CommentStmt._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        CommentStmt.prototype.comment;
    };
    return CommentStmt;
}(Statement));
export var TryCatchStmt = (function (_super) {
    __extends(TryCatchStmt, _super);
    /**
     * @param {?} bodyStmts
     * @param {?} catchStmts
     */
    function TryCatchStmt(bodyStmts, catchStmts) {
        _super.call(this);
        this.bodyStmts = bodyStmts;
        this.catchStmts = catchStmts;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    TryCatchStmt.prototype.visitStatement = function (visitor, context) {
        return visitor.visitTryCatchStmt(this, context);
    };
    TryCatchStmt._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        TryCatchStmt.prototype.bodyStmts;
        /** @type {?} */
        TryCatchStmt.prototype.catchStmts;
    };
    return TryCatchStmt;
}(Statement));
export var ThrowStmt = (function (_super) {
    __extends(ThrowStmt, _super);
    /**
     * @param {?} error
     */
    function ThrowStmt(error) {
        _super.call(this);
        this.error = error;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    ThrowStmt.prototype.visitStatement = function (visitor, context) {
        return visitor.visitThrowStmt(this, context);
    };
    ThrowStmt._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        ThrowStmt.prototype.error;
    };
    return ThrowStmt;
}(Statement));
export var ExpressionTransformer = (function () {
    function ExpressionTransformer() {
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitReadVarExpr = function (ast, context) { return ast; };
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitWriteVarExpr = function (expr, context) {
        return new WriteVarExpr(expr.name, expr.value.visitExpression(this, context));
    };
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitWriteKeyExpr = function (expr, context) {
        return new WriteKeyExpr(expr.receiver.visitExpression(this, context), expr.index.visitExpression(this, context), expr.value.visitExpression(this, context));
    };
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitWritePropExpr = function (expr, context) {
        return new WritePropExpr(expr.receiver.visitExpression(this, context), expr.name, expr.value.visitExpression(this, context));
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitInvokeMethodExpr = function (ast, context) {
        var /** @type {?} */ method = ast.builtin || ast.name;
        return new InvokeMethodExpr(ast.receiver.visitExpression(this, context), method, this.visitAllExpressions(ast.args, context), ast.type);
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitInvokeFunctionExpr = function (ast, context) {
        return new InvokeFunctionExpr(ast.fn.visitExpression(this, context), this.visitAllExpressions(ast.args, context), ast.type);
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitInstantiateExpr = function (ast, context) {
        return new InstantiateExpr(ast.classExpr.visitExpression(this, context), this.visitAllExpressions(ast.args, context), ast.type);
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitLiteralExpr = function (ast, context) { return ast; };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitExternalExpr = function (ast, context) { return ast; };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitConditionalExpr = function (ast, context) {
        return new ConditionalExpr(ast.condition.visitExpression(this, context), ast.trueCase.visitExpression(this, context), ast.falseCase.visitExpression(this, context));
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitNotExpr = function (ast, context) {
        return new NotExpr(ast.condition.visitExpression(this, context));
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitCastExpr = function (ast, context) {
        return new CastExpr(ast.value.visitExpression(this, context), context);
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitFunctionExpr = function (ast, context) {
        // Don't descend into nested functions
        return ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitBinaryOperatorExpr = function (ast, context) {
        return new BinaryOperatorExpr(ast.operator, ast.lhs.visitExpression(this, context), ast.rhs.visitExpression(this, context), ast.type);
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitReadPropExpr = function (ast, context) {
        return new ReadPropExpr(ast.receiver.visitExpression(this, context), ast.name, ast.type);
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitReadKeyExpr = function (ast, context) {
        return new ReadKeyExpr(ast.receiver.visitExpression(this, context), ast.index.visitExpression(this, context), ast.type);
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitLiteralArrayExpr = function (ast, context) {
        return new LiteralArrayExpr(this.visitAllExpressions(ast.entries, context));
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitLiteralMapExpr = function (ast, context) {
        var _this = this;
        var /** @type {?} */ entries = ast.entries.map(function (entry) { return [entry[0], entry[1].visitExpression(_this, context),]; });
        return new LiteralMapExpr(entries);
    };
    /**
     * @param {?} exprs
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitAllExpressions = function (exprs, context) {
        var _this = this;
        return exprs.map(function (expr) { return expr.visitExpression(_this, context); });
    };
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitDeclareVarStmt = function (stmt, context) {
        return new DeclareVarStmt(stmt.name, stmt.value.visitExpression(this, context), stmt.type, stmt.modifiers);
    };
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitDeclareFunctionStmt = function (stmt, context) {
        // Don't descend into nested functions
        return stmt;
    };
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitExpressionStmt = function (stmt, context) {
        return new ExpressionStatement(stmt.expr.visitExpression(this, context));
    };
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitReturnStmt = function (stmt, context) {
        return new ReturnStatement(stmt.value.visitExpression(this, context));
    };
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitDeclareClassStmt = function (stmt, context) {
        // Don't descend into nested functions
        return stmt;
    };
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitIfStmt = function (stmt, context) {
        return new IfStmt(stmt.condition.visitExpression(this, context), this.visitAllStatements(stmt.trueCase, context), this.visitAllStatements(stmt.falseCase, context));
    };
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitTryCatchStmt = function (stmt, context) {
        return new TryCatchStmt(this.visitAllStatements(stmt.bodyStmts, context), this.visitAllStatements(stmt.catchStmts, context));
    };
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitThrowStmt = function (stmt, context) {
        return new ThrowStmt(stmt.error.visitExpression(this, context));
    };
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitCommentStmt = function (stmt, context) { return stmt; };
    /**
     * @param {?} stmts
     * @param {?} context
     * @return {?}
     */
    ExpressionTransformer.prototype.visitAllStatements = function (stmts, context) {
        var _this = this;
        return stmts.map(function (stmt) { return stmt.visitStatement(_this, context); });
    };
    return ExpressionTransformer;
}());
export var RecursiveExpressionVisitor = (function () {
    function RecursiveExpressionVisitor() {
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitReadVarExpr = function (ast, context) { return ast; };
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitWriteVarExpr = function (expr, context) {
        expr.value.visitExpression(this, context);
        return expr;
    };
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitWriteKeyExpr = function (expr, context) {
        expr.receiver.visitExpression(this, context);
        expr.index.visitExpression(this, context);
        expr.value.visitExpression(this, context);
        return expr;
    };
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitWritePropExpr = function (expr, context) {
        expr.receiver.visitExpression(this, context);
        expr.value.visitExpression(this, context);
        return expr;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitInvokeMethodExpr = function (ast, context) {
        ast.receiver.visitExpression(this, context);
        this.visitAllExpressions(ast.args, context);
        return ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitInvokeFunctionExpr = function (ast, context) {
        ast.fn.visitExpression(this, context);
        this.visitAllExpressions(ast.args, context);
        return ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitInstantiateExpr = function (ast, context) {
        ast.classExpr.visitExpression(this, context);
        this.visitAllExpressions(ast.args, context);
        return ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitLiteralExpr = function (ast, context) { return ast; };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitExternalExpr = function (ast, context) { return ast; };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitConditionalExpr = function (ast, context) {
        ast.condition.visitExpression(this, context);
        ast.trueCase.visitExpression(this, context);
        ast.falseCase.visitExpression(this, context);
        return ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitNotExpr = function (ast, context) {
        ast.condition.visitExpression(this, context);
        return ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitCastExpr = function (ast, context) {
        ast.value.visitExpression(this, context);
        return ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitFunctionExpr = function (ast, context) { return ast; };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitBinaryOperatorExpr = function (ast, context) {
        ast.lhs.visitExpression(this, context);
        ast.rhs.visitExpression(this, context);
        return ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitReadPropExpr = function (ast, context) {
        ast.receiver.visitExpression(this, context);
        return ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitReadKeyExpr = function (ast, context) {
        ast.receiver.visitExpression(this, context);
        ast.index.visitExpression(this, context);
        return ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitLiteralArrayExpr = function (ast, context) {
        this.visitAllExpressions(ast.entries, context);
        return ast;
    };
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitLiteralMapExpr = function (ast, context) {
        var _this = this;
        ast.entries.forEach(function (entry) { return ((entry[1])).visitExpression(_this, context); });
        return ast;
    };
    /**
     * @param {?} exprs
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitAllExpressions = function (exprs, context) {
        var _this = this;
        exprs.forEach(function (expr) { return expr.visitExpression(_this, context); });
    };
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitDeclareVarStmt = function (stmt, context) {
        stmt.value.visitExpression(this, context);
        return stmt;
    };
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitDeclareFunctionStmt = function (stmt, context) {
        // Don't descend into nested functions
        return stmt;
    };
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitExpressionStmt = function (stmt, context) {
        stmt.expr.visitExpression(this, context);
        return stmt;
    };
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitReturnStmt = function (stmt, context) {
        stmt.value.visitExpression(this, context);
        return stmt;
    };
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitDeclareClassStmt = function (stmt, context) {
        // Don't descend into nested functions
        return stmt;
    };
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitIfStmt = function (stmt, context) {
        stmt.condition.visitExpression(this, context);
        this.visitAllStatements(stmt.trueCase, context);
        this.visitAllStatements(stmt.falseCase, context);
        return stmt;
    };
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitTryCatchStmt = function (stmt, context) {
        this.visitAllStatements(stmt.bodyStmts, context);
        this.visitAllStatements(stmt.catchStmts, context);
        return stmt;
    };
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitThrowStmt = function (stmt, context) {
        stmt.error.visitExpression(this, context);
        return stmt;
    };
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitCommentStmt = function (stmt, context) { return stmt; };
    /**
     * @param {?} stmts
     * @param {?} context
     * @return {?}
     */
    RecursiveExpressionVisitor.prototype.visitAllStatements = function (stmts, context) {
        var _this = this;
        stmts.forEach(function (stmt) { return stmt.visitStatement(_this, context); });
    };
    return RecursiveExpressionVisitor;
}());
/**
 * @param {?} varName
 * @param {?} newValue
 * @param {?} expression
 * @return {?}
 */
export function replaceVarInExpression(varName, newValue, expression) {
    var /** @type {?} */ transformer = new _ReplaceVariableTransformer(varName, newValue);
    return expression.visitExpression(transformer, null);
}
var _ReplaceVariableTransformer = (function (_super) {
    __extends(_ReplaceVariableTransformer, _super);
    /**
     * @param {?} _varName
     * @param {?} _newValue
     */
    function _ReplaceVariableTransformer(_varName, _newValue) {
        _super.call(this);
        this._varName = _varName;
        this._newValue = _newValue;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    _ReplaceVariableTransformer.prototype.visitReadVarExpr = function (ast, context) {
        return ast.name == this._varName ? this._newValue : ast;
    };
    _ReplaceVariableTransformer._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        _ReplaceVariableTransformer.prototype._varName;
        /** @type {?} */
        _ReplaceVariableTransformer.prototype._newValue;
    };
    return _ReplaceVariableTransformer;
}(ExpressionTransformer));
/**
 * @param {?} stmts
 * @return {?}
 */
export function findReadVarNames(stmts) {
    var /** @type {?} */ finder = new _VariableFinder();
    finder.visitAllStatements(stmts, null);
    return finder.varNames;
}
var _VariableFinder = (function (_super) {
    __extends(_VariableFinder, _super);
    function _VariableFinder() {
        _super.apply(this, arguments);
        this.varNames = new Set();
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    _VariableFinder.prototype.visitReadVarExpr = function (ast, context) {
        this.varNames.add(ast.name);
        return null;
    };
    _VariableFinder._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        _VariableFinder.prototype.varNames;
    };
    return _VariableFinder;
}(RecursiveExpressionVisitor));
/**
 * @param {?} name
 * @param {?=} type
 * @return {?}
 */
export function variable(name, type) {
    if (type === void 0) { type = null; }
    return new ReadVarExpr(name, type);
}
/**
 * @param {?} id
 * @param {?=} typeParams
 * @return {?}
 */
export function importExpr(id, typeParams) {
    if (typeParams === void 0) { typeParams = null; }
    return new ExternalExpr(id, null, typeParams);
}
/**
 * @param {?} id
 * @param {?=} typeParams
 * @param {?=} typeModifiers
 * @return {?}
 */
export function importType(id, typeParams, typeModifiers) {
    if (typeParams === void 0) { typeParams = null; }
    if (typeModifiers === void 0) { typeModifiers = null; }
    return isPresent(id) ? new ExternalType(id, typeParams, typeModifiers) : null;
}
/**
 * @param {?} values
 * @param {?=} type
 * @return {?}
 */
export function literalArr(values, type) {
    if (type === void 0) { type = null; }
    return new LiteralArrayExpr(values, type);
}
/**
 * @param {?} values
 * @param {?=} type
 * @return {?}
 */
export function literalMap(values, type) {
    if (type === void 0) { type = null; }
    return new LiteralMapExpr(values, type);
}
/**
 * @param {?} expr
 * @return {?}
 */
export function not(expr) {
    return new NotExpr(expr);
}
/**
 * @param {?} params
 * @param {?} body
 * @param {?=} type
 * @return {?}
 */
export function fn(params, body, type) {
    if (type === void 0) { type = null; }
    return new FunctionExpr(params, body, type);
}
/**
 * @param {?} value
 * @param {?=} type
 * @return {?}
 */
export function literal(value, type) {
    if (type === void 0) { type = null; }
    return new LiteralExpr(value, type);
}
//# sourceMappingURL=output_ast.js.map