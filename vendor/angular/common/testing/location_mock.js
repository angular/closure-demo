/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { EventEmitter, Injectable } from '@angular/core';
/**
 * A spy for {@link Location} that allows tests to fire simulated location events.
 *
 * @experimental
 */
export var SpyLocation = (function () {
    function SpyLocation() {
        this.urlChanges = [];
        this._history = [new LocationState('', '')];
        this._historyIndex = 0;
        /** @internal */
        this._subject = new EventEmitter();
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
        { type: Injectable },
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
//# sourceMappingURL=location_mock.js.map