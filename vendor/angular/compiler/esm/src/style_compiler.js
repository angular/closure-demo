goog.module('_angular$compiler$src$style__compiler');
var core_1 = goog.require('_angular$core');
var compile_metadata_1 = goog.require('_angular$compiler$src$compile__metadata');
var o = goog.require('_angular$compiler$src$output$output__ast');
var shadow_css_1 = goog.require('_angular$compiler$src$shadow__css');
var url_resolver_1 = goog.require('_angular$compiler$src$url__resolver');
var style_url_resolver_1 = goog.require('_angular$compiler$src$style__url__resolver');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
const /** @type {?} */ COMPONENT_VARIABLE = '%COMP%';
const /** @type {?} */ HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
const /** @type {?} */ CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
class StylesCompileDependency {
    /**
     * @param {?} moduleUrl
     * @param {?} isShimmed
     * @param {?} valuePlaceholder
     */
    constructor(moduleUrl, isShimmed, valuePlaceholder) {
        this.moduleUrl = moduleUrl;
        this.isShimmed = isShimmed;
        this.valuePlaceholder = valuePlaceholder;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        StylesCompileDependency.prototype.moduleUrl;
        /** @type {?} */
        StylesCompileDependency.prototype.isShimmed;
        /** @type {?} */
        StylesCompileDependency.prototype.valuePlaceholder;
    }
}
exports.StylesCompileDependency = StylesCompileDependency;
class StylesCompileResult {
    /**
     * @param {?} statements
     * @param {?} stylesVar
     * @param {?} dependencies
     */
    constructor(statements, stylesVar, dependencies) {
        this.statements = statements;
        this.stylesVar = stylesVar;
        this.dependencies = dependencies;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        StylesCompileResult.prototype.statements;
        /** @type {?} */
        StylesCompileResult.prototype.stylesVar;
        /** @type {?} */
        StylesCompileResult.prototype.dependencies;
    }
}
exports.StylesCompileResult = StylesCompileResult;
class StyleCompiler {
    /**
     * @param {?} _urlResolver
     */
    constructor(_urlResolver) {
        this._urlResolver = _urlResolver;
        this._shadowCss = new shadow_css_1.ShadowCss();
    }
    /**
     * @param {?} comp
     * @return {?}
     */
    compileComponent(comp) {
        var /** @type {?} */ shim = comp.template.encapsulation === core_1.ViewEncapsulation.Emulated;
        return this._compileStyles(getStylesVarName(comp), comp.template.styles, comp.template.styleUrls, shim);
    }
    /**
     * @param {?} stylesheetUrl
     * @param {?} cssText
     * @param {?} isShimmed
     * @return {?}
     */
    compileStylesheet(stylesheetUrl, cssText, isShimmed) {
        var /** @type {?} */ styleWithImports = style_url_resolver_1.extractStyleUrls(this._urlResolver, stylesheetUrl, cssText);
        return this._compileStyles(getStylesVarName(null), [styleWithImports.style], styleWithImports.styleUrls, isShimmed);
    }
    /**
     * @param {?} stylesVar
     * @param {?} plainStyles
     * @param {?} absUrls
     * @param {?} shim
     * @return {?}
     */
    _compileStyles(stylesVar, plainStyles, absUrls, shim) {
        var /** @type {?} */ styleExpressions = plainStyles.map(plainStyle => o.literal(this._shimIfNeeded(plainStyle, shim)));
        var /** @type {?} */ dependencies = [];
        for (var /** @type {?} */ i = 0; i < absUrls.length; i++) {
            var /** @type {?} */ identifier = new compile_metadata_1.CompileIdentifierMetadata({ name: getStylesVarName(null) });
            dependencies.push(new StylesCompileDependency(absUrls[i], shim, identifier));
            styleExpressions.push(new o.ExternalExpr(identifier));
        }
        // styles variable contains plain strings and arrays of other styles arrays (recursive),
        // so we set its type to dynamic.
        var /** @type {?} */ stmt = o.variable(stylesVar)
            .set(o.literalArr(styleExpressions, new o.ArrayType(o.DYNAMIC_TYPE, [o.TypeModifier.Const])))
            .toDeclStmt(null, [o.StmtModifier.Final]);
        return new StylesCompileResult([stmt], stylesVar, dependencies);
    }
    /**
     * @param {?} style
     * @param {?} shim
     * @return {?}
     */
    _shimIfNeeded(style, shim) {
        return shim ? this._shadowCss.shimCssText(style, CONTENT_ATTR, HOST_ATTR) : style;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        StyleCompiler.prototype._shadowCss;
        /** @type {?} */
        StyleCompiler.prototype._urlResolver;
    }
}
StyleCompiler.decorators = [
    { type: core_1.Injectable },
];
StyleCompiler.ctorParameters = [
    { type: url_resolver_1.UrlResolver, },
];
exports.StyleCompiler = StyleCompiler;
/**
 * @param {?} component
 * @return {?}
 */
function getStylesVarName(component) {
    var /** @type {?} */ result = `styles`;
    if (lang_1.isPresent(component)) {
        result += `_${component.type.name}`;
    }
    return result;
}
//# sourceMappingURL=style_compiler.js.map