goog.module('_angular$core$src$di$reflective__key');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var exceptions_1 = goog.require('_angular$core$src$facade$exceptions');
var forward_ref_1 = goog.require('_angular$core$src$di$forward__ref');
/**
 * A unique object used for retrieving items from the {@link ReflectiveInjector}.
 *
 * Keys have:
 * - a system-wide unique `id`.
 * - a `token`.
 *
 * `Key` is used internally by {@link ReflectiveInjector} because its system-wide unique `id` allows
 * the
 * injector to store created objects in a more efficient way.
 *
 * `Key` should not be created directly. {@link ReflectiveInjector} creates keys automatically when
 * resolving
 * providers.
 */
class ReflectiveKey {
    /**
     *  Private
     * @param {?} token
     * @param {?} id
     */
    constructor(token, id) {
        this.token = token;
        this.id = id;
        if (lang_1.isBlank(token)) {
            throw new exceptions_1.BaseException('Token must be defined!');
        }
    }
    /**
     * Returns a stringified token.
     */
    get displayName() { return lang_1.stringify(this.token); }
    /**
     *  Retrieves a `Key` for a token.
     * @param {?} token
     * @return {?}
     */
    static get(token) {
        return _globalKeyRegistry.get(forward_ref_1.resolveForwardRef(token));
    }
    /**
     * @returns the number of keys registered in the system.
     */
    static get numberOfKeys() { return _globalKeyRegistry.numberOfKeys; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ReflectiveKey.prototype.token;
        /** @type {?} */
        ReflectiveKey.prototype.id;
    }
}
exports.ReflectiveKey = ReflectiveKey;
/**
 * @internal
 */
class KeyRegistry {
    constructor() {
        this._allKeys = new Map();
    }
    /**
     * @param {?} token
     * @return {?}
     */
    get(token) {
        if (token instanceof ReflectiveKey)
            return token;
        if (this._allKeys.has(token)) {
            return this._allKeys.get(token);
        }
        var /** @type {?} */ newKey = new ReflectiveKey(token, ReflectiveKey.numberOfKeys);
        this._allKeys.set(token, newKey);
        return newKey;
    }
    get numberOfKeys() { return this._allKeys.size; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        KeyRegistry.prototype._allKeys;
    }
}
exports.KeyRegistry = KeyRegistry;
var /** @type {?} */ _globalKeyRegistry = new KeyRegistry();
//# sourceMappingURL=reflective_key.js.map