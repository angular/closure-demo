goog.module('_angular$core$src$facade$lang');
var /** @type {?} */ globalScope;
if (typeof window === 'undefined') {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
        globalScope = (self);
    }
    else {
        globalScope = (global);
    }
}
else {
    globalScope = (window);
}
/**
 * @param {?} fn
 * @return {?}
 */
function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}
exports.scheduleMicroTask = scheduleMicroTask;
exports.IS_DART = false;
// Need to declare a new variable for global here since TypeScript
// exports the original value of the symbol.
var /** @type {?} */ _global = globalScope;
exports.global = _global;
exports.Type = Function;
/**
 * @param {?} type
 * @return {?}
 */
function getTypeNameForDebugging(type) {
    if (type['name']) {
        return type['name'];
    }
    return typeof type;
}
exports.getTypeNameForDebugging = getTypeNameForDebugging;
exports.Math = _global.Math;
exports.Date = _global.Date;
var /** @type {?} */ _devMode = true;
var /** @type {?} */ _modeLocked = false;
/**
 * @return {?}
 */
function lockMode() {
    _modeLocked = true;
}
exports.lockMode = lockMode;
/**
 *  Disable Angular's development mode, which turns off assertions and other checks within the framework. * One important assertion this disables verifies that a change detection pass does not result in additional changes to any bindings (also known as unidirectional data flow).
 * @return {?}
 */
function enableProdMode() {
    if (_modeLocked) {
        // Cannot use BaseException as that ends up importing from facade/lang.
        throw 'Cannot enable prod mode after platform setup.';
    }
    _devMode = false;
}
exports.enableProdMode = enableProdMode;
/**
 * @return {?}
 */
function assertionsEnabled() {
    return _devMode;
}
exports.assertionsEnabled = assertionsEnabled;
// TODO: remove calls to assert in production environment
// Note: Can't just export this and import in in other files
// as `assert` is a reserved keyword in Dart
_global.assert = function assert(condition) {
    // TODO: to be fixed properly via #2830, noop for now
};
/**
 * @param {?} obj
 * @return {?}
 */
function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
exports.isPresent = isPresent;
/**
 * @param {?} obj
 * @return {?}
 */
function isBlank(obj) {
    return obj === undefined || obj === null;
}
exports.isBlank = isBlank;
/**
 * @param {?} obj
 * @return {?}
 */
function isBoolean(obj) {
    return typeof obj === "boolean";
}
exports.isBoolean = isBoolean;
/**
 * @param {?} obj
 * @return {?}
 */
function isNumber(obj) {
    return typeof obj === "number";
}
exports.isNumber = isNumber;
/**
 * @param {?} obj
 * @return {?}
 */
function isString(obj) {
    return typeof obj === "string";
}
exports.isString = isString;
/**
 * @param {?} obj
 * @return {?}
 */
function isFunction(obj) {
    return typeof obj === "function";
}
exports.isFunction = isFunction;
/**
 * @param {?} obj
 * @return {?}
 */
function isType(obj) {
    return isFunction(obj);
}
exports.isType = isType;
/**
 * @param {?} obj
 * @return {?}
 */
function isStringMap(obj) {
    return typeof obj === 'object' && obj !== null;
}
exports.isStringMap = isStringMap;
const /** @type {?} */ STRING_MAP_PROTO = Object.getPrototypeOf({});
/**
 * @param {?} obj
 * @return {?}
 */
function isStrictStringMap(obj) {
    return isStringMap(obj) && Object.getPrototypeOf(obj) === STRING_MAP_PROTO;
}
exports.isStrictStringMap = isStrictStringMap;
/**
 * @param {?} obj
 * @return {?}
 */
function isPromise(obj) {
    return obj instanceof ((_global)).Promise;
}
exports.isPromise = isPromise;
/**
 * @param {?} obj
 * @return {?}
 */
function isArray(obj) {
    return Array.isArray(obj);
}
exports.isArray = isArray;
/**
 * @param {?} obj
 * @return {?}
 */
function isDate(obj) {
    return obj instanceof exports.Date && !isNaN(obj.valueOf());
}
exports.isDate = isDate;
/**
 * @return {?}
 */
function noop() { }
exports.noop = noop;
/**
 * @param {?} token
 * @return {?}
 */
function stringify(token) {
    if (typeof token === 'string') {
        return token;
    }
    if (token === undefined || token === null) {
        return '' + token;
    }
    if (token.name) {
        return token.name;
    }
    if (token.overriddenName) {
        return token.overriddenName;
    }
    var /** @type {?} */ res = token.toString();
    var /** @type {?} */ newLineIndex = res.indexOf("\n");
    return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
}
exports.stringify = stringify;
/**
 * @param {?} val
 * @return {?}
 */
function serializeEnum(val) {
    return val;
}
exports.serializeEnum = serializeEnum;
/**
 * @param {?} val
 * @param {?} values
 * @return {?}
 */
function deserializeEnum(val, values) {
    return val;
}
exports.deserializeEnum = deserializeEnum;
/**
 * @param {?} enumValue
 * @param {?} val
 * @return {?}
 */
function resolveEnumToken(enumValue, val) {
    return enumValue[val];
}
exports.resolveEnumToken = resolveEnumToken;
class StringWrapper {
    /**
     * @param {?} code
     * @return {?}
     */
    static fromCharCode(code) { return String.fromCharCode(code); }
    /**
     * @param {?} s
     * @param {?} index
     * @return {?}
     */
    static charCodeAt(s, index) { return s.charCodeAt(index); }
    /**
     * @param {?} s
     * @param {?} regExp
     * @return {?}
     */
    static split(s, regExp) { return s.split(regExp); }
    /**
     * @param {?} s
     * @param {?} s2
     * @return {?}
     */
    static equals(s, s2) { return s === s2; }
    /**
     * @param {?} s
     * @param {?} charVal
     * @return {?}
     */
    static stripLeft(s, charVal) {
        if (s && s.length) {
            var /** @type {?} */ pos = 0;
            for (var /** @type {?} */ i = 0; i < s.length; i++) {
                if (s[i] != charVal)
                    break;
                pos++;
            }
            s = s.substring(pos);
        }
        return s;
    }
    /**
     * @param {?} s
     * @param {?} charVal
     * @return {?}
     */
    static stripRight(s, charVal) {
        if (s && s.length) {
            var /** @type {?} */ pos = s.length;
            for (var /** @type {?} */ i = s.length - 1; i >= 0; i--) {
                if (s[i] != charVal)
                    break;
                pos--;
            }
            s = s.substring(0, pos);
        }
        return s;
    }
    /**
     * @param {?} s
     * @param {?} from
     * @param {?} replace
     * @return {?}
     */
    static replace(s, from, replace) {
        return s.replace(from, replace);
    }
    /**
     * @param {?} s
     * @param {?} from
     * @param {?} replace
     * @return {?}
     */
    static replaceAll(s, from, replace) {
        return s.replace(from, replace);
    }
    /**
     * @param {?} s
     * @param {?=} from
     * @param {?=} to
     * @return {?}
     */
    static slice(s, from = 0, to = null) {
        return s.slice(from, to === null ? undefined : to);
    }
    /**
     * @param {?} s
     * @param {?} from
     * @param {?} cb
     * @return {?}
     */
    static replaceAllMapped(s, from, cb) {
        return s.replace(from, function (...matches) {
            // Remove offset & string from the result array
            matches.splice(-2, 2);
            // The callback receives match, p1, ..., pn
            return cb(matches);
        });
    }
    /**
     * @param {?} s
     * @param {?} substr
     * @return {?}
     */
    static contains(s, substr) { return s.indexOf(substr) != -1; }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static compare(a, b) {
        if (a < b) {
            return -1;
        }
        else if (a > b) {
            return 1;
        }
        else {
            return 0;
        }
    }
}
exports.StringWrapper = StringWrapper;
class StringJoiner {
    /**
     * @param {?=} parts
     */
    constructor(parts = []) {
        this.parts = parts;
    }
    /**
     * @param {?} part
     * @return {?}
     */
    add(part) { this.parts.push(part); }
    /**
     * @return {?}
     */
    toString() { return this.parts.join(""); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        StringJoiner.prototype.parts;
    }
}
exports.StringJoiner = StringJoiner;
class NumberParseError extends Error {
    /**
     * @param {?} message
     */
    constructor(message) {
        super();
        this.message = message;
    }
    /**
     * @return {?}
     */
    toString() { return this.message; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        NumberParseError.prototype.name;
        /** @type {?} */
        NumberParseError.prototype.message;
    }
}
exports.NumberParseError = NumberParseError;
class NumberWrapper {
    /**
     * @param {?} n
     * @param {?} fractionDigits
     * @return {?}
     */
    static toFixed(n, fractionDigits) { return n.toFixed(fractionDigits); }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static equal(a, b) { return a === b; }
    /**
     * @param {?} text
     * @return {?}
     */
    static parseIntAutoRadix(text) {
        var /** @type {?} */ result = parseInt(text);
        if (isNaN(result)) {
            throw new NumberParseError("Invalid integer literal when parsing " + text);
        }
        return result;
    }
    /**
     * @param {?} text
     * @param {?} radix
     * @return {?}
     */
    static parseInt(text, radix) {
        if (radix == 10) {
            if (/^(\-|\+)?[0-9]+$/.test(text)) {
                return parseInt(text, radix);
            }
        }
        else if (radix == 16) {
            if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
                return parseInt(text, radix);
            }
        }
        else {
            var /** @type {?} */ result = parseInt(text, radix);
            if (!isNaN(result)) {
                return result;
            }
        }
        throw new NumberParseError("Invalid integer literal when parsing " + text + " in base " +
            radix);
    }
    /**
     * @param {?} text
     * @return {?}
     */
    static parseFloat(text) { return parseFloat(text); }
    static get NaN() { return NaN; }
    /**
     * @param {?} value
     * @return {?}
     */
    static isNaN(value) { return isNaN(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    static isInteger(value) { return Number.isInteger(value); }
}
exports.NumberWrapper = NumberWrapper;
exports.RegExp = _global.RegExp;
class RegExpWrapper {
    /**
     * @param {?} regExpStr
     * @param {?=} flags
     * @return {?}
     */
    static create(regExpStr, flags = '') {
        flags = flags.replace(/g/g, '');
        return new _global.RegExp(regExpStr, flags + 'g');
    }
    /**
     * @param {?} regExp
     * @param {?} input
     * @return {?}
     */
    static firstMatch(regExp, input) {
        // Reset multimatch regex state
        regExp.lastIndex = 0;
        return regExp.exec(input);
    }
    /**
     * @param {?} regExp
     * @param {?} input
     * @return {?}
     */
    static test(regExp, input) {
        regExp.lastIndex = 0;
        return regExp.test(input);
    }
    /**
     * @param {?} regExp
     * @param {?} input
     * @return {?}
     */
    static matcher(regExp, input) {
        // Reset regex state for the case
        // someone did not loop over all matches
        // last time.
        regExp.lastIndex = 0;
        return { re: regExp, input: input };
    }
    /**
     * @param {?} regExp
     * @param {?} input
     * @param {?} replace
     * @return {?}
     */
    static replaceAll(regExp, input, replace) {
        let /** @type {?} */ c = regExp.exec(input);
        let /** @type {?} */ res = '';
        regExp.lastIndex = 0;
        let /** @type {?} */ prev = 0;
        while (c) {
            res += input.substring(prev, c.index);
            res += replace(c);
            prev = c.index + c[0].length;
            regExp.lastIndex = prev;
            c = regExp.exec(input);
        }
        res += input.substring(prev);
        return res;
    }
}
exports.RegExpWrapper = RegExpWrapper;
class RegExpMatcherWrapper {
    /**
     * @param {?} matcher
     * @return {?}
     */
    static next(matcher) {
        return matcher.re.exec(matcher.input);
    }
}
exports.RegExpMatcherWrapper = RegExpMatcherWrapper;
class FunctionWrapper {
    /**
     * @param {?} fn
     * @param {?} posArgs
     * @return {?}
     */
    static apply(fn, posArgs) { return fn.apply(null, posArgs); }
}
exports.FunctionWrapper = FunctionWrapper;
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function looseIdentical(a, b) {
    return a === b || typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b);
}
exports.looseIdentical = looseIdentical;
/**
 * @param {?} value
 * @return {?}
 */
function getMapKey(value) {
    return value;
}
exports.getMapKey = getMapKey;
/**
 * @param {?} obj
 * @return {?}
 */
function normalizeBlank(obj) {
    return isBlank(obj) ? null : obj;
}
exports.normalizeBlank = normalizeBlank;
/**
 * @param {?} obj
 * @return {?}
 */
function normalizeBool(obj) {
    return isBlank(obj) ? false : obj;
}
exports.normalizeBool = normalizeBool;
/**
 * @param {?} o
 * @return {?}
 */
function isJsObject(o) {
    return o !== null && (typeof o === "function" || typeof o === "object");
}
exports.isJsObject = isJsObject;
/**
 * @param {?} obj
 * @return {?}
 */
function print(obj) {
    console.log(obj);
}
exports.print = print;
/**
 * @param {?} obj
 * @return {?}
 */
function warn(obj) {
    console.warn(obj);
}
exports.warn = warn;
// Can't be all uppercase as our transpiler would think it is a special directive...
class Json {
    /**
     * @param {?} s
     * @return {?}
     */
    static parse(s) { return _global.JSON.parse(s); }
    /**
     * @param {?} data
     * @return {?}
     */
    static stringify(data) {
        // Dart doesn't take 3 arguments
        return _global.JSON.stringify(data, null, 2);
    }
}
exports.Json = Json;
class DateWrapper {
    /**
     * @param {?} year
     * @param {?=} month
     * @param {?=} day
     * @param {?=} hour
     * @param {?=} minutes
     * @param {?=} seconds
     * @param {?=} milliseconds
     * @return {?}
     */
    static create(year, month = 1, day = 1, hour = 0, minutes = 0, seconds = 0, milliseconds = 0) {
        return new exports.Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
    }
    /**
     * @param {?} str
     * @return {?}
     */
    static fromISOString(str) { return new exports.Date(str); }
    /**
     * @param {?} ms
     * @return {?}
     */
    static fromMillis(ms) { return new exports.Date(ms); }
    /**
     * @param {?} date
     * @return {?}
     */
    static toMillis(date) { return date.getTime(); }
    /**
     * @return {?}
     */
    static now() { return new exports.Date(); }
    /**
     * @param {?} date
     * @return {?}
     */
    static toJson(date) { return date.toJSON(); }
}
exports.DateWrapper = DateWrapper;
/**
 * @param {?} global
 * @param {?} path
 * @param {?} value
 * @return {?}
 */
function setValueOnPath(global, path, value) {
    var /** @type {?} */ parts = path.split('.');
    var /** @type {?} */ obj = global;
    while (parts.length > 1) {
        var /** @type {?} */ name = parts.shift();
        if (obj.hasOwnProperty(name) && isPresent(obj[name])) {
            obj = obj[name];
        }
        else {
            obj = obj[name] = {};
        }
    }
    if (obj === undefined || obj === null) {
        obj = {};
    }
    obj[parts.shift()] = value;
}
exports.setValueOnPath = setValueOnPath;
var /** @type {?} */ _symbolIterator = null;
/**
 * @return {?}
 */
function getSymbolIterator() {
    if (isBlank(_symbolIterator)) {
        if (isPresent(((globalScope)).Symbol) && isPresent(Symbol.iterator)) {
            _symbolIterator = Symbol.iterator;
        }
        else {
            // es6-shim specific logic
            var /** @type {?} */ keys = Object.getOwnPropertyNames(Map.prototype);
            for (var /** @type {?} */ i = 0; i < keys.length; ++i) {
                var /** @type {?} */ key = keys[i];
                if (key !== 'entries' && key !== 'size' &&
                    Map.prototype[key] === Map.prototype['entries']) {
                    _symbolIterator = key;
                }
            }
        }
    }
    return _symbolIterator;
}
exports.getSymbolIterator = getSymbolIterator;
/**
 * @param {?} sourceUrl
 * @param {?} expr
 * @param {?} declarations
 * @param {?} vars
 * @return {?}
 */
function evalExpression(sourceUrl, expr, declarations, vars) {
    var /** @type {?} */ fnBody = `${declarations}\nreturn ${expr}\n//# sourceURL=${sourceUrl}`;
    var /** @type {?} */ fnArgNames = [];
    var /** @type {?} */ fnArgValues = [];
    for (var argName in vars) {
        fnArgNames.push(argName);
        fnArgValues.push(vars[argName]);
    }
    return new Function(...fnArgNames.concat(fnBody))(...fnArgValues);
}
exports.evalExpression = evalExpression;
/**
 * @param {?} obj
 * @return {?}
 */
function isPrimitive(obj) {
    return !isJsObject(obj);
}
exports.isPrimitive = isPrimitive;
/**
 * @param {?} value
 * @param {?} type
 * @return {?}
 */
function hasConstructor(value, type) {
    return value.constructor === type;
}
exports.hasConstructor = hasConstructor;
/**
 * @param {?} values
 * @return {?}
 */
function bitWiseOr(values) {
    return values.reduce((a, b) => { return a | b; });
}
exports.bitWiseOr = bitWiseOr;
/**
 * @param {?} values
 * @return {?}
 */
function bitWiseAnd(values) {
    return values.reduce((a, b) => { return a & b; });
}
exports.bitWiseAnd = bitWiseAnd;
/**
 * @param {?} s
 * @return {?}
 */
function escape(s) {
    return _global.encodeURI(s);
}
exports.escape = escape;
//# sourceMappingURL=lang.js.map