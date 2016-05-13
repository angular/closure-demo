goog.module('_angular$core$src$metadata$view');
exports.ViewEncapsulation = {};
exports.ViewEncapsulation.Emulated = 0;
exports.ViewEncapsulation.Native = 1;
exports.ViewEncapsulation.None = 2;
exports.ViewEncapsulation[exports.ViewEncapsulation.Emulated] = "Emulated";
exports.ViewEncapsulation[exports.ViewEncapsulation.Native] = "Native";
exports.ViewEncapsulation[exports.ViewEncapsulation.None] = "None";
exports.VIEW_ENCAPSULATION_VALUES = [exports.ViewEncapsulation.Emulated, exports.ViewEncapsulation.Native, exports.ViewEncapsulation.None];
/**
 * Metadata properties available for configuring Views.
 *
 * Each Angular component requires a single `@Component` and at least one `@View` annotation. The
 * `@View` annotation specifies the HTML template to use, and lists the directives that are active
 * within the template.
 *
 * When a component is instantiated, the template is loaded into the component's shadow root, and
 * the expressions and statements in the template are evaluated against the component.
 *
 * For details on the `@Component` annotation, see {@link ComponentMetadata}.
 *
 * ### Example
 *
 * ```
 * @Component({
 *   selector: 'greet',
 *   template: 'Hello {{name}}!',
 *   directives: [GreetUser, Bold]
 * })
 * class Greet {
 *   name: string;
 *
 *   constructor() {
 *     this.name = 'World';
 *   }
 * }
 * ```
 * @ts2dart_const
 */
class ViewMetadata {
    /**
     * @param {?=} __0
     */
    constructor({ templateUrl, template, directives, pipes, encapsulation, styles, styleUrls } = {}) {
        this.templateUrl = templateUrl;
        this.template = template;
        this.styleUrls = styleUrls;
        this.styles = styles;
        this.directives = directives;
        this.pipes = pipes;
        this.encapsulation = encapsulation;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** Specifies a template URL for an Angular component. * NOTE: Only one of `templateUrl` or `template` can be defined per View. * <!-- TODO: what's the url relative to? -->
        @type {?} */
        ViewMetadata.prototype.templateUrl;
        /** Specifies an inline template for an Angular component. * NOTE: Only one of `templateUrl` or `template` can be defined per View.
        @type {?} */
        ViewMetadata.prototype.template;
        /** Specifies stylesheet URLs for an Angular component. * <!-- TODO: what's the url relative to? -->
        @type {?} */
        ViewMetadata.prototype.styleUrls;
        /** Specifies an inline stylesheet for an Angular component.
        @type {?} */
        ViewMetadata.prototype.styles;
        /** Specifies a list of directives that can be used within a template. * Directives must be listed explicitly to provide proper component encapsulation. * ### Example * ```javascript
       @Component({
        @type {?} */
        ViewMetadata.prototype.directives;
        /** @type {?} */
        ViewMetadata.prototype.pipes;
        /** Specify how the template and the styles should be encapsulated. The default is {@link ViewEncapsulation#Emulated `ViewEncapsulation.Emulated`} if the view has styles, otherwise {@link ViewEncapsulation#None `ViewEncapsulation.None`}.
        @type {?} */
        ViewMetadata.prototype.encapsulation;
    }
}
exports.ViewMetadata = ViewMetadata;
//# sourceMappingURL=view.js.map