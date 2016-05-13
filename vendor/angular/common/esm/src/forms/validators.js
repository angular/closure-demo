goog.module('_angular$common$src$forms$validators');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var promise_1 = goog.require('_angular$common$src$facade$promise');
var async_1 = goog.require('_angular$common$src$facade$async');
var collection_1 = goog.require('_angular$common$src$facade$collection');
/**
 * Providers for validators to be used for {@link Control}s in a form.
 *
 * Provide this using `multi: true` to add validators.
 *
 * ### Example
 *
 * {@example core/forms/ts/ng_validators/ng_validators.ts region='ng_validators'}
 */
exports.NG_VALIDATORS = new core_1.OpaqueToken("NgValidators");
/**
 * Providers for asynchronous validators to be used for {@link Control}s
 * in a form.
 *
 * Provide this using `multi: true` to add validators.
 *
 * See {@link NG_VALIDATORS} for more details.
 */
exports.NG_ASYNC_VALIDATORS = 
/*@ts2dart_const*/ new core_1.OpaqueToken("NgAsyncValidators");
/**
 * Provides a set of validators used by form controls.
 *
 * A validator is a function that processes a {@link Control} or collection of
 * controls and returns a map of errors. A null map means that validation has passed.
 *
 * ### Example
 *
 * ```typescript
 * var loginControl = new Control("", Validators.required)
 * ```
 */
class Validators {
    /**
     *  Validator that requires controls to have a non-empty value.
     * @param {?} control
     * @return {?}
     */
    static required(control) {
        return lang_1.isBlank(control.value) || (lang_1.isString(control.value) && control.value == "") ?
            { "required": true } :
            null;
    }
    /**
     *  Validator that requires controls to have a value of a minimum length.
     * @param {?} minLength
     * @return {?}
     */
    static minLength(minLength) {
        return (control) => {
            if (lang_1.isPresent(Validators.required(control)))
                return null;
            var /** @type {?} */ v = control.value;
            return v.length < minLength ?
                { "minlength": { "requiredLength": minLength, "actualLength": v.length } } :
                null;
        };
    }
    /**
     *  Validator that requires controls to have a value of a maximum length.
     * @param {?} maxLength
     * @return {?}
     */
    static maxLength(maxLength) {
        return (control) => {
            if (lang_1.isPresent(Validators.required(control)))
                return null;
            var /** @type {?} */ v = control.value;
            return v.length > maxLength ?
                { "maxlength": { "requiredLength": maxLength, "actualLength": v.length } } :
                null;
        };
    }
    /**
     *  Validator that requires a control to match a regex to its value.
     * @param {?} pattern
     * @return {?}
     */
    static pattern(pattern) {
        return (control) => {
            if (lang_1.isPresent(Validators.required(control)))
                return null;
            let /** @type {?} */ regex = new RegExp(`^${pattern}$`);
            let /** @type {?} */ v = control.value;
            return regex.test(v) ? null :
                { "pattern": { "requiredPattern": `^${pattern}$`, "actualValue": v } };
        };
    }
    /**
     *  No-op validator.
     * @param {?} c
     * @return {?}
     */
    static nullValidator(c) { return null; }
    /**
     *  Compose multiple validators into a single function that returns the union of the individual error maps.
     * @param {?} validators
     * @return {?}
     */
    static compose(validators) {
        if (lang_1.isBlank(validators))
            return null;
        var /** @type {?} */ presentValidators = validators.filter(lang_1.isPresent);
        if (presentValidators.length == 0)
            return null;
        return function (control) {
            return _mergeErrors(_executeValidators(control, presentValidators));
        };
    }
    /**
     * @param {?} validators
     * @return {?}
     */
    static composeAsync(validators) {
        if (lang_1.isBlank(validators))
            return null;
        var /** @type {?} */ presentValidators = validators.filter(lang_1.isPresent);
        if (presentValidators.length == 0)
            return null;
        return function (control) {
            let /** @type {?} */ promises = _executeAsyncValidators(control, presentValidators).map(_convertToPromise);
            return promise_1.PromiseWrapper.all(promises).then(_mergeErrors);
        };
    }
}
exports.Validators = Validators;
/**
 * @param {?} obj
 * @return {?}
 */
function _convertToPromise(obj) {
    return promise_1.PromiseWrapper.isPromise(obj) ? obj : async_1.ObservableWrapper.toPromise(obj);
}
/**
 * @param {?} control
 * @param {?} validators
 * @return {?}
 */
function _executeValidators(control, validators) {
    return validators.map(v => v(control));
}
/**
 * @param {?} control
 * @param {?} validators
 * @return {?}
 */
function _executeAsyncValidators(control, validators) {
    return validators.map(v => v(control));
}
/**
 * @param {?} arrayOfErrors
 * @return {?}
 */
function _mergeErrors(arrayOfErrors) {
    var /** @type {?} */ res = arrayOfErrors.reduce((res, errors) => {
        return lang_1.isPresent(errors) ? collection_1.StringMapWrapper.merge(res, errors) : res;
    }, {});
    return collection_1.StringMapWrapper.isEmpty(res) ? null : res;
}
//# sourceMappingURL=validators.js.map