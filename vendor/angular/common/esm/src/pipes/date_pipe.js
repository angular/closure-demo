goog.module('_angular$common$src$pipes$date__pipe');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var intl_1 = goog.require('_angular$common$src$facade$intl');
var collection_1 = goog.require('_angular$common$src$facade$collection');
var invalid_pipe_argument_exception_1 = goog.require('_angular$common$src$pipes$invalid__pipe__argument__exception');
// TODO: move to a global configurable location along with other i18n components.
var /** @type {?} */ defaultLocale = 'en-US';
class DatePipe {
    /**
     * @param {?} value
     * @param {?=} pattern
     * @return {?}
     */
    transform(value, pattern = 'mediumDate') {
        if (lang_1.isBlank(value))
            return null;
        if (!this.supports(value)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(DatePipe, value);
        }
        if (lang_1.isNumber(value)) {
            value = lang_1.DateWrapper.fromMillis(value);
        }
        if (collection_1.StringMapWrapper.contains(DatePipe._ALIASES, pattern)) {
            pattern = (collection_1.StringMapWrapper.get(DatePipe._ALIASES, pattern));
        }
        return intl_1.DateFormatter.format(value, defaultLocale, pattern);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    supports(obj) { return lang_1.isDate(obj) || lang_1.isNumber(obj); }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        DatePipe._ALIASES;
    }
}
/** @internal */
DatePipe._ALIASES = {
    'medium': 'yMMMdjms',
    'short': 'yMdjm',
    'fullDate': 'yMMMMEEEEd',
    'longDate': 'yMMMMd',
    'mediumDate': 'yMMMd',
    'shortDate': 'yMd',
    'mediumTime': 'jms',
    'shortTime': 'jm'
};
DatePipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'date', pure: true },] },
    { type: core_1.Injectable },
];
exports.DatePipe = DatePipe;
//# sourceMappingURL=date_pipe.js.map