"use strict";
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var core_3 = require("@angular/core");
/**
 * A token representing the a reference to a static type.
 *
 * This token is unique for a filePath and name and can be used as a hash table key.
 */
var StaticSymbol = (function () {
    function StaticSymbol(filePath, name) {
        this.filePath = filePath;
        this.name = name;
    }
    return StaticSymbol;
}());
exports.StaticSymbol = StaticSymbol;
/**
 * A static reflector implements enough of the Reflector API that is necessary to compile
 * templates statically.
 */
var StaticReflector = (function () {
    function StaticReflector(host) {
        this.host = host;
        this.annotationCache = new Map();
        this.propertyCache = new Map();
        this.parameterCache = new Map();
        this.metadataCache = new Map();
        this.conversionMap = new Map();
        this.initializeConversionMap();
    }
    StaticReflector.prototype.importUri = function (typeOrFunc) {
        var staticSymbol = this.host.findDeclaration(typeOrFunc.filePath, typeOrFunc.name, '');
        return staticSymbol ? staticSymbol.filePath : null;
    };
    StaticReflector.prototype.annotations = function (type) {
        var annotations = this.annotationCache.get(type);
        if (!annotations) {
            var classMetadata = this.getTypeMetadata(type);
            if (classMetadata['decorators']) {
                annotations = this.simplify(type, classMetadata['decorators']);
            }
            else {
                annotations = [];
            }
            this.annotationCache.set(type, annotations.filter(function (ann) { return !!ann; }));
        }
        return annotations;
    };
    StaticReflector.prototype.propMetadata = function (type) {
        var _this = this;
        var propMetadata = this.propertyCache.get(type);
        if (!propMetadata) {
            var classMetadata = this.getTypeMetadata(type);
            var members = classMetadata ? classMetadata['members'] : {};
            propMetadata = mapStringMap(members, function (propData, propName) {
                var prop = propData.find(function (a) { return a['__symbolic'] == 'property'; });
                if (prop && prop['decorators']) {
                    return _this.simplify(type, prop['decorators']);
                }
                else {
                    return [];
                }
            });
            this.propertyCache.set(type, propMetadata);
        }
        return propMetadata;
    };
    StaticReflector.prototype.parameters = function (type) {
        if (!(type instanceof StaticSymbol)) {
            throw new Error("parameters received " + JSON.stringify(type) + " which is not a StaticSymbol");
        }
        try {
            var parameters_1 = this.parameterCache.get(type);
            if (!parameters_1) {
                var classMetadata = this.getTypeMetadata(type);
                var members = classMetadata ? classMetadata['members'] : null;
                var ctorData = members ? members['__ctor__'] : null;
                if (ctorData) {
                    var ctor = ctorData.find(function (a) { return a['__symbolic'] == 'constructor'; });
                    var parameterTypes = this.simplify(type, ctor['parameters'] || []);
                    var parameterDecorators_1 = this.simplify(type, ctor['parameterDecorators'] || []);
                    parameters_1 = [];
                    parameterTypes.forEach(function (paramType, index) {
                        var nestedResult = [];
                        if (paramType) {
                            nestedResult.push(paramType);
                        }
                        var decorators = parameterDecorators_1 ? parameterDecorators_1[index] : null;
                        if (decorators) {
                            nestedResult.push.apply(nestedResult, decorators);
                        }
                        parameters_1.push(nestedResult);
                    });
                }
                if (!parameters_1) {
                    parameters_1 = [];
                }
                this.parameterCache.set(type, parameters_1);
            }
            return parameters_1;
        }
        catch (e) {
            console.log("Failed on type " + JSON.stringify(type) + " with error " + e);
            throw e;
        }
    };
    StaticReflector.prototype.hasLifecycleHook = function (type, lcInterface, lcProperty) {
        if (!(type instanceof StaticSymbol)) {
            throw new Error("hasLifecycleHook received " + JSON.stringify(type) + " which is not a StaticSymbol");
        }
        var classMetadata = this.getTypeMetadata(type);
        var members = classMetadata ? classMetadata['members'] : null;
        var member = members ? members[lcProperty] : null;
        return member ? member.some(function (a) { return a['__symbolic'] == 'method'; }) : false;
    };
    StaticReflector.prototype.registerDecoratorOrConstructor = function (type, ctor) {
        var _this = this;
        this.conversionMap.set(type, function (context, args) {
            var argValues = [];
            args.forEach(function (arg, index) {
                var argValue;
                if (typeof arg === 'object' && !arg['__symbolic']) {
                    argValue = mapStringMap(arg, function (value, key) { return _this.simplify(context, value); });
                }
                else {
                    argValue = _this.simplify(context, arg);
                }
                argValues.push(argValue);
            });
            var metadata = Object.create(ctor.prototype);
            ctor.apply(metadata, argValues);
            return metadata;
        });
    };
    StaticReflector.prototype.initializeConversionMap = function () {
        var _a = this.host.angularImportLocations(), coreDecorators = _a.coreDecorators, diDecorators = _a.diDecorators, diMetadata = _a.diMetadata, provider = _a.provider;
        this.registerDecoratorOrConstructor(this.host.findDeclaration(provider, 'Provider'), core_2.Provider);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diDecorators, 'Host'), core_3.HostMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diDecorators, 'Injectable'), core_3.InjectableMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diDecorators, 'Self'), core_3.SelfMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diDecorators, 'SkipSelf'), core_3.SkipSelfMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diDecorators, 'Inject'), core_3.InjectMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diDecorators, 'Optional'), core_3.OptionalMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'Attribute'), core_1.AttributeMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'Query'), core_1.QueryMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'ViewQuery'), core_1.ViewQueryMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'ContentChild'), core_1.ContentChildMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'ContentChildren'), core_1.ContentChildrenMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'ViewChild'), core_1.ViewChildMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'ViewChildren'), core_1.ViewChildrenMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'Input'), core_1.InputMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'Output'), core_1.OutputMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'Pipe'), core_1.PipeMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'HostBinding'), core_1.HostBindingMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'HostListener'), core_1.HostListenerMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'Directive'), core_1.DirectiveMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'Component'), core_1.ComponentMetadata);
        // Note: Some metadata classes can be used directly with Provider.deps.
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diMetadata, 'HostMetadata'), core_3.HostMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diMetadata, 'SelfMetadata'), core_3.SelfMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diMetadata, 'SkipSelfMetadata'), core_3.SkipSelfMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diMetadata, 'OptionalMetadata'), core_3.OptionalMetadata);
    };
    /** @internal */
    StaticReflector.prototype.simplify = function (context, value) {
        var _this = this;
        function simplify(expression) {
            if (isPrimitive(expression)) {
                return expression;
            }
            if (expression instanceof Array) {
                var result = [];
                for (var _i = 0, _a = expression; _i < _a.length; _i++) {
                    var item = _a[_i];
                    result.push(simplify(item));
                }
                return result;
            }
            if (expression) {
                if (expression['__symbolic']) {
                    var staticSymbol = void 0;
                    switch (expression['__symbolic']) {
                        case "binop":
                            var left = simplify(expression['left']);
                            var right = simplify(expression['right']);
                            switch (expression['operator']) {
                                case '&&':
                                    return left && right;
                                case '||':
                                    return left || right;
                                case '|':
                                    return left | right;
                                case '^':
                                    return left ^ right;
                                case '&':
                                    return left & right;
                                case '==':
                                    return left == right;
                                case '!=':
                                    return left != right;
                                case '===':
                                    return left === right;
                                case '!==':
                                    return left !== right;
                                case '<':
                                    return left < right;
                                case '>':
                                    return left > right;
                                case '<=':
                                    return left <= right;
                                case '>=':
                                    return left >= right;
                                case '<<':
                                    return left << right;
                                case '>>':
                                    return left >> right;
                                case '+':
                                    return left + right;
                                case '-':
                                    return left - right;
                                case '*':
                                    return left * right;
                                case '/':
                                    return left / right;
                                case '%':
                                    return left % right;
                            }
                            return null;
                        case "pre":
                            var operand = simplify(expression['operand']);
                            switch (expression['operator']) {
                                case '+':
                                    return operand;
                                case '-':
                                    return -operand;
                                case '!':
                                    return !operand;
                                case '~':
                                    return ~operand;
                            }
                            return null;
                        case "index":
                            var indexTarget = simplify(expression['expression']);
                            var index = simplify(expression['index']);
                            if (indexTarget && isPrimitive(index))
                                return indexTarget[index];
                            return null;
                        case "select":
                            var selectTarget = simplify(expression['expression']);
                            var member = simplify(expression['member']);
                            if (selectTarget && isPrimitive(member))
                                return selectTarget[member];
                            return null;
                        case "reference":
                            if (expression['module']) {
                                staticSymbol = _this.host.findDeclaration(expression['module'], expression['name'], context.filePath);
                            }
                            else {
                                staticSymbol = _this.host.getStaticSymbol(context.filePath, expression['name']);
                            }
                            var result = staticSymbol;
                            var moduleMetadata = _this.getModuleMetadata(staticSymbol.filePath);
                            var declarationValue = moduleMetadata ? moduleMetadata['metadata'][staticSymbol.name] : null;
                            if (declarationValue) {
                                result = _this.simplify(staticSymbol, declarationValue);
                            }
                            return result;
                        case "class":
                            return context;
                        case "new":
                        case "call":
                            var target = expression['expression'];
                            staticSymbol =
                                _this.host.findDeclaration(target['module'], target['name'], context.filePath);
                            var converter = _this.conversionMap.get(staticSymbol);
                            if (converter) {
                                var args = expression['arguments'];
                                if (!args) {
                                    args = [];
                                }
                                return converter(context, args);
                            }
                            else {
                                return context;
                            }
                    }
                    return null;
                }
                return mapStringMap(expression, function (value, name) { return simplify(value); });
            }
            return null;
        }
        return simplify(value);
    };
    /**
     * @param module an absolute path to a module file.
     */
    StaticReflector.prototype.getModuleMetadata = function (module) {
        var moduleMetadata = this.metadataCache.get(module);
        if (!moduleMetadata) {
            moduleMetadata = this.host.getMetadataFor(module);
            if (!moduleMetadata) {
                moduleMetadata = { __symbolic: "module", module: module, metadata: {} };
            }
            this.metadataCache.set(module, moduleMetadata);
        }
        return moduleMetadata;
    };
    StaticReflector.prototype.getTypeMetadata = function (type) {
        var moduleMetadata = this.getModuleMetadata(type.filePath);
        var result = moduleMetadata['metadata'][type.name];
        if (!result) {
            result = { __symbolic: "class" };
        }
        return result;
    };
    return StaticReflector;
}());
exports.StaticReflector = StaticReflector;
function mapStringMap(input, transform) {
    if (!input)
        return {};
    var result = {};
    Object.keys(input).forEach(function (key) { result[key] = transform(input[key], key); });
    return result;
}
function isPrimitive(o) {
    return o === null || (typeof o !== "function" && typeof o !== "object");
}
//# sourceMappingURL=static_reflector.js.map