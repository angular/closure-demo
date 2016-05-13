goog.module('_angular$compiler$src$output$output__jit');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var abstract_emitter_1 = goog.require('_angular$compiler$src$output$abstract__emitter');
var abstract_js_emitter_1 = goog.require('_angular$compiler$src$output$abstract__js__emitter');
var util_1 = goog.require('_angular$compiler$src$util');
/**
 * @param {?} sourceUrl
 * @param {?} statements
 * @param {?} resultVar
 * @return {?}
 */
function jitStatements(sourceUrl, statements, resultVar) {
    var /** @type {?} */ converter = new JitEmitterVisitor();
    var /** @type {?} */ ctx = abstract_emitter_1.EmitterVisitorContext.createRoot([resultVar]);
    converter.visitAllStatements(statements, ctx);
    return lang_1.evalExpression(sourceUrl, resultVar, ctx.toSource(), converter.getArgs());
}
exports.jitStatements = jitStatements;
class JitEmitterVisitor extends abstract_js_emitter_1.AbstractJsEmitterVisitor {
    constructor(...args) {
        super(...args);
        this._evalArgNames = [];
        this._evalArgValues = [];
    }
    /**
     * @return {?}
     */
    getArgs() {
        var /** @type {?} */ result = {};
        for (var /** @type {?} */ i = 0; i < this._evalArgNames.length; i++) {
            result[this._evalArgNames[i]] = this._evalArgValues[i];
        }
        return result;
    }
    /**
     * @param {?} ast
     * @param {?} ctx
     * @return {?}
     */
    visitExternalExpr(ast, ctx) {
        var /** @type {?} */ value = ast.value.runtime;
        var /** @type {?} */ id = this._evalArgValues.indexOf(value);
        if (id === -1) {
            id = this._evalArgValues.length;
            this._evalArgValues.push(value);
            var /** @type {?} */ name = lang_1.isPresent(ast.value.name) ? util_1.sanitizeIdentifier(ast.value.name) : 'val';
            this._evalArgNames.push(util_1.sanitizeIdentifier(`jit_${name}${id}`));
        }
        ctx.print(this._evalArgNames[id]);
        return null;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        JitEmitterVisitor.prototype._evalArgNames;
        /** @type {?} */
        JitEmitterVisitor.prototype._evalArgValues;
    }
}
//# sourceMappingURL=output_jit.js.map