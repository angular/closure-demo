import { Subject, AnonymousSubject } from '../../Subject';
import { Subscriber } from '../../Subscriber';
import { Observable } from '../../Observable';
import { Subscription } from '../../Subscription';
import { root } from '../../util/root';
import { ReplaySubject } from '../../ReplaySubject';
import { tryCatch } from '../../util/tryCatch';
import { errorObject } from '../../util/errorObject';
import { assign } from '../../util/assign';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class WebSocketSubject extends AnonymousSubject {
    /**
     * @param {?} urlConfigOrSource
     * @param {?=} destination
     */
    constructor(urlConfigOrSource, destination) {
        if (urlConfigOrSource instanceof Observable) {
            super(destination, urlConfigOrSource);
        }
        else {
            super();
            this.WebSocketCtor = root.WebSocket;
            this._output = new Subject();
            if (typeof urlConfigOrSource === 'string') {
                this.url = urlConfigOrSource;
            }
            else {
                // WARNING: config object could override important members here.
                assign(this, urlConfigOrSource);
            }
            if (!this.WebSocketCtor) {
                throw new Error('no WebSocket constructor can be found');
            }
            this.destination = new ReplaySubject();
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    resultSelector(e) {
        return JSON.parse(e.data);
    }
    /**
     * @owner Observable
     * @param {?} urlConfigOrSource
     * @return {?}
     */
    static create(urlConfigOrSource) {
        return new WebSocketSubject(urlConfigOrSource);
    }
    /**
     * @param {?} operator
     * @return {?}
     */
    lift(operator) {
        const /** @type {?} */ sock = new WebSocketSubject(this, /** @type {?} */ (this.destination));
        sock.operator = operator;
        return sock;
    }
    /**
     * @return {?}
     */
    _resetState() {
        this.socket = null;
        if (!this.source) {
            this.destination = new ReplaySubject();
        }
        this._output = new Subject();
    }
    /**
     * @param {?} subMsg
     * @param {?} unsubMsg
     * @param {?} messageFilter
     * @return {?}
     */
    multiplex(subMsg, unsubMsg, messageFilter) {
        const /** @type {?} */ self = this;
        return new Observable((observer) => {
            const /** @type {?} */ result = tryCatch(subMsg)();
            if (result === errorObject) {
                observer.error(errorObject.e);
            }
            else {
                self.next(result);
            }
            let /** @type {?} */ subscription = self.subscribe(x => {
                const /** @type {?} */ result = tryCatch(messageFilter)(x);
                if (result === errorObject) {
                    observer.error(errorObject.e);
                }
                else if (result) {
                    observer.next(x);
                }
            }, err => observer.error(err), () => observer.complete());
            return () => {
                const /** @type {?} */ result = tryCatch(unsubMsg)();
                if (result === errorObject) {
                    observer.error(errorObject.e);
                }
                else {
                    self.next(result);
                }
                subscription.unsubscribe();
            };
        });
    }
    /**
     * @return {?}
     */
    _connectSocket() {
        const { WebSocketCtor } = this;
        const /** @type {?} */ observer = this._output;
        let /** @type {?} */ socket = null;
        try {
            socket = this.protocol ?
                new WebSocketCtor(this.url, this.protocol) :
                new WebSocketCtor(this.url);
            this.socket = socket;
        }
        catch (e) {
            observer.error(e);
            return;
        }
        const /** @type {?} */ subscription = new Subscription(() => {
            this.socket = null;
            if (socket && socket.readyState === 1) {
                socket.close();
            }
        });
        socket.onopen = (e) => {
            const /** @type {?} */ openObserver = this.openObserver;
            if (openObserver) {
                openObserver.next(e);
            }
            const /** @type {?} */ queue = this.destination;
            this.destination = Subscriber.create((x) => socket.readyState === 1 && socket.send(x), (e) => {
                const /** @type {?} */ closingObserver = this.closingObserver;
                if (closingObserver) {
                    closingObserver.next(undefined);
                }
                if (e && e.code) {
                    socket.close(e.code, e.reason);
                }
                else {
                    observer.error(new TypeError('WebSocketSubject.error must be called with an object with an error code, ' +
                        'and an optional reason: { code: number, reason: string }'));
                }
                this._resetState();
            }, () => {
                const /** @type {?} */ closingObserver = this.closingObserver;
                if (closingObserver) {
                    closingObserver.next(undefined);
                }
                socket.close();
                this._resetState();
            });
            if (queue && queue instanceof ReplaySubject) {
                subscription.add(((queue)).subscribe(this.destination));
            }
        };
        socket.onerror = (e) => {
            this._resetState();
            observer.error(e);
        };
        socket.onclose = (e) => {
            this._resetState();
            const /** @type {?} */ closeObserver = this.closeObserver;
            if (closeObserver) {
                closeObserver.next(e);
            }
            if (e.wasClean) {
                observer.complete();
            }
            else {
                observer.error(e);
            }
        };
        socket.onmessage = (e) => {
            const /** @type {?} */ result = tryCatch(this.resultSelector)(e);
            if (result === errorObject) {
                observer.error(errorObject.e);
            }
            else {
                observer.next(result);
            }
        };
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const { source } = this;
        if (source) {
            return source.subscribe(subscriber);
        }
        if (!this.socket) {
            this._connectSocket();
        }
        let /** @type {?} */ subscription = new Subscription();
        subscription.add(this._output.subscribe(subscriber));
        subscription.add(() => {
            const { socket } = this;
            if (this._output.observers.length === 0) {
                if (socket && socket.readyState === 1) {
                    socket.close();
                }
                this._resetState();
            }
        });
        return subscription;
    }
    /**
     * @return {?}
     */
    unsubscribe() {
        const { source, socket } = this;
        if (socket && socket.readyState === 1) {
            socket.close();
            this._resetState();
        }
        super.unsubscribe();
        if (!source) {
            this.destination = new ReplaySubject();
        }
    }
}
function WebSocketSubject_tsickle_Closure_declarations() {
    /** @type {?} */
    WebSocketSubject.prototype.url;
    /** @type {?} */
    WebSocketSubject.prototype.protocol;
    /** @type {?} */
    WebSocketSubject.prototype.socket;
    /** @type {?} */
    WebSocketSubject.prototype.openObserver;
    /** @type {?} */
    WebSocketSubject.prototype.closeObserver;
    /** @type {?} */
    WebSocketSubject.prototype.closingObserver;
    /** @type {?} */
    WebSocketSubject.prototype.WebSocketCtor;
    /** @type {?} */
    WebSocketSubject.prototype._output;
}
