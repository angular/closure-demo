goog.module('_angular$platform_browser$src$animate$css__animation__builder');
var css_animation_options_1 = goog.require('_angular$platform_browser$src$animate$css__animation__options');
var animation_1 = goog.require('_angular$platform_browser$src$animate$animation');
class CssAnimationBuilder {
    /**
     *  Accepts public properties for CssAnimationBuilder
     * @param {?} browserDetails
     */
    constructor(browserDetails) {
        this.browserDetails = browserDetails;
        this.data = new css_animation_options_1.CssAnimationOptions();
    }
    /**
     *  Adds a temporary class that will be removed at the end of the animation
     * @param {?} className
     * @return {?}
     */
    addAnimationClass(className) {
        this.data.animationClasses.push(className);
        return this;
    }
    /**
     *  Adds a class that will remain on the element after the animation has finished
     * @param {?} className
     * @return {?}
     */
    addClass(className) {
        this.data.classesToAdd.push(className);
        return this;
    }
    /**
     *  Removes a class from the element
     * @param {?} className
     * @return {?}
     */
    removeClass(className) {
        this.data.classesToRemove.push(className);
        return this;
    }
    /**
     *  Sets the animation duration (and overrides any defined through CSS)
     * @param {?} duration
     * @return {?}
     */
    setDuration(duration) {
        this.data.duration = duration;
        return this;
    }
    /**
     *  Sets the animation delay (and overrides any defined through CSS)
     * @param {?} delay
     * @return {?}
     */
    setDelay(delay) {
        this.data.delay = delay;
        return this;
    }
    /**
     *  Sets styles for both the initial state and the destination state
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    setStyles(from, to) {
        return this.setFromStyles(from).setToStyles(to);
    }
    /**
     *  Sets the initial styles for the animation
     * @param {?} from
     * @return {?}
     */
    setFromStyles(from) {
        this.data.fromStyles = from;
        return this;
    }
    /**
     *  Sets the destination styles for the animation
     * @param {?} to
     * @return {?}
     */
    setToStyles(to) {
        this.data.toStyles = to;
        return this;
    }
    /**
     *  Starts the animation and returns a promise
     * @param {?} element
     * @return {?}
     */
    start(element) {
        return new animation_1.Animation(element, this.data, this.browserDetails);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CssAnimationBuilder.prototype.data;
        /** @type {?} */
        CssAnimationBuilder.prototype.browserDetails;
    }
}
exports.CssAnimationBuilder = CssAnimationBuilder;
//# sourceMappingURL=css_animation_builder.js.map