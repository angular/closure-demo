import { root } from '../util/root';
import { Observable } from '../Observable';
import { $$iterator } from '../symbol/iterator';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class IteratorObservable extends Observable {
    /**
     * @param {?} iterator
     * @param {?=} scheduler
     */
    constructor(iterator, scheduler) {
        super();
        this.scheduler = scheduler;
        if (iterator == null) {
            throw new Error('iterator cannot be null.');
        }
        this.iterator = getIterator(iterator);
    }
    /**
     * @param {?} iterator
     * @param {?=} scheduler
     * @return {?}
     */
    static create(iterator, scheduler) {
        return new IteratorObservable(iterator, scheduler);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    static dispatch(state) {
        const { index, hasError, iterator, subscriber } = state;
        if (hasError) {
            subscriber.error(state.error);
            return;
        }
        let /** @type {?} */ result = iterator.next();
        if (result.done) {
            subscriber.complete();
            return;
        }
        subscriber.next(result.value);
        state.index = index + 1;
        if (subscriber.closed) {
            if (typeof iterator.return === 'function') {
                iterator.return();
            }
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
        const { iterator, scheduler } = this;
        if (scheduler) {
            return scheduler.schedule(IteratorObservable.dispatch, 0, {
                index, iterator, subscriber
            });
        }
        else {
            do {
                let /** @type {?} */ result = iterator.next();
                if (result.done) {
                    subscriber.complete();
                    break;
                }
                else {
                    subscriber.next(result.value);
                }
                if (subscriber.closed) {
                    if (typeof iterator.return === 'function') {
                        iterator.return();
                    }
                    break;
                }
            } while (true);
        }
    }
}
function IteratorObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    IteratorObservable.prototype.iterator;
}
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
    [$$iterator]() { return (this); }
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
    [$$iterator]() { return this; }
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
}
/**
 * @param {?} obj
 * @return {?}
 */
function getIterator(obj) {
    const /** @type {?} */ i = obj[$$iterator];
    if (!i && typeof obj === 'string') {
        return new StringIterator(obj);
    }
    if (!i && obj.length !== undefined) {
        return new ArrayIterator(obj);
    }
    if (!i) {
        throw new TypeError('object is not iterable');
    }
    return obj[$$iterator]();
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
    return typeof value === 'number' && root.isFinite(value);
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
