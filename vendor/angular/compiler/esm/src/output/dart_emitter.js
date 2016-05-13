goog.module('_angular$compiler$src$output$dart__emitter');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
var o = goog.require('_angular$compiler$src$output$output__ast');
var abstract_emitter_1 = goog.require('_angular$compiler$src$output$abstract__emitter');
var /** @type {?} */ _debugModuleUrl = 'asset://debug/lib';
/**
 * @param {?} ast
 * @return {?}
 */
function debugOutputAstAsDart(ast) {
    var /** @type {?} */ converter = new _DartEmitterVisitor(_debugModuleUrl);
    var /** @type {?} */ ctx = abstract_emitter_1.EmitterVisitorContext.createRoot([]);
    var /** @type {?} */ asts;
    if (lang_1.isArray(ast)) {
        asts = (ast);
    }
    else {
        asts = [ast];
    }
    asts.forEach((ast) => {
        if (ast instanceof o.Statement) {
            ast.visitStatement(converter, ctx);
        }
        else if (ast instanceof o.Expression) {
            ast.visitExpression(converter, ctx);
        }
        else if (ast instanceof o.Type) {
            ast.visitType(converter, ctx);
        }
        else {
            throw new exceptions_1.BaseException(`Don't know how to print debug info for ${ast}`);
        }
    });
    return ctx.toSource();
}
exports.debugOutputAstAsDart = debugOutputAstAsDart;
class DartEmitter {
    /**
     * @param {?} _importGenerator
     */
    constructor(_importGenerator) {
        this._importGenerator = _importGenerator;
    }
    /**
     * @param {?} moduleUrl
     * @param {?} stmts
     * @param {?} exportedVars
     * @return {?}
     */
    emitStatements(moduleUrl, stmts, exportedVars) {
        var /** @type {?} */ srcParts = [];
        // Note: We are not creating a library here as Dart does not need it.
        // Dart analzyer might complain about it though.
        var /** @type {?} */ converter = new _DartEmitterVisitor(moduleUrl);
        var /** @type {?} */ ctx = abstract_emitter_1.EmitterVisitorContext.createRoot(exportedVars);
        converter.visitAllStatements(stmts, ctx);
        converter.importsWithPrefixes.forEach((prefix, importedModuleUrl) => {
            srcParts.push(`import '${this._importGenerator.getImportPath(moduleUrl, importedModuleUrl)}' as ${prefix};`);
        });
        srcParts.push(ctx.toSource());
        return srcParts.join('\n');
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DartEmitter.prototype._importGenerator;
    }
}
exports.DartEmitter = DartEmitter;
class _DartEmitterVisitor extends abstract_emitter_1.AbstractEmitterVisitor {
    /**
     * @param {?} _moduleUrl
     */
    constructor(_moduleUrl) {
        super(true);
        this._moduleUrl = _moduleUrl;
        this.importsWithPrefixes = new Map();
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitExternalExpr(ast, ctx) {
        this._visitIdentifier(ast.value, ast.typeParams, ctx);
        return null;
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitDeclareVarStmt(stmt, ctx) {
        if (stmt.hasModifier(o.StmtModifier.Final)) {
            if (isConstType(stmt.type)) {
                ctx.print(`const `);
            }
            else {
                ctx.print(`final `);
            }
        }
        else if (lang_1.isBlank(stmt.type)) {
            ctx.print(`var `);
        }
        if (lang_1.isPresent(stmt.type)) {
            stmt.type.visitType(this, ctx);
            ctx.print(` `);
        }
        ctx.print(`${stmt.name} = `);
        stmt.value.visitExpression(this, ctx);
        ctx.println(`;`);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitCastExpr(ast, ctx) {
        ctx.print(`(`);
        ast.value.visitExpression(this, ctx);
        ctx.print(` as `);
        ast.type.visitType(this, ctx);
        ctx.print(`)`);
        return null;
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitDeclareClassStmt(stmt, ctx) {
        ctx.pushClass(stmt);
        ctx.print(`class ${stmt.name}`);
        if (lang_1.isPresent(stmt.parent)) {
            ctx.print(` extends `);
            stmt.parent.visitExpression(this, ctx);
        }
        ctx.println(` {`);
        ctx.incIndent();
        stmt.fields.forEach((field) => this._visitClassField(field, ctx));
        if (lang_1.isPresent(stmt.constructorMethod)) {
            this._visitClassConstructor(stmt, ctx);
        }
        stmt.getters.forEach((getter) => this._visitClassGetter(getter, ctx));
        stmt.methods.forEach((method) => this._visitClassMethod(method, ctx));
        ctx.decIndent();
        ctx.println(`}`);
        ctx.popClass();
        return null;
    }
    /**
     * @param {?} field
     * @param {?} ctx
     * @return {?}
     */
    _visitClassField(field, ctx) {
        if (field.hasModifier(o.StmtModifier.Final)) {
            ctx.print(`final `);
        }
        else if (lang_1.isBlank(field.type)) {
            ctx.print(`var `);
        }
        if (lang_1.isPresent(field.type)) {
            field.type.visitType(this, ctx);
            ctx.print(` `);
        }
        ctx.println(`${field.name};`);
    }
    /**
     * @param {?} getter
     * @param {?} ctx
     * @return {?}
     */
    _visitClassGetter(getter, ctx) {
        if (lang_1.isPresent(getter.type)) {
            getter.type.visitType(this, ctx);
            ctx.print(` `);
        }
        ctx.println(`get ${getter.name} {`);
        ctx.incIndent();
        this.visitAllStatements(getter.body, ctx);
        ctx.decIndent();
        ctx.println(`}`);
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    _visitClassConstructor(stmt, ctx) {
        ctx.print(`${stmt.name}(`);
        this._visitParams(stmt.constructorMethod.params, ctx);
        ctx.print(`)`);
        var /** @type {?} */ ctorStmts = stmt.constructorMethod.body;
        var /** @type {?} */ superCtorExpr = ctorStmts.length > 0 ? getSuperConstructorCallExpr(ctorStmts[0]) : null;
        if (lang_1.isPresent(superCtorExpr)) {
            ctx.print(`: `);
            superCtorExpr.visitExpression(this, ctx);
            ctorStmts = ctorStmts.slice(1);
        }
        ctx.println(` {`);
        ctx.incIndent();
        this.visitAllStatements(ctorStmts, ctx);
        ctx.decIndent();
        ctx.println(`}`);
    }
    /**
     * @param {?} method
     * @param {?} ctx
     * @return {?}
     */
    _visitClassMethod(method, ctx) {
        if (lang_1.isPresent(method.type)) {
            method.type.visitType(this, ctx);
        }
        else {
            ctx.print(`void`);
        }
        ctx.print(` ${method.name}(`);
        this._visitParams(method.params, ctx);
        ctx.println(`) {`);
        ctx.incIndent();
        this.visitAllStatements(method.body, ctx);
        ctx.decIndent();
        ctx.println(`}`);
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitFunctionExpr(ast, ctx) {
        ctx.print(`(`);
        this._visitParams(ast.params, ctx);
        ctx.println(`) {`);
        ctx.incIndent();
        this.visitAllStatements(ast.statements, ctx);
        ctx.decIndent();
        ctx.print(`}`);
        return null;
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitDeclareFunctionStmt(stmt, ctx) {
        if (lang_1.isPresent(stmt.type)) {
            stmt.type.visitType(this, ctx);
        }
        else {
            ctx.print(`void`);
        }
        ctx.print(` ${stmt.name}(`);
        this._visitParams(stmt.params, ctx);
        ctx.println(`) {`);
        ctx.incIndent();
        this.visitAllStatements(stmt.statements, ctx);
        ctx.decIndent();
        ctx.println(`}`);
        return null;
    }
    /**
     * @param {?} method
     * @return {?}
     */
    getBuiltinMethodName(method) {
        var /** @type {?} */ name;
        switch (method) {
            case o.BuiltinMethod.ConcatArray:
                name = '.addAll';
                break;
            case o.BuiltinMethod.SubscribeObservable:
                name = 'listen';
                break;
            case o.BuiltinMethod.bind:
                name = null;
                break;
            default:
                throw new exceptions_1.BaseException(`Unknown builtin method: ${method}`);
        }
        return name;
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitTryCatchStmt(stmt, ctx) {
        ctx.println(`try {`);
        ctx.incIndent();
        this.visitAllStatements(stmt.bodyStmts, ctx);
        ctx.decIndent();
        ctx.println(`} catch (${abstract_emitter_1.CATCH_ERROR_VAR.name}, ${abstract_emitter_1.CATCH_STACK_VAR.name}) {`);
        ctx.incIndent();
        this.visitAllStatements(stmt.catchStmts, ctx);
        ctx.decIndent();
        ctx.println(`}`);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitBinaryOperatorExpr(ast, ctx) {
        switch (ast.operator) {
            case o.BinaryOperator.Identical:
                ctx.print(`identical(`);
                ast.lhs.visitExpression(this, ctx);
                ctx.print(`, `);
                ast.rhs.visitExpression(this, ctx);
                ctx.print(`)`);
                break;
            case o.BinaryOperator.NotIdentical:
                ctx.print(`!identical(`);
                ast.lhs.visitExpression(this, ctx);
                ctx.print(`, `);
                ast.rhs.visitExpression(this, ctx);
                ctx.print(`)`);
                break;
            default:
                super.visitBinaryOperatorExpr(ast, ctx);
        }
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitLiteralArrayExpr(ast, ctx) {
        if (isConstType(ast.type)) {
            ctx.print(`const `);
        }
        return super.visitLiteralArrayExpr(ast, ctx);
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitLiteralMapExpr(ast, ctx) {
        if (isConstType(ast.type)) {
            ctx.print(`const `);
        }
        if (lang_1.isPresent(ast.valueType)) {
            ctx.print(`<String, `);
            ast.valueType.visitType(this, ctx);
            ctx.print(`>`);
        }
        return super.visitLiteralMapExpr(ast, ctx);
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitInstantiateExpr(ast, ctx) {
        ctx.print(isConstType(ast.type) ? `const` : `new`);
        ctx.print(' ');
        ast.classExpr.visitExpression(this, ctx);
        ctx.print(`(`);
        this.visitAllExpressions(ast.args, ctx, `,`);
        ctx.print(`)`);
        return null;
    }
    /**
     * @param {?} type
     * @param {?} ctx
     * @return {?}
     */
    visitBuiltintType(type, ctx) {
        var /** @type {?} */ typeStr;
        switch (type.name) {
            case o.BuiltinTypeName.Bool:
                typeStr = 'bool';
                break;
            case o.BuiltinTypeName.Dynamic:
                typeStr = 'dynamic';
                break;
            case o.BuiltinTypeName.Function:
                typeStr = 'Function';
                break;
            case o.BuiltinTypeName.Number:
                typeStr = 'num';
                break;
            case o.BuiltinTypeName.Int:
                typeStr = 'int';
                break;
            case o.BuiltinTypeName.String:
                typeStr = 'String';
                break;
            default:
                throw new exceptions_1.BaseException(`Unsupported builtin type ${type.name}`);
        }
        ctx.print(typeStr);
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitExternalType(ast, ctx) {
        this._visitIdentifier(ast.value, ast.typeParams, ctx);
        return null;
    }
    /**
     * @param {?} type
     * @param {?} ctx
     * @return {?}
     */
    visitArrayType(type, ctx) {
        ctx.print(`List<`);
        if (lang_1.isPresent(type.of)) {
            type.of.visitType(this, ctx);
        }
        else {
            ctx.print(`dynamic`);
        }
        ctx.print(`>`);
        return null;
    }
    /**
     * @param {?} type
     * @param {?} ctx
     * @return {?}
     */
    visitMapType(type, ctx) {
        ctx.print(`Map<String, `);
        if (lang_1.isPresent(type.valueType)) {
            type.valueType.visitType(this, ctx);
        }
        else {
            ctx.print(`dynamic`);
        }
        ctx.print(`>`);
        return null;
    }
    /**
     * @param {?} params
     * @param {?} ctx
     * @return {?}
     */
    _visitParams(params, ctx) {
        this.visitAllObjects((param) => {
            if (lang_1.isPresent(param.type)) {
                param.type.visitType(this, ctx);
                ctx.print(' ');
            }
            ctx.print(param.name);
        }, params, ctx, ',');
    }
    /**
     * @param {?} value
     * @param {?} typeParams
     * @param {?} ctx
     * @return {?}
     */
    _visitIdentifier(value, typeParams, ctx) {
        if (lang_1.isBlank(value.name)) {
            throw new exceptions_1.BaseException(`Internal error: unknown identifier ${value}`);
        }
        if (lang_1.isPresent(value.moduleUrl) && value.moduleUrl != this._moduleUrl) {
            var /** @type {?} */ prefix = this.importsWithPrefixes.get(value.moduleUrl);
            if (lang_1.isBlank(prefix)) {
                prefix = `import${this.importsWithPrefixes.size}`;
                this.importsWithPrefixes.set(value.moduleUrl, prefix);
            }
            ctx.print(`${prefix}.`);
        }
        ctx.print(value.name);
        if (lang_1.isPresent(typeParams) && typeParams.length > 0) {
            ctx.print(`<`);
            this.visitAllObjects((type) => type.visitType(this, ctx), typeParams, ctx, ',');
            ctx.print(`>`);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _DartEmitterVisitor.prototype.importsWithPrefixes;
        /** @type {?} */
        _DartEmitterVisitor.prototype._moduleUrl;
    }
}
/**
 * @param {?} stmt
 * @return {?}
 */
function getSuperConstructorCallExpr(stmt) {
    if (stmt instanceof o.ExpressionStatement) {
        var /** @type {?} */ expr = stmt.expr;
        if (expr instanceof o.InvokeFunctionExpr) {
            var /** @type {?} */ fn = expr.fn;
            if (fn instanceof o.ReadVarExpr) {
                if (fn.builtin === o.BuiltinVar.Super) {
                    return expr;
                }
            }
        }
    }
    return null;
}
/**
 * @param {?} type
 * @return {?}
 */
function isConstType(type) {
    return lang_1.isPresent(type) && type.hasModifier(o.TypeModifier.Const);
}
//# sourceMappingURL=dart_emitter.js.map