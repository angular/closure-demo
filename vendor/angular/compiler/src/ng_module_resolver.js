/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, NgModule } from '@angular/core';
import { isPresent, stringify } from './facade/lang';
import { ReflectorReader, reflector } from './private_import_core';
/**
 * @param {?} obj
 * @return {?}
 */
function _isNgModuleMetadata(obj) {
    return obj instanceof NgModule;
}
/**
 * Resolves types to {@link NgModule}.
 */
export var NgModuleResolver = (function () {
    /**
     * @param {?=} _reflector
     */
    function NgModuleResolver(_reflector) {
        if (_reflector === void 0) { _reflector = reflector; }
        this._reflector = _reflector;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    NgModuleResolver.prototype.isNgModule = function (type) { return this._reflector.annotations(type).some(_isNgModuleMetadata); };
    /**
     * @param {?} type
     * @param {?=} throwIfNotFound
     * @return {?}
     */
    NgModuleResolver.prototype.resolve = function (type, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        var /** @type {?} */ ngModuleMeta = this._reflector.annotations(type).find(_isNgModuleMetadata);
        if (isPresent(ngModuleMeta)) {
            return ngModuleMeta;
        }
        else {
            if (throwIfNotFound) {
                throw new Error("No NgModule metadata found for '" + stringify(type) + "'.");
            }
            return null;
        }
    };
    NgModuleResolver._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        NgModuleResolver.decorators;
        /** @nocollapse
        @type {?} */
        NgModuleResolver.ctorParameters;
        /** @type {?} */
        NgModuleResolver.prototype._reflector;
    };
    NgModuleResolver.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NgModuleResolver.ctorParameters = [
        { type: ReflectorReader, },
    ];
    return NgModuleResolver;
}());
//# sourceMappingURL=ng_module_resolver.js.map