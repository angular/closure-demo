goog.module('_angular$core$src$util$decorators');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var /** @type {?} */ _nextClassId = 0;
/**
 * @param {?} annotation
 * @return {?}
 */
function extractAnnotation(annotation) {
    if (lang_1.isFunction(annotation) && annotation.hasOwnProperty('annotation')) {
        // it is a decorator, extract annotation
        annotation = annotation.annotation;
    }
    return annotation;
}
/**
 * @param {?} fnOrArray
 * @param {?} key
 * @return {?}
 */
function applyParams(fnOrArray, key) {
    if (fnOrArray === Object || fnOrArray === String || fnOrArray === Function ||
        fnOrArray === Number || fnOrArray === Array) {
        throw new Error(`Can not use native ${lang_1.stringify(fnOrArray)} as constructor`);
    }
    if (lang_1.isFunction(fnOrArray)) {
        return (fnOrArray);
    }
    else if (fnOrArray instanceof Array) {
        var /** @type {?} */ annotations = fnOrArray;
        var /** @type {?} */ fn = fnOrArray[fnOrArray.length - 1];
        if (!lang_1.isFunction(fn)) {
            throw new Error(`Last position of Class method array must be Function in key ${key} was '${lang_1.stringify(fn)}'`);
        }
        var /** @type {?} */ annoLength = annotations.length - 1;
        if (annoLength != fn.length) {
            throw new Error(`Number of annotations (${annoLength}) does not match number of arguments (${fn.length}) in the function: ${lang_1.stringify(fn)}`);
        }
        var /** @type {?} */ paramsAnnotations = [];
        for (var /** @type {?} */ i = 0, /** @type {?} */ ii = annotations.length - 1; i < ii; i++) {
            var /** @type {?} */ paramAnnotations = [];
            paramsAnnotations.push(paramAnnotations);
            var /** @type {?} */ annotation = annotations[i];
            if (annotation instanceof Array) {
                for (var /** @type {?} */ j = 0; j < annotation.length; j++) {
                    paramAnnotations.push(extractAnnotation(annotation[j]));
                }
            }
            else if (lang_1.isFunction(annotation)) {
                paramAnnotations.push(extractAnnotation(annotation));
            }
            else {
                paramAnnotations.push(annotation);
            }
        }
        Reflect.defineMetadata('parameters', paramsAnnotations, fn);
        return fn;
    }
    else {
        throw new Error(`Only Function or Array is supported in Class definition for key '${key}' is '${lang_1.stringify(fnOrArray)}'`);
    }
}
/**
 *  Provides a way for expressing ES6 classes with parameter annotations in ES5. * ## Basic Example * ``` var Greeter = ng.Class({ constructor: function(name) { this.name = name; }, * greet: function() { alert('Hello ' + this.name + '!'); } }); ``` * is equivalent to ES6: * ``` class Greeter { constructor(name) { this.name = name; } * greet() { alert('Hello ' + this.name + '!'); } } ``` * or equivalent to ES5: * ``` var Greeter = function (name) { this.name = name; } * Greeter.prototype.greet = function () { alert('Hello ' + this.name + '!'); } ``` * ### Example with parameter annotations * ``` var MyService = ng.Class({ constructor: [String, [new Query(), QueryList], function(name, queryList) { ... }] }); ``` * is equivalent to ES6: * ``` class MyService { constructor(name: string, @Query() queryList: QueryList) { ... } } ``` * ### Example with inheritance * ``` var Shape = ng.Class({ constructor: (color) { this.color = color; } }); * var Square = ng.Class({ extends: Shape, constructor: function(color, size) { Shape.call(this, color); this.size = size; } }); ```
 * @param {?} clsDef
 * @return {?}
 */
function Class(clsDef) {
    var /** @type {?} */ constructor = applyParams(clsDef.hasOwnProperty('constructor') ? clsDef.constructor : undefined, 'constructor');
    var /** @type {?} */ proto = constructor.prototype;
    if (clsDef.hasOwnProperty('extends')) {
        if (lang_1.isFunction(clsDef.extends)) {
            ((constructor)).prototype = proto =
                Object.create(((clsDef.extends)).prototype);
        }
        else {
            throw new Error(`Class definition 'extends' property must be a constructor function was: ${lang_1.stringify(clsDef.extends)}`);
        }
    }
    for (var key in clsDef) {
        if (key != 'extends' && key != 'prototype' && clsDef.hasOwnProperty(key)) {
            proto[key] = applyParams(/** @type {?} */ (clsDef[key]), key);
        }
    }
    if (this && this.annotations instanceof Array) {
        Reflect.defineMetadata('annotations', this.annotations, constructor);
    }
    if (!constructor['name']) {
        constructor['overriddenName'] = `class${_nextClassId++}`;
    }
    return (constructor);
}
exports.Class = Class;
var /** @type {?} */ Reflect = lang_1.global.Reflect;
/**
 * @param {?} annotationCls
 * @param {?=} chainFn
 * @return {?}
 */
function makeDecorator(annotationCls, chainFn = null) {
    /**
     * @param {?} objOrType
     * @return {?}
     */
    function DecoratorFactory(objOrType) {
        var /** @type {?} */ annotationInstance = new ((annotationCls))(objOrType);
        if (this instanceof annotationCls) {
            return annotationInstance;
        }
        else {
            var /** @type {?} */ chainAnnotation = lang_1.isFunction(this) && this.annotations instanceof Array ? this.annotations : [];
            chainAnnotation.push(annotationInstance);
            var /** @type {?} */ TypeDecorator = (function TypeDecorator(cls) {
                var /** @type {?} */ annotations = Reflect.getOwnMetadata('annotations', cls);
                annotations = annotations || [];
                annotations.push(annotationInstance);
                Reflect.defineMetadata('annotations', annotations, cls);
                return cls;
            });
            TypeDecorator.annotations = chainAnnotation;
            TypeDecorator.Class = Class;
            if (chainFn)
                chainFn(TypeDecorator);
            return TypeDecorator;
        }
    }
    DecoratorFactory.prototype = Object.create(annotationCls.prototype);
    ((DecoratorFactory)).annotationCls = annotationCls;
    return DecoratorFactory;
}
exports.makeDecorator = makeDecorator;
/**
 * @param {?} annotationCls
 * @return {?}
 */
function makeParamDecorator(annotationCls) {
    /**
     * @param {...?} args
     * @return {?}
     */
    function ParamDecoratorFactory(...args) {
        var /** @type {?} */ annotationInstance = Object.create(annotationCls.prototype);
        annotationCls.apply(annotationInstance, args);
        if (this instanceof annotationCls) {
            return annotationInstance;
        }
        else {
            ((ParamDecorator)).annotation = annotationInstance;
            return ParamDecorator;
        }
        /**
         * @param {?} cls
         * @param {?} unusedKey
         * @param {?} index
         * @return {?}
         */
        function ParamDecorator(cls, unusedKey, index) {
            var /** @type {?} */ parameters = Reflect.getMetadata('parameters', cls);
            parameters = parameters || [];
            // there might be gaps if some in between parameters do not have annotations.
            // we pad with nulls.
            while (parameters.length <= index) {
                parameters.push(null);
            }
            parameters[index] = parameters[index] || [];
            var /** @type {?} */ annotationsForParam = parameters[index];
            annotationsForParam.push(annotationInstance);
            Reflect.defineMetadata('parameters', parameters, cls);
            return cls;
        }
    }
    ParamDecoratorFactory.prototype = Object.create(annotationCls.prototype);
    ((ParamDecoratorFactory)).annotationCls = annotationCls;
    return ParamDecoratorFactory;
}
exports.makeParamDecorator = makeParamDecorator;
/**
 * @param {?} annotationCls
 * @return {?}
 */
function makePropDecorator(annotationCls) {
    /**
     * @param {...?} args
     * @return {?}
     */
    function PropDecoratorFactory(...args) {
        var /** @type {?} */ decoratorInstance = Object.create(annotationCls.prototype);
        annotationCls.apply(decoratorInstance, args);
        if (this instanceof annotationCls) {
            return decoratorInstance;
        }
        else {
            return function PropDecorator(target, name) {
                var /** @type {?} */ meta = Reflect.getOwnMetadata('propMetadata', target.constructor);
                meta = meta || {};
                meta[name] = meta[name] || [];
                meta[name].unshift(decoratorInstance);
                Reflect.defineMetadata('propMetadata', meta, target.constructor);
            };
        }
    }
    PropDecoratorFactory.prototype = Object.create(annotationCls.prototype);
    ((PropDecoratorFactory)).annotationCls = annotationCls;
    return PropDecoratorFactory;
}
exports.makePropDecorator = makePropDecorator;
//# sourceMappingURL=decorators.js.map