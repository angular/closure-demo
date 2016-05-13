goog.module('rxjs$add$operator$mergeMapTo');
var Observable_1 = goog.require('rxjs$Observable');
var mergeMapTo_1 = goog.require('rxjs$operator$mergeMapTo');
Observable_1.Observable.prototype.flatMapTo = (mergeMapTo_1.mergeMapTo);
Observable_1.Observable.prototype.mergeMapTo = (mergeMapTo_1.mergeMapTo);
