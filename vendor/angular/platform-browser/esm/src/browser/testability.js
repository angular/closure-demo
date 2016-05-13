goog.module('_angular$platform_browser$src$browser$testability');
var core_1 = goog.require('_angular$core');
var collection_1 = goog.require('_angular$platform_browser$src$facade$collection');
var lang_1 = goog.require('_angular$platform_browser$src$facade$lang');
var dom_adapter_1 = goog.require('_angular$platform_browser$src$dom$dom__adapter');
class PublicTestability {
    /**
     * @param {?} testability
     */
    constructor(testability) {
        this._testability = testability;
    }
    /**
     * @return {?}
     */
    isStable() { return this._testability.isStable(); }
    /**
     * @param {?} callback
     * @return {?}
     */
    whenStable(callback) { this._testability.whenStable(callback); }
    /**
     * @param {?} using
     * @param {?} provider
     * @param {?} exactMatch
     * @return {?}
     */
    findBindings(using, provider, exactMatch) {
        return this.findProviders(using, provider, exactMatch);
    }
    /**
     * @param {?} using
     * @param {?} provider
     * @param {?} exactMatch
     * @return {?}
     */
    findProviders(using, provider, exactMatch) {
        return this._testability.findBindings(using, provider, exactMatch);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        PublicTestability.prototype._testability;
    }
}
class BrowserGetTestability {
    /**
     * @return {?}
     */
    static init() { core_1.setTestabilityGetter(new BrowserGetTestability()); }
    /**
     * @param {?} registry
     * @return {?}
     */
    addToWindow(registry) {
        lang_1.global.getAngularTestability = (elem, findInAncestors = true) => {
            var /** @type {?} */ testability = registry.findTestabilityInTree(elem, findInAncestors);
            if (testability == null) {
                throw new Error('Could not find testability for element.');
            }
            return new PublicTestability(testability);
        };
        lang_1.global.getAllAngularTestabilities = () => {
            var /** @type {?} */ testabilities = registry.getAllTestabilities();
            return testabilities.map((testability) => { return new PublicTestability(testability); });
        };
        lang_1.global.getAllAngularRootElements = () => registry.getAllRootElements();
        var /** @type {?} */ whenAllStable = (callback) => {
            var /** @type {?} */ testabilities = lang_1.global.getAllAngularTestabilities();
            var /** @type {?} */ count = testabilities.length;
            var /** @type {?} */ didWork = false;
            var /** @type {?} */ decrement = function (didWork_) {
                didWork = didWork || didWork_;
                count--;
                if (count == 0) {
                    callback(didWork);
                }
            };
            testabilities.forEach(function (testability) { testability.whenStable(decrement); });
        };
        if (!lang_1.global.frameworkStabilizers) {
            lang_1.global.frameworkStabilizers = collection_1.ListWrapper.createGrowableSize(0);
        }
        lang_1.global.frameworkStabilizers.push(whenAllStable);
    }
    /**
     * @param {?} registry
     * @param {?} elem
     * @param {?} findInAncestors
     * @return {?}
     */
    findTestabilityInTree(registry, elem, findInAncestors) {
        if (elem == null) {
            return null;
        }
        var /** @type {?} */ t = registry.getTestability(elem);
        if (lang_1.isPresent(t)) {
            return t;
        }
        else if (!findInAncestors) {
            return null;
        }
        if (dom_adapter_1.getDOM().isShadowRoot(elem)) {
            return this.findTestabilityInTree(registry, dom_adapter_1.getDOM().getHost(elem), true);
        }
        return this.findTestabilityInTree(registry, dom_adapter_1.getDOM().parentElement(elem), true);
    }
}
exports.BrowserGetTestability = BrowserGetTestability;
//# sourceMappingURL=testability.js.map