goog.module('_angular$platform_browser$testing$animation__builder__mock');
var core_1 = goog.require('_angular$core');
var animation_1 = goog.require('_angular$platform_browser$src$animate$animation');
var browser_details_1 = goog.require('_angular$platform_browser$src$animate$browser__details');
var animation_builder_1 = goog.require('_angular$platform_browser$src$animate$animation__builder');
var css_animation_builder_1 = goog.require('_angular$platform_browser$src$animate$css__animation__builder');
class MockAnimationBuilder extends animation_builder_1.AnimationBuilder {
    /**
     */
    constructor() {
        super(null);
    }
    /**
     * @return {?}
     */
    css() { return new MockCssAnimationBuilder(); }
}
MockAnimationBuilder.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ MockAnimationBuilder.ctorParameters = [];
exports.MockAnimationBuilder = MockAnimationBuilder;
class MockCssAnimationBuilder extends css_animation_builder_1.CssAnimationBuilder {
    /**
     */
    constructor() {
        super(null);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    start(element) { return new MockAnimation(element, this.data); }
}
class MockBrowserAbstraction extends browser_details_1.BrowserDetails {
    /**
     * @return {?}
     */
    doesElapsedTimeIncludesDelay() { this.elapsedTimeIncludesDelay = false; }
}
class MockAnimation extends animation_1.Animation {
    /**
     * @param {?} element
     * @param {?} data
     */
    constructor(element, data) {
        super(element, data, new MockBrowserAbstraction());
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    wait(callback) { this._callback = callback; }
    /**
     * @return {?}
     */
    flush() {
        this._callback(0);
        this._callback = null;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        MockAnimation.prototype._callback;
    }
}
//# sourceMappingURL=animation_builder_mock.js.map