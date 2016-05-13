goog.module('_angular$http$src$base__request__options');
var lang_1 = goog.require('_angular$http$src$facade$lang');
var headers_1 = goog.require('_angular$http$src$headers');
var enums_1 = goog.require('_angular$http$src$enums');
var core_1 = goog.require('_angular$core');
var url_search_params_1 = goog.require('_angular$http$src$url__search__params');
var http_utils_1 = goog.require('_angular$http$src$http__utils');
/**
 * Creates a request options object to be optionally provided when instantiating a
 * {@link Request}.
 *
 * This class is based on the `RequestInit` description in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#requestinit).
 *
 * All values are null by default. Typical defaults can be found in the {@link BaseRequestOptions}
 * class, which sub-classes `RequestOptions`.
 *
 * ### Example ([live demo](http://plnkr.co/edit/7Wvi3lfLq41aQPKlxB4O?p=preview))
 *
 * ```typescript
 * import {RequestOptions, Request, RequestMethod} from '@angular/http';
 *
 * var options = new RequestOptions({
 *   method: RequestMethod.Post,
 *   url: 'https://google.com'
 * });
 * var req = new Request(options);
 * console.log('req.method:', RequestMethod[req.method]); // Post
 * console.log('options.url:', options.url); // https://google.com
 * ```
 */
class RequestOptions {
    /**
     * @param {?=} __0
     */
    constructor({ method, headers, body, url, search } = {}) {
        this.method = lang_1.isPresent(method) ? http_utils_1.normalizeMethodName(method) : null;
        this.headers = lang_1.isPresent(headers) ? headers : null;
        this.body = lang_1.isPresent(body) ? body : null;
        this.url = lang_1.isPresent(url) ? url : null;
        this.search = lang_1.isPresent(search) ? (lang_1.isString(search) ? new url_search_params_1.URLSearchParams((search)) :
            (search)) :
            null;
    }
    /**
     *  Creates a copy of the `RequestOptions` instance, using the optional input as values to override existing values. This method will not change the values of the instance on which it is being called. * Note that `headers` and `search` will override existing values completely if present in the `options` object. If these values should be merged, it should be done prior to calling `merge` on the `RequestOptions` instance. * ### Example ([live demo](http://plnkr.co/edit/6w8XA8YTkDRcPYpdB9dk?p=preview)) * ```typescript import {RequestOptions, Request, RequestMethod} from '@angular/http'; * var options = new RequestOptions({ method: RequestMethod.Post }); var req = new Request(options.merge({ url: 'https://google.com' })); console.log('req.method:', RequestMethod[req.method]); // Post console.log('options.url:', options.url); // null console.log('req.url:', req.url); // https://google.com ```
     * @param {?=} options
     * @return {?}
     */
    merge(options) {
        return new RequestOptions({
            method: lang_1.isPresent(options) && lang_1.isPresent(options.method) ? options.method : this.method,
            headers: lang_1.isPresent(options) && lang_1.isPresent(options.headers) ? options.headers : this.headers,
            body: lang_1.isPresent(options) && lang_1.isPresent(options.body) ? options.body : this.body,
            url: lang_1.isPresent(options) && lang_1.isPresent(options.url) ? options.url : this.url,
            search: lang_1.isPresent(options) && lang_1.isPresent(options.search) ?
                (lang_1.isString(options.search) ? new url_search_params_1.URLSearchParams(/** @type {?} */ ((options.search))) :
                    (((options.search))).clone()) :
                this.search
        });
    }
    static _tsickle_typeAnnotationsHelper() {
        /** Http method with which to execute a {@link Request}. Acceptable methods are defined in the {@link RequestMethod} enum.
        @type {?} */
        RequestOptions.prototype.method;
        /** {@link Headers} to be attached to a {@link Request}.
        @type {?} */
        RequestOptions.prototype.headers;
        /** @type {?} */
        RequestOptions.prototype.body;
        /** Url with which to perform a {@link Request}.
        @type {?} */
        RequestOptions.prototype.url;
        /** Search parameters to be included in a {@link Request}.
        @type {?} */
        RequestOptions.prototype.search;
    }
}
exports.RequestOptions = RequestOptions;
class BaseRequestOptions extends RequestOptions {
    /**
     */
    constructor() {
        super({ method: enums_1.RequestMethod.Get, headers: new headers_1.Headers() });
    }
}
/** @nocollapse */ BaseRequestOptions.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ BaseRequestOptions.ctorParameters = [];
exports.BaseRequestOptions = BaseRequestOptions;
//# sourceMappingURL=base_request_options.js.map