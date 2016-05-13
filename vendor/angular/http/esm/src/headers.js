goog.module('_angular$http$src$headers');
var lang_1 = goog.require('_angular$http$src$facade$lang');
var exceptions_1 = goog.require('_angular$http$src$facade$exceptions');
var collection_1 = goog.require('_angular$http$src$facade$collection');
/**
 * Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
 * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class).
 *
 * The only known difference between this `Headers` implementation and the spec is the
 * lack of an `entries` method.
 *
 * ### Example ([live demo](http://plnkr.co/edit/MTdwT6?p=preview))
 *
 * ```
 * import {Headers} from '@angular/http';
 *
 * var firstHeaders = new Headers();
 * firstHeaders.append('Content-Type', 'image/jpeg');
 * console.log(firstHeaders.get('Content-Type')) //'image/jpeg'
 *
 * // Create headers from Plain Old JavaScript Object
 * var secondHeaders = new Headers({
 *   'X-My-Custom-Header': 'Angular'
 * });
 * console.log(secondHeaders.get('X-My-Custom-Header')); //'Angular'
 *
 * var thirdHeaders = new Headers(secondHeaders);
 * console.log(thirdHeaders.get('X-My-Custom-Header')); //'Angular'
 * ```
 */
class Headers {
    /**
     * @param {?=} headers
     */
    constructor(headers) {
        if (headers instanceof Headers) {
            this._headersMap = headers._headersMap;
            return;
        }
        this._headersMap = new collection_1.Map();
        if (lang_1.isBlank(headers)) {
            return;
        }
        // headers instanceof StringMap
        collection_1.StringMapWrapper.forEach(headers, (v, k) => {
            this._headersMap.set(k, collection_1.isListLikeIterable(v) ? v : [v]);
        });
    }
    /**
     *  Returns a new Headers instance from the given DOMString of Response Headers
     * @param {?} headersString
     * @return {?}
     */
    static fromResponseHeaderString(headersString) {
        return headersString.trim()
            .split('\n')
            .map(val => val.split(':'))
            .map(([key, ...parts]) => ([key.trim(), parts.join(':').trim()]))
            .reduce((headers, [key, value]) => !headers.set(key, value) && headers, new Headers());
    }
    /**
     *  Appends a header to existing list of header values for a given header name.
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    append(name, value) {
        var /** @type {?} */ mapName = this._headersMap.get(name);
        var /** @type {?} */ list = collection_1.isListLikeIterable(mapName) ? mapName : [];
        list.push(value);
        this._headersMap.set(name, list);
    }
    /**
     *  Deletes all header values for the given name.
     * @param {?} name
     * @return {?}
     */
    delete(name) { this._headersMap.delete(name); }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEach(fn) {
        this._headersMap.forEach(fn);
    }
    /**
     *  Returns first header that matches given name.
     * @param {?} header
     * @return {?}
     */
    get(header) { return collection_1.ListWrapper.first(this._headersMap.get(header)); }
    /**
     *  Check for existence of header by given name.
     * @param {?} header
     * @return {?}
     */
    has(header) { return this._headersMap.has(header); }
    /**
     *  Provides names of set headers
     * @return {?}
     */
    keys() { return collection_1.MapWrapper.keys(this._headersMap); }
    /**
     *  Sets or overrides header value for given name.
     * @param {?} header
     * @param {?} value
     * @return {?}
     */
    set(header, value) {
        var /** @type {?} */ list = [];
        if (collection_1.isListLikeIterable(value)) {
            var /** @type {?} */ pushValue = ((value)).join(',');
            list.push(pushValue);
        }
        else {
            list.push(/** @type {?} */ (value));
        }
        this._headersMap.set(header, list);
    }
    /**
     *  Returns values of all headers.
     * @return {?}
     */
    values() { return collection_1.MapWrapper.values(this._headersMap); }
    /**
     *  Returns string of all headers.
     * @return {?}
     */
    toJSON() {
        let /** @type {?} */ serializableHeaders = {};
        this._headersMap.forEach((values, name) => {
            let /** @type {?} */ list = [];
            collection_1.iterateListLike(values, val => list = collection_1.ListWrapper.concat(list, val.split(',')));
            serializableHeaders[name] = list;
        });
        return serializableHeaders;
    }
    /**
     *  Returns list of header values for a given name.
     * @param {?} header
     * @return {?}
     */
    getAll(header) {
        var /** @type {?} */ headers = this._headersMap.get(header);
        return collection_1.isListLikeIterable(headers) ? headers : [];
    }
    /**
     *  This method is not implemented.
     * @return {?}
     */
    entries() { throw new exceptions_1.BaseException('"entries" method is not implemented on Headers class'); }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        Headers.prototype._headersMap;
    }
}
exports.Headers = Headers;
//# sourceMappingURL=headers.js.map