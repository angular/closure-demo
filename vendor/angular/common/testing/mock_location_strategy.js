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
import { LocationStrategy } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
/**
 * A mock implementation of {@link LocationStrategy} that allows tests to fire simulated
 * location events.
 *
 * @stable
 */
export var MockLocationStrategy = (function (_super) {
    __extends(MockLocationStrategy, _super);
    /**
     */
    function MockLocationStrategy() {
        _super.call(this);
        this.internalBaseHref = '/';
        this.internalPath = '/';
        this.internalTitle = '';
        this.urlChanges = [];
        /** @internal */
        this._subject = new EventEmitter();
    }
    /**
     * @param {?} url
     * @return {?}
     */
    MockLocationStrategy.prototype.simulatePopState = function (url) {
        this.internalPath = url;
        this._subject.emit(new _MockPopStateEvent(this.path()));
    };
    /**
     * @param {?=} includeHash
     * @return {?}
     */
    MockLocationStrategy.prototype.path = function (includeHash) {
        if (includeHash === void 0) { includeHash = false; }
        return this.internalPath;
    };
    /**
     * @param {?} internal
     * @return {?}
     */
    MockLocationStrategy.prototype.prepareExternalUrl = function (internal) {
        if (internal.startsWith('/') && this.internalBaseHref.endsWith('/')) {
            return this.internalBaseHref + internal.substring(1);
        }
        return this.internalBaseHref + internal;
    };
    /**
     * @param {?} ctx
     * @param {?} title
     * @param {?} path
     * @param {?} query
     * @return {?}
     */
    MockLocationStrategy.prototype.pushState = function (ctx, title, path, query) {
        this.internalTitle = title;
        var /** @type {?} */ url = path + (query.length > 0 ? ('?' + query) : '');
        this.internalPath = url;
        var /** @type {?} */ externalUrl = this.prepareExternalUrl(url);
        this.urlChanges.push(externalUrl);
    };
    /**
     * @param {?} ctx
     * @param {?} title
     * @param {?} path
     * @param {?} query
     * @return {?}
     */
    MockLocationStrategy.prototype.replaceState = function (ctx, title, path, query) {
        this.internalTitle = title;
        var /** @type {?} */ url = path + (query.length > 0 ? ('?' + query) : '');
        this.internalPath = url;
        var /** @type {?} */ externalUrl = this.prepareExternalUrl(url);
        this.urlChanges.push('replace: ' + externalUrl);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MockLocationStrategy.prototype.onPopState = function (fn) { this._subject.subscribe({ next: fn }); };
    /**
     * @return {?}
     */
    MockLocationStrategy.prototype.getBaseHref = function () { return this.internalBaseHref; };
    /**
     * @return {?}
     */
    MockLocationStrategy.prototype.back = function () {
        if (this.urlChanges.length > 0) {
            this.urlChanges.pop();
            var /** @type {?} */ nextUrl = this.urlChanges.length > 0 ? this.urlChanges[this.urlChanges.length - 1] : '';
            this.simulatePopState(nextUrl);
        }
    };
    /**
     * @return {?}
     */
    MockLocationStrategy.prototype.forward = function () { throw 'not implemented'; };
    MockLocationStrategy._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        MockLocationStrategy.decorators;
        /** @nocollapse
        @type {?} */
        MockLocationStrategy.ctorParameters;
        /** @type {?} */
        MockLocationStrategy.prototype.internalBaseHref;
        /** @type {?} */
        MockLocationStrategy.prototype.internalPath;
        /** @type {?} */
        MockLocationStrategy.prototype.internalTitle;
        /** @type {?} */
        MockLocationStrategy.prototype.urlChanges;
        /** @type {?} */
        MockLocationStrategy.prototype._subject;
    };
    MockLocationStrategy.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MockLocationStrategy.ctorParameters = [];
    return MockLocationStrategy;
}(LocationStrategy));
var _MockPopStateEvent = (function () {
    /**
     * @param {?} newUrl
     */
    function _MockPopStateEvent(newUrl) {
        this.newUrl = newUrl;
        this.pop = true;
        this.type = 'popstate';
    }
    _MockPopStateEvent._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        _MockPopStateEvent.prototype.pop;
        /** @type {?} */
        _MockPopStateEvent.prototype.type;
        /** @type {?} */
        _MockPopStateEvent.prototype.newUrl;
    };
    return _MockPopStateEvent;
}());
//# sourceMappingURL=mock_location_strategy.js.map