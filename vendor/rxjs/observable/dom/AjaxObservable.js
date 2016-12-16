import { root } from '../../util/root';
import { tryCatch } from '../../util/tryCatch';
import { errorObject } from '../../util/errorObject';
import { Observable } from '../../Observable';
import { Subscriber } from '../../Subscriber';
import { MapOperator } from '../../operator/map';
/**
 * @this {?}
 * @return {?}
 */
function getCORSRequest() {
    if (root.XMLHttpRequest) {
        const /** @type {?} */ xhr = new root.XMLHttpRequest();
        if ('withCredentials' in xhr) {
            xhr.withCredentials = !!this.withCredentials;
        }
        return xhr;
    }
    else if (!!root.XDomainRequest) {
        return new root.XDomainRequest();
    }
    else {
        throw new Error('CORS is not supported by your browser');
    }
}
/**
 * @return {?}
 */
function getXMLHttpRequest() {
    if (root.XMLHttpRequest) {
        return new root.XMLHttpRequest();
    }
    else {
        let /** @type {?} */ progId;
        try {
            const /** @type {?} */ progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
            for (let /** @type {?} */ i = 0; i < 3; i++) {
                try {
                    progId = progIds[i];
                    if (new root.ActiveXObject(progId)) {
                        break;
                    }
                }
                catch (e) {
                }
            }
            return new root.ActiveXObject(progId);
        }
        catch (e) {
            throw new Error('XMLHttpRequest is not supported by your browser');
        }
    }
}
/**
 * @param {?} url
 * @param {?=} headers
 * @return {?}
 */
export function ajaxGet(url, headers = null) {
    return new AjaxObservable({ method: 'GET', url, headers });
}
;
/**
 * @param {?} url
 * @param {?=} body
 * @param {?=} headers
 * @return {?}
 */
export function ajaxPost(url, body, headers) {
    return new AjaxObservable({ method: 'POST', url, body, headers });
}
;
/**
 * @param {?} url
 * @param {?=} headers
 * @return {?}
 */
export function ajaxDelete(url, headers) {
    return new AjaxObservable({ method: 'DELETE', url, headers });
}
;
/**
 * @param {?} url
 * @param {?=} body
 * @param {?=} headers
 * @return {?}
 */
export function ajaxPut(url, body, headers) {
    return new AjaxObservable({ method: 'PUT', url, body, headers });
}
;
/**
 * @param {?} url
 * @param {?=} headers
 * @return {?}
 */
export function ajaxGetJSON(url, headers) {
    return new AjaxObservable({ method: 'GET', url, responseType: 'json', headers })
        .lift(new MapOperator((x, index) => x.response, null));
}
;
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class AjaxObservable extends Observable {
    /**
     * @param {?} urlOrRequest
     */
    constructor(urlOrRequest) {
        super();
        const request = {
            async: true,
            createXHR: function () {
                return this.crossDomain ? getCORSRequest.call(this) : getXMLHttpRequest();
            },
            crossDomain: false,
            withCredentials: false,
            headers: {},
            method: 'GET',
            responseType: 'json',
            timeout: 0
        };
        if (typeof urlOrRequest === 'string') {
            request.url = urlOrRequest;
        }
        else {
            for (const prop in urlOrRequest) {
                if (urlOrRequest.hasOwnProperty(prop)) {
                    request[prop] = urlOrRequest[prop];
                }
            }
        }
        this.request = request;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        return new AjaxSubscriber(subscriber, this.request);
    }
}
/**
 * Creates an observable for an Ajax request with either a request object with
 * url, headers, etc or a string for a URL.
 *
 * @example
 * source = Rx.Observable.ajax('/products');
 * source = Rx.Observable.ajax({ url: 'products', method: 'GET' });
 *
 * @param {string|Object} request Can be one of the following:
 *   A string of the URL to make the Ajax call.
 *   An object with the following properties
 *   - url: URL of the request
 *   - body: The body of the request
 *   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
 *   - async: Whether the request is async
 *   - headers: Optional headers
 *   - crossDomain: true if a cross domain request, else false
 *   - createXHR: a function to override if you need to use an alternate
 *   XMLHttpRequest implementation.
 *   - resultSelector: a function to use to alter the output value type of
 *   the Observable. Gets {@link AjaxResponse} as an argument.
 * @return {Observable} An observable sequence containing the XMLHttpRequest.
 * @static true
 * @name ajax
 * @owner Observable
*/
AjaxObservable.create = (() => {
    const /** @type {?} */ create = (urlOrRequest) => {
        return new AjaxObservable(urlOrRequest);
    };
    create.get = ajaxGet;
    create.post = ajaxPost;
    create.delete = ajaxDelete;
    create.put = ajaxPut;
    create.getJSON = ajaxGetJSON;
    return (create);
})();
function AjaxObservable_tsickle_Closure_declarations() {
    /**
     * Creates an observable for an Ajax request with either a request object with
     * url, headers, etc or a string for a URL.
     *
     * source = Rx.Observable.ajax('/products');
     * source = Rx.Observable.ajax({ url: 'products', method: 'GET' });
     *
     *   A string of the URL to make the Ajax call.
     *   An object with the following properties
     *   - url: URL of the request
     *   - body: The body of the request
     *   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
     *   - async: Whether the request is async
     *   - headers: Optional headers
     *   - crossDomain: true if a cross domain request, else false
     *   - createXHR: a function to override if you need to use an alternate
     *   XMLHttpRequest implementation.
     *   - resultSelector: a function to use to alter the output value type of
     *   the Observable. Gets {\@link AjaxResponse} as an argument.
     * @owner Observable
     * @type {?}
     */
    AjaxObservable.prototype.create;
    /** @type {?} */
    AjaxObservable.prototype.request;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class AjaxSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} request
     */
    constructor(destination, request) {
        super(destination);
        this.request = request;
        this.done = false;
        const headers = request.headers = request.headers || {};
        // force CORS if requested
        if (!request.crossDomain && !headers['X-Requested-With']) {
            headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        // ensure content type is set
        if (!('Content-Type' in headers) && !(root.FormData && request.body instanceof root.FormData) && typeof request.body !== 'undefined') {
            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        // properly serialize body
        request.body = this.serializeBody(request.body, request.headers['Content-Type']);
        this.send();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    next(e) {
        this.done = true;
        const { xhr, request, destination } = this;
        const /** @type {?} */ response = new AjaxResponse(e, xhr, request);
        destination.next(response);
    }
    /**
     * @return {?}
     */
    send() {
        const { request, request: { user, method, url, async, password, headers, body } } = this;
        const /** @type {?} */ createXHR = request.createXHR;
        const /** @type {?} */ xhr = tryCatch(createXHR).call(request);
        if ((xhr) === errorObject) {
            this.error(errorObject.e);
        }
        else {
            this.xhr = xhr;
            // open XHR first
            let /** @type {?} */ result;
            if (user) {
                result = tryCatch(xhr.open).call(xhr, method, url, async, user, password);
            }
            else {
                result = tryCatch(xhr.open).call(xhr, method, url, async);
            }
            if (result === errorObject) {
                this.error(errorObject.e);
                return null;
            }
            // timeout and responseType can be set once the XHR is open
            xhr.timeout = request.timeout;
            xhr.responseType = request.responseType;
            // set headers
            this.setHeaders(xhr, headers);
            // now set up the events
            this.setupEvents(xhr, request);
            // finally send the request
            result = body ? tryCatch(xhr.send).call(xhr, body) : tryCatch(xhr.send).call(xhr);
            if (result === errorObject) {
                this.error(errorObject.e);
                return null;
            }
        }
        return xhr;
    }
    /**
     * @param {?} body
     * @param {?=} contentType
     * @return {?}
     */
    serializeBody(body, contentType) {
        if (!body || typeof body === 'string') {
            return body;
        }
        else if (root.FormData && body instanceof root.FormData) {
            return body;
        }
        if (contentType) {
            const /** @type {?} */ splitIndex = contentType.indexOf(';');
            if (splitIndex !== -1) {
                contentType = contentType.substring(0, splitIndex);
            }
        }
        switch (contentType) {
            case 'application/x-www-form-urlencoded':
                return Object.keys(body).map(key => `${encodeURI(key)}=${encodeURI(body[key])}`).join('&');
            case 'application/json':
                return JSON.stringify(body);
            default:
                return body;
        }
    }
    /**
     * @param {?} xhr
     * @param {?} headers
     * @return {?}
     */
    setHeaders(xhr, headers) {
        for (let /** @type {?} */ key in headers) {
            if (headers.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
    }
    /**
     * @param {?} xhr
     * @param {?} request
     * @return {?}
     */
    setupEvents(xhr, request) {
        const /** @type {?} */ progressSubscriber = request.progressSubscriber;
        /**
         * @this {?}
         * @param {?} e
         * @return {?}
         */
        function xhrTimeout(e) {
            const { subscriber, progressSubscriber, request } = ((xhrTimeout));
            if (progressSubscriber) {
                progressSubscriber.error(e);
            }
            subscriber.error(new AjaxTimeoutError(this, request)); //TODO: Make betterer.
        }
        ;
        xhr.ontimeout = xhrTimeout;
        ((xhrTimeout)).request = request;
        ((xhrTimeout)).subscriber = this;
        ((xhrTimeout)).progressSubscriber = progressSubscriber;
        if (xhr.upload && 'withCredentials' in xhr && root.XDomainRequest) {
            if (progressSubscriber) {
                let /** @type {?} */ xhrProgress;
                xhrProgress = function (e) {
                    const { progressSubscriber } = ((xhrProgress));
                    progressSubscriber.next(e);
                };
                xhr.onprogress = xhrProgress;
                ((xhrProgress)).progressSubscriber = progressSubscriber;
            }
            let /** @type {?} */ xhrError;
            xhrError = function (e) {
                const { progressSubscriber, subscriber, request } = ((xhrError));
                if (progressSubscriber) {
                    progressSubscriber.error(e);
                }
                subscriber.error(new AjaxError('ajax error', this, request));
            };
            xhr.onerror = xhrError;
            ((xhrError)).request = request;
            ((xhrError)).subscriber = this;
            ((xhrError)).progressSubscriber = progressSubscriber;
        }
        /**
         * @this {?}
         * @param {?} e
         * @return {?}
         */
        function xhrReadyStateChange(e) {
            const { subscriber, progressSubscriber, request } = ((xhrReadyStateChange));
            if (this.readyState === 4) {
                // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                let /** @type {?} */ status = this.status === 1223 ? 204 : this.status;
                let /** @type {?} */ response = (this.responseType === 'text' ? (this.response || this.responseText) : this.response);
                // fix status code when it is 0 (0 status is undocumented).
                // Occurs when accessing file resources or on Android 4.1 stock browser
                // while retrieving files from application cache.
                if (status === 0) {
                    status = response ? 200 : 0;
                }
                if (200 <= status && status < 300) {
                    if (progressSubscriber) {
                        progressSubscriber.complete();
                    }
                    subscriber.next(e);
                    subscriber.complete();
                }
                else {
                    if (progressSubscriber) {
                        progressSubscriber.error(e);
                    }
                    subscriber.error(new AjaxError('ajax error ' + status, this, request));
                }
            }
        }
        ;
        xhr.onreadystatechange = xhrReadyStateChange;
        ((xhrReadyStateChange)).subscriber = this;
        ((xhrReadyStateChange)).progressSubscriber = progressSubscriber;
        ((xhrReadyStateChange)).request = request;
    }
    /**
     * @return {?}
     */
    unsubscribe() {
        const { done, xhr } = this;
        if (!done && xhr && xhr.readyState !== 4 && typeof xhr.abort === 'function') {
            xhr.abort();
        }
        super.unsubscribe();
    }
}
function AjaxSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    AjaxSubscriber.prototype.xhr;
    /** @type {?} */
    AjaxSubscriber.prototype.done;
}
/**
 * A normalized AJAX response.
 *
 * @see {\@link ajax}
 *
 */
export class AjaxResponse {
    /**
     * @param {?} originalEvent
     * @param {?} xhr
     * @param {?} request
     */
    constructor(originalEvent, xhr, request) {
        this.originalEvent = originalEvent;
        this.xhr = xhr;
        this.request = request;
        this.status = xhr.status;
        this.responseType = xhr.responseType || request.responseType;
        switch (this.responseType) {
            case 'json':
                if ('response' in xhr) {
                    //IE does not support json as responseType, parse it internally
                    this.response = xhr.responseType ? xhr.response : JSON.parse(xhr.response || xhr.responseText || 'null');
                }
                else {
                    this.response = JSON.parse(xhr.responseText || 'null');
                }
                break;
            case 'xml':
                this.response = xhr.responseXML;
                break;
            case 'text':
            default:
                this.response = ('response' in xhr) ? xhr.response : xhr.responseText;
                break;
        }
    }
}
function AjaxResponse_tsickle_Closure_declarations() {
    /** @type {?} */
    AjaxResponse.prototype.status;
    /** @type {?} */
    AjaxResponse.prototype.response;
    /** @type {?} */
    AjaxResponse.prototype.responseText;
    /** @type {?} */
    AjaxResponse.prototype.responseType;
}
/**
 * A normalized AJAX error.
 *
 * @see {\@link ajax}
 *
 */
export class AjaxError extends Error {
    /**
     * @param {?} message
     * @param {?} xhr
     * @param {?} request
     */
    constructor(message, xhr, request) {
        super(message);
        this.message = message;
        this.xhr = xhr;
        this.request = request;
        this.status = xhr.status;
    }
}
function AjaxError_tsickle_Closure_declarations() {
    /** @type {?} */
    AjaxError.prototype.xhr;
    /** @type {?} */
    AjaxError.prototype.request;
    /** @type {?} */
    AjaxError.prototype.status;
}
/**
 * @see {\@link ajax}
 *
 */
export class AjaxTimeoutError extends AjaxError {
    /**
     * @param {?} xhr
     * @param {?} request
     */
    constructor(xhr, request) {
        super('ajax timeout', xhr, request);
    }
}
