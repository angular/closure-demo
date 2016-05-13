goog.module('_angular$compiler$src$output$abstract__js__emitter');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
var o = goog.require('_angular$compiler$src$output$output__ast');
var abstract_emitter_1 = goog.require('_angular$compiler$src$output$abstract__emitter');
class AbstractJsEmitterVisitor extends abstract_emitter_1.AbstractEmitterVisitor {
    /**
     */
    constructor() {
        super(false);
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitDeclareClassStmt(stmt, ctx) {
        ctx.pushClass(stmt);
        this._visitClassConstructor(stmt, ctx);
        if (lang_1.isPresent(stmt.parent)) {
            ctx.print(`${stmt.name}.prototype = Object.create(`);
            stmt.parent.visitExpression(this, ctx);
            ctx.println(`.prototype);`);
        }
        stmt.getters.forEach((getter) => this._visitClassGetter(stmt, getter, ctx));
        stmt.methods.forEach((method) => this._visitClassMethod(stmt, method, ctx));
        ctx.popClass();
        return null;
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    _visitClassConstructor(stmt, ctx) {
        ctx.print(`function ${stmt.name}(`);
        if (lang_1.isPresent(stmt.constructorMethod)) {
            this._visitParams(stmt.constructorMethod.params, ctx);
        }
        ctx.println(`) {`);
        ctx.incIndent();
        if (lang_1.isPresent(stmt.constructorMethod)) {
            if (stmt.constructorMethod.body.length > 0) {
                ctx.println(`var self = this;`);
                this.visitAllStatements(stmt.constructorMethod.body, ctx);
            }
        }
        ctx.decIndent();
        ctx.println(`}`);
    }
    /**
     * @param {?} stmt
     * @param {?} getter
     * @param {?} ctx
     * @return {?}
     */
    _visitClassGetter(stmt, getter, ctx) {
        ctx.println(`Object.defineProperty(${stmt.name}.prototype, '${getter.name}', { get: function() {`);
        ctx.incIndent();
        if (getter.body.length > 0) {
            ctx.println(`var self = this;`);
            this.visitAllStatements(getter.body, ctx);
        }
        ctx.decIndent();
        ctx.println(`}});`);
    }
    /**
     * @param {?} stmt
     * @param {?} method
     * @param {?} ctx
     * @return {?}
     */
    _visitClassMethod(stmt, method, ctx) {
        ctx.print(`${stmt.name}.prototype.${method.name} = function(`);
        this._visitParams(method.params, ctx);
        ctx.println(`) {`);
        ctx.incIndent();
        if (method.body.length > 0) {
            ctx.println(`var self = this;`);
            this.visitAllStatements(method.body, ctx);
        }
        ctx.decIndent();
        ctx.println(`};`);
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitReadVarExpr(ast, ctx) {
        if (ast.builtin === o.BuiltinVar.This) {
            ctx.print('self');
        }
        else if (ast.builtin === o.BuiltinVar.Super) {
            throw new exceptions_1.BaseException(`'super' needs to be handled at a parent ast node, not at the variable level!`);
        }
        else {
            super.visitReadVarExpr(ast, ctx);
        }
        return null;
    }
    /**
     * @param {?} stmt
     * @param {?} ctx
     * @return {?}
     */
    visitDeclareVarStmt(stmt, ctx) {
        ctx.print(`var ${stmt.name} = `);
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
        ast.value.visitExpression(this, ctx);
        return null;
    }
    /**
     * @param {?} expr
     * @param {?} ctx
     * @return {?}
     */
    visitInvokeFunctionExpr(expr, ctx) {
        var /** @type {?} */ fnExpr = expr.fn;
        if (fnExpr instanceof o.ReadVarExpr && fnExpr.builtin === o.BuiltinVar.Super) {
            ctx.currentClass.parent.visitExpression(this, ctx);
            ctx.print(`.call(this`);
            if (expr.args.length > 0) {
                ctx.print(`, `);
                this.visitAllExpressions(expr.args, ctx, ',');
            }
            ctx.print(`)`);
        }
        else {
            super.visitInvokeFunctionExpr(expr, ctx);
        }
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitFunctionExpr(ast, ctx) {
        ctx.print(`function(`);
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
        ctx.print(`function ${stmt.name}(`);
        this._visitParams(stmt.params, ctx);
        ctx.println(`) {`);
        ctx.incIndent();
        this.visitAllStatements(stmt.statements, ctx);
        ctx.decIndent();
        ctx.println(`}`);
        return null;
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
        ctx.println(`} catch (${abstract_emitter_1.CATCH_ERROR_VAR.name}) {`);
        ctx.incIndent();
        var /** @type {?} */ catchStmts = [(abstract_emitter_1.CATCH_STACK_VAR.set(abstract_emitter_1.CATCH_ERROR_VAR.prop('stack'))
                .toDeclStmt(null, [o.StmtModifier.Final]))
        ].concat(stmt.catchStmts);
        this.visitAllStatements(catchStmts, ctx);
        ctx.decIndent();
        ctx.println(`}`);
        return null;
    }
    /**
     * @param {?} params
     * @param {?} ctx
     * @return {?}
     */
    _visitParams(params, ctx) {
        this.visitAllObjects((param) => ctx.print(param.name), params, ctx, ',');
    }
    /**
     * @param {?} method
     * @return {?}
     */
    getBuiltinMethodName(method) {
        var /** @type {?} */ name;
        switch (method) {
            case o.BuiltinMethod.ConcatArray:
                name = 'concat';
                break;
            case o.BuiltinMethod.SubscribeObservable:
                name = 'subscribe';
                break;
            case o.BuiltinMethod.bind:
                name = 'bind';
                break;
            default:
                throw new exceptions_1.BaseException(`Unknown builtin method: ${method}`);
        }
        return name;
    }
}
exports.AbstractJsEmitterVisitor = AbstractJsEmitterVisitor;
//# sourceMappingURL=abstract_js_emitter.js.map