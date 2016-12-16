import { tryCatch } from '../util/tryCatch';
import { errorObject } from '../util/errorObject';
import { subscribeToResult } from '../util/subscribeToResult';
import { OuterSubscriber } from '../OuterSubscriber';
/**
 * @owner Observable
 * @this {?}
 * @param {?} project
 * @param {?} seed
 * @param {?=} concurrent
 * @return {?}
 */
export function mergeScan(project, seed, concurrent = Number.POSITIVE_INFINITY) {
    return this.lift(new MergeScanOperator(project, seed, concurrent));
}
export class MergeScanOperator {
    /**
     * @param {?} project
     * @param {?} seed
     * @param {?} concurrent
     */
    constructor(project, seed, concurrent) {
        this.project = project;
        this.seed = seed;
        this.concurrent = concurrent;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new MergeScanSubscriber(subscriber, this.project, this.seed, this.concurrent));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class MergeScanSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} project
     * @param {?} acc
     * @param {?} concurrent
     */
    constructor(destination, project, acc, concurrent) {
        super(destination);
        this.project = project;
        this.acc = acc;
        this.concurrent = concurrent;
        this.hasValue = false;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        if (this.active < this.concurrent) {
            const /** @type {?} */ index = this.index++;
            const /** @type {?} */ ish = tryCatch(this.project)(this.acc, value);
            const /** @type {?} */ destination = this.destination;
            if (ish === errorObject) {
                destination.error(errorObject.e);
            }
            else {
                this.active++;
                this._innerSub(ish, value, index);
            }
        }
        else {
            this.buffer.push(value);
        }
    }
    /**
     * @param {?} ish
     * @param {?} value
     * @param {?} index
     * @return {?}
     */
    _innerSub(ish, value, index) {
        this.add(subscribeToResult(this, ish, value, index));
    }
    /**
     * @return {?}
     */
    _complete() {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            if (this.hasValue === false) {
                this.destination.next(this.acc);
            }
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
        const { destination } = this;
        this.acc = innerValue;
        this.hasValue = true;
        destination.next(innerValue);
    }
    /**
     * @param {?} innerSub
     * @return {?}
     */
    notifyComplete(innerSub) {
        const /** @type {?} */ buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            if (this.hasValue === false) {
                this.destination.next(this.acc);
            }
            this.destination.complete();
        }
    }
}
function MergeScanSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    MergeScanSubscriber.prototype.hasValue;
    /** @type {?} */
    MergeScanSubscriber.prototype.hasCompleted;
    /** @type {?} */
    MergeScanSubscriber.prototype.buffer;
    /** @type {?} */
    MergeScanSubscriber.prototype.active;
    /** @type {?} */
    MergeScanSubscriber.prototype.index;
}
