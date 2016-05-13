goog.module('_angular$platform_browser$src$dom$events$event__manager');
var core_1 = goog.require('_angular$core');
var exceptions_1 = goog.require('_angular$platform_browser$src$facade$exceptions');
var collection_1 = goog.require('_angular$platform_browser$src$facade$collection');
exports.EVENT_MANAGER_PLUGINS = 
/*@ts2dart_const*/ new core_1.OpaqueToken("EventManagerPlugins");
class EventManager {
    /**
     * @param {?} plugins
     * @param {?} _zone
     */
    constructor(plugins, _zone) {
        this._zone = _zone;
        plugins.forEach(p => p.manager = this);
        this._plugins = collection_1.ListWrapper.reversed(plugins);
    }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addEventListener(element, eventName, handler) {
        var /** @type {?} */ plugin = this._findPluginFor(eventName);
        return plugin.addEventListener(element, eventName, handler);
    }
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addGlobalEventListener(target, eventName, handler) {
        var /** @type {?} */ plugin = this._findPluginFor(eventName);
        return plugin.addGlobalEventListener(target, eventName, handler);
    }
    /**
     * @return {?}
     */
    getZone() { return this._zone; }
    /**
     * @internal
     * @param {?} eventName
     * @return {?}
     */
    _findPluginFor(eventName) {
        var /** @type {?} */ plugins = this._plugins;
        for (var /** @type {?} */ i = 0; i < plugins.length; i++) {
            var /** @type {?} */ plugin = plugins[i];
            if (plugin.supports(eventName)) {
                return plugin;
            }
        }
        throw new exceptions_1.BaseException(`No event manager plugin found for event ${eventName}`);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        EventManager.prototype._plugins;
        /** @type {?} */
        EventManager.prototype._zone;
    }
}
EventManager.decorators = [
    { type: core_1.Injectable },
];
EventManager.ctorParameters = [
    { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.EVENT_MANAGER_PLUGINS,] },] },
    { type: core_1.NgZone, },
];
exports.EventManager = EventManager;
class EventManagerPlugin {
    /**
     * @param {?} eventName
     * @return {?}
     */
    supports(eventName) { return false; }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addEventListener(element, eventName, handler) {
        throw "not implemented";
    }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addGlobalEventListener(element, eventName, handler) {
        throw "not implemented";
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        EventManagerPlugin.prototype.manager;
    }
}
exports.EventManagerPlugin = EventManagerPlugin;
//# sourceMappingURL=event_manager.js.map