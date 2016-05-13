goog.module('_angular$core$src$linker$query__list');
var collection_1 = goog.require('_angular$core$src$facade$collection');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var async_1 = goog.require('_angular$core$src$facade$async');
/**
 * An unmodifiable list of items that Angular keeps up to date when the state
 * of the application changes.
 *
 * The type of object that {@link QueryMetadata} and {@link ViewQueryMetadata} provide.
 *
 * Implements an iterable interface, therefore it can be used in both ES6
 * javascript `for (var i of items)` loops as well as in Angular templates with
 * `*ngFor="let i of myList"`.
 *
 * Changes can be observed by subscribing to the changes `Observable`.
 *
 * NOTE: In the future this class will implement an `Observable` interface.
 *
 * ### Example ([live demo](http://plnkr.co/edit/RX8sJnQYl9FWuSCWme5z?p=preview))
 * ```typescript
 * @Component({...})
 * class Container {
 *   constructor(@Query(Item) items: QueryList<Item>) {
 *     items.changes.subscribe(_ => console.log(items.length));
 *   }
 * }
 * ```
 */
class QueryList {
    constructor() {
        this._dirty = true;
        this._results = [];
        this._emitter = new async_1.EventEmitter();
    }
    get changes() { return this._emitter; }
    get length() { return this._results.length; }
    get first() { return collection_1.ListWrapper.first(this._results); }
    get last() { return collection_1.ListWrapper.last(this._results); }
    /**
     *  returns a new array with the passed in function applied to each element.
     * @param {?} fn
     * @return {?}
     */
    map(fn) { return this._results.map(fn); }
    /**
     *  returns a filtered array.
     * @param {?} fn
     * @return {?}
     */
    filter(fn) { return this._results.filter(fn); }
    /**
     *  returns a reduced value.
     * @param {?} fn
     * @param {?} init
     * @return {?}
     */
    reduce(fn, init) { return this._results.reduce(fn, init); }
    /**
     *  executes function for each element in a query.
     * @param {?} fn
     * @return {?}
     */
    forEach(fn) { this._results.forEach(fn); }
    /**
     *  converts QueryList into an array
     * @return {?}
     */
    toArray() { return collection_1.ListWrapper.clone(this._results); }
    /**
     * @return {?}
     */
    [lang_1.getSymbolIterator()]() { return this._results[lang_1.getSymbolIterator()](); }
    /**
     * @return {?}
     */
    toString() { return this._results.toString(); }
    /**
     * @internal
     * @param {?} res
     * @return {?}
     */
    reset(res) {
        this._results = collection_1.ListWrapper.flatten(res);
        this._dirty = false;
    }
    /**
     * @internal
     * @return {?}
     */
    notifyOnChanges() { this._emitter.emit(this); }
    /**
     *  internal
     * @return {?}
     */
    setDirty() { this._dirty = true; }
    /** internal */
    get dirty() { return this._dirty; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        QueryList.prototype._dirty;
        /** @type {?} */
        QueryList.prototype._results;
        /** @type {?} */
        QueryList.prototype._emitter;
    }
}
exports.QueryList = QueryList;
//# sourceMappingURL=query_list.js.map