goog.module('_angular$common$src$directives$ng__for');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var exceptions_1 = goog.require('_angular$common$src$facade$exceptions');
class NgForRow {
    /**
     * @param {?} $implicit
     * @param {?} index
     * @param {?} count
     */
    constructor($implicit, index, count) {
        this.$implicit = $implicit;
        this.index = index;
        this.count = count;
    }
    get first() { return this.index === 0; }
    get last() { return this.index === this.count - 1; }
    get even() { return this.index % 2 === 0; }
    get odd() { return !this.even; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        NgForRow.prototype.$implicit;
        /** @type {?} */
        NgForRow.prototype.index;
        /** @type {?} */
        NgForRow.prototype.count;
    }
}
exports.NgForRow = NgForRow;
class NgFor {
    /**
     * @param {?} _viewContainer
     * @param {?} _templateRef
     * @param {?} _iterableDiffers
     * @param {?} _cdr
     */
    constructor(_viewContainer, _templateRef, _iterableDiffers, _cdr) {
        this._viewContainer = _viewContainer;
        this._templateRef = _templateRef;
        this._iterableDiffers = _iterableDiffers;
        this._cdr = _cdr;
    }
    set ngForOf(value) {
        this._ngForOf = value;
        if (lang_1.isBlank(this._differ) && lang_1.isPresent(value)) {
            try {
                this._differ = this._iterableDiffers.find(value).create(this._cdr, this._ngForTrackBy);
            }
            catch (e) {
                throw new exceptions_1.BaseException(`Cannot find a differ supporting object '${value}' of type '${lang_1.getTypeNameForDebugging(value)}'. NgFor only supports binding to Iterables such as Arrays.`);
            }
        }
    }
    set ngForTemplate(value) {
        if (lang_1.isPresent(value)) {
            this._templateRef = value;
        }
    }
    set ngForTrackBy(value) { this._ngForTrackBy = value; }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (lang_1.isPresent(this._differ)) {
            var /** @type {?} */ changes = this._differ.diff(this._ngForOf);
            if (lang_1.isPresent(changes))
                this._applyChanges(changes);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    _applyChanges(changes) {
        // TODO(rado): check if change detection can produce a change record that is
        // easier to consume than current.
        var /** @type {?} */ recordViewTuples = [];
        changes.forEachRemovedItem((removedRecord) => recordViewTuples.push(new RecordViewTuple(removedRecord, null)));
        changes.forEachMovedItem((movedRecord) => recordViewTuples.push(new RecordViewTuple(movedRecord, null)));
        var /** @type {?} */ insertTuples = this._bulkRemove(recordViewTuples);
        changes.forEachAddedItem((addedRecord) => insertTuples.push(new RecordViewTuple(addedRecord, null)));
        this._bulkInsert(insertTuples);
        for (var /** @type {?} */ i = 0; i < insertTuples.length; i++) {
            this._perViewChange(insertTuples[i].view, insertTuples[i].record);
        }
        for (var /** @type {?} */ i = 0, /** @type {?} */ ilen = this._viewContainer.length; i < ilen; i++) {
            var /** @type {?} */ viewRef = (this._viewContainer.get(i));
            viewRef.context.index = i;
            viewRef.context.count = ilen;
        }
        changes.forEachIdentityChange((record) => {
            var /** @type {?} */ viewRef = (this._viewContainer.get(record.currentIndex));
            viewRef.context.$implicit = record.item;
        });
    }
    /**
     * @param {?} view
     * @param {?} record
     * @return {?}
     */
    _perViewChange(view, record) {
        view.context.$implicit = record.item;
    }
    /**
     * @param {?} tuples
     * @return {?}
     */
    _bulkRemove(tuples) {
        tuples.sort((a, b) => a.record.previousIndex - b.record.previousIndex);
        var /** @type {?} */ movedTuples = [];
        for (var /** @type {?} */ i = tuples.length - 1; i >= 0; i--) {
            var /** @type {?} */ tuple = tuples[i];
            // separate moved views from removed views.
            if (lang_1.isPresent(tuple.record.currentIndex)) {
                tuple.view = (this._viewContainer.detach(tuple.record.previousIndex));
                movedTuples.push(tuple);
            }
            else {
                this._viewContainer.remove(tuple.record.previousIndex);
            }
        }
        return movedTuples;
    }
    /**
     * @param {?} tuples
     * @return {?}
     */
    _bulkInsert(tuples) {
        tuples.sort((a, b) => a.record.currentIndex - b.record.currentIndex);
        for (var /** @type {?} */ i = 0; i < tuples.length; i++) {
            var /** @type {?} */ tuple = tuples[i];
            if (lang_1.isPresent(tuple.view)) {
                this._viewContainer.insert(tuple.view, tuple.record.currentIndex);
            }
            else {
                tuple.view = this._viewContainer.createEmbeddedView(this._templateRef, new NgForRow(null, null, null), tuple.record.currentIndex);
            }
        }
        return tuples;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        NgFor.prototype._ngForOf;
        /** @internal
        @type {?} */
        NgFor.prototype._ngForTrackBy;
        /** @type {?} */
        NgFor.prototype._differ;
        /** @type {?} */
        NgFor.prototype._viewContainer;
        /** @type {?} */
        NgFor.prototype._templateRef;
        /** @type {?} */
        NgFor.prototype._iterableDiffers;
        /** @type {?} */
        NgFor.prototype._cdr;
    }
}
NgFor.decorators = [
    { type: core_1.Directive, args: [{ selector: '[ngFor][ngForOf]', inputs: ['ngForTrackBy', 'ngForOf', 'ngForTemplate'] },] },
];
NgFor.ctorParameters = [
    { type: core_1.ViewContainerRef, },
    { type: core_1.TemplateRef, },
    { type: core_1.IterableDiffers, },
    { type: core_1.ChangeDetectorRef, },
];
exports.NgFor = NgFor;
class RecordViewTuple {
    /**
     * @param {?} record
     * @param {?} view
     */
    constructor(record, view) {
        this.record = record;
        this.view = view;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        RecordViewTuple.prototype.view;
        /** @type {?} */
        RecordViewTuple.prototype.record;
    }
}
//# sourceMappingURL=ng_for.js.map