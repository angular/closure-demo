goog.module('rxjs$operator$let');
/**
 * @method let
 * @owner Observable
 * @param {?} func
 * @return {?}
 */
function letProto(func) {
    return func(this);
}
exports.letProto = letProto;
