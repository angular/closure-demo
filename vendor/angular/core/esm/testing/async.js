goog.module('_angular$core$testing$async');
/**
 *  Wraps a test function in an asynchronous test zone. The test will automatically complete when all asynchronous calls within this zone are done. Can be used to wrap an {@link inject} call. * Example: * ``` it('...', async(inject([AClass], (object) => { object.doSomething.then(() => { expect(...); }) }); ```
 * @param {?} fn
 * @return {?}
 */
function async(fn) {
    return () => {
        return new Promise((finishCallback, failCallback) => {
            var /** @type {?} */ AsyncTestZoneSpec = Zone['AsyncTestZoneSpec'];
            var /** @type {?} */ testZoneSpec = new AsyncTestZoneSpec(finishCallback, failCallback, 'test');
            var /** @type {?} */ testZone = Zone.current.fork(testZoneSpec);
            return testZone.run(fn);
        });
    };
}
exports.async = async;
//# sourceMappingURL=async.js.map