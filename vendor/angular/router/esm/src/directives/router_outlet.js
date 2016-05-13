goog.module('_angular$router$src$directives$router__outlet');
var core_1 = goog.require('_angular$core');
var router_1 = goog.require('_angular$router$src$router');
var constants_1 = goog.require('_angular$router$src$constants');
var lang_1 = goog.require('_angular$router$src$facade$lang');
class RouterOutlet {
    /**
     * @param {?} parentOutletMap
     * @param {?} _location
     * @param {?} name
     */
    constructor(parentOutletMap, _location, name) {
        this._location = _location;
        parentOutletMap.registerOutlet(lang_1.isBlank(name) ? constants_1.DEFAULT_OUTLET_NAME : name, this);
    }
    /**
     * @return {?}
     */
    deactivate() {
        this._activated.destroy();
        this._activated = null;
    }
    /**
     * Returns the loaded component.
     */
    get component() { return lang_1.isPresent(this._activated) ? this._activated.instance : null; }
    /**
     * Returns true is the outlet is not empty.
     */
    get isActivated() { return lang_1.isPresent(this._activated); }
    /**
     *  Called by the Router to instantiate a new component.
     * @param {?} factory
     * @param {?} providers
     * @param {?} outletMap
     * @return {?}
     */
    activate(factory, providers, outletMap) {
        this.outletMap = outletMap;
        let /** @type {?} */ inj = core_1.ReflectiveInjector.fromResolvedProviders(providers, this._location.parentInjector);
        this._activated = this._location.createComponent(factory, this._location.length, inj, []);
        return this._activated;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        RouterOutlet.prototype._activated;
        /** @type {?} */
        RouterOutlet.prototype.outletMap;
        /** @type {?} */
        RouterOutlet.prototype._location;
    }
}
RouterOutlet.decorators = [
    { type: core_1.Directive, args: [{ selector: 'router-outlet' },] },
];
/** @nocollapse */ RouterOutlet.ctorParameters = [
    { type: router_1.RouterOutletMap, },
    { type: core_1.ViewContainerRef, },
    { type: undefined, decorators: [{ type: core_1.Attribute, args: ['name',] },] },
];
exports.RouterOutlet = RouterOutlet;
//# sourceMappingURL=router_outlet.js.map