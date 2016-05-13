goog.module('_angular$core$src$reflection$reflector');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var exceptions_1 = goog.require('_angular$core$src$facade$exceptions');
var collection_1 = goog.require('_angular$core$src$facade$collection');
var reflector_reader_1 = goog.require('_angular$core$src$reflection$reflector__reader');
/**
 * Reflective information about a symbol, including annotations, interfaces, and other metadata.
 */
class ReflectionInfo {
    /**
     * @param {?=} annotations
     * @param {?=} parameters
     * @param {?=} factory
     * @param {?=} interfaces
     * @param {?=} propMetadata
     */
    constructor(annotations, parameters, factory, interfaces, propMetadata) {
        this.annotations = annotations;
        this.parameters = parameters;
        this.factory = factory;
        this.interfaces = interfaces;
        this.propMetadata = propMetadata;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ReflectionInfo.prototype.annotations;
        /** @type {?} */
        ReflectionInfo.prototype.parameters;
        /** @type {?} */
        ReflectionInfo.prototype.factory;
        /** @type {?} */
        ReflectionInfo.prototype.interfaces;
        /** @type {?} */
        ReflectionInfo.prototype.propMetadata;
    }
}
exports.ReflectionInfo = ReflectionInfo;
/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
class Reflector extends reflector_reader_1.ReflectorReader {
    /**
     * @param {?} reflectionCapabilities
     */
    constructor(reflectionCapabilities) {
        super();
        /** @internal */
        this._injectableInfo = new collection_1.Map();
        /** @internal */
        this._getters = new collection_1.Map();
        /** @internal */
        this._setters = new collection_1.Map();
        /** @internal */
        this._methods = new collection_1.Map();
        this._usedKeys = null;
        this.reflectionCapabilities = reflectionCapabilities;
    }
    /**
     * @param {?} caps
     * @return {?}
     */
    updateCapabilities(caps) { this.reflectionCapabilities = caps; }
    /**
     * @return {?}
     */
    isReflectionEnabled() { return this.reflectionCapabilities.isReflectionEnabled(); }
    /**
     *  Causes `this` reflector to track keys used to access {@link ReflectionInfo} objects.
     * @return {?}
     */
    trackUsage() { this._usedKeys = new collection_1.Set(); }
    /**
     *  Lists types for which reflection information was not requested since {@link #trackUsage} was called. This list could later be audited as potential dead code.
     * @return {?}
     */
    listUnusedKeys() {
        if (this._usedKeys == null) {
            throw new exceptions_1.BaseException('Usage tracking is disabled');
        }
        var /** @type {?} */ allTypes = collection_1.MapWrapper.keys(this._injectableInfo);
        return allTypes.filter(key => !collection_1.SetWrapper.has(this._usedKeys, key));
    }
    /**
     * @param {?} func
     * @param {?} funcInfo
     * @return {?}
     */
    registerFunction(func, funcInfo) {
        this._injectableInfo.set(func, funcInfo);
    }
    /**
     * @param {?} type
     * @param {?} typeInfo
     * @return {?}
     */
    registerType(type, typeInfo) {
        this._injectableInfo.set(type, typeInfo);
    }
    /**
     * @param {?} getters
     * @return {?}
     */
    registerGetters(getters) { _mergeMaps(this._getters, getters); }
    /**
     * @param {?} setters
     * @return {?}
     */
    registerSetters(setters) { _mergeMaps(this._setters, setters); }
    /**
     * @param {?} methods
     * @return {?}
     */
    registerMethods(methods) { _mergeMaps(this._methods, methods); }
    /**
     * @param {?} type
     * @return {?}
     */
    factory(type) {
        if (this._containsReflectionInfo(type)) {
            var /** @type {?} */ res = this._getReflectionInfo(type).factory;
            return lang_1.isPresent(res) ? res : null;
        }
        else {
            return this.reflectionCapabilities.factory(type);
        }
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    parameters(typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var /** @type {?} */ res = this._getReflectionInfo(typeOrFunc).parameters;
            return lang_1.isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.parameters(typeOrFunc);
        }
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    annotations(typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var /** @type {?} */ res = this._getReflectionInfo(typeOrFunc).annotations;
            return lang_1.isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.annotations(typeOrFunc);
        }
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    propMetadata(typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var /** @type {?} */ res = this._getReflectionInfo(typeOrFunc).propMetadata;
            return lang_1.isPresent(res) ? res : {};
        }
        else {
            return this.reflectionCapabilities.propMetadata(typeOrFunc);
        }
    }
    /**
     * @param {?} type
     * @return {?}
     */
    interfaces(type) {
        if (this._injectableInfo.has(type)) {
            var /** @type {?} */ res = this._getReflectionInfo(type).interfaces;
            return lang_1.isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.interfaces(type);
        }
    }
    /**
     * @param {?} type
     * @param {?} lcInterface
     * @param {?} lcProperty
     * @return {?}
     */
    hasLifecycleHook(type, lcInterface, lcProperty) {
        var /** @type {?} */ interfaces = this.interfaces(type);
        if (interfaces.indexOf(lcInterface) !== -1) {
            return true;
        }
        else {
            return this.reflectionCapabilities.hasLifecycleHook(type, lcInterface, lcProperty);
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getter(name) {
        if (this._getters.has(name)) {
            return this._getters.get(name);
        }
        else {
            return this.reflectionCapabilities.getter(name);
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    setter(name) {
        if (this._setters.has(name)) {
            return this._setters.get(name);
        }
        else {
            return this.reflectionCapabilities.setter(name);
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    method(name) {
        if (this._methods.has(name)) {
            return this._methods.get(name);
        }
        else {
            return this.reflectionCapabilities.method(name);
        }
    }
    /**
     * @internal
     * @param {?} typeOrFunc
     * @return {?}
     */
    _getReflectionInfo(typeOrFunc) {
        if (lang_1.isPresent(this._usedKeys)) {
            this._usedKeys.add(typeOrFunc);
        }
        return this._injectableInfo.get(typeOrFunc);
    }
    /**
     * @internal
     * @param {?} typeOrFunc
     * @return {?}
     */
    _containsReflectionInfo(typeOrFunc) { return this._injectableInfo.has(typeOrFunc); }
    /**
     * @param {?} type
     * @return {?}
     */
    importUri(type) { return this.reflectionCapabilities.importUri(type); }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        Reflector.prototype._injectableInfo;
        /** @internal
        @type {?} */
        Reflector.prototype._getters;
        /** @internal
        @type {?} */
        Reflector.prototype._setters;
        /** @internal
        @type {?} */
        Reflector.prototype._methods;
        /** @internal
        @type {?} */
        Reflector.prototype._usedKeys;
        /** @type {?} */
        Reflector.prototype.reflectionCapabilities;
    }
}
exports.Reflector = Reflector;
/**
 * @param {?} target
 * @param {?} config
 * @return {?}
 */
function _mergeMaps(target, config) {
    collection_1.StringMapWrapper.forEach(config, (v, k) => target.set(k, v));
}
//# sourceMappingURL=reflector.js.map