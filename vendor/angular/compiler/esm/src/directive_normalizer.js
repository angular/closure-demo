goog.module('_angular$compiler$src$directive__normalizer');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
var async_1 = goog.require('_angular$compiler$src$facade$async');
var compile_metadata_1 = goog.require('_angular$compiler$src$compile__metadata');
var xhr_1 = goog.require('_angular$compiler$src$xhr');
var url_resolver_1 = goog.require('_angular$compiler$src$url__resolver');
var style_url_resolver_1 = goog.require('_angular$compiler$src$style__url__resolver');
var html_ast_1 = goog.require('_angular$compiler$src$html__ast');
var html_parser_1 = goog.require('_angular$compiler$src$html__parser');
var template_preparser_1 = goog.require('_angular$compiler$src$template__preparser');
class DirectiveNormalizer {
    /**
     * @param {?} _xhr
     * @param {?} _urlResolver
     * @param {?} _htmlParser
     */
    constructor(_xhr, _urlResolver, _htmlParser) {
        this._xhr = _xhr;
        this._urlResolver = _urlResolver;
        this._htmlParser = _htmlParser;
    }
    /**
     * @param {?} directive
     * @return {?}
     */
    normalizeDirective(directive) {
        if (!directive.isComponent) {
            // For non components there is nothing to be normalized yet.
            return async_1.PromiseWrapper.resolve(directive);
        }
        return this.normalizeTemplate(directive.type, directive.template)
            .then((normalizedTemplate) => new compile_metadata_1.CompileDirectiveMetadata({
            type: directive.type,
            isComponent: directive.isComponent,
            selector: directive.selector,
            exportAs: directive.exportAs,
            changeDetection: directive.changeDetection,
            inputs: directive.inputs,
            outputs: directive.outputs,
            hostListeners: directive.hostListeners,
            hostProperties: directive.hostProperties,
            hostAttributes: directive.hostAttributes,
            lifecycleHooks: directive.lifecycleHooks,
            providers: directive.providers,
            viewProviders: directive.viewProviders,
            queries: directive.queries,
            viewQueries: directive.viewQueries,
            template: normalizedTemplate
        }));
    }
    /**
     * @param {?} directiveType
     * @param {?} template
     * @return {?}
     */
    normalizeTemplate(directiveType, template) {
        if (lang_1.isPresent(template.template)) {
            return async_1.PromiseWrapper.resolve(this.normalizeLoadedTemplate(directiveType, template, template.template, directiveType.moduleUrl));
        }
        else if (lang_1.isPresent(template.templateUrl)) {
            var /** @type {?} */ sourceAbsUrl = this._urlResolver.resolve(directiveType.moduleUrl, template.templateUrl);
            return this._xhr.get(sourceAbsUrl)
                .then(templateContent => this.normalizeLoadedTemplate(directiveType, template, templateContent, sourceAbsUrl));
        }
        else {
            throw new exceptions_1.BaseException(`No template specified for component ${directiveType.name}`);
        }
    }
    /**
     * @param {?} directiveType
     * @param {?} templateMeta
     * @param {?} template
     * @param {?} templateAbsUrl
     * @return {?}
     */
    normalizeLoadedTemplate(directiveType, templateMeta, template, templateAbsUrl) {
        var /** @type {?} */ rootNodesAndErrors = this._htmlParser.parse(template, directiveType.name);
        if (rootNodesAndErrors.errors.length > 0) {
            var /** @type {?} */ errorString = rootNodesAndErrors.errors.join('\n');
            throw new exceptions_1.BaseException(`Template parse errors:\n${errorString}`);
        }
        var /** @type {?} */ visitor = new TemplatePreparseVisitor();
        html_ast_1.htmlVisitAll(visitor, rootNodesAndErrors.rootNodes);
        var /** @type {?} */ allStyles = templateMeta.styles.concat(visitor.styles);
        var /** @type {?} */ allStyleAbsUrls = visitor.styleUrls.filter(style_url_resolver_1.isStyleUrlResolvable)
            .map(url => this._urlResolver.resolve(templateAbsUrl, url))
            .concat(templateMeta.styleUrls.filter(style_url_resolver_1.isStyleUrlResolvable)
            .map(url => this._urlResolver.resolve(directiveType.moduleUrl, url)));
        var /** @type {?} */ allResolvedStyles = allStyles.map(style => {
            var /** @type {?} */ styleWithImports = style_url_resolver_1.extractStyleUrls(this._urlResolver, templateAbsUrl, style);
            styleWithImports.styleUrls.forEach(styleUrl => allStyleAbsUrls.push(styleUrl));
            return styleWithImports.style;
        });
        var /** @type {?} */ encapsulation = templateMeta.encapsulation;
        if (encapsulation === core_1.ViewEncapsulation.Emulated && allResolvedStyles.length === 0 &&
            allStyleAbsUrls.length === 0) {
            encapsulation = core_1.ViewEncapsulation.None;
        }
        return new compile_metadata_1.CompileTemplateMetadata({
            encapsulation: encapsulation,
            template: template,
            templateUrl: templateAbsUrl,
            styles: allResolvedStyles,
            styleUrls: allStyleAbsUrls,
            ngContentSelectors: visitor.ngContentSelectors
        });
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DirectiveNormalizer.prototype._xhr;
        /** @type {?} */
        DirectiveNormalizer.prototype._urlResolver;
        /** @type {?} */
        DirectiveNormalizer.prototype._htmlParser;
    }
}
/** @nocollapse */ DirectiveNormalizer.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ DirectiveNormalizer.ctorParameters = [
    { type: xhr_1.XHR, },
    { type: url_resolver_1.UrlResolver, },
    { type: html_parser_1.HtmlParser, },
];
exports.DirectiveNormalizer = DirectiveNormalizer;
class TemplatePreparseVisitor {
    constructor() {
        this.ngContentSelectors = [];
        this.styles = [];
        this.styleUrls = [];
        this.ngNonBindableStackCount = 0;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitElement(ast, context) {
        var /** @type {?} */ preparsedElement = template_preparser_1.preparseElement(ast);
        switch (preparsedElement.type) {
            case template_preparser_1.PreparsedElementType.NG_CONTENT:
                if (this.ngNonBindableStackCount === 0) {
                    this.ngContentSelectors.push(preparsedElement.selectAttr);
                }
                break;
            case template_preparser_1.PreparsedElementType.STYLE:
                var /** @type {?} */ textContent = '';
                ast.children.forEach(child => {
                    if (child instanceof html_ast_1.HtmlTextAst) {
                        textContent += ((child)).value;
                    }
                });
                this.styles.push(textContent);
                break;
            case template_preparser_1.PreparsedElementType.STYLESHEET:
                this.styleUrls.push(preparsedElement.hrefAttr);
                break;
            default:
                // DDC reports this as error. See:
                // https://github.com/dart-lang/dev_compiler/issues/428
                break;
        }
        if (preparsedElement.nonBindable) {
            this.ngNonBindableStackCount++;
        }
        html_ast_1.htmlVisitAll(this, ast.children);
        if (preparsedElement.nonBindable) {
            this.ngNonBindableStackCount--;
        }
        return null;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitComment(ast, context) { return null; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitAttr(ast, context) { return null; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitText(ast, context) { return null; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitExpansion(ast, context) { return null; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitExpansionCase(ast, context) { return null; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TemplatePreparseVisitor.prototype.ngContentSelectors;
        /** @type {?} */
        TemplatePreparseVisitor.prototype.styles;
        /** @type {?} */
        TemplatePreparseVisitor.prototype.styleUrls;
        /** @type {?} */
        TemplatePreparseVisitor.prototype.ngNonBindableStackCount;
    }
}
//# sourceMappingURL=directive_normalizer.js.map