goog.module('_angular$compiler$src$util');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
exports.MODULE_SUFFIX = lang_1.IS_DART ? '.dart' : '';
var /** @type {?} */ CAMEL_CASE_REGEXP = /([A-Z])/g;
var /** @type {?} */ DASH_CASE_REGEXP = /-([a-z])/g;
/**
 * @param {?} input
 * @return {?}
 */
function camelCaseToDashCase(input) {
    return lang_1.StringWrapper.replaceAllMapped(input, CAMEL_CASE_REGEXP, (m) => { return '-' + m[1].toLowerCase(); });
}
exports.camelCaseToDashCase = camelCaseToDashCase;
/**
 * @param {?} input
 * @return {?}
 */
function dashCaseToCamelCase(input) {
    return lang_1.StringWrapper.replaceAllMapped(input, DASH_CASE_REGEXP, (m) => { return m[1].toUpperCase(); });
}
exports.dashCaseToCamelCase = dashCaseToCamelCase;
/**
 * @param {?} input
 * @param {?} defaultValues
 * @return {?}
 */
function splitAtColon(input, defaultValues) {
    var /** @type {?} */ parts = lang_1.StringWrapper.split(input.trim(), /\s*:\s*/g);
    if (parts.length > 1) {
        return parts;
    }
    else {
        return defaultValues;
    }
}
exports.splitAtColon = splitAtColon;
/**
 * @param {?} name
 * @return {?}
 */
function sanitizeIdentifier(name) {
    return lang_1.StringWrapper.replaceAll(name, /\W/g, '_');
}
exports.sanitizeIdentifier = sanitizeIdentifier;
/**
 * @param {?} value
 * @param {?} visitor
 * @param {?} context
 * @return {?}
 */
function visitValue(value, visitor, context) {
    if (lang_1.isArray(value)) {
        return visitor.visitArray(/** @type {?} */ (value), context);
    }
    else if (lang_1.isStrictStringMap(value)) {
        return visitor.visitStringMap(/** @type {?} */ (value), context);
    }
    else if (lang_1.isBlank(value) || lang_1.isPrimitive(value)) {
        return visitor.visitPrimitive(value, context);
    }
    else {
        return visitor.visitOther(value, context);
    }
}
exports.visitValue = visitValue;
class ValueTransformer {
    /**
     * @param {?} arr
     * @param {?} context
     * @return {?}
     */
    visitArray(arr, context) {
        return arr.map(value => visitValue(value, this, context));
    }
    /**
     * @param {?} map
     * @param {?} context
     * @return {?}
     */
    visitStringMap(map, context) {
        var /** @type {?} */ result = {};
        collection_1.StringMapWrapper.forEach(map, (value, key) => { result[key] = visitValue(value, this, context); });
        return result;
    }
    /**
     * @param {?} value
     * @param {?} context
     * @return {?}
     */
    visitPrimitive(value, context) { return value; }
    /**
     * @param {?} value
     * @param {?} context
     * @return {?}
     */
    visitOther(value, context) { return value; }
}
exports.ValueTransformer = ValueTransformer;
/**
 * @param {?} pkg
 * @param {?=} path
 * @param {?=} type
 * @return {?}
 */
function assetUrl(pkg, path = null, type = 'src') {
    if (lang_1.IS_DART) {
        if (path == null) {
            return `asset:angular2/${pkg}/${pkg}.dart`;
        }
        else {
            return `asset:angular2/lib/${pkg}/src/${path}.dart`;
        }
    }
    else {
        if (path == null) {
            return `asset:@angular/lib/${pkg}/index`;
        }
        else {
            return `asset:@angular/lib/${pkg}/src/${path}`;
        }
    }
}
exports.assetUrl = assetUrl;
//# sourceMappingURL=util.js.map