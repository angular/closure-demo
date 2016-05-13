goog.module('_angular$http$src$static__response');
var lang_1 = goog.require('_angular$http$src$facade$lang');
var exceptions_1 = goog.require('_angular$http$src$facade$exceptions');
var http_utils_1 = goog.require('_angular$http$src$http__utils');
/**
 * Creates `Response` instances from provided values.
 *
 * Though this object isn't
 * usually instantiated by end-users, it is the primary object interacted with when it comes time to
 * add data to a view.
 *
 * ### Example
 *
 * ```
 * http.request('my-friends.txt').subscribe(response => this.friends = response.text());
 * ```
 *
 * The Response's interface is inspired by the Response constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#response-class), but is considered a static value whose body
 * can be accessed many times. There are other differences in the implementation, but this is the
 * most significant.
 */
class Response {
    /**
     * @param {?} responseOptions
     */
    constructor(responseOptions) {
        this._body = responseOptions.body;
        this.status = responseOptions.status;
        this.ok = (this.status >= 200 && this.status <= 299);
        this.statusText = responseOptions.statusText;
        this.headers = responseOptions.headers;
        this.type = responseOptions.type;
        this.url = responseOptions.url;
    }
    /**
     * @return {?}
     */
    blob() { throw new exceptions_1.BaseException('"blob()" method not implemented on Response superclass'); }
    /**
     *  Attempts to return body as parsed `JSON` object, or raises an exception.
     * @return {?}
     */
    json() {
        var /** @type {?} */ jsonResponse;
        if (http_utils_1.isJsObject(this._body)) {
            jsonResponse = this._body;
        }
        else if (lang_1.isString(this._body)) {
            jsonResponse = lang_1.Json.parse(/** @type {?} */ (this._body));
        }
        return jsonResponse;
    }
    /**
     *  Returns the body as a string, presuming `toString()` can be called on the response body.
     * @return {?}
     */
    text() { return this._body.toString(); }
    /**
     * @return {?}
     */
    arrayBuffer() {
        throw new exceptions_1.BaseException('"arrayBuffer()" method not implemented on Response superclass');
    }
    static _tsickle_typeAnnotationsHelper() {
        /** One of "basic", "cors", "default", "error, or "opaque". * Defaults to "default".
        @type {?} */
        Response.prototype.type;
        /** True if the response's status is within 200-299
        @type {?} */
        Response.prototype.ok;
        /** URL of response. * Defaults to empty string.
        @type {?} */
        Response.prototype.url;
        /** Status code returned by server. * Defaults to 200.
        @type {?} */
        Response.prototype.status;
        /** Text representing the corresponding reason phrase to the `status`, as defined in [ietf rfc 2616 section 6.1.1](https://tools.ietf.org/html/rfc2616#section-6.1.1) * Defaults to "OK"
        @type {?} */
        Response.prototype.statusText;
        /** Non-standard property * Denotes how many of the response body's bytes have been loaded, for example if the response is the result of a progress event.
        @type {?} */
        Response.prototype.bytesLoaded;
        /** Non-standard property * Denotes how many bytes are expected in the final response body.
        @type {?} */
        Response.prototype.totalBytes;
        /** Headers object based on the `Headers` class in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class).
        @type {?} */
        Response.prototype.headers;
        /** @type {?} */
        Response.prototype._body;
    }
}
exports.Response = Response;
//# sourceMappingURL=static_response.js.map