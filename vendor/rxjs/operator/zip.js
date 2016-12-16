import { ArrayObservable } from '../observable/ArrayObservable';
import { isArray } from '../util/isArray';
import { Subscriber } from '../Subscriber';
import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
import { $$iterator } from '../symbol/iterator';
/**
 * @owner Observable
 * @this {?}
 * @param {...?} observables
 * @return {?}
 */
export function zipProto(...observables) {
    return this.lift.call(zipStatic(this, ...observables));
}
/**
 * @owner Observable
 * @param {...?} observables
 * @return {?}
 */
export function zipStatic(...observables) {
    const /** @type {?} */ project = (observables[observables.length - 1]);
    if (typeof project === 'function') {
        observables.pop();
    }
    return new ArrayObservable(observables).lift(new ZipOperator(project));
}
export class ZipOperator {
    /**
     * @param {?=} project
     */
    constructor(project) {
        this.project = project;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new ZipSubscriber(subscriber, this.project));
    }
}
function ZipOperator_tsickle_Closure_declarations() {
    /** @type {?} */
    ZipOperator.prototype.project;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class ZipSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?=} project
     * @param {?=} values
     */
    constructor(destination, project, values = Object.create(null)) {
        super(destination);
        this.iterators = [];
        this.active = 0;
        this.project = (typeof project === 'function') ? project : null;
        this.values = values;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ iterators = this.iterators;
        if (isArray(value)) {
            iterators.push(new StaticArrayIterator(value));
        }
        else if (typeof value[$$iterator] === 'function') {
            iterators.push(new StaticIterator(value[$$iterator]()));
        }
        else {
            iterators.push(new ZipBufferIterator(this.destination, this, value));
        }
    }
    /**
     * @return {?}
     */
    _complete() {
        const /** @type {?} */ iterators = this.iterators;
        const /** @type {?} */ len = iterators.length;
        this.active = len;
        for (let /** @type {?} */ i = 0; i < len; i++) {
            let /** @type {?} */ iterator = (iterators[i]);
            if (iterator.stillUnsubscribed) {
                this.add(iterator.subscribe(iterator, i));
            }
            else {
                this.active--; // not an observable
            }
        }
    }
    /**
     * @return {?}
     */
    notifyInactive() {
        this.active--;
        if (this.active === 0) {
            this.destination.complete();
        }
    }
    /**
     * @return {?}
     */
    checkIterators() {
        const /** @type {?} */ iterators = this.iterators;
        const /** @type {?} */ len = iterators.length;
        const /** @type {?} */ destination = this.destination;
        // abort if not all of them have values
        for (let /** @type {?} */ i = 0; i < len; i++) {
            let /** @type {?} */ iterator = iterators[i];
            if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
                return;
            }
        }
        let /** @type {?} */ shouldComplete = false;
        const /** @type {?} */ args = [];
        for (let /** @type {?} */ i = 0; i < len; i++) {
            let /** @type {?} */ iterator = iterators[i];
            let /** @type {?} */ result = iterator.next();
            // check to see if it's completed now that you've gotten
            // the next value.
            if (iterator.hasCompleted()) {
                shouldComplete = true;
            }
            if (result.done) {
                destination.complete();
                return;
            }
            args.push(result.value);
        }
        if (this.project) {
            this._tryProject(args);
        }
        else {
            destination.next(args);
        }
        if (shouldComplete) {
            destination.complete();
        }
    }
    /**
     * @param {?} args
     * @return {?}
     */
    _tryProject(args) {
        let /** @type {?} */ result;
        try {
            result = this.project.apply(this, args);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    }
}
function ZipSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    ZipSubscriber.prototype.values;
    /** @type {?} */
    ZipSubscriber.prototype.project;
    /** @type {?} */
    ZipSubscriber.prototype.iterators;
    /** @type {?} */
    ZipSubscriber.prototype.active;
}
class StaticIterator {
    /**
     * @param {?} iterator
     */
    constructor(iterator) {
        this.iterator = iterator;
        this.nextResult = iterator.next();
    }
    /**
     * @return {?}
     */
    hasValue() {
        return true;
    }
    /**
     * @return {?}
     */
    next() {
        const /** @type {?} */ result = this.nextResult;
        this.nextResult = this.iterator.next();
        return result;
    }
    /**
     * @return {?}
     */
    hasCompleted() {
        const /** @type {?} */ nextResult = this.nextResult;
        return nextResult && nextResult.done;
    }
}
function StaticIterator_tsickle_Closure_declarations() {
    /** @type {?} */
    StaticIterator.prototype.nextResult;
}
class StaticArrayIterator {
    /**
     * @param {?} array
     */
    constructor(array) {
        this.array = array;
        this.index = 0;
        this.length = 0;
        this.length = array.length;
    }
    /**
     * @return {?}
     */
    [$$iterator]() {
        return this;
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    next(value) {
        const /** @type {?} */ i = this.index++;
        const /** @type {?} */ array = this.array;
        return i < this.length ? { value: array[i], done: false } : { value: null, done: true };
    }
    /**
     * @return {?}
     */
    hasValue() {
        return this.array.length > this.index;
    }
    /**
     * @return {?}
     */
    hasCompleted() {
        return this.array.length === this.index;
    }
}
function StaticArrayIterator_tsickle_Closure_declarations() {
    /** @type {?} */
    StaticArrayIterator.prototype.index;
    /** @type {?} */
    StaticArrayIterator.prototype.length;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class ZipBufferIterator extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} parent
     * @param {?} observable
     */
    constructor(destination, parent, observable) {
        super(destination);
        this.parent = parent;
        this.observable = observable;
        this.stillUnsubscribed = true;
        this.buffer = [];
        this.isComplete = false;
    }
    /**
     * @return {?}
     */
    [$$iterator]() {
        return this;
    }
    /**
     * @return {?}
     */
    next() {
        const /** @type {?} */ buffer = this.buffer;
        if (buffer.length === 0 && this.isComplete) {
            return { value: null, done: true };
        }
        else {
            return { value: buffer.shift(), done: false };
        }
    }
    /**
     * @return {?}
     */
    hasValue() {
        return this.buffer.length > 0;
    }
    /**
     * @return {?}
     */
    hasCompleted() {
        return this.buffer.length === 0 && this.isComplete;
    }
    /**
     * @return {?}
     */
    notifyComplete() {
        if (this.buffer.length > 0) {
            this.isComplete = true;
            this.parent.notifyInactive();
        }
        else {
            this.destination.complete();
        }
    }
    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @param {?} innerSub
     * @return {?}
     */
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.buffer.push(innerValue);
        this.parent.checkIterators();
    }
    /**
     * @param {?} value
     * @param {?} index
     * @return {?}
     */
    subscribe(value, index) {
        return subscribeToResult(this, this.observable, this, index);
    }
}
function ZipBufferIterator_tsickle_Closure_declarations() {
    /** @type {?} */
    ZipBufferIterator.prototype.stillUnsubscribed;
    /** @type {?} */
    ZipBufferIterator.prototype.buffer;
    /** @type {?} */
    ZipBufferIterator.prototype.isComplete;
}
