import { Subscriber } from '../Subscriber';
import { async } from '../scheduler/async';
/**
 * @owner Observable
 * @this {?}
 * @param {?=} scheduler
 * @return {?}
 */
export function timeInterval(scheduler = async) {
    return this.lift(new TimeIntervalOperator(scheduler));
}
export class TimeInterval {
    /**
     * @param {?} value
     * @param {?} interval
     */
    constructor(value, interval) {
        this.value = value;
        this.interval = interval;
    }
}
;
class TimeIntervalOperator {
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
        return source.subscribe(new TimeIntervalSubscriber(observer, this.scheduler));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class TimeIntervalSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} scheduler
     */
    constructor(destination, scheduler) {
        super(destination);
        this.scheduler = scheduler;
        this.lastTime = 0;
        this.lastTime = scheduler.now();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        let /** @type {?} */ now = this.scheduler.now();
        let /** @type {?} */ span = now - this.lastTime;
        this.lastTime = now;
        this.destination.next(new TimeInterval(value, span));
    }
}
function TimeIntervalSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    TimeIntervalSubscriber.prototype.lastTime;
}
