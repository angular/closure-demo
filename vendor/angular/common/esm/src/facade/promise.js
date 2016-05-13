goog.module('_angular$common$src$facade$promise');
class PromiseCompleter {
    /**
     */
    constructor() {
        this.promise = new Promise((res, rej) => {
            this.resolve = res;
            this.reject = rej;
        });
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        PromiseCompleter.prototype.promise;
        /** @type {?} */
        PromiseCompleter.prototype.resolve;
        /** @type {?} */
        PromiseCompleter.prototype.reject;
    }
}
exports.PromiseCompleter = PromiseCompleter;
class PromiseWrapper {
    /**
     * @param {?} obj
     * @return {?}
     */
    static resolve(obj) { return Promise.resolve(obj); }
    /**
     * @param {?} obj
     * @param {?} _
     * @return {?}
     */
    static reject(obj, _) { return Promise.reject(obj); }
    /**
     * @param {?} promise
     * @param {?} onError
     * @return {?}
     */
    static catchError(promise, onError) {
        return promise.catch(onError);
    }
    /**
     * @param {?} promises
     * @return {?}
     */
    static all(promises) {
        if (promises.length == 0)
            return Promise.resolve([]);
        return Promise.all(promises);
    }
    /**
     * @param {?} promise
     * @param {?} success
     * @param {?=} rejection
     * @return {?}
     */
    static then(promise, success, rejection) {
        return promise.then(success, rejection);
    }
    /**
     * @param {?} computation
     * @return {?}
     */
    static wrap(computation) {
        return new Promise((res, rej) => {
            try {
                res(computation());
            }
            catch (e) {
                rej(e);
            }
        });
    }
    /**
     * @param {?} computation
     * @return {?}
     */
    static scheduleMicrotask(computation) {
        PromiseWrapper.then(PromiseWrapper.resolve(null), computation, (_) => { });
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    static isPromise(obj) { return obj instanceof Promise; }
    /**
     * @return {?}
     */
    static completer() { return new PromiseCompleter(); }
}
exports.PromiseWrapper = PromiseWrapper;
//# sourceMappingURL=promise.js.map