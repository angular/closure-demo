goog.module('rxjs$util$isArray');
exports.isArray = Array.isArray || ((x) => x && typeof x.length === 'number');
