goog.module('_angular$router$src$metadata$metadata');
var lang_1 = goog.require('_angular$router$src$facade$lang');
/**
 * Information about a route.
 *
 * It has the following properties:
 * - `path` is a string that uses the route matcher DSL.
 * - `component` a component type.
 *
 * ### Example
 * ```
 * import {Routes} from '@angular/router';
 *
 * @Routes([
 *   {path: '/home', component: HomeCmp}
 * ])
 * class MyApp {}
 * ```
 *
 * @ts2dart_const
 */
class RouteMetadata {
    get path() { }
    get component() { }
}
exports.RouteMetadata = RouteMetadata;
/**
 * See {@link RouteMetadata} for more information.
 * @ts2dart_const
 */
class Route {
    /**
     * @param {?=} __0
     */
    constructor({ path, component } = {}) {
        this.path = path;
        this.component = component;
    }
    /**
     * @return {?}
     */
    toString() { return `@Route(${this.path}, ${lang_1.stringify(this.component)})`; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        Route.prototype.path;
        /** @type {?} */
        Route.prototype.component;
    }
}
exports.Route = Route;
/**
 * Defines routes for a given component.
 *
 * It takes an array of {@link RouteMetadata}s.
 * @ts2dart_const
 */
class RoutesMetadata {
    /**
     * @param {?} routes
     */
    constructor(routes) {
        this.routes = routes;
    }
    /**
     * @return {?}
     */
    toString() { return `@Routes(${this.routes})`; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        RoutesMetadata.prototype.routes;
    }
}
exports.RoutesMetadata = RoutesMetadata;
//# sourceMappingURL=metadata.js.map