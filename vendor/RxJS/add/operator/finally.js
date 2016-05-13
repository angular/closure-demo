goog.module('rxjs$add$operator$finally');
var Observable_1 = goog.require('rxjs$Observable');
var finally_1 = goog.require('rxjs$operator$finally');
Observable_1.Observable.prototype.finally = finally_1._finally;
