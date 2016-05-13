goog.module('_angular$common$src$forms$directives$normalize__validator');
/**
 * @param {?} validator
 * @return {?}
 */
function normalizeValidator(validator) {
    if (((validator)).validate !== undefined) {
        return (c) => ((validator)).validate(c);
    }
    else {
        return (validator);
    }
}
exports.normalizeValidator = normalizeValidator;
/**
 * @param {?} validator
 * @return {?}
 */
function normalizeAsyncValidator(validator) {
    if (((validator)).validate !== undefined) {
        return (c) => Promise.resolve(((validator)).validate(c));
    }
    else {
        return (validator);
    }
}
exports.normalizeAsyncValidator = normalizeAsyncValidator;
//# sourceMappingURL=normalize_validator.js.map