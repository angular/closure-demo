goog.module('rxjs$util$FastMap');
class FastMap {
    constructor() {
        this.values = {};
    }
    /**
     * @param {?} key
     * @return {?}
     */
    delete(key) {
        this.values[key] = null;
        return true;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    set(key, value) {
        this.values[key] = value;
        return this;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) {
        return this.values[key];
    }
    /**
     * @param {?} cb
     * @param {?=} thisArg
     * @return {?}
     */
    forEach(cb, thisArg) {
        const /** @type {?} */ values = this.values;
        for (let key in values) {
            if (values.hasOwnProperty(key) && values[key] !== null) {
                cb.call(thisArg, values[key], key);
            }
        }
    }
    /**
     * @return {?}
     */
    clear() {
        this.values = {};
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        FastMap.prototype.values;
    }
}
exports.FastMap = FastMap;
