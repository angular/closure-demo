goog.module('_angular$compiler$src$assertions');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
/**
 * @param {?} identifier
 * @param {?} value
 * @return {?}
 */
function assertArrayOfStrings(identifier, value) {
    if (!lang_1.assertionsEnabled() || lang_1.isBlank(value)) {
        return;
    }
    if (!lang_1.isArray(value)) {
        throw new exceptions_1.BaseException(`Expected '${identifier}' to be an array of strings.`);
    }
    for (var /** @type {?} */ i = 0; i < value.length; i += 1) {
        if (!lang_1.isString(value[i])) {
            throw new exceptions_1.BaseException(`Expected '${identifier}' to be an array of strings.`);
        }
    }
}
exports.assertArrayOfStrings = assertArrayOfStrings;
//# sourceMappingURL=assertions.js.map