/**
 * @param {?} derivedCtor
 * @param {?} baseCtors
 * @return {?}
 */
export function applyMixins(derivedCtor, baseCtors) {
    for (let /** @type {?} */ i = 0, /** @type {?} */ len = baseCtors.length; i < len; i++) {
        const /** @type {?} */ baseCtor = baseCtors[i];
        const /** @type {?} */ propertyKeys = Object.getOwnPropertyNames(baseCtor.prototype);
        for (let /** @type {?} */ j = 0, /** @type {?} */ len2 = propertyKeys.length; j < len2; j++) {
            const /** @type {?} */ name = propertyKeys[j];
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        }
    }
}
