goog.module('_angular$compiler$src$html__ast');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
class HtmlTextAst {
    /**
     * @param {?} value
     * @param {?} sourceSpan
     */
    constructor(value, sourceSpan) {
        this.value = value;
        this.sourceSpan = sourceSpan;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visit(visitor, context) { return visitor.visitText(this, context); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        HtmlTextAst.prototype.value;
        /** @type {?} */
        HtmlTextAst.prototype.sourceSpan;
    }
}
exports.HtmlTextAst = HtmlTextAst;
class HtmlExpansionAst {
    /**
     * @param {?} switchValue
     * @param {?} type
     * @param {?} cases
     * @param {?} sourceSpan
     * @param {?} switchValueSourceSpan
     */
    constructor(switchValue, type, cases, sourceSpan, switchValueSourceSpan) {
        this.switchValue = switchValue;
        this.type = type;
        this.cases = cases;
        this.sourceSpan = sourceSpan;
        this.switchValueSourceSpan = switchValueSourceSpan;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visit(visitor, context) {
        return visitor.visitExpansion(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        HtmlExpansionAst.prototype.switchValue;
        /** @type {?} */
        HtmlExpansionAst.prototype.type;
        /** @type {?} */
        HtmlExpansionAst.prototype.cases;
        /** @type {?} */
        HtmlExpansionAst.prototype.sourceSpan;
        /** @type {?} */
        HtmlExpansionAst.prototype.switchValueSourceSpan;
    }
}
exports.HtmlExpansionAst = HtmlExpansionAst;
class HtmlExpansionCaseAst {
    /**
     * @param {?} value
     * @param {?} expression
     * @param {?} sourceSpan
     * @param {?} valueSourceSpan
     * @param {?} expSourceSpan
     */
    constructor(value, expression, sourceSpan, valueSourceSpan, expSourceSpan) {
        this.value = value;
        this.expression = expression;
        this.sourceSpan = sourceSpan;
        this.valueSourceSpan = valueSourceSpan;
        this.expSourceSpan = expSourceSpan;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visit(visitor, context) {
        return visitor.visitExpansionCase(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        HtmlExpansionCaseAst.prototype.value;
        /** @type {?} */
        HtmlExpansionCaseAst.prototype.expression;
        /** @type {?} */
        HtmlExpansionCaseAst.prototype.sourceSpan;
        /** @type {?} */
        HtmlExpansionCaseAst.prototype.valueSourceSpan;
        /** @type {?} */
        HtmlExpansionCaseAst.prototype.expSourceSpan;
    }
}
exports.HtmlExpansionCaseAst = HtmlExpansionCaseAst;
class HtmlAttrAst {
    /**
     * @param {?} name
     * @param {?} value
     * @param {?} sourceSpan
     */
    constructor(name, value, sourceSpan) {
        this.name = name;
        this.value = value;
        this.sourceSpan = sourceSpan;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visit(visitor, context) { return visitor.visitAttr(this, context); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        HtmlAttrAst.prototype.name;
        /** @type {?} */
        HtmlAttrAst.prototype.value;
        /** @type {?} */
        HtmlAttrAst.prototype.sourceSpan;
    }
}
exports.HtmlAttrAst = HtmlAttrAst;
class HtmlElementAst {
    /**
     * @param {?} name
     * @param {?} attrs
     * @param {?} children
     * @param {?} sourceSpan
     * @param {?} startSourceSpan
     * @param {?} endSourceSpan
     */
    constructor(name, attrs, children, sourceSpan, startSourceSpan, endSourceSpan) {
        this.name = name;
        this.attrs = attrs;
        this.children = children;
        this.sourceSpan = sourceSpan;
        this.startSourceSpan = startSourceSpan;
        this.endSourceSpan = endSourceSpan;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visit(visitor, context) { return visitor.visitElement(this, context); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        HtmlElementAst.prototype.name;
        /** @type {?} */
        HtmlElementAst.prototype.attrs;
        /** @type {?} */
        HtmlElementAst.prototype.children;
        /** @type {?} */
        HtmlElementAst.prototype.sourceSpan;
        /** @type {?} */
        HtmlElementAst.prototype.startSourceSpan;
        /** @type {?} */
        HtmlElementAst.prototype.endSourceSpan;
    }
}
exports.HtmlElementAst = HtmlElementAst;
class HtmlCommentAst {
    /**
     * @param {?} value
     * @param {?} sourceSpan
     */
    constructor(value, sourceSpan) {
        this.value = value;
        this.sourceSpan = sourceSpan;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visit(visitor, context) { return visitor.visitComment(this, context); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        HtmlCommentAst.prototype.value;
        /** @type {?} */
        HtmlCommentAst.prototype.sourceSpan;
    }
}
exports.HtmlCommentAst = HtmlCommentAst;
/**
 * @param {?} visitor
 * @param {?} asts
 * @param {?=} context
 * @return {?}
 */
function htmlVisitAll(visitor, asts, context = null) {
    var /** @type {?} */ result = [];
    asts.forEach(ast => {
        var /** @type {?} */ astResult = ast.visit(visitor, context);
        if (lang_1.isPresent(astResult)) {
            result.push(astResult);
        }
    });
    return result;
}
exports.htmlVisitAll = htmlVisitAll;
//# sourceMappingURL=html_ast.js.map