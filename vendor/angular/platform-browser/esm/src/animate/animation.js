goog.module('_angular$platform_browser$src$animate$animation');
var lang_1 = goog.require('_angular$platform_browser$src$facade$lang');
var math_1 = goog.require('_angular$platform_browser$src$facade$math');
var collection_1 = goog.require('_angular$platform_browser$src$facade$collection');
var util_1 = goog.require('_angular$platform_browser$src$dom$util');
var dom_adapter_1 = goog.require('_angular$platform_browser$src$dom$dom__adapter');
class Animation {
    /**
     *  Stores the start time and starts the animation
     * @param {?} element
     * @param {?} data
     * @param {?} browserDetails
     */
    constructor(element, data, browserDetails) {
        this.element = element;
        this.data = data;
        this.browserDetails = browserDetails;
        /** functions to be called upon completion */
        this.callbacks = [];
        /** functions for removing event listeners */
        this.eventClearFunctions = [];
        /** flag used to track whether or not the animation has finished */
        this.completed = false;
        this._stringPrefix = '';
        this.startTime = lang_1.DateWrapper.toMillis(lang_1.DateWrapper.now());
        this._stringPrefix = dom_adapter_1.getDOM().getAnimationPrefix();
        this.setup();
        this.wait((timestamp) => this.start());
    }
    /** total amount of time that the animation should take including delay */
    get totalTime() {
        let /** @type {?} */ delay = this.computedDelay != null ? this.computedDelay : 0;
        let /** @type {?} */ duration = this.computedDuration != null ? this.computedDuration : 0;
        return delay + duration;
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    wait(callback) {
        // Firefox requires 2 frames for some reason
        this.browserDetails.raf(callback, 2);
    }
    /**
     *  Sets up the initial styles before the animation is started
     * @return {?}
     */
    setup() {
        if (this.data.fromStyles != null)
            this.applyStyles(this.data.fromStyles);
        if (this.data.duration != null)
            this.applyStyles({ 'transitionDuration': this.data.duration.toString() + 'ms' });
        if (this.data.delay != null)
            this.applyStyles({ 'transitionDelay': this.data.delay.toString() + 'ms' });
    }
    /**
     *  After the initial setup has occurred, this method adds the animation styles
     * @return {?}
     */
    start() {
        this.addClasses(this.data.classesToAdd);
        this.addClasses(this.data.animationClasses);
        this.removeClasses(this.data.classesToRemove);
        if (this.data.toStyles != null)
            this.applyStyles(this.data.toStyles);
        var /** @type {?} */ computedStyles = dom_adapter_1.getDOM().getComputedStyle(this.element);
        this.computedDelay =
            math_1.Math.max(this.parseDurationString(computedStyles.getPropertyValue(this._stringPrefix + 'transition-delay')), this.parseDurationString(this.element.style.getPropertyValue(this._stringPrefix + 'transition-delay')));
        this.computedDuration = math_1.Math.max(this.parseDurationString(computedStyles.getPropertyValue(this._stringPrefix + 'transition-duration')), this.parseDurationString(this.element.style.getPropertyValue(this._stringPrefix + 'transition-duration')));
        this.addEvents();
    }
    /**
     *  Applies the provided styles to the element
     * @param {?} styles
     * @return {?}
     */
    applyStyles(styles) {
        collection_1.StringMapWrapper.forEach(styles, (value, key) => {
            var /** @type {?} */ dashCaseKey = util_1.camelCaseToDashCase(key);
            if (lang_1.isPresent(dom_adapter_1.getDOM().getStyle(this.element, dashCaseKey))) {
                dom_adapter_1.getDOM().setStyle(this.element, dashCaseKey, value.toString());
            }
            else {
                dom_adapter_1.getDOM().setStyle(this.element, this._stringPrefix + dashCaseKey, value.toString());
            }
        });
    }
    /**
     *  Adds the provided classes to the element
     * @param {?} classes
     * @return {?}
     */
    addClasses(classes) {
        for (let /** @type {?} */ i = 0, /** @type {?} */ len = classes.length; i < len; i++)
            dom_adapter_1.getDOM().addClass(this.element, classes[i]);
    }
    /**
     *  Removes the provided classes from the element
     * @param {?} classes
     * @return {?}
     */
    removeClasses(classes) {
        for (let /** @type {?} */ i = 0, /** @type {?} */ len = classes.length; i < len; i++)
            dom_adapter_1.getDOM().removeClass(this.element, classes[i]);
    }
    /**
     *  Adds events to track when animations have finished
     * @return {?}
     */
    addEvents() {
        if (this.totalTime > 0) {
            this.eventClearFunctions.push(dom_adapter_1.getDOM().onAndCancel(this.element, dom_adapter_1.getDOM().getTransitionEnd(), (event) => this.handleAnimationEvent(event)));
        }
        else {
            this.handleAnimationCompleted();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleAnimationEvent(event) {
        let /** @type {?} */ elapsedTime = math_1.Math.round(event.elapsedTime * 1000);
        if (!this.browserDetails.elapsedTimeIncludesDelay)
            elapsedTime += this.computedDelay;
        event.stopPropagation();
        if (elapsedTime >= this.totalTime)
            this.handleAnimationCompleted();
    }
    /**
     *  Runs all animation callbacks and removes temporary classes
     * @return {?}
     */
    handleAnimationCompleted() {
        this.removeClasses(this.data.animationClasses);
        this.callbacks.forEach(callback => callback());
        this.callbacks = [];
        this.eventClearFunctions.forEach(fn => fn());
        this.eventClearFunctions = [];
        this.completed = true;
    }
    /**
     *  Adds animation callbacks to be called upon completion
     * @returns {Animation}
     * @param {?} callback
     * @return {?}
     */
    onComplete(callback) {
        if (this.completed) {
            callback();
        }
        else {
            this.callbacks.push(callback);
        }
        return this;
    }
    /**
     *  Converts the duration string to the number of milliseconds
     * @returns {number}
     * @param {?} duration
     * @return {?}
     */
    parseDurationString(duration) {
        var /** @type {?} */ maxValue = 0;
        // duration must have at least 2 characters to be valid. (number + type)
        if (duration == null || duration.length < 2) {
            return maxValue;
        }
        else if (duration.substring(duration.length - 2) == 'ms') {
            let /** @type {?} */ value = lang_1.NumberWrapper.parseInt(this.stripLetters(duration), 10);
            if (value > maxValue)
                maxValue = value;
        }
        else if (duration.substring(duration.length - 1) == 's') {
            let /** @type {?} */ ms = lang_1.NumberWrapper.parseFloat(this.stripLetters(duration)) * 1000;
            let /** @type {?} */ value = math_1.Math.floor(ms);
            if (value > maxValue)
                maxValue = value;
        }
        return maxValue;
    }
    /**
     *  Strips the letters from the duration string
     * @returns {string}
     * @param {?} str
     * @return {?}
     */
    stripLetters(str) {
        return lang_1.StringWrapper.replaceAll(str, lang_1.RegExpWrapper.create('[^0-9]+$', ''), '');
    }
    static _tsickle_typeAnnotationsHelper() {
        /** functions to be called upon completion
        @type {?} */
        Animation.prototype.callbacks;
        /** the duration (ms) of the animation (whether from CSS or manually set)
        @type {?} */
        Animation.prototype.computedDuration;
        /** the animation delay (ms) (whether from CSS or manually set)
        @type {?} */
        Animation.prototype.computedDelay;
        /** timestamp of when the animation started
        @type {?} */
        Animation.prototype.startTime;
        /** functions for removing event listeners
        @type {?} */
        Animation.prototype.eventClearFunctions;
        /** flag used to track whether or not the animation has finished
        @type {?} */
        Animation.prototype.completed;
        /** @type {?} */
        Animation.prototype._stringPrefix;
        /** @type {?} */
        Animation.prototype.element;
        /** @type {?} */
        Animation.prototype.data;
        /** @type {?} */
        Animation.prototype.browserDetails;
    }
}
exports.Animation = Animation;
//# sourceMappingURL=animation.js.map