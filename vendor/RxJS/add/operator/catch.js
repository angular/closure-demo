goog.module('rxjs$add$operator$catch');
var Observable_1 = goog.require('rxjs$Observable');
var catch_1 = goog.require('rxjs$operator$catch');
Observable_1.Observable.prototype.catch = catch_1._catch;
