goog.module('_angular$http$src$backends$browser__xhr');
var core_1 = goog.require('_angular$core');
class BrowserXhr {
    /**
     */
    constructor() {
    }
    /**
     * @return {?}
     */
    build() { return ((new XMLHttpRequest())); }
}
BrowserXhr.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ BrowserXhr.ctorParameters = [];
exports.BrowserXhr = BrowserXhr;
//# sourceMappingURL=browser_xhr.js.map