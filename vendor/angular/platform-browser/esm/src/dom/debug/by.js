goog.module('_angular$platform_browser$src$dom$debug$by');
var lang_1 = goog.require('_angular$platform_browser$src$facade$lang');
var dom_adapter_1 = goog.require('_angular$platform_browser$src$dom$dom__adapter');
/**
 * Predicates for use with {@link DebugElement}'s query functions.
 */
class By {
    /**
     *  Match all elements. * ## Example * {@example platform/dom/debug/ts/by/by.ts region='by_all'}
     * @return {?}
     */
    static all() { return (debugElement) => true; }
    /**
     *  Match elements by the given CSS selector. * ## Example * {@example platform/dom/debug/ts/by/by.ts region='by_css'}
     * @param {?} selector
     * @return {?}
     */
    static css(selector) {
        return (debugElement) => {
            return lang_1.isPresent(debugElement.nativeElement) ?
                dom_adapter_1.getDOM().elementMatches(debugElement.nativeElement, selector) :
                false;
        };
    }
    /**
     *  Match elements that have the given directive present. * ## Example * {@example platform/dom/debug/ts/by/by.ts region='by_directive'}
     * @param {?} type
     * @return {?}
     */
    static directive(type) {
        return (debugElement) => { return debugElement.providerTokens.indexOf(type) !== -1; };
    }
}
exports.By = By;
//# sourceMappingURL=by.js.map