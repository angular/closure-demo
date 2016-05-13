goog.module('rxjs$Notification');
var Observable_1 = goog.require('rxjs$Observable');
/**
 * Represents a push-based event or value that an {@link Observable} can emit.
 * This class is particularly useful for operators that manage notifications,
 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
 * others. Besides wrapping the actual delivered value, it also annotates it
 * with metadata of, for instance, what type of push message it is (`next`,
 * `error`, or `complete`).
 *
 * @see {@link materialize}
 * @see {@link dematerialize}
 * @see {@link observeOn}
 *
 * @class Notification<T>
 */
class Notification {
    /**
     * @param {?} kind
     * @param {?=} value
     * @param {?=} exception
     */
    constructor(kind, value, exception) {
        this.kind = kind;
        this.value = value;
        this.exception = exception;
        this.hasValue = kind === 'N';
    }
    /**
     *  Delivers to the given `observer` the value wrapped by this Notification.
     * @param {?} observer
     * @return {?}
     */
    observe(observer) {
        switch (this.kind) {
            case 'N':
                return observer.next && observer.next(this.value);
            case 'E':
                return observer.error && observer.error(this.exception);
            case 'C':
                return observer.complete && observer.complete();
        }
    }
    /**
     *  Given some {@link Observer} callbacks, deliver the value represented by the current Notification to the correctly corresponding callback.
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
                return error && error(this.exception);
            case 'C':
                return complete && complete();
        }
    }
    /**
     *  Takes an Observer or its individual callback functions, and calls `observe` or `do` methods accordingly. the `next` callback.
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
     *  Returns a simple Observable that just delivers the notification represented by this Notification instance.
     * @return {?}
     */
    toObservable() {
        const /** @type {?} */ kind = this.kind;
        switch (kind) {
            case 'N':
                return Observable_1.Observable.of(this.value);
            case 'E':
                return Observable_1.Observable.throw(this.exception);
            case 'C':
                return Observable_1.Observable.empty();
        }
    }
    /**
     *  A shortcut to create a Notification instance of the type `next` from a given value. argument.
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
     *  A shortcut to create a Notification instance of the type `error` from a given error. argument.
     * @param {?=} err
     * @return {?}
     */
    static createError(err) {
        return new Notification('E', undefined, err);
    }
    /**
     *  A shortcut to create a Notification instance of the type `complete`.
     * @return {?}
     */
    static createComplete() {
        return this.completeNotification;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        Notification.completeNotification;
        /** @type {?} */
        Notification.undefinedValueNotification;
        /** @type {?} */
        Notification.prototype.hasValue;
        /** @type {?} */
        Notification.prototype.kind;
        /** @type {?} */
        Notification.prototype.value;
        /** @type {?} */
        Notification.prototype.exception;
    }
}
Notification.completeNotification = new Notification('C');
Notification.undefinedValueNotification = new Notification('N', undefined);
exports.Notification = Notification;
