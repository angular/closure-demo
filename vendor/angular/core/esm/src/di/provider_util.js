goog.module('_angular$core$src$di$provider__util');
var provider_1 = goog.require('_angular$core$src$di$provider');
/**
 * @param {?} obj
 * @return {?}
 */
function isProviderLiteral(obj) {
    return obj && typeof obj == 'object' && obj.provide;
}
exports.isProviderLiteral = isProviderLiteral;
/**
 * @param {?} obj
 * @return {?}
 */
function createProvider(obj) {
    return new provider_1.Provider(obj.provide, obj);
}
exports.createProvider = createProvider;
//# sourceMappingURL=provider_util.js.map