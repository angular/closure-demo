goog.module('rxjs$util$UnsubscriptionError');
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
class UnsubscriptionError extends Error {
    /**
     * @param {?} errors
     */
    constructor(errors) {
        super();
        this.errors = errors;
        this.name = 'UnsubscriptionError';
        this.message = errors ? `${errors.length} errors occurred during unsubscription:
${errors.map((err, i) => `${i + 1}) ${err.toString()}`).join('\n')}` : '';
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        UnsubscriptionError.prototype.errors;
    }
}
exports.UnsubscriptionError = UnsubscriptionError;
