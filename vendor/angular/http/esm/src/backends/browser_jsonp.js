goog.module('_angular$http$src$backends$browser__jsonp');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$http$src$facade$lang');
let /** @type {?} */ _nextRequestId = 0;
exports.JSONP_HOME = '__ng_jsonp__';
var /** @type {?} */ _jsonpConnections = null;
/**
 * @return {?}
 */
function _getJsonpConnections() {
    if (_jsonpConnections === null) {
        _jsonpConnections = ((lang_1.global))[exports.JSONP_HOME] = {};
    }
    return _jsonpConnections;
}
class BrowserJsonp {
    /**
     * @param {?} url
     * @return {?}
     */
    build(url) {
        let /** @type {?} */ node = document.createElement('script');
        node.src = url;
        return node;
    }
    /**
     * @return {?}
     */
    nextRequestID() { return `__req${_nextRequestId++}`; }
    /**
     * @param {?} id
     * @return {?}
     */
    requestCallback(id) { return `${exports.JSONP_HOME}.${id}.finished`; }
    /**
     * @param {?} id
     * @param {?} connection
     * @return {?}
     */
    exposeConnection(id, connection) {
        let /** @type {?} */ connections = _getJsonpConnections();
        connections[id] = connection;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    removeConnection(id) {
        var /** @type {?} */ connections = _getJsonpConnections();
        connections[id] = null;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    send(node) { document.body.appendChild(/** @type {?} */ ((node))); }
    /**
     * @param {?} node
     * @return {?}
     */
    cleanup(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(/** @type {?} */ ((node)));
        }
    }
}
BrowserJsonp.decorators = [
    { type: core_1.Injectable },
];
exports.BrowserJsonp = BrowserJsonp;
//# sourceMappingURL=browser_jsonp.js.map