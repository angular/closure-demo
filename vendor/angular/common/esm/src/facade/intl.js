goog.module('_angular$common$src$facade$intl');
exports.NumberFormatStyle = {};
exports.NumberFormatStyle.Decimal = 0;
exports.NumberFormatStyle.Percent = 1;
exports.NumberFormatStyle.Currency = 2;
exports.NumberFormatStyle[exports.NumberFormatStyle.Decimal] = "Decimal";
exports.NumberFormatStyle[exports.NumberFormatStyle.Percent] = "Percent";
exports.NumberFormatStyle[exports.NumberFormatStyle.Currency] = "Currency";
class NumberFormatter {
    /**
     * @param {?} num
     * @param {?} locale
     * @param {?} style
     * @param {?=} __3
     * @return {?}
     */
    static format(num, locale, style, { minimumIntegerDigits = 1, minimumFractionDigits = 0, maximumFractionDigits = 3, currency, currencyAsSymbol = false } = {}) {
        var /** @type {?} */ intlOptions = {
            minimumIntegerDigits: minimumIntegerDigits,
            minimumFractionDigits: minimumFractionDigits,
            maximumFractionDigits: maximumFractionDigits
        };
        intlOptions.style = exports.NumberFormatStyle[style].toLowerCase();
        if (style == exports.NumberFormatStyle.Currency) {
            intlOptions.currency = currency;
            intlOptions.currencyDisplay = currencyAsSymbol ? 'symbol' : 'code';
        }
        return new Intl.NumberFormat(locale, intlOptions).format(num);
    }
}
exports.NumberFormatter = NumberFormatter;
/**
 * @param {?} len
 * @return {?}
 */
function digitCondition(len) {
    return len == 2 ? '2-digit' : 'numeric';
}
/**
 * @param {?} len
 * @return {?}
 */
function nameCondition(len) {
    return len < 4 ? 'short' : 'long';
}
/**
 * @param {?} pattern
 * @return {?}
 */
function extractComponents(pattern) {
    var /** @type {?} */ ret = {};
    var /** @type {?} */ i = 0, /** @type {?} */ j;
    while (i < pattern.length) {
        j = i;
        while (j < pattern.length && pattern[j] == pattern[i])
            j++;
        let /** @type {?} */ len = j - i;
        switch (pattern[i]) {
            case 'G':
                ret.era = nameCondition(len);
                break;
            case 'y':
                ret.year = digitCondition(len);
                break;
            case 'M':
                if (len >= 3)
                    ret.month = nameCondition(len);
                else
                    ret.month = digitCondition(len);
                break;
            case 'd':
                ret.day = digitCondition(len);
                break;
            case 'E':
                ret.weekday = nameCondition(len);
                break;
            case 'j':
                ret.hour = digitCondition(len);
                break;
            case 'h':
                ret.hour = digitCondition(len);
                ret.hour12 = true;
                break;
            case 'H':
                ret.hour = digitCondition(len);
                ret.hour12 = false;
                break;
            case 'm':
                ret.minute = digitCondition(len);
                break;
            case 's':
                ret.second = digitCondition(len);
                break;
            case 'z':
                ret.timeZoneName = 'long';
                break;
            case 'Z':
                ret.timeZoneName = 'short';
                break;
        }
        i = j;
    }
    return ret;
}
var /** @type {?} */ dateFormatterCache = new Map();
class DateFormatter {
    /**
     * @param {?} date
     * @param {?} locale
     * @param {?} pattern
     * @return {?}
     */
    static format(date, locale, pattern) {
        var /** @type {?} */ key = locale + pattern;
        if (dateFormatterCache.has(key)) {
            return dateFormatterCache.get(key).format(date);
        }
        var /** @type {?} */ formatter = new Intl.DateTimeFormat(locale, extractComponents(pattern));
        dateFormatterCache.set(key, formatter);
        return formatter.format(date);
    }
}
exports.DateFormatter = DateFormatter;
//# sourceMappingURL=intl.js.map