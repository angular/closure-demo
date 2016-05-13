goog.module('_angular$compiler$src$view__compiler$compile__pipe');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
var o = goog.require('_angular$compiler$src$output$output__ast');
var identifiers_1 = goog.require('_angular$compiler$src$identifiers');
var util_1 = goog.require('_angular$compiler$src$view__compiler$util');
class _PurePipeProxy {
    /**
     * @param {?} view
     * @param {?} instance
     * @param {?} argCount
     */
    constructor(view, instance, argCount) {
        this.view = view;
        this.instance = instance;
        this.argCount = argCount;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _PurePipeProxy.prototype.view;
        /** @type {?} */
        _PurePipeProxy.prototype.instance;
        /** @type {?} */
        _PurePipeProxy.prototype.argCount;
    }
}
class CompilePipe {
    /**
     * @param {?} view
     * @param {?} meta
     */
    constructor(view, meta) {
        this.view = view;
        this.meta = meta;
        this._purePipeProxies = [];
        this.instance = o.THIS_EXPR.prop(`_pipe_${meta.name}_${view.pipeCount++}`);
    }
    /**
     * @param {?} view
     * @param {?} name
     * @param {?} args
     * @return {?}
     */
    static call(view, name, args) {
        var /** @type {?} */ compView = view.componentView;
        var /** @type {?} */ meta = _findPipeMeta(compView, name);
        var /** @type {?} */ pipe;
        if (meta.pure) {
            // pure pipes live on the component view
            pipe = compView.purePipes.get(name);
            if (lang_1.isBlank(pipe)) {
                pipe = new CompilePipe(compView, meta);
                compView.purePipes.set(name, pipe);
                compView.pipes.push(pipe);
            }
        }
        else {
            // Non pure pipes live on the view that called it
            pipe = new CompilePipe(view, meta);
            view.pipes.push(pipe);
        }
        return pipe._call(view, args);
    }
    get pure() { return this.meta.pure; }
    /**
     * @return {?}
     */
    create() {
        var /** @type {?} */ deps = this.meta.type.diDeps.map((diDep) => {
            if (diDep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ChangeDetectorRef))) {
                return util_1.getPropertyInView(o.THIS_EXPR.prop('ref'), this.view, this.view.componentView);
            }
            return util_1.injectFromViewParentInjector(diDep.token, false);
        });
        this.view.fields.push(new o.ClassField(this.instance.name, o.importType(this.meta.type)));
        this.view.createMethod.resetDebugInfo(null, null);
        this.view.createMethod.addStmt(o.THIS_EXPR.prop(this.instance.name)
            .set(o.importExpr(this.meta.type).instantiate(deps))
            .toStmt());
        this._purePipeProxies.forEach((purePipeProxy) => {
            var /** @type {?} */ pipeInstanceSeenFromPureProxy = util_1.getPropertyInView(this.instance, purePipeProxy.view, this.view);
            util_1.createPureProxy(pipeInstanceSeenFromPureProxy.prop('transform')
                .callMethod(o.BuiltinMethod.bind, [pipeInstanceSeenFromPureProxy]), purePipeProxy.argCount, purePipeProxy.instance, purePipeProxy.view);
        });
    }
    /**
     * @param {?} callingView
     * @param {?} args
     * @return {?}
     */
    _call(callingView, args) {
        if (this.meta.pure) {
            // PurePipeProxies live on the view that called them.
            var /** @type {?} */ purePipeProxy = new _PurePipeProxy(callingView, o.THIS_EXPR.prop(`${this.instance.name}_${this._purePipeProxies.length}`), args.length);
            this._purePipeProxies.push(purePipeProxy);
            return o.importExpr(identifiers_1.Identifiers.castByValue)
                .callFn([
                purePipeProxy.instance,
                util_1.getPropertyInView(this.instance.prop('transform'), callingView, this.view)
            ])
                .callFn(args);
        }
        else {
            return util_1.getPropertyInView(this.instance, callingView, this.view).callMethod('transform', args);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompilePipe.prototype.instance;
        /** @type {?} */
        CompilePipe.prototype._purePipeProxies;
        /** @type {?} */
        CompilePipe.prototype.view;
        /** @type {?} */
        CompilePipe.prototype.meta;
    }
}
exports.CompilePipe = CompilePipe;
/**
 * @param {?} view
 * @param {?} name
 * @return {?}
 */
function _findPipeMeta(view, name) {
    var /** @type {?} */ pipeMeta = null;
    for (var /** @type {?} */ i = view.pipeMetas.length - 1; i >= 0; i--) {
        var /** @type {?} */ localPipeMeta = view.pipeMetas[i];
        if (localPipeMeta.name == name) {
            pipeMeta = localPipeMeta;
            break;
        }
    }
    if (lang_1.isBlank(pipeMeta)) {
        throw new exceptions_1.BaseException(`Illegal state: Could not find pipe ${name} although the parser should have detected this error!`);
    }
    return pipeMeta;
}
//# sourceMappingURL=compile_pipe.js.map