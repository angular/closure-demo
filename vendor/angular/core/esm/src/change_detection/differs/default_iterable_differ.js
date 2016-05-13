goog.module('_angular$core$src$change__detection$differs$default__iterable__differ');
var exceptions_1 = goog.require('_angular$core$src$facade$exceptions');
var collection_1 = goog.require('_angular$core$src$facade$collection');
var lang_1 = goog.require('_angular$core$src$facade$lang');
/* @ts2dart_const */
class DefaultIterableDifferFactory {
    /**
     */
    constructor() {
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    supports(obj) { return collection_1.isListLikeIterable(obj); }
    /**
     * @param {?} cdRef
     * @param {?=} trackByFn
     * @return {?}
     */
    create(cdRef, trackByFn) {
        return new DefaultIterableDiffer(trackByFn);
    }
}
exports.DefaultIterableDifferFactory = DefaultIterableDifferFactory;
var /** @type {?} */ trackByIdentity = (index, item) => item;
class DefaultIterableDiffer {
    /**
     * @param {?=} _trackByFn
     */
    constructor(_trackByFn) {
        this._trackByFn = _trackByFn;
        this._length = null;
        this._collection = null;
        this._linkedRecords = null;
        this._unlinkedRecords = null;
        this._previousItHead = null;
        this._itHead = null;
        this._itTail = null;
        this._additionsHead = null;
        this._additionsTail = null;
        this._movesHead = null;
        this._movesTail = null;
        this._removalsHead = null;
        this._removalsTail = null;
        this._identityChangesHead = null;
        this._identityChangesTail = null;
        this._trackByFn = lang_1.isPresent(this._trackByFn) ? this._trackByFn : trackByIdentity;
    }
    get collection() { return this._collection; }
    get length() { return this._length; }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachItem(fn) {
        var /** @type {?} */ record;
        for (record = this._itHead; record !== null; record = record._next) {
            fn(record);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachPreviousItem(fn) {
        var /** @type {?} */ record;
        for (record = this._previousItHead; record !== null; record = record._nextPrevious) {
            fn(record);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachAddedItem(fn) {
        var /** @type {?} */ record;
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            fn(record);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachMovedItem(fn) {
        var /** @type {?} */ record;
        for (record = this._movesHead; record !== null; record = record._nextMoved) {
            fn(record);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachRemovedItem(fn) {
        var /** @type {?} */ record;
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
            fn(record);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEachIdentityChange(fn) {
        var /** @type {?} */ record;
        for (record = this._identityChangesHead; record !== null; record = record._nextIdentityChange) {
            fn(record);
        }
    }
    /**
     * @param {?} collection
     * @return {?}
     */
    diff(collection) {
        if (lang_1.isBlank(collection))
            collection = [];
        if (!collection_1.isListLikeIterable(collection)) {
            throw new exceptions_1.BaseException(`Error trying to diff '${collection}'`);
        }
        if (this.check(collection)) {
            return this;
        }
        else {
            return null;
        }
    }
    /**
     * @return {?}
     */
    onDestroy() { }
    /**
     * @param {?} collection
     * @return {?}
     */
    check(collection) {
        this._reset();
        var /** @type {?} */ record = this._itHead;
        var /** @type {?} */ mayBeDirty = false;
        var /** @type {?} */ index;
        var /** @type {?} */ item;
        var /** @type {?} */ itemTrackBy;
        if (lang_1.isArray(collection)) {
            var /** @type {?} */ list = collection;
            this._length = collection.length;
            for (index = 0; index < this._length; index++) {
                item = list[index];
                itemTrackBy = this._trackByFn(index, item);
                if (record === null || !lang_1.looseIdentical(record.trackById, itemTrackBy)) {
                    record = this._mismatch(record, item, itemTrackBy, index);
                    mayBeDirty = true;
                }
                else {
                    if (mayBeDirty) {
                        // TODO(misko): can we limit this to duplicates only?
                        record = this._verifyReinsertion(record, item, itemTrackBy, index);
                    }
                    if (!lang_1.looseIdentical(record.item, item))
                        this._addIdentityChange(record, item);
                }
                record = record._next;
            }
        }
        else {
            index = 0;
            collection_1.iterateListLike(collection, (item) => {
                itemTrackBy = this._trackByFn(index, item);
                if (record === null || !lang_1.looseIdentical(record.trackById, itemTrackBy)) {
                    record = this._mismatch(record, item, itemTrackBy, index);
                    mayBeDirty = true;
                }
                else {
                    if (mayBeDirty) {
                        // TODO(misko): can we limit this to duplicates only?
                        record = this._verifyReinsertion(record, item, itemTrackBy, index);
                    }
                    if (!lang_1.looseIdentical(record.item, item))
                        this._addIdentityChange(record, item);
                }
                record = record._next;
                index++;
            });
            this._length = index;
        }
        this._truncate(record);
        this._collection = collection;
        return this.isDirty;
    }
    /* CollectionChanges is considered dirty if it has any additions, moves, removals, or identity
     * changes.
     */
    get isDirty() {
        return this._additionsHead !== null || this._movesHead !== null ||
            this._removalsHead !== null || this._identityChangesHead !== null;
    }
    /**
     *  Reset the state of the change objects to show no changes. This means set previousKey to currentKey, and clear all of the queues (additions, moves, removals). Set the previousIndexes of moved and added items to their currentIndexes Reset the list of additions, moves and removals *
     * @internal
     * @return {?}
     */
    _reset() {
        if (this.isDirty) {
            var /** @type {?} */ record;
            var /** @type {?} */ nextRecord;
            for (record = this._previousItHead = this._itHead; record !== null; record = record._next) {
                record._nextPrevious = record._next;
            }
            for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                record.previousIndex = record.currentIndex;
            }
            this._additionsHead = this._additionsTail = null;
            for (record = this._movesHead; record !== null; record = nextRecord) {
                record.previousIndex = record.currentIndex;
                nextRecord = record._nextMoved;
            }
            this._movesHead = this._movesTail = null;
            this._removalsHead = this._removalsTail = null;
            this._identityChangesHead = this._identityChangesTail = null;
        }
    }
    /**
     *  This is the core function which handles differences between collections. * - `record` is the record which we saw at this position last time. If null then it is a new item. - `item` is the current item in the collection - `index` is the position of the item in the collection *
     * @internal
     * @param {?} record
     * @param {?} item
     * @param {?} itemTrackBy
     * @param {?} index
     * @return {?}
     */
    _mismatch(record, item, itemTrackBy, index) {
        // The previous record after which we will append the current one.
        var /** @type {?} */ previousRecord;
        if (record === null) {
            previousRecord = this._itTail;
        }
        else {
            previousRecord = record._prev;
            // Remove the record from the collection since we know it does not match the item.
            this._remove(record);
        }
        // Attempt to see if we have seen the item before.
        record = this._linkedRecords === null ? null : this._linkedRecords.get(itemTrackBy, index);
        if (record !== null) {
            // We have seen this before, we need to move it forward in the collection.
            // But first we need to check if identity changed, so we can update in view if necessary
            if (!lang_1.looseIdentical(record.item, item))
                this._addIdentityChange(record, item);
            this._moveAfter(record, previousRecord, index);
        }
        else {
            // Never seen it, check evicted list.
            record = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
            if (record !== null) {
                // It is an item which we have evicted earlier: reinsert it back into the list.
                // But first we need to check if identity changed, so we can update in view if necessary
                if (!lang_1.looseIdentical(record.item, item))
                    this._addIdentityChange(record, item);
                this._reinsertAfter(record, previousRecord, index);
            }
            else {
                // It is a new item: add it.
                record =
                    this._addAfter(new CollectionChangeRecord(item, itemTrackBy), previousRecord, index);
            }
        }
        return record;
    }
    /**
     *  This check is only needed if an array contains duplicates. (Short circuit of nothing dirty) * Use case: `[a, a]` => `[b, a, a]` * If we did not have this check then the insertion of `b` would: 1) evict first `a` 2) insert `b` at `0` index. 3) leave `a` at index `1` as is. <-- this is wrong! 3) reinsert `a` at index 2. <-- this is wrong! * The correct behavior is: 1) evict first `a` 2) insert `b` at `0` index. 3) reinsert `a` at index 1. 3) move `a` at from `1` to `2`. * * Double check that we have not evicted a duplicate item. We need to check if the item type may have already been removed: The insertion of b will evict the first 'a'. If we don't reinsert it now it will be reinserted at the end. Which will show up as the two 'a's switching position. This is incorrect, since a better way to think of it is as insert of 'b' rather then switch 'a' with 'b' and then add 'a' at the end. *
     * @internal
     * @param {?} record
     * @param {?} item
     * @param {?} itemTrackBy
     * @param {?} index
     * @return {?}
     */
    _verifyReinsertion(record, item, itemTrackBy, index) {
        var /** @type {?} */ reinsertRecord = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
        if (reinsertRecord !== null) {
            record = this._reinsertAfter(reinsertRecord, record._prev, index);
        }
        else if (record.currentIndex != index) {
            record.currentIndex = index;
            this._addToMoves(record, index);
        }
        return record;
    }
    /**
     *  Get rid of any excess {@link CollectionChangeRecord}s from the previous collection * - `record` The first excess {@link CollectionChangeRecord}. *
     * @internal
     * @param {?} record
     * @return {?}
     */
    _truncate(record) {
        // Anything after that needs to be removed;
        while (record !== null) {
            var /** @type {?} */ nextRecord = record._next;
            this._addToRemovals(this._unlink(record));
            record = nextRecord;
        }
        if (this._unlinkedRecords !== null) {
            this._unlinkedRecords.clear();
        }
        if (this._additionsTail !== null) {
            this._additionsTail._nextAdded = null;
        }
        if (this._movesTail !== null) {
            this._movesTail._nextMoved = null;
        }
        if (this._itTail !== null) {
            this._itTail._next = null;
        }
        if (this._removalsTail !== null) {
            this._removalsTail._nextRemoved = null;
        }
        if (this._identityChangesTail !== null) {
            this._identityChangesTail._nextIdentityChange = null;
        }
    }
    /**
     * @internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    _reinsertAfter(record, prevRecord, index) {
        if (this._unlinkedRecords !== null) {
            this._unlinkedRecords.remove(record);
        }
        var /** @type {?} */ prev = record._prevRemoved;
        var /** @type {?} */ next = record._nextRemoved;
        if (prev === null) {
            this._removalsHead = next;
        }
        else {
            prev._nextRemoved = next;
        }
        if (next === null) {
            this._removalsTail = prev;
        }
        else {
            next._prevRemoved = prev;
        }
        this._insertAfter(record, prevRecord, index);
        this._addToMoves(record, index);
        return record;
    }
    /**
     * @internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    _moveAfter(record, prevRecord, index) {
        this._unlink(record);
        this._insertAfter(record, prevRecord, index);
        this._addToMoves(record, index);
        return record;
    }
    /**
     * @internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    _addAfter(record, prevRecord, index) {
        this._insertAfter(record, prevRecord, index);
        if (this._additionsTail === null) {
            // todo(vicb)
            // assert(this._additionsHead === null);
            this._additionsTail = this._additionsHead = record;
        }
        else {
            // todo(vicb)
            // assert(_additionsTail._nextAdded === null);
            // assert(record._nextAdded === null);
            this._additionsTail = this._additionsTail._nextAdded = record;
        }
        return record;
    }
    /**
     * @internal
     * @param {?} record
     * @param {?} prevRecord
     * @param {?} index
     * @return {?}
     */
    _insertAfter(record, prevRecord, index) {
        // todo(vicb)
        // assert(record != prevRecord);
        // assert(record._next === null);
        // assert(record._prev === null);
        var /** @type {?} */ next = prevRecord === null ? this._itHead : prevRecord._next;
        // todo(vicb)
        // assert(next != record);
        // assert(prevRecord != record);
        record._next = next;
        record._prev = prevRecord;
        if (next === null) {
            this._itTail = record;
        }
        else {
            next._prev = record;
        }
        if (prevRecord === null) {
            this._itHead = record;
        }
        else {
            prevRecord._next = record;
        }
        if (this._linkedRecords === null) {
            this._linkedRecords = new _DuplicateMap();
        }
        this._linkedRecords.put(record);
        record.currentIndex = index;
        return record;
    }
    /**
     * @internal
     * @param {?} record
     * @return {?}
     */
    _remove(record) {
        return this._addToRemovals(this._unlink(record));
    }
    /**
     * @internal
     * @param {?} record
     * @return {?}
     */
    _unlink(record) {
        if (this._linkedRecords !== null) {
            this._linkedRecords.remove(record);
        }
        var /** @type {?} */ prev = record._prev;
        var /** @type {?} */ next = record._next;
        // todo(vicb)
        // assert((record._prev = null) === null);
        // assert((record._next = null) === null);
        if (prev === null) {
            this._itHead = next;
        }
        else {
            prev._next = next;
        }
        if (next === null) {
            this._itTail = prev;
        }
        else {
            next._prev = prev;
        }
        return record;
    }
    /**
     * @internal
     * @param {?} record
     * @param {?} toIndex
     * @return {?}
     */
    _addToMoves(record, toIndex) {
        // todo(vicb)
        // assert(record._nextMoved === null);
        if (record.previousIndex === toIndex) {
            return record;
        }
        if (this._movesTail === null) {
            // todo(vicb)
            // assert(_movesHead === null);
            this._movesTail = this._movesHead = record;
        }
        else {
            // todo(vicb)
            // assert(_movesTail._nextMoved === null);
            this._movesTail = this._movesTail._nextMoved = record;
        }
        return record;
    }
    /**
     * @internal
     * @param {?} record
     * @return {?}
     */
    _addToRemovals(record) {
        if (this._unlinkedRecords === null) {
            this._unlinkedRecords = new _DuplicateMap();
        }
        this._unlinkedRecords.put(record);
        record.currentIndex = null;
        record._nextRemoved = null;
        if (this._removalsTail === null) {
            // todo(vicb)
            // assert(_removalsHead === null);
            this._removalsTail = this._removalsHead = record;
            record._prevRemoved = null;
        }
        else {
            // todo(vicb)
            // assert(_removalsTail._nextRemoved === null);
            // assert(record._nextRemoved === null);
            record._prevRemoved = this._removalsTail;
            this._removalsTail = this._removalsTail._nextRemoved = record;
        }
        return record;
    }
    /**
     * @internal
     * @param {?} record
     * @param {?} item
     * @return {?}
     */
    _addIdentityChange(record, item) {
        record.item = item;
        if (this._identityChangesTail === null) {
            this._identityChangesTail = this._identityChangesHead = record;
        }
        else {
            this._identityChangesTail = this._identityChangesTail._nextIdentityChange = record;
        }
        return record;
    }
    /**
     * @return {?}
     */
    toString() {
        var /** @type {?} */ list = [];
        this.forEachItem((record) => list.push(record));
        var /** @type {?} */ previous = [];
        this.forEachPreviousItem((record) => previous.push(record));
        var /** @type {?} */ additions = [];
        this.forEachAddedItem((record) => additions.push(record));
        var /** @type {?} */ moves = [];
        this.forEachMovedItem((record) => moves.push(record));
        var /** @type {?} */ removals = [];
        this.forEachRemovedItem((record) => removals.push(record));
        var /** @type {?} */ identityChanges = [];
        this.forEachIdentityChange((record) => identityChanges.push(record));
        return "collection: " + list.join(', ') + "\n" + "previous: " + previous.join(', ') + "\n" +
            "additions: " + additions.join(', ') + "\n" + "moves: " + moves.join(', ') + "\n" +
            "removals: " + removals.join(', ') + "\n" + "identityChanges: " +
            identityChanges.join(', ') + "\n";
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        DefaultIterableDiffer.prototype._length;
        /** @type {?} */
        DefaultIterableDiffer.prototype._collection;
        /** @type {?} */
        DefaultIterableDiffer.prototype._linkedRecords;
        /** @type {?} */
        DefaultIterableDiffer.prototype._unlinkedRecords;
        /** @type {?} */
        DefaultIterableDiffer.prototype._previousItHead;
        /** @type {?} */
        DefaultIterableDiffer.prototype._itHead;
        /** @type {?} */
        DefaultIterableDiffer.prototype._itTail;
        /** @type {?} */
        DefaultIterableDiffer.prototype._additionsHead;
        /** @type {?} */
        DefaultIterableDiffer.prototype._additionsTail;
        /** @type {?} */
        DefaultIterableDiffer.prototype._movesHead;
        /** @type {?} */
        DefaultIterableDiffer.prototype._movesTail;
        /** @type {?} */
        DefaultIterableDiffer.prototype._removalsHead;
        /** @type {?} */
        DefaultIterableDiffer.prototype._removalsTail;
        /** @type {?} */
        DefaultIterableDiffer.prototype._identityChangesHead;
        /** @type {?} */
        DefaultIterableDiffer.prototype._identityChangesTail;
        /** @type {?} */
        DefaultIterableDiffer.prototype._trackByFn;
    }
}
exports.DefaultIterableDiffer = DefaultIterableDiffer;
class CollectionChangeRecord {
    /**
     * @param {?} item
     * @param {?} trackById
     */
    constructor(item, trackById) {
        this.item = item;
        this.trackById = trackById;
        this.currentIndex = null;
        this.previousIndex = null;
        /** @internal */
        this._nextPrevious = null;
        /** @internal */
        this._prev = null;
        /** @internal */
        this._next = null;
        /** @internal */
        this._prevDup = null;
        /** @internal */
        this._nextDup = null;
        /** @internal */
        this._prevRemoved = null;
        /** @internal */
        this._nextRemoved = null;
        /** @internal */
        this._nextAdded = null;
        /** @internal */
        this._nextMoved = null;
        /** @internal */
        this._nextIdentityChange = null;
    }
    /**
     * @return {?}
     */
    toString() {
        return this.previousIndex === this.currentIndex ?
            lang_1.stringify(this.item) :
            lang_1.stringify(this.item) + '[' + lang_1.stringify(this.previousIndex) + '->' +
                lang_1.stringify(this.currentIndex) + ']';
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CollectionChangeRecord.prototype.currentIndex;
        /** @type {?} */
        CollectionChangeRecord.prototype.previousIndex;
        /** @internal
        @type {?} */
        CollectionChangeRecord.prototype._nextPrevious;
        /** @internal
        @type {?} */
        CollectionChangeRecord.prototype._prev;
        /** @internal
        @type {?} */
        CollectionChangeRecord.prototype._next;
        /** @internal
        @type {?} */
        CollectionChangeRecord.prototype._prevDup;
        /** @internal
        @type {?} */
        CollectionChangeRecord.prototype._nextDup;
        /** @internal
        @type {?} */
        CollectionChangeRecord.prototype._prevRemoved;
        /** @internal
        @type {?} */
        CollectionChangeRecord.prototype._nextRemoved;
        /** @internal
        @type {?} */
        CollectionChangeRecord.prototype._nextAdded;
        /** @internal
        @type {?} */
        CollectionChangeRecord.prototype._nextMoved;
        /** @internal
        @type {?} */
        CollectionChangeRecord.prototype._nextIdentityChange;
        /** @type {?} */
        CollectionChangeRecord.prototype.item;
        /** @type {?} */
        CollectionChangeRecord.prototype.trackById;
    }
}
exports.CollectionChangeRecord = CollectionChangeRecord;
// A linked list of CollectionChangeRecords with the same CollectionChangeRecord.item
class _DuplicateItemRecordList {
    constructor() {
        /** @internal */
        this._head = null;
        /** @internal */
        this._tail = null;
    }
    /**
     *  Append the record to the list of duplicates. * Note: by design all records in the list of duplicates hold the same value in record.item.
     * @param {?} record
     * @return {?}
     */
    add(record) {
        if (this._head === null) {
            this._head = this._tail = record;
            record._nextDup = null;
            record._prevDup = null;
        }
        else {
            // todo(vicb)
            // assert(record.item ==  _head.item ||
            //       record.item is num && record.item.isNaN && _head.item is num && _head.item.isNaN);
            this._tail._nextDup = record;
            record._prevDup = this._tail;
            record._nextDup = null;
            this._tail = record;
        }
    }
    /**
     * @param {?} trackById
     * @param {?} afterIndex
     * @return {?}
     */
    get(trackById, afterIndex) {
        var /** @type {?} */ record;
        for (record = this._head; record !== null; record = record._nextDup) {
            if ((afterIndex === null || afterIndex < record.currentIndex) &&
                lang_1.looseIdentical(record.trackById, trackById)) {
                return record;
            }
        }
        return null;
    }
    /**
     *  Remove one {@link CollectionChangeRecord} from the list of duplicates. * Returns whether the list of duplicates is empty.
     * @param {?} record
     * @return {?}
     */
    remove(record) {
        // todo(vicb)
        // assert(() {
        //  // verify that the record being removed is in the list.
        //  for (CollectionChangeRecord cursor = _head; cursor != null; cursor = cursor._nextDup) {
        //    if (identical(cursor, record)) return true;
        //  }
        //  return false;
        //});
        var /** @type {?} */ prev = record._prevDup;
        var /** @type {?} */ next = record._nextDup;
        if (prev === null) {
            this._head = next;
        }
        else {
            prev._nextDup = next;
        }
        if (next === null) {
            this._tail = prev;
        }
        else {
            next._prevDup = prev;
        }
        return this._head === null;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        _DuplicateItemRecordList.prototype._head;
        /** @internal
        @type {?} */
        _DuplicateItemRecordList.prototype._tail;
    }
}
class _DuplicateMap {
    constructor() {
        this.map = new Map();
    }
    /**
     * @param {?} record
     * @return {?}
     */
    put(record) {
        // todo(vicb) handle corner cases
        var /** @type {?} */ key = lang_1.getMapKey(record.trackById);
        var /** @type {?} */ duplicates = this.map.get(key);
        if (!lang_1.isPresent(duplicates)) {
            duplicates = new _DuplicateItemRecordList();
            this.map.set(key, duplicates);
        }
        duplicates.add(record);
    }
    /**
     *  Retrieve the `value` using key. Because the CollectionChangeRecord value may be one which we have already iterated over, we use the afterIndex to pretend it is not there. * Use case: `[a, b, c, a, a]` if we are at index `3` which is the second `a` then asking if we have any more `a`s needs to return the last `a` not the first or second.
     * @param {?} trackById
     * @param {?=} afterIndex
     * @return {?}
     */
    get(trackById, afterIndex = null) {
        var /** @type {?} */ key = lang_1.getMapKey(trackById);
        var /** @type {?} */ recordList = this.map.get(key);
        return lang_1.isBlank(recordList) ? null : recordList.get(trackById, afterIndex);
    }
    /**
     *  Removes a {@link CollectionChangeRecord} from the list of duplicates. * The list of duplicates also is removed from the map if it gets empty.
     * @param {?} record
     * @return {?}
     */
    remove(record) {
        var /** @type {?} */ key = lang_1.getMapKey(record.trackById);
        // todo(vicb)
        // assert(this.map.containsKey(key));
        var /** @type {?} */ recordList = this.map.get(key);
        // Remove the list of duplicates when it gets empty
        if (recordList.remove(record)) {
            this.map.delete(key);
        }
        return record;
    }
    get isEmpty() { return this.map.size === 0; }
    /**
     * @return {?}
     */
    clear() { this.map.clear(); }
    /**
     * @return {?}
     */
    toString() { return '_DuplicateMap(' + lang_1.stringify(this.map) + ')'; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _DuplicateMap.prototype.map;
    }
}
//# sourceMappingURL=default_iterable_differ.js.map