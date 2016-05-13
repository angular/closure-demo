goog.module('_angular$core$testing$ng__zone__mock');
var index_1 = goog.require('_angular$core');
var async_1 = goog.require('_angular$core$src$facade$async');
class MockNgZone extends index_1.NgZone {
    /**
     */
    constructor() {
        super({ enableLongStackTrace: false });
        this._mockOnStable = new async_1.EventEmitter(false);
    }
    get onStable() { return this._mockOnStable; }
    /**
     * @param {?} fn
     * @return {?}
     */
    run(fn) { return fn(); }
    /**
     * @param {?} fn
     * @return {?}
     */
    runOutsideAngular(fn) { return fn(); }
    /**
     * @return {?}
     */
    simulateZoneExit() { async_1.ObservableWrapper.callNext(this.onStable, null); }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        MockNgZone.prototype._mockOnStable;
    }
}
MockNgZone.decorators = [
    { type: index_1.Injectable },
];
MockNgZone.ctorParameters = [];
exports.MockNgZone = MockNgZone;
//# sourceMappingURL=ng_zone_mock.js.map