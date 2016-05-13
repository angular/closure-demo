goog.module('_angular$platform_browser$src$dom$events$dom__events');
var core_1 = goog.require('_angular$core');
var dom_adapter_1 = goog.require('_angular$platform_browser$src$dom$dom__adapter');
var event_manager_1 = goog.require('_angular$platform_browser$src$dom$events$event__manager');
class DomEventsPlugin extends event_manager_1.EventManagerPlugin {
    /**
     * @param {?} eventName
     * @return {?}
     */
    supports(eventName) { return true; }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addEventListener(element, eventName, handler) {
        var /** @type {?} */ zone = this.manager.getZone();
        var /** @type {?} */ outsideHandler = (event) => zone.runGuarded(() => handler(event));
        return this.manager.getZone().runOutsideAngular(() => dom_adapter_1.getDOM().onAndCancel(element, eventName, outsideHandler));
    }
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addGlobalEventListener(target, eventName, handler) {
        var /** @type {?} */ element = dom_adapter_1.getDOM().getGlobalEventTarget(target);
        var /** @type {?} */ zone = this.manager.getZone();
        var /** @type {?} */ outsideHandler = (event) => zone.runGuarded(() => handler(event));
        return this.manager.getZone().runOutsideAngular(() => dom_adapter_1.getDOM().onAndCancel(element, eventName, outsideHandler));
    }
}
DomEventsPlugin.decorators = [
    { type: core_1.Injectable },
];
exports.DomEventsPlugin = DomEventsPlugin;
//# sourceMappingURL=dom_events.js.map