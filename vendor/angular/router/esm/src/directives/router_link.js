goog.module('_angular$router$src$directives$router__link');
var core_1 = goog.require('_angular$core');
var router_1 = goog.require('_angular$router$src$router');
var segments_1 = goog.require('_angular$router$src$segments');
var lang_1 = goog.require('_angular$router$src$facade$lang');
var async_1 = goog.require('_angular$router$src$facade$async');
class RouterLink {
    /**
     * @param {?} _routeSegment
     * @param {?} _router
     */
    constructor(_routeSegment, _router) {
        this._routeSegment = _routeSegment;
        this._router = _router;
        this._commands = [];
        this.isActive = false;
        // because auxiliary links take existing primary and auxiliary routes into account,
        // we need to update the link whenever params or other routes change.
        this._subscription =
            async_1.ObservableWrapper.subscribe(_router.changes, (_) => { this._updateTargetUrlAndHref(); });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() { async_1.ObservableWrapper.dispose(this._subscription); }
    set routerLink(data) {
        if (lang_1.isArray(data)) {
            this._commands = (data);
        }
        else {
            this._commands = [data];
        }
        this._updateTargetUrlAndHref();
    }
    onClick() {
        // If no target, or if target is _self, prevent default browser behavior
        if (!lang_1.isString(this.target) || this.target == '_self') {
            this._router.navigate(this._commands, this._routeSegment);
            return false;
        }
        return true;
    }
    /**
     * @return {?}
     */
    _updateTargetUrlAndHref() {
        let /** @type {?} */ tree = this._router.createUrlTree(this._commands, this._routeSegment);
        if (lang_1.isPresent(tree)) {
            this.href = this._router.serializeUrl(tree);
            this.isActive = this._router.urlTree.contains(tree);
        }
        else {
            this.isActive = false;
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        RouterLink.prototype.target;
        /** @type {?} */
        RouterLink.prototype._commands;
        /** @type {?} */
        RouterLink.prototype._subscription;
        /** @type {?} */
        RouterLink.prototype.href;
        /** @type {?} */
        RouterLink.prototype.isActive;
        /** @type {?} */
        RouterLink.prototype._routeSegment;
        /** @type {?} */
        RouterLink.prototype._router;
    }
}
RouterLink.decorators = [
    { type: core_1.Directive, args: [{ selector: '[routerLink]' },] },
];
RouterLink.ctorParameters = [
    { type: segments_1.RouteSegment, },
    { type: router_1.Router, },
];
RouterLink.propDecorators = {
    'target': [{ type: core_1.Input },],
    'href': [{ type: core_1.HostBinding },],
    'isActive': [{ type: core_1.HostBinding, args: ['class.router-link-active',] },],
    'routerLink': [{ type: core_1.Input },],
    'onClick': [{ type: core_1.HostListener, args: ["click",] },],
};
exports.RouterLink = RouterLink;
//# sourceMappingURL=router_link.js.map