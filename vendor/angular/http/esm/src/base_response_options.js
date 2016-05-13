goog.module('_angular$http$src$base__response__options');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$http$src$facade$lang');
var headers_1 = goog.require('_angular$http$src$headers');
var enums_1 = goog.require('_angular$http$src$enums');
/**
 * Creates a response options object to be optionally provided when instantiating a
 * {@link Response}.
 *
 * This class is based on the `ResponseInit` description in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#responseinit).
 *
 * All values are null by default. Typical defaults can be found in the
 * {@link BaseResponseOptions} class, which sub-classes `ResponseOptions`.
 *
 * This class may be used in tests to build {@link Response Responses} for
 * mock responses (see {@link MockBackend}).
 *
 * ### Example ([live demo](http://plnkr.co/edit/P9Jkk8e8cz6NVzbcxEsD?p=preview))
 *
 * ```typescript
 * import {ResponseOptions, Response} from '@angular/http';
 *
 * var options = new ResponseOptions({
 *   body: '{"name":"Jeff"}'
 * });
 * var res = new Response(options);
 *
 * console.log('res.json():', res.json()); // Object {name: "Jeff"}
 * ```
 */
class ResponseOptions {
    /**
     * @param {?=} __0
     */
    constructor({ body, status, headers, statusText, type, url } = {}) {
        this.body = lang_1.isPresent(body) ? body : null;
        this.status = lang_1.isPresent(status) ? status : null;
        this.headers = lang_1.isPresent(headers) ? headers : null;
        this.statusText = lang_1.isPresent(statusText) ? statusText : null;
        this.type = lang_1.isPresent(type) ? type : null;
        this.url = lang_1.isPresent(url) ? url : null;
    }
    /**
     *  Creates a copy of the `ResponseOptions` instance, using the optional input as values to override existing values. This method will not change the values of the instance on which it is being called. * This may be useful when sharing a base `ResponseOptions` object inside tests, where certain properties may change from test to test. * ### Example ([live demo](http://plnkr.co/edit/1lXquqFfgduTFBWjNoRE?p=preview)) * ```typescript import {ResponseOptions, Response} from '@angular/http'; * var options = new ResponseOptions({ body: {name: 'Jeff'} }); var res = new Response(options.merge({ url: 'https://google.com' })); console.log('options.url:', options.url); // null console.log('res.json():', res.json()); // Object {name: "Jeff"} console.log('res.url:', res.url); // https://google.com ```
     * @param {?=} options
     * @return {?}
     */
    merge(options) {
        return new ResponseOptions({
            body: lang_1.isPresent(options) && lang_1.isPresent(options.body) ? options.body : this.body,
            status: lang_1.isPresent(options) && lang_1.isPresent(options.status) ? options.status : this.status,
            headers: lang_1.isPresent(options) && lang_1.isPresent(options.headers) ? options.headers : this.headers,
            statusText: lang_1.isPresent(options) && lang_1.isPresent(options.statusText) ? options.statusText :
                this.statusText,
            type: lang_1.isPresent(options) && lang_1.isPresent(options.type) ? options.type : this.type,
            url: lang_1.isPresent(options) && lang_1.isPresent(options.url) ? options.url : this.url,
        });
    }
    static _tsickle_typeAnnotationsHelper() {
        /** String or Object representing the body of the {@link Response}.
        @type {?} */
        ResponseOptions.prototype.body;
        /** Http {@link http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html status code} associated with the response.
        @type {?} */
        ResponseOptions.prototype.status;
        /** Response {@link Headers headers}
        @type {?} */
        ResponseOptions.prototype.headers;
        /** @internal
        @type {?} */
        ResponseOptions.prototype.statusText;
        /** @internal
        @type {?} */
        ResponseOptions.prototype.type;
        /** @type {?} */
        ResponseOptions.prototype.url;
    }
}
exports.ResponseOptions = ResponseOptions;
class BaseResponseOptions extends ResponseOptions {
    /**
     */
    constructor() {
        super({ status: 200, statusText: 'Ok', type: enums_1.ResponseType.Default, headers: new headers_1.Headers() });
    }
}
BaseResponseOptions.decorators = [
    { type: core_1.Injectable },
];
BaseResponseOptions.ctorParameters = [];
exports.BaseResponseOptions = BaseResponseOptions;
//# sourceMappingURL=base_response_options.js.map