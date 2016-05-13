goog.module('_angular$compiler$src$output$ts__emitter');
var o = goog.require('_angular$compiler$src$output$output__ast');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
var abstract_emitter_1 = goog.require('_angular$compiler$src$output$abstract__emitter');
var /** @type {?} */ _debugModuleUrl = 'asset://debug/lib';
/**
 * @param {?} ast
 * @return {?}
 */
function debugOutputAstAsTypeScript(ast) {
    var /** @type {?} */ converter = new _TsEmitterVisitor(_debugModuleUrl);
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
exports.debugOutputAstAsTypeScript = debugOutputAstAsTypeScript;
class TypeScriptEmitter {
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
        var /** @type {?} */ converter = new _TsEmitterVisitor(moduleUrl);
        var /** @type {?} */ ctx = abstract_emitter_1.EmitterVisitorContext.createRoot(exportedVars);
        converter.visitAllStatements(stmts, ctx);
        var /** @type {?} */ srcParts = [];
        converter.importsWithPrefixes.forEach((prefix, importedModuleUrl) => {
            // Note: can't write the real word for import as it screws up system.js auto detection...
            srcParts.push(`imp` +
                `ort * as ${prefix} from '${this._importGenerator.getImportPath(moduleUrl, importedModuleUrl)}';`);
        });
        srcParts.push(ctx.toSource());
        return srcParts.join('\n');
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TypeScriptEmitter.prototype._importGenerator;
    }
}
exports.TypeScriptEmitter = TypeScriptEmitter;
class _TsEmitterVisitor extends abstract_emitter_1.AbstractEmitterVisitor {
    /**
     * @param {?} _moduleUrl
     */
    constructor(_moduleUrl) {
        super(false);
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
        if (ctx.isExportedVar(stmt.name)) {
            ctx.print(`export `);
        }
        if (stmt.hasModifier(o.StmtModifier.Final)) {
            ctx.print(`const`);
        }
        else {
            ctx.print(`var`);
        }
        ctx.print(` ${stmt.name}`);
        if (lang_1.isPresent(stmt.type)) {
            ctx.print(`:`);
            stmt.type.visitType(this, ctx);
        }
        ctx.print(` = `);
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
        ctx.print(`(<`);
        ast.type.visitType(this, ctx);
        ctx.print(`>`);
        ast.value.visitExpression(this, ctx);
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
        if (ctx.isExportedVar(stmt.name)) {
            ctx.print(`export `);
        }
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
        if (field.hasModifier(o.StmtModifier.Private)) {
            ctx.print(`private `);
        }
        ctx.print(field.name);
        if (lang_1.isPresent(field.type)) {
            ctx.print(`:`);
            field.type.visitType(this, ctx);
        }
        else {
            ctx.print(`: any`);
        }
        ctx.println(`;`);
    }
    /**
     * @param {?} getter
     * @param {?} ctx
     * @return {?}
     */
    _visitClassGetter(getter, ctx) {
        if (getter.hasModifier(o.StmtModifier.Private)) {
            ctx.print(`private `);
        }
        ctx.print(`get ${getter.name}()`);
        if (lang_1.isPresent(getter.type)) {
            ctx.print(`:`);
            getter.type.visitType(this, ctx);
        }
        ctx.println(` {`);
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
        ctx.print(`constructor(`);
        this._visitParams(stmt.constructorMethod.params, ctx);
        ctx.println(`) {`);
        ctx.incIndent();
        this.visitAllStatements(stmt.constructorMethod.body, ctx);
        ctx.decIndent();
        ctx.println(`}`);
    }
    /**
     * @param {?} method
     * @param {?} ctx
     * @return {?}
     */
    _visitClassMethod(method, ctx) {
        if (method.hasModifier(o.StmtModifier.Private)) {
            ctx.print(`private `);
        }
        ctx.print(`${method.name}(`);
        this._visitParams(method.params, ctx);
        ctx.print(`):`);
        if (lang_1.isPresent(method.type)) {
            method.type.visitType(this, ctx);
        }
        else {
            ctx.print(`void`);
        }
        ctx.println(` {`);
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
        ctx.print(`):`);
        if (lang_1.isPresent(ast.type)) {
            ast.type.visitType(this, ctx);
        }
        else {
            ctx.print(`void`);
        }
        ctx.println(` => {`);
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
        if (ctx.isExportedVar(stmt.name)) {
            ctx.print(`export `);
        }
        ctx.print(`function ${stmt.name}(`);
        this._visitParams(stmt.params, ctx);
        ctx.print(`):`);
        if (lang_1.isPresent(stmt.type)) {
            stmt.type.visitType(this, ctx);
        }
        else {
            ctx.print(`void`);
        }
        ctx.println(` {`);
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
     * @param {?} type
     * @param {?} ctx
     * @return {?}
     */
    visitBuiltintType(type, ctx) {
        var /** @type {?} */ typeStr;
        switch (type.name) {
            case o.BuiltinTypeName.Bool:
                typeStr = 'boolean';
                break;
            case o.BuiltinTypeName.Dynamic:
                typeStr = 'any';
                break;
            case o.BuiltinTypeName.Function:
                typeStr = 'Function';
                break;
            case o.BuiltinTypeName.Number:
                typeStr = 'number';
                break;
            case o.BuiltinTypeName.Int:
                typeStr = 'number';
                break;
            case o.BuiltinTypeName.String:
                typeStr = 'string';
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
        if (lang_1.isPresent(type.of)) {
            type.of.visitType(this, ctx);
        }
        else {
            ctx.print(`any`);
        }
        ctx.print(`[]`);
        return null;
    }
    /**
     * @param {?} type
     * @param {?} ctx
     * @return {?}
     */
    visitMapType(type, ctx) {
        ctx.print(`{[key: string]:`);
        if (lang_1.isPresent(type.valueType)) {
            type.valueType.visitType(this, ctx);
        }
        else {
            ctx.print(`any`);
        }
        ctx.print(`}`);
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
    /**
     * @param {?} params
     * @param {?} ctx
     * @return {?}
     */
    _visitParams(params, ctx) {
        this.visitAllObjects((param) => {
            ctx.print(param.name);
            if (lang_1.isPresent(param.type)) {
                ctx.print(`:`);
                param.type.visitType(this, ctx);
            }
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
        _TsEmitterVisitor.prototype.importsWithPrefixes;
        /** @type {?} */
        _TsEmitterVisitor.prototype._moduleUrl;
    }
}
//# sourceMappingURL=ts_emitter.js.map