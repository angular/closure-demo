goog.module('rxjs$operator$reduce');
var Subscriber_1 = goog.require('rxjs$Subscriber');
/**
 *  Returns an Observable that applies a specified accumulator function to the first item emitted by a source Observable, then feeds the result of that function along with the second item emitted by the source Observable into the same function, and so on until all items have been emitted by the source Observable, and emits the final result from the final call to your function as its sole item. This technique, which is called "reduce" here, is sometimes called "aggregate," "fold," "accumulate," "compress," or "inject" in other programming contexts. * <img src="./img/reduce.png" width="100%"> * result of which will be used in the next accumulator call. items emitted by the source Observable.
 * @method reduce
 * @owner Observable
 * @param {?} project
 * @param {?=} seed
 * @return {?}
 */
function reduce(project, seed) {
    return this.lift(new ReduceOperator(project, seed));
}
exports.reduce = reduce;
class ReduceOperator {
    /**
     * @param {?} project
     * @param {?=} seed
     */
    constructor(project, seed) {
        this.project = project;
        this.seed = seed;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new ReduceSubscriber(subscriber, this.project, this.seed));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ReduceOperator.prototype.project;
        /** @type {?} */
        ReduceOperator.prototype.seed;
    }
}
exports.ReduceOperator = ReduceOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class ReduceSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} project
     * @param {?=} seed
     */
    constructor(destination, project, seed) {
        super(destination);
        this.hasValue = false;
        this.acc = seed;
        this.project = project;
        this.hasSeed = typeof seed !== 'undefined';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        if (this.hasValue || (this.hasValue = this.hasSeed)) {
            this._tryReduce(value);
        }
        else {
            this.acc = value;
            this.hasValue = true;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _tryReduce(value) {
        let /** @type {?} */ result;
        try {
            result = this.project(/** @type {?} */ (this.acc), value);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.acc = result;
    }
    /**
     * @return {?}
     */
    _complete() {
        if (this.hasValue || this.hasSeed) {
            this.destination.next(this.acc);
        }
        this.destination.complete();
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ReduceSubscriber.prototype.acc;
        /** @type {?} */
        ReduceSubscriber.prototype.hasSeed;
        /** @type {?} */
        ReduceSubscriber.prototype.hasValue;
        /** @type {?} */
        ReduceSubscriber.prototype.project;
    }
}
exports.ReduceSubscriber = ReduceSubscriber;
