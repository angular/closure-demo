import { Subscriber } from '../Subscriber';
import { EmptyObservable } from '../observable/EmptyObservable';
/**
 * Returns an Observable that repeats the stream of items emitted by the source Observable at most count times,
 * on a particular Scheduler.
 *
 * <img src="./img/repeat.png" width="100%">
 *
 * an empty Observable.
 * count times.
 * @owner Observable
 * @this {?}
 * @param {?=} count
 * @return {?}
 */
export function repeat(count = -1) {
    if (count === 0) {
        return new EmptyObservable();
    }
    else if (count < 0) {
        return this.lift(new RepeatOperator(-1, this));
    }
    else {
        return this.lift(new RepeatOperator(count - 1, this));
    }
}
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
        return source.subscribe(new RepeatSubscriber(subscriber, this.count, this.source));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class RepeatSubscriber extends Subscriber {
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
            this.closed = false;
            source.subscribe(this);
        }
    }
}
