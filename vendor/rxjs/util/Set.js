import { root } from './root';
/**
 * @return {?}
 */
export function minimalSetImpl() {
    // THIS IS NOT a full impl of Set, this is just the minimum
    // bits of functionality we need for this library.
    return class MinimalSet {
        constructor() {
            this._values = [];
        }
        /**
         * @param {?} value
         * @return {?}
         */
        add(value) {
            if (!this.has(value)) {
                this._values.push(value);
            }
        }
        /**
         * @param {?} value
         * @return {?}
         */
        has(value) {
            return this._values.indexOf(value) !== -1;
        }
        /**
         * @return {?}
         */
        get size() {
            return this._values.length;
        }
        /**
         * @return {?}
         */
        clear() {
            this._values.length = 0;
        }
    };
}
export const /** @type {?} */ Set = root.Set || minimalSetImpl();
