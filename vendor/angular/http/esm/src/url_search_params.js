goog.module('_angular$http$src$url__search__params');
var lang_1 = goog.require('_angular$http$src$facade$lang');
var collection_1 = goog.require('_angular$http$src$facade$collection');
/**
 * @param {?=} rawParams
 * @return {?}
 */
function paramParser(rawParams = '') {
    var /** @type {?} */ map = new collection_1.Map();
    if (rawParams.length > 0) {
        var /** @type {?} */ params = rawParams.split('&');
        params.forEach((param) => {
            var /** @type {?} */ split = param.split('=');
            var /** @type {?} */ key = split[0];
            var /** @type {?} */ val = split[1];
            var /** @type {?} */ list = lang_1.isPresent(map.get(key)) ? map.get(key) : [];
            list.push(val);
            map.set(key, list);
        });
    }
    return map;
}
/**
 * Map-like representation of url search parameters, based on
 * [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) in the url living standard,
 * with several extensions for merging URLSearchParams objects:
 *   - setAll()
 *   - appendAll()
 *   - replaceAll()
 */
class URLSearchParams {
    /**
     * @param {?=} rawParams
     */
    constructor(rawParams = '') {
        this.rawParams = rawParams;
        this.paramsMap = paramParser(rawParams);
    }
    /**
     * @return {?}
     */
    clone() {
        var /** @type {?} */ clone = new URLSearchParams();
        clone.appendAll(this);
        return clone;
    }
    /**
     * @param {?} param
     * @return {?}
     */
    has(param) { return this.paramsMap.has(param); }
    /**
     * @param {?} param
     * @return {?}
     */
    get(param) {
        var /** @type {?} */ storedParam = this.paramsMap.get(param);
        if (collection_1.isListLikeIterable(storedParam)) {
            return collection_1.ListWrapper.first(storedParam);
        }
        else {
            return null;
        }
    }
    /**
     * @param {?} param
     * @return {?}
     */
    getAll(param) {
        var /** @type {?} */ mapParam = this.paramsMap.get(param);
        return lang_1.isPresent(mapParam) ? mapParam : [];
    }
    /**
     * @param {?} param
     * @param {?} val
     * @return {?}
     */
    set(param, val) {
        var /** @type {?} */ mapParam = this.paramsMap.get(param);
        var /** @type {?} */ list = lang_1.isPresent(mapParam) ? mapParam : [];
        collection_1.ListWrapper.clear(list);
        list.push(val);
        this.paramsMap.set(param, list);
    }
    /**
     * @param {?} searchParams
     * @return {?}
     */
    setAll(searchParams) {
        searchParams.paramsMap.forEach((value, param) => {
            var /** @type {?} */ mapParam = this.paramsMap.get(param);
            var /** @type {?} */ list = lang_1.isPresent(mapParam) ? mapParam : [];
            collection_1.ListWrapper.clear(list);
            list.push(value[0]);
            this.paramsMap.set(param, list);
        });
    }
    /**
     * @param {?} param
     * @param {?} val
     * @return {?}
     */
    append(param, val) {
        var /** @type {?} */ mapParam = this.paramsMap.get(param);
        var /** @type {?} */ list = lang_1.isPresent(mapParam) ? mapParam : [];
        list.push(val);
        this.paramsMap.set(param, list);
    }
    /**
     * @param {?} searchParams
     * @return {?}
     */
    appendAll(searchParams) {
        searchParams.paramsMap.forEach((value, param) => {
            var /** @type {?} */ mapParam = this.paramsMap.get(param);
            var /** @type {?} */ list = lang_1.isPresent(mapParam) ? mapParam : [];
            for (var /** @type {?} */ i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            this.paramsMap.set(param, list);
        });
    }
    /**
     * @param {?} searchParams
     * @return {?}
     */
    replaceAll(searchParams) {
        searchParams.paramsMap.forEach((value, param) => {
            var /** @type {?} */ mapParam = this.paramsMap.get(param);
            var /** @type {?} */ list = lang_1.isPresent(mapParam) ? mapParam : [];
            collection_1.ListWrapper.clear(list);
            for (var /** @type {?} */ i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            this.paramsMap.set(param, list);
        });
    }
    /**
     * @return {?}
     */
    toString() {
        var /** @type {?} */ paramsList = [];
        this.paramsMap.forEach((values, k) => { values.forEach(v => paramsList.push(k + '=' + v)); });
        return paramsList.join('&');
    }
    /**
     * @param {?} param
     * @return {?}
     */
    delete(param) { this.paramsMap.delete(param); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        URLSearchParams.prototype.paramsMap;
        /** @type {?} */
        URLSearchParams.prototype.rawParams;
    }
}
exports.URLSearchParams = URLSearchParams;
//# sourceMappingURL=url_search_params.js.map