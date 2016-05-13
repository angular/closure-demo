goog.module('rxjs$util$EmptyError');
/**
 * An error thrown when an Observable or a sequence was queried but has no
 * elements.
 *
 * @see {@link first}
 * @see {@link last}
 * @see {@link single}
 *
 * @class EmptyError
 */
class EmptyError extends Error {
    /**
     */
    constructor() {
        super('no elements in sequence');
        this.name = 'EmptyError';
    }
}
exports.EmptyError = EmptyError;
