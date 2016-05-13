goog.module('rxjs$operator$repeat');
var Subscriber_1 = goog.require('rxjs$Subscriber');
var EmptyObservable_1 = goog.require('rxjs$observable$EmptyObservable');
/**
 *  Returns an Observable that repeats the stream of items emitted by the source Observable at most count times, on a particular Scheduler. * <img src="./img/repeat.png" width="100%"> * an empty Observable. count times.
 * @method repeat
 * @owner Observable
 * @param {?=} count
 * @return {?}
 */
function repeat(count = -1) {
    if (count === 0) {
        return new EmptyObservable_1.EmptyObservable();
    }
    else if (count < 0) {
        return this.lift(new RepeatOperator(-1, this));
    }
    else {
        return this.lift(new RepeatOperator(count - 1, this));
    }
}
exports.repeat = repeat;
class RepeatOperator {
    /**
     * @param {?} count
     * @param {?} source
     */
    constructor(count, source) {
        this.count = count;
        this.source = source;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new RepeatSubscriber(subscriber, this.count, this.source));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        RepeatOperator.prototype.count;
        /** @type {?} */
        RepeatOperator.prototype.source;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class RepeatSubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} count
     * @param {?} source
     */
    constructor(destination, count, source) {
        super(destination);
        this.count = count;
        this.source = source;
    }
    /**
     * @return {?}
     */
    complete() {
        if (!this.isStopped) {
            const { source, count } = this;
            if (count === 0) {
                return super.complete();
            }
            else if (count > -1) {
                this.count = count - 1;
            }
            this.unsubscribe();
            this.isStopped = false;
            this.isUnsubscribed = false;
            source.subscribe(this);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        RepeatSubscriber.prototype.count;
        /** @type {?} */
        RepeatSubscriber.prototype.source;
    }
}
