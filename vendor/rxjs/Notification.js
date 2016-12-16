import { Observable } from './Observable';
/**
 * Represents a push-based event or value that an {\@link Observable} can emit.
 * This class is particularly useful for operators that manage notifications,
 * like {\@link materialize}, {\@link dematerialize}, {\@link observeOn}, and
 * others. Besides wrapping the actual delivered value, it also annotates it
 * with metadata of, for instance, what type of push message it is (`next`,
 * `error`, or `complete`).
 *
 * @see {\@link materialize}
 * @see {\@link dematerialize}
 * @see {\@link observeOn}
 *
 */
export class Notification {
    /**
     * @param {?} kind
     * @param {?=} value
     * @param {?=} error
     */
    constructor(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    /**
     * Delivers to the given `observer` the value wrapped by this Notification.
     * @param {?} observer
     * @return {?}
     */
    observe(observer) {
        switch (this.kind) {
            case 'N':
                return observer.next && observer.next(this.value);
            case 'E':
                return observer.error && observer.error(this.error);
            case 'C':
                return observer.complete && observer.complete();
        }
    }
    /**
     * Given some {\@link Observer} callbacks, deliver the value represented by the
     * current Notification to the correctly corresponding callback.
     * @param {?} next
     * @param {?=} error
     * @param {?=} complete
     * @return {?}
     */
    do(next, error, complete) {
        const /** @type {?} */ kind = this.kind;
        switch (kind) {
            case 'N':
                return next && next(this.value);
            case 'E':
                return error && error(this.error);
            case 'C':
                return complete && complete();
        }
    }
    /**
     * Takes an Observer or its individual callback functions, and calls `observe`
     * or `do` methods accordingly.
     * the `next` callback.
     * @param {?} nextOrObserver
     * @param {?=} error
     * @param {?=} complete
     * @return {?}
     */
    accept(nextOrObserver, error, complete) {
        if (nextOrObserver && typeof ((nextOrObserver)).next === 'function') {
            return this.observe(/** @type {?} */ (nextOrObserver));
        }
        else {
            return this.do(/** @type {?} */ (nextOrObserver), error, complete);
        }
    }
    /**
     * Returns a simple Observable that just delivers the notification represented
     * by this Notification instance.
     * @return {?}
     */
    toObservable() {
        const /** @type {?} */ kind = this.kind;
        switch (kind) {
            case 'N':
                return Observable.of(this.value);
            case 'E':
                return Observable.throw(this.error);
            case 'C':
                return Observable.empty();
        }
        throw new Error('unexpected notification kind value');
    }
    /**
     * A shortcut to create a Notification instance of the type `next` from a
     * given value.
     * argument.
     * @param {?} value
     * @return {?}
     */
    static createNext(value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return this.undefinedValueNotification;
    }
    /**
     * A shortcut to create a Notification instance of the type `error` from a
     * given error.
     * argument.
     * @param {?=} err
     * @return {?}
     */
    static createError(err) {
        return new Notification('E', undefined, err);
    }
    /**
     * A shortcut to create a Notification instance of the type `complete`.
     * @return {?}
     */
    static createComplete() {
        return this.completeNotification;
    }
}
Notification.completeNotification = new Notification('C');
Notification.undefinedValueNotification = new Notification('N', undefined);
function Notification_tsickle_Closure_declarations() {
    /** @type {?} */
    Notification.prototype.hasValue;
    /** @type {?} */
    Notification.prototype.completeNotification;
    /** @type {?} */
    Notification.prototype.undefinedValueNotification;
}
