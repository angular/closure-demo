goog.module('_angular$common$src$pipes$i18n__select__pipe');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var collection_1 = goog.require('_angular$common$src$facade$collection');
var invalid_pipe_argument_exception_1 = goog.require('_angular$common$src$pipes$invalid__pipe__argument__exception');
class I18nSelectPipe {
    /**
     * @param {?} value
     * @param {?} mapping
     * @return {?}
     */
    transform(value, mapping) {
        if (!lang_1.isStringMap(mapping)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(I18nSelectPipe, mapping);
        }
        return collection_1.StringMapWrapper.contains(mapping, value) ? mapping[value] : mapping['other'];
    }
}
/** @nocollapse */ I18nSelectPipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'i18nSelect', pure: true },] },
    { type: core_1.Injectable },
];
exports.I18nSelectPipe = I18nSelectPipe;
//# sourceMappingURL=i18n_select_pipe.js.map