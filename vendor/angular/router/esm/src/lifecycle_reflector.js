goog.module('_angular$router$src$lifecycle__reflector');
var lang_1 = goog.require('_angular$router$src$facade$lang');
/**
 * @param {?} name
 * @param {?} obj
 * @return {?}
 */
function hasLifecycleHook(name, obj) {
    if (lang_1.isBlank(obj))
        return false;
    let /** @type {?} */ type = obj.constructor;
    if (!(type instanceof lang_1.Type))
        return false;
    return name in ((type)).prototype;
}
exports.hasLifecycleHook = hasLifecycleHook;
//# sourceMappingURL=lifecycle_reflector.js.map