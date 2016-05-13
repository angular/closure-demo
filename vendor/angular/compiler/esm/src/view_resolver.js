goog.module('_angular$compiler$src$view__resolver');
var core_1 = goog.require('_angular$core');
var core_private_1 = goog.require('_angular$compiler$core__private');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
class ViewResolver {
    /**
     * @param {?=} _reflector
     */
    constructor(_reflector) {
        /** @internal */
        this._cache = new collection_1.Map();
        if (lang_1.isPresent(_reflector)) {
            this._reflector = _reflector;
        }
        else {
            this._reflector = core_1.reflector;
        }
    }
    /**
     * @param {?} component
     * @return {?}
     */
    resolve(component) {
        var /** @type {?} */ view = this._cache.get(component);
        if (lang_1.isBlank(view)) {
            view = this._resolve(component);
            this._cache.set(component, view);
        }
        return view;
    }
    /**
     * @internal
     * @param {?} component
     * @return {?}
     */
    _resolve(component) {
        var /** @type {?} */ compMeta;
        var /** @type {?} */ viewMeta;
        this._reflector.annotations(component).forEach(m => {
            if (m instanceof core_1.ViewMetadata) {
                viewMeta = m;
            }
            if (m instanceof core_1.ComponentMetadata) {
                compMeta = m;
            }
        });
        if (lang_1.isPresent(compMeta)) {
            if (lang_1.isBlank(compMeta.template) && lang_1.isBlank(compMeta.templateUrl) && lang_1.isBlank(viewMeta)) {
                throw new exceptions_1.BaseException(`Component '${lang_1.stringify(component)}' must have either 'template' or 'templateUrl' set.`);
            }
            else if (lang_1.isPresent(compMeta.template) && lang_1.isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("template", component);
            }
            else if (lang_1.isPresent(compMeta.templateUrl) && lang_1.isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("templateUrl", component);
            }
            else if (lang_1.isPresent(compMeta.directives) && lang_1.isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("directives", component);
            }
            else if (lang_1.isPresent(compMeta.pipes) && lang_1.isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("pipes", component);
            }
            else if (lang_1.isPresent(compMeta.encapsulation) && lang_1.isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("encapsulation", component);
            }
            else if (lang_1.isPresent(compMeta.styles) && lang_1.isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("styles", component);
            }
            else if (lang_1.isPresent(compMeta.styleUrls) && lang_1.isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("styleUrls", component);
            }
            else if (lang_1.isPresent(viewMeta)) {
                return viewMeta;
            }
            else {
                return new core_1.ViewMetadata({
                    templateUrl: compMeta.templateUrl,
                    template: compMeta.template,
                    directives: compMeta.directives,
                    pipes: compMeta.pipes,
                    encapsulation: compMeta.encapsulation,
                    styles: compMeta.styles,
                    styleUrls: compMeta.styleUrls
                });
            }
        }
        else {
            if (lang_1.isBlank(viewMeta)) {
                throw new exceptions_1.BaseException(`Could not compile '${lang_1.stringify(component)}' because it is not a component.`);
            }
            else {
                return viewMeta;
            }
        }
        return null;
    }
    /**
     * @internal
     * @param {?} propertyName
     * @param {?} component
     * @return {?}
     */
    _throwMixingViewAndComponent(propertyName, component) {
        throw new exceptions_1.BaseException(`Component '${lang_1.stringify(component)}' cannot have both '${propertyName}' and '@View' set at the same time"`);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ViewResolver.prototype._reflector;
        /** @internal
        @type {?} */
        ViewResolver.prototype._cache;
    }
}
/** @nocollapse */ ViewResolver.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ ViewResolver.ctorParameters = [
    { type: core_private_1.ReflectorReader, },
];
exports.ViewResolver = ViewResolver;
//# sourceMappingURL=view_resolver.js.map