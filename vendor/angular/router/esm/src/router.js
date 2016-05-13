goog.module('_angular$router$src$router');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$router$src$facade$lang');
var collection_1 = goog.require('_angular$router$src$facade$collection');
var async_1 = goog.require('_angular$router$src$facade$async');
var collection_2 = collection_1;
var core_2 = core_1;
var recognize_1 = goog.require('_angular$router$src$recognize');
var link_1 = goog.require('_angular$router$src$link');
var segments_1 = goog.require('_angular$router$src$segments');
var lifecycle_reflector_1 = goog.require('_angular$router$src$lifecycle__reflector');
var constants_1 = goog.require('_angular$router$src$constants');
/**
 * @internal
 */
class RouterOutletMap {
    constructor() {
        /** @internal */
        this._outlets = {};
    }
    /**
     * @param {?} name
     * @param {?} outlet
     * @return {?}
     */
    registerOutlet(name, outlet) { this._outlets[name] = outlet; }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        RouterOutletMap.prototype._outlets;
    }
}
exports.RouterOutletMap = RouterOutletMap;
/**
 * The `Router` is responsible for mapping URLs to components.
 *
 * You can see the state of the router by inspecting the read-only fields `router.urlTree`
 * and `router.routeTree`.
 */
class Router {
    /**
     * @internal
     * @param {?} _rootComponent
     * @param {?} _rootComponentType
     * @param {?} _componentResolver
     * @param {?} _urlSerializer
     * @param {?} _routerOutletMap
     * @param {?} _location
     */
    constructor(_rootComponent, _rootComponentType, _componentResolver, _urlSerializer, _routerOutletMap, _location) {
        this._rootComponent = _rootComponent;
        this._rootComponentType = _rootComponentType;
        this._componentResolver = _componentResolver;
        this._urlSerializer = _urlSerializer;
        this._routerOutletMap = _routerOutletMap;
        this._location = _location;
        this._changes = new async_1.EventEmitter();
        this._routeTree = segments_1.createEmptyRouteTree(this._rootComponentType);
        this._setUpLocationChangeListener();
        this.navigateByUrl(this._location.path());
    }
    /**
     * Returns the current url tree.
     */
    get urlTree() { return this._urlTree; }
    /**
     * Returns the current route tree.
     */
    get routeTree() { return this._routeTree; }
    /**
     * An observable or url changes from the router.
     */
    get changes() { return this._changes; }
    /**
     *  Navigate based on the provided url. This navigation is always absolute. * ### Usage * ``` router.navigateByUrl("/team/33/user/11"); ```
     * @param {?} url
     * @return {?}
     */
    navigateByUrl(url) {
        return this._navigate(this._urlSerializer.parse(url));
    }
    /**
     *  Navigate based on the provided array of commands and a starting point. If no segment is provided, the navigation is absolute. * ### Usage * ``` router.navigate(['team', 33, 'team', '11], segment); ```
     * @param {?} commands
     * @param {?=} segment
     * @return {?}
     */
    navigate(commands, segment) {
        return this._navigate(this.createUrlTree(commands, segment));
    }
    /**
     * @internal
     * @return {?}
     */
    dispose() { async_1.ObservableWrapper.dispose(this._locationSubscription); }
    /**
     *  Applies an array of commands to the current url tree and creates a new url tree. * When given a segment, applies the given commands starting from the segment. When not given a segment, applies the given command starting from the root. * ### Usage * ``` // create /team/33/user/11 router.createUrlTree(['/team', 33, 'user', 11]); * // create /team/33;expand=true/user/11 router.createUrlTree(['/team', 33, {expand: true}, 'user', 11]); * // you can collapse static fragments like this router.createUrlTree(['/team/33/user', userId]); * // assuming the current url is `/team/33/user/11` and the segment points to `user/11` * // navigate to /team/33/user/11/details router.createUrlTree(['details'], segment); * // navigate to /team/33/user/22 router.createUrlTree(['../22'], segment); * // navigate to /team/44/user/22 router.createUrlTree(['../../team/44/user/22'], segment); ```
     * @param {?} commands
     * @param {?=} segment
     * @return {?}
     */
    createUrlTree(commands, segment) {
        let /** @type {?} */ s = lang_1.isPresent(segment) ? segment : this._routeTree.root;
        return link_1.link(s, this._routeTree, this.urlTree, commands);
    }
    /**
     *  Serializes a {@link UrlTree} into a string.
     * @param {?} url
     * @return {?}
     */
    serializeUrl(url) { return this._urlSerializer.serialize(url); }
    /**
     * @return {?}
     */
    _setUpLocationChangeListener() {
        this._locationSubscription = this._location.subscribe((change) => { this._navigate(this._urlSerializer.parse(change['url'])); });
    }
    /**
     * @param {?} url
     * @return {?}
     */
    _navigate(url) {
        this._urlTree = url;
        return recognize_1.recognize(this._componentResolver, this._rootComponentType, url, this._routeTree)
            .then(currTree => {
            return new _ActivateSegments(currTree, this._routeTree)
                .activate(this._routerOutletMap, this._rootComponent)
                .then(updated => {
                if (updated) {
                    this._routeTree = currTree;
                    this._location.go(this._urlSerializer.serialize(this._urlTree));
                    this._changes.emit(null);
                }
            });
        });
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        Router.prototype._routeTree;
        /** @type {?} */
        Router.prototype._urlTree;
        /** @type {?} */
        Router.prototype._locationSubscription;
        /** @type {?} */
        Router.prototype._changes;
        /** @type {?} */
        Router.prototype._rootComponent;
        /** @type {?} */
        Router.prototype._rootComponentType;
        /** @type {?} */
        Router.prototype._componentResolver;
        /** @type {?} */
        Router.prototype._urlSerializer;
        /** @type {?} */
        Router.prototype._routerOutletMap;
        /** @type {?} */
        Router.prototype._location;
    }
}
exports.Router = Router;
class _ActivateSegments {
    /**
     * @param {?} currTree
     * @param {?} prevTree
     */
    constructor(currTree, prevTree) {
        this.currTree = currTree;
        this.prevTree = prevTree;
        this.deactivations = [];
        this.performMutation = true;
    }
    /**
     * @param {?} parentOutletMap
     * @param {?} rootComponent
     * @return {?}
     */
    activate(parentOutletMap, rootComponent) {
        let /** @type {?} */ prevRoot = lang_1.isPresent(this.prevTree) ? segments_1.rootNode(this.prevTree) : null;
        let /** @type {?} */ currRoot = segments_1.rootNode(this.currTree);
        return this.canDeactivate(currRoot, prevRoot, parentOutletMap, rootComponent)
            .then(res => {
            this.performMutation = true;
            if (res) {
                this.activateChildSegments(currRoot, prevRoot, parentOutletMap, [rootComponent]);
            }
            return res;
        });
    }
    /**
     * @param {?} currRoot
     * @param {?} prevRoot
     * @param {?} outletMap
     * @param {?} rootComponent
     * @return {?}
     */
    canDeactivate(currRoot, prevRoot, outletMap, rootComponent) {
        this.performMutation = false;
        this.activateChildSegments(currRoot, prevRoot, outletMap, [rootComponent]);
        let /** @type {?} */ allPaths = async_1.PromiseWrapper.all(this.deactivations.map(r => this.checkCanDeactivatePath(r)));
        return allPaths.then((values) => values.filter(v => v).length === values.length);
    }
    /**
     * @param {?} path
     * @return {?}
     */
    checkCanDeactivatePath(path) {
        let /** @type {?} */ curr = async_1.PromiseWrapper.resolve(true);
        for (let p of collection_1.ListWrapper.reversed(path)) {
            curr = curr.then(_ => {
                if (lifecycle_reflector_1.hasLifecycleHook("routerCanDeactivate", p)) {
                    return ((p)).routerCanDeactivate(this.prevTree, this.currTree);
                }
                else {
                    return _;
                }
            });
        }
        return curr;
    }
    /**
     * @param {?} currNode
     * @param {?} prevNode
     * @param {?} outletMap
     * @param {?} components
     * @return {?}
     */
    activateChildSegments(currNode, prevNode, outletMap, components) {
        let /** @type {?} */ prevChildren = lang_1.isPresent(prevNode) ?
            prevNode.children.reduce((m, c) => {
                m[c.value.outlet] = c;
                return m;
            }, {}) :
            {};
        currNode.children.forEach(c => {
            this.activateSegments(c, prevChildren[c.value.outlet], outletMap, components);
            collection_2.StringMapWrapper.delete(prevChildren, c.value.outlet);
        });
        collection_2.StringMapWrapper.forEach(prevChildren, (v, k) => this.deactivateOutlet(outletMap._outlets[k], components));
    }
    /**
     * @param {?} currNode
     * @param {?} prevNode
     * @param {?} parentOutletMap
     * @param {?} components
     * @return {?}
     */
    activateSegments(currNode, prevNode, parentOutletMap, components) {
        let /** @type {?} */ curr = currNode.value;
        let /** @type {?} */ prev = lang_1.isPresent(prevNode) ? prevNode.value : null;
        let /** @type {?} */ outlet = this.getOutlet(parentOutletMap, currNode.value);
        if (curr === prev) {
            this.activateChildSegments(currNode, prevNode, outlet.outletMap, components.concat([outlet.component]));
        }
        else {
            this.deactivateOutlet(outlet, components);
            if (this.performMutation) {
                let /** @type {?} */ outletMap = new RouterOutletMap();
                let /** @type {?} */ component = this.activateNewSegments(outletMap, curr, prev, outlet);
                this.activateChildSegments(currNode, prevNode, outletMap, components.concat([component]));
            }
        }
    }
    /**
     * @param {?} outletMap
     * @param {?} curr
     * @param {?} prev
     * @param {?} outlet
     * @return {?}
     */
    activateNewSegments(outletMap, curr, prev, outlet) {
        let /** @type {?} */ resolved = core_1.ReflectiveInjector.resolve([core_1.provide(RouterOutletMap, { useValue: outletMap }), core_1.provide(segments_1.RouteSegment, { useValue: curr })]);
        let /** @type {?} */ ref = outlet.activate(segments_1.routeSegmentComponentFactory(curr), resolved, outletMap);
        if (lifecycle_reflector_1.hasLifecycleHook("routerOnActivate", ref.instance)) {
            ref.instance.routerOnActivate(curr, prev, this.currTree, this.prevTree);
        }
        return ref.instance;
    }
    /**
     * @param {?} outletMap
     * @param {?} segment
     * @return {?}
     */
    getOutlet(outletMap, segment) {
        let /** @type {?} */ outlet = outletMap._outlets[segment.outlet];
        if (lang_1.isBlank(outlet)) {
            if (segment.outlet == constants_1.DEFAULT_OUTLET_NAME) {
                throw new core_2.BaseException(`Cannot find default outlet`);
            }
            else {
                throw new core_2.BaseException(`Cannot find the outlet ${segment.outlet}`);
            }
        }
        return outlet;
    }
    /**
     * @param {?} outlet
     * @param {?} components
     * @return {?}
     */
    deactivateOutlet(outlet, components) {
        if (lang_1.isPresent(outlet) && outlet.isActivated) {
            collection_2.StringMapWrapper.forEach(outlet.outletMap._outlets, (v, k) => this.deactivateOutlet(v, components));
            if (this.performMutation) {
                outlet.deactivate();
            }
            else {
                this.deactivations.push(components.concat([outlet.component]));
            }
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _ActivateSegments.prototype.deactivations;
        /** @type {?} */
        _ActivateSegments.prototype.performMutation;
        /** @type {?} */
        _ActivateSegments.prototype.currTree;
        /** @type {?} */
        _ActivateSegments.prototype.prevTree;
    }
}
//# sourceMappingURL=router.js.map