goog.module('_angular$platform_browser$src$dom$events$key__events');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$platform_browser$src$facade$lang');
var collection_1 = goog.require('_angular$platform_browser$src$facade$collection');
var dom_adapter_1 = goog.require('_angular$platform_browser$src$dom$dom__adapter');
var event_manager_1 = goog.require('_angular$platform_browser$src$dom$events$event__manager');
var /** @type {?} */ modifierKeys = ['alt', 'control', 'meta', 'shift'];
var /** @type {?} */ modifierKeyGetters = {
    'alt': (event) => event.altKey,
    'control': (event) => event.ctrlKey,
    'meta': (event) => event.metaKey,
    'shift': (event) => event.shiftKey
};
class KeyEventsPlugin extends event_manager_1.EventManagerPlugin {
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
        return lang_1.isPresent(KeyEventsPlugin.parseEventName(eventName));
    }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addEventListener(element, eventName, handler) {
        var /** @type {?} */ parsedEvent = KeyEventsPlugin.parseEventName(eventName);
        var /** @type {?} */ outsideHandler = KeyEventsPlugin.eventCallback(element, collection_1.StringMapWrapper.get(parsedEvent, 'fullKey'), handler, this.manager.getZone());
        return this.manager.getZone().runOutsideAngular(() => {
            return dom_adapter_1.getDOM().onAndCancel(element, collection_1.StringMapWrapper.get(parsedEvent, 'domEventName'), outsideHandler);
        });
    }
    /**
     * @param {?} eventName
     * @return {?}
     */
    static parseEventName(eventName) {
        var /** @type {?} */ parts = eventName.toLowerCase().split('.');
        var /** @type {?} */ domEventName = parts.shift();
        if ((parts.length === 0) ||
            !(lang_1.StringWrapper.equals(domEventName, 'keydown') ||
                lang_1.StringWrapper.equals(domEventName, 'keyup'))) {
            return null;
        }
        var /** @type {?} */ key = KeyEventsPlugin._normalizeKey(parts.pop());
        var /** @type {?} */ fullKey = '';
        modifierKeys.forEach(modifierName => {
            if (collection_1.ListWrapper.contains(parts, modifierName)) {
                collection_1.ListWrapper.remove(parts, modifierName);
                fullKey += modifierName + '.';
            }
        });
        fullKey += key;
        if (parts.length != 0 || key.length === 0) {
            // returning null instead of throwing to let another plugin process the event
            return null;
        }
        var /** @type {?} */ result = collection_1.StringMapWrapper.create();
        collection_1.StringMapWrapper.set(result, 'domEventName', domEventName);
        collection_1.StringMapWrapper.set(result, 'fullKey', fullKey);
        return result;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    static getEventFullKey(event) {
        var /** @type {?} */ fullKey = '';
        var /** @type {?} */ key = dom_adapter_1.getDOM().getEventKey(event);
        key = key.toLowerCase();
        if (lang_1.StringWrapper.equals(key, ' ')) {
            key = 'space'; // for readability
        }
        else if (lang_1.StringWrapper.equals(key, '.')) {
            key = 'dot'; // because '.' is used as a separator in event names
        }
        modifierKeys.forEach(modifierName => {
            if (modifierName != key) {
                var /** @type {?} */ modifierGetter = collection_1.StringMapWrapper.get(modifierKeyGetters, modifierName);
                if (modifierGetter(event)) {
                    fullKey += modifierName + '.';
                }
            }
        });
        fullKey += key;
        return fullKey;
    }
    /**
     * @param {?} element
     * @param {?} fullKey
     * @param {?} handler
     * @param {?} zone
     * @return {?}
     */
    static eventCallback(element, fullKey, handler, zone) {
        return (event) => {
            if (lang_1.StringWrapper.equals(KeyEventsPlugin.getEventFullKey(event), fullKey)) {
                zone.runGuarded(() => handler(event));
            }
        };
    }
    /**
     * @internal
     * @param {?} keyName
     * @return {?}
     */
    static _normalizeKey(keyName) {
        // TODO: switch to a StringMap if the mapping grows too much
        switch (keyName) {
            case 'esc':
                return 'escape';
            default:
                return keyName;
        }
    }
}
KeyEventsPlugin.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ KeyEventsPlugin.ctorParameters = [];
exports.KeyEventsPlugin = KeyEventsPlugin;
//# sourceMappingURL=key_events.js.map