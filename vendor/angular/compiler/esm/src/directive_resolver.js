goog.module('_angular$compiler$src$directive__resolver');
var core_1 = goog.require('_angular$core');
var core_private_1 = goog.require('_angular$compiler$core__private');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
/**
 * @param {?} type
 * @return {?}
 */
function _isDirectiveMetadata(type) {
    return type instanceof core_1.DirectiveMetadata;
}
class DirectiveResolver {
    /**
     * @param {?=} _reflector
     */
    constructor(_reflector) {
        if (lang_1.isPresent(_reflector)) {
            this._reflector = _reflector;
        }
        else {
            this._reflector = core_1.reflector;
        }
    }
    /**
     *  Return {@link DirectiveMetadata} for a given `Type`.
     * @param {?} type
     * @return {?}
     */
    resolve(type) {
        var /** @type {?} */ typeMetadata = this._reflector.annotations(core_1.resolveForwardRef(type));
        if (lang_1.isPresent(typeMetadata)) {
            var /** @type {?} */ metadata = typeMetadata.find(_isDirectiveMetadata);
            if (lang_1.isPresent(metadata)) {
                var /** @type {?} */ propertyMetadata = this._reflector.propMetadata(type);
                return this._mergeWithPropertyMetadata(metadata, propertyMetadata, type);
            }
        }
        throw new exceptions_1.BaseException(`No Directive annotation found on ${lang_1.stringify(type)}`);
    }
    /**
     * @param {?} dm
     * @param {?} propertyMetadata
     * @param {?} directiveType
     * @return {?}
     */
    _mergeWithPropertyMetadata(dm, propertyMetadata, directiveType) {
        var /** @type {?} */ inputs = [];
        var /** @type {?} */ outputs = [];
        var /** @type {?} */ host = {};
        var /** @type {?} */ queries = {};
        collection_1.StringMapWrapper.forEach(propertyMetadata, (metadata, propName) => {
            metadata.forEach(a => {
                if (a instanceof core_1.InputMetadata) {
                    if (lang_1.isPresent(a.bindingPropertyName)) {
                        inputs.push(`${propName}: ${a.bindingPropertyName}`);
                    }
                    else {
                        inputs.push(propName);
                    }
                }
                if (a instanceof core_1.OutputMetadata) {
                    if (lang_1.isPresent(a.bindingPropertyName)) {
                        outputs.push(`${propName}: ${a.bindingPropertyName}`);
                    }
                    else {
                        outputs.push(propName);
                    }
                }
                if (a instanceof core_1.HostBindingMetadata) {
                    if (lang_1.isPresent(a.hostPropertyName)) {
                        host[`[${a.hostPropertyName}]`] = propName;
                    }
                    else {
                        host[`[${propName}]`] = propName;
                    }
                }
                if (a instanceof core_1.HostListenerMetadata) {
                    var /** @type {?} */ args = lang_1.isPresent(a.args) ? ((a.args)).join(', ') : '';
                    host[`(${a.eventName})`] = `${propName}(${args})`;
                }
                if (a instanceof core_1.ContentChildrenMetadata) {
                    queries[propName] = a;
                }
                if (a instanceof core_1.ViewChildrenMetadata) {
                    queries[propName] = a;
                }
                if (a instanceof core_1.ContentChildMetadata) {
                    queries[propName] = a;
                }
                if (a instanceof core_1.ViewChildMetadata) {
                    queries[propName] = a;
                }
            });
        });
        return this._merge(dm, inputs, outputs, host, queries, directiveType);
    }
    /**
     * @param {?} dm
     * @param {?} inputs
     * @param {?} outputs
     * @param {?} host
     * @param {?} queries
     * @param {?} directiveType
     * @return {?}
     */
    _merge(dm, inputs, outputs, host, queries, directiveType) {
        var /** @type {?} */ mergedInputs = lang_1.isPresent(dm.inputs) ? collection_1.ListWrapper.concat(dm.inputs, inputs) : inputs;
        var /** @type {?} */ mergedOutputs;
        if (lang_1.isPresent(dm.outputs)) {
            dm.outputs.forEach((propName) => {
                if (collection_1.ListWrapper.contains(outputs, propName)) {
                    throw new exceptions_1.BaseException(`Output event '${propName}' defined multiple times in '${lang_1.stringify(directiveType)}'`);
                }
            });
            mergedOutputs = collection_1.ListWrapper.concat(dm.outputs, outputs);
        }
        else {
            mergedOutputs = outputs;
        }
        var /** @type {?} */ mergedHost = lang_1.isPresent(dm.host) ? collection_1.StringMapWrapper.merge(dm.host, host) : host;
        var /** @type {?} */ mergedQueries = lang_1.isPresent(dm.queries) ? collection_1.StringMapWrapper.merge(dm.queries, queries) : queries;
        if (dm instanceof core_1.ComponentMetadata) {
            return new core_1.ComponentMetadata({
                selector: dm.selector,
                inputs: mergedInputs,
                outputs: mergedOutputs,
                host: mergedHost,
                exportAs: dm.exportAs,
                moduleId: dm.moduleId,
                queries: mergedQueries,
                changeDetection: dm.changeDetection,
                providers: dm.providers,
                viewProviders: dm.viewProviders
            });
        }
        else {
            return new core_1.DirectiveMetadata({
                selector: dm.selector,
                inputs: mergedInputs,
                outputs: mergedOutputs,
                host: mergedHost,
                exportAs: dm.exportAs,
                queries: mergedQueries,
                providers: dm.providers
            });
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DirectiveResolver.prototype._reflector;
    }
}
/** @nocollapse */ DirectiveResolver.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ DirectiveResolver.ctorParameters = [
    { type: core_private_1.ReflectorReader, },
];
exports.DirectiveResolver = DirectiveResolver;
exports.CODEGEN_DIRECTIVE_RESOLVER = new DirectiveResolver(core_1.reflector);
//# sourceMappingURL=directive_resolver.js.map