import { root } from '../util/root';
/**
 * @param {?} context
 * @return {?}
 */
export function getSymbolObservable(context) {
    let /** @type {?} */ $$observable;
    let /** @type {?} */ Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
export const /** @type {?} */ $$observable = getSymbolObservable(root);
