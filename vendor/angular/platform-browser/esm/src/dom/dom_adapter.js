goog.module('_angular$platform_browser$src$dom$dom__adapter');
var lang_1 = goog.require('_angular$platform_browser$src$facade$lang');
var /** @type {?} */ _DOM = null;
/**
 * @return {?}
 */
function getDOM() {
    return _DOM;
}
exports.getDOM = getDOM;
/**
 * @param {?} adapter
 * @return {?}
 */
function setDOM(adapter) {
    _DOM = adapter;
}
exports.setDOM = setDOM;
/**
 * @param {?} adapter
 * @return {?}
 */
function setRootDomAdapter(adapter) {
    if (lang_1.isBlank(_DOM)) {
        _DOM = adapter;
    }
}
exports.setRootDomAdapter = setRootDomAdapter;
/* tslint:disable:requireParameterType */
/**
 * Provides DOM operations in an environment-agnostic way.
 */
class DomAdapter {
    constructor() {
        this.xhrType = null;
    }
    /**
     * @deprecated
     * @return {?}
     */
    getXHR() { return this.xhrType; }
    /**
     * Maps attribute names to their corresponding property names for cases
     * where attribute name doesn't match property name.
     */
    get attrToPropMap() { return this._attrToPropMap; }
    ;
    set attrToPropMap(value) { this._attrToPropMap = value; }
    ;
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DomAdapter.prototype.xhrType;
        /** @internal
        @type {?} */
        DomAdapter.prototype._attrToPropMap;
    }
}
exports.DomAdapter = DomAdapter;
//# sourceMappingURL=dom_adapter.js.map