goog.module('_angular$http$src$http');
var lang_1 = goog.require('_angular$http$src$facade$lang');
var exceptions_1 = goog.require('_angular$http$src$facade$exceptions');
var core_1 = goog.require('_angular$core');
var interfaces_1 = goog.require('_angular$http$src$interfaces');
var static_request_1 = goog.require('_angular$http$src$static__request');
var base_request_options_1 = goog.require('_angular$http$src$base__request__options');
var enums_1 = goog.require('_angular$http$src$enums');
/**
 * @param {?} backend
 * @param {?} request
 * @return {?}
 */
function httpRequest(backend, request) {
    return backend.createConnection(request).response;
}
/**
 * @param {?} defaultOpts
 * @param {?} providedOpts
 * @param {?} method
 * @param {?} url
 * @return {?}
 */
function mergeOptions(defaultOpts, providedOpts, method, url) {
    var /** @type {?} */ newOptions = defaultOpts;
    if (lang_1.isPresent(providedOpts)) {
        // Hack so Dart can used named parameters
        return newOptions.merge(new base_request_options_1.RequestOptions({
            method: providedOpts.method || method,
            url: providedOpts.url || url,
            search: providedOpts.search,
            headers: providedOpts.headers,
            body: providedOpts.body
        }));
    }
    if (lang_1.isPresent(method)) {
        return newOptions.merge(new base_request_options_1.RequestOptions({ method: method, url: url }));
    }
    else {
        return newOptions.merge(new base_request_options_1.RequestOptions({ url: url }));
    }
}
class Http {
    /**
     * @param {?} _backend
     * @param {?} _defaultOptions
     */
    constructor(_backend, _defaultOptions) {
        this._backend = _backend;
        this._defaultOptions = _defaultOptions;
    }
    /**
     *  Performs any type of http request. First argument is required, and can either be a url or a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions} object can be provided as the 2nd argument. The options object will be merged with the values of {@link BaseRequestOptions} before performing the request.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    request(url, options) {
        var /** @type {?} */ responseObservable;
        if (lang_1.isString(url)) {
            responseObservable = httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Get, /** @type {?} */ (url))));
        }
        else if (url instanceof static_request_1.Request) {
            responseObservable = httpRequest(this._backend, url);
        }
        else {
            throw exceptions_1.makeTypeError('First argument must be a url string or Request instance.');
        }
        return responseObservable;
    }
    /**
     *  Performs a request with `get` http method.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    get(url, options) {
        return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Get, url)));
    }
    /**
     *  Performs a request with `post` http method.
     * @param {?} url
     * @param {?} body
     * @param {?=} options
     * @return {?}
     */
    post(url, body, options) {
        return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions.merge(new base_request_options_1.RequestOptions({ body: body })), options, enums_1.RequestMethod.Post, url)));
    }
    /**
     *  Performs a request with `put` http method.
     * @param {?} url
     * @param {?} body
     * @param {?=} options
     * @return {?}
     */
    put(url, body, options) {
        return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions.merge(new base_request_options_1.RequestOptions({ body: body })), options, enums_1.RequestMethod.Put, url)));
    }
    /**
     *  Performs a request with `delete` http method.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    delete(url, options) {
        return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Delete, url)));
    }
    /**
     *  Performs a request with `patch` http method.
     * @param {?} url
     * @param {?} body
     * @param {?=} options
     * @return {?}
     */
    patch(url, body, options) {
        return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions.merge(new base_request_options_1.RequestOptions({ body: body })), options, enums_1.RequestMethod.Patch, url)));
    }
    /**
     *  Performs a request with `head` http method.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    head(url, options) {
        return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Head, url)));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        Http.prototype._backend;
        /** @type {?} */
        Http.prototype._defaultOptions;
    }
}
/** @nocollapse */ Http.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ Http.ctorParameters = [
    { type: interfaces_1.ConnectionBackend, },
    { type: base_request_options_1.RequestOptions, },
];
exports.Http = Http;
class Jsonp extends Http {
    /**
     * @param {?} backend
     * @param {?} defaultOptions
     */
    constructor(backend, defaultOptions) {
        super(backend, defaultOptions);
    }
    /**
     *  Performs any type of http request. First argument is required, and can either be a url or a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions} object can be provided as the 2nd argument. The options object will be merged with the values of {@link BaseRequestOptions} before performing the request.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    request(url, options) {
        var /** @type {?} */ responseObservable;
        if (lang_1.isString(url)) {
            url =
                new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Get, /** @type {?} */ (url)));
        }
        if (url instanceof static_request_1.Request) {
            if (url.method !== enums_1.RequestMethod.Get) {
                exceptions_1.makeTypeError('JSONP requests must use GET request method.');
            }
            responseObservable = httpRequest(this._backend, url);
        }
        else {
            throw exceptions_1.makeTypeError('First argument must be a url string or Request instance.');
        }
        return responseObservable;
    }
}
/** @nocollapse */ Jsonp.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ Jsonp.ctorParameters = [
    { type: interfaces_1.ConnectionBackend, },
    { type: base_request_options_1.RequestOptions, },
];
exports.Jsonp = Jsonp;
//# sourceMappingURL=http.js.map