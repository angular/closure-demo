goog.module('_angular$common$src$pipes$i18n__plural__pipe');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var invalid_pipe_argument_exception_1 = goog.require('_angular$common$src$pipes$invalid__pipe__argument__exception');
var /** @type {?} */ interpolationExp = lang_1.RegExpWrapper.create('#');
class I18nPluralPipe {
    /**
     * @param {?} value
     * @param {?} pluralMap
     * @return {?}
     */
    transform(value, pluralMap) {
        var /** @type {?} */ key;
        var /** @type {?} */ valueStr;
        if (!lang_1.isStringMap(pluralMap)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(I18nPluralPipe, pluralMap);
        }
        key = value === 0 || value === 1 ? `=${value}` : 'other';
        valueStr = lang_1.isPresent(value) ? value.toString() : '';
        return lang_1.StringWrapper.replaceAll(pluralMap[key], interpolationExp, valueStr);
    }
}
I18nPluralPipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'i18nPlural', pure: true },] },
    { type: core_1.Injectable },
];
exports.I18nPluralPipe = I18nPluralPipe;
//# sourceMappingURL=i18n_plural_pipe.js.map