goog.module('_angular$core$src$di$injector');
var exceptions_1 = goog.require('_angular$core$src$facade$exceptions');
const /** @type {?} */ _THROW_IF_NOT_FOUND = new Object();
exports.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
class Injector {
    /**
     *  Retrieves an instance from the injector based on the provided token. If not found: - Throws {@link NoProviderError} if no `notFoundValue` that is not equal to Injector.THROW_IF_NOT_FOUND is given - Returns the `notFoundValue` otherwise * ### Example ([live demo](http://plnkr.co/edit/HeXSHg?p=preview)) * ```typescript var injector = ReflectiveInjector.resolveAndCreate([ provide("validToken", {useValue: "Value"}) ]); expect(injector.get("validToken")).toEqual("Value"); expect(() => injector.get("invalidToken")).toThrowError(); ``` * `Injector` returns itself when given `Injector` as a token. * ```typescript var injector = ReflectiveInjector.resolveAndCreate([]); expect(injector.get(Injector)).toBe(injector); ```
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue) { return exceptions_1.unimplemented(); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        Injector.THROW_IF_NOT_FOUND;
    }
}
Injector.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
exports.Injector = Injector;
//# sourceMappingURL=injector.js.map