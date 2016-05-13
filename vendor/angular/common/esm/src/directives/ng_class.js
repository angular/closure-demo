goog.module('_angular$common$src$directives$ng__class');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var collection_1 = goog.require('_angular$common$src$facade$collection');
class NgClass {
    /**
     * @param {?} _iterableDiffers
     * @param {?} _keyValueDiffers
     * @param {?} _ngEl
     * @param {?} _renderer
     */
    constructor(_iterableDiffers, _keyValueDiffers, _ngEl, _renderer) {
        this._iterableDiffers = _iterableDiffers;
        this._keyValueDiffers = _keyValueDiffers;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
        this._initialClasses = [];
    }
    set initialClasses(v) {
        this._applyInitialClasses(true);
        this._initialClasses = lang_1.isPresent(v) && lang_1.isString(v) ? v.split(' ') : [];
        this._applyInitialClasses(false);
        this._applyClasses(this._rawClass, false);
    }
    set rawClass(v) {
        this._cleanupClasses(this._rawClass);
        if (lang_1.isString(v)) {
            v = ((v)).split(' ');
        }
        this._rawClass = (v);
        this._iterableDiffer = null;
        this._keyValueDiffer = null;
        if (lang_1.isPresent(v)) {
            if (collection_1.isListLikeIterable(v)) {
                this._iterableDiffer = this._iterableDiffers.find(v).create(null);
            }
            else {
                this._keyValueDiffer = this._keyValueDiffers.find(v).create(null);
            }
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (lang_1.isPresent(this._iterableDiffer)) {
            var /** @type {?} */ changes = this._iterableDiffer.diff(this._rawClass);
            if (lang_1.isPresent(changes)) {
                this._applyIterableChanges(changes);
            }
        }
        if (lang_1.isPresent(this._keyValueDiffer)) {
            var /** @type {?} */ changes = this._keyValueDiffer.diff(this._rawClass);
            if (lang_1.isPresent(changes)) {
                this._applyKeyValueChanges(changes);
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() { this._cleanupClasses(this._rawClass); }
    /**
     * @param {?} rawClassVal
     * @return {?}
     */
    _cleanupClasses(rawClassVal) {
        this._applyClasses(rawClassVal, true);
        this._applyInitialClasses(false);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    _applyKeyValueChanges(changes) {
        changes.forEachAddedItem((record) => { this._toggleClass(record.key, record.currentValue); });
        changes.forEachChangedItem((record) => { this._toggleClass(record.key, record.currentValue); });
        changes.forEachRemovedItem((record) => {
            if (record.previousValue) {
                this._toggleClass(record.key, false);
            }
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    _applyIterableChanges(changes) {
        changes.forEachAddedItem((record) => { this._toggleClass(record.item, true); });
        changes.forEachRemovedItem((record) => { this._toggleClass(record.item, false); });
    }
    /**
     * @param {?} isCleanup
     * @return {?}
     */
    _applyInitialClasses(isCleanup) {
        this._initialClasses.forEach(className => this._toggleClass(className, !isCleanup));
    }
    /**
     * @param {?} rawClassVal
     * @param {?} isCleanup
     * @return {?}
     */
    _applyClasses(rawClassVal, isCleanup) {
        if (lang_1.isPresent(rawClassVal)) {
            if (lang_1.isArray(rawClassVal)) {
                ((rawClassVal)).forEach(className => this._toggleClass(className, !isCleanup));
            }
            else if (rawClassVal instanceof Set) {
                ((rawClassVal)).forEach(className => this._toggleClass(className, !isCleanup));
            }
            else {
                collection_1.StringMapWrapper.forEach(/** @type {?} */ (rawClassVal), (expVal, className) => {
                    if (lang_1.isPresent(expVal))
                        this._toggleClass(className, !isCleanup);
                });
            }
        }
    }
    /**
     * @param {?} className
     * @param {?} enabled
     * @return {?}
     */
    _toggleClass(className, enabled) {
        className = className.trim();
        if (className.length > 0) {
            if (className.indexOf(' ') > -1) {
                var /** @type {?} */ classes = className.split(/\s+/g);
                for (var /** @type {?} */ i = 0, /** @type {?} */ len = classes.length; i < len; i++) {
                    this._renderer.setElementClass(this._ngEl.nativeElement, classes[i], enabled);
                }
            }
            else {
                this._renderer.setElementClass(this._ngEl.nativeElement, className, enabled);
            }
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        NgClass.prototype._iterableDiffer;
        /** @type {?} */
        NgClass.prototype._keyValueDiffer;
        /** @type {?} */
        NgClass.prototype._initialClasses;
        /** @type {?} */
        NgClass.prototype._rawClass;
        /** @type {?} */
        NgClass.prototype._iterableDiffers;
        /** @type {?} */
        NgClass.prototype._keyValueDiffers;
        /** @type {?} */
        NgClass.prototype._ngEl;
        /** @type {?} */
        NgClass.prototype._renderer;
    }
}
NgClass.decorators = [
    { type: core_1.Directive, args: [{ selector: '[ngClass]', inputs: ['rawClass: ngClass', 'initialClasses: class'] },] },
];
/** @nocollapse */ NgClass.ctorParameters = [
    { type: core_1.IterableDiffers, },
    { type: core_1.KeyValueDiffers, },
    { type: core_1.ElementRef, },
    { type: core_1.Renderer, },
];
exports.NgClass = NgClass;
//# sourceMappingURL=ng_class.js.map