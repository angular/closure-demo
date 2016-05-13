goog.module('_angular$common$src$pipes$number__pipe');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var exceptions_1 = goog.require('_angular$common$src$facade$exceptions');
var intl_1 = goog.require('_angular$common$src$facade$intl');
var invalid_pipe_argument_exception_1 = goog.require('_angular$common$src$pipes$invalid__pipe__argument__exception');
var /** @type {?} */ defaultLocale = 'en-US';
var /** @type {?} */ _re = lang_1.RegExpWrapper.create('^(\\d+)?\\.((\\d+)(\\-(\\d+))?)?$');
class NumberPipe {
    /**
     * @internal
     * @param {?} value
     * @param {?} style
     * @param {?} digits
     * @param {?=} currency
     * @param {?=} currencyAsSymbol
     * @return {?}
     */
    static _format(value, style, digits, currency = null, currencyAsSymbol = false) {
        if (lang_1.isBlank(value))
            return null;
        if (!lang_1.isNumber(value)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(NumberPipe, value);
        }
        var /** @type {?} */ minInt = 1, /** @type {?} */ minFraction = 0, /** @type {?} */ maxFraction = 3;
        if (lang_1.isPresent(digits)) {
            var /** @type {?} */ parts = lang_1.RegExpWrapper.firstMatch(_re, digits);
            if (lang_1.isBlank(parts)) {
                throw new exceptions_1.BaseException(`${digits} is not a valid digit info for number pipes`);
            }
            if (lang_1.isPresent(parts[1])) {
                minInt = lang_1.NumberWrapper.parseIntAutoRadix(parts[1]);
            }
            if (lang_1.isPresent(parts[3])) {
                minFraction = lang_1.NumberWrapper.parseIntAutoRadix(parts[3]);
            }
            if (lang_1.isPresent(parts[5])) {
                maxFraction = lang_1.NumberWrapper.parseIntAutoRadix(parts[5]);
            }
        }
        return intl_1.NumberFormatter.format(value, defaultLocale, style, {
            minimumIntegerDigits: minInt,
            minimumFractionDigits: minFraction,
            maximumFractionDigits: maxFraction,
            currency: currency,
            currencyAsSymbol: currencyAsSymbol
        });
    }
}
/** @nocollapse */ NumberPipe.decorators = [
    { type: core_1.Injectable },
];
exports.NumberPipe = NumberPipe;
class DecimalPipe extends NumberPipe {
    /**
     * @param {?} value
     * @param {?=} digits
     * @return {?}
     */
    transform(value, digits = null) {
        return NumberPipe._format(value, intl_1.NumberFormatStyle.Decimal, digits);
    }
}
/** @nocollapse */ DecimalPipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'number' },] },
    { type: core_1.Injectable },
];
exports.DecimalPipe = DecimalPipe;
class PercentPipe extends NumberPipe {
    /**
     * @param {?} value
     * @param {?=} digits
     * @return {?}
     */
    transform(value, digits = null) {
        return NumberPipe._format(value, intl_1.NumberFormatStyle.Percent, digits);
    }
}
/** @nocollapse */ PercentPipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'percent' },] },
    { type: core_1.Injectable },
];
exports.PercentPipe = PercentPipe;
class CurrencyPipe extends NumberPipe {
    /**
     * @param {?} value
     * @param {?=} currencyCode
     * @param {?=} symbolDisplay
     * @param {?=} digits
     * @return {?}
     */
    transform(value, currencyCode = 'USD', symbolDisplay = false, digits = null) {
        return NumberPipe._format(value, intl_1.NumberFormatStyle.Currency, digits, currencyCode, symbolDisplay);
    }
}
/** @nocollapse */ CurrencyPipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'currency' },] },
    { type: core_1.Injectable },
];
exports.CurrencyPipe = CurrencyPipe;
//# sourceMappingURL=number_pipe.js.map