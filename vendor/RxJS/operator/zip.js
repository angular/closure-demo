goog.module('rxjs$operator$zip');
var ArrayObservable_1 = goog.require('rxjs$observable$ArrayObservable');
var isArray_1 = goog.require('rxjs$util$isArray');
var Subscriber_1 = goog.require('rxjs$Subscriber');
var OuterSubscriber_1 = goog.require('rxjs$OuterSubscriber');
var subscribeToResult_1 = goog.require('rxjs$util$subscribeToResult');
var iterator_1 = goog.require('rxjs$symbol$iterator');
/**
 * @method zip
 * @owner Observable
 * @param {...?} observables
 * @return {?}
 */
function zipProto(...observables) {
    observables.unshift(this);
    return zipStatic.apply(this, observables);
}
exports.zipProto = zipProto;
/**
 * @static true
 * @name zip
 * @owner Observable
 * @param {...?} observables
 * @return {?}
 */
function zipStatic(...observables) {
    const /** @type {?} */ project = (observables[observables.length - 1]);
    if (typeof project === 'function') {
        observables.pop();
    }
    return new ArrayObservable_1.ArrayObservable(observables).lift(new ZipOperator(project));
}
exports.zipStatic = zipStatic;
class ZipOperator {
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
        return source._subscribe(new ZipSubscriber(subscriber, this.project));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ZipOperator.prototype.project;
    }
}
exports.ZipOperator = ZipOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class ZipSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?=} project
     * @param {?=} values
     */
    constructor(destination, project, values = Object.create(null)) {
        super(destination);
        this.index = 0;
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
        const /** @type {?} */ index = this.index++;
        if (isArray_1.isArray(value)) {
            iterators.push(new StaticArrayIterator(value));
        }
        else if (typeof value[iterator_1.$$iterator] === 'function') {
            iterators.push(new StaticIterator(value[iterator_1.$$iterator]()));
        }
        else {
            iterators.push(new ZipBufferIterator(this.destination, this, value, index));
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
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ZipSubscriber.prototype.index;
        /** @type {?} */
        ZipSubscriber.prototype.values;
        /** @type {?} */
        ZipSubscriber.prototype.project;
        /** @type {?} */
        ZipSubscriber.prototype.iterators;
        /** @type {?} */
        ZipSubscriber.prototype.active;
    }
}
exports.ZipSubscriber = ZipSubscriber;
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
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        StaticIterator.prototype.nextResult;
        /** @type {?} */
        StaticIterator.prototype.iterator;
    }
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
    [iterator_1.$$iterator]() {
        return this;
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    next(value) {
        const /** @type {?} */ i = this.index++;
        const /** @type {?} */ array = this.array;
        return i < this.length ? { value: array[i], done: false } : { done: true, value: null };
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
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        StaticArrayIterator.prototype.index;
        /** @type {?} */
        StaticArrayIterator.prototype.length;
        /** @type {?} */
        StaticArrayIterator.prototype.array;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class ZipBufferIterator extends OuterSubscriber_1.OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} parent
     * @param {?} observable
     * @param {?} index
     */
    constructor(destination, parent, observable, index) {
        super(destination);
        this.parent = parent;
        this.observable = observable;
        this.index = index;
        this.stillUnsubscribed = true;
        this.buffer = [];
        this.isComplete = false;
    }
    /**
     * @return {?}
     */
    [iterator_1.$$iterator]() {
        return this;
    }
    /**
     * @return {?}
     */
    next() {
        const /** @type {?} */ buffer = this.buffer;
        if (buffer.length === 0 && this.isComplete) {
            return { done: true, value: null };
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
        return subscribeToResult_1.subscribeToResult(this, this.observable, this, index);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ZipBufferIterator.prototype.stillUnsubscribed;
        /** @type {?} */
        ZipBufferIterator.prototype.buffer;
        /** @type {?} */
        ZipBufferIterator.prototype.isComplete;
        /** @type {?} */
        ZipBufferIterator.prototype.parent;
        /** @type {?} */
        ZipBufferIterator.prototype.observable;
        /** @type {?} */
        ZipBufferIterator.prototype.index;
    }
}
