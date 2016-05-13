goog.module('_angular$core$testing$lang__utils');
/**
 * @param {?} instance
 * @return {?}
 */
function getTypeOf(instance) {
    return instance.constructor;
}
exports.getTypeOf = getTypeOf;
/**
 * @param {?} type
 * @param {?=} params
 * @return {?}
 */
function instantiateType(type, params = []) {
    var /** @type {?} */ instance = Object.create(type.prototype);
    instance.constructor.apply(instance, params);
    return instance;
}
exports.instantiateType = instantiateType;
//# sourceMappingURL=lang_utils.js.map