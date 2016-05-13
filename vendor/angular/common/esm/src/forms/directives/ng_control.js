goog.module('_angular$common$src$forms$directives$ng__control');
var exceptions_1 = goog.require('_angular$common$src$facade$exceptions');
var abstract_control_directive_1 = goog.require('_angular$common$src$forms$directives$abstract__control__directive');
/**
 * A base class that all control directive extend.
 * It binds a {@link Control} object to a DOM element.
 *
 * Used internally by Angular forms.
 */
class NgControl extends abstract_control_directive_1.AbstractControlDirective {
    constructor(...args) {
        super(...args);
        this.name = null;
        this.valueAccessor = null;
    }
    get validator() { return (exceptions_1.unimplemented()); }
    get asyncValidator() { return (exceptions_1.unimplemented()); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        NgControl.prototype.name;
        /** @type {?} */
        NgControl.prototype.valueAccessor;
    }
}
exports.NgControl = NgControl;
//# sourceMappingURL=ng_control.js.map