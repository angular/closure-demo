export class MapPolyfill {
    constructor() {
        this.size = 0;
        this._values = [];
        this._keys = [];
    }
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) {
        const /** @type {?} */ i = this._keys.indexOf(key);
        return i === -1 ? undefined : this._values[i];
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    set(key, value) {
        const /** @type {?} */ i = this._keys.indexOf(key);
        if (i === -1) {
            this._keys.push(key);
            this._values.push(value);
            this.size++;
        }
        else {
            this._values[i] = value;
        }
        return this;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    delete(key) {
        const /** @type {?} */ i = this._keys.indexOf(key);
        if (i === -1) {
            return false;
        }
        this._values.splice(i, 1);
        this._keys.splice(i, 1);
        this.size--;
        return true;
    }
    /**
     * @return {?}
     */
    clear() {
        this._keys.length = 0;
        this._values.length = 0;
        this.size = 0;
    }
    /**
     * @param {?} cb
     * @param {?} thisArg
     * @return {?}
     */
    forEach(cb, thisArg) {
        for (let /** @type {?} */ i = 0; i < this.size; i++) {
            cb.call(thisArg, this._values[i], this._keys[i]);
        }
    }
}
function MapPolyfill_tsickle_Closure_declarations() {
    /** @type {?} */
    MapPolyfill.prototype.size;
    /** @type {?} */
    MapPolyfill.prototype._values;
    /** @type {?} */
    MapPolyfill.prototype._keys;
}
