goog.module('_angular$core$src$testability$testability');
var collection_1 = goog.require('_angular$core$src$facade$collection');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var exceptions_1 = goog.require('_angular$core$src$facade$exceptions');
var ng_zone_1 = goog.require('_angular$core$src$zone$ng__zone');
var async_1 = goog.require('_angular$core$src$facade$async');
var decorators_1 = goog.require('_angular$core$src$di$decorators');
class Testability {
    /**
     * @param {?} _ngZone
     */
    constructor(_ngZone) {
        this._ngZone = _ngZone;
        /** @internal */
        this._pendingCount = 0;
        /** @internal */
        this._isZoneStable = true;
        /**
         * Whether any work was done since the last 'whenStable' callback. This is
         * useful to detect if this could have potentially destabilized another
         * component while it is stabilizing.
         * @internal
         */
        this._didWork = false;
        /** @internal */
        this._callbacks = [];
        this._watchAngularEvents();
    }
    /**
     * @internal
     * @return {?}
     */
    _watchAngularEvents() {
        async_1.ObservableWrapper.subscribe(this._ngZone.onUnstable, (_) => {
            this._didWork = true;
            this._isZoneStable = false;
        });
        this._ngZone.runOutsideAngular(() => {
            async_1.ObservableWrapper.subscribe(this._ngZone.onStable, (_) => {
                ng_zone_1.NgZone.assertNotInAngularZone();
                lang_1.scheduleMicroTask(() => {
                    this._isZoneStable = true;
                    this._runCallbacksIfReady();
                });
            });
        });
    }
    /**
     * @return {?}
     */
    increasePendingRequestCount() {
        this._pendingCount += 1;
        this._didWork = true;
        return this._pendingCount;
    }
    /**
     * @return {?}
     */
    decreasePendingRequestCount() {
        this._pendingCount -= 1;
        if (this._pendingCount < 0) {
            throw new exceptions_1.BaseException('pending async requests below zero');
        }
        this._runCallbacksIfReady();
        return this._pendingCount;
    }
    /**
     * @return {?}
     */
    isStable() {
        return this._isZoneStable && this._pendingCount == 0 && !this._ngZone.hasPendingMacrotasks;
    }
    /**
     * @internal
     * @return {?}
     */
    _runCallbacksIfReady() {
        if (this.isStable()) {
            // Schedules the call backs in a new frame so that it is always async.
            lang_1.scheduleMicroTask(() => {
                while (this._callbacks.length !== 0) {
                    (this._callbacks.pop())(this._didWork);
                }
                this._didWork = false;
            });
        }
        else {
            // Not Ready
            this._didWork = true;
        }
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    whenStable(callback) {
        this._callbacks.push(callback);
        this._runCallbacksIfReady();
    }
    /**
     * @return {?}
     */
    getPendingRequestCount() { return this._pendingCount; }
    /**
     * @param {?} using
     * @param {?} provider
     * @param {?} exactMatch
     * @return {?}
     */
    findBindings(using, provider, exactMatch) {
        // TODO(juliemr): implement.
        return [];
    }
    /**
     * @param {?} using
     * @param {?} provider
     * @param {?} exactMatch
     * @return {?}
     */
    findProviders(using, provider, exactMatch) {
        // TODO(juliemr): implement.
        return [];
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        Testability.prototype._pendingCount;
        /** @internal
        @type {?} */
        Testability.prototype._isZoneStable;
        /** Whether any work was done since the last 'whenStable' callback. This is useful to detect if this could have potentially destabilized another component while it is stabilizing.
       @internal
        @type {?} */
        Testability.prototype._didWork;
        /** @internal
        @type {?} */
        Testability.prototype._callbacks;
        /** @type {?} */
        Testability.prototype._ngZone;
    }
}
/** @nocollapse */ Testability.decorators = [
    { type: decorators_1.Injectable },
];
/** @nocollapse */ Testability.ctorParameters = [
    { type: ng_zone_1.NgZone, },
];
exports.Testability = Testability;
class TestabilityRegistry {
    /**
     */
    constructor() {
        /** @internal */
        this._applications = new collection_1.Map();
        _testabilityGetter.addToWindow(this);
    }
    /**
     * @param {?} token
     * @param {?} testability
     * @return {?}
     */
    registerApplication(token, testability) {
        this._applications.set(token, testability);
    }
    /**
     * @param {?} elem
     * @return {?}
     */
    getTestability(elem) { return this._applications.get(elem); }
    /**
     * @return {?}
     */
    getAllTestabilities() { return collection_1.MapWrapper.values(this._applications); }
    /**
     * @return {?}
     */
    getAllRootElements() { return collection_1.MapWrapper.keys(this._applications); }
    /**
     * @param {?} elem
     * @param {?=} findInAncestors
     * @return {?}
     */
    findTestabilityInTree(elem, findInAncestors = true) {
        return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        TestabilityRegistry.prototype._applications;
    }
}
/** @nocollapse */ TestabilityRegistry.decorators = [
    { type: decorators_1.Injectable },
];
/** @nocollapse */ TestabilityRegistry.ctorParameters = [];
exports.TestabilityRegistry = TestabilityRegistry;
/* @ts2dart_const */
class _NoopGetTestability {
    /**
     * @param {?} registry
     * @return {?}
     */
    addToWindow(registry) { }
    /**
     * @param {?} registry
     * @param {?} elem
     * @param {?} findInAncestors
     * @return {?}
     */
    findTestabilityInTree(registry, elem, findInAncestors) {
        return null;
    }
}
/**
 *  Set the {@link GetTestability} implementation used by the Angular testing framework.
 * @param {?} getter
 * @return {?}
 */
function setTestabilityGetter(getter) {
    _testabilityGetter = getter;
}
exports.setTestabilityGetter = setTestabilityGetter;
var /** @type {?} */ _testabilityGetter = new _NoopGetTestability();
//# sourceMappingURL=testability.js.map