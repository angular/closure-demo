"use strict";
var core_1 = require('@angular/core');
var core_private_1 = require('./core_private');
var StaticAndDynamicReflectionCapabilities = (function () {
    function StaticAndDynamicReflectionCapabilities(staticDelegate) {
        this.staticDelegate = staticDelegate;
        this.dynamicDelegate = new core_private_1.ReflectionCapabilities();
    }
    StaticAndDynamicReflectionCapabilities.install = function (staticDelegate) {
        core_1.reflector.updateCapabilities(new StaticAndDynamicReflectionCapabilities(staticDelegate));
    };
    StaticAndDynamicReflectionCapabilities.prototype.isReflectionEnabled = function () { return true; };
    StaticAndDynamicReflectionCapabilities.prototype.factory = function (type) { return this.dynamicDelegate.factory(type); };
    StaticAndDynamicReflectionCapabilities.prototype.interfaces = function (type) { return this.dynamicDelegate.interfaces(type); };
    StaticAndDynamicReflectionCapabilities.prototype.hasLifecycleHook = function (type, lcInterface, lcProperty) {
        return isStaticType(type) ?
            this.staticDelegate.hasLifecycleHook(type, lcInterface, lcProperty) :
            this.dynamicDelegate.hasLifecycleHook(type, lcInterface, lcProperty);
    };
    StaticAndDynamicReflectionCapabilities.prototype.parameters = function (type) {
        return isStaticType(type) ? this.staticDelegate.parameters(type) :
            this.dynamicDelegate.parameters(type);
    };
    StaticAndDynamicReflectionCapabilities.prototype.annotations = function (type) {
        return isStaticType(type) ? this.staticDelegate.annotations(type) :
            this.dynamicDelegate.annotations(type);
    };
    StaticAndDynamicReflectionCapabilities.prototype.propMetadata = function (typeOrFunc) {
        return isStaticType(typeOrFunc) ? this.staticDelegate.propMetadata(typeOrFunc) :
            this.dynamicDelegate.propMetadata(typeOrFunc);
    };
    StaticAndDynamicReflectionCapabilities.prototype.getter = function (name) { return this.dynamicDelegate.getter(name); };
    StaticAndDynamicReflectionCapabilities.prototype.setter = function (name) { return this.dynamicDelegate.setter(name); };
    StaticAndDynamicReflectionCapabilities.prototype.method = function (name) { return this.dynamicDelegate.method(name); };
    StaticAndDynamicReflectionCapabilities.prototype.importUri = function (type) { return this.staticDelegate.importUri(type); };
    return StaticAndDynamicReflectionCapabilities;
}());
exports.StaticAndDynamicReflectionCapabilities = StaticAndDynamicReflectionCapabilities;
function isStaticType(type) {
    return typeof type === 'object' && type.name && type.filePath;
}
//# sourceMappingURL=static_reflection_capabilities.js.map