goog.module('_angular$common$src$forms$directives$control__container');
var abstract_control_directive_1 = goog.require('_angular$common$src$forms$directives$abstract__control__directive');
/**
 * A directive that contains multiple {@link NgControl}s.
 *
 * Only used by the forms module.
 */
class ControlContainer extends abstract_control_directive_1.AbstractControlDirective {
    /**
     * Get the form to which this container belongs.
     */
    get formDirective() { return null; }
    /**
     * Get the path to this container.
     */
    get path() { return null; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ControlContainer.prototype.name;
    }
}
exports.ControlContainer = ControlContainer;
//# sourceMappingURL=control_container.js.map