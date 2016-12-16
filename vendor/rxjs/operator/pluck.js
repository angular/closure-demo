import { map } from './map';
/**
 * Maps each source value (an object) to its specified nested property.
 *
 * <span class="informal">Like {\@link map}, but meant only for picking one of
 * the nested properties of every emitted object.</span>
 *
 * <img src="./img/pluck.png" width="100%">
 *
 * Given a list of strings describing a path to an object property, retrieves
 * the value of a specified nested property from all values in the source
 * Observable. If a property can't be resolved, it will return `undefined` for
 * that value.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var tagNames = clicks.pluck('target', 'tagName');
 * tagNames.subscribe(x => console.log(x));
 *
 * @see {\@link map}
 *
 * value (an object).
 * source values.
 * @owner Observable
 * @this {?}
 * @param {...?} properties
 * @return {?}
 */
export function pluck(...properties) {
    const /** @type {?} */ length = properties.length;
    if (length === 0) {
        throw new Error('list of properties cannot be empty.');
    }
    return map.call(this, plucker(properties, length));
}
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
