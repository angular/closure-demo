/**
 * @param {?} value
 * @return {?}
 */
export function isScheduler(value) {
    return value && typeof ((value)).schedule === 'function';
}
