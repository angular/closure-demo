goog.module('rxjs$operator$zipAll');
var zip_1 = goog.require('rxjs$operator$zip');
/**
 * @method zipAll
 * @owner Observable
 * @param {?=} project
 * @return {?}
 */
function zipAll(project) {
    return this.lift(new zip_1.ZipOperator(project));
}
exports.zipAll = zipAll;
