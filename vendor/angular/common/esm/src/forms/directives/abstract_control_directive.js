goog.module('_angular$common$src$forms$directives$abstract__control__directive');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var exceptions_1 = goog.require('_angular$common$src$facade$exceptions');
/**
 * Base class for control directives.
 *
 * Only used internally in the forms module.
 */
class AbstractControlDirective {
    get control() { return exceptions_1.unimplemented(); }
    get value() { return lang_1.isPresent(this.control) ? this.control.value : null; }
    get valid() { return lang_1.isPresent(this.control) ? this.control.valid : null; }
    get errors() {
        return lang_1.isPresent(this.control) ? this.control.errors : null;
    }
    get pristine() { return lang_1.isPresent(this.control) ? this.control.pristine : null; }
    get dirty() { return lang_1.isPresent(this.control) ? this.control.dirty : null; }
    get touched() { return lang_1.isPresent(this.control) ? this.control.touched : null; }
    get untouched() { return lang_1.isPresent(this.control) ? this.control.untouched : null; }
    get path() { return null; }
}
exports.AbstractControlDirective = AbstractControlDirective;
//# sourceMappingURL=abstract_control_directive.js.map