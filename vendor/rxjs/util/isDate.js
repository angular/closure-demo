/**
 * @param {?} value
 * @return {?}
 */
export function isDate(value) {
    return value instanceof Date && !isNaN(+value);
}
