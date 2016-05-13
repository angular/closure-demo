goog.module('_angular$router');/**
 * @module
 * @description
 * Maps application URLs into application states, to support deep-linking and navigation.
 */

var router_1 = goog.require('_angular$router$src$router');
exports.Router = router_1.Router;
exports.RouterOutletMap = router_1.RouterOutletMap;
var segments_1 = goog.require('_angular$router$src$segments');
exports.RouteSegment = segments_1.RouteSegment;
exports.UrlSegment = segments_1.UrlSegment;
exports.Tree = segments_1.Tree;
exports.UrlTree = segments_1.UrlTree;
exports.RouteTree = segments_1.RouteTree;
var decorators_1 = goog.require('_angular$router$src$metadata$decorators');
exports.Routes = decorators_1.Routes;
var metadata_1 = goog.require('_angular$router$src$metadata$metadata');
exports.Route = metadata_1.Route;
var router_url_serializer_1 = goog.require('_angular$router$src$router__url__serializer');
exports.RouterUrlSerializer = router_url_serializer_1.RouterUrlSerializer;
exports.DefaultRouterUrlSerializer = router_url_serializer_1.DefaultRouterUrlSerializer;
var router_providers_1 = goog.require('_angular$router$src$router__providers');
exports.ROUTER_PROVIDERS = router_providers_1.ROUTER_PROVIDERS;
var router_outlet_1 = goog.require('_angular$router$src$directives$router__outlet');
var router_link_1 = goog.require('_angular$router$src$directives$router__link');
/**
 * A list of directives. To use the router directives like {@link RouterOutlet} and
 * {@link RouterLink}, add this to your `directives` array in the {@link View} decorator of your
 * component.
 *
 * ```
 * import {Component} from '@angular/core';
 * import {ROUTER_DIRECTIVES, Routes} from '@angular/router-deprecated';
 *
 * @Component({directives: [ROUTER_DIRECTIVES]})
 * @RouteConfig([
 *  {...},
 * ])
 * class AppCmp {
 *    // ...
 * }
 *
 * bootstrap(AppCmp);
 * ```
 */
exports.ROUTER_DIRECTIVES = [router_outlet_1.RouterOutlet, router_link_1.RouterLink];
//# sourceMappingURL=index.js.map