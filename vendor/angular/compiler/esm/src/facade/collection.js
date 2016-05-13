goog.module('_angular$compiler$src$facade$collection');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
exports.Map = lang_1.global.Map;
exports.Set = lang_1.global.Set;
// Safari and Internet Explorer do not support the iterable parameter to the
// Map constructor.  We work around that by manually adding the items.
var /** @type {?} */ createMapFromPairs = (function () {
    try {
        if (new exports.Map(/** @type {?} */ ([[1, 2]])).size === 1) {
            return function createMapFromPairs(pairs) { return new exports.Map(pairs); };
        }
    }
    catch (e) {
    }
    return function createMapAndPopulateFromPairs(pairs) {
        var /** @type {?} */ map = new exports.Map();
        for (var /** @type {?} */ i = 0; i < pairs.length; i++) {
            var /** @type {?} */ pair = pairs[i];
            map.set(pair[0], pair[1]);
        }
        return map;
    };
})();
var /** @type {?} */ createMapFromMap = (function () {
    try {
        if (new exports.Map(/** @type {?} */ ((new exports.Map())))) {
            return function createMapFromMap(m) { return new exports.Map(/** @type {?} */ (m)); };
        }
    }
    catch (e) {
    }
    return function createMapAndPopulateFromMap(m) {
        var /** @type {?} */ map = new exports.Map();
        m.forEach((v, k) => { map.set(k, v); });
        return map;
    };
})();
var /** @type {?} */ _clearValues = (function () {
    if ((((new exports.Map()).keys())).next) {
        return function _clearValues(m) {
            var /** @type {?} */ keyIterator = m.keys();
            var /** @type {?} */ k;
            while (!((k = ((keyIterator)).next()).done)) {
                m.set(k.value, null);
            }
        };
    }
    else {
        return function _clearValuesWithForeEach(m) {
            m.forEach((v, k) => { m.set(k, null); });
        };
    }
})();
// Safari doesn't implement MapIterator.next(), which is used is Traceur's polyfill of Array.from
// TODO(mlaval): remove the work around once we have a working polyfill of Array.from
var /** @type {?} */ _arrayFromMap = (function () {
    try {
        if ((((new exports.Map()).values())).next) {
            return function createArrayFromMap(m, getValues) {
                return getValues ? ((Array)).from(m.values()) : ((Array)).from(m.keys());
            };
        }
    }
    catch (e) {
    }
    return function createArrayFromMapWithForeach(m, getValues) {
        var /** @type {?} */ res = ListWrapper.createFixedSize(m.size), /** @type {?} */ i = 0;
        m.forEach((v, k) => {
            res[i] = getValues ? v : k;
            i++;
        });
        return res;
    };
})();
class MapWrapper {
    /**
     * @param {?} m
     * @return {?}
     */
    static clone(m) { return createMapFromMap(m); }
    /**
     * @param {?} stringMap
     * @return {?}
     */
    static createFromStringMap(stringMap) {
        var /** @type {?} */ result = new exports.Map();
        for (var prop in stringMap) {
            result.set(prop, stringMap[prop]);
        }
        return result;
    }
    /**
     * @param {?} m
     * @return {?}
     */
    static toStringMap(m) {
        var /** @type {?} */ r = {};
        m.forEach((v, k) => r[k] = v);
        return r;
    }
    /**
     * @param {?} pairs
     * @return {?}
     */
    static createFromPairs(pairs) { return createMapFromPairs(pairs); }
    /**
     * @param {?} m
     * @return {?}
     */
    static clearValues(m) { _clearValues(m); }
    /**
     * @param {?} m
     * @return {?}
     */
    static iterable(m) { return m; }
    /**
     * @param {?} m
     * @return {?}
     */
    static keys(m) { return _arrayFromMap(m, false); }
    /**
     * @param {?} m
     * @return {?}
     */
    static values(m) { return _arrayFromMap(m, true); }
}
exports.MapWrapper = MapWrapper;
/**
 * Wraps Javascript Objects
 */
class StringMapWrapper {
    /**
     * @return {?}
     */
    static create() {
        // Note: We are not using Object.create(null) here due to
        // performance!
        // http://jsperf.com/ng2-object-create-null
        return {};
    }
    /**
     * @param {?} map
     * @param {?} key
     * @return {?}
     */
    static contains(map, key) {
        return map.hasOwnProperty(key);
    }
    /**
     * @param {?} map
     * @param {?} key
     * @return {?}
     */
    static get(map, key) {
        return map.hasOwnProperty(key) ? map[key] : undefined;
    }
    /**
     * @param {?} map
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    static set(map, key, value) { map[key] = value; }
    /**
     * @param {?} map
     * @return {?}
     */
    static keys(map) { return Object.keys(map); }
    /**
     * @param {?} map
     * @return {?}
     */
    static values(map) {
        return Object.keys(map).reduce((r, a) => {
            r.push(map[a]);
            return r;
        }, []);
    }
    /**
     * @param {?} map
     * @return {?}
     */
    static isEmpty(map) {
        for (var prop in map) {
            return false;
        }
        return true;
    }
    /**
     * @param {?} map
     * @param {?} key
     * @return {?}
     */
    static delete(map, key) { delete map[key]; }
    /**
     * @param {?} map
     * @param {?} callback
     * @return {?}
     */
    static forEach(map, callback) {
        for (var prop in map) {
            if (map.hasOwnProperty(prop)) {
                callback(map[prop], prop);
            }
        }
    }
    /**
     * @param {?} m1
     * @param {?} m2
     * @return {?}
     */
    static merge(m1, m2) {
        var /** @type {?} */ m = {};
        for (var attr in m1) {
            if (m1.hasOwnProperty(attr)) {
                m[attr] = m1[attr];
            }
        }
        for (var attr in m2) {
            if (m2.hasOwnProperty(attr)) {
                m[attr] = m2[attr];
            }
        }
        return m;
    }
    /**
     * @param {?} m1
     * @param {?} m2
     * @return {?}
     */
    static equals(m1, m2) {
        var /** @type {?} */ k1 = Object.keys(m1);
        var /** @type {?} */ k2 = Object.keys(m2);
        if (k1.length != k2.length) {
            return false;
        }
        var /** @type {?} */ key;
        for (var /** @type {?} */ i = 0; i < k1.length; i++) {
            key = k1[i];
            if (m1[key] !== m2[key]) {
                return false;
            }
        }
        return true;
    }
}
exports.StringMapWrapper = StringMapWrapper;
class ListWrapper {
    /**
     * @param {?} size
     * @return {?}
     */
    static createFixedSize(size) { return new Array(size); }
    /**
     * @param {?} size
     * @return {?}
     */
    static createGrowableSize(size) { return new Array(size); }
    /**
     * @param {?} array
     * @return {?}
     */
    static clone(array) { return array.slice(0); }
    /**
     * @param {?} array
     * @param {?} fn
     * @return {?}
     */
    static forEachWithIndex(array, fn) {
        for (var /** @type {?} */ i = 0; i < array.length; i++) {
            fn(array[i], i);
        }
    }
    /**
     * @param {?} array
     * @return {?}
     */
    static first(array) {
        if (!array)
            return null;
        return array[0];
    }
    /**
     * @param {?} array
     * @return {?}
     */
    static last(array) {
        if (!array || array.length == 0)
            return null;
        return array[array.length - 1];
    }
    /**
     * @param {?} array
     * @param {?} value
     * @param {?=} startIndex
     * @return {?}
     */
    static indexOf(array, value, startIndex = 0) {
        return array.indexOf(value, startIndex);
    }
    /**
     * @param {?} list
     * @param {?} el
     * @return {?}
     */
    static contains(list, el) { return list.indexOf(el) !== -1; }
    /**
     * @param {?} array
     * @return {?}
     */
    static reversed(array) {
        var /** @type {?} */ a = ListWrapper.clone(array);
        return a.reverse();
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static concat(a, b) { return a.concat(b); }
    /**
     * @param {?} list
     * @param {?} index
     * @param {?} value
     * @return {?}
     */
    static insert(list, index, value) { list.splice(index, 0, value); }
    /**
     * @param {?} list
     * @param {?} index
     * @return {?}
     */
    static removeAt(list, index) {
        var /** @type {?} */ res = list[index];
        list.splice(index, 1);
        return res;
    }
    /**
     * @param {?} list
     * @param {?} items
     * @return {?}
     */
    static removeAll(list, items) {
        for (var /** @type {?} */ i = 0; i < items.length; ++i) {
            var /** @type {?} */ index = list.indexOf(items[i]);
            list.splice(index, 1);
        }
    }
    /**
     * @param {?} list
     * @param {?} el
     * @return {?}
     */
    static remove(list, el) {
        var /** @type {?} */ index = list.indexOf(el);
        if (index > -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    }
    /**
     * @param {?} list
     * @return {?}
     */
    static clear(list) { list.length = 0; }
    /**
     * @param {?} list
     * @return {?}
     */
    static isEmpty(list) { return list.length == 0; }
    /**
     * @param {?} list
     * @param {?} value
     * @param {?=} start
     * @param {?=} end
     * @return {?}
     */
    static fill(list, value, start = 0, end = null) {
        list.fill(value, start, end === null ? list.length : end);
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static equals(a, b) {
        if (a.length != b.length)
            return false;
        for (var /** @type {?} */ i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    }
    /**
     * @param {?} l
     * @param {?=} from
     * @param {?=} to
     * @return {?}
     */
    static slice(l, from = 0, to = null) {
        return l.slice(from, to === null ? undefined : to);
    }
    /**
     * @param {?} l
     * @param {?} from
     * @param {?} length
     * @return {?}
     */
    static splice(l, from, length) { return l.splice(from, length); }
    /**
     * @param {?} l
     * @param {?=} compareFn
     * @return {?}
     */
    static sort(l, compareFn) {
        if (lang_1.isPresent(compareFn)) {
            l.sort(compareFn);
        }
        else {
            l.sort();
        }
    }
    /**
     * @param {?} l
     * @return {?}
     */
    static toString(l) { return l.toString(); }
    /**
     * @param {?} l
     * @return {?}
     */
    static toJSON(l) { return JSON.stringify(l); }
    /**
     * @param {?} list
     * @param {?} predicate
     * @return {?}
     */
    static maximum(list, predicate) {
        if (list.length == 0) {
            return null;
        }
        var /** @type {?} */ solution = null;
        var /** @type {?} */ maxValue = -Infinity;
        for (var /** @type {?} */ index = 0; index < list.length; index++) {
            var /** @type {?} */ candidate = list[index];
            if (lang_1.isBlank(candidate)) {
                continue;
            }
            var /** @type {?} */ candidateValue = predicate(candidate);
            if (candidateValue > maxValue) {
                solution = candidate;
                maxValue = candidateValue;
            }
        }
        return solution;
    }
    /**
     * @param {?} list
     * @return {?}
     */
    static flatten(list) {
        var /** @type {?} */ target = [];
        _flattenArray(list, target);
        return target;
    }
    /**
     * @param {?} list
     * @param {?} source
     * @return {?}
     */
    static addAll(list, source) {
        for (var /** @type {?} */ i = 0; i < source.length; i++) {
            list.push(source[i]);
        }
    }
}
exports.ListWrapper = ListWrapper;
/**
 * @param {?} source
 * @param {?} target
 * @return {?}
 */
function _flattenArray(source, target) {
    if (lang_1.isPresent(source)) {
        for (var /** @type {?} */ i = 0; i < source.length; i++) {
            var /** @type {?} */ item = source[i];
            if (lang_1.isArray(item)) {
                _flattenArray(item, target);
            }
            else {
                target.push(item);
            }
        }
    }
    return target;
}
/**
 * @param {?} obj
 * @return {?}
 */
function isListLikeIterable(obj) {
    if (!lang_1.isJsObject(obj))
        return false;
    return lang_1.isArray(obj) ||
        (!(obj instanceof exports.Map) &&
            lang_1.getSymbolIterator() in obj); // JS Iterable have a Symbol.iterator prop
}
exports.isListLikeIterable = isListLikeIterable;
/**
 * @param {?} a
 * @param {?} b
 * @param {?} comparator
 * @return {?}
 */
function areIterablesEqual(a, b, comparator) {
    var /** @type {?} */ iterator1 = a[lang_1.getSymbolIterator()]();
    var /** @type {?} */ iterator2 = b[lang_1.getSymbolIterator()]();
    while (true) {
        let /** @type {?} */ item1 = iterator1.next();
        let /** @type {?} */ item2 = iterator2.next();
        if (item1.done && item2.done)
            return true;
        if (item1.done || item2.done)
            return false;
        if (!comparator(item1.value, item2.value))
            return false;
    }
}
exports.areIterablesEqual = areIterablesEqual;
/**
 * @param {?} obj
 * @param {?} fn
 * @return {?}
 */
function iterateListLike(obj, fn) {
    if (lang_1.isArray(obj)) {
        for (var /** @type {?} */ i = 0; i < obj.length; i++) {
            fn(obj[i]);
        }
    }
    else {
        var /** @type {?} */ iterator = obj[lang_1.getSymbolIterator()]();
        var /** @type {?} */ item;
        while (!((item = iterator.next()).done)) {
            fn(item.value);
        }
    }
}
exports.iterateListLike = iterateListLike;
// Safari and Internet Explorer do not support the iterable parameter to the
// Set constructor.  We work around that by manually adding the items.
var /** @type {?} */ createSetFromList = (function () {
    var /** @type {?} */ test = new exports.Set([1, 2, 3]);
    if (test.size === 3) {
        return function createSetFromList(lst) { return new exports.Set(lst); };
    }
    else {
        return function createSetAndPopulateFromList(lst) {
            var /** @type {?} */ res = new exports.Set(lst);
            if (res.size !== lst.length) {
                for (var /** @type {?} */ i = 0; i < lst.length; i++) {
                    res.add(lst[i]);
                }
            }
            return res;
        };
    }
})();
class SetWrapper {
    /**
     * @param {?} lst
     * @return {?}
     */
    static createFromList(lst) { return createSetFromList(lst); }
    /**
     * @param {?} s
     * @param {?} key
     * @return {?}
     */
    static has(s, key) { return s.has(key); }
    /**
     * @param {?} m
     * @param {?} k
     * @return {?}
     */
    static delete(m, k) { m.delete(k); }
}
exports.SetWrapper = SetWrapper;
//# sourceMappingURL=collection.js.map