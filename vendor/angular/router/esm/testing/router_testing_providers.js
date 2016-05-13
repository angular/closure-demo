goog.module('_angular$router$testing$router__testing__providers');
var testing_1 = goog.require('_angular$common$testing');
var common_1 = goog.require('_angular$common');
var router_1 = goog.require('_angular$router$src$router');
var segments_1 = goog.require('_angular$router$src$segments');
var router_url_serializer_1 = goog.require('_angular$router$src$router__url__serializer');
var core_1 = goog.require('_angular$core');
class FakeAppRootCmp {
}
/** @nocollapse */ FakeAppRootCmp.decorators = [
    { type: core_1.Component, args: [{ selector: 'fake-app-root-comp', template: `<span></span>` },] },
];
/**
 * @param {?} componentResolver
 * @param {?} urlSerializer
 * @param {?} routerOutletMap
 * @param {?} location
 * @return {?}
 */
function routerFactory(componentResolver, urlSerializer, routerOutletMap, location) {
    return new router_1.Router(null, FakeAppRootCmp, componentResolver, urlSerializer, routerOutletMap, location);
}
exports.ROUTER_FAKE_PROVIDERS = [
    router_1.RouterOutletMap,
    /* @ts2dart_Provider */ { provide: common_1.Location, useClass: testing_1.SpyLocation },
    /* @ts2dart_Provider */ { provide: router_url_serializer_1.RouterUrlSerializer, useClass: router_url_serializer_1.DefaultRouterUrlSerializer },
    /* @ts2dart_Provider */ {
        provide: router_1.Router,
        useFactory: routerFactory,
        deps: /*@ts2dart_const*/ [core_1.ComponentResolver, router_url_serializer_1.RouterUrlSerializer, router_1.RouterOutletMap, common_1.Location]
    },
    /*@ts2dart_Provider*/ { provide: segments_1.RouteSegment, useFactory: (r) => r.routeTree.root, deps: [router_1.Router] }
];
//# sourceMappingURL=router_testing_providers.js.map