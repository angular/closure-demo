goog.module('_angular$compiler$src$view__compiler$compile__query');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var o = goog.require('_angular$compiler$src$output$output__ast');
var identifiers_1 = goog.require('_angular$compiler$src$identifiers');
var util_1 = goog.require('_angular$compiler$src$view__compiler$util');
class ViewQueryValues {
    /**
     * @param {?} view
     * @param {?} values
     */
    constructor(view, values) {
        this.view = view;
        this.values = values;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ViewQueryValues.prototype.view;
        /** @type {?} */
        ViewQueryValues.prototype.values;
    }
}
class CompileQuery {
    /**
     * @param {?} meta
     * @param {?} queryList
     * @param {?} ownerDirectiveExpression
     * @param {?} view
     */
    constructor(meta, queryList, ownerDirectiveExpression, view) {
        this.meta = meta;
        this.queryList = queryList;
        this.ownerDirectiveExpression = ownerDirectiveExpression;
        this.view = view;
        this._values = new ViewQueryValues(view, []);
    }
    /**
     * @param {?} value
     * @param {?} view
     * @return {?}
     */
    addValue(value, view) {
        var /** @type {?} */ currentView = view;
        var /** @type {?} */ elPath = [];
        while (lang_1.isPresent(currentView) && currentView !== this.view) {
            var /** @type {?} */ parentEl = currentView.declarationElement;
            elPath.unshift(parentEl);
            currentView = parentEl.view;
        }
        var /** @type {?} */ queryListForDirtyExpr = util_1.getPropertyInView(this.queryList, view, this.view);
        var /** @type {?} */ viewValues = this._values;
        elPath.forEach((el) => {
            var /** @type {?} */ last = viewValues.values.length > 0 ? viewValues.values[viewValues.values.length - 1] : null;
            if (last instanceof ViewQueryValues && last.view === el.embeddedView) {
                viewValues = last;
            }
            else {
                var /** @type {?} */ newViewValues = new ViewQueryValues(el.embeddedView, []);
                viewValues.values.push(newViewValues);
                viewValues = newViewValues;
            }
        });
        viewValues.values.push(value);
        if (elPath.length > 0) {
            view.dirtyParentQueriesMethod.addStmt(queryListForDirtyExpr.callMethod('setDirty', []).toStmt());
        }
    }
    /**
     * @param {?} targetMethod
     * @return {?}
     */
    afterChildren(targetMethod) {
        var /** @type {?} */ values = createQueryValues(this._values);
        var /** @type {?} */ updateStmts = [this.queryList.callMethod('reset', [o.literalArr(values)]).toStmt()];
        if (lang_1.isPresent(this.ownerDirectiveExpression)) {
            var /** @type {?} */ valueExpr = this.meta.first ? this.queryList.prop('first') : this.queryList;
            updateStmts.push(this.ownerDirectiveExpression.prop(this.meta.propertyName).set(valueExpr).toStmt());
        }
        if (!this.meta.first) {
            updateStmts.push(this.queryList.callMethod('notifyOnChanges', []).toStmt());
        }
        targetMethod.addStmt(new o.IfStmt(this.queryList.prop('dirty'), updateStmts));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompileQuery.prototype._values;
        /** @type {?} */
        CompileQuery.prototype.meta;
        /** @type {?} */
        CompileQuery.prototype.queryList;
        /** @type {?} */
        CompileQuery.prototype.ownerDirectiveExpression;
        /** @type {?} */
        CompileQuery.prototype.view;
    }
}
exports.CompileQuery = CompileQuery;
/**
 * @param {?} viewValues
 * @return {?}
 */
function createQueryValues(viewValues) {
    return collection_1.ListWrapper.flatten(viewValues.values.map((entry) => {
        if (entry instanceof ViewQueryValues) {
            return mapNestedViews(entry.view.declarationElement.appElement, entry.view, createQueryValues(entry));
        }
        else {
            return (entry);
        }
    }));
}
/**
 * @param {?} declarationAppElement
 * @param {?} view
 * @param {?} expressions
 * @return {?}
 */
function mapNestedViews(declarationAppElement, view, expressions) {
    var /** @type {?} */ adjustedExpressions = expressions.map((expr) => {
        return o.replaceVarInExpression(o.THIS_EXPR.name, o.variable('nestedView'), expr);
    });
    return declarationAppElement.callMethod('mapNestedViews', [
        o.variable(view.className),
        o.fn([new o.FnParam('nestedView', view.classType)], [new o.ReturnStatement(o.literalArr(adjustedExpressions))])
    ]);
}
/**
 * @param {?} query
 * @param {?} directiveInstance
 * @param {?} propertyName
 * @param {?} compileView
 * @return {?}
 */
function createQueryList(query, directiveInstance, propertyName, compileView) {
    compileView.fields.push(new o.ClassField(propertyName, o.importType(identifiers_1.Identifiers.QueryList)));
    var /** @type {?} */ expr = o.THIS_EXPR.prop(propertyName);
    compileView.createMethod.addStmt(o.THIS_EXPR.prop(propertyName)
        .set(o.importExpr(identifiers_1.Identifiers.QueryList).instantiate([]))
        .toStmt());
    return expr;
}
exports.createQueryList = createQueryList;
/**
 * @param {?} map
 * @param {?} query
 * @return {?}
 */
function addQueryToTokenMap(map, query) {
    query.meta.selectors.forEach((selector) => {
        var /** @type {?} */ entry = map.get(selector);
        if (lang_1.isBlank(entry)) {
            entry = [];
            map.add(selector, entry);
        }
        entry.push(query);
    });
}
exports.addQueryToTokenMap = addQueryToTokenMap;
//# sourceMappingURL=compile_query.js.map