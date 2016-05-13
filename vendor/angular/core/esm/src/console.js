goog.module('_angular$core$src$console');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var decorators_1 = goog.require('_angular$core$src$di$decorators');
// Note: Need to rename warn as in Dart
// class members and imports can't use the same name.
let /** @type {?} */ _warnImpl = lang_1.warn;
class Console {
    /**
     * @param {?} message
     * @return {?}
     */
    log(message) { lang_1.print(message); }
    /**
     * @param {?} message
     * @return {?}
     */
    warn(message) { _warnImpl(message); }
}
Console.decorators = [
    { type: decorators_1.Injectable },
];
exports.Console = Console;
//# sourceMappingURL=console.js.map