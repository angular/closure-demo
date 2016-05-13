goog.module('rxjs$operator$toPromise');
var root_1 = goog.require('rxjs$util$root');
/**
 * @method toPromise
 * @owner Observable
 * @param {?=} PromiseCtor
 * @return {?}
 */
function toPromise(PromiseCtor) {
    if (!PromiseCtor) {
        if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
            PromiseCtor = root_1.root.Rx.config.Promise;
        }
        else if (root_1.root.Promise) {
            PromiseCtor = root_1.root.Promise;
        }
    }
    if (!PromiseCtor) {
        throw new Error('no Promise impl found');
    }
    return new PromiseCtor((resolve, reject) => {
        let /** @type {?} */ value;
        this.subscribe((x) => value = x, (err) => reject(err), () => resolve(value));
    });
}
exports.toPromise = toPromise;
