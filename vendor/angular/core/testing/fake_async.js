/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var /** @type {?} */ FakeAsyncTestZoneSpec = ((Zone))['FakeAsyncTestZoneSpec'];
var /** @type {?} */ ProxyZoneSpec = ((Zone))['ProxyZoneSpec'];
var /** @type {?} */ _fakeAsyncTestZoneSpec = null;
/**
 *  Clears out the shared fake async zone for a test. To be called in a global `beforeEach`. *
 * @return {?}
 */
export function resetFakeAsyncZone() {
    _fakeAsyncTestZoneSpec = null;
    ProxyZoneSpec.assertPresent().resetDelegate();
}
var /** @type {?} */ _inFakeAsyncCall = false;
/**
 *  Wraps a function to be executed in the fakeAsync zone: - microtasks are manually executed by calling `flushMicrotasks()`, - timers are synchronous, `tick()` simulates the asynchronous passage of time. * If there are any pending timers at the end of the function, an exception will be thrown. * Can be used to wrap inject() calls. * ## Example * {@example testing/ts/fake_async.ts region='basic'} *
 * @param {?} fn undefined *
 * @return {?}
 */
export function fakeAsync(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var /** @type {?} */ proxyZoneSpec = ProxyZoneSpec.assertPresent();
        if (_inFakeAsyncCall) {
            throw new Error('fakeAsync() calls can not be nested');
        }
        _inFakeAsyncCall = true;
        try {
            if (!_fakeAsyncTestZoneSpec) {
                if (proxyZoneSpec.getDelegate() instanceof FakeAsyncTestZoneSpec) {
                    throw new Error('fakeAsync() calls can not be nested');
                }
                _fakeAsyncTestZoneSpec = new FakeAsyncTestZoneSpec();
            }
            var /** @type {?} */ res = void 0;
            var /** @type {?} */ lastProxyZoneSpec = proxyZoneSpec.getDelegate();
            proxyZoneSpec.setDelegate(_fakeAsyncTestZoneSpec);
            try {
                res = fn.apply(void 0, args);
                flushMicrotasks();
            }
            finally {
                proxyZoneSpec.setDelegate(lastProxyZoneSpec);
            }
            if (_fakeAsyncTestZoneSpec.pendingPeriodicTimers.length > 0) {
                throw new Error((_fakeAsyncTestZoneSpec.pendingPeriodicTimers.length + " ") +
                    "periodic timer(s) still in the queue.");
            }
            if (_fakeAsyncTestZoneSpec.pendingTimers.length > 0) {
                throw new Error(_fakeAsyncTestZoneSpec.pendingTimers.length + " timer(s) still in the queue.");
            }
            return res;
        }
        finally {
            _inFakeAsyncCall = false;
            resetFakeAsyncZone();
        }
    };
}
/**
 * @return {?}
 */
function _getFakeAsyncZoneSpec() {
    if (_fakeAsyncTestZoneSpec == null) {
        throw new Error('The code should be running in the fakeAsync zone to call this function');
    }
    return _fakeAsyncTestZoneSpec;
}
/**
 *  Simulates the asynchronous passage of time for the timers in the fakeAsync zone. * The microtasks queue is drained at the very start of this function and after any timer callback has been executed. * ## Example * {@example testing/ts/fake_async.ts region='basic'} *
 * @param {?=} millis
 * @return {?}
 */
export function tick(millis) {
    if (millis === void 0) { millis = 0; }
    _getFakeAsyncZoneSpec().tick(millis);
}
/**
 *  Discard all remaining periodic tasks. *
 * @return {?}
 */
export function discardPeriodicTasks() {
    var /** @type {?} */ zoneSpec = _getFakeAsyncZoneSpec();
    var /** @type {?} */ pendingTimers = zoneSpec.pendingPeriodicTimers;
    zoneSpec.pendingPeriodicTimers.length = 0;
}
/**
 *  Flush any pending microtasks. *
 * @return {?}
 */
export function flushMicrotasks() {
    _getFakeAsyncZoneSpec().flushMicrotasks();
}
//# sourceMappingURL=fake_async.js.map