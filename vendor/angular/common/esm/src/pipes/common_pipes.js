goog.module('_angular$common$src$pipes$common__pipes');
/**
 * @module
 * @description
 * This module provides a set of common Pipes.
 */
var async_pipe_1 = goog.require('_angular$common$src$pipes$async__pipe');
var uppercase_pipe_1 = goog.require('_angular$common$src$pipes$uppercase__pipe');
var lowercase_pipe_1 = goog.require('_angular$common$src$pipes$lowercase__pipe');
var json_pipe_1 = goog.require('_angular$common$src$pipes$json__pipe');
var slice_pipe_1 = goog.require('_angular$common$src$pipes$slice__pipe');
var date_pipe_1 = goog.require('_angular$common$src$pipes$date__pipe');
var number_pipe_1 = goog.require('_angular$common$src$pipes$number__pipe');
var replace_pipe_1 = goog.require('_angular$common$src$pipes$replace__pipe');
var i18n_plural_pipe_1 = goog.require('_angular$common$src$pipes$i18n__plural__pipe');
var i18n_select_pipe_1 = goog.require('_angular$common$src$pipes$i18n__select__pipe');
/**
 * A collection of Angular core pipes that are likely to be used in each and every
 * application.
 *
 * This collection can be used to quickly enumerate all the built-in pipes in the `pipes`
 * property of the `@Component` decorator.
 */
exports.COMMON_PIPES = [
    async_pipe_1.AsyncPipe,
    uppercase_pipe_1.UpperCasePipe,
    lowercase_pipe_1.LowerCasePipe,
    json_pipe_1.JsonPipe,
    slice_pipe_1.SlicePipe,
    number_pipe_1.DecimalPipe,
    number_pipe_1.PercentPipe,
    number_pipe_1.CurrencyPipe,
    date_pipe_1.DatePipe,
    replace_pipe_1.ReplacePipe,
    i18n_plural_pipe_1.I18nPluralPipe,
    i18n_select_pipe_1.I18nSelectPipe
];
//# sourceMappingURL=common_pipes.js.map