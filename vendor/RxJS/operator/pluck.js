goog.module('rxjs$operator$pluck');
var map_1 = goog.require('rxjs$operator$map');
/**
 *  Maps each source value (an object) to its specified nested property. * <span class="informal">Like {@link map}, but meant only for picking one of the nested properties of every emitted object.</span> * <img src="./img/pluck.png" width="100%"> * Given a list of strings describing a path to an object property, retrieves the value of a specified nested property from all values in the source Observable. If a property can't be resolved, it will return `undefined` for that value. *
 * @example <caption>Map every every click to the tagName of the clicked target element</caption> var clicks = Rx.Observable.fromEvent(document, 'click'); var tagNames = clicks.pluck('target', 'tagName'); tagNames.subscribe(x => console.log(x)); *
 * @see {@link map} * value (an object). source values.
 * @method pluck
 * @owner Observable
 * @param {...?} properties
 * @return {?}
 */
function pluck(...properties) {
    const /** @type {?} */ length = properties.length;
    if (length === 0) {
        throw new Error('List of properties cannot be empty.');
    }
    return map_1.map.call(this, plucker(properties, length));
}
exports.pluck = pluck;
/**
 * @param {?} props
 * @param {?} length
 * @return {?}
 */
function plucker(props, length) {
    const /** @type {?} */ mapper = (x) => {
        let /** @type {?} */ currentProp = x;
        for (let /** @type {?} */ i = 0; i < length; i++) {
            const /** @type {?} */ p = currentProp[props[i]];
            if (typeof p !== 'undefined') {
                currentProp = p;
            }
            else {
                return undefined;
            }
        }
        return currentProp;
    };
    return mapper;
}
