goog.module('_angular$router$src$router__providers__common');
var core_1 = goog.require('_angular$core');
var common_1 = goog.require('_angular$common');
var router_1 = goog.require('_angular$router$src$router');
var segments_1 = goog.require('_angular$router$src$segments');
var router_url_serializer_1 = goog.require('_angular$router$src$router__url__serializer');
var core_2 = core_1;
var core_3 = core_1;
/**
 * The Platform agnostic ROUTER PROVIDERS
 */
exports.ROUTER_PROVIDERS_COMMON = [
    router_1.RouterOutletMap,
    /*@ts2dart_Provider*/ { provide: router_url_serializer_1.RouterUrlSerializer, useClass: router_url_serializer_1.DefaultRouterUrlSerializer },
    /*@ts2dart_Provider*/ { provide: common_1.LocationStrategy, useClass: common_1.PathLocationStrategy }, common_1.Location,
    /*@ts2dart_Provider*/ {
        provide: router_1.Router,
        useFactory: routerFactory,
        deps: /*@ts2dart_const*/ [core_2.ApplicationRef, core_1.ComponentResolver, router_url_serializer_1.RouterUrlSerializer, router_1.RouterOutletMap, common_1.Location],
    },
    /*@ts2dart_Provider*/ { provide: segments_1.RouteSegment, useFactory: (r) => r.routeTree.root, deps: [router_1.Router] }
];
/**
 * @param {?} app
 * @param {?} componentResolver
 * @param {?} urlSerializer
 * @param {?} routerOutletMap
 * @param {?} location
 * @return {?}
 */
function routerFactory(app, componentResolver, urlSerializer, routerOutletMap, location) {
    if (app.componentTypes.length == 0) {
        throw new core_3.BaseException("Bootstrap at least one component before injecting Router.");
    }
    // TODO: vsavkin this should not be null
    let /** @type {?} */ router = new router_1.Router(null, app.componentTypes[0], componentResolver, urlSerializer, routerOutletMap, location);
    app.registerDisposeListener(() => router.dispose());
    return router;
}
//# sourceMappingURL=router_providers_common.js.map