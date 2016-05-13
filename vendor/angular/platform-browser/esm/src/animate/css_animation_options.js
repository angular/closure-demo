goog.module('_angular$platform_browser$src$animate$css__animation__options');
class CssAnimationOptions {
    constructor() {
        /** classes to be added to the element */
        this.classesToAdd = [];
        /** classes to be removed from the element */
        this.classesToRemove = [];
        /** classes to be added for the duration of the animation */
        this.animationClasses = [];
    }
    static _tsickle_typeAnnotationsHelper() {
        /** initial styles for the element
        @type {?} */
        CssAnimationOptions.prototype.fromStyles;
        /** destination styles for the element
        @type {?} */
        CssAnimationOptions.prototype.toStyles;
        /** classes to be added to the element
        @type {?} */
        CssAnimationOptions.prototype.classesToAdd;
        /** classes to be removed from the element
        @type {?} */
        CssAnimationOptions.prototype.classesToRemove;
        /** classes to be added for the duration of the animation
        @type {?} */
        CssAnimationOptions.prototype.animationClasses;
        /** override the duration of the animation (in milliseconds)
        @type {?} */
        CssAnimationOptions.prototype.duration;
        /** override the transition delay (in milliseconds)
        @type {?} */
        CssAnimationOptions.prototype.delay;
    }
}
exports.CssAnimationOptions = CssAnimationOptions;
//# sourceMappingURL=css_animation_options.js.map