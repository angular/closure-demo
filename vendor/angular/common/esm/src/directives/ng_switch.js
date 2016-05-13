goog.module('_angular$common$src$directives$ng__switch');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var collection_1 = goog.require('_angular$common$src$facade$collection');
const /** @type {?} */ _WHEN_DEFAULT = new Object();
class SwitchView {
    /**
     * @param {?} _viewContainerRef
     * @param {?} _templateRef
     */
    constructor(_viewContainerRef, _templateRef) {
        this._viewContainerRef = _viewContainerRef;
        this._templateRef = _templateRef;
    }
    /**
     * @return {?}
     */
    create() { this._viewContainerRef.createEmbeddedView(this._templateRef); }
    /**
     * @return {?}
     */
    destroy() { this._viewContainerRef.clear(); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        SwitchView.prototype._viewContainerRef;
        /** @type {?} */
        SwitchView.prototype._templateRef;
    }
}
exports.SwitchView = SwitchView;
class NgSwitch {
    constructor() {
        this._useDefault = false;
        this._valueViews = new collection_1.Map();
        this._activeViews = [];
    }
    set ngSwitch(value) {
        // Empty the currently active ViewContainers
        this._emptyAllActiveViews();
        // Add the ViewContainers matching the value (with a fallback to default)
        this._useDefault = false;
        var /** @type {?} */ views = this._valueViews.get(value);
        if (lang_1.isBlank(views)) {
            this._useDefault = true;
            views = lang_1.normalizeBlank(this._valueViews.get(_WHEN_DEFAULT));
        }
        this._activateViews(views);
        this._switchValue = value;
    }
    /**
     * @internal
     * @param {?} oldWhen
     * @param {?} newWhen
     * @param {?} view
     * @return {?}
     */
    _onWhenValueChanged(oldWhen, newWhen, view) {
        this._deregisterView(oldWhen, view);
        this._registerView(newWhen, view);
        if (oldWhen === this._switchValue) {
            view.destroy();
            collection_1.ListWrapper.remove(this._activeViews, view);
        }
        else if (newWhen === this._switchValue) {
            if (this._useDefault) {
                this._useDefault = false;
                this._emptyAllActiveViews();
            }
            view.create();
            this._activeViews.push(view);
        }
        // Switch to default when there is no more active ViewContainers
        if (this._activeViews.length === 0 && !this._useDefault) {
            this._useDefault = true;
            this._activateViews(this._valueViews.get(_WHEN_DEFAULT));
        }
    }
    /**
     * @internal
     * @return {?}
     */
    _emptyAllActiveViews() {
        var /** @type {?} */ activeContainers = this._activeViews;
        for (var /** @type {?} */ i = 0; i < activeContainers.length; i++) {
            activeContainers[i].destroy();
        }
        this._activeViews = [];
    }
    /**
     * @internal
     * @param {?} views
     * @return {?}
     */
    _activateViews(views) {
        // TODO(vicb): assert(this._activeViews.length === 0);
        if (lang_1.isPresent(views)) {
            for (var /** @type {?} */ i = 0; i < views.length; i++) {
                views[i].create();
            }
            this._activeViews = views;
        }
    }
    /**
     * @internal
     * @param {?} value
     * @param {?} view
     * @return {?}
     */
    _registerView(value, view) {
        var /** @type {?} */ views = this._valueViews.get(value);
        if (lang_1.isBlank(views)) {
            views = [];
            this._valueViews.set(value, views);
        }
        views.push(view);
    }
    /**
     * @internal
     * @param {?} value
     * @param {?} view
     * @return {?}
     */
    _deregisterView(value, view) {
        // `_WHEN_DEFAULT` is used a marker for non-registered whens
        if (value === _WHEN_DEFAULT)
            return;
        var /** @type {?} */ views = this._valueViews.get(value);
        if (views.length == 1) {
            this._valueViews.delete(value);
        }
        else {
            collection_1.ListWrapper.remove(views, view);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        NgSwitch.prototype._switchValue;
        /** @type {?} */
        NgSwitch.prototype._useDefault;
        /** @type {?} */
        NgSwitch.prototype._valueViews;
        /** @type {?} */
        NgSwitch.prototype._activeViews;
    }
}
/** @nocollapse */ NgSwitch.decorators = [
    { type: core_1.Directive, args: [{ selector: '[ngSwitch]', inputs: ['ngSwitch'] },] },
];
exports.NgSwitch = NgSwitch;
class NgSwitchWhen {
    /**
     * @param {?} viewContainer
     * @param {?} templateRef
     * @param {?} ngSwitch
     */
    constructor(viewContainer, templateRef, ngSwitch) {
        // `_WHEN_DEFAULT` is used as a marker for a not yet initialized value
        /** @internal */
        this._value = _WHEN_DEFAULT;
        this._switch = ngSwitch;
        this._view = new SwitchView(viewContainer, templateRef);
    }
    set ngSwitchWhen(value) {
        this._switch._onWhenValueChanged(this._value, value, this._view);
        this._value = value;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        NgSwitchWhen.prototype._value;
        /** @internal
        @type {?} */
        NgSwitchWhen.prototype._view;
        /** @type {?} */
        NgSwitchWhen.prototype._switch;
    }
}
/** @nocollapse */ NgSwitchWhen.decorators = [
    { type: core_1.Directive, args: [{ selector: '[ngSwitchWhen]', inputs: ['ngSwitchWhen'] },] },
];
/** @nocollapse */ NgSwitchWhen.ctorParameters = [
    { type: core_1.ViewContainerRef, },
    { type: core_1.TemplateRef, },
    { type: NgSwitch, decorators: [{ type: core_1.Host },] },
];
exports.NgSwitchWhen = NgSwitchWhen;
class NgSwitchDefault {
    /**
     * @param {?} viewContainer
     * @param {?} templateRef
     * @param {?} sswitch
     */
    constructor(viewContainer, templateRef, sswitch) {
        sswitch._registerView(_WHEN_DEFAULT, new SwitchView(viewContainer, templateRef));
    }
}
/** @nocollapse */ NgSwitchDefault.decorators = [
    { type: core_1.Directive, args: [{ selector: '[ngSwitchDefault]' },] },
];
/** @nocollapse */ NgSwitchDefault.ctorParameters = [
    { type: core_1.ViewContainerRef, },
    { type: core_1.TemplateRef, },
    { type: NgSwitch, decorators: [{ type: core_1.Host },] },
];
exports.NgSwitchDefault = NgSwitchDefault;
//# sourceMappingURL=ng_switch.js.map