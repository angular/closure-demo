goog.module('_angular$compiler$src$template__parser');
var core_1 = goog.require('_angular$core');
var core_private_1 = goog.require('_angular$compiler$core__private');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
var ast_1 = goog.require('_angular$compiler$src$expression__parser$ast');
var parser_1 = goog.require('_angular$compiler$src$expression__parser$parser');
var html_parser_1 = goog.require('_angular$compiler$src$html__parser');
var html_tags_1 = goog.require('_angular$compiler$src$html__tags');
var parse_util_1 = goog.require('_angular$compiler$src$parse__util');
var template_ast_1 = goog.require('_angular$compiler$src$template__ast');
var selector_1 = goog.require('_angular$compiler$src$selector');
var element_schema_registry_1 = goog.require('_angular$compiler$src$schema$element__schema__registry');
var template_preparser_1 = goog.require('_angular$compiler$src$template__preparser');
var style_url_resolver_1 = goog.require('_angular$compiler$src$style__url__resolver');
var html_ast_1 = goog.require('_angular$compiler$src$html__ast');
var util_1 = goog.require('_angular$compiler$src$util');
var identifiers_1 = goog.require('_angular$compiler$src$identifiers');
var provider_parser_1 = goog.require('_angular$compiler$src$provider__parser');
// Group 1 = "bind-"
// Group 2 = "var-"
// Group 3 = "let-"
// Group 4 = "ref-/#"
// Group 5 = "on-"
// Group 6 = "bindon-"
// Group 7 = the identifier after "bind-", "var-/#", or "on-"
// Group 8 = identifier inside [()]
// Group 9 = identifier inside []
// Group 10 = identifier inside ()
var /** @type {?} */ BIND_NAME_REGEXP = /^(?:(?:(?:(bind-)|(var-)|(let-)|(ref-|#)|(on-)|(bindon-))(.+))|\[\(([^\)]+)\)\]|\[([^\]]+)\]|\(([^\)]+)\))$/g;
const /** @type {?} */ TEMPLATE_ELEMENT = 'template';
const /** @type {?} */ TEMPLATE_ATTR = 'template';
const /** @type {?} */ TEMPLATE_ATTR_PREFIX = '*';
const /** @type {?} */ CLASS_ATTR = 'class';
var /** @type {?} */ PROPERTY_PARTS_SEPARATOR = '.';
const /** @type {?} */ ATTRIBUTE_PREFIX = 'attr';
const /** @type {?} */ CLASS_PREFIX = 'class';
const /** @type {?} */ STYLE_PREFIX = 'style';
var /** @type {?} */ TEXT_CSS_SELECTOR = selector_1.CssSelector.parse('*')[0];
/**
 * Provides an array of {@link TemplateAstVisitor}s which will be used to transform
 * parsed templates before compilation is invoked, allowing custom expression syntax
 * and other advanced transformations.
 *
 * This is currently an internal-only feature and not meant for general use.
 */
exports.TEMPLATE_TRANSFORMS = new core_1.OpaqueToken('TemplateTransforms');
class TemplateParseError extends parse_util_1.ParseError {
    /**
     * @param {?} message
     * @param {?} span
     * @param {?} level
     */
    constructor(message, span, level) {
        super(span, message, level);
    }
}
exports.TemplateParseError = TemplateParseError;
class TemplateParseResult {
    /**
     * @param {?=} templateAst
     * @param {?=} errors
     */
    constructor(templateAst, errors) {
        this.templateAst = templateAst;
        this.errors = errors;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TemplateParseResult.prototype.templateAst;
        /** @type {?} */
        TemplateParseResult.prototype.errors;
    }
}
exports.TemplateParseResult = TemplateParseResult;
class TemplateParser {
    /**
     * @param {?} _exprParser
     * @param {?} _schemaRegistry
     * @param {?} _htmlParser
     * @param {?} _console
     * @param {?} transforms
     */
    constructor(_exprParser, _schemaRegistry, _htmlParser, _console, transforms) {
        this._exprParser = _exprParser;
        this._schemaRegistry = _schemaRegistry;
        this._htmlParser = _htmlParser;
        this._console = _console;
        this.transforms = transforms;
    }
    /**
     * @param {?} component
     * @param {?} template
     * @param {?} directives
     * @param {?} pipes
     * @param {?} templateUrl
     * @return {?}
     */
    parse(component, template, directives, pipes, templateUrl) {
        var /** @type {?} */ result = this.tryParse(component, template, directives, pipes, templateUrl);
        var /** @type {?} */ warnings = result.errors.filter(error => error.level === parse_util_1.ParseErrorLevel.WARNING);
        var /** @type {?} */ errors = result.errors.filter(error => error.level === parse_util_1.ParseErrorLevel.FATAL);
        if (warnings.length > 0) {
            this._console.warn(`Template parse warnings:\n${warnings.join('\n')}`);
        }
        if (errors.length > 0) {
            var /** @type {?} */ errorString = errors.join('\n');
            throw new exceptions_1.BaseException(`Template parse errors:\n${errorString}`);
        }
        return result.templateAst;
    }
    /**
     * @param {?} component
     * @param {?} template
     * @param {?} directives
     * @param {?} pipes
     * @param {?} templateUrl
     * @return {?}
     */
    tryParse(component, template, directives, pipes, templateUrl) {
        var /** @type {?} */ htmlAstWithErrors = this._htmlParser.parse(template, templateUrl);
        var /** @type {?} */ errors = htmlAstWithErrors.errors;
        var /** @type {?} */ result;
        if (htmlAstWithErrors.rootNodes.length > 0) {
            var /** @type {?} */ uniqDirectives = (removeDuplicates(directives));
            var /** @type {?} */ uniqPipes = (removeDuplicates(pipes));
            var /** @type {?} */ providerViewContext = new provider_parser_1.ProviderViewContext(component, htmlAstWithErrors.rootNodes[0].sourceSpan);
            var /** @type {?} */ parseVisitor = new TemplateParseVisitor(providerViewContext, uniqDirectives, uniqPipes, this._exprParser, this._schemaRegistry);
            result = html_ast_1.htmlVisitAll(parseVisitor, htmlAstWithErrors.rootNodes, EMPTY_ELEMENT_CONTEXT);
            errors = errors.concat(parseVisitor.errors).concat(providerViewContext.errors);
        }
        else {
            result = [];
        }
        if (errors.length > 0) {
            return new TemplateParseResult(result, errors);
        }
        if (lang_1.isPresent(this.transforms)) {
            this.transforms.forEach((transform) => { result = template_ast_1.templateVisitAll(transform, result); });
        }
        return new TemplateParseResult(result, errors);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TemplateParser.prototype._exprParser;
        /** @type {?} */
        TemplateParser.prototype._schemaRegistry;
        /** @type {?} */
        TemplateParser.prototype._htmlParser;
        /** @type {?} */
        TemplateParser.prototype._console;
        /** @type {?} */
        TemplateParser.prototype.transforms;
    }
}
TemplateParser.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ TemplateParser.ctorParameters = [
    { type: parser_1.Parser, },
    { type: element_schema_registry_1.ElementSchemaRegistry, },
    { type: html_parser_1.HtmlParser, },
    { type: core_private_1.Console, },
    { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [exports.TEMPLATE_TRANSFORMS,] },] },
];
exports.TemplateParser = TemplateParser;
class TemplateParseVisitor {
    /**
     * @param {?} providerViewContext
     * @param {?} directives
     * @param {?} pipes
     * @param {?} _exprParser
     * @param {?} _schemaRegistry
     */
    constructor(providerViewContext, directives, pipes, _exprParser, _schemaRegistry) {
        this.providerViewContext = providerViewContext;
        this._exprParser = _exprParser;
        this._schemaRegistry = _schemaRegistry;
        this.errors = [];
        this.directivesIndex = new Map();
        this.ngContentCount = 0;
        this.selectorMatcher = new selector_1.SelectorMatcher();
        collection_1.ListWrapper.forEachWithIndex(directives, (directive, index) => {
            var selector = selector_1.CssSelector.parse(directive.selector);
            this.selectorMatcher.addSelectables(selector, directive);
            this.directivesIndex.set(directive, index);
        });
        this.pipesByName = new Map();
        pipes.forEach(pipe => this.pipesByName.set(pipe.name, pipe));
    }
    /**
     * @param {?} message
     * @param {?} sourceSpan
     * @param {?=} level
     * @return {?}
     */
    _reportError(message, sourceSpan, level = parse_util_1.ParseErrorLevel.FATAL) {
        this.errors.push(new TemplateParseError(message, sourceSpan, level));
    }
    /**
     * @param {?} value
     * @param {?} sourceSpan
     * @return {?}
     */
    _parseInterpolation(value, sourceSpan) {
        var /** @type {?} */ sourceInfo = sourceSpan.start.toString();
        try {
            var /** @type {?} */ ast = this._exprParser.parseInterpolation(value, sourceInfo);
            this._checkPipes(ast, sourceSpan);
            if (lang_1.isPresent(ast) &&
                ((ast.ast)).expressions.length > core_private_1.MAX_INTERPOLATION_VALUES) {
                throw new exceptions_1.BaseException(`Only support at most ${core_private_1.MAX_INTERPOLATION_VALUES} interpolation values!`);
            }
            return ast;
        }
        catch (e) {
            this._reportError(`${e}`, sourceSpan);
            return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo);
        }
    }
    /**
     * @param {?} value
     * @param {?} sourceSpan
     * @return {?}
     */
    _parseAction(value, sourceSpan) {
        var /** @type {?} */ sourceInfo = sourceSpan.start.toString();
        try {
            var /** @type {?} */ ast = this._exprParser.parseAction(value, sourceInfo);
            this._checkPipes(ast, sourceSpan);
            return ast;
        }
        catch (e) {
            this._reportError(`${e}`, sourceSpan);
            return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo);
        }
    }
    /**
     * @param {?} value
     * @param {?} sourceSpan
     * @return {?}
     */
    _parseBinding(value, sourceSpan) {
        var /** @type {?} */ sourceInfo = sourceSpan.start.toString();
        try {
            var /** @type {?} */ ast = this._exprParser.parseBinding(value, sourceInfo);
            this._checkPipes(ast, sourceSpan);
            return ast;
        }
        catch (e) {
            this._reportError(`${e}`, sourceSpan);
            return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo);
        }
    }
    /**
     * @param {?} value
     * @param {?} sourceSpan
     * @return {?}
     */
    _parseTemplateBindings(value, sourceSpan) {
        var /** @type {?} */ sourceInfo = sourceSpan.start.toString();
        try {
            var /** @type {?} */ bindingsResult = this._exprParser.parseTemplateBindings(value, sourceInfo);
            bindingsResult.templateBindings.forEach((binding) => {
                if (lang_1.isPresent(binding.expression)) {
                    this._checkPipes(binding.expression, sourceSpan);
                }
            });
            bindingsResult.warnings.forEach((warning) => { this._reportError(warning, sourceSpan, parse_util_1.ParseErrorLevel.WARNING); });
            return bindingsResult.templateBindings;
        }
        catch (e) {
            this._reportError(`${e}`, sourceSpan);
            return [];
        }
    }
    /**
     * @param {?} ast
     * @param {?} sourceSpan
     * @return {?}
     */
    _checkPipes(ast, sourceSpan) {
        if (lang_1.isPresent(ast)) {
            var /** @type {?} */ collector = new PipeCollector();
            ast.visit(collector);
            collector.pipes.forEach((pipeName) => {
                if (!this.pipesByName.has(pipeName)) {
                    this._reportError(`The pipe '${pipeName}' could not be found`, sourceSpan);
                }
            });
        }
    }
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
    /**
     * @param {?} ast
     * @param {?} parent
     * @return {?}
     */
    visitText(ast, parent) {
        var /** @type {?} */ ngContentIndex = parent.findNgContentIndex(TEXT_CSS_SELECTOR);
        var /** @type {?} */ expr = this._parseInterpolation(ast.value, ast.sourceSpan);
        if (lang_1.isPresent(expr)) {
            return new template_ast_1.BoundTextAst(expr, ngContentIndex, ast.sourceSpan);
        }
        else {
            return new template_ast_1.TextAst(ast.value, ngContentIndex, ast.sourceSpan);
        }
    }
    /**
     * @param {?} ast
     * @param {?} contex
     * @return {?}
     */
    visitAttr(ast, contex) {
        return new template_ast_1.AttrAst(ast.name, ast.value, ast.sourceSpan);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitComment(ast, context) { return null; }
    /**
     * @param {?} element
     * @param {?} parent
     * @return {?}
     */
    visitElement(element, parent) {
        var /** @type {?} */ nodeName = element.name;
        var /** @type {?} */ preparsedElement = template_preparser_1.preparseElement(element);
        if (preparsedElement.type === template_preparser_1.PreparsedElementType.SCRIPT ||
            preparsedElement.type === template_preparser_1.PreparsedElementType.STYLE) {
            // Skipping <script> for security reasons
            // Skipping <style> as we already processed them
            // in the StyleCompiler
            return null;
        }
        if (preparsedElement.type === template_preparser_1.PreparsedElementType.STYLESHEET &&
            style_url_resolver_1.isStyleUrlResolvable(preparsedElement.hrefAttr)) {
            // Skipping stylesheets with either relative urls or package scheme as we already processed
            // them in the StyleCompiler
            return null;
        }
        var /** @type {?} */ matchableAttrs = [];
        var /** @type {?} */ elementOrDirectiveProps = [];
        var /** @type {?} */ elementOrDirectiveRefs = [];
        var /** @type {?} */ elementVars = [];
        var /** @type {?} */ events = [];
        var /** @type {?} */ templateElementOrDirectiveProps = [];
        var /** @type {?} */ templateMatchableAttrs = [];
        var /** @type {?} */ templateElementVars = [];
        var /** @type {?} */ hasInlineTemplates = false;
        var /** @type {?} */ attrs = [];
        var /** @type {?} */ lcElName = html_tags_1.splitNsName(nodeName.toLowerCase())[1];
        var /** @type {?} */ isTemplateElement = lcElName == TEMPLATE_ELEMENT;
        element.attrs.forEach(attr => {
            var /** @type {?} */ hasBinding = this._parseAttr(isTemplateElement, attr, matchableAttrs, elementOrDirectiveProps, events, elementOrDirectiveRefs, elementVars);
            var /** @type {?} */ hasTemplateBinding = this._parseInlineTemplateBinding(attr, templateMatchableAttrs, templateElementOrDirectiveProps, templateElementVars);
            if (!hasBinding && !hasTemplateBinding) {
                // don't include the bindings as attributes as well in the AST
                attrs.push(this.visitAttr(attr, null));
                matchableAttrs.push([attr.name, attr.value]);
            }
            if (hasTemplateBinding) {
                hasInlineTemplates = true;
            }
        });
        var /** @type {?} */ elementCssSelector = createElementCssSelector(nodeName, matchableAttrs);
        var /** @type {?} */ directiveMetas = this._parseDirectives(this.selectorMatcher, elementCssSelector);
        var /** @type {?} */ references = [];
        var /** @type {?} */ directiveAsts = this._createDirectiveAsts(isTemplateElement, element.name, directiveMetas, elementOrDirectiveProps, elementOrDirectiveRefs, element.sourceSpan, references);
        var /** @type {?} */ elementProps = this._createElementPropertyAsts(element.name, elementOrDirectiveProps, directiveAsts);
        var /** @type {?} */ isViewRoot = parent.isTemplateElement || hasInlineTemplates;
        var /** @type {?} */ providerContext = new provider_parser_1.ProviderElementContext(this.providerViewContext, parent.providerContext, isViewRoot, directiveAsts, attrs, references, element.sourceSpan);
        var /** @type {?} */ children = html_ast_1.htmlVisitAll(preparsedElement.nonBindable ? NON_BINDABLE_VISITOR : this, element.children, ElementContext.create(isTemplateElement, directiveAsts, isTemplateElement ? parent.providerContext : providerContext));
        providerContext.afterElement();
        // Override the actual selector when the `ngProjectAs` attribute is provided
        var /** @type {?} */ projectionSelector = lang_1.isPresent(preparsedElement.projectAs) ?
            selector_1.CssSelector.parse(preparsedElement.projectAs)[0] :
            elementCssSelector;
        var /** @type {?} */ ngContentIndex = parent.findNgContentIndex(projectionSelector);
        var /** @type {?} */ parsedElement;
        if (preparsedElement.type === template_preparser_1.PreparsedElementType.NG_CONTENT) {
            if (lang_1.isPresent(element.children) && element.children.length > 0) {
                this._reportError(`<ng-content> element cannot have content. <ng-content> must be immediately followed by </ng-content>`, element.sourceSpan);
            }
            parsedElement = new template_ast_1.NgContentAst(this.ngContentCount++, hasInlineTemplates ? null : ngContentIndex, element.sourceSpan);
        }
        else if (isTemplateElement) {
            this._assertAllEventsPublishedByDirectives(directiveAsts, events);
            this._assertNoComponentsNorElementBindingsOnTemplate(directiveAsts, elementProps, element.sourceSpan);
            parsedElement = new template_ast_1.EmbeddedTemplateAst(attrs, events, references, elementVars, providerContext.transformedDirectiveAsts, providerContext.transformProviders, providerContext.transformedHasViewContainer, children, hasInlineTemplates ? null : ngContentIndex, element.sourceSpan);
        }
        else {
            this._assertOnlyOneComponent(directiveAsts, element.sourceSpan);
            let /** @type {?} */ ngContentIndex = hasInlineTemplates ? null : parent.findNgContentIndex(projectionSelector);
            parsedElement = new template_ast_1.ElementAst(nodeName, attrs, elementProps, events, references, providerContext.transformedDirectiveAsts, providerContext.transformProviders, providerContext.transformedHasViewContainer, children, hasInlineTemplates ? null : ngContentIndex, element.sourceSpan);
        }
        if (hasInlineTemplates) {
            var /** @type {?} */ templateCssSelector = createElementCssSelector(TEMPLATE_ELEMENT, templateMatchableAttrs);
            var /** @type {?} */ templateDirectiveMetas = this._parseDirectives(this.selectorMatcher, templateCssSelector);
            var /** @type {?} */ templateDirectiveAsts = this._createDirectiveAsts(true, element.name, templateDirectiveMetas, templateElementOrDirectiveProps, [], element.sourceSpan, []);
            var /** @type {?} */ templateElementProps = this._createElementPropertyAsts(element.name, templateElementOrDirectiveProps, templateDirectiveAsts);
            this._assertNoComponentsNorElementBindingsOnTemplate(templateDirectiveAsts, templateElementProps, element.sourceSpan);
            var /** @type {?} */ templateProviderContext = new provider_parser_1.ProviderElementContext(this.providerViewContext, parent.providerContext, parent.isTemplateElement, templateDirectiveAsts, [], [], element.sourceSpan);
            templateProviderContext.afterElement();
            parsedElement = new template_ast_1.EmbeddedTemplateAst([], [], [], templateElementVars, templateProviderContext.transformedDirectiveAsts, templateProviderContext.transformProviders, templateProviderContext.transformedHasViewContainer, [parsedElement], ngContentIndex, element.sourceSpan);
        }
        return parsedElement;
    }
    /**
     * @param {?} attr
     * @param {?} targetMatchableAttrs
     * @param {?} targetProps
     * @param {?} targetVars
     * @return {?}
     */
    _parseInlineTemplateBinding(attr, targetMatchableAttrs, targetProps, targetVars) {
        var /** @type {?} */ templateBindingsSource = null;
        if (attr.name == TEMPLATE_ATTR) {
            templateBindingsSource = attr.value;
        }
        else if (attr.name.startsWith(TEMPLATE_ATTR_PREFIX)) {
            var /** @type {?} */ key = attr.name.substring(TEMPLATE_ATTR_PREFIX.length); // remove the star
            templateBindingsSource = (attr.value.length == 0) ? key : key + ' ' + attr.value;
        }
        if (lang_1.isPresent(templateBindingsSource)) {
            var /** @type {?} */ bindings = this._parseTemplateBindings(templateBindingsSource, attr.sourceSpan);
            for (var /** @type {?} */ i = 0; i < bindings.length; i++) {
                var /** @type {?} */ binding = bindings[i];
                if (binding.keyIsVar) {
                    targetVars.push(new template_ast_1.VariableAst(binding.key, binding.name, attr.sourceSpan));
                }
                else if (lang_1.isPresent(binding.expression)) {
                    this._parsePropertyAst(binding.key, binding.expression, attr.sourceSpan, targetMatchableAttrs, targetProps);
                }
                else {
                    targetMatchableAttrs.push([binding.key, '']);
                    this._parseLiteralAttr(binding.key, null, attr.sourceSpan, targetProps);
                }
            }
            return true;
        }
        return false;
    }
    /**
     * @param {?} isTemplateElement
     * @param {?} attr
     * @param {?} targetMatchableAttrs
     * @param {?} targetProps
     * @param {?} targetEvents
     * @param {?} targetRefs
     * @param {?} targetVars
     * @return {?}
     */
    _parseAttr(isTemplateElement, attr, targetMatchableAttrs, targetProps, targetEvents, targetRefs, targetVars) {
        var /** @type {?} */ attrName = this._normalizeAttributeName(attr.name);
        var /** @type {?} */ attrValue = attr.value;
        var /** @type {?} */ bindParts = lang_1.RegExpWrapper.firstMatch(BIND_NAME_REGEXP, attrName);
        var /** @type {?} */ hasBinding = false;
        if (lang_1.isPresent(bindParts)) {
            hasBinding = true;
            if (lang_1.isPresent(bindParts[1])) {
                this._parseProperty(bindParts[7], attrValue, attr.sourceSpan, targetMatchableAttrs, targetProps);
            }
            else if (lang_1.isPresent(bindParts[2])) {
                var /** @type {?} */ identifier = bindParts[7];
                if (isTemplateElement) {
                    this._reportError(`"var-" on <template> elements is deprecated. Use "let-" instead!`, attr.sourceSpan, parse_util_1.ParseErrorLevel.WARNING);
                    this._parseVariable(identifier, attrValue, attr.sourceSpan, targetVars);
                }
                else {
                    this._reportError(`"var-" on non <template> elements is deprecated. Use "ref-" instead!`, attr.sourceSpan, parse_util_1.ParseErrorLevel.WARNING);
                    this._parseReference(identifier, attrValue, attr.sourceSpan, targetRefs);
                }
            }
            else if (lang_1.isPresent(bindParts[3])) {
                if (isTemplateElement) {
                    var /** @type {?} */ identifier = bindParts[7];
                    this._parseVariable(identifier, attrValue, attr.sourceSpan, targetVars);
                }
                else {
                    this._reportError(`"let-" is only supported on template elements.`, attr.sourceSpan);
                }
            }
            else if (lang_1.isPresent(bindParts[4])) {
                var /** @type {?} */ identifier = bindParts[7];
                this._parseReference(identifier, attrValue, attr.sourceSpan, targetRefs);
            }
            else if (lang_1.isPresent(bindParts[5])) {
                this._parseEvent(bindParts[7], attrValue, attr.sourceSpan, targetMatchableAttrs, targetEvents);
            }
            else if (lang_1.isPresent(bindParts[6])) {
                this._parseProperty(bindParts[7], attrValue, attr.sourceSpan, targetMatchableAttrs, targetProps);
                this._parseAssignmentEvent(bindParts[7], attrValue, attr.sourceSpan, targetMatchableAttrs, targetEvents);
            }
            else if (lang_1.isPresent(bindParts[8])) {
                this._parseProperty(bindParts[8], attrValue, attr.sourceSpan, targetMatchableAttrs, targetProps);
                this._parseAssignmentEvent(bindParts[8], attrValue, attr.sourceSpan, targetMatchableAttrs, targetEvents);
            }
            else if (lang_1.isPresent(bindParts[9])) {
                this._parseProperty(bindParts[9], attrValue, attr.sourceSpan, targetMatchableAttrs, targetProps);
            }
            else if (lang_1.isPresent(bindParts[10])) {
                this._parseEvent(bindParts[10], attrValue, attr.sourceSpan, targetMatchableAttrs, targetEvents);
            }
        }
        else {
            hasBinding = this._parsePropertyInterpolation(attrName, attrValue, attr.sourceSpan, targetMatchableAttrs, targetProps);
        }
        if (!hasBinding) {
            this._parseLiteralAttr(attrName, attrValue, attr.sourceSpan, targetProps);
        }
        return hasBinding;
    }
    /**
     * @param {?} attrName
     * @return {?}
     */
    _normalizeAttributeName(attrName) {
        return attrName.toLowerCase().startsWith('data-') ? attrName.substring(5) : attrName;
    }
    /**
     * @param {?} identifier
     * @param {?} value
     * @param {?} sourceSpan
     * @param {?} targetVars
     * @return {?}
     */
    _parseVariable(identifier, value, sourceSpan, targetVars) {
        if (identifier.indexOf('-') > -1) {
            this._reportError(`"-" is not allowed in variable names`, sourceSpan);
        }
        targetVars.push(new template_ast_1.VariableAst(identifier, value, sourceSpan));
    }
    /**
     * @param {?} identifier
     * @param {?} value
     * @param {?} sourceSpan
     * @param {?} targetRefs
     * @return {?}
     */
    _parseReference(identifier, value, sourceSpan, targetRefs) {
        if (identifier.indexOf('-') > -1) {
            this._reportError(`"-" is not allowed in reference names`, sourceSpan);
        }
        targetRefs.push(new ElementOrDirectiveRef(identifier, value, sourceSpan));
    }
    /**
     * @param {?} name
     * @param {?} expression
     * @param {?} sourceSpan
     * @param {?} targetMatchableAttrs
     * @param {?} targetProps
     * @return {?}
     */
    _parseProperty(name, expression, sourceSpan, targetMatchableAttrs, targetProps) {
        this._parsePropertyAst(name, this._parseBinding(expression, sourceSpan), sourceSpan, targetMatchableAttrs, targetProps);
    }
    /**
     * @param {?} name
     * @param {?} value
     * @param {?} sourceSpan
     * @param {?} targetMatchableAttrs
     * @param {?} targetProps
     * @return {?}
     */
    _parsePropertyInterpolation(name, value, sourceSpan, targetMatchableAttrs, targetProps) {
        var /** @type {?} */ expr = this._parseInterpolation(value, sourceSpan);
        if (lang_1.isPresent(expr)) {
            this._parsePropertyAst(name, expr, sourceSpan, targetMatchableAttrs, targetProps);
            return true;
        }
        return false;
    }
    /**
     * @param {?} name
     * @param {?} ast
     * @param {?} sourceSpan
     * @param {?} targetMatchableAttrs
     * @param {?} targetProps
     * @return {?}
     */
    _parsePropertyAst(name, ast, sourceSpan, targetMatchableAttrs, targetProps) {
        targetMatchableAttrs.push([name, ast.source]);
        targetProps.push(new BoundElementOrDirectiveProperty(name, ast, false, sourceSpan));
    }
    /**
     * @param {?} name
     * @param {?} expression
     * @param {?} sourceSpan
     * @param {?} targetMatchableAttrs
     * @param {?} targetEvents
     * @return {?}
     */
    _parseAssignmentEvent(name, expression, sourceSpan, targetMatchableAttrs, targetEvents) {
        this._parseEvent(`${name}Change`, `${expression}=$event`, sourceSpan, targetMatchableAttrs, targetEvents);
    }
    /**
     * @param {?} name
     * @param {?} expression
     * @param {?} sourceSpan
     * @param {?} targetMatchableAttrs
     * @param {?} targetEvents
     * @return {?}
     */
    _parseEvent(name, expression, sourceSpan, targetMatchableAttrs, targetEvents) {
        // long format: 'target: eventName'
        var /** @type {?} */ parts = util_1.splitAtColon(name, [null, name]);
        var /** @type {?} */ target = parts[0];
        var /** @type {?} */ eventName = parts[1];
        var /** @type {?} */ ast = this._parseAction(expression, sourceSpan);
        targetMatchableAttrs.push([name, ast.source]);
        targetEvents.push(new template_ast_1.BoundEventAst(eventName, target, ast, sourceSpan));
        // Don't detect directives for event names for now,
        // so don't add the event name to the matchableAttrs
    }
    /**
     * @param {?} name
     * @param {?} value
     * @param {?} sourceSpan
     * @param {?} targetProps
     * @return {?}
     */
    _parseLiteralAttr(name, value, sourceSpan, targetProps) {
        targetProps.push(new BoundElementOrDirectiveProperty(name, this._exprParser.wrapLiteralPrimitive(value, ''), true, sourceSpan));
    }
    /**
     * @param {?} selectorMatcher
     * @param {?} elementCssSelector
     * @return {?}
     */
    _parseDirectives(selectorMatcher, elementCssSelector) {
        // Need to sort the directives so that we get consistent results throughout,
        // as selectorMatcher uses Maps inside.
        // Also dedupe directives as they might match more than one time!
        var /** @type {?} */ directives = collection_1.ListWrapper.createFixedSize(this.directivesIndex.size);
        selectorMatcher.match(elementCssSelector, (selector, directive) => {
            directives[this.directivesIndex.get(directive)] = directive;
        });
        return directives.filter(dir => lang_1.isPresent(dir));
    }
    /**
     * @param {?} isTemplateElement
     * @param {?} elementName
     * @param {?} directives
     * @param {?} props
     * @param {?} elementOrDirectiveRefs
     * @param {?} sourceSpan
     * @param {?} targetReferences
     * @return {?}
     */
    _createDirectiveAsts(isTemplateElement, elementName, directives, props, elementOrDirectiveRefs, sourceSpan, targetReferences) {
        var /** @type {?} */ matchedReferences = new Set();
        var /** @type {?} */ component = null;
        var /** @type {?} */ directiveAsts = directives.map((directive) => {
            if (directive.isComponent) {
                component = directive;
            }
            var /** @type {?} */ hostProperties = [];
            var /** @type {?} */ hostEvents = [];
            var /** @type {?} */ directiveProperties = [];
            this._createDirectiveHostPropertyAsts(elementName, directive.hostProperties, sourceSpan, hostProperties);
            this._createDirectiveHostEventAsts(directive.hostListeners, sourceSpan, hostEvents);
            this._createDirectivePropertyAsts(directive.inputs, props, directiveProperties);
            elementOrDirectiveRefs.forEach((elOrDirRef) => {
                if ((elOrDirRef.value.length === 0 && directive.isComponent) ||
                    (directive.exportAs == elOrDirRef.value)) {
                    targetReferences.push(new template_ast_1.ReferenceAst(elOrDirRef.name, identifiers_1.identifierToken(directive.type), elOrDirRef.sourceSpan));
                    matchedReferences.add(elOrDirRef.name);
                }
            });
            return new template_ast_1.DirectiveAst(directive, directiveProperties, hostProperties, hostEvents, sourceSpan);
        });
        elementOrDirectiveRefs.forEach((elOrDirRef) => {
            if (elOrDirRef.value.length > 0) {
                if (!collection_1.SetWrapper.has(matchedReferences, elOrDirRef.name)) {
                    this._reportError(`There is no directive with "exportAs" set to "${elOrDirRef.value}"`, elOrDirRef.sourceSpan);
                }
                ;
            }
            else if (lang_1.isBlank(component)) {
                var /** @type {?} */ refToken = null;
                if (isTemplateElement) {
                    refToken = identifiers_1.identifierToken(identifiers_1.Identifiers.TemplateRef);
                }
                targetReferences.push(new template_ast_1.ReferenceAst(elOrDirRef.name, refToken, elOrDirRef.sourceSpan));
            }
        }); // fix syntax highlighting issue: `
        return directiveAsts;
    }
    /**
     * @param {?} elementName
     * @param {?} hostProps
     * @param {?} sourceSpan
     * @param {?} targetPropertyAsts
     * @return {?}
     */
    _createDirectiveHostPropertyAsts(elementName, hostProps, sourceSpan, targetPropertyAsts) {
        if (lang_1.isPresent(hostProps)) {
            collection_1.StringMapWrapper.forEach(hostProps, (expression, propName) => {
                var /** @type {?} */ exprAst = this._parseBinding(expression, sourceSpan);
                targetPropertyAsts.push(this._createElementPropertyAst(elementName, propName, exprAst, sourceSpan));
            });
        }
    }
    /**
     * @param {?} hostListeners
     * @param {?} sourceSpan
     * @param {?} targetEventAsts
     * @return {?}
     */
    _createDirectiveHostEventAsts(hostListeners, sourceSpan, targetEventAsts) {
        if (lang_1.isPresent(hostListeners)) {
            collection_1.StringMapWrapper.forEach(hostListeners, (expression, propName) => {
                this._parseEvent(propName, expression, sourceSpan, [], targetEventAsts);
            });
        }
    }
    /**
     * @param {?} directiveProperties
     * @param {?} boundProps
     * @param {?} targetBoundDirectiveProps
     * @return {?}
     */
    _createDirectivePropertyAsts(directiveProperties, boundProps, targetBoundDirectiveProps) {
        if (lang_1.isPresent(directiveProperties)) {
            var /** @type {?} */ boundPropsByName = new Map();
            boundProps.forEach(boundProp => {
                var /** @type {?} */ prevValue = boundPropsByName.get(boundProp.name);
                if (lang_1.isBlank(prevValue) || prevValue.isLiteral) {
                    // give [a]="b" a higher precedence than a="b" on the same element
                    boundPropsByName.set(boundProp.name, boundProp);
                }
            });
            collection_1.StringMapWrapper.forEach(directiveProperties, (elProp, dirProp) => {
                var /** @type {?} */ boundProp = boundPropsByName.get(elProp);
                // Bindings are optional, so this binding only needs to be set up if an expression is given.
                if (lang_1.isPresent(boundProp)) {
                    targetBoundDirectiveProps.push(new template_ast_1.BoundDirectivePropertyAst(dirProp, boundProp.name, boundProp.expression, boundProp.sourceSpan));
                }
            });
        }
    }
    /**
     * @param {?} elementName
     * @param {?} props
     * @param {?} directives
     * @return {?}
     */
    _createElementPropertyAsts(elementName, props, directives) {
        var /** @type {?} */ boundElementProps = [];
        var /** @type {?} */ boundDirectivePropsIndex = new Map();
        directives.forEach((directive) => {
            directive.inputs.forEach((prop) => {
                boundDirectivePropsIndex.set(prop.templateName, prop);
            });
        });
        props.forEach((prop) => {
            if (!prop.isLiteral && lang_1.isBlank(boundDirectivePropsIndex.get(prop.name))) {
                boundElementProps.push(this._createElementPropertyAst(elementName, prop.name, prop.expression, prop.sourceSpan));
            }
        });
        return boundElementProps;
    }
    /**
     * @param {?} elementName
     * @param {?} name
     * @param {?} ast
     * @param {?} sourceSpan
     * @return {?}
     */
    _createElementPropertyAst(elementName, name, ast, sourceSpan) {
        var /** @type {?} */ unit = null;
        var /** @type {?} */ bindingType;
        var /** @type {?} */ boundPropertyName;
        var /** @type {?} */ parts = name.split(PROPERTY_PARTS_SEPARATOR);
        let /** @type {?} */ securityContext;
        if (parts.length === 1) {
            boundPropertyName = this._schemaRegistry.getMappedPropName(parts[0]);
            securityContext = this._schemaRegistry.securityContext(elementName, boundPropertyName);
            bindingType = template_ast_1.PropertyBindingType.Property;
            if (!this._schemaRegistry.hasProperty(elementName, boundPropertyName)) {
                this._reportError(`Can't bind to '${boundPropertyName}' since it isn't a known native property`, sourceSpan);
            }
        }
        else {
            if (parts[0] == ATTRIBUTE_PREFIX) {
                boundPropertyName = parts[1];
                if (boundPropertyName.toLowerCase().startsWith('on')) {
                    this._reportError(`Binding to event attribute '${boundPropertyName}' is disallowed ` +
                        `for security reasons, please use (${boundPropertyName.slice(2)})=...`, sourceSpan);
                }
                // NB: For security purposes, use the mapped property name, not the attribute name.
                securityContext = this._schemaRegistry.securityContext(elementName, this._schemaRegistry.getMappedPropName(boundPropertyName));
                let /** @type {?} */ nsSeparatorIdx = boundPropertyName.indexOf(':');
                if (nsSeparatorIdx > -1) {
                    let /** @type {?} */ ns = boundPropertyName.substring(0, nsSeparatorIdx);
                    let /** @type {?} */ name = boundPropertyName.substring(nsSeparatorIdx + 1);
                    boundPropertyName = html_tags_1.mergeNsAndName(ns, name);
                }
                bindingType = template_ast_1.PropertyBindingType.Attribute;
            }
            else if (parts[0] == CLASS_PREFIX) {
                boundPropertyName = parts[1];
                bindingType = template_ast_1.PropertyBindingType.Class;
                securityContext = core_private_1.SecurityContext.NONE;
            }
            else if (parts[0] == STYLE_PREFIX) {
                unit = parts.length > 2 ? parts[2] : null;
                boundPropertyName = parts[1];
                bindingType = template_ast_1.PropertyBindingType.Style;
                securityContext = core_private_1.SecurityContext.STYLE;
            }
            else {
                this._reportError(`Invalid property name '${name}'`, sourceSpan);
                bindingType = null;
                securityContext = null;
            }
        }
        return new template_ast_1.BoundElementPropertyAst(boundPropertyName, bindingType, securityContext, ast, unit, sourceSpan);
    }
    /**
     * @param {?} directives
     * @return {?}
     */
    _findComponentDirectiveNames(directives) {
        var /** @type {?} */ componentTypeNames = [];
        directives.forEach(directive => {
            var /** @type {?} */ typeName = directive.directive.type.name;
            if (directive.directive.isComponent) {
                componentTypeNames.push(typeName);
            }
        });
        return componentTypeNames;
    }
    /**
     * @param {?} directives
     * @param {?} sourceSpan
     * @return {?}
     */
    _assertOnlyOneComponent(directives, sourceSpan) {
        var /** @type {?} */ componentTypeNames = this._findComponentDirectiveNames(directives);
        if (componentTypeNames.length > 1) {
            this._reportError(`More than one component: ${componentTypeNames.join(',')}`, sourceSpan);
        }
    }
    /**
     * @param {?} directives
     * @param {?} elementProps
     * @param {?} sourceSpan
     * @return {?}
     */
    _assertNoComponentsNorElementBindingsOnTemplate(directives, elementProps, sourceSpan) {
        var /** @type {?} */ componentTypeNames = this._findComponentDirectiveNames(directives);
        if (componentTypeNames.length > 0) {
            this._reportError(`Components on an embedded template: ${componentTypeNames.join(',')}`, sourceSpan);
        }
        elementProps.forEach(prop => {
            this._reportError(`Property binding ${prop.name} not used by any directive on an embedded template`, sourceSpan);
        });
    }
    /**
     * @param {?} directives
     * @param {?} events
     * @return {?}
     */
    _assertAllEventsPublishedByDirectives(directives, events) {
        var /** @type {?} */ allDirectiveEvents = new Set();
        directives.forEach(directive => {
            collection_1.StringMapWrapper.forEach(directive.directive.outputs, (eventName, _) => { allDirectiveEvents.add(eventName); });
        });
        events.forEach(event => {
            if (lang_1.isPresent(event.target) || !collection_1.SetWrapper.has(allDirectiveEvents, event.name)) {
                this._reportError(`Event binding ${event.fullName} not emitted by any directive on an embedded template`, event.sourceSpan);
            }
        });
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TemplateParseVisitor.prototype.selectorMatcher;
        /** @type {?} */
        TemplateParseVisitor.prototype.errors;
        /** @type {?} */
        TemplateParseVisitor.prototype.directivesIndex;
        /** @type {?} */
        TemplateParseVisitor.prototype.ngContentCount;
        /** @type {?} */
        TemplateParseVisitor.prototype.pipesByName;
        /** @type {?} */
        TemplateParseVisitor.prototype.providerViewContext;
        /** @type {?} */
        TemplateParseVisitor.prototype._exprParser;
        /** @type {?} */
        TemplateParseVisitor.prototype._schemaRegistry;
    }
}
class NonBindableVisitor {
    /**
     * @param {?} ast
     * @param {?} parent
     * @return {?}
     */
    visitElement(ast, parent) {
        var /** @type {?} */ preparsedElement = template_preparser_1.preparseElement(ast);
        if (preparsedElement.type === template_preparser_1.PreparsedElementType.SCRIPT ||
            preparsedElement.type === template_preparser_1.PreparsedElementType.STYLE ||
            preparsedElement.type === template_preparser_1.PreparsedElementType.STYLESHEET) {
            // Skipping <script> for security reasons
            // Skipping <style> and stylesheets as we already processed them
            // in the StyleCompiler
            return null;
        }
        var /** @type {?} */ attrNameAndValues = ast.attrs.map(attrAst => [attrAst.name, attrAst.value]);
        var /** @type {?} */ selector = createElementCssSelector(ast.name, attrNameAndValues);
        var /** @type {?} */ ngContentIndex = parent.findNgContentIndex(selector);
        var /** @type {?} */ children = html_ast_1.htmlVisitAll(this, ast.children, EMPTY_ELEMENT_CONTEXT);
        return new template_ast_1.ElementAst(ast.name, html_ast_1.htmlVisitAll(this, ast.attrs), [], [], [], [], [], false, children, ngContentIndex, ast.sourceSpan);
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
    visitAttr(ast, context) {
        return new template_ast_1.AttrAst(ast.name, ast.value, ast.sourceSpan);
    }
    /**
     * @param {?} ast
     * @param {?} parent
     * @return {?}
     */
    visitText(ast, parent) {
        var /** @type {?} */ ngContentIndex = parent.findNgContentIndex(TEXT_CSS_SELECTOR);
        return new template_ast_1.TextAst(ast.value, ngContentIndex, ast.sourceSpan);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitExpansion(ast, context) { return ast; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitExpansionCase(ast, context) { return ast; }
}
class BoundElementOrDirectiveProperty {
    /**
     * @param {?} name
     * @param {?} expression
     * @param {?} isLiteral
     * @param {?} sourceSpan
     */
    constructor(name, expression, isLiteral, sourceSpan) {
        this.name = name;
        this.expression = expression;
        this.isLiteral = isLiteral;
        this.sourceSpan = sourceSpan;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BoundElementOrDirectiveProperty.prototype.name;
        /** @type {?} */
        BoundElementOrDirectiveProperty.prototype.expression;
        /** @type {?} */
        BoundElementOrDirectiveProperty.prototype.isLiteral;
        /** @type {?} */
        BoundElementOrDirectiveProperty.prototype.sourceSpan;
    }
}
class ElementOrDirectiveRef {
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
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ElementOrDirectiveRef.prototype.name;
        /** @type {?} */
        ElementOrDirectiveRef.prototype.value;
        /** @type {?} */
        ElementOrDirectiveRef.prototype.sourceSpan;
    }
}
/**
 * @param {?} classAttrValue
 * @return {?}
 */
function splitClasses(classAttrValue) {
    return lang_1.StringWrapper.split(classAttrValue.trim(), /\s+/g);
}
exports.splitClasses = splitClasses;
class ElementContext {
    /**
     * @param {?} isTemplateElement
     * @param {?} _ngContentIndexMatcher
     * @param {?} _wildcardNgContentIndex
     * @param {?} providerContext
     */
    constructor(isTemplateElement, _ngContentIndexMatcher, _wildcardNgContentIndex, providerContext) {
        this.isTemplateElement = isTemplateElement;
        this._ngContentIndexMatcher = _ngContentIndexMatcher;
        this._wildcardNgContentIndex = _wildcardNgContentIndex;
        this.providerContext = providerContext;
    }
    /**
     * @param {?} isTemplateElement
     * @param {?} directives
     * @param {?} providerContext
     * @return {?}
     */
    static create(isTemplateElement, directives, providerContext) {
        var /** @type {?} */ matcher = new selector_1.SelectorMatcher();
        var /** @type {?} */ wildcardNgContentIndex = null;
        var /** @type {?} */ component = directives.find(directive => directive.directive.isComponent);
        if (lang_1.isPresent(component)) {
            var /** @type {?} */ ngContentSelectors = component.directive.template.ngContentSelectors;
            for (var /** @type {?} */ i = 0; i < ngContentSelectors.length; i++) {
                var /** @type {?} */ selector = ngContentSelectors[i];
                if (lang_1.StringWrapper.equals(selector, '*')) {
                    wildcardNgContentIndex = i;
                }
                else {
                    matcher.addSelectables(selector_1.CssSelector.parse(ngContentSelectors[i]), i);
                }
            }
        }
        return new ElementContext(isTemplateElement, matcher, wildcardNgContentIndex, providerContext);
    }
    /**
     * @param {?} selector
     * @return {?}
     */
    findNgContentIndex(selector) {
        var /** @type {?} */ ngContentIndices = [];
        this._ngContentIndexMatcher.match(selector, (selector, ngContentIndex) => { ngContentIndices.push(ngContentIndex); });
        collection_1.ListWrapper.sort(ngContentIndices);
        if (lang_1.isPresent(this._wildcardNgContentIndex)) {
            ngContentIndices.push(this._wildcardNgContentIndex);
        }
        return ngContentIndices.length > 0 ? ngContentIndices[0] : null;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ElementContext.prototype.isTemplateElement;
        /** @type {?} */
        ElementContext.prototype._ngContentIndexMatcher;
        /** @type {?} */
        ElementContext.prototype._wildcardNgContentIndex;
        /** @type {?} */
        ElementContext.prototype.providerContext;
    }
}
/**
 * @param {?} elementName
 * @param {?} matchableAttrs
 * @return {?}
 */
function createElementCssSelector(elementName, matchableAttrs) {
    var /** @type {?} */ cssSelector = new selector_1.CssSelector();
    let /** @type {?} */ elNameNoNs = html_tags_1.splitNsName(elementName)[1];
    cssSelector.setElement(elNameNoNs);
    for (var /** @type {?} */ i = 0; i < matchableAttrs.length; i++) {
        let /** @type {?} */ attrName = matchableAttrs[i][0];
        let /** @type {?} */ attrNameNoNs = html_tags_1.splitNsName(attrName)[1];
        let /** @type {?} */ attrValue = matchableAttrs[i][1];
        cssSelector.addAttribute(attrNameNoNs, attrValue);
        if (attrName.toLowerCase() == CLASS_ATTR) {
            var /** @type {?} */ classes = splitClasses(attrValue);
            classes.forEach(className => cssSelector.addClassName(className));
        }
    }
    return cssSelector;
}
var /** @type {?} */ EMPTY_ELEMENT_CONTEXT = new ElementContext(true, new selector_1.SelectorMatcher(), null, null);
var /** @type {?} */ NON_BINDABLE_VISITOR = new NonBindableVisitor();
class PipeCollector extends ast_1.RecursiveAstVisitor {
    constructor(...args) {
        super(...args);
        this.pipes = new Set();
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitPipe(ast, context) {
        this.pipes.add(ast.name);
        ast.exp.visit(this);
        this.visitAll(ast.args, context);
        return null;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        PipeCollector.prototype.pipes;
    }
}
exports.PipeCollector = PipeCollector;
/**
 * @param {?} items
 * @return {?}
 */
function removeDuplicates(items) {
    let /** @type {?} */ res = [];
    items.forEach(item => {
        let /** @type {?} */ hasMatch = res.filter(r => r.type.name == item.type.name && r.type.moduleUrl == item.type.moduleUrl &&
            r.type.runtime == item.type.runtime)
            .length > 0;
        if (!hasMatch) {
            res.push(item);
        }
    });
    return res;
}
//# sourceMappingURL=template_parser.js.map