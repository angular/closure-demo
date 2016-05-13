goog.module('_angular$router$src$segments');
var collection_1 = goog.require('_angular$router$src$facade$collection');
var lang_1 = goog.require('_angular$router$src$facade$lang');
var constants_1 = goog.require('_angular$router$src$constants');
class Tree {
    /**
     * @param {?} root
     */
    constructor(root) {
        this._root = root;
    }
    get root() { return this._root.value; }
    /**
     * @param {?} t
     * @return {?}
     */
    parent(t) {
        let /** @type {?} */ p = this.pathFromRoot(t);
        return p.length > 1 ? p[p.length - 2] : null;
    }
    /**
     * @param {?} t
     * @return {?}
     */
    children(t) {
        let /** @type {?} */ n = _findNode(t, this._root);
        return lang_1.isPresent(n) ? n.children.map(t => t.value) : null;
    }
    /**
     * @param {?} t
     * @return {?}
     */
    firstChild(t) {
        let /** @type {?} */ n = _findNode(t, this._root);
        return lang_1.isPresent(n) && n.children.length > 0 ? n.children[0].value : null;
    }
    /**
     * @param {?} t
     * @return {?}
     */
    pathFromRoot(t) { return _findPath(t, this._root, []).map(s => s.value); }
    /**
     * @param {?} tree
     * @return {?}
     */
    contains(tree) { return _contains(this._root, tree._root); }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        Tree.prototype._root;
    }
}
exports.Tree = Tree;
class UrlTree extends Tree {
    /**
     * @param {?} root
     */
    constructor(root) {
        super(root);
    }
}
exports.UrlTree = UrlTree;
class RouteTree extends Tree {
    /**
     * @param {?} root
     */
    constructor(root) {
        super(root);
    }
}
exports.RouteTree = RouteTree;
/**
 * @param {?} tree
 * @return {?}
 */
function rootNode(tree) {
    return tree._root;
}
exports.rootNode = rootNode;
/**
 * @param {?} expected
 * @param {?} c
 * @return {?}
 */
function _findNode(expected, c) {
    if (expected === c.value)
        return c;
    for (let cc of c.children) {
        let /** @type {?} */ r = _findNode(expected, cc);
        if (lang_1.isPresent(r))
            return r;
    }
    return null;
}
/**
 * @param {?} expected
 * @param {?} c
 * @param {?} collected
 * @return {?}
 */
function _findPath(expected, c, collected) {
    collected.push(c);
    if (expected === c.value)
        return collected;
    for (let cc of c.children) {
        let /** @type {?} */ r = _findPath(expected, cc, collection_1.ListWrapper.clone(collected));
        if (lang_1.isPresent(r))
            return r;
    }
    return null;
}
/**
 * @param {?} tree
 * @param {?} subtree
 * @return {?}
 */
function _contains(tree, subtree) {
    if (tree.value !== subtree.value)
        return false;
    for (let subtreeNode of subtree.children) {
        let /** @type {?} */ s = tree.children.filter(child => child.value === subtreeNode.value);
        if (s.length === 0)
            return false;
        if (!_contains(s[0], subtreeNode))
            return false;
    }
    return true;
}
class TreeNode {
    /**
     * @param {?} value
     * @param {?} children
     */
    constructor(value, children) {
        this.value = value;
        this.children = children;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TreeNode.prototype.value;
        /** @type {?} */
        TreeNode.prototype.children;
    }
}
exports.TreeNode = TreeNode;
class UrlSegment {
    /**
     * @param {?} segment
     * @param {?} parameters
     * @param {?} outlet
     */
    constructor(segment, parameters, outlet) {
        this.segment = segment;
        this.parameters = parameters;
        this.outlet = outlet;
    }
    /**
     * @return {?}
     */
    toString() {
        let /** @type {?} */ outletPrefix = lang_1.isBlank(this.outlet) ? "" : `${this.outlet}:`;
        return `${outletPrefix}${this.segment}${_serializeParams(this.parameters)}`;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        UrlSegment.prototype.segment;
        /** @type {?} */
        UrlSegment.prototype.parameters;
        /** @type {?} */
        UrlSegment.prototype.outlet;
    }
}
exports.UrlSegment = UrlSegment;
/**
 * @param {?} params
 * @return {?}
 */
function _serializeParams(params) {
    let /** @type {?} */ res = "";
    collection_1.StringMapWrapper.forEach(params, (v, k) => res += `;${k}=${v}`);
    return res;
}
class RouteSegment {
    /**
     * @param {?} urlSegments
     * @param {?} parameters
     * @param {?} outlet
     * @param {?} type
     * @param {?} componentFactory
     */
    constructor(urlSegments, parameters, outlet, type, componentFactory) {
        this.urlSegments = urlSegments;
        this.parameters = parameters;
        this.outlet = outlet;
        this._type = type;
        this._componentFactory = componentFactory;
    }
    /**
     * @param {?} param
     * @return {?}
     */
    getParam(param) {
        return lang_1.isPresent(this.parameters) ? this.parameters[param] : null;
    }
    /**
     * @param {?} param
     * @return {?}
     */
    getParamAsNumber(param) {
        return lang_1.isPresent(this.parameters) ? lang_1.NumberWrapper.parseFloat(this.parameters[param]) : null;
    }
    get type() { return this._type; }
    get stringifiedUrlSegments() { return this.urlSegments.map(s => s.toString()).join("/"); }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        RouteSegment.prototype._type;
        /** @internal
        @type {?} */
        RouteSegment.prototype._componentFactory;
        /** @type {?} */
        RouteSegment.prototype.urlSegments;
        /** @type {?} */
        RouteSegment.prototype.parameters;
        /** @type {?} */
        RouteSegment.prototype.outlet;
    }
}
exports.RouteSegment = RouteSegment;
/**
 * @param {?} type
 * @return {?}
 */
function createEmptyRouteTree(type) {
    let /** @type {?} */ root = new RouteSegment([new UrlSegment("", {}, null)], {}, constants_1.DEFAULT_OUTLET_NAME, type, null);
    return new RouteTree(new TreeNode(root, []));
}
exports.createEmptyRouteTree = createEmptyRouteTree;
/**
 * @param {?} tree
 * @return {?}
 */
function serializeRouteSegmentTree(tree) {
    return _serializeRouteSegmentTree(tree._root);
}
exports.serializeRouteSegmentTree = serializeRouteSegmentTree;
/**
 * @param {?} node
 * @return {?}
 */
function _serializeRouteSegmentTree(node) {
    let /** @type {?} */ v = node.value;
    let /** @type {?} */ children = node.children.map(c => _serializeRouteSegmentTree(c)).join(", ");
    return `${v.outlet}:${v.stringifiedUrlSegments}(${lang_1.stringify(v.type)}) [${children}]`;
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function equalUrlSegments(a, b) {
    if (a.length !== b.length)
        return false;
    for (let /** @type {?} */ i = 0; i < a.length; ++i) {
        if (a[i].segment != b[i].segment)
            return false;
        if (a[i].outlet != b[i].outlet)
            return false;
        if (!collection_1.StringMapWrapper.equals(a[i].parameters, b[i].parameters))
            return false;
    }
    return true;
}
exports.equalUrlSegments = equalUrlSegments;
/**
 * @param {?} a
 * @return {?}
 */
function routeSegmentComponentFactory(a) {
    return a._componentFactory;
}
exports.routeSegmentComponentFactory = routeSegmentComponentFactory;
//# sourceMappingURL=segments.js.map