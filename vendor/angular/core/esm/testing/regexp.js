goog.module('_angular$core$testing$regexp');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var /** @type {?} */ _RE_SPECIAL_CHARS = ['-', '[', ']', '/', '{', '}', '\\', '(', ')', '*', '+', '?', '.', '^', '$', '|'];
var /** @type {?} */ _ESCAPE_RE = lang_1.RegExpWrapper.create(`[\\${_RE_SPECIAL_CHARS.join('\\')}]`);
/**
 * @param {?} input
 * @return {?}
 */
function containsRegexp(input) {
    return lang_1.RegExpWrapper.create(lang_1.StringWrapper.replaceAllMapped(input, _ESCAPE_RE, (match) => `\\${match[0]}`));
}
exports.containsRegexp = containsRegexp;
//# sourceMappingURL=regexp.js.map