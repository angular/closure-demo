import { Subscriber } from '../Subscriber';
import { async } from '../scheduler/async';
/**
 * @owner Observable
 * @this {?}
 * @param {?=} scheduler
 * @return {?}
 */
export function timestamp(scheduler = async) {
    return this.lift(new TimestampOperator(scheduler));
}
export class Timestamp {
    /**
     * @param {?} value
     * @param {?} timestamp
     */
    constructor(value, timestamp) {
        this.value = value;
        this.timestamp = timestamp;
    }
}
;
class TimestampOperator {
    /**
     * @param {?} scheduler
     */
    constructor(scheduler) {
        this.scheduler = scheduler;
    }
    /**
     * @param {?} observer
     * @param {?} source
     * @return {?}
     */
    call(observer, source) {
        return source.subscribe(new TimestampSubscriber(observer, this.scheduler));
    }
}
class TimestampSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} scheduler
     */
    constructor(destination, scheduler) {
        super(destination);
        this.scheduler = scheduler;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ now = this.scheduler.now();
        this.destination.next(new Timestamp(value, now));
    }
}
