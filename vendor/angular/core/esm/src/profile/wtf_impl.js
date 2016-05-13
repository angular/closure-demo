goog.module('_angular$core$src$profile$wtf__impl');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var /** @type {?} */ trace;
var /** @type {?} */ events;
/**
 * @return {?}
 */
function detectWTF() {
    var /** @type {?} */ wtf = lang_1.global['wtf'];
    if (wtf) {
        trace = wtf['trace'];
        if (trace) {
            events = trace['events'];
            return true;
        }
    }
    return false;
}
exports.detectWTF = detectWTF;
/**
 * @param {?} signature
 * @param {?=} flags
 * @return {?}
 */
function createScope(signature, flags = null) {
    return events.createScope(signature, flags);
}
exports.createScope = createScope;
/**
 * @param {?} scope
 * @param {?=} returnValue
 * @return {?}
 */
function leave(scope, returnValue) {
    trace.leaveScope(scope, returnValue);
    return returnValue;
}
exports.leave = leave;
/**
 * @param {?} rangeType
 * @param {?} action
 * @return {?}
 */
function startTimeRange(rangeType, action) {
    return trace.beginTimeRange(rangeType, action);
}
exports.startTimeRange = startTimeRange;
/**
 * @param {?} range
 * @return {?}
 */
function endTimeRange(range) {
    trace.endTimeRange(range);
}
exports.endTimeRange = endTimeRange;
//# sourceMappingURL=wtf_impl.js.map