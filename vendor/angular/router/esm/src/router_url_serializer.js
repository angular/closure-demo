goog.module('_angular$router$src$router__url__serializer');
var segments_1 = goog.require('_angular$router$src$segments');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$router$src$facade$lang');
/**
 * Defines a way to serialize/deserialize a url tree.
 */
class RouterUrlSerializer {
}
exports.RouterUrlSerializer = RouterUrlSerializer;
/**
 * A default implementation of the serialization.
 */
class DefaultRouterUrlSerializer extends RouterUrlSerializer {
    /**
     * @param {?} url
     * @return {?}
     */
    parse(url) {
        let /** @type {?} */ root = new _UrlParser().parse(url);
        return new segments_1.UrlTree(root);
    }
    /**
     * @param {?} tree
     * @return {?}
     */
    serialize(tree) { return _serializeUrlTreeNode(segments_1.rootNode(tree)); }
}
exports.DefaultRouterUrlSerializer = DefaultRouterUrlSerializer;
/**
 * @param {?} node
 * @return {?}
 */
function _serializeUrlTreeNode(node) {
    return `${node.value}${_serializeChildren(node)}`;
}
/**
 * @param {?} nodes
 * @return {?}
 */
function _serializeUrlTreeNodes(nodes) {
    let /** @type {?} */ main = nodes[0].value.toString();
    let /** @type {?} */ auxNodes = nodes.slice(1);
    let /** @type {?} */ aux = auxNodes.length > 0 ? `(${auxNodes.map(_serializeUrlTreeNode).join("//")})` : "";
    let /** @type {?} */ children = _serializeChildren(nodes[0]);
    return `${main}${aux}${children}`;
}
/**
 * @param {?} node
 * @return {?}
 */
function _serializeChildren(node) {
    if (node.children.length > 0) {
        return `/${_serializeUrlTreeNodes(node.children)}`;
    }
    else {
        return "";
    }
}
var /** @type {?} */ SEGMENT_RE = lang_1.RegExpWrapper.create('^[^\\/\\(\\)\\?;=&#]+');
/**
 * @param {?} str
 * @return {?}
 */
function matchUrlSegment(str) {
    var /** @type {?} */ match = lang_1.RegExpWrapper.firstMatch(SEGMENT_RE, str);
    return lang_1.isPresent(match) ? match[0] : '';
}
var /** @type {?} */ QUERY_PARAM_VALUE_RE = lang_1.RegExpWrapper.create('^[^\\(\\)\\?;&#]+');
/**
 * @param {?} str
 * @return {?}
 */
function matchUrlQueryParamValue(str) {
    var /** @type {?} */ match = lang_1.RegExpWrapper.firstMatch(QUERY_PARAM_VALUE_RE, str);
    return lang_1.isPresent(match) ? match[0] : '';
}
class _UrlParser {
    /**
     * @param {?} str
     * @return {?}
     */
    peekStartsWith(str) { return this._remaining.startsWith(str); }
    /**
     * @param {?} str
     * @return {?}
     */
    capture(str) {
        if (!this._remaining.startsWith(str)) {
            throw new core_1.BaseException(`Expected "${str}".`);
        }
        this._remaining = this._remaining.substring(str.length);
    }
    /**
     * @param {?} url
     * @return {?}
     */
    parse(url) {
        this._remaining = url;
        if (url == '' || url == '/') {
            return new segments_1.TreeNode(new segments_1.UrlSegment('', {}, null), []);
        }
        else {
            return this.parseRoot();
        }
    }
    /**
     * @return {?}
     */
    parseRoot() {
        let /** @type {?} */ segments = this.parseSegments();
        return new segments_1.TreeNode(new segments_1.UrlSegment('', {}, null), segments);
    }
    /**
     * @param {?=} outletName
     * @return {?}
     */
    parseSegments(outletName = null) {
        if (this._remaining.length == 0) {
            return [];
        }
        if (this.peekStartsWith('/')) {
            this.capture('/');
        }
        var /** @type {?} */ path = matchUrlSegment(this._remaining);
        this.capture(path);
        if (path.indexOf(":") > -1) {
            let /** @type {?} */ parts = path.split(":");
            outletName = parts[0];
            path = parts[1];
        }
        var /** @type {?} */ matrixParams = {};
        if (this.peekStartsWith(';')) {
            matrixParams = this.parseMatrixParams();
        }
        var /** @type {?} */ aux = [];
        if (this.peekStartsWith('(')) {
            aux = this.parseAuxiliaryRoutes();
        }
        var /** @type {?} */ children = [];
        if (this.peekStartsWith('/') && !this.peekStartsWith('//')) {
            this.capture('/');
            children = this.parseSegments();
        }
        let /** @type {?} */ segment = new segments_1.UrlSegment(path, matrixParams, outletName);
        let /** @type {?} */ node = new segments_1.TreeNode(segment, children);
        return [node].concat(aux);
    }
    /**
     * @return {?}
     */
    parseQueryParams() {
        var /** @type {?} */ params = {};
        this.capture('?');
        this.parseQueryParam(params);
        while (this._remaining.length > 0 && this.peekStartsWith('&')) {
            this.capture('&');
            this.parseQueryParam(params);
        }
        return params;
    }
    /**
     * @return {?}
     */
    parseMatrixParams() {
        var /** @type {?} */ params = {};
        while (this._remaining.length > 0 && this.peekStartsWith(';')) {
            this.capture(';');
            this.parseParam(params);
        }
        return params;
    }
    /**
     * @param {?} params
     * @return {?}
     */
    parseParam(params) {
        var /** @type {?} */ key = matchUrlSegment(this._remaining);
        if (lang_1.isBlank(key)) {
            return;
        }
        this.capture(key);
        var /** @type {?} */ value = "true";
        if (this.peekStartsWith('=')) {
            this.capture('=');
            var /** @type {?} */ valueMatch = matchUrlSegment(this._remaining);
            if (lang_1.isPresent(valueMatch)) {
                value = valueMatch;
                this.capture(value);
            }
        }
        params[key] = value;
    }
    /**
     * @param {?} params
     * @return {?}
     */
    parseQueryParam(params) {
        var /** @type {?} */ key = matchUrlSegment(this._remaining);
        if (lang_1.isBlank(key)) {
            return;
        }
        this.capture(key);
        var /** @type {?} */ value = "true";
        if (this.peekStartsWith('=')) {
            this.capture('=');
            var /** @type {?} */ valueMatch = matchUrlQueryParamValue(this._remaining);
            if (lang_1.isPresent(valueMatch)) {
                value = valueMatch;
                this.capture(value);
            }
        }
        params[key] = value;
    }
    /**
     * @return {?}
     */
    parseAuxiliaryRoutes() {
        var /** @type {?} */ segments = [];
        this.capture('(');
        while (!this.peekStartsWith(')') && this._remaining.length > 0) {
            segments = segments.concat(this.parseSegments("aux"));
            if (this.peekStartsWith('//')) {
                this.capture('//');
            }
        }
        this.capture(')');
        return segments;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _UrlParser.prototype._remaining;
    }
}
//# sourceMappingURL=router_url_serializer.js.map