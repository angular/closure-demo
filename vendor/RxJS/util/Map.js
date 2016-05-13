goog.module('rxjs$util$Map');
var root_1 = goog.require('rxjs$util$root');
var MapPolyfill_1 = goog.require('rxjs$util$MapPolyfill');
exports.Map = root_1.root.Map || (() => MapPolyfill_1.MapPolyfill)();
