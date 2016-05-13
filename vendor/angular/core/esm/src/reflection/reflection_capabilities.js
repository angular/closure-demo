goog.module('_angular$core$src$reflection$reflection__capabilities');
var lang_1 = goog.require('_angular$core$src$facade$lang');
class ReflectionCapabilities {
    /**
     * @param {?=} reflect
     */
    constructor(reflect) {
        this._reflect = lang_1.isPresent(reflect) ? reflect : lang_1.global.Reflect;
    }
    /**
     * @return {?}
     */
    isReflectionEnabled() { return true; }
    /**
     * @param {?} t
     * @return {?}
     */
    factory(t) {
        switch (t.length) {
            case 0:
                return () => new t();
            case 1:
                return (a1) => new t(a1);
            case 2:
                return (a1, a2) => new t(a1, a2);
            case 3:
                return (a1, a2, a3) => new t(a1, a2, a3);
            case 4:
                return (a1, a2, a3, a4) => new t(a1, a2, a3, a4);
            case 5:
                return (a1, a2, a3, a4, a5) => new t(a1, a2, a3, a4, a5);
            case 6:
                return (a1, a2, a3, a4, a5, a6) => new t(a1, a2, a3, a4, a5, a6);
            case 7:
                return (a1, a2, a3, a4, a5, a6, a7) => new t(a1, a2, a3, a4, a5, a6, a7);
            case 8:
                return (a1, a2, a3, a4, a5, a6, a7, a8) => new t(a1, a2, a3, a4, a5, a6, a7, a8);
            case 9:
                return (a1, a2, a3, a4, a5, a6, a7, a8, a9) => new t(a1, a2, a3, a4, a5, a6, a7, a8, a9);
            case 10:
                return (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) => new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
            case 11:
                return (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) => new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
            case 12:
                return (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) => new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
            case 13:
                return (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) => new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
            case 14:
                return (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) => new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14);
            case 15:
                return (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) => new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);
            case 16:
                return (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) => new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16);
            case 17:
                return (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17) => new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17);
            case 18:
                return (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18) => new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18);
            case 19:
                return (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19) => new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19);
            case 20:
                return (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20) => new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20);
        }
        ;
        throw new Error(`Cannot create a factory for '${lang_1.stringify(t)}' because its constructor has more than 20 arguments`);
    }
    /**
     * @internal
     * @param {?} paramTypes
     * @param {?} paramAnnotations
     * @return {?}
     */
    _zipTypesAndAnnotations(paramTypes, paramAnnotations) {
        var /** @type {?} */ result;
        if (typeof paramTypes === 'undefined') {
            result = new Array(paramAnnotations.length);
        }
        else {
            result = new Array(paramTypes.length);
        }
        for (var /** @type {?} */ i = 0; i < result.length; i++) {
            // TS outputs Object for parameters without types, while Traceur omits
            // the annotations. For now we preserve the Traceur behavior to aid
            // migration, but this can be revisited.
            if (typeof paramTypes === 'undefined') {
                result[i] = [];
            }
            else if (paramTypes[i] != Object) {
                result[i] = [paramTypes[i]];
            }
            else {
                result[i] = [];
            }
            if (lang_1.isPresent(paramAnnotations) && lang_1.isPresent(paramAnnotations[i])) {
                result[i] = result[i].concat(paramAnnotations[i]);
            }
        }
        return result;
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    parameters(typeOrFunc) {
        // Prefer the direct API.
        if (lang_1.isPresent(((typeOrFunc)).parameters)) {
            return ((typeOrFunc)).parameters;
        }
        // API of tsickle for lowering decorators to properties on the class.
        if (lang_1.isPresent(((typeOrFunc)).ctorParameters)) {
            let /** @type {?} */ ctorParameters = ((typeOrFunc)).ctorParameters;
            let /** @type {?} */ paramTypes = ctorParameters.map(ctorParam => ctorParam && ctorParam.type);
            let /** @type {?} */ paramAnnotations = ctorParameters.map(ctorParam => ctorParam && convertTsickleDecoratorIntoMetadata(ctorParam.decorators));
            return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
        }
        // API for metadata created by invoking the decorators.
        if (lang_1.isPresent(this._reflect) && lang_1.isPresent(this._reflect.getMetadata)) {
            var /** @type {?} */ paramAnnotations = this._reflect.getMetadata('parameters', typeOrFunc);
            var /** @type {?} */ paramTypes = this._reflect.getMetadata('design:paramtypes', typeOrFunc);
            if (lang_1.isPresent(paramTypes) || lang_1.isPresent(paramAnnotations)) {
                return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
            }
        }
        // The array has to be filled with `undefined` because holes would be skipped by `some`
        let /** @type {?} */ parameters = new Array(((typeOrFunc.length)));
        parameters.fill(undefined); // FIXME??
        return parameters;
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    annotations(typeOrFunc) {
        // Prefer the direct API.
        if (lang_1.isPresent(((typeOrFunc)).annotations)) {
            var /** @type {?} */ annotations = ((typeOrFunc)).annotations;
            if (lang_1.isFunction(annotations) && annotations.annotations) {
                annotations = annotations.annotations;
            }
            return annotations;
        }
        // API of tsickle for lowering decorators to properties on the class.
        if (lang_1.isPresent(((typeOrFunc)).decorators)) {
            return convertTsickleDecoratorIntoMetadata(((typeOrFunc)).decorators);
        }
        // API for metadata created by invoking the decorators.
        if (lang_1.isPresent(this._reflect) && lang_1.isPresent(this._reflect.getMetadata)) {
            var /** @type {?} */ annotations = this._reflect.getMetadata('annotations', typeOrFunc);
            if (lang_1.isPresent(annotations))
                return annotations;
        }
        return [];
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    propMetadata(typeOrFunc) {
        // Prefer the direct API.
        if (lang_1.isPresent(((typeOrFunc)).propMetadata)) {
            var /** @type {?} */ propMetadata = ((typeOrFunc)).propMetadata;
            if (lang_1.isFunction(propMetadata) && propMetadata.propMetadata) {
                propMetadata = propMetadata.propMetadata;
            }
            return propMetadata;
        }
        // API of tsickle for lowering decorators to properties on the class.
        if (lang_1.isPresent(((typeOrFunc)).propDecorators)) {
            let /** @type {?} */ propDecorators = ((typeOrFunc)).propDecorators;
            let /** @type {?} */ propMetadata = ({});
            Object.keys(propDecorators)
                .forEach(prop => {
                propMetadata[prop] = convertTsickleDecoratorIntoMetadata(propDecorators[prop]);
            });
            return propMetadata;
        }
        // API for metadata created by invoking the decorators.
        if (lang_1.isPresent(this._reflect) && lang_1.isPresent(this._reflect.getMetadata)) {
            var /** @type {?} */ propMetadata = this._reflect.getMetadata('propMetadata', typeOrFunc);
            if (lang_1.isPresent(propMetadata))
                return propMetadata;
        }
        return {};
    }
    /**
     * @param {?} type
     * @return {?}
     */
    interfaces(type) { return []; }
    /**
     * @param {?} type
     * @param {?} lcInterface
     * @param {?} lcProperty
     * @return {?}
     */
    hasLifecycleHook(type, lcInterface, lcProperty) {
        if (!(type instanceof lang_1.Type))
            return false;
        var /** @type {?} */ proto = ((type)).prototype;
        return !!proto[lcProperty];
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getter(name) { return ((new Function('o', 'return o.' + name + ';'))); }
    /**
     * @param {?} name
     * @return {?}
     */
    setter(name) {
        return ((new Function('o', 'v', 'return o.' + name + ' = v;')));
    }
    /**
     * @param {?} name
     * @return {?}
     */
    method(name) {
        let /** @type {?} */ functionBody = `if (!o.${name}) throw new Error('"${name}" is undefined');
        return o.${name}.apply(o, args);`;
        return ((new Function('o', 'args', functionBody)));
    }
    /**
     * @param {?} type
     * @return {?}
     */
    importUri(type) {
        // StaticSymbol
        if (typeof type === 'object' && type['filePath']) {
            return type['filePath'];
        }
        // Runtime type
        return `./${lang_1.stringify(type)}`;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ReflectionCapabilities.prototype._reflect;
    }
}
exports.ReflectionCapabilities = ReflectionCapabilities;
/**
 * @param {?} decoratorInvocations
 * @return {?}
 */
function convertTsickleDecoratorIntoMetadata(decoratorInvocations) {
    if (!decoratorInvocations) {
        return [];
    }
    return decoratorInvocations.map(decoratorInvocation => {
        var /** @type {?} */ decoratorType = decoratorInvocation.type;
        var /** @type {?} */ annotationCls = decoratorType.annotationCls;
        var /** @type {?} */ annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
        var /** @type {?} */ annotation = Object.create(annotationCls.prototype);
        annotationCls.apply(annotation, annotationArgs);
        return annotation;
    });
}
//# sourceMappingURL=reflection_capabilities.js.map