goog.module('_angular$common$src$pipes$json__pipe');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
class JsonPipe {
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) { return lang_1.Json.stringify(value); }
}
/** @nocollapse */ JsonPipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'json', pure: false },] },
    { type: core_1.Injectable },
];
exports.JsonPipe = JsonPipe;
//# sourceMappingURL=json_pipe.js.map