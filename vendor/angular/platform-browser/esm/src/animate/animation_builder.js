goog.module('_angular$platform_browser$src$animate$animation__builder');
var core_1 = goog.require('_angular$core');
var css_animation_builder_1 = goog.require('_angular$platform_browser$src$animate$css__animation__builder');
var browser_details_1 = goog.require('_angular$platform_browser$src$animate$browser__details');
class AnimationBuilder {
    /**
     *  Used for DI
     * @param {?} browserDetails
     */
    constructor(browserDetails) {
        this.browserDetails = browserDetails;
    }
    /**
     *  Creates a new CSS Animation
     * @returns {CssAnimationBuilder}
     * @return {?}
     */
    css() { return new css_animation_builder_1.CssAnimationBuilder(this.browserDetails); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        AnimationBuilder.prototype.browserDetails;
    }
}
/** @nocollapse */ AnimationBuilder.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ AnimationBuilder.ctorParameters = [
    { type: browser_details_1.BrowserDetails, },
];
exports.AnimationBuilder = AnimationBuilder;
//# sourceMappingURL=animation_builder.js.map