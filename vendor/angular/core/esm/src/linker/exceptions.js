goog.module('_angular$core$src$linker$exceptions');
var exceptions_1 = goog.require('_angular$core$src$facade$exceptions');
/**
 * An error thrown if application changes model breaking the top-down data flow.
 *
 * This exception is only thrown in dev mode.
 *
 * <!-- TODO: Add a link once the dev mode option is configurable -->
 *
 * ### Example
 *
 * ```typescript
 * @Component({
 *   selector: 'parent',
 *   template: `
 *     <child [prop]="parentProp"></child>
 *   `,
 *   directives: [forwardRef(() => Child)]
 * })
 * class Parent {
 *   parentProp = "init";
 * }
 *
 * @Directive({selector: 'child', inputs: ['prop']})
 * class Child {
 *   constructor(public parent: Parent) {}
 *
 *   set prop(v) {
 *     // this updates the parent property, which is disallowed during change detection
 *     // this will result in ExpressionChangedAfterItHasBeenCheckedException
 *     this.parent.parentProp = "updated";
 *   }
 * }
 * ```
 */
class ExpressionChangedAfterItHasBeenCheckedException extends exceptions_1.BaseException {
    /**
     * @param {?} oldValue
     * @param {?} currValue
     * @param {?} context
     */
    constructor(oldValue, currValue, context) {
        super(`Expression has changed after it was checked. ` +
            `Previous value: '${oldValue}'. Current value: '${currValue}'`);
    }
}
exports.ExpressionChangedAfterItHasBeenCheckedException = ExpressionChangedAfterItHasBeenCheckedException;
/**
 * Thrown when an exception was raised during view creation, change detection or destruction.
 *
 * This error wraps the original exception to attach additional contextual information that can
 * be useful for debugging.
 */
class ViewWrappedException extends exceptions_1.WrappedException {
    /**
     * @param {?} originalException
     * @param {?} originalStack
     * @param {?} context
     */
    constructor(originalException, originalStack, context) {
        super(`Error in ${context.source}`, originalException, originalStack, context);
    }
}
exports.ViewWrappedException = ViewWrappedException;
/**
 * Thrown when a destroyed view is used.
 *
 * This error indicates a bug in the framework.
 *
 * This is an internal Angular error.
 */
class ViewDestroyedException extends exceptions_1.BaseException {
    /**
     * @param {?} details
     */
    constructor(details) {
        super(`Attempt to use a destroyed view: ${details}`);
    }
}
exports.ViewDestroyedException = ViewDestroyedException;
//# sourceMappingURL=exceptions.js.map