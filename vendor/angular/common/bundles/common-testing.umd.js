/**
 * @license Angular v0.0.0-PLACEHOLDER
 * (c) 2010-2016 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global.ng = global.ng || {}, global.ng.common = global.ng.common || {}, global.ng.common.testing = global.ng.common.testing || {}),global.ng.core,global.ng.common));
}(this, function (exports,_angular_core,_angular_common) { 'use strict';

    /**
     * A spy for {@link Location} that allows tests to fire simulated location events.
     *
     * @experimental
     */
    var SpyLocation = (function () {
        function SpyLocation() {
            this.urlChanges = [];
            this._history = [new LocationState('', '')];
            this._historyIndex = 0;
            /** @internal */
            this._subject = new _angular_core.EventEmitter();
            /** @internal */
            this._baseHref = '';
            /** @internal */
            this._platformStrategy = null;
        }
        /**
         * @param {?} url
         * @return {?}
         */
        SpyLocation.prototype.setInitialPath = function (url) { this._history[this._historyIndex].path = url; };
        /**
         * @param {?} url
         * @return {?}
         */
        SpyLocation.prototype.setBaseHref = function (url) { this._baseHref = url; };
        /**
         * @return {?}
         */
        SpyLocation.prototype.path = function () { return this._history[this._historyIndex].path; };
        /**
         * @param {?} path
         * @param {?=} query
         * @return {?}
         */
        SpyLocation.prototype.isCurrentPathEqualTo = function (path, query) {
            if (query === void 0) { query = ''; }
            var /** @type {?} */ givenPath = path.endsWith('/') ? path.substring(0, path.length - 1) : path;
            var /** @type {?} */ currPath = this.path().endsWith('/') ? this.path().substring(0, this.path().length - 1) : this.path();
            return currPath == givenPath + (query.length > 0 ? ('?' + query) : '');
        };
        /**
         * @param {?} pathname
         * @return {?}
         */
        SpyLocation.prototype.simulateUrlPop = function (pathname) { this._subject.emit({ 'url': pathname, 'pop': true }); };
        /**
         * @param {?} pathname
         * @return {?}
         */
        SpyLocation.prototype.simulateHashChange = function (pathname) {
            // Because we don't prevent the native event, the browser will independently update the path
            this.setInitialPath(pathname);
            this.urlChanges.push('hash: ' + pathname);
            this._subject.emit({ 'url': pathname, 'pop': true, 'type': 'hashchange' });
        };
        /**
         * @param {?} url
         * @return {?}
         */
        SpyLocation.prototype.prepareExternalUrl = function (url) {
            if (url.length > 0 && !url.startsWith('/')) {
                url = '/' + url;
            }
            return this._baseHref + url;
        };
        /**
         * @param {?} path
         * @param {?=} query
         * @return {?}
         */
        SpyLocation.prototype.go = function (path, query) {
            if (query === void 0) { query = ''; }
            path = this.prepareExternalUrl(path);
            if (this._historyIndex > 0) {
                this._history.splice(this._historyIndex + 1);
            }
            this._history.push(new LocationState(path, query));
            this._historyIndex = this._history.length - 1;
            var /** @type {?} */ locationState = this._history[this._historyIndex - 1];
            if (locationState.path == path && locationState.query == query) {
                return;
            }
            var /** @type {?} */ url = path + (query.length > 0 ? ('?' + query) : '');
            this.urlChanges.push(url);
            this._subject.emit({ 'url': url, 'pop': false });
        };
        /**
         * @param {?} path
         * @param {?=} query
         * @return {?}
         */
        SpyLocation.prototype.replaceState = function (path, query) {
            if (query === void 0) { query = ''; }
            path = this.prepareExternalUrl(path);
            var /** @type {?} */ history = this._history[this._historyIndex];
            if (history.path == path && history.query == query) {
                return;
            }
            history.path = path;
            history.query = query;
            var /** @type {?} */ url = path + (query.length > 0 ? ('?' + query) : '');
            this.urlChanges.push('replace: ' + url);
        };
        /**
         * @return {?}
         */
        SpyLocation.prototype.forward = function () {
            if (this._historyIndex < (this._history.length - 1)) {
                this._historyIndex++;
                this._subject.emit({ 'url': this.path(), 'pop': true });
            }
        };
        /**
         * @return {?}
         */
        SpyLocation.prototype.back = function () {
            if (this._historyIndex > 0) {
                this._historyIndex--;
                this._subject.emit({ 'url': this.path(), 'pop': true });
            }
        };
        /**
         * @param {?} onNext
         * @param {?=} onThrow
         * @param {?=} onReturn
         * @return {?}
         */
        SpyLocation.prototype.subscribe = function (onNext, onThrow, onReturn) {
            if (onThrow === void 0) { onThrow = null; }
            if (onReturn === void 0) { onReturn = null; }
            return this._subject.subscribe({ next: onNext, error: onThrow, complete: onReturn });
        };
        /**
         * @param {?} url
         * @return {?}
         */
        SpyLocation.prototype.normalize = function (url) { return null; };
        SpyLocation._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            SpyLocation.decorators;
            /** @nocollapse
            @type {?} */
            SpyLocation.ctorParameters;
            /** @type {?} */
            SpyLocation.prototype.urlChanges;
            /** @type {?} */
            SpyLocation.prototype._history;
            /** @type {?} */
            SpyLocation.prototype._historyIndex;
            /** @type {?} */
            SpyLocation.prototype._subject;
            /** @type {?} */
            SpyLocation.prototype._baseHref;
            /** @type {?} */
            SpyLocation.prototype._platformStrategy;
        };
        SpyLocation.decorators = [
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        SpyLocation.ctorParameters = [];
        return SpyLocation;
    }());
    var LocationState = (function () {
        /**
         * @param {?} path
         * @param {?} query
         */
        function LocationState(path, query) {
            this.path = path;
            this.query = query;
        }
        LocationState._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            LocationState.prototype.path;
            /** @type {?} */
            LocationState.prototype.query;
        };
        return LocationState;
    }());

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
    /**
     * A mock implementation of {@link LocationStrategy} that allows tests to fire simulated
     * location events.
     *
     * @stable
     */
    var MockLocationStrategy = (function (_super) {
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
            this._subject = new _angular_core.EventEmitter();
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
            { type: _angular_core.Injectable },
        ];
        /** @nocollapse */
        MockLocationStrategy.ctorParameters = [];
        return MockLocationStrategy;
    }(_angular_common.LocationStrategy));
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

    exports.SpyLocation = SpyLocation;
    exports.MockLocationStrategy = MockLocationStrategy;

}));