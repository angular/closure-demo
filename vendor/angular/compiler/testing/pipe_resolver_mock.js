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
import { PipeResolver } from '@angular/compiler';
import { Compiler, Injectable } from '@angular/core';
export var MockPipeResolver = (function (_super) {
    __extends(MockPipeResolver, _super);
    function MockPipeResolver(_injector) {
        _super.call(this);
        this._injector = _injector;
        this._pipes = new Map();
    }
    Object.defineProperty(MockPipeResolver.prototype, "_compiler", {
        get: function () { return this._injector.get(Compiler); },
        enumerable: true,
        configurable: true
    });
    MockPipeResolver.prototype._clearCacheFor = function (pipe) { this._compiler.clearCacheFor(pipe); };
    /**
     * Overrides the {@link Pipe} for a pipe.
     */
    MockPipeResolver.prototype.setPipe = function (type, metadata) {
        this._pipes.set(type, metadata);
        this._clearCacheFor(type);
    };
    /**
     * Returns the {@link Pipe} for a pipe:
     * - Set the {@link Pipe} to the overridden view when it exists or fallback to the
     * default
     * `PipeResolver`, see `setPipe`.
     */
    MockPipeResolver.prototype.resolve = function (type, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        var metadata = this._pipes.get(type);
        if (!metadata) {
            metadata = _super.prototype.resolve.call(this, type, throwIfNotFound);
        }
        return metadata;
    };
    MockPipeResolver = __decorate([
        Injectable()
    ], MockPipeResolver);
    return MockPipeResolver;
}(PipeResolver));
//# sourceMappingURL=pipe_resolver_mock.js.map