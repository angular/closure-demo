goog.module('_angular$platform_browser$src$browser$tools$tools');
var lang_1 = goog.require('_angular$platform_browser$src$facade$lang');
var common_tools_1 = goog.require('_angular$platform_browser$src$browser$tools$common__tools');
var /** @type {?} */ context = (lang_1.global);
/**
 *  Enabled Angular 2 debug tools that are accessible via your browser's developer console. * Usage: * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j) 1. Type `ng.` (usually the console will show auto-complete suggestion) 1. Try the change detection profiler `ng.profiler.timeChangeDetection()` then hit Enter.
 * @param {?} ref
 * @return {?}
 */
function enableDebugTools(ref) {
    context.ng = new common_tools_1.AngularTools(ref);
}
exports.enableDebugTools = enableDebugTools;
/**
 *  Disables Angular 2 tools.
 * @return {?}
 */
function disableDebugTools() {
    delete context.ng;
}
exports.disableDebugTools = disableDebugTools;
//# sourceMappingURL=tools.js.map