goog.module('rxjs$observable$IteratorObservable');
var root_1 = goog.require('rxjs$util$root');
var isObject_1 = goog.require('rxjs$util$isObject');
var tryCatch_1 = goog.require('rxjs$util$tryCatch');
var Observable_1 = goog.require('rxjs$Observable');
var isFunction_1 = goog.require('rxjs$util$isFunction');
var iterator_1 = goog.require('rxjs$symbol$iterator');
var errorObject_1 = goog.require('rxjs$util$errorObject');
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
class IteratorObservable extends Observable_1.Observable {
    /**
     * @param {?} iterator
     * @param {?=} project
     * @param {?=} thisArg
     * @param {?=} scheduler
     */
    constructor(iterator, project, thisArg, scheduler) {
        super();
        if (iterator == null) {
            throw new Error('iterator cannot be null.');
        }
        if (isObject_1.isObject(project)) {
            this.thisArg = project;
            this.scheduler = thisArg;
        }
        else if (isFunction_1.isFunction(project)) {
            this.project = project;
            this.thisArg = thisArg;
            this.scheduler = scheduler;
        }
        else if (project != null) {
            throw new Error('When provided, `project` must be a function.');
        }
        this.iterator = getIterator(iterator);
    }
    /**
     * @param {?} iterator
     * @param {?=} project
     * @param {?=} thisArg
     * @param {?=} scheduler
     * @return {?}
     */
    static create(iterator, project, thisArg, scheduler) {
        return new IteratorObservable(iterator, project, thisArg, scheduler);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    static dispatch(state) {
        const { index, hasError, thisArg, project, iterator, subscriber } = state;
        if (hasError) {
            subscriber.error(state.error);
            return;
        }
        let /** @type {?} */ result = iterator.next();
        if (result.done) {
            subscriber.complete();
            return;
        }
        if (project) {
            result = tryCatch_1.tryCatch(project).call(thisArg, result.value, index);
            if (result === errorObject_1.errorObject) {
                state.error = errorObject_1.errorObject.e;
                state.hasError = true;
            }
            else {
                subscriber.next(result);
                state.index = index + 1;
            }
        }
        else {
            subscriber.next(result.value);
            state.index = index + 1;
        }
        if (subscriber.isUnsubscribed) {
            return;
        }
        ((this)).schedule(state);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        let /** @type {?} */ index = 0;
        const { iterator, project, thisArg, scheduler } = this;
        if (scheduler) {
            return scheduler.schedule(IteratorObservable.dispatch, 0, {
                index, thisArg, project, iterator, subscriber
            });
        }
        else {
            do {
                let /** @type {?} */ result = iterator.next();
                if (result.done) {
                    subscriber.complete();
                    break;
                }
                else if (project) {
                    result = tryCatch_1.tryCatch(project).call(thisArg, result.value, index++);
                    if (result === errorObject_1.errorObject) {
                        subscriber.error(errorObject_1.errorObject.e);
                        break;
                    }
                    subscriber.next(result);
                }
                else {
                    subscriber.next(result.value);
                }
                if (subscriber.isUnsubscribed) {
                    break;
                }
            } while (true);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        IteratorObservable.prototype.iterator;
        /** @type {?} */
        IteratorObservable.prototype.thisArg;
        /** @type {?} */
        IteratorObservable.prototype.project;
        /** @type {?} */
        IteratorObservable.prototype.scheduler;
    }
}
exports.IteratorObservable = IteratorObservable;
class StringIterator {
    /**
     * @param {?} str
     * @param {?=} idx
     * @param {?=} len
     */
    constructor(str, idx = 0, len = str.length) {
        this.str = str;
        this.idx = idx;
        this.len = len;
    }
    /**
     * @return {?}
     */
    [iterator_1.$$iterator]() { return (this); }
    /**
     * @return {?}
     */
    next() {
        return this.idx < this.len ? {
            done: false,
            value: this.str.charAt(this.idx++)
        } : {
            done: true,
            value: undefined
        };
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        StringIterator.prototype.str;
        /** @type {?} */
        StringIterator.prototype.idx;
        /** @type {?} */
        StringIterator.prototype.len;
    }
}
class ArrayIterator {
    /**
     * @param {?} arr
     * @param {?=} idx
     * @param {?=} len
     */
    constructor(arr, idx = 0, len = toLength(arr)) {
        this.arr = arr;
        this.idx = idx;
        this.len = len;
    }
    /**
     * @return {?}
     */
    [iterator_1.$$iterator]() { return this; }
    /**
     * @return {?}
     */
    next() {
        return this.idx < this.len ? {
            done: false,
            value: this.arr[this.idx++]
        } : {
            done: true,
            value: undefined
        };
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ArrayIterator.prototype.arr;
        /** @type {?} */
        ArrayIterator.prototype.idx;
        /** @type {?} */
        ArrayIterator.prototype.len;
    }
}
/**
 * @param {?} obj
 * @return {?}
 */
function getIterator(obj) {
    const /** @type {?} */ i = obj[iterator_1.$$iterator];
    if (!i && typeof obj === 'string') {
        return new StringIterator(obj);
    }
    if (!i && obj.length !== undefined) {
        return new ArrayIterator(obj);
    }
    if (!i) {
        throw new TypeError('Object is not iterable');
    }
    return obj[iterator_1.$$iterator]();
}
const /** @type {?} */ maxSafeInteger = Math.pow(2, 53) - 1;
/**
 * @param {?} o
 * @return {?}
 */
function toLength(o) {
    let /** @type {?} */ len = +o.length;
    if (isNaN(len)) {
        return 0;
    }
    if (len === 0 || !numberIsFinite(len)) {
        return len;
    }
    len = sign(len) * Math.floor(Math.abs(len));
    if (len <= 0) {
        return 0;
    }
    if (len > maxSafeInteger) {
        return maxSafeInteger;
    }
    return len;
}
/**
 * @param {?} value
 * @return {?}
 */
function numberIsFinite(value) {
    return typeof value === 'number' && root_1.root.isFinite(value);
}
/**
 * @param {?} value
 * @return {?}
 */
function sign(value) {
    let /** @type {?} */ valueAsNumber = +value;
    if (valueAsNumber === 0) {
        return valueAsNumber;
    }
    if (isNaN(valueAsNumber)) {
        return valueAsNumber;
    }
    return valueAsNumber < 0 ? -1 : 1;
}
