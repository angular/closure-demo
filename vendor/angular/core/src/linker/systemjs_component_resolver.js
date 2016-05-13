"use strict";
var lang_1 = require('../../src/facade/lang');
/**
 * Component resolver that can load components lazily
 */
var SystemJsComponentResolver = (function () {
    function SystemJsComponentResolver(_resolver) {
        this._resolver = _resolver;
    }
    SystemJsComponentResolver.prototype.resolveComponent = function (componentType) {
        var _this = this;
        if (lang_1.isString(componentType)) {
            return lang_1.global.System.import(componentType).then(function (module) {
                return _this._resolver.resolveComponent(module.default);
            });
        }
        else {
            return this._resolver.resolveComponent(componentType);
        }
    };
    SystemJsComponentResolver.prototype.clearCache = function () { };
    return SystemJsComponentResolver;
}());
exports.SystemJsComponentResolver = SystemJsComponentResolver;
//# sourceMappingURL=systemjs_component_resolver.js.map