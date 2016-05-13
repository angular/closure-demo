goog.module('_angular$compiler$src$template__ast');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
/**
 * A segment of text within the template.
 */
class TextAst {
    /**
     * @param {?} value
     * @param {?} ngContentIndex
     * @param {?} sourceSpan
     */
    constructor(value, ngContentIndex, sourceSpan) {
        this.value = value;
        this.ngContentIndex = ngContentIndex;
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
        TextAst.prototype.value;
        /** @type {?} */
        TextAst.prototype.ngContentIndex;
        /** @type {?} */
        TextAst.prototype.sourceSpan;
    }
}
exports.TextAst = TextAst;
/**
 * A bound expression within the text of a template.
 */
class BoundTextAst {
    /**
     * @param {?} value
     * @param {?} ngContentIndex
     * @param {?} sourceSpan
     */
    constructor(value, ngContentIndex, sourceSpan) {
        this.value = value;
        this.ngContentIndex = ngContentIndex;
        this.sourceSpan = sourceSpan;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visit(visitor, context) {
        return visitor.visitBoundText(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BoundTextAst.prototype.value;
        /** @type {?} */
        BoundTextAst.prototype.ngContentIndex;
        /** @type {?} */
        BoundTextAst.prototype.sourceSpan;
    }
}
exports.BoundTextAst = BoundTextAst;
/**
 * A plain attribute on an element.
 */
class AttrAst {
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
        AttrAst.prototype.name;
        /** @type {?} */
        AttrAst.prototype.value;
        /** @type {?} */
        AttrAst.prototype.sourceSpan;
    }
}
exports.AttrAst = AttrAst;
/**
 * A binding for an element property (e.g. `[property]="expression"`).
 */
class BoundElementPropertyAst {
    /**
     * @param {?} name
     * @param {?} type
     * @param {?} securityContext
     * @param {?} value
     * @param {?} unit
     * @param {?} sourceSpan
     */
    constructor(name, type, securityContext, value, unit, sourceSpan) {
        this.name = name;
        this.type = type;
        this.securityContext = securityContext;
        this.value = value;
        this.unit = unit;
        this.sourceSpan = sourceSpan;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visit(visitor, context) {
        return visitor.visitElementProperty(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BoundElementPropertyAst.prototype.name;
        /** @type {?} */
        BoundElementPropertyAst.prototype.type;
        /** @type {?} */
        BoundElementPropertyAst.prototype.securityContext;
        /** @type {?} */
        BoundElementPropertyAst.prototype.value;
        /** @type {?} */
        BoundElementPropertyAst.prototype.unit;
        /** @type {?} */
        BoundElementPropertyAst.prototype.sourceSpan;
    }
}
exports.BoundElementPropertyAst = BoundElementPropertyAst;
/**
 * A binding for an element event (e.g. `(event)="handler()"`).
 */
class BoundEventAst {
    /**
     * @param {?} name
     * @param {?} target
     * @param {?} handler
     * @param {?} sourceSpan
     */
    constructor(name, target, handler, sourceSpan) {
        this.name = name;
        this.target = target;
        this.handler = handler;
        this.sourceSpan = sourceSpan;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visit(visitor, context) {
        return visitor.visitEvent(this, context);
    }
    get fullName() {
        if (lang_1.isPresent(this.target)) {
            return `${this.target}:${this.name}`;
        }
        else {
            return this.name;
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BoundEventAst.prototype.name;
        /** @type {?} */
        BoundEventAst.prototype.target;
        /** @type {?} */
        BoundEventAst.prototype.handler;
        /** @type {?} */
        BoundEventAst.prototype.sourceSpan;
    }
}
exports.BoundEventAst = BoundEventAst;
/**
 * A reference declaration on an element (e.g. `let someName="expression"`).
 */
class ReferenceAst {
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
    visit(visitor, context) {
        return visitor.visitReference(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ReferenceAst.prototype.name;
        /** @type {?} */
        ReferenceAst.prototype.value;
        /** @type {?} */
        ReferenceAst.prototype.sourceSpan;
    }
}
exports.ReferenceAst = ReferenceAst;
/**
 * A variable declaration on a <template> (e.g. `var-someName="someLocalName"`).
 */
class VariableAst {
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
    visit(visitor, context) {
        return visitor.visitVariable(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        VariableAst.prototype.name;
        /** @type {?} */
        VariableAst.prototype.value;
        /** @type {?} */
        VariableAst.prototype.sourceSpan;
    }
}
exports.VariableAst = VariableAst;
/**
 * An element declaration in a template.
 */
class ElementAst {
    /**
     * @param {?} name
     * @param {?} attrs
     * @param {?} inputs
     * @param {?} outputs
     * @param {?} references
     * @param {?} directives
     * @param {?} providers
     * @param {?} hasViewContainer
     * @param {?} children
     * @param {?} ngContentIndex
     * @param {?} sourceSpan
     */
    constructor(name, attrs, inputs, outputs, references, directives, providers, hasViewContainer, children, ngContentIndex, sourceSpan) {
        this.name = name;
        this.attrs = attrs;
        this.inputs = inputs;
        this.outputs = outputs;
        this.references = references;
        this.directives = directives;
        this.providers = providers;
        this.hasViewContainer = hasViewContainer;
        this.children = children;
        this.ngContentIndex = ngContentIndex;
        this.sourceSpan = sourceSpan;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visit(visitor, context) {
        return visitor.visitElement(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ElementAst.prototype.name;
        /** @type {?} */
        ElementAst.prototype.attrs;
        /** @type {?} */
        ElementAst.prototype.inputs;
        /** @type {?} */
        ElementAst.prototype.outputs;
        /** @type {?} */
        ElementAst.prototype.references;
        /** @type {?} */
        ElementAst.prototype.directives;
        /** @type {?} */
        ElementAst.prototype.providers;
        /** @type {?} */
        ElementAst.prototype.hasViewContainer;
        /** @type {?} */
        ElementAst.prototype.children;
        /** @type {?} */
        ElementAst.prototype.ngContentIndex;
        /** @type {?} */
        ElementAst.prototype.sourceSpan;
    }
}
exports.ElementAst = ElementAst;
/**
 * A `<template>` element included in an Angular template.
 */
class EmbeddedTemplateAst {
    /**
     * @param {?} attrs
     * @param {?} outputs
     * @param {?} references
     * @param {?} variables
     * @param {?} directives
     * @param {?} providers
     * @param {?} hasViewContainer
     * @param {?} children
     * @param {?} ngContentIndex
     * @param {?} sourceSpan
     */
    constructor(attrs, outputs, references, variables, directives, providers, hasViewContainer, children, ngContentIndex, sourceSpan) {
        this.attrs = attrs;
        this.outputs = outputs;
        this.references = references;
        this.variables = variables;
        this.directives = directives;
        this.providers = providers;
        this.hasViewContainer = hasViewContainer;
        this.children = children;
        this.ngContentIndex = ngContentIndex;
        this.sourceSpan = sourceSpan;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visit(visitor, context) {
        return visitor.visitEmbeddedTemplate(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        EmbeddedTemplateAst.prototype.attrs;
        /** @type {?} */
        EmbeddedTemplateAst.prototype.outputs;
        /** @type {?} */
        EmbeddedTemplateAst.prototype.references;
        /** @type {?} */
        EmbeddedTemplateAst.prototype.variables;
        /** @type {?} */
        EmbeddedTemplateAst.prototype.directives;
        /** @type {?} */
        EmbeddedTemplateAst.prototype.providers;
        /** @type {?} */
        EmbeddedTemplateAst.prototype.hasViewContainer;
        /** @type {?} */
        EmbeddedTemplateAst.prototype.children;
        /** @type {?} */
        EmbeddedTemplateAst.prototype.ngContentIndex;
        /** @type {?} */
        EmbeddedTemplateAst.prototype.sourceSpan;
    }
}
exports.EmbeddedTemplateAst = EmbeddedTemplateAst;
/**
 * A directive property with a bound value (e.g. `*ngIf="condition").
 */
class BoundDirectivePropertyAst {
    /**
     * @param {?} directiveName
     * @param {?} templateName
     * @param {?} value
     * @param {?} sourceSpan
     */
    constructor(directiveName, templateName, value, sourceSpan) {
        this.directiveName = directiveName;
        this.templateName = templateName;
        this.value = value;
        this.sourceSpan = sourceSpan;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visit(visitor, context) {
        return visitor.visitDirectiveProperty(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BoundDirectivePropertyAst.prototype.directiveName;
        /** @type {?} */
        BoundDirectivePropertyAst.prototype.templateName;
        /** @type {?} */
        BoundDirectivePropertyAst.prototype.value;
        /** @type {?} */
        BoundDirectivePropertyAst.prototype.sourceSpan;
    }
}
exports.BoundDirectivePropertyAst = BoundDirectivePropertyAst;
/**
 * A directive declared on an element.
 */
class DirectiveAst {
    /**
     * @param {?} directive
     * @param {?} inputs
     * @param {?} hostProperties
     * @param {?} hostEvents
     * @param {?} sourceSpan
     */
    constructor(directive, inputs, hostProperties, hostEvents, sourceSpan) {
        this.directive = directive;
        this.inputs = inputs;
        this.hostProperties = hostProperties;
        this.hostEvents = hostEvents;
        this.sourceSpan = sourceSpan;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visit(visitor, context) {
        return visitor.visitDirective(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DirectiveAst.prototype.directive;
        /** @type {?} */
        DirectiveAst.prototype.inputs;
        /** @type {?} */
        DirectiveAst.prototype.hostProperties;
        /** @type {?} */
        DirectiveAst.prototype.hostEvents;
        /** @type {?} */
        DirectiveAst.prototype.sourceSpan;
    }
}
exports.DirectiveAst = DirectiveAst;
/**
 * A provider declared on an element
 */
class ProviderAst {
    /**
     * @param {?} token
     * @param {?} multiProvider
     * @param {?} eager
     * @param {?} providers
     * @param {?} providerType
     * @param {?} sourceSpan
     */
    constructor(token, multiProvider, eager, providers, providerType, sourceSpan) {
        this.token = token;
        this.multiProvider = multiProvider;
        this.eager = eager;
        this.providers = providers;
        this.providerType = providerType;
        this.sourceSpan = sourceSpan;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visit(visitor, context) {
        // No visit method in the visitor for now...
        return null;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ProviderAst.prototype.token;
        /** @type {?} */
        ProviderAst.prototype.multiProvider;
        /** @type {?} */
        ProviderAst.prototype.eager;
        /** @type {?} */
        ProviderAst.prototype.providers;
        /** @type {?} */
        ProviderAst.prototype.providerType;
        /** @type {?} */
        ProviderAst.prototype.sourceSpan;
    }
}
exports.ProviderAst = ProviderAst;
exports.ProviderAstType = {};
exports.ProviderAstType.PublicService = 0;
exports.ProviderAstType.PrivateService = 1;
exports.ProviderAstType.Component = 2;
exports.ProviderAstType.Directive = 3;
exports.ProviderAstType.Builtin = 4;
exports.ProviderAstType[exports.ProviderAstType.PublicService] = "PublicService";
exports.ProviderAstType[exports.ProviderAstType.PrivateService] = "PrivateService";
exports.ProviderAstType[exports.ProviderAstType.Component] = "Component";
exports.ProviderAstType[exports.ProviderAstType.Directive] = "Directive";
exports.ProviderAstType[exports.ProviderAstType.Builtin] = "Builtin";
/**
 * Position where content is to be projected (instance of `<ng-content>` in a template).
 */
class NgContentAst {
    /**
     * @param {?} index
     * @param {?} ngContentIndex
     * @param {?} sourceSpan
     */
    constructor(index, ngContentIndex, sourceSpan) {
        this.index = index;
        this.ngContentIndex = ngContentIndex;
        this.sourceSpan = sourceSpan;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visit(visitor, context) {
        return visitor.visitNgContent(this, context);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        NgContentAst.prototype.index;
        /** @type {?} */
        NgContentAst.prototype.ngContentIndex;
        /** @type {?} */
        NgContentAst.prototype.sourceSpan;
    }
}
exports.NgContentAst = NgContentAst;
exports.PropertyBindingType = {};
exports.PropertyBindingType.Property = 0;
exports.PropertyBindingType.Attribute = 1;
exports.PropertyBindingType.Class = 2;
exports.PropertyBindingType.Style = 3;
exports.PropertyBindingType[exports.PropertyBindingType.Property] = "Property";
exports.PropertyBindingType[exports.PropertyBindingType.Attribute] = "Attribute";
exports.PropertyBindingType[exports.PropertyBindingType.Class] = "Class";
exports.PropertyBindingType[exports.PropertyBindingType.Style] = "Style";
/**
 *  Visit every node in a list of {@link TemplateAst}s with the given {@link TemplateAstVisitor}.
 * @param {?} visitor
 * @param {?} asts
 * @param {?=} context
 * @return {?}
 */
function templateVisitAll(visitor, asts, context = null) {
    var /** @type {?} */ result = [];
    asts.forEach(ast => {
        var /** @type {?} */ astResult = ast.visit(visitor, context);
        if (lang_1.isPresent(astResult)) {
            result.push(astResult);
        }
    });
    return result;
}
exports.templateVisitAll = templateVisitAll;
//# sourceMappingURL=template_ast.js.map