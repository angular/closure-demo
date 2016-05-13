goog.module('rxjs$add$operator$let');
var Observable_1 = goog.require('rxjs$Observable');
var let_1 = goog.require('rxjs$operator$let');
Observable_1.Observable.prototype.let = let_1.letProto;
Observable_1.Observable.prototype.letBind = let_1.letProto;
