goog.module('_angular$core$testing$logger');
var index_1 = goog.require('_angular$core');
class Log {
    /**
     */
    constructor() {
        this.logItems = [];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    add(value) { this.logItems.push(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    fn(value) {
        return (a1 = null, a2 = null, a3 = null, a4 = null, a5 = null) => {
            this.logItems.push(value);
        };
    }
    /**
     * @return {?}
     */
    clear() { this.logItems = []; }
    /**
     * @return {?}
     */
    result() { return this.logItems.join("; "); }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        Log.prototype.logItems;
    }
}
Log.decorators = [
    { type: index_1.Injectable },
];
/** @nocollapse */ Log.ctorParameters = [];
exports.Log = Log;
//# sourceMappingURL=logger.js.map