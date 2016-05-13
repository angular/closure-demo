goog.module('_angular$platform_browser$src$dom$events$hammer__gestures');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$platform_browser$src$facade$lang');
var exceptions_1 = goog.require('_angular$platform_browser$src$facade$exceptions');
var hammer_common_1 = goog.require('_angular$platform_browser$src$dom$events$hammer__common');
exports.HAMMER_GESTURE_CONFIG = 
/*@ts2dart_const*/ new core_1.OpaqueToken("HammerGestureConfig");
class HammerGestureConfig {
    constructor() {
        this.events = [];
        this.overrides = {};
    }
    /**
     * @param {?} element
     * @return {?}
     */
    buildHammer(element) {
        var /** @type {?} */ mc = new Hammer(element);
        mc.get('pinch').set({ enable: true });
        mc.get('rotate').set({ enable: true });
        for (let eventName in this.overrides) {
            mc.get(eventName).set(this.overrides[eventName]);
        }
        return mc;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        HammerGestureConfig.prototype.events;
        /** @type {?} */
        HammerGestureConfig.prototype.overrides;
    }
}
/** @nocollapse */ HammerGestureConfig.decorators = [
    { type: core_1.Injectable },
];
exports.HammerGestureConfig = HammerGestureConfig;
class HammerGesturesPlugin extends hammer_common_1.HammerGesturesPluginCommon {
    /**
     * @param {?} _config
     */
    constructor(_config) {
        super();
        this._config = _config;
    }
    /**
     * @param {?} eventName
     * @return {?}
     */
    supports(eventName) {
        if (!super.supports(eventName) && !this.isCustomEvent(eventName))
            return false;
        if (!lang_1.isPresent(window['Hammer'])) {
            throw new exceptions_1.BaseException(`Hammer.js is not loaded, can not bind ${eventName} event`);
        }
        return true;
    }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addEventListener(element, eventName, handler) {
        var /** @type {?} */ zone = this.manager.getZone();
        eventName = eventName.toLowerCase();
        return zone.runOutsideAngular(() => {
            // Creating the manager bind events, must be done outside of angular
            var /** @type {?} */ mc = this._config.buildHammer(element);
            var /** @type {?} */ callback = function (eventObj) { zone.runGuarded(function () { handler(eventObj); }); };
            mc.on(eventName, callback);
            return () => { mc.off(eventName, callback); };
        });
    }
    /**
     * @param {?} eventName
     * @return {?}
     */
    isCustomEvent(eventName) { return this._config.events.indexOf(eventName) > -1; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        HammerGesturesPlugin.prototype._config;
    }
}
/** @nocollapse */ HammerGesturesPlugin.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ HammerGesturesPlugin.ctorParameters = [
    { type: HammerGestureConfig, decorators: [{ type: core_1.Inject, args: [exports.HAMMER_GESTURE_CONFIG,] },] },
];
exports.HammerGesturesPlugin = HammerGesturesPlugin;
//# sourceMappingURL=hammer_gestures.js.map