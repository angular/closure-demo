goog.module('_angular$compiler$testing$view__resolver__mock');
var core_1 = goog.require('_angular$core');
var index_1 = goog.require('_angular$compiler');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var core_2 = core_1;
class MockViewResolver extends index_1.ViewResolver {
    /**
     */
    constructor() {
        super();
        /** @internal */
        this._views = new collection_1.Map();
        /** @internal */
        this._inlineTemplates = new collection_1.Map();
        /** @internal */
        this._viewCache = new collection_1.Map();
        /** @internal */
        this._directiveOverrides = new collection_1.Map();
    }
    /**
     *  Overrides the {@link ViewMetadata} for a component.
     * @param {?} component
     * @param {?} view
     * @return {?}
     */
    setView(component, view) {
        this._checkOverrideable(component);
        this._views.set(component, view);
    }
    /**
     *  Overrides the inline template for a component - other configuration remains unchanged.
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    setInlineTemplate(component, template) {
        this._checkOverrideable(component);
        this._inlineTemplates.set(component, template);
    }
    /**
     *  Overrides a directive from the component {@link ViewMetadata}.
     * @param {?} component
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    overrideViewDirective(component, from, to) {
        this._checkOverrideable(component);
        var /** @type {?} */ overrides = this._directiveOverrides.get(component);
        if (lang_1.isBlank(overrides)) {
            overrides = new collection_1.Map();
            this._directiveOverrides.set(component, overrides);
        }
        overrides.set(from, to);
    }
    /**
     *  Returns the {@link ViewMetadata} for a component: - Set the {@link ViewMetadata} to the overridden view when it exists or fallback to the default `ViewResolver`, see `setView`. - Override the directives, see `overrideViewDirective`. - Override the @View definition, see `setInlineTemplate`.
     * @param {?} component
     * @return {?}
     */
    resolve(component) {
        var /** @type {?} */ view = this._viewCache.get(component);
        if (lang_1.isPresent(view))
            return view;
        view = this._views.get(component);
        if (lang_1.isBlank(view)) {
            view = super.resolve(component);
        }
        var /** @type {?} */ directives = [];
        var /** @type {?} */ overrides = this._directiveOverrides.get(component);
        if (lang_1.isPresent(overrides) && lang_1.isPresent(view.directives)) {
            flattenArray(view.directives, directives);
            overrides.forEach((to, from) => {
                var /** @type {?} */ srcIndex = directives.indexOf(from);
                if (srcIndex == -1) {
                    throw new core_1.BaseException(`Overriden directive ${lang_1.stringify(from)} not found in the template of ${lang_1.stringify(component)}`);
                }
                directives[srcIndex] = to;
            });
            view = new core_1.ViewMetadata({ template: view.template, templateUrl: view.templateUrl, directives: directives });
        }
        var /** @type {?} */ inlineTemplate = this._inlineTemplates.get(component);
        if (lang_1.isPresent(inlineTemplate)) {
            view = new core_1.ViewMetadata({ template: inlineTemplate, templateUrl: null, directives: view.directives });
        }
        this._viewCache.set(component, view);
        return view;
    }
    /**
     * @internal undefined * Once a component has been compiled, the AppProtoView is stored in the compiler cache. * Then it should not be possible to override the component configuration after the component has been compiled.
     * @param {?} component
     * @return {?}
     */
    _checkOverrideable(component) {
        var /** @type {?} */ cached = this._viewCache.get(component);
        if (lang_1.isPresent(cached)) {
            throw new core_1.BaseException(`The component ${lang_1.stringify(component)} has already been compiled, its configuration can not be changed`);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        MockViewResolver.prototype._views;
        /** @internal
        @type {?} */
        MockViewResolver.prototype._inlineTemplates;
        /** @internal
        @type {?} */
        MockViewResolver.prototype._viewCache;
        /** @internal
        @type {?} */
        MockViewResolver.prototype._directiveOverrides;
    }
}
/** @nocollapse */ MockViewResolver.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ MockViewResolver.ctorParameters = [];
exports.MockViewResolver = MockViewResolver;
/**
 * @param {?} tree
 * @param {?} out
 * @return {?}
 */
function flattenArray(tree, out) {
    for (var /** @type {?} */ i = 0; i < tree.length; i++) {
        var /** @type {?} */ item = core_2.resolveForwardRef(tree[i]);
        if (lang_1.isArray(item)) {
            flattenArray(item, out);
        }
        else {
            out.push(item);
        }
    }
}
//# sourceMappingURL=view_resolver_mock.js.map