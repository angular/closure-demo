goog.module('_angular$core$src$debug$debug__node');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var collection_1 = goog.require('_angular$core$src$facade$collection');
class EventListener {
    /**
     * @param {?} name
     * @param {?} callback
     */
    constructor(name, callback) {
        this.name = name;
        this.callback = callback;
    }
    ;
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        EventListener.prototype.name;
        /** @type {?} */
        EventListener.prototype.callback;
    }
}
exports.EventListener = EventListener;
class DebugNode {
    /**
     * @param {?} nativeNode
     * @param {?} parent
     * @param {?} _debugInfo
     */
    constructor(nativeNode, parent, _debugInfo) {
        this._debugInfo = _debugInfo;
        this.nativeNode = nativeNode;
        if (lang_1.isPresent(parent) && parent instanceof DebugElement) {
            parent.addChild(this);
        }
        else {
            this.parent = null;
        }
        this.listeners = [];
    }
    get injector() { return lang_1.isPresent(this._debugInfo) ? this._debugInfo.injector : null; }
    get componentInstance() {
        return lang_1.isPresent(this._debugInfo) ? this._debugInfo.component : null;
    }
    get context() { return lang_1.isPresent(this._debugInfo) ? this._debugInfo.context : null; }
    get references() {
        return lang_1.isPresent(this._debugInfo) ? this._debugInfo.references : null;
    }
    get providerTokens() {
        return lang_1.isPresent(this._debugInfo) ? this._debugInfo.providerTokens : null;
    }
    get source() { return lang_1.isPresent(this._debugInfo) ? this._debugInfo.source : null; }
    /**
     *  Use injector.get(token) instead. *
     * @deprecated
     * @param {?} token
     * @return {?}
     */
    inject(token) { return this.injector.get(token); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DebugNode.prototype.nativeNode;
        /** @type {?} */
        DebugNode.prototype.listeners;
        /** @type {?} */
        DebugNode.prototype.parent;
        /** @type {?} */
        DebugNode.prototype._debugInfo;
    }
}
exports.DebugNode = DebugNode;
class DebugElement extends DebugNode {
    /**
     * @param {?} nativeNode
     * @param {?} parent
     * @param {?} _debugInfo
     */
    constructor(nativeNode, parent, _debugInfo) {
        super(nativeNode, parent, _debugInfo);
        this.properties = {};
        this.attributes = {};
        this.childNodes = [];
        this.nativeElement = nativeNode;
    }
    /**
     * @param {?} child
     * @return {?}
     */
    addChild(child) {
        if (lang_1.isPresent(child)) {
            this.childNodes.push(child);
            child.parent = this;
        }
    }
    /**
     * @param {?} child
     * @return {?}
     */
    removeChild(child) {
        var /** @type {?} */ childIndex = this.childNodes.indexOf(child);
        if (childIndex !== -1) {
            child.parent = null;
            this.childNodes.splice(childIndex, 1);
        }
    }
    /**
     * @param {?} child
     * @param {?} newChildren
     * @return {?}
     */
    insertChildrenAfter(child, newChildren) {
        var /** @type {?} */ siblingIndex = this.childNodes.indexOf(child);
        if (siblingIndex !== -1) {
            var /** @type {?} */ previousChildren = this.childNodes.slice(0, siblingIndex + 1);
            var /** @type {?} */ nextChildren = this.childNodes.slice(siblingIndex + 1);
            this.childNodes =
                collection_1.ListWrapper.concat(collection_1.ListWrapper.concat(previousChildren, newChildren), nextChildren);
            for (var /** @type {?} */ i = 0; i < newChildren.length; ++i) {
                var /** @type {?} */ newChild = newChildren[i];
                if (lang_1.isPresent(newChild.parent)) {
                    newChild.parent.removeChild(newChild);
                }
                newChild.parent = this;
            }
        }
    }
    /**
     * @param {?} predicate
     * @return {?}
     */
    query(predicate) {
        var /** @type {?} */ results = this.queryAll(predicate);
        return results.length > 0 ? results[0] : null;
    }
    /**
     * @param {?} predicate
     * @return {?}
     */
    queryAll(predicate) {
        var /** @type {?} */ matches = [];
        _queryElementChildren(this, predicate, matches);
        return matches;
    }
    /**
     * @param {?} predicate
     * @return {?}
     */
    queryAllNodes(predicate) {
        var /** @type {?} */ matches = [];
        _queryNodeChildren(this, predicate, matches);
        return matches;
    }
    get children() {
        var /** @type {?} */ children = [];
        this.childNodes.forEach((node) => {
            if (node instanceof DebugElement) {
                children.push(node);
            }
        });
        return children;
    }
    /**
     * @param {?} eventName
     * @param {?} eventObj
     * @return {?}
     */
    triggerEventHandler(eventName, eventObj) {
        this.listeners.forEach((listener) => {
            if (listener.name == eventName) {
                listener.callback(eventObj);
            }
        });
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DebugElement.prototype.name;
        /** @type {?} */
        DebugElement.prototype.properties;
        /** @type {?} */
        DebugElement.prototype.attributes;
        /** @type {?} */
        DebugElement.prototype.childNodes;
        /** @type {?} */
        DebugElement.prototype.nativeElement;
    }
}
exports.DebugElement = DebugElement;
/**
 * @param {?} debugEls
 * @return {?}
 */
function asNativeElements(debugEls) {
    return debugEls.map((el) => el.nativeElement);
}
exports.asNativeElements = asNativeElements;
/**
 * @param {?} element
 * @param {?} predicate
 * @param {?} matches
 * @return {?}
 */
function _queryElementChildren(element, predicate, matches) {
    element.childNodes.forEach(node => {
        if (node instanceof DebugElement) {
            if (predicate(node)) {
                matches.push(node);
            }
            _queryElementChildren(node, predicate, matches);
        }
    });
}
/**
 * @param {?} parentNode
 * @param {?} predicate
 * @param {?} matches
 * @return {?}
 */
function _queryNodeChildren(parentNode, predicate, matches) {
    if (parentNode instanceof DebugElement) {
        parentNode.childNodes.forEach(node => {
            if (predicate(node)) {
                matches.push(node);
            }
            if (node instanceof DebugElement) {
                _queryNodeChildren(node, predicate, matches);
            }
        });
    }
}
// Need to keep the nodes in a global Map so that multiple angular apps are supported.
var /** @type {?} */ _nativeNodeToDebugNode = new Map();
/**
 * @param {?} nativeNode
 * @return {?}
 */
function getDebugNode(nativeNode) {
    return _nativeNodeToDebugNode.get(nativeNode);
}
exports.getDebugNode = getDebugNode;
/**
 * @return {?}
 */
function getAllDebugNodes() {
    return collection_1.MapWrapper.values(_nativeNodeToDebugNode);
}
exports.getAllDebugNodes = getAllDebugNodes;
/**
 * @param {?} node
 * @return {?}
 */
function indexDebugNode(node) {
    _nativeNodeToDebugNode.set(node.nativeNode, node);
}
exports.indexDebugNode = indexDebugNode;
/**
 * @param {?} node
 * @return {?}
 */
function removeDebugNodeFromIndex(node) {
    _nativeNodeToDebugNode.delete(node.nativeNode);
}
exports.removeDebugNodeFromIndex = removeDebugNodeFromIndex;
//# sourceMappingURL=debug_node.js.map