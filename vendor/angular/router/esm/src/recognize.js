goog.module('_angular$router$src$recognize');
var segments_1 = goog.require('_angular$router$src$segments');
var metadata_1 = goog.require('_angular$router$src$metadata$metadata');
var lang_1 = goog.require('_angular$router$src$facade$lang');
var collection_1 = goog.require('_angular$router$src$facade$collection');
var promise_1 = goog.require('_angular$router$src$facade$promise');
var core_1 = goog.require('_angular$core');
var constants_1 = goog.require('_angular$router$src$constants');
var core_2 = core_1;
/**
 * @param {?} componentResolver
 * @param {?} rootComponent
 * @param {?} url
 * @param {?} existingTree
 * @return {?}
 */
function recognize(componentResolver, rootComponent, url, existingTree) {
    let /** @type {?} */ matched = new _MatchResult(rootComponent, [url.root], {}, segments_1.rootNode(url).children, []);
    return _constructSegment(componentResolver, matched, segments_1.rootNode(existingTree))
        .then(roots => new segments_1.RouteTree(roots[0]));
}
exports.recognize = recognize;
/**
 * @param {?} componentResolver
 * @param {?} parentComponent
 * @param {?} url
 * @param {?} existingSegments
 * @return {?}
 */
function _recognize(componentResolver, parentComponent, url, existingSegments) {
    let /** @type {?} */ metadata = _readMetadata(parentComponent); // should read from the factory instead
    if (lang_1.isBlank(metadata)) {
        throw new core_1.BaseException(`Component '${lang_1.stringify(parentComponent)}' does not have route configuration`);
    }
    let /** @type {?} */ match;
    try {
        match = _match(metadata, url);
    }
    catch (e) {
        return promise_1.PromiseWrapper.reject(e, null);
    }
    let /** @type {?} */ segmentsWithRightOutlet = existingSegments.filter(r => r.value.outlet == match.outlet);
    let /** @type {?} */ segmentWithRightOutlet = segmentsWithRightOutlet.length > 0 ? segmentsWithRightOutlet[0] : null;
    let /** @type {?} */ main = _constructSegment(componentResolver, match, segmentWithRightOutlet);
    let /** @type {?} */ aux = _recognizeMany(componentResolver, parentComponent, match.aux, existingSegments)
        .then(_checkOutletNameUniqueness);
    return promise_1.PromiseWrapper.all([main, aux]).then(collection_1.ListWrapper.flatten);
}
/**
 * @param {?} componentResolver
 * @param {?} parentComponent
 * @param {?} urls
 * @param {?} existingSegments
 * @return {?}
 */
function _recognizeMany(componentResolver, parentComponent, urls, existingSegments) {
    let /** @type {?} */ recognized = urls.map(u => _recognize(componentResolver, parentComponent, u, existingSegments));
    return promise_1.PromiseWrapper.all(recognized).then(collection_1.ListWrapper.flatten);
}
/**
 * @param {?} componentResolver
 * @param {?} matched
 * @param {?} existingSegment
 * @return {?}
 */
function _constructSegment(componentResolver, matched, existingSegment) {
    return componentResolver.resolveComponent(matched.component)
        .then(factory => {
        let /** @type {?} */ segment = _createOrReuseSegment(matched, factory, existingSegment);
        let /** @type {?} */ existingChildren = lang_1.isPresent(existingSegment) ? existingSegment.children : [];
        if (matched.leftOverUrl.length > 0) {
            return _recognizeMany(componentResolver, factory.componentType, matched.leftOverUrl, existingChildren)
                .then(children => [new segments_1.TreeNode(segment, children)]);
        }
        else {
            return _recognizeLeftOvers(componentResolver, factory.componentType, existingChildren)
                .then(children => [new segments_1.TreeNode(segment, children)]);
        }
    });
}
/**
 * @param {?} matched
 * @param {?} factory
 * @param {?} segmentNode
 * @return {?}
 */
function _createOrReuseSegment(matched, factory, segmentNode) {
    let /** @type {?} */ segment = lang_1.isPresent(segmentNode) ? segmentNode.value : null;
    if (lang_1.isPresent(segment) && segments_1.equalUrlSegments(segment.urlSegments, matched.consumedUrlSegments) &&
        collection_1.StringMapWrapper.equals(segment.parameters, matched.parameters) &&
        segment.outlet == matched.outlet && factory.componentType == segment.type) {
        return segment;
    }
    else {
        return new segments_1.RouteSegment(matched.consumedUrlSegments, matched.parameters, matched.outlet, factory.componentType, factory);
    }
}
/**
 * @param {?} componentResolver
 * @param {?} parentComponent
 * @param {?} existingSegments
 * @return {?}
 */
function _recognizeLeftOvers(componentResolver, parentComponent, existingSegments) {
    return componentResolver.resolveComponent(parentComponent)
        .then(factory => {
        let /** @type {?} */ metadata = _readMetadata(factory.componentType);
        if (lang_1.isBlank(metadata)) {
            return [];
        }
        let /** @type {?} */ r = ((metadata.routes)).filter(r => r.path == "" || r.path == "/");
        if (r.length === 0) {
            return promise_1.PromiseWrapper.resolve([]);
        }
        else {
            let /** @type {?} */ segmentsWithMatchingOutlet = existingSegments.filter(r => r.value.outlet == constants_1.DEFAULT_OUTLET_NAME);
            let /** @type {?} */ segmentWithMatchingOutlet = segmentsWithMatchingOutlet.length > 0 ? segmentsWithMatchingOutlet[0] : null;
            let /** @type {?} */ existingChildren = lang_1.isPresent(segmentWithMatchingOutlet) ? segmentWithMatchingOutlet.children : [];
            return _recognizeLeftOvers(componentResolver, r[0].component, existingChildren)
                .then(children => {
                return componentResolver.resolveComponent(r[0].component)
                    .then(factory => {
                    let /** @type {?} */ segment = _createOrReuseSegment(new _MatchResult(r[0].component, [], {}, [], []), factory, segmentWithMatchingOutlet);
                    return [new segments_1.TreeNode(segment, children)];
                });
            });
        }
    });
}
/**
 * @param {?} metadata
 * @param {?} url
 * @return {?}
 */
function _match(metadata, url) {
    for (let r of metadata.routes) {
        let /** @type {?} */ matchingResult = _matchWithParts(r, url);
        if (lang_1.isPresent(matchingResult)) {
            return matchingResult;
        }
    }
    let /** @type {?} */ availableRoutes = metadata.routes.map(r => `'${r.path}'`).join(", ");
    throw new core_1.BaseException(`Cannot match any routes. Current segment: '${url.value}'. Available routes: [${availableRoutes}].`);
}
/**
 * @param {?} route
 * @param {?} url
 * @return {?}
 */
function _matchWithParts(route, url) {
    let /** @type {?} */ path = route.path.startsWith("/") ? route.path.substring(1) : route.path;
    if (path == "*") {
        return new _MatchResult(route.component, [], null, [], []);
    }
    let /** @type {?} */ parts = path.split("/");
    let /** @type {?} */ positionalParams = {};
    let /** @type {?} */ consumedUrlSegments = [];
    let /** @type {?} */ lastParent = null;
    let /** @type {?} */ lastSegment = null;
    let /** @type {?} */ current = url;
    for (let /** @type {?} */ i = 0; i < parts.length; ++i) {
        if (lang_1.isBlank(current))
            return null;
        let /** @type {?} */ p = parts[i];
        let /** @type {?} */ isLastSegment = i === parts.length - 1;
        let /** @type {?} */ isLastParent = i === parts.length - 2;
        let /** @type {?} */ isPosParam = p.startsWith(":");
        if (!isPosParam && p != current.value.segment)
            return null;
        if (isLastSegment) {
            lastSegment = current;
        }
        if (isLastParent) {
            lastParent = current;
        }
        if (isPosParam) {
            positionalParams[p.substring(1)] = current.value.segment;
        }
        consumedUrlSegments.push(current.value);
        current = collection_1.ListWrapper.first(current.children);
    }
    let /** @type {?} */ p = lastSegment.value.parameters;
    let /** @type {?} */ parameters = (collection_1.StringMapWrapper.merge(p, positionalParams));
    let /** @type {?} */ axuUrlSubtrees = lang_1.isPresent(lastParent) ? lastParent.children.slice(1) : [];
    return new _MatchResult(route.component, consumedUrlSegments, parameters, lastSegment.children, axuUrlSubtrees);
}
/**
 * @param {?} nodes
 * @return {?}
 */
function _checkOutletNameUniqueness(nodes) {
    let /** @type {?} */ names = {};
    nodes.forEach(n => {
        let /** @type {?} */ segmentWithSameOutletName = names[n.value.outlet];
        if (lang_1.isPresent(segmentWithSameOutletName)) {
            let /** @type {?} */ p = segmentWithSameOutletName.stringifiedUrlSegments;
            let /** @type {?} */ c = n.value.stringifiedUrlSegments;
            throw new core_1.BaseException(`Two segments cannot have the same outlet name: '${p}' and '${c}'.`);
        }
        names[n.value.outlet] = n.value;
    });
    return nodes;
}
class _MatchResult {
    /**
     * @param {?} component
     * @param {?} consumedUrlSegments
     * @param {?} parameters
     * @param {?} leftOverUrl
     * @param {?} aux
     */
    constructor(component, consumedUrlSegments, parameters, leftOverUrl, aux) {
        this.component = component;
        this.consumedUrlSegments = consumedUrlSegments;
        this.parameters = parameters;
        this.leftOverUrl = leftOverUrl;
        this.aux = aux;
    }
    get outlet() {
        return this.consumedUrlSegments.length === 0 || lang_1.isBlank(this.consumedUrlSegments[0].outlet) ?
            constants_1.DEFAULT_OUTLET_NAME :
            this.consumedUrlSegments[0].outlet;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _MatchResult.prototype.component;
        /** @type {?} */
        _MatchResult.prototype.consumedUrlSegments;
        /** @type {?} */
        _MatchResult.prototype.parameters;
        /** @type {?} */
        _MatchResult.prototype.leftOverUrl;
        /** @type {?} */
        _MatchResult.prototype.aux;
    }
}
/**
 * @param {?} componentType
 * @return {?}
 */
function _readMetadata(componentType) {
    let /** @type {?} */ metadata = core_2.reflector.annotations(componentType).filter(f => f instanceof metadata_1.RoutesMetadata);
    return collection_1.ListWrapper.first(metadata);
}
//# sourceMappingURL=recognize.js.map