goog.module('_angular$compiler$testing$xhr__mock');
var index_1 = goog.require('_angular$compiler');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var core_1 = goog.require('_angular$core');
var async_1 = goog.require('_angular$compiler$src$facade$async');
/**
 * A mock implementation of {@link XHR} that allows outgoing requests to be mocked
 * and responded to within a single test, without going to the network.
 */
class MockXHR extends index_1.XHR {
    constructor(...args) {
        super(...args);
        this._expectations = [];
        this._definitions = new collection_1.Map();
        this._requests = [];
    }
    /**
     * @param {?} url
     * @return {?}
     */
    get(url) {
        var /** @type {?} */ request = new _PendingRequest(url);
        this._requests.push(request);
        return request.getPromise();
    }
    /**
     *  Add an expectation for the given URL. Incoming requests will be checked against the next expectation (in FIFO order). The `verifyNoOutstandingExpectations` method can be used to check if any expectations have not yet been met. * The response given will be returned if the expectation matches.
     * @param {?} url
     * @param {?} response
     * @return {?}
     */
    expect(url, response) {
        var /** @type {?} */ expectation = new _Expectation(url, response);
        this._expectations.push(expectation);
    }
    /**
     *  Add a definition for the given URL to return the given response. Unlike expectations, definitions have no order and will satisfy any matching request at any time. Also unlike expectations, unused definitions do not cause `verifyNoOutstandingExpectations` to return an error.
     * @param {?} url
     * @param {?} response
     * @return {?}
     */
    when(url, response) { this._definitions.set(url, response); }
    /**
     *  Process pending requests and verify there are no outstanding expectations. Also fails if no requests are pending.
     * @return {?}
     */
    flush() {
        if (this._requests.length === 0) {
            throw new core_1.BaseException('No pending requests to flush');
        }
        do {
            this._processRequest(this._requests.shift());
        } while (this._requests.length > 0);
        this.verifyNoOutstandingExpectations();
    }
    /**
     *  Throw an exception if any expectations have not been satisfied.
     * @return {?}
     */
    verifyNoOutstandingExpectations() {
        if (this._expectations.length === 0)
            return;
        var /** @type {?} */ urls = [];
        for (var /** @type {?} */ i = 0; i < this._expectations.length; i++) {
            var /** @type {?} */ expectation = this._expectations[i];
            urls.push(expectation.url);
        }
        throw new core_1.BaseException(`Unsatisfied requests: ${urls.join(', ')}`);
    }
    /**
     * @param {?} request
     * @return {?}
     */
    _processRequest(request) {
        var /** @type {?} */ url = request.url;
        if (this._expectations.length > 0) {
            var /** @type {?} */ expectation = this._expectations[0];
            if (expectation.url == url) {
                collection_1.ListWrapper.remove(this._expectations, expectation);
                request.complete(expectation.response);
                return;
            }
        }
        if (this._definitions.has(url)) {
            var /** @type {?} */ response = this._definitions.get(url);
            request.complete(lang_1.normalizeBlank(response));
            return;
        }
        throw new core_1.BaseException(`Unexpected request ${url}`);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        MockXHR.prototype._expectations;
        /** @type {?} */
        MockXHR.prototype._definitions;
        /** @type {?} */
        MockXHR.prototype._requests;
    }
}
exports.MockXHR = MockXHR;
class _PendingRequest {
    /**
     * @param {?} url
     */
    constructor(url) {
        this.url = url;
        this.completer = async_1.PromiseWrapper.completer();
    }
    /**
     * @param {?} response
     * @return {?}
     */
    complete(response) {
        if (lang_1.isBlank(response)) {
            this.completer.reject(`Failed to load ${this.url}`, null);
        }
        else {
            this.completer.resolve(response);
        }
    }
    /**
     * @return {?}
     */
    getPromise() { return this.completer.promise; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _PendingRequest.prototype.url;
        /** @type {?} */
        _PendingRequest.prototype.completer;
    }
}
class _Expectation {
    /**
     * @param {?} url
     * @param {?} response
     */
    constructor(url, response) {
        this.url = url;
        this.response = response;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        _Expectation.prototype.url;
        /** @type {?} */
        _Expectation.prototype.response;
    }
}
//# sourceMappingURL=xhr_mock.js.map