goog.module('rxjs$util$subscribeToResult');
var root_1 = goog.require('rxjs$util$root');
var isArray_1 = goog.require('rxjs$util$isArray');
var isPromise_1 = goog.require('rxjs$util$isPromise');
var Observable_1 = goog.require('rxjs$Observable');
var iterator_1 = goog.require('rxjs$symbol$iterator');
var observable_1 = goog.require('rxjs$symbol$observable');
var InnerSubscriber_1 = goog.require('rxjs$InnerSubscriber');
/**
 * @param {?} outerSubscriber
 * @param {?} result
 * @param {?=} outerValue
 * @param {?=} outerIndex
 * @return {?}
 */
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    let /** @type {?} */ destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.isUnsubscribed) {
        return;
    }
    if (result instanceof Observable_1.Observable) {
        if (result._isScalar) {
            destination.next(((result)).value);
            destination.complete();
            return;
        }
        else {
            return result.subscribe(destination);
        }
    }
    if (isArray_1.isArray(result)) {
        for (let /** @type {?} */ i = 0, /** @type {?} */ len = result.length; i < len && !destination.isUnsubscribed; i++) {
            destination.next(result[i]);
        }
        if (!destination.isUnsubscribed) {
            destination.complete();
        }
    }
    else if (isPromise_1.isPromise(result)) {
        result.then((value) => {
            if (!destination.isUnsubscribed) {
                destination.next(/** @type {?} */ (value));
                destination.complete();
            }
        }, (err) => destination.error(err))
            .then(null, (err) => {
            // Escaping the Promise trap: globally throw unhandled errors
            root_1.root.setTimeout(() => { throw err; });
        });
        return destination;
    }
    else if (typeof result[iterator_1.$$iterator] === 'function') {
        for (let item of (result)) {
            destination.next(/** @type {?} */ (item));
            if (destination.isUnsubscribed) {
                break;
            }
        }
        if (!destination.isUnsubscribed) {
            destination.complete();
        }
    }
    else if (typeof result[observable_1.$$observable] === 'function') {
        const /** @type {?} */ obs = result[observable_1.$$observable]();
        if (typeof obs.subscribe !== 'function') {
            destination.error('invalid observable');
        }
        else {
            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
    }
    else {
        destination.error(new TypeError('unknown type returned'));
    }
}
exports.subscribeToResult = subscribeToResult;
