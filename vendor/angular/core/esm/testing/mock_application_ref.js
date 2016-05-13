goog.module('_angular$core$testing$mock__application__ref');
var index_1 = goog.require('_angular$core');
class MockApplicationRef extends index_1.ApplicationRef {
    /**
     * @param {?} listener
     * @return {?}
     */
    registerBootstrapListener(listener) { }
    /**
     * @param {?} dispose
     * @return {?}
     */
    registerDisposeListener(dispose) { }
    /**
     * @param {?} componentFactory
     * @return {?}
     */
    bootstrap(componentFactory) { return null; }
    get injector() { return null; }
    ;
    get zone() { return null; }
    ;
    /**
     * @param {?} callback
     * @return {?}
     */
    run(callback) { return null; }
    /**
     * @return {?}
     */
    waitForAsyncInitializers() { return null; }
    /**
     * @return {?}
     */
    dispose() { }
    /**
     * @return {?}
     */
    tick() { }
    get componentTypes() { return null; }
    ;
}
MockApplicationRef.decorators = [
    { type: index_1.Injectable },
];
exports.MockApplicationRef = MockApplicationRef;
//# sourceMappingURL=mock_application_ref.js.map