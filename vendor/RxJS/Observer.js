goog.module('rxjs$Observer');
exports.empty = {
    isUnsubscribed: true,
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
