goog.module('_angular$platform_browser$src$dom$util');
var lang_1 = goog.require('_angular$platform_browser$src$facade$lang');
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
//# sourceMappingURL=util.js.map