export const /** @type {?} */ empty = {
    closed: true,
    /**
     * @param {?} value
     * @return {?}
     */
    next(value) { },
    /**
     * @param {?} err
     * @return {?}
     */
    error(err) { throw err; },
    /**
     * @return {?}
     */
    complete() { }
};
