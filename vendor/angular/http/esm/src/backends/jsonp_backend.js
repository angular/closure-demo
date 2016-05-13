goog.module('_angular$http$src$backends$jsonp__backend');
var interfaces_1 = goog.require('_angular$http$src$interfaces');
var enums_1 = goog.require('_angular$http$src$enums');
var static_response_1 = goog.require('_angular$http$src$static__response');
var base_response_options_1 = goog.require('_angular$http$src$base__response__options');
var core_1 = goog.require('_angular$core');
var browser_jsonp_1 = goog.require('_angular$http$src$backends$browser__jsonp');
var exceptions_1 = goog.require('_angular$http$src$facade$exceptions');
var lang_1 = goog.require('_angular$http$src$facade$lang');
var Observable_1 = goog.require('rxjs$Observable');
const /** @type {?} */ JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
const /** @type {?} */ JSONP_ERR_WRONG_METHOD = 'JSONP requests must use GET request method.';
/**
 * Abstract base class for an in-flight JSONP request.
 */
class JSONPConnection {
    static _tsickle_typeAnnotationsHelper() {
        /** The {@link ReadyState} of this request.
        @type {?} */
        JSONPConnection.prototype.readyState;
        /** The outgoing HTTP request.
        @type {?} */
        JSONPConnection.prototype.request;
        /** An observable that completes with the response, when the request is finished.
        @type {?} */
        JSONPConnection.prototype.response;
    }
}
exports.JSONPConnection = JSONPConnection;
class JSONPConnection_ extends JSONPConnection {
    /**
     * @param {?} req
     * @param {?} _dom
     * @param {?=} baseResponseOptions
     */
    constructor(req, _dom, baseResponseOptions) {
        super();
        this._dom = _dom;
        this.baseResponseOptions = baseResponseOptions;
        this._finished = false;
        if (req.method !== enums_1.RequestMethod.Get) {
            throw exceptions_1.makeTypeError(JSONP_ERR_WRONG_METHOD);
        }
        this.request = req;
        this.response = new Observable_1.Observable((responseObserver) => {
            this.readyState = enums_1.ReadyState.Loading;
            let id = this._id = _dom.nextRequestID();
            _dom.exposeConnection(id, this);
            // Workaround Dart
            // url = url.replace(/=JSONP_CALLBACK(&|$)/, `generated method`);
            let callback = _dom.requestCallback(this._id);
            let url = req.url;
            if (url.indexOf('=JSONP_CALLBACK&') > -1) {
                url = lang_1.StringWrapper.replace(url, '=JSONP_CALLBACK&', `=${callback}&`);
            }
            else if (url.lastIndexOf('=JSONP_CALLBACK') === url.length - '=JSONP_CALLBACK'.length) {
                url = url.substring(0, url.length - '=JSONP_CALLBACK'.length) + `=${callback}`;
            }
            let script = this._script = _dom.build(url);
            let onLoad = (event) => {
                if (this.readyState === enums_1.ReadyState.Cancelled)
                    return;
                this.readyState = enums_1.ReadyState.Done;
                _dom.cleanup(script);
                if (!this._finished) {
                    let responseOptions = new base_response_options_1.ResponseOptions({ body: JSONP_ERR_NO_CALLBACK, type: enums_1.ResponseType.Error, url });
                    if (lang_1.isPresent(baseResponseOptions)) {
                        responseOptions = baseResponseOptions.merge(responseOptions);
                    }
                    responseObserver.error(new static_response_1.Response(responseOptions));
                    return;
                }
                let responseOptions = new base_response_options_1.ResponseOptions({ body: this._responseData, url });
                if (lang_1.isPresent(this.baseResponseOptions)) {
                    responseOptions = this.baseResponseOptions.merge(responseOptions);
                }
                responseObserver.next(new static_response_1.Response(responseOptions));
                responseObserver.complete();
            };
            let onError = (error) => {
                if (this.readyState === enums_1.ReadyState.Cancelled)
                    return;
                this.readyState = enums_1.ReadyState.Done;
                _dom.cleanup(script);
                let responseOptions = new base_response_options_1.ResponseOptions({ body: error.message, type: enums_1.ResponseType.Error });
                if (lang_1.isPresent(baseResponseOptions)) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                responseObserver.error(new static_response_1.Response(responseOptions));
            };
            script.addEventListener('load', onLoad);
            script.addEventListener('error', onError);
            _dom.send(script);
            return () => {
                this.readyState = enums_1.ReadyState.Cancelled;
                script.removeEventListener('load', onLoad);
                script.removeEventListener('error', onError);
                if (lang_1.isPresent(script)) {
                    this._dom.cleanup(script);
                }
            };
        });
    }
    /**
     * @param {?=} data
     * @return {?}
     */
    finished(data) {
        // Don't leak connections
        this._finished = true;
        this._dom.removeConnection(this._id);
        if (this.readyState === enums_1.ReadyState.Cancelled)
            return;
        this._responseData = data;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        JSONPConnection_.prototype._id;
        /** @type {?} */
        JSONPConnection_.prototype._script;
        /** @type {?} */
        JSONPConnection_.prototype._responseData;
        /** @type {?} */
        JSONPConnection_.prototype._finished;
        /** @type {?} */
        JSONPConnection_.prototype._dom;
        /** @type {?} */
        JSONPConnection_.prototype.baseResponseOptions;
    }
}
exports.JSONPConnection_ = JSONPConnection_;
/**
 * A {@link ConnectionBackend} that uses the JSONP strategy of making requests.
 */
class JSONPBackend extends interfaces_1.ConnectionBackend {
}
exports.JSONPBackend = JSONPBackend;
class JSONPBackend_ extends JSONPBackend {
    /**
     * @param {?} _browserJSONP
     * @param {?} _baseResponseOptions
     */
    constructor(_browserJSONP, _baseResponseOptions) {
        super();
        this._browserJSONP = _browserJSONP;
        this._baseResponseOptions = _baseResponseOptions;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    createConnection(request) {
        return new JSONPConnection_(request, this._browserJSONP, this._baseResponseOptions);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        JSONPBackend_.prototype._browserJSONP;
        /** @type {?} */
        JSONPBackend_.prototype._baseResponseOptions;
    }
}
JSONPBackend_.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ JSONPBackend_.ctorParameters = [
    { type: browser_jsonp_1.BrowserJsonp, },
    { type: base_response_options_1.ResponseOptions, },
];
exports.JSONPBackend_ = JSONPBackend_;
//# sourceMappingURL=jsonp_backend.js.map