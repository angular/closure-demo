import { root } from './root';
/**
 * @param {?} target
 * @param {...?} sources
 * @return {?}
 */
export function assignImpl(target, ...sources) {
    const /** @type {?} */ len = sources.length;
    for (let /** @type {?} */ i = 0; i < len; i++) {
        const /** @type {?} */ source = sources[i];
        for (let /** @type {?} */ k in source) {
            if (source.hasOwnProperty(k)) {
                target[k] = source[k];
            }
        }
    }
    return target;
}
;
/**
 * @param {?} root
 * @return {?}
 */
export function getAssign(root) {
    return root.Object.assign || assignImpl;
}
export const /** @type {?} */ assign = getAssign(root);
