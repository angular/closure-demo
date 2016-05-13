goog.module('_angular$core$src$linker$element__injector');
var injector_1 = goog.require('_angular$core$src$di$injector');
const /** @type {?} */ _UNDEFINED = new Object();
class ElementInjector extends injector_1.Injector {
    /**
     * @param {?} _view
     * @param {?} _nodeIndex
     */
    constructor(_view, _nodeIndex) {
        super();
        this._view = _view;
        this._nodeIndex = _nodeIndex;
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue = injector_1.THROW_IF_NOT_FOUND) {
        var /** @type {?} */ result = _UNDEFINED;
        if (result === _UNDEFINED) {
            result = this._view.injectorGet(token, this._nodeIndex, _UNDEFINED);
        }
        if (result === _UNDEFINED) {
            result = this._view.parentInjector.get(token, notFoundValue);
        }
        return result;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ElementInjector.prototype._view;
        /** @type {?} */
        ElementInjector.prototype._nodeIndex;
    }
}
exports.ElementInjector = ElementInjector;
//# sourceMappingURL=element_injector.js.map