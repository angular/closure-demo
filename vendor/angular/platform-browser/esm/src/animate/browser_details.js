goog.module('_angular$platform_browser$src$animate$browser__details');
var core_1 = goog.require('_angular$core');
var math_1 = goog.require('_angular$platform_browser$src$facade$math');
var dom_adapter_1 = goog.require('_angular$platform_browser$src$dom$dom__adapter');
class BrowserDetails {
    /**
     */
    constructor() {
        this.elapsedTimeIncludesDelay = false;
        this.doesElapsedTimeIncludesDelay();
    }
    /**
     *  Determines if `event.elapsedTime` includes transition delay in the current browser.  At this time, Chrome and Opera seem to be the only browsers that include this.
     * @return {?}
     */
    doesElapsedTimeIncludesDelay() {
        var /** @type {?} */ div = dom_adapter_1.getDOM().createElement('div');
        dom_adapter_1.getDOM().setAttribute(div, 'style', `position: absolute; top: -9999px; left: -9999px; width: 1px;
      height: 1px; transition: all 1ms linear 1ms;`);
        // Firefox requires that we wait for 2 frames for some reason
        this.raf((timestamp) => {
            dom_adapter_1.getDOM().on(div, 'transitionend', (event) => {
                var /** @type {?} */ elapsed = math_1.Math.round(event.elapsedTime * 1000);
                this.elapsedTimeIncludesDelay = elapsed == 2;
                dom_adapter_1.getDOM().remove(div);
            });
            dom_adapter_1.getDOM().setStyle(div, 'width', '2px');
        }, 2);
    }
    /**
     * @param {?} callback
     * @param {?=} frames
     * @return {?}
     */
    raf(callback, frames = 1) {
        var /** @type {?} */ queue = new RafQueue(callback, frames);
        return () => queue.cancel();
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        BrowserDetails.prototype.elapsedTimeIncludesDelay;
    }
}
BrowserDetails.decorators = [
    { type: core_1.Injectable },
];
BrowserDetails.ctorParameters = [];
exports.BrowserDetails = BrowserDetails;
class RafQueue {
    /**
     * @param {?} callback
     * @param {?} frames
     */
    constructor(callback, frames) {
        this.callback = callback;
        this.frames = frames;
        this._raf();
    }
    /**
     * @return {?}
     */
    _raf() {
        this.currentFrameId =
            dom_adapter_1.getDOM().requestAnimationFrame((timestamp) => this._nextFrame(timestamp));
    }
    /**
     * @param {?} timestamp
     * @return {?}
     */
    _nextFrame(timestamp) {
        this.frames--;
        if (this.frames > 0) {
            this._raf();
        }
        else {
            this.callback(timestamp);
        }
    }
    /**
     * @return {?}
     */
    cancel() {
        dom_adapter_1.getDOM().cancelAnimationFrame(this.currentFrameId);
        this.currentFrameId = null;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        RafQueue.prototype.currentFrameId;
        /** @type {?} */
        RafQueue.prototype.callback;
        /** @type {?} */
        RafQueue.prototype.frames;
    }
}
//# sourceMappingURL=browser_details.js.map