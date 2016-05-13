goog.module('_angular$compiler$src$output$output__interpreter');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var async_1 = goog.require('_angular$compiler$src$facade$async');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var o = goog.require('_angular$compiler$src$output$output__ast');
var dart_emitter_1 = goog.require('_angular$compiler$src$output$dart__emitter');
var ts_emitter_1 = goog.require('_angular$compiler$src$output$ts__emitter');
/**
 * @param {?} statements
 * @param {?} resultVar
 * @param {?} instanceFactory
 * @return {?}
 */
function interpretStatements(statements, resultVar, instanceFactory) {
    var /** @type {?} */ stmtsWithReturn = statements.concat([new o.ReturnStatement(o.variable(resultVar))]);
    var /** @type {?} */ ctx = new _ExecutionContext(null, null, null, null, new Map(), new Map(), new Map(), new Map(), instanceFactory);
    var /** @type {?} */ visitor = new StatementInterpreter();
    var /** @type {?} */ result = visitor.visitAllStatements(stmtsWithReturn, ctx);
    return lang_1.isPresent(result) ? result.value : null;
}
exports.interpretStatements = interpretStatements;
class DynamicInstance {
    get props() { return exceptions_1.unimplemented(); }
    get getters() { return exceptions_1.unimplemented(); }
    get methods() { return exceptions_1.unimplemented(); }
    get clazz() { return exceptions_1.unimplemented(); }
}
exports.DynamicInstance = DynamicInstance;
/**
 * @param {?} instance
 * @return {?}
 */
function isDynamicInstance(instance) {
    if (lang_1.IS_DART) {
        return instance instanceof DynamicInstance;
    }
    else {
        return lang_1.isPresent(instance) && lang_1.isPresent(instance.props) && lang_1.isPresent(instance.getters) &&
            lang_1.isPresent(instance.methods);
    }
}
/**
 * @param {?} varNames
 * @param {?} varValues
 * @param {?} statements
 * @param {?} ctx
 * @param {?} visitor
 * @return {?}
 */
function _executeFunctionStatements(varNames, varValues, statements, ctx, visitor) {
    var /** @type {?} */ childCtx = ctx.createChildWihtLocalVars();
    for (var /** @type {?} */ i = 0; i < varNames.length; i++) {
        childCtx.vars.set(varNames[i], varValues[i]);
    }
    var /** @type {?} */ result = visitor.visitAllStatements(statements, childCtx);
    return lang_1.isPresent(result) ? result.value : null;
}
class _ExecutionContext {
    /**
     * @param {?} parent
     * @param {?} superClass
     * @param {?} superInstance
     * @param {?} className
     * @param {?} vars
     * @param {?} props
     * @param {?} getters
     * @param {?} methods
     * @param {?} instanceFactory
     */
    constructor(parent, superClass, superInstance, className, vars, props, getters, methods, instanceFactory) {
        this.parent = parent;
        this.superClass = superClass;
        this.superInstance = superInstance;
        this.className = className;
        this.vars = vars;
        this.props = props;
        this.getters = getters;
        this.methods = methods;
        this.instanceFactory = instanceFactory;
    }
    /**
     * @return {?}
     */
    createChildWihtLocalVars() {
        return new _ExecutionContext(this, this.superClass, this.superInstance, this.className, new Map(), this.props, this.getters, this.methods, this.instanceFactory);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _ExecutionContext.prototype.parent;
        /** @type {?} */
        _ExecutionContext.prototype.superClass;
        /** @type {?} */
        _ExecutionContext.prototype.superInstance;
        /** @type {?} */
        _ExecutionContext.prototype.className;
        /** @type {?} */
        _ExecutionContext.prototype.vars;
        /** @type {?} */
        _ExecutionContext.prototype.props;
        /** @type {?} */
        _ExecutionContext.prototype.getters;
        /** @type {?} */
        _ExecutionContext.prototype.methods;
        /** @type {?} */
        _ExecutionContext.prototype.instanceFactory;
    }
}
class ReturnValue {
    /**
     * @param {?} value
     */
    constructor(value) {
        this.value = value;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ReturnValue.prototype.value;
    }
}
class _DynamicClass {
    /**
     * @param {?} _classStmt
     * @param {?} _ctx
     * @param {?} _visitor
     */
    constructor(_classStmt, _ctx, _visitor) {
        this._classStmt = _classStmt;
        this._ctx = _ctx;
        this._visitor = _visitor;
    }
    /**
     * @param {?} args
     * @return {?}
     */
    instantiate(args) {
        var /** @type {?} */ props = new Map();
        var /** @type {?} */ getters = new Map();
        var /** @type {?} */ methods = new Map();
        var /** @type {?} */ superClass = this._classStmt.parent.visitExpression(this._visitor, this._ctx);
        var /** @type {?} */ instanceCtx = new _ExecutionContext(this._ctx, superClass, null, this._classStmt.name, this._ctx.vars, props, getters, methods, this._ctx.instanceFactory);
        this._classStmt.fields.forEach((field) => { props.set(field.name, null); });
        this._classStmt.getters.forEach((getter) => {
            getters.set(getter.name, () => _executeFunctionStatements([], [], getter.body, instanceCtx, this._visitor));
        });
        this._classStmt.methods.forEach((method) => {
            var /** @type {?} */ paramNames = method.params.map(param => param.name);
            methods.set(method.name, _declareFn(paramNames, method.body, instanceCtx, this._visitor));
        });
        var /** @type {?} */ ctorParamNames = this._classStmt.constructorMethod.params.map(param => param.name);
        _executeFunctionStatements(ctorParamNames, args, this._classStmt.constructorMethod.body, instanceCtx, this._visitor);
        return instanceCtx.superInstance;
    }
    /**
     * @return {?}
     */
    debugAst() { return this._visitor.debugAst(this._classStmt); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _DynamicClass.prototype._classStmt;
        /** @type {?} */
        _DynamicClass.prototype._ctx;
        /** @type {?} */
        _DynamicClass.prototype._visitor;
    }
}
class StatementInterpreter {
    /**
     * @param {?} ast
     * @return {?}
     */
    debugAst(ast) {
        return lang_1.IS_DART ? dart_emitter_1.debugOutputAstAsDart(ast) : ts_emitter_1.debugOutputAstAsTypeScript(ast);
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitDeclareVarStmt(stmt, ctx) {
        ctx.vars.set(stmt.name, stmt.value.visitExpression(this, ctx));
        return null;
    }
    /**
     * @param {?} expr
     * @param {?} ctx
     * @return {?}
     */
    visitWriteVarExpr(expr, ctx) {
        var /** @type {?} */ value = expr.value.visitExpression(this, ctx);
        var /** @type {?} */ currCtx = ctx;
        while (currCtx != null) {
            if (currCtx.vars.has(expr.name)) {
                currCtx.vars.set(expr.name, value);
                return value;
            }
            currCtx = currCtx.parent;
        }
        throw new exceptions_1.BaseException(`Not declared variable ${expr.name}`);
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
                case o.BuiltinVar.This:
                    return ctx.superInstance;
                case o.BuiltinVar.CatchError:
                    varName = CATCH_ERROR_VAR;
                    break;
                case o.BuiltinVar.CatchStack:
                    varName = CATCH_STACK_VAR;
                    break;
                default:
                    throw new exceptions_1.BaseException(`Unknown builtin variable ${ast.builtin}`);
            }
        }
        var /** @type {?} */ currCtx = ctx;
        while (currCtx != null) {
            if (currCtx.vars.has(varName)) {
                return currCtx.vars.get(varName);
            }
            currCtx = currCtx.parent;
        }
        throw new exceptions_1.BaseException(`Not declared variable ${varName}`);
    }
    /**
     * @param {?} expr
     * @param {?} ctx
     * @return {?}
     */
    visitWriteKeyExpr(expr, ctx) {
        var /** @type {?} */ receiver = expr.receiver.visitExpression(this, ctx);
        var /** @type {?} */ index = expr.index.visitExpression(this, ctx);
        var /** @type {?} */ value = expr.value.visitExpression(this, ctx);
        receiver[index] = value;
        return value;
    }
    /**
     * @param {?} expr
     * @param {?} ctx
     * @return {?}
     */
    visitWritePropExpr(expr, ctx) {
        var /** @type {?} */ receiver = expr.receiver.visitExpression(this, ctx);
        var /** @type {?} */ value = expr.value.visitExpression(this, ctx);
        if (isDynamicInstance(receiver)) {
            var /** @type {?} */ di = (receiver);
            if (di.props.has(expr.name)) {
                di.props.set(expr.name, value);
            }
            else {
                core_1.reflector.setter(expr.name)(receiver, value);
            }
        }
        else {
            core_1.reflector.setter(expr.name)(receiver, value);
        }
        return value;
    }
    /**
     * @param {?} expr
     * @param {?} ctx
     * @return {?}
     */
    visitInvokeMethodExpr(expr, ctx) {
        var /** @type {?} */ receiver = expr.receiver.visitExpression(this, ctx);
        var /** @type {?} */ args = this.visitAllExpressions(expr.args, ctx);
        var /** @type {?} */ result;
        if (lang_1.isPresent(expr.builtin)) {
            switch (expr.builtin) {
                case o.BuiltinMethod.ConcatArray:
                    result = collection_1.ListWrapper.concat(receiver, args[0]);
                    break;
                case o.BuiltinMethod.SubscribeObservable:
                    result = async_1.ObservableWrapper.subscribe(receiver, args[0]);
                    break;
                case o.BuiltinMethod.bind:
                    if (lang_1.IS_DART) {
                        result = receiver;
                    }
                    else {
                        result = receiver.bind(args[0]);
                    }
                    break;
                default:
                    throw new exceptions_1.BaseException(`Unknown builtin method ${expr.builtin}`);
            }
        }
        else if (isDynamicInstance(receiver)) {
            var /** @type {?} */ di = (receiver);
            if (di.methods.has(expr.name)) {
                result = lang_1.FunctionWrapper.apply(di.methods.get(expr.name), args);
            }
            else {
                result = core_1.reflector.method(expr.name)(receiver, args);
            }
        }
        else {
            result = core_1.reflector.method(expr.name)(receiver, args);
        }
        return result;
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitInvokeFunctionExpr(stmt, ctx) {
        var /** @type {?} */ args = this.visitAllExpressions(stmt.args, ctx);
        var /** @type {?} */ fnExpr = stmt.fn;
        if (fnExpr instanceof o.ReadVarExpr && fnExpr.builtin === o.BuiltinVar.Super) {
            ctx.superInstance = ctx.instanceFactory.createInstance(ctx.superClass, ctx.className, args, ctx.props, ctx.getters, ctx.methods);
            ctx.parent.superInstance = ctx.superInstance;
            return null;
        }
        else {
            var /** @type {?} */ fn = stmt.fn.visitExpression(this, ctx);
            return lang_1.FunctionWrapper.apply(fn, args);
        }
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitReturnStmt(stmt, ctx) {
        return new ReturnValue(stmt.value.visitExpression(this, ctx));
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitDeclareClassStmt(stmt, ctx) {
        var /** @type {?} */ clazz = new _DynamicClass(stmt, ctx, this);
        ctx.vars.set(stmt.name, clazz);
        return null;
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitExpressionStmt(stmt, ctx) {
        return stmt.expr.visitExpression(this, ctx);
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitIfStmt(stmt, ctx) {
        var /** @type {?} */ condition = stmt.condition.visitExpression(this, ctx);
        if (condition) {
            return this.visitAllStatements(stmt.trueCase, ctx);
        }
        else if (lang_1.isPresent(stmt.falseCase)) {
            return this.visitAllStatements(stmt.falseCase, ctx);
        }
        return null;
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitTryCatchStmt(stmt, ctx) {
        try {
            return this.visitAllStatements(stmt.bodyStmts, ctx);
        }
        catch (e) {
            var /** @type {?} */ childCtx = ctx.createChildWihtLocalVars();
            childCtx.vars.set(CATCH_ERROR_VAR, e);
            childCtx.vars.set(CATCH_STACK_VAR, e.stack);
            return this.visitAllStatements(stmt.catchStmts, childCtx);
        }
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitThrowStmt(stmt, ctx) {
        throw stmt.error.visitExpression(this, ctx);
    }
    /**
     * @param {?} stmt
     * @param {?=} context
     * @return {?}
     */
    visitCommentStmt(stmt, context) { return null; }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitInstantiateExpr(ast, ctx) {
        var /** @type {?} */ args = this.visitAllExpressions(ast.args, ctx);
        var /** @type {?} */ clazz = ast.classExpr.visitExpression(this, ctx);
        if (clazz instanceof _DynamicClass) {
            return clazz.instantiate(args);
        }
        else {
            return lang_1.FunctionWrapper.apply(core_1.reflector.factory(clazz), args);
        }
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitLiteralExpr(ast, ctx) { return ast.value; }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitExternalExpr(ast, ctx) { return ast.value.runtime; }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitConditionalExpr(ast, ctx) {
        if (ast.condition.visitExpression(this, ctx)) {
            return ast.trueCase.visitExpression(this, ctx);
        }
        else if (lang_1.isPresent(ast.falseCase)) {
            return ast.falseCase.visitExpression(this, ctx);
        }
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitNotExpr(ast, ctx) {
        return !ast.condition.visitExpression(this, ctx);
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitCastExpr(ast, ctx) {
        return ast.value.visitExpression(this, ctx);
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitFunctionExpr(ast, ctx) {
        var /** @type {?} */ paramNames = ast.params.map((param) => param.name);
        return _declareFn(paramNames, ast.statements, ctx, this);
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitDeclareFunctionStmt(stmt, ctx) {
        var /** @type {?} */ paramNames = stmt.params.map((param) => param.name);
        ctx.vars.set(stmt.name, _declareFn(paramNames, stmt.statements, ctx, this));
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitBinaryOperatorExpr(ast, ctx) {
        var /** @type {?} */ lhs = () => ast.lhs.visitExpression(this, ctx);
        var /** @type {?} */ rhs = () => ast.rhs.visitExpression(this, ctx);
        switch (ast.operator) {
            case o.BinaryOperator.Equals:
                return lhs() == rhs();
            case o.BinaryOperator.Identical:
                return lhs() === rhs();
            case o.BinaryOperator.NotEquals:
                return lhs() != rhs();
            case o.BinaryOperator.NotIdentical:
                return lhs() !== rhs();
            case o.BinaryOperator.And:
                return lhs() && rhs();
            case o.BinaryOperator.Or:
                return lhs() || rhs();
            case o.BinaryOperator.Plus:
                return lhs() + rhs();
            case o.BinaryOperator.Minus:
                return lhs() - rhs();
            case o.BinaryOperator.Divide:
                return lhs() / rhs();
            case o.BinaryOperator.Multiply:
                return lhs() * rhs();
            case o.BinaryOperator.Modulo:
                return lhs() % rhs();
            case o.BinaryOperator.Lower:
                return lhs() < rhs();
            case o.BinaryOperator.LowerEquals:
                return lhs() <= rhs();
            case o.BinaryOperator.Bigger:
                return lhs() > rhs();
            case o.BinaryOperator.BiggerEquals:
                return lhs() >= rhs();
            default:
                throw new exceptions_1.BaseException(`Unknown operator ${ast.operator}`);
        }
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitReadPropExpr(ast, ctx) {
        var /** @type {?} */ result;
        var /** @type {?} */ receiver = ast.receiver.visitExpression(this, ctx);
        if (isDynamicInstance(receiver)) {
            var /** @type {?} */ di = (receiver);
            if (di.props.has(ast.name)) {
                result = di.props.get(ast.name);
            }
            else if (di.getters.has(ast.name)) {
                result = di.getters.get(ast.name)();
            }
            else if (di.methods.has(ast.name)) {
                result = di.methods.get(ast.name);
            }
            else {
                result = core_1.reflector.getter(ast.name)(receiver);
            }
        }
        else {
            result = core_1.reflector.getter(ast.name)(receiver);
        }
        return result;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitReadKeyExpr(ast, ctx) {
        var /** @type {?} */ receiver = ast.receiver.visitExpression(this, ctx);
        var /** @type {?} */ prop = ast.index.visitExpression(this, ctx);
        return receiver[prop];
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitLiteralArrayExpr(ast, ctx) {
        return this.visitAllExpressions(ast.entries, ctx);
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitLiteralMapExpr(ast, ctx) {
        var /** @type {?} */ result = {};
        ast.entries.forEach((entry) => result[(entry[0])] =
            ((entry[1])).visitExpression(this, ctx));
        return result;
    }
    /**
     * @param {?} expressions
     * @param {?} ctx
     * @return {?}
     */
    visitAllExpressions(expressions, ctx) {
        return expressions.map((expr) => expr.visitExpression(this, ctx));
    }
    /**
     * @param {?} statements
     * @param {?} ctx
     * @return {?}
     */
    visitAllStatements(statements, ctx) {
        for (var /** @type {?} */ i = 0; i < statements.length; i++) {
            var /** @type {?} */ stmt = statements[i];
            var /** @type {?} */ val = stmt.visitStatement(this, ctx);
            if (val instanceof ReturnValue) {
                return val;
            }
        }
        return null;
    }
}
/**
 * @param {?} varNames
 * @param {?} statements
 * @param {?} ctx
 * @param {?} visitor
 * @return {?}
 */
function _declareFn(varNames, statements, ctx, visitor) {
    switch (varNames.length) {
        case 0:
            return () => _executeFunctionStatements(varNames, [], statements, ctx, visitor);
        case 1:
            return (d0) => _executeFunctionStatements(varNames, [d0], statements, ctx, visitor);
        case 2:
            return (d0, d1) => _executeFunctionStatements(varNames, [d0, d1], statements, ctx, visitor);
        case 3:
            return (d0, d1, d2) => _executeFunctionStatements(varNames, [d0, d1, d2], statements, ctx, visitor);
        case 4:
            return (d0, d1, d2, d3) => _executeFunctionStatements(varNames, [d0, d1, d2, d3], statements, ctx, visitor);
        case 5:
            return (d0, d1, d2, d3, d4) => _executeFunctionStatements(varNames, [d0, d1, d2, d3, d4], statements, ctx, visitor);
        case 6:
            return (d0, d1, d2, d3, d4, d5) => _executeFunctionStatements(varNames, [d0, d1, d2, d3, d4, d5], statements, ctx, visitor);
        case 7:
            return (d0, d1, d2, d3, d4, d5, d6) => _executeFunctionStatements(varNames, [d0, d1, d2, d3, d4, d5, d6], statements, ctx, visitor);
        case 8:
            return (d0, d1, d2, d3, d4, d5, d6, d7) => _executeFunctionStatements(varNames, [d0, d1, d2, d3, d4, d5, d6, d7], statements, ctx, visitor);
        case 9:
            return (d0, d1, d2, d3, d4, d5, d6, d7, d8) => _executeFunctionStatements(varNames, [d0, d1, d2, d3, d4, d5, d6, d7, d8], statements, ctx, visitor);
        case 10:
            return (d0, d1, d2, d3, d4, d5, d6, d7, d8, d9) => _executeFunctionStatements(varNames, [d0, d1, d2, d3, d4, d5, d6, d7, d8, d9], statements, ctx, visitor);
        default:
            throw new exceptions_1.BaseException('Declaring functions with more than 10 arguments is not supported right now');
    }
}
var /** @type {?} */ CATCH_ERROR_VAR = 'error';
var /** @type {?} */ CATCH_STACK_VAR = 'stack';
//# sourceMappingURL=output_interpreter.js.map