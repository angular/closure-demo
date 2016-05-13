goog.module('_angular$compiler$src$output$interpretive__view');
var core_private_1 = goog.require('_angular$compiler$core__private');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
class InterpretiveAppViewInstanceFactory {
    /**
     * @param {?} superClass
     * @param {?} clazz
     * @param {?} args
     * @param {?} props
     * @param {?} getters
     * @param {?} methods
     * @return {?}
     */
    createInstance(superClass, clazz, args, props, getters, methods) {
        if (superClass === core_private_1.AppView) {
            // We are always using DebugAppView as parent.
            // However, in prod mode we generate a constructor call that does
            // not have the argument for the debugNodeInfos.
            args = args.concat([null]);
            return new _InterpretiveAppView(args, props, getters, methods);
        }
        else if (superClass === core_private_1.DebugAppView) {
            return new _InterpretiveAppView(args, props, getters, methods);
        }
        throw new exceptions_1.BaseException(`Can't instantiate class ${superClass} in interpretative mode`);
    }
}
exports.InterpretiveAppViewInstanceFactory = InterpretiveAppViewInstanceFactory;
class _InterpretiveAppView extends core_private_1.DebugAppView {
    /**
     * @param {?} args
     * @param {?} props
     * @param {?} getters
     * @param {?} methods
     */
    constructor(args, props, getters, methods) {
        super(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
        this.props = props;
        this.getters = getters;
        this.methods = methods;
    }
    /**
     * @param {?} rootSelector
     * @return {?}
     */
    createInternal(rootSelector) {
        var /** @type {?} */ m = this.methods.get('createInternal');
        if (lang_1.isPresent(m)) {
            return m(rootSelector);
        }
        else {
            return super.createInternal(rootSelector);
        }
    }
    /**
     * @param {?} token
     * @param {?} nodeIndex
     * @param {?} notFoundResult
     * @return {?}
     */
    injectorGetInternal(token, nodeIndex, notFoundResult) {
        var /** @type {?} */ m = this.methods.get('injectorGetInternal');
        if (lang_1.isPresent(m)) {
            return m(token, nodeIndex, notFoundResult);
        }
        else {
            return super.injectorGet(token, nodeIndex, notFoundResult);
        }
    }
    /**
     * @return {?}
     */
    destroyInternal() {
        var /** @type {?} */ m = this.methods.get('destroyInternal');
        if (lang_1.isPresent(m)) {
            return m();
        }
        else {
            return super.destroyInternal();
        }
    }
    /**
     * @return {?}
     */
    dirtyParentQueriesInternal() {
        var /** @type {?} */ m = this.methods.get('dirtyParentQueriesInternal');
        if (lang_1.isPresent(m)) {
            return m();
        }
        else {
            return super.dirtyParentQueriesInternal();
        }
    }
    /**
     * @param {?} throwOnChange
     * @return {?}
     */
    detectChangesInternal(throwOnChange) {
        var /** @type {?} */ m = this.methods.get('detectChangesInternal');
        if (lang_1.isPresent(m)) {
            return m(throwOnChange);
        }
        else {
            return super.detectChangesInternal(throwOnChange);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _InterpretiveAppView.prototype.props;
        /** @type {?} */
        _InterpretiveAppView.prototype.getters;
        /** @type {?} */
        _InterpretiveAppView.prototype.methods;
    }
}
//# sourceMappingURL=interpretive_view.js.map