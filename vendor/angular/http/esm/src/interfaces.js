goog.module('_angular$http$src$interfaces');
/**
 * Abstract class from which real backends are derived.
 *
 * The primary purpose of a `ConnectionBackend` is to create new connections to fulfill a given
 * {@link Request}.
 */
class ConnectionBackend {
}
exports.ConnectionBackend = ConnectionBackend;
/**
 * Abstract class from which real connections are derived.
 */
class Connection {
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        Connection.prototype.readyState;
        /** @type {?} */
        Connection.prototype.request;
        /** @type {?} */
        Connection.prototype.response;
    }
}
exports.Connection = Connection;
//# sourceMappingURL=interfaces.js.map