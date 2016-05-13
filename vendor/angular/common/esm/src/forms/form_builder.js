goog.module('_angular$common$src$forms$form__builder');
var core_1 = goog.require('_angular$core');
var collection_1 = goog.require('_angular$common$src$facade$collection');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var modelModule = goog.require('_angular$common$src$forms$model');
class FormBuilder {
    /**
     *  Construct a new {@link ControlGroup} with the given map of configuration. Valid keys for the `extra` parameter map are `optionals` and `validator`. * See the {@link ControlGroup} constructor for more details.
     * @param {?} controlsConfig
     * @param {?=} extra
     * @return {?}
     */
    group(controlsConfig, extra = null) {
        var /** @type {?} */ controls = this._reduceControls(controlsConfig);
        var /** @type {?} */ optionals = ((lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, "optionals") : null));
        var /** @type {?} */ validator = lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, "validator") : null;
        var /** @type {?} */ asyncValidator = lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, "asyncValidator") : null;
        return new modelModule.ControlGroup(controls, optionals, validator, asyncValidator);
    }
    /**
     *  Construct a new {@link Control} with the given `value`,`validator`, and `asyncValidator`.
     * @param {?} value
     * @param {?=} validator
     * @param {?=} asyncValidator
     * @return {?}
     */
    control(value, validator = null, asyncValidator = null) {
        return new modelModule.Control(value, validator, asyncValidator);
    }
    /**
     *  Construct an array of {@link Control}s from the given `controlsConfig` array of configuration, with the given optional `validator` and `asyncValidator`.
     * @param {?} controlsConfig
     * @param {?=} validator
     * @param {?=} asyncValidator
     * @return {?}
     */
    array(controlsConfig, validator = null, asyncValidator = null) {
        var /** @type {?} */ controls = controlsConfig.map(c => this._createControl(c));
        return new modelModule.ControlArray(controls, validator, asyncValidator);
    }
    /**
     * @internal
     * @param {?} controlsConfig
     * @return {?}
     */
    _reduceControls(controlsConfig) {
        var /** @type {?} */ controls = {};
        collection_1.StringMapWrapper.forEach(controlsConfig, (controlConfig, controlName) => {
            controls[controlName] = this._createControl(controlConfig);
        });
        return controls;
    }
    /**
     * @internal
     * @param {?} controlConfig
     * @return {?}
     */
    _createControl(controlConfig) {
        if (controlConfig instanceof modelModule.Control ||
            controlConfig instanceof modelModule.ControlGroup ||
            controlConfig instanceof modelModule.ControlArray) {
            return controlConfig;
        }
        else if (lang_1.isArray(controlConfig)) {
            var /** @type {?} */ value = controlConfig[0];
            var /** @type {?} */ validator = controlConfig.length > 1 ? controlConfig[1] : null;
            var /** @type {?} */ asyncValidator = controlConfig.length > 2 ? controlConfig[2] : null;
            return this.control(value, validator, asyncValidator);
        }
        else {
            return this.control(controlConfig);
        }
    }
}
FormBuilder.decorators = [
    { type: core_1.Injectable },
];
exports.FormBuilder = FormBuilder;
//# sourceMappingURL=form_builder.js.map