goog.module('_angular$http$src$backends$xhr__backend');
var enums_1 = goog.require('_angular$http$src$enums');
var static_response_1 = goog.require('_angular$http$src$static__response');
var headers_1 = goog.require('_angular$http$src$headers');
var base_response_options_1 = goog.require('_angular$http$src$base__response__options');
var core_1 = goog.require('_angular$core');
var browser_xhr_1 = goog.require('_angular$http$src$backends$browser__xhr');
var lang_1 = goog.require('_angular$http$src$facade$lang');
var Observable_1 = goog.require('rxjs$Observable');
var http_utils_1 = goog.require('_angular$http$src$http__utils');
const /** @type {?} */ XSSI_PREFIX = ')]}\',\n';
/**
 * Creates connections using `XMLHttpRequest`. Given a fully-qualified
 * request, an `XHRConnection` will immediately create an `XMLHttpRequest` object and send the
 * request.
 *
 * This class would typically not be created or interacted with directly inside applications, though
 * the {@link MockConnection} may be interacted with in tests.
 */
class XHRConnection {
    /**
     * @param {?} req
     * @param {?} browserXHR
     * @param {?=} baseResponseOptions
     */
    constructor(req, browserXHR, baseResponseOptions) {
        this.request = req;
        this.response = new Observable_1.Observable((responseObserver) => {
            let _xhr = browserXHR.build();
            _xhr.open(enums_1.RequestMethod[req.method].toUpperCase(), req.url);
            // load event handler
            let onLoad = () => {
                // responseText is the old-school way of retrieving response (supported by IE8 & 9)
                // response/responseType properties were introduced in XHR Level2 spec (supported by
                // IE10)
                let body = lang_1.isPresent(_xhr.response) ? _xhr.response : _xhr.responseText;
                // Implicitly strip a potential XSSI prefix.
                if (lang_1.isString(body) && body.startsWith(XSSI_PREFIX)) {
                    body = body.substring(XSSI_PREFIX.length);
                }
                let headers = headers_1.Headers.fromResponseHeaderString(_xhr.getAllResponseHeaders());
                let url = http_utils_1.getResponseURL(_xhr);
                // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                let status = _xhr.status === 1223 ? 204 : _xhr.status;
                // fix status code when it is 0 (0 status is undocumented).
                // Occurs when accessing file resources or on Android 4.1 stock browser
                // while retrieving files from application cache.
                if (status === 0) {
                    status = body ? 200 : 0;
                }
                var responseOptions = new base_response_options_1.ResponseOptions({ body, status, headers, url });
                if (lang_1.isPresent(baseResponseOptions)) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                let response = new static_response_1.Response(responseOptions);
                if (http_utils_1.isSuccess(status)) {
                    responseObserver.next(response);
                    // TODO(gdi2290): defer complete if array buffer until done
                    responseObserver.complete();
                    return;
                }
                responseObserver.error(response);
            };
            // error event handler
            let onError = (err) => {
                var responseOptions = new base_response_options_1.ResponseOptions({ body: err, type: enums_1.ResponseType.Error });
                if (lang_1.isPresent(baseResponseOptions)) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                responseObserver.error(new static_response_1.Response(responseOptions));
            };
            if (lang_1.isPresent(req.headers)) {
                req.headers.forEach((values, name) => _xhr.setRequestHeader(name, values.join(',')));
            }
            _xhr.addEventListener('load', onLoad);
            _xhr.addEventListener('error', onError);
            _xhr.send(this.request.text());
            return () => {
                _xhr.removeEventListener('load', onLoad);
                _xhr.removeEventListener('error', onError);
                _xhr.abort();
            };
        });
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        XHRConnection.prototype.request;
        /** Response {@link EventEmitter} which emits a single {@link Response} value on load event of `XMLHttpRequest`.
        @type {?} */
        XHRConnection.prototype.response;
        /** @type {?} */
        XHRConnection.prototype.readyState;
    }
}
exports.XHRConnection = XHRConnection;
class XHRBackend {
    /**
     * @param {?} _browserXHR
     * @param {?} _baseResponseOptions
     */
    constructor(_browserXHR, _baseResponseOptions) {
        this._browserXHR = _browserXHR;
        this._baseResponseOptions = _baseResponseOptions;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    createConnection(request) {
        return new XHRConnection(request, this._browserXHR, this._baseResponseOptions);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        XHRBackend.prototype._browserXHR;
        /** @type {?} */
        XHRBackend.prototype._baseResponseOptions;
    }
}
/** @nocollapse */ XHRBackend.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ XHRBackend.ctorParameters = [
    { type: browser_xhr_1.BrowserXhr, },
    { type: base_response_options_1.ResponseOptions, },
];
exports.XHRBackend = XHRBackend;
//# sourceMappingURL=xhr_backend.js.map