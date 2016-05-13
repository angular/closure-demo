goog.module('_angular$router$src$link');
var segments_1 = goog.require('_angular$router$src$segments');
var lang_1 = goog.require('_angular$router$src$facade$lang');
var exceptions_1 = goog.require('_angular$router$src$facade$exceptions');
var collection_1 = goog.require('_angular$router$src$facade$collection');
/**
 * @param {?} segment
 * @param {?} routeTree
 * @param {?} urlTree
 * @param {?} commands
 * @return {?}
 */
function link(segment, routeTree, urlTree, commands) {
    if (commands.length === 0)
        return urlTree;
    let /** @type {?} */ normalizedCommands = _normalizeCommands(commands);
    if (_navigateToRoot(normalizedCommands)) {
        return new segments_1.UrlTree(new segments_1.TreeNode(urlTree.root, []));
    }
    let /** @type {?} */ startingNode = _findStartingNode(normalizedCommands, urlTree, segment, routeTree);
    let /** @type {?} */ updated = normalizedCommands.commands.length > 0 ?
        _updateMany(collection_1.ListWrapper.clone(startingNode.children), normalizedCommands.commands) :
        [];
    let /** @type {?} */ newRoot = _constructNewTree(segments_1.rootNode(urlTree), startingNode, updated);
    return new segments_1.UrlTree(newRoot);
}
exports.link = link;
/**
 * @param {?} normalizedChange
 * @return {?}
 */
function _navigateToRoot(normalizedChange) {
    return normalizedChange.isAbsolute && normalizedChange.commands.length === 1 &&
        normalizedChange.commands[0] == "/";
}
class _NormalizedNavigationCommands {
    /**
     * @param {?} isAbsolute
     * @param {?} numberOfDoubleDots
     * @param {?} commands
     */
    constructor(isAbsolute, numberOfDoubleDots, commands) {
        this.isAbsolute = isAbsolute;
        this.numberOfDoubleDots = numberOfDoubleDots;
        this.commands = commands;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _NormalizedNavigationCommands.prototype.isAbsolute;
        /** @type {?} */
        _NormalizedNavigationCommands.prototype.numberOfDoubleDots;
        /** @type {?} */
        _NormalizedNavigationCommands.prototype.commands;
    }
}
/**
 * @param {?} commands
 * @return {?}
 */
function _normalizeCommands(commands) {
    if (lang_1.isString(commands[0]) && commands.length === 1 && commands[0] == "/") {
        return new _NormalizedNavigationCommands(true, 0, commands);
    }
    let /** @type {?} */ numberOfDoubleDots = 0;
    let /** @type {?} */ isAbsolute = false;
    let /** @type {?} */ res = [];
    for (let /** @type {?} */ i = 0; i < commands.length; ++i) {
        let /** @type {?} */ c = commands[i];
        if (!lang_1.isString(c)) {
            res.push(c);
            continue;
        }
        let /** @type {?} */ parts = c.split('/');
        for (let /** @type {?} */ j = 0; j < parts.length; ++j) {
            let /** @type {?} */ cc = parts[j];
            // first exp is treated in a special way
            if (i == 0) {
                if (j == 0 && cc == ".") {
                }
                else if (j == 0 && cc == "") {
                    isAbsolute = true;
                }
                else if (cc == "..") {
                    numberOfDoubleDots++;
                }
                else if (cc != '') {
                    res.push(cc);
                }
            }
            else {
                if (cc != '') {
                    res.push(cc);
                }
            }
        }
    }
    return new _NormalizedNavigationCommands(isAbsolute, numberOfDoubleDots, res);
}
/**
 * @param {?} segment
 * @param {?} routeTree
 * @param {?} urlTree
 * @param {?} numberOfDoubleDots
 * @return {?}
 */
function _findUrlSegment(segment, routeTree, urlTree, numberOfDoubleDots) {
    let /** @type {?} */ s = segment;
    while (s.urlSegments.length === 0) {
        s = routeTree.parent(s);
    }
    let /** @type {?} */ urlSegment = collection_1.ListWrapper.last(s.urlSegments);
    let /** @type {?} */ path = urlTree.pathFromRoot(urlSegment);
    if (path.length <= numberOfDoubleDots) {
        throw new exceptions_1.BaseException("Invalid number of '../'");
    }
    return path[path.length - 1 - numberOfDoubleDots];
}
/**
 * @param {?} normalizedChange
 * @param {?} urlTree
 * @param {?} segment
 * @param {?} routeTree
 * @return {?}
 */
function _findStartingNode(normalizedChange, urlTree, segment, routeTree) {
    if (normalizedChange.isAbsolute) {
        return segments_1.rootNode(urlTree);
    }
    else {
        let /** @type {?} */ urlSegment = _findUrlSegment(segment, routeTree, urlTree, normalizedChange.numberOfDoubleDots);
        return _findMatchingNode(urlSegment, segments_1.rootNode(urlTree));
    }
}
/**
 * @param {?} segment
 * @param {?} node
 * @return {?}
 */
function _findMatchingNode(segment, node) {
    if (node.value === segment)
        return node;
    for (var c of node.children) {
        let /** @type {?} */ r = _findMatchingNode(segment, c);
        if (lang_1.isPresent(r))
            return r;
    }
    return null;
}
/**
 * @param {?} node
 * @param {?} original
 * @param {?} updated
 * @return {?}
 */
function _constructNewTree(node, original, updated) {
    if (node === original) {
        return new segments_1.TreeNode(node.value, updated);
    }
    else {
        return new segments_1.TreeNode(node.value, node.children.map(c => _constructNewTree(c, original, updated)));
    }
}
/**
 * @param {?} node
 * @param {?} commands
 * @return {?}
 */
function _update(node, commands) {
    let /** @type {?} */ rest = commands.slice(1);
    let /** @type {?} */ next = rest.length === 0 ? null : rest[0];
    let /** @type {?} */ outlet = _outlet(commands);
    let /** @type {?} */ segment = _segment(commands);
    // reach the end of the tree => create new tree nodes.
    if (lang_1.isBlank(node) && !lang_1.isStringMap(next)) {
        let /** @type {?} */ urlSegment = new segments_1.UrlSegment(segment, {}, outlet);
        let /** @type {?} */ children = rest.length === 0 ? [] : [_update(null, rest)];
        return new segments_1.TreeNode(urlSegment, children);
    }
    else if (lang_1.isBlank(node) && lang_1.isStringMap(next)) {
        let /** @type {?} */ urlSegment = new segments_1.UrlSegment(segment, _stringify(next), outlet);
        return _recurse(urlSegment, node, rest.slice(1));
    }
    else if (outlet != node.value.outlet) {
        return node;
    }
    else if (lang_1.isStringMap(segment)) {
        let /** @type {?} */ newSegment = new segments_1.UrlSegment(node.value.segment, _stringify(segment), node.value.outlet);
        return _recurse(newSegment, node, rest);
    }
    else if (lang_1.isStringMap(next) && _compare(segment, _stringify(next), node.value)) {
        return _recurse(node.value, node, rest.slice(1));
    }
    else if (lang_1.isStringMap(next)) {
        let /** @type {?} */ urlSegment = new segments_1.UrlSegment(segment, _stringify(next), outlet);
        return _recurse(urlSegment, node, rest.slice(1));
    }
    else if (_compare(segment, {}, node.value)) {
        return _recurse(node.value, node, rest);
    }
    else {
        let /** @type {?} */ urlSegment = new segments_1.UrlSegment(segment, {}, outlet);
        return _recurse(urlSegment, node, rest);
    }
}
/**
 * @param {?} params
 * @return {?}
 */
function _stringify(params) {
    let /** @type {?} */ res = {};
    collection_1.StringMapWrapper.forEach(params, (v, k) => res[k] = v.toString());
    return res;
}
/**
 * @param {?} path
 * @param {?} params
 * @param {?} segment
 * @return {?}
 */
function _compare(path, params, segment) {
    return path == segment.segment && collection_1.StringMapWrapper.equals(params, segment.parameters);
}
/**
 * @param {?} urlSegment
 * @param {?} node
 * @param {?} rest
 * @return {?}
 */
function _recurse(urlSegment, node, rest) {
    if (rest.length === 0) {
        return new segments_1.TreeNode(urlSegment, []);
    }
    return new segments_1.TreeNode(urlSegment, _updateMany(collection_1.ListWrapper.clone(node.children), rest));
}
/**
 * @param {?} nodes
 * @param {?} commands
 * @return {?}
 */
function _updateMany(nodes, commands) {
    let /** @type {?} */ outlet = _outlet(commands);
    let /** @type {?} */ nodesInRightOutlet = nodes.filter(c => c.value.outlet == outlet);
    if (nodesInRightOutlet.length > 0) {
        let /** @type {?} */ nodeRightOutlet = nodesInRightOutlet[0]; // there can be only one
        nodes[nodes.indexOf(nodeRightOutlet)] = _update(nodeRightOutlet, commands);
    }
    else {
        nodes.push(_update(null, commands));
    }
    return nodes;
}
/**
 * @param {?} commands
 * @return {?}
 */
function _segment(commands) {
    if (!lang_1.isString(commands[0]))
        return commands[0];
    let /** @type {?} */ parts = commands[0].toString().split(":");
    return parts.length > 1 ? parts[1] : commands[0];
}
/**
 * @param {?} commands
 * @return {?}
 */
function _outlet(commands) {
    if (!lang_1.isString(commands[0]))
        return null;
    let /** @type {?} */ parts = commands[0].toString().split(":");
    return parts.length > 1 ? parts[0] : null;
}
//# sourceMappingURL=link.js.map