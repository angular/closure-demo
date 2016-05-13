goog.module('rxjs$symbol$rxSubscriber');
var root_1 = goog.require('rxjs$util$root');
const /** @type {?} */ Symbol = root_1.root.Symbol;
exports.$$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';
