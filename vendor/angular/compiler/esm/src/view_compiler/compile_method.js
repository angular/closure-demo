goog.module('_angular$compiler$src$view__compiler$compile__method');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var o = goog.require('_angular$compiler$src$output$output__ast');
class _DebugState {
    /**
     * @param {?} nodeIndex
     * @param {?} sourceAst
     */
    constructor(nodeIndex, sourceAst) {
        this.nodeIndex = nodeIndex;
        this.sourceAst = sourceAst;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _DebugState.prototype.nodeIndex;
        /** @type {?} */
        _DebugState.prototype.sourceAst;
    }
}
var /** @type {?} */ NULL_DEBUG_STATE = new _DebugState(null, null);
class CompileMethod {
    /**
     * @param {?} _view
     */
    constructor(_view) {
        this._view = _view;
        this._newState = NULL_DEBUG_STATE;
        this._currState = NULL_DEBUG_STATE;
        this._bodyStatements = [];
        this._debugEnabled = this._view.genConfig.genDebugInfo;
    }
    /**
     * @return {?}
     */
    _updateDebugContextIfNeeded() {
        if (this._newState.nodeIndex !== this._currState.nodeIndex ||
            this._newState.sourceAst !== this._currState.sourceAst) {
            var /** @type {?} */ expr = this._updateDebugContext(this._newState);
            if (lang_1.isPresent(expr)) {
                this._bodyStatements.push(expr.toStmt());
            }
        }
    }
    /**
     * @param {?} newState
     * @return {?}
     */
    _updateDebugContext(newState) {
        this._currState = this._newState = newState;
        if (this._debugEnabled) {
            var /** @type {?} */ sourceLocation = lang_1.isPresent(newState.sourceAst) ? newState.sourceAst.sourceSpan.start : null;
            return o.THIS_EXPR.callMethod('debug', [
                o.literal(newState.nodeIndex),
                lang_1.isPresent(sourceLocation) ? o.literal(sourceLocation.line) : o.NULL_EXPR,
                lang_1.isPresent(sourceLocation) ? o.literal(sourceLocation.col) : o.NULL_EXPR
            ]);
        }
        else {
            return null;
        }
    }
    /**
     * @param {?} nodeIndex
     * @param {?} templateAst
     * @return {?}
     */
    resetDebugInfoExpr(nodeIndex, templateAst) {
        var /** @type {?} */ res = this._updateDebugContext(new _DebugState(nodeIndex, templateAst));
        return lang_1.isPresent(res) ? res : o.NULL_EXPR;
    }
    /**
     * @param {?} nodeIndex
     * @param {?} templateAst
     * @return {?}
     */
    resetDebugInfo(nodeIndex, templateAst) {
        this._newState = new _DebugState(nodeIndex, templateAst);
    }
    /**
     * @param {?} stmt
     * @return {?}
     */
    addStmt(stmt) {
        this._updateDebugContextIfNeeded();
        this._bodyStatements.push(stmt);
    }
    /**
     * @param {?} stmts
     * @return {?}
     */
    addStmts(stmts) {
        this._updateDebugContextIfNeeded();
        collection_1.ListWrapper.addAll(this._bodyStatements, stmts);
    }
    /**
     * @return {?}
     */
    finish() { return this._bodyStatements; }
    /**
     * @return {?}
     */
    isEmpty() { return this._bodyStatements.length === 0; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompileMethod.prototype._newState;
        /** @type {?} */
        CompileMethod.prototype._currState;
        /** @type {?} */
        CompileMethod.prototype._debugEnabled;
        /** @type {?} */
        CompileMethod.prototype._bodyStatements;
        /** @type {?} */
        CompileMethod.prototype._view;
    }
}
exports.CompileMethod = CompileMethod;
//# sourceMappingURL=compile_method.js.map