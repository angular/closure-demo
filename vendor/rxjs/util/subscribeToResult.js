import { root } from './root';
import { isArray } from './isArray';
import { isPromise } from './isPromise';
import { isObject } from './isObject';
import { Observable } from '../Observable';
import { $$iterator } from '../symbol/iterator';
import { InnerSubscriber } from '../InnerSubscriber';
import { $$observable } from '../symbol/observable';
/**
 * @param {?} outerSubscriber
 * @param {?} result
 * @param {?=} outerValue
 * @param {?=} outerIndex
 * @return {?}
 */
export function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    let /** @type {?} */ destination = new InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
        return null;
    }
    if (result instanceof Observable) {
        if (result._isScalar) {
            destination.next(((result)).value);
            destination.complete();
            return null;
        }
        else {
            return result.subscribe(destination);
        }
    }
    else if (isArray(result)) {
        for (let /** @type {?} */ i = 0, /** @type {?} */ len = result.length; i < len && !destination.closed; i++) {
            destination.next(result[i]);
        }
        if (!destination.closed) {
            destination.complete();
        }
    }
    else if (isPromise(result)) {
        result.then((value) => {
            if (!destination.closed) {
                destination.next(/** @type {?} */ (value));
                destination.complete();
            }
        }, (err) => destination.error(err))
            .then(null, (err) => {
            // Escaping the Promise trap: globally throw unhandled errors
            root.setTimeout(() => { throw err; });
        });
        return destination;
    }
    else if (result && typeof result[$$iterator] === 'function') {
        const /** @type {?} */ iterator = (result[$$iterator]());
        do {
            let /** @type {?} */ item = iterator.next();
            if (item.done) {
                destination.complete();
                break;
            }
            destination.next(item.value);
            if (destination.closed) {
                break;
            }
        } while (true);
    }
    else if (result && typeof result[$$observable] === 'function') {
        const /** @type {?} */ obs = result[$$observable]();
        if (typeof obs.subscribe !== 'function') {
            destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));
        }
        else {
            return obs.subscribe(new InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
    }
    else {
        const /** @type {?} */ value = isObject(result) ? 'an invalid object' : `'${result}'`;
        const /** @type {?} */ msg = `You provided ${value} where a stream was expected.`
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        destination.error(new TypeError(msg));
    }
    return null;
}
