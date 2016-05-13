goog.module('_angular$platform_browser$src$dom$events$hammer__common');
var event_manager_1 = goog.require('_angular$platform_browser$src$dom$events$event__manager');
var collection_1 = goog.require('_angular$platform_browser$src$facade$collection');
var /** @type {?} */ _eventNames = {
    // pan
    'pan': true,
    'panstart': true,
    'panmove': true,
    'panend': true,
    'pancancel': true,
    'panleft': true,
    'panright': true,
    'panup': true,
    'pandown': true,
    // pinch
    'pinch': true,
    'pinchstart': true,
    'pinchmove': true,
    'pinchend': true,
    'pinchcancel': true,
    'pinchin': true,
    'pinchout': true,
    // press
    'press': true,
    'pressup': true,
    // rotate
    'rotate': true,
    'rotatestart': true,
    'rotatemove': true,
    'rotateend': true,
    'rotatecancel': true,
    // swipe
    'swipe': true,
    'swipeleft': true,
    'swiperight': true,
    'swipeup': true,
    'swipedown': true,
    // tap
    'tap': true,
};
class HammerGesturesPluginCommon extends event_manager_1.EventManagerPlugin {
    /**
     */
    constructor() {
        super();
    }
    /**
     * @param {?} eventName
     * @return {?}
     */
    supports(eventName) {
        eventName = eventName.toLowerCase();
        return collection_1.StringMapWrapper.contains(_eventNames, eventName);
    }
}
exports.HammerGesturesPluginCommon = HammerGesturesPluginCommon;
//# sourceMappingURL=hammer_common.js.map