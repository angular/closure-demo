/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, Directive, HostBinding, HostListener, Injectable, Input, Output, Query, resolveForwardRef } from '@angular/core';
import { StringMapWrapper } from './facade/collection';
import { stringify } from './facade/lang';
import { ReflectorReader, reflector } from './private_import_core';
import { splitAtColon } from './util';
/*
 * Resolve a `Type` for {@link Directive}.
 *
 * This interface can be overridden by the application developer to create custom behavior.
 *
 * See {@link Compiler}
 */
export var DirectiveResolver = (function () {
    /**
     * @param {?=} _reflector
     */
    function DirectiveResolver(_reflector) {
        if (_reflector === void 0) { _reflector = reflector; }
        this._reflector = _reflector;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    DirectiveResolver.prototype.isDirective = function (type) {
        var /** @type {?} */ typeMetadata = this._reflector.annotations(resolveForwardRef(type));
        return typeMetadata && typeMetadata.some(isDirectiveMetadata);
    };
    /**
     *  Return {@link Directive} for a given `Type`.
     * @param {?} type
     * @param {?=} throwIfNotFound
     * @return {?}
     */
    DirectiveResolver.prototype.resolve = function (type, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        var /** @type {?} */ typeMetadata = this._reflector.annotations(resolveForwardRef(type));
        if (typeMetadata) {
            var /** @type {?} */ metadata = typeMetadata.find(isDirectiveMetadata);
            if (metadata) {
                var /** @type {?} */ propertyMetadata = this._reflector.propMetadata(type);
                return this._mergeWithPropertyMetadata(metadata, propertyMetadata, type);
            }
        }
        if (throwIfNotFound) {
            throw new Error("No Directive annotation found on " + stringify(type));
        }
        return null;
    };
    /**
     * @param {?} dm
     * @param {?} propertyMetadata
     * @param {?} directiveType
     * @return {?}
     */
    DirectiveResolver.prototype._mergeWithPropertyMetadata = function (dm, propertyMetadata, directiveType) {
        var /** @type {?} */ inputs = [];
        var /** @type {?} */ outputs = [];
        var /** @type {?} */ host = {};
        var /** @type {?} */ queries = {};
        Object.keys(propertyMetadata).forEach(function (propName) {
            propertyMetadata[propName].forEach(function (a) {
                if (a instanceof Input) {
                    if (a.bindingPropertyName) {
                        inputs.push(propName + ": " + a.bindingPropertyName);
                    }
                    else {
                        inputs.push(propName);
                    }
                }
                else if (a instanceof Output) {
                    var /** @type {?} */ output = a;
                    if (output.bindingPropertyName) {
                        outputs.push(propName + ": " + output.bindingPropertyName);
                    }
                    else {
                        outputs.push(propName);
                    }
                }
                else if (a instanceof HostBinding) {
                    var /** @type {?} */ hostBinding = a;
                    if (hostBinding.hostPropertyName) {
                        var /** @type {?} */ startWith = hostBinding.hostPropertyName[0];
                        if (startWith === '(') {
                            throw new Error("@HostBinding can not bind to events. Use @HostListener instead.");
                        }
                        else if (startWith === '[') {
                            throw new Error("@HostBinding parameter should be a property name, 'class.<name>', or 'attr.<name>'.");
                        }
                        host[("[" + hostBinding.hostPropertyName + "]")] = propName;
                    }
                    else {
                        host[("[" + propName + "]")] = propName;
                    }
                }
                else if (a instanceof HostListener) {
                    var /** @type {?} */ hostListener = a;
                    var /** @type {?} */ args = hostListener.args || [];
                    host[("(" + hostListener.eventName + ")")] = propName + "(" + args.join(',') + ")";
                }
                else if (a instanceof Query) {
                    queries[propName] = a;
                }
            });
        });
        return this._merge(dm, inputs, outputs, host, queries, directiveType);
    };
    /**
     * @param {?} def
     * @return {?}
     */
    DirectiveResolver.prototype._extractPublicName = function (def) { return splitAtColon(def, [null, def])[1].trim(); };
    /**
     * @param {?} directive
     * @param {?} inputs
     * @param {?} outputs
     * @param {?} host
     * @param {?} queries
     * @param {?} directiveType
     * @return {?}
     */
    DirectiveResolver.prototype._merge = function (directive, inputs, outputs, host, queries, directiveType) {
        var _this = this;
        var /** @type {?} */ mergedInputs = inputs;
        if (directive.inputs) {
            var /** @type {?} */ inputNames_1 = directive.inputs.map(function (def) { return _this._extractPublicName(def); });
            inputs.forEach(function (inputDef) {
                var /** @type {?} */ publicName = _this._extractPublicName(inputDef);
                if (inputNames_1.indexOf(publicName) > -1) {
                    throw new Error("Input '" + publicName + "' defined multiple times in '" + stringify(directiveType) + "'");
                }
            });
            mergedInputs.unshift.apply(mergedInputs, directive.inputs);
        }
        var /** @type {?} */ mergedOutputs = outputs;
        if (directive.outputs) {
            var /** @type {?} */ outputNames_1 = directive.outputs.map(function (def) { return _this._extractPublicName(def); });
            outputs.forEach(function (outputDef) {
                var /** @type {?} */ publicName = _this._extractPublicName(outputDef);
                if (outputNames_1.indexOf(publicName) > -1) {
                    throw new Error("Output event '" + publicName + "' defined multiple times in '" + stringify(directiveType) + "'");
                }
            });
            mergedOutputs.unshift.apply(mergedOutputs, directive.outputs);
        }
        var /** @type {?} */ mergedHost = directive.host ? StringMapWrapper.merge(directive.host, host) : host;
        var /** @type {?} */ mergedQueries = directive.queries ? StringMapWrapper.merge(directive.queries, queries) : queries;
        if (directive instanceof Component) {
            return new Component({
                selector: directive.selector,
                inputs: mergedInputs,
                outputs: mergedOutputs,
                host: mergedHost,
                exportAs: directive.exportAs,
                moduleId: directive.moduleId,
                queries: mergedQueries,
                changeDetection: directive.changeDetection,
                providers: directive.providers,
                viewProviders: directive.viewProviders,
                entryComponents: directive.entryComponents,
                template: directive.template,
                templateUrl: directive.templateUrl,
                styles: directive.styles,
                styleUrls: directive.styleUrls,
                encapsulation: directive.encapsulation,
                animations: directive.animations,
                interpolation: directive.interpolation
            });
        }
        else {
            return new Directive({
                selector: directive.selector,
                inputs: mergedInputs,
                outputs: mergedOutputs,
                host: mergedHost,
                exportAs: directive.exportAs,
                queries: mergedQueries,
                providers: directive.providers
            });
        }
    };
    DirectiveResolver._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        DirectiveResolver.decorators;
        /** @nocollapse
        @type {?} */
        DirectiveResolver.ctorParameters;
        /** @type {?} */
        DirectiveResolver.prototype._reflector;
    };
    DirectiveResolver.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DirectiveResolver.ctorParameters = [
        { type: ReflectorReader, },
    ];
    return DirectiveResolver;
}());
/**
 * @param {?} type
 * @return {?}
 */
function isDirectiveMetadata(type) {
    return type instanceof Directive;
}
//# sourceMappingURL=directive_resolver.js.map