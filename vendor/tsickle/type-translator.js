"use strict";
var ts = require('typescript');
function typeToDebugString(type) {
    var basicTypes = [
        ts.TypeFlags.Any, ts.TypeFlags.String,
        ts.TypeFlags.Number, ts.TypeFlags.Boolean,
        ts.TypeFlags.Void, ts.TypeFlags.Undefined,
        ts.TypeFlags.Null, ts.TypeFlags.Enum,
        ts.TypeFlags.StringLiteral, ts.TypeFlags.TypeParameter,
        ts.TypeFlags.Class, ts.TypeFlags.Interface,
        ts.TypeFlags.Reference, ts.TypeFlags.Tuple,
        ts.TypeFlags.Union, ts.TypeFlags.Intersection,
        ts.TypeFlags.Anonymous, ts.TypeFlags.Instantiated,
        ts.TypeFlags.ObjectLiteral, ts.TypeFlags.ESSymbol,
        ts.TypeFlags.ThisType, ts.TypeFlags.ObjectLiteralPatternWithComputedProperties,
    ];
    var names = [];
    for (var _i = 0, basicTypes_1 = basicTypes; _i < basicTypes_1.length; _i++) {
        var flag = basicTypes_1[_i];
        if ((type.flags & flag) !== 0) {
            names.push(ts.TypeFlags[flag]);
        }
    }
    // combinedTypes are TypeFlags that represent combined values.
    // For example, NumberLike = Number|Enum.
    var combinedTypes = [
        ts.TypeFlags.StringLike,
        ts.TypeFlags.NumberLike,
        ts.TypeFlags.ObjectType,
        ts.TypeFlags.UnionOrIntersection,
        ts.TypeFlags.StructuredType,
    ];
    var features = [];
    for (var _a = 0, combinedTypes_1 = combinedTypes; _a < combinedTypes_1.length; _a++) {
        var flag = combinedTypes_1[_a];
        if ((type.flags & flag) !== 0) {
            features.push(ts.TypeFlags[flag]);
        }
    }
    var debugString = "flags:0x" + type.flags.toString(16);
    debugString += ' ' + names.join(' ');
    if (features.length > 0) {
        debugString += " features:" + features.join(',');
    }
    if (type.symbol && type.symbol.name !== '__type') {
        debugString += " symbol.name:" + JSON.stringify(type.symbol.name);
    }
    if (type.pattern) {
        debugString += " destructuring:true";
    }
    return "{type " + debugString + "}";
}
exports.typeToDebugString = typeToDebugString;
function symbolToDebugString(sym) {
    var debugString = JSON.stringify(sym.name) + " " + sym.flags.toString(16);
    return "{sym: " + debugString + "}";
}
exports.symbolToDebugString = symbolToDebugString;
/** TypeTranslator translates TypeScript types to Closure types. */
var TypeTranslator = (function () {
    /**
     * @param node is the source AST ts.Node the type comes from.  This is used
     *     in some cases (e.g. anonymous types) for looking up field names.
     */
    function TypeTranslator(typeChecker, node) {
        this.typeChecker = typeChecker;
        this.node = node;
    }
    /**
     * @param notNull When true, insert a ! before any type references.  This
     *    is to work around the difference between TS and Closure destructuring.
     */
    TypeTranslator.prototype.translate = function (type, notNull) {
        // See the function `buildTypeDisplay` in the TypeScript compiler source
        // for guidance on a similar operation.
        var _this = this;
        if (notNull === void 0) { notNull = false; }
        // NOTE: type.flags is a single value for primitive types, but sometimes a
        // bitwise 'or' of some values for more complex types.  We use a switch
        // statement for the basics and a series of "if" tests for the complex ones,
        // roughly in the same order the flags occur in the TypeFlags enum.
        switch (type.flags) {
            case ts.TypeFlags.Any:
                return '?';
            case ts.TypeFlags.String:
                return 'string';
            case ts.TypeFlags.Number:
                return 'number';
            case ts.TypeFlags.Boolean:
                return 'boolean';
            case ts.TypeFlags.Void:
                return 'void';
            case ts.TypeFlags.Undefined:
                return 'undefined';
            case ts.TypeFlags.Null:
                return 'null';
            case ts.TypeFlags.Enum:
                return 'number';
            case ts.TypeFlags.StringLiteral:
                return 'string';
            default:
        }
        var notNullPrefix = notNull ? '!' : '';
        if (type.flags & (ts.TypeFlags.Interface | ts.TypeFlags.Class)) {
            // Note: ts.InterfaceType has a typeParameters field, but that
            // specifies the parameters that the interface type *expects*
            // when it's used, and should not be transformed to the output.
            // E.g. a type like Array<number> is a TypeReference to the
            // InterfaceType "Array", but the "number" type parameter is
            // part of the outer TypeReference, not a typeParameter on
            // the InterfaceType.
            return type.symbol.name;
        }
        else if (type.flags & ts.TypeFlags.Reference) {
            // A reference to another type, e.g. Array<number> refers to Array.
            // Emit the referenced type and any type arguments.
            var referenceType = type;
            if (referenceType.target === referenceType) {
                // We get into an infinite loop here if the inner reference is
                // the same as the outer; this can occur when this function
                // fails to translate a more specific type before getting to
                // this point.
                throw new Error("reference loop in " + typeToDebugString(referenceType));
            }
            var typeStr = notNullPrefix + this.translate(referenceType.target);
            if (referenceType.typeArguments) {
                var params = referenceType.typeArguments.map(function (t) { return _this.translate(t, notNull); });
                typeStr += "<" + params.join(', ') + ">";
            }
            return typeStr;
        }
        else if (type.flags & ts.TypeFlags.Anonymous) {
            if (!type.symbol) {
                // This comes up when generating code for an arrow function as passed
                // to a generic function.  The passed-in type is tagged as anonymous
                // and has no properties so it's hard to figure out what to generate.
                // Just avoid it for now so we don't crash.
                this.warn('anonymous type has no symbol');
                return '?';
            }
            if (type.symbol.flags === ts.SymbolFlags.TypeLiteral) {
                return notNullPrefix + this.translateTypeLiteral(type);
            }
            else if (type.symbol.flags === ts.SymbolFlags.Function) {
                var sigs = this.typeChecker.getSignaturesOfType(type, ts.SignatureKind.Call);
                if (sigs.length === 1) {
                    return this.signatureToClosure(sigs[0]);
                }
            }
            this.warn('unhandled anonymous type');
            return '?';
        }
        else if (type.flags & ts.TypeFlags.Union) {
            var unionType = type;
            var parts = unionType.types.map(function (t) { return _this.translate(t); });
            return "(" + parts.join('|') + ")";
        }
        this.warn("unhandled type " + typeToDebugString(type));
        return '?';
    };
    TypeTranslator.prototype.translateTypeLiteral = function (type) {
        // Gather up all the named fields and whether the object is also callable.
        var callable = false;
        var indexable = false;
        var fields = [];
        for (var _i = 0, _a = Object.keys(type.symbol.members); _i < _a.length; _i++) {
            var field = _a[_i];
            switch (field) {
                case '__call':
                    callable = true;
                    break;
                case '__index':
                    indexable = true;
                    break;
                default:
                    var member = type.symbol.members[field];
                    var isOptional = member.flags & ts.SymbolFlags.Optional;
                    var memberType = this.translate(this.typeChecker.getTypeOfSymbolAtLocation(member, this.node));
                    if (isOptional) {
                        memberType = "(" + memberType + "|undefined)";
                    }
                    fields.push(field + ": " + memberType);
            }
        }
        // Try to special-case plain key-value objects and functions.
        if (fields.length === 0) {
            if (callable && !indexable) {
                // A function type.
                var sigs = this.typeChecker.getSignaturesOfType(type, ts.SignatureKind.Call);
                if (sigs.length === 1) {
                    return this.signatureToClosure(sigs[0]);
                }
            }
            else if (indexable && !callable) {
                // A plain key-value map type.
                var keyType = 'string';
                var valType = this.typeChecker.getIndexTypeOfType(type, ts.IndexKind.String);
                if (!valType) {
                    keyType = 'number';
                    valType = this.typeChecker.getIndexTypeOfType(type, ts.IndexKind.Number);
                }
                if (!valType) {
                    this.warn('unknown index key type');
                    return "Object<?,?>";
                }
                return "Object<" + keyType + "," + this.translate(valType) + ">";
            }
            else if (!callable && !indexable) {
                // Special-case the empty object {} because Closure doesn't like it.
                // TODO(evanm): revisit this if it is a problem.
                return 'Object';
            }
        }
        if (!callable && !indexable) {
            // Not callable, not indexable; implies a plain object with fields in it.
            return "{" + fields.join(', ') + "}";
        }
        this.warn('unhandled type literal');
        return '?';
    };
    /** Converts a ts.Signature (function signature) to a Closure function type. */
    TypeTranslator.prototype.signatureToClosure = function (sig) {
        var params = [];
        for (var _i = 0, _a = sig.parameters; _i < _a.length; _i++) {
            var param = _a[_i];
            params.push(this.translate(this.typeChecker.getTypeOfSymbolAtLocation(param, this.node)));
        }
        var typeStr = "function(" + params.join(', ') + ")";
        var retType = this.translate(this.typeChecker.getReturnTypeOfSignature(sig));
        if (retType) {
            typeStr += ": " + retType;
        }
        return typeStr;
    };
    TypeTranslator.prototype.warn = function (msg) {
        // By default, warn() does nothing.  The caller will overwrite this
        // if it wants different behavior.
    };
    return TypeTranslator;
}());
exports.TypeTranslator = TypeTranslator;

//# sourceMappingURL=type-translator.js.map
