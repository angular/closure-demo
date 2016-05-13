goog.module('_angular$core$src$linker$debug__context');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var collection_1 = goog.require('_angular$core$src$facade$collection');
var view_type_1 = goog.require('_angular$core$src$linker$view__type');
/* @ts2dart_const */
class StaticNodeDebugInfo {
    /**
     * @param {?} providerTokens
     * @param {?} componentToken
     * @param {?} refTokens
     */
    constructor(providerTokens, componentToken, refTokens) {
        this.providerTokens = providerTokens;
        this.componentToken = componentToken;
        this.refTokens = refTokens;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        StaticNodeDebugInfo.prototype.providerTokens;
        /** @type {?} */
        StaticNodeDebugInfo.prototype.componentToken;
        /** @type {?} */
        StaticNodeDebugInfo.prototype.refTokens;
    }
}
exports.StaticNodeDebugInfo = StaticNodeDebugInfo;
class DebugContext {
    /**
     * @param {?} _view
     * @param {?} _nodeIndex
     * @param {?} _tplRow
     * @param {?} _tplCol
     */
    constructor(_view, _nodeIndex, _tplRow, _tplCol) {
        this._view = _view;
        this._nodeIndex = _nodeIndex;
        this._tplRow = _tplRow;
        this._tplCol = _tplCol;
    }
    get _staticNodeInfo() {
        return lang_1.isPresent(this._nodeIndex) ? this._view.staticNodeDebugInfos[this._nodeIndex] : null;
    }
    get context() { return this._view.context; }
    get component() {
        var /** @type {?} */ staticNodeInfo = this._staticNodeInfo;
        if (lang_1.isPresent(staticNodeInfo) && lang_1.isPresent(staticNodeInfo.componentToken)) {
            return this.injector.get(staticNodeInfo.componentToken);
        }
        return null;
    }
    get componentRenderElement() {
        var /** @type {?} */ componentView = this._view;
        while (lang_1.isPresent(componentView.declarationAppElement) &&
            componentView.type !== view_type_1.ViewType.COMPONENT) {
            componentView = (componentView.declarationAppElement.parentView);
        }
        return lang_1.isPresent(componentView.declarationAppElement) ?
            componentView.declarationAppElement.nativeElement :
            null;
    }
    get injector() { return this._view.injector(this._nodeIndex); }
    get renderNode() {
        if (lang_1.isPresent(this._nodeIndex) && lang_1.isPresent(this._view.allNodes)) {
            return this._view.allNodes[this._nodeIndex];
        }
        else {
            return null;
        }
    }
    get providerTokens() {
        var /** @type {?} */ staticNodeInfo = this._staticNodeInfo;
        return lang_1.isPresent(staticNodeInfo) ? staticNodeInfo.providerTokens : null;
    }
    get source() {
        return `${this._view.componentType.templateUrl}:${this._tplRow}:${this._tplCol}`;
    }
    get references() {
        var /** @type {?} */ varValues = {};
        var /** @type {?} */ staticNodeInfo = this._staticNodeInfo;
        if (lang_1.isPresent(staticNodeInfo)) {
            var /** @type {?} */ refs = staticNodeInfo.refTokens;
            collection_1.StringMapWrapper.forEach(refs, (refToken, refName) => {
                var /** @type {?} */ varValue;
                if (lang_1.isBlank(refToken)) {
                    varValue = lang_1.isPresent(this._view.allNodes) ? this._view.allNodes[this._nodeIndex] : null;
                }
                else {
                    varValue = this._view.injectorGet(refToken, this._nodeIndex, null);
                }
                varValues[refName] = varValue;
            });
        }
        return varValues;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DebugContext.prototype._view;
        /** @type {?} */
        DebugContext.prototype._nodeIndex;
        /** @type {?} */
        DebugContext.prototype._tplRow;
        /** @type {?} */
        DebugContext.prototype._tplCol;
    }
}
exports.DebugContext = DebugContext;
//# sourceMappingURL=debug_context.js.map