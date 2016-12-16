import { root } from '../util/root';
/**
 * @owner Observable
 * @this {?}
 * @param {?=} PromiseCtor
 * @return {?}
 */
export function toPromise(PromiseCtor) {
    if (!PromiseCtor) {
        if (root.Rx && root.Rx.config && root.Rx.config.Promise) {
            PromiseCtor = root.Rx.config.Promise;
        }
        else if (root.Promise) {
            PromiseCtor = root.Promise;
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
