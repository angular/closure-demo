goog.module('_angular$http$src$http__utils');
var lang_1 = goog.require('_angular$http$src$facade$lang');
var enums_1 = goog.require('_angular$http$src$enums');
var exceptions_1 = goog.require('_angular$http$src$facade$exceptions');
/**
 * @param {?} method
 * @return {?}
 */
function normalizeMethodName(method) {
    if (lang_1.isString(method)) {
        var /** @type {?} */ originalMethod = method;
        method = ((method))
            .replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase());
        method = (((enums_1.RequestMethod))[method]);
        if (typeof method !== 'number')
            throw exceptions_1.makeTypeError(`Invalid request method. The method "${originalMethod}" is not supported.`);
    }
    return (method);
}
exports.normalizeMethodName = normalizeMethodName;
exports.isSuccess = (status) => (status >= 200 && status < 300);
/**
 * @param {?} xhr
 * @return {?}
 */
function getResponseURL(xhr) {
    if ('responseURL' in xhr) {
        return xhr.responseURL;
    }
    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
        return xhr.getResponseHeader('X-Request-URL');
    }
    return;
}
exports.getResponseURL = getResponseURL;
var lang_2 = lang_1;
exports.isJsObject = lang_2.isJsObject;
//# sourceMappingURL=http_utils.js.map