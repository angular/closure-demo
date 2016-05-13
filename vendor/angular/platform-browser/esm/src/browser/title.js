goog.module('_angular$platform_browser$src$browser$title');
var dom_adapter_1 = goog.require('_angular$platform_browser$src$dom$dom__adapter');
/**
 * A service that can be used to get and set the title of a current HTML document.
 *
 * Since an Angular 2 application can't be bootstrapped on the entire HTML document (`<html>` tag)
 * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
 * (representing the `<title>` tag). Instead, this service can be used to set and get the current
 * title value.
 */
class Title {
    /**
     *  Get the title of the current HTML document.
     * @returns {string}
     * @return {?}
     */
    getTitle() { return dom_adapter_1.getDOM().getTitle(); }
    /**
     *  Set the title of the current HTML document.
     * @param {?} newTitle
     * @return {?}
     */
    setTitle(newTitle) { dom_adapter_1.getDOM().setTitle(newTitle); }
}
exports.Title = Title;
//# sourceMappingURL=title.js.map