goog.module('_angular$common$src$forms$directives$validators');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var validators_1 = goog.require('_angular$common$src$forms$validators');
const /** @type {?} */ REQUIRED = validators_1.Validators.required;
exports.REQUIRED_VALIDATOR = {
    provide: validators_1.NG_VALIDATORS,
    useValue: REQUIRED,
    multi: true
};
class RequiredValidator {
}
RequiredValidator.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[required][ngControl],[required][ngFormControl],[required][ngModel]',
                providers: [exports.REQUIRED_VALIDATOR]
            },] },
];
exports.RequiredValidator = RequiredValidator;
/**
 * Provivder which adds {@link MinLengthValidator} to {@link NG_VALIDATORS}.
 *
 * ## Example:
 *
 * {@example common/forms/ts/validators/validators.ts region='min'}
 */
exports.MIN_LENGTH_VALIDATOR = {
    provide: validators_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(() => MinLengthValidator),
    multi: true
};
class MinLengthValidator {
    /**
     * @param {?} minLength
     */
    constructor(minLength) {
        this._validator = validators_1.Validators.minLength(lang_1.NumberWrapper.parseInt(minLength, 10));
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) { return this._validator(c); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        MinLengthValidator.prototype._validator;
    }
}
MinLengthValidator.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[minlength][ngControl],[minlength][ngFormControl],[minlength][ngModel]',
                providers: [exports.MIN_LENGTH_VALIDATOR]
            },] },
];
MinLengthValidator.ctorParameters = [
    { type: undefined, decorators: [{ type: core_1.Attribute, args: ["minlength",] },] },
];
exports.MinLengthValidator = MinLengthValidator;
/**
 * Provider which adds {@link MaxLengthValidator} to {@link NG_VALIDATORS}.
 *
 * ## Example:
 *
 * {@example common/forms/ts/validators/validators.ts region='max'}
 */
exports.MAX_LENGTH_VALIDATOR = {
    provide: validators_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(() => MaxLengthValidator),
    multi: true
};
class MaxLengthValidator {
    /**
     * @param {?} maxLength
     */
    constructor(maxLength) {
        this._validator = validators_1.Validators.maxLength(lang_1.NumberWrapper.parseInt(maxLength, 10));
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) { return this._validator(c); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        MaxLengthValidator.prototype._validator;
    }
}
MaxLengthValidator.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[maxlength][ngControl],[maxlength][ngFormControl],[maxlength][ngModel]',
                providers: [exports.MAX_LENGTH_VALIDATOR]
            },] },
];
MaxLengthValidator.ctorParameters = [
    { type: undefined, decorators: [{ type: core_1.Attribute, args: ["maxlength",] },] },
];
exports.MaxLengthValidator = MaxLengthValidator;
/**
 * A Directive that adds the `pattern` validator to any controls marked with the
 * `pattern` attribute, via the {@link NG_VALIDATORS} binding. Uses attribute value
 * as the regex to validate Control value against.  Follows pattern attribute
 * semantics; i.e. regex must match entire Control value.
 *
 * ### Example
 *
 * ```
 * <input [ngControl]="fullName" pattern="[a-zA-Z ]*">
 * ```
 */
exports.PATTERN_VALIDATOR = {
    provide: validators_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(() => PatternValidator),
    multi: true
};
class PatternValidator {
    /**
     * @param {?} pattern
     */
    constructor(pattern) {
        this._validator = validators_1.Validators.pattern(pattern);
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) { return this._validator(c); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        PatternValidator.prototype._validator;
    }
}
PatternValidator.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[pattern][ngControl],[pattern][ngFormControl],[pattern][ngModel]',
                providers: [exports.PATTERN_VALIDATOR]
            },] },
];
PatternValidator.ctorParameters = [
    { type: undefined, decorators: [{ type: core_1.Attribute, args: ["pattern",] },] },
];
exports.PatternValidator = PatternValidator;
//# sourceMappingURL=validators.js.map