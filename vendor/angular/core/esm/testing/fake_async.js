goog.module('_angular$core$testing$fake__async');
var index_1 = goog.require('_angular$core');
let /** @type {?} */ _FakeAsyncTestZoneSpecType = Zone['FakeAsyncTestZoneSpec'];
/**
 *  Wraps a function to be executed in the fakeAsync zone: - microtasks are manually executed by calling `flushMicrotasks()`, - timers are synchronous, `tick()` simulates the asynchronous passage of time. * If there are any pending timers at the end of the function, an exception will be thrown. * Can be used to wrap inject() calls. * ## Example * {@example testing/ts/fake_async.ts region='basic'} *
 * @returns {Function} The function wrapped to be executed in the fakeAsync zone
 * @param {?} fn
 * @return {?}
 */
function fakeAsync(fn) {
    if (Zone.current.get('FakeAsyncTestZoneSpec') != null) {
        throw new index_1.BaseException('fakeAsync() calls can not be nested');
    }
    let /** @type {?} */ fakeAsyncTestZoneSpec = new _FakeAsyncTestZoneSpecType();
    let /** @type {?} */ fakeAsyncZone = Zone.current.fork(fakeAsyncTestZoneSpec);
    return function (...args) {
        let /** @type {?} */ res = fakeAsyncZone.run(() => {
            let /** @type {?} */ res = fn(...args);
            flushMicrotasks();
            return res;
        });
        if (fakeAsyncTestZoneSpec.pendingPeriodicTimers.length > 0) {
            throw new index_1.BaseException(`${fakeAsyncTestZoneSpec.pendingPeriodicTimers.length} ` +
                `periodic timer(s) still in the queue.`);
        }
        if (fakeAsyncTestZoneSpec.pendingTimers.length > 0) {
            throw new index_1.BaseException(`${fakeAsyncTestZoneSpec.pendingTimers.length} timer(s) still in the queue.`);
        }
        return res;
    };
}
exports.fakeAsync = fakeAsync;
/**
 * @return {?}
 */
function _getFakeAsyncZoneSpec() {
    let /** @type {?} */ zoneSpec = Zone.current.get('FakeAsyncTestZoneSpec');
    if (zoneSpec == null) {
        throw new Error('The code should be running in the fakeAsync zone to call this function');
    }
    return zoneSpec;
}
/**
 *  Clear the queue of pending timers and microtasks. Tests no longer need to call this explicitly. *
 * @deprecated
 * @return {?}
 */
function clearPendingTimers() {
    // Do nothing.
}
exports.clearPendingTimers = clearPendingTimers;
/**
 *  Simulates the asynchronous passage of time for the timers in the fakeAsync zone. * The microtasks queue is drained at the very start of this function and after any timer callback has been executed. * ## Example * {@example testing/ts/fake_async.ts region='basic'} *
 * @param {?=} millis
 * @return {?}
 */
function tick(millis = 0) {
    _getFakeAsyncZoneSpec().tick(millis);
}
exports.tick = tick;
/**
 *  Flush any pending microtasks.
 * @return {?}
 */
function flushMicrotasks() {
    _getFakeAsyncZoneSpec().flushMicrotasks();
}
exports.flushMicrotasks = flushMicrotasks;
//# sourceMappingURL=fake_async.js.map