/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModuleResolver } from '@angular/compiler';
import { Compiler, Injectable } from '@angular/core';
export var MockNgModuleResolver = (function (_super) {
    __extends(MockNgModuleResolver, _super);
    function MockNgModuleResolver(_injector) {
        _super.call(this);
        this._injector = _injector;
        this._ngModules = new Map();
    }
    /**
     * Overrides the {@link NgModule} for a module.
     */
    MockNgModuleResolver.prototype.setNgModule = function (type, metadata) {
        this._ngModules.set(type, metadata);
        this._clearCacheFor(type);
    };
    /**
     * Returns the {@link NgModule} for a module:
     * - Set the {@link NgModule} to the overridden view when it exists or fallback to the
     * default
     * `NgModuleResolver`, see `setNgModule`.
     */
    MockNgModuleResolver.prototype.resolve = function (type, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        return this._ngModules.get(type) || _super.prototype.resolve.call(this, type, throwIfNotFound);
    };
    Object.defineProperty(MockNgModuleResolver.prototype, "_compiler", {
        get: function () { return this._injector.get(Compiler); },
        enumerable: true,
        configurable: true
    });
    MockNgModuleResolver.prototype._clearCacheFor = function (component) { this._compiler.clearCacheFor(component); };
    MockNgModuleResolver = __decorate([
        Injectable()
    ], MockNgModuleResolver);
    return MockNgModuleResolver;
}(NgModuleResolver));
//# sourceMappingURL=ng_module_resolver_mock.js.map