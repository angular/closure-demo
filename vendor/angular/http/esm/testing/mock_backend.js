goog.module('_angular$http$testing$mock__backend');
var core_1 = goog.require('_angular$core');
var static_request_1 = goog.require('_angular$http$src$static__request');
var enums_1 = goog.require('_angular$http$src$enums');
var lang_1 = goog.require('_angular$http$src$facade$lang');
var exceptions_1 = goog.require('_angular$http$src$facade$exceptions');
var Subject_1 = goog.require('rxjs$Subject');
var ReplaySubject_1 = goog.require('rxjs$ReplaySubject');
var take_1 = goog.require('rxjs$operator$take');
/**
 *
 * Mock Connection to represent a {@link Connection} for tests.
 *
 **/
class MockConnection {
    /**
     * @param {?} req
     */
    constructor(req) {
        this.response = take_1.take.call(new ReplaySubject_1.ReplaySubject(1), 1);
        this.readyState = enums_1.ReadyState.Open;
        this.request = req;
    }
    /**
     *  Sends a mock response to the connection. This response is the value that is emitted to the {@link EventEmitter} returned by {@link Http}. * ### Example * ``` var connection; backend.connections.subscribe(c => connection = c); http.request('data.json').subscribe(res => console.log(res.text())); connection.mockRespond(new Response('fake response')); //logs 'fake response' ``` *
     * @param {?} res
     * @return {?}
     */
    mockRespond(res) {
        if (this.readyState === enums_1.ReadyState.Done || this.readyState === enums_1.ReadyState.Cancelled) {
            throw new exceptions_1.BaseException('Connection has already been resolved');
        }
        this.readyState = enums_1.ReadyState.Done;
        this.response.next(res);
        this.response.complete();
    }
    /**
     *  Not yet implemented! * Sends the provided {@link Response} to the `downloadObserver` of the `Request` associated with this connection.
     * @param {?} res
     * @return {?}
     */
    mockDownload(res) {
        // this.request.downloadObserver.onNext(res);
        // if (res.bytesLoaded === res.totalBytes) {
        //   this.request.downloadObserver.onCompleted();
        // }
    }
    /**
     *  Emits the provided error object as an error to the {@link Response} {@link EventEmitter} returned from {@link Http}.
     * @param {?=} err
     * @return {?}
     */
    mockError(err) {
        // Matches XHR semantics
        this.readyState = enums_1.ReadyState.Done;
        this.response.error(err);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** Describes the state of the connection, based on `XMLHttpRequest.readyState`, but with additional states. For example, state 5 indicates an aborted connection.
        @type {?} */
        MockConnection.prototype.readyState;
        /** {@link Request} instance used to create the connection.
        @type {?} */
        MockConnection.prototype.request;
        /** {@link EventEmitter} of {@link Response}. Can be subscribed to in order to be notified when a response is available.
        @type {?} */
        MockConnection.prototype.response;
    }
}
exports.MockConnection = MockConnection;
class MockBackend {
    /**
     */
    constructor() {
        this.connectionsArray = [];
        this.connections = new Subject_1.Subject();
        this.connections.subscribe((connection) => this.connectionsArray.push(connection));
        this.pendingConnections = new Subject_1.Subject();
    }
    /**
     *  Checks all connections, and raises an exception if any connection has not received a response. * This method only exists in the mock implementation, not in real Backends.
     * @return {?}
     */
    verifyNoPendingRequests() {
        let /** @type {?} */ pending = 0;
        this.pendingConnections.subscribe((c) => pending++);
        if (pending > 0)
            throw new exceptions_1.BaseException(`${pending} pending connections to be resolved`);
    }
    /**
     *  Can be used in conjunction with `verifyNoPendingRequests` to resolve any not-yet-resolve connections, if it's expected that there are connections that have not yet received a response. * This method only exists in the mock implementation, not in real Backends.
     * @return {?}
     */
    resolveAllConnections() { this.connections.subscribe((c) => c.readyState = 4); }
    /**
     *  Creates a new {@link MockConnection}. This is equivalent to calling `new MockConnection()`, except that it also will emit the new `Connection` to the `connections` emitter of this `MockBackend` instance. This method will usually only be used by tests against the framework itself, not by end-users.
     * @param {?} req
     * @return {?}
     */
    createConnection(req) {
        if (!lang_1.isPresent(req) || !(req instanceof static_request_1.Request)) {
            throw new exceptions_1.BaseException(`createConnection requires an instance of Request, got ${req}`);
        }
        let /** @type {?} */ connection = new MockConnection(req);
        this.connections.next(connection);
        return connection;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** {@link EventEmitter} of {@link MockConnection} instances that have been created by this backend. Can be subscribed to in order to respond to connections. * ### Example * ``` import {Http, BaseRequestOptions} from '@angular/http'; import {MockBackend} from '@angular/http/testing'; import {Injector} from '@angular/core'; * it('should get a response', () => { var connection; //this will be set when a new connection is emitted from the backend. var text; //this will be set from mock response var injector = Injector.resolveAndCreate([ MockBackend, provide(Http, {useFactory: (backend, options) => { return new Http(backend, options); }, deps: [MockBackend, BaseRequestOptions]}]); var backend = injector.get(MockBackend); var http = injector.get(Http); backend.connections.subscribe(c => connection = c); http.request('something.json').subscribe(res => { text = res.text(); }); connection.mockRespond(new Response({body: 'Something'})); expect(text).toBe('Something'); }); ``` * This property only exists in the mock implementation, not in real Backends.
        @type {?} */
        MockBackend.prototype.connections;
        /** An array representation of `connections`. This array will be updated with each connection that is created by this backend. * This property only exists in the mock implementation, not in real Backends.
        @type {?} */
        MockBackend.prototype.connectionsArray;
        /** {@link EventEmitter} of {@link MockConnection} instances that haven't yet been resolved (i.e. with a `readyState` less than 4). Used internally to verify that no connections are pending via the `verifyNoPendingRequests` method. * This property only exists in the mock implementation, not in real Backends.
        @type {?} */
        MockBackend.prototype.pendingConnections;
    }
}
MockBackend.decorators = [
    { type: core_1.Injectable },
];
MockBackend.ctorParameters = [];
exports.MockBackend = MockBackend;
//# sourceMappingURL=mock_backend.js.map