goog.module('_angular$router$src$router__providers');
var router_providers_common_1 = goog.require('_angular$router$src$router__providers__common');
var platform_browser_1 = goog.require('_angular$platform_browser');
var common_1 = goog.require('_angular$common');
/**
 * A list of {@link Provider}s. To use the router, you must add this to your application.
 *
 * ```
 * import {Component} from '@angular/core';
 * import {
 *   ROUTER_DIRECTIVES,
 *   ROUTER_PROVIDERS,
 *   Routes
 * } from '@angular/router';
 *
 * @Component({directives: [ROUTER_DIRECTIVES]})
 * @Routes([
 *  {...},
 * ])
 * class AppCmp {
 *   // ...
 * }
 *
 * bootstrap(AppCmp, [ROUTER_PROVIDERS]);
 * ```
 */
exports.ROUTER_PROVIDERS = [
    router_providers_common_1.ROUTER_PROVIDERS_COMMON,
    /*@ts2dart_Provider*/ { provide: common_1.PlatformLocation, useClass: platform_browser_1.BrowserPlatformLocation },
];
//# sourceMappingURL=router_providers.js.map